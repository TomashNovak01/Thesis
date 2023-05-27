import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

export default async (data, contract) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Полевой акт");

  const columns = [];
  const columnsWidth = [
    26, 26, 9, 9, 9, 30, 16, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
  ];

  const style = {
    grayBG: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9D9D9" },
    },
    redBG: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFC0000" },
    },
    borders: {
      thin: {
        top: { style: "thin", color: { argb: "FF000000" } },
        left: { style: "thin", color: { argb: "FF000000" } },
        bottom: { style: "thin", color: { argb: "FF000000" } },
        right: { style: "thin", color: { argb: "FF000000" } },
      },
      medium: {
        top: { style: "medium", color: { argb: "FF000000" } },
        left: { style: "medium", color: { argb: "FF000000" } },
        bottom: { style: "medium", color: { argb: "FF000000" } },
        right: { style: "medium", color: { argb: "FF000000" } },
      },
      mediumPos(pos) {
        return {
          top: {
            style: pos.includes("top") ? "medium" : "thin",
            color: { argb: "FF000000" },
          },
          left: {
            style: pos.includes("left") ? "medium" : "thin",
            color: { argb: "FF000000" },
          },
          bottom: {
            style: pos.includes("bottom") ? "medium" : "thin",
            color: { argb: "FF000000" },
          },
          right: {
            style: pos.includes("right") ? "medium" : "thin",
            color: { argb: "FF000000" },
          },
        };
      },
    },
    alignment: {
      center: { vertical: "middle", horizontal: "center" },
      left: { vertical: "middle", horizontal: "left" },
      leftTop: { vertical: "top", horizontal: "left" },
    },
  };

  columnsWidth.map((width, index) => {
    columns.push({
      width,
      key: index + 1,
      style: {
        font: { name: "Arial", family: 1, size: 12, bold: true },
        alignment: { ...style.alignment.center, wrapText: true },
      },
    });
  });

  sheet.columns = columns;

  const calcPercent = (a, b) => {
    if (!a || !b) return { isTooMuch: false, value: "-" };

    const value = Math.round((10000 * a) / b) / 100;
    const isTooMuch = Math.round(value - 100) > 5;

    return { isTooMuch, value };
  };

  sheet.addRows([
    { 1: "ОТЧЁТ О ВЫПОЛНЕННЫХ УСЛУГАХ ПО ГИДРОРАЗРЫВУ ПЛАСТА" },
    { 1: "Подрядчик:", 2: data.contractor },
    {
      1: "Договор",
      2: contract.value_short,
      3: "от",
      4: !!contract.date ? dayjs(contract.date).format("DD.MM.YYYY") : "",
    },
    { 1: "Месторождение", 2: data.oilfield },
    { 1: "Скважина", 2: data.well_name },
    { 1: "Куст:", 2: data.cluster },
    { 1: "Пласт:", 2: data.objects },
    {},
    {
      1: "Дата ГРП",
      2: !!data.grp_date ? dayjs(data.grp_date).format("DD.MM.YYYY") : "",
      8: "мат. баланс",
    },
    {
      1: "оборудование и материалы",
      7: "ед.изм",
      8: "перед ГРП",
      9: "после ГРП",
      10: "факт по мат. балансу",
      11: "по дизайну",
      12: "редизайн",
      13: "факт по приборам",
      14: "реД-факт МБ",
      15: "% выполнения, факт (МБ) от плана (реД",
      16: "к оплате",
      18: "факт / факт(МБ, %",
      19: "Ред / факт(МБ), %",
    },
    {},
  ]);

  sheet.mergeCells("A1:F1");
  sheet.mergeCells("D3:E3");

  let i = 9;
  while (i--) sheet.getCell("A" + (i + 1)).alignment = style.alignment.left;

  sheet.getCell("A9").border = style.borders.medium;
  sheet.getCell("B9").border = style.borders.medium;
  sheet.getCell("H9").border = style.borders.medium;

  sheet.mergeCells("H9:J9");

  sheet.getRow(10).eachCell((c) => (c.border = style.borders.medium));

  sheet.mergeCells("A10:F10");

  let isPreviousDivider = false;

  const getFactMB = (field) =>
    field.mb_before_fracturing - field.mb_after_fracturing || 0;

  const getToPay = (field) => {
    const factMB = getFactMB(field) || 0;
    const getResult = () => {
      let result = 0;

      const percentage = getPercentage(field) || 0;
      const regesign = field.redesign || 0;

      if (percentage > 105) result = (regesign * 105) / 100;
      else if (percentage === 0) result = 0;
      else result = factMB;

      return result;
    };

    const row = data.data.find(
      (f) => f.title && f.title.includes("Емкость для хранения")
    );

    if (!row) return getFactMB(field) || 0;

    const koef = row && row.title.includes("50 м3") ? 3 : 5;
    const result = getResult();

    field.to_pay = result + koef * (field.mb_frac || 0);

    return result + koef * (field.mb_frac || 0);
  };

  const isFixedField = (field) => field.title.toLowerCase().includes("биоцид");

  data.data.map((field, index) => {
    if (
      field.block_id !==
      (data.data[index + 1] || { block_id: field.block_id }).block_id
    ) {
      sheet.addRow({});
      isPreviousDivider = true;
    }
    const factPerc = calcPercent(data.fact, getFactMB(field));
    const redPerc = calcPercent(data.redesign, getFactMB(field));

    sheet.addRow({
      1: field.title,
      7: field.unit,
      8: field.mb_before_fracturing,
      9: field.mb_after_fracturing,
      10: !field.is_editable ? getFactMB(field) : field.mb_frac,
      11: field.design,
      12: field.redesign,
      13: isFixedField(field) ? "-" : field.fact,
      14:
        Math.round(((field.redesign || 0) - (getFactMB(field) || 0)) * 1000) /
        1000,
      15:
        !field.redesign || !getFactMB(field)
          ? "-"
          : Math.round((getFactMB(field) / field.redesign) * 1000) / 100,
      16: getToPay(field),
      18: isFixedField(field) ? "-" : factPerc.value,
      19: redPerc.value,
    });

    const fieldIndex = sheet.lastRow._number;

    if (factPerc.isTooMuch) sheet.getCell("R" + fieldIndex).fill = style.redBG;
    if (redPerc.isTooMuch) sheet.getCell("S" + fieldIndex).fill = style.redBG;

    sheet.mergeCells(`A${fieldIndex}:F${fieldIndex}`);

    sheet.getCell("A" + fieldIndex).alignment = style.alignment.left;
    sheet.getCell("G" + fieldIndex).alignment = style.alignment.left;

    sheet.lastRow.eachCell((c, columnNumber) => {
      if (![1, 7, 15, 16].includes(columnNumber))
        c.alignment = style.alignment.right;

      c.border = isPreviousDivider
        ? style.borders.mediumPos(["left", "right", "top"])
        : style.borders.mediumPos(["left", "right"]);

      if (
        (columnNumber === 1 || columnNumber === 2) &&
        field.title !== "Всего пропанта"
      )
        c.font = { name: "Arial", family: 1, size: 14, bold: false };

      if (isPreviousDivider && index > 3)
        sheet
          .getRow(sheet.lastRow._number - 2)
          .eachCell(
            (c) =>
              (c.border = style.borders.mediumPos(["left", "right", "bottom"]))
          );

      if (index === data.data.length - 1)
        c.border = style.borders.mediumPos(["left", "right", "bottom"]);

      if (index === 0) c.border = style.borders.medium;
    });

    isPreviousDivider = false;
  });

  let linesBefore = sheet.lastRow._number;

  let propants = () => {
    const propant = data.data.filter((f) => f.block_id === 50);
    const result = {
      id_code: 0,
      title: "Всего пропанта",
      unit: "тн",
      mb_before_fracturing: 0,
      mb_after_fracturing: 0,
      mb_frac: 0,
      design: 0,
      redesign: 0,
      fact: 0,
    };

    propant.map((p) => {
      result.id_code += p.id_code;
      result.mb_before_fracturing += p.mb_before_fracturing;
      result.mb_after_fracturing += p.mb_after_fracturing;
      result.mb_frac += p.mb_frac;
      result.design += p.design;
      result.redesign += p.redesign;
      result.fact += p.fact;
    });

    return {
      id_code: result.id_code,
      title: "Всего пропанта",
      unit: "тн",
      mb_before_fracturing: Math.round(result.mb_before_fracturing * 100) / 100,
      mb_after_fracturing: Math.round(result.mb_after_fracturing * 100) / 100,
      mb_frac: Math.round(result.mb_frac * 100) / 100,
      design: Math.round(result.design * 100) / 100,
      redesign: Math.round(result.redesign * 100) / 100,
      fact: Math.round(result.fact * 100) / 100,
    };
  };

  sheet.addRows([
    {},
    { 11: "вид осложнения", 14: "-" },
    { 11: "всего пропанта с поверхности", 14: getFactMB(propants) },
    { 11: "пропант в нкт", 14: data.f_propant_mass_nkt },
    {},
    { 1: "ПОДПИСИ СТОРОН:" },
  ]);

  sheet.mergeCells(`K${linesBefore + 2}:M${linesBefore + 2}`);
  sheet.mergeCells(`K${linesBefore + 3}:M${linesBefore + 3}`);
  sheet.mergeCells(`K${linesBefore + 4}:M${linesBefore + 4}`);
  sheet.mergeCells(`A${linesBefore + 2}:I${linesBefore + 3}`);

  sheet.getCell("K" + (linesBefore + 2)).border = style.borders.mediumPos([
    "top",
    "left",
  ]);
  sheet.getCell("K" + (linesBefore + 2)).alignment = style.alignment.left;
  sheet.getCell("K" + (linesBefore + 2)).font = {
    name: "Arial",
    family: 1,
    size: 12,
    bold: false,
  };
  sheet.getCell("K" + (linesBefore + 2)).border = style.borders.mediumPos([
    "top",
    "right",
  ]);

  sheet.getCell("K" + (linesBefore + 3)).border = style.borders.mediumPos([
    "left",
  ]);
  sheet.getCell("K" + (linesBefore + 3)).alignment = style.alignment.left;
  sheet.getCell("K" + (linesBefore + 3)).font = {
    name: "Arial",
    family: 1,
    size: 12,
    bold: false,
  };
  sheet.getCell("K" + (linesBefore + 3)).border = style.borders.mediumPos([
    "right",
  ]);

  sheet.getCell("K" + (linesBefore + 4)).border = style.borders.mediumPos([
    "bottom",
    "left",
  ]);
  sheet.getCell("K" + (linesBefore + 4)).alignment = style.alignment.left;
  sheet.getCell("K" + (linesBefore + 4)).font = {
    name: "Arial",
    family: 1,
    size: 12,
    bold: false,
  };
  sheet.getCell("K" + (linesBefore + 4)).border = style.borders.mediumPos([
    "bottom",
    "right",
  ]);

  linesBefore = sheet.lastRow._number;

  sheet.addRows([
    { 1: "Подрядчик", 7: "Заказчик", 13: "Заказчик" },
    {
      1: "Должность:",
      2: data.executer_role,
      7: "Должность:",
      8: data.client_role,
      13: "Должность:",
      14: data.shop_role,
    },
    {
      1: "ФИО:",
      2: data.executer_person,
      7: "ФИО:",
      8: data.client_person,
      13: "ФИО:",
      14: data.shop_person,
    },
    { 1: "Подпись:", 2: "", 7: "Подпись:", 8: "", 13: "Подпись:", 14: "" },
    {},
  ]);

  sheet.mergeCells(`A${linesBefore}:H${linesBefore}`);

  const configureRow = (fieldIndex, borders = []) => {
    sheet.getCell("A" + fieldIndex).alignment = style.alignment.leftTop;
    sheet.getCell("A" + fieldIndex).border = {
      ...style.borders.mediumPos(["left", ...borders]),
      right: false,
    };
    sheet.getCell("B" + fieldIndex).border = {
      ...style.borders.mediumPos([...borders]),
      right: false,
    };
    sheet.mergeCells(`B:${fieldIndex}:F${fieldIndex}`);

    sheet.getCell("G" + fieldIndex).alignment = style.alignment.leftTop;
    sheet.getCell("G" + fieldIndex).border = {
      ...style.borders.mediumPos(["left", ...borders]),
      right: false,
    };
    sheet.getCell("H" + fieldIndex).border = {
      ...style.borders.mediumPos([...borders]),
      right: false,
    };
    sheet.mergeCells(`H:${fieldIndex}:L${fieldIndex}`);

    sheet.getCell("M" + fieldIndex).alignment = style.alignment.leftTop;
    sheet.getCell("M" + fieldIndex).border = {
      ...style.borders.mediumPos(["left", ...borders]),
      right: false,
    };
    sheet.getCell("N" + fieldIndex).border = {
      ...style.borders.mediumPos([...borders]),
      right: false,
    };
    sheet.mergeCells(`N:${fieldIndex}:P${fieldIndex}`);
  };

  // configureRow(linesBefore + 1, ["top"]);
  // configureRow(linesBefore + 2);
  // configureRow(linesBefore + 3);
  // configureRow(linesBefore + 4, ["bottom"]);

  sheet.getRow(linesBefore + 4).height = 40;

  sheet.pageSetup.printArea = "A1:P" + (22 + data.data.length);
  sheet.pageSetup.fitToPage = true;
  sheet.pageSetup.paperSize = 9;
  sheet.pageSetup.scale = 70;

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileName = `Field_Act_${data.research_id}`;
    const fileExtension = ".xlsx";

    const blob = new Blob([buffer], { type: fileType });
    saveAs(blob, fileName + fileExtension);
  } catch (error) {
    console.log(error);
  }
};
