//0 - нельзя, 1 - можно редактировать
let settings = "";
let IDFieldAct = "";
let IDReasearch = "";
let settingsSourceType = "";
let settingsFactParentFK = "";
let settingsIsEditable = "";
let settingsIsTitleEditable = "";

// Others
let FinalReportID = "";
let GRPEDate = "";
let cleintRole = "";
let cleintPerson = "";
let executerRole = "";
let executerPerson = "";
let shopRole = "";
let shopPerson = "";
let fieldActContractNum = "";
let fieldActDate = "";
let fieldActStage = "";
let fPropantMassNKT = "";
let fieldActPropantTotalFact;
let schemaProvider = "";

let nameFile;
// Функция для считывания файла с инпута
function showFile(input) {
  reloadTable();
  let file = input.files[0];
  // let file = input

  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    let st = reader.result;

    st = JSON.parse(st);

    console.log(st.data.length);

    for (let i = 0; i <= st.data.length - 1; i++) {
      let count = 1;

      if (document.getElementById(`${count}:${i}`) == null) {
        addRow(1);
      }
      //count указать вручную, перепрыгивая например, IS EDITABLBE
      document.getElementById(`${count}:${i}`).value = st.data[i].TITLE;

      if (st.data[i].IS_TITLE_EDITABLE == 0) {
        document.getElementById(`${count}:${i}`).disabled = true;
      }

      count++;
      document.getElementById(`${count}:${i}`).value = st.data[i].UNIT;
      count++;
      document.getElementById(`${count}:${i}`).value =
        st.data[i].MB_BEFORE_FRACTURING;
      count++;
      document.getElementById(`${count}:${i}`).value =
        st.data[i].MB_AFTER_FRACTURING;
      count++;
      document.getElementById(`${count}:${i}`).value = st.data[i].MB_FACT;
      count++;
      document.getElementById(`${count}:${i}`).value = st.data[i].DESIGN;
      count++;
      document.getElementById(`${count}:${i}`).value = st.data[i].REDESIGN;
      count++;
      document.getElementById(`${count}:${i}`).value = st.data[i].FACT;
      count++;

      //
      document.getElementById(`${count}:${i}`).value = st.data[i].SOURCE_TYPE;
      count++;
      document.getElementById(`${count}:${i}`).value =
        st.data[i].FACT_PARENT_FK;
      count++;
      document.getElementById(`${count}:${i}`).value = st.data[i].IS_EDITABLE;
      count++;
      //

      var r = {
        TITLE: `${st.data[i].TITLE}`,
        UNIT: `${st.data[i].UNIT}`,
        MB_BEFORE_FRACTURING: `${st.data[i].MB_BEFORE_FRACTURING}`,
        MB_AFTER_FRACTURING: `${st.data[i].MB_AFTER_FRACTURING}`,
        MB_FACT: `${st.data[i].MB_FACT}`,
        DESIGN: `${st.data[i].DESIGN}`,
        REDESIGN: `${st.data[i].REDESIGN}`,
        FACT: `${st.data[i].FACT}`,
        SOURCE_TYPE: `${st.data[i].SOURCE_TYPE}`,
        FACT_PARENT_FK: `${st.data[i].FACT_PARENT_FK}`,
      };

      document.getElementById(`${11}:${i}`).value = getToPay(r);
    }
  };
  reader.onerror = function () {
    alert(reader.error);
  };
}
// Функция для считывания файла с Каталога
function openFileWithoutInput(content) {
  reloadTable();

  let st = content;

  st = JSON.parse(st);

  console.log(st.data.length);

  FinalReportID = st.other.FINAL_REPORT_ID;
  GRPEDate = st.other.GRP_EDATE;
  cleintRole = st.other.CLIENT_ROLE;
  cleintPerson = st.other.CLIENT_PERSON;
  executerRole = st.other.EXECUTOR_ROLE;
  executerPerson = st.other.EXECUTOR_PERSON;
  shopRole = st.other.SHOP_ROLE;
  shopPerson = st.other.SHOP_PERSON;
  fieldActContractNum = st.other.FIELD_ACT_CONTRACT_NUM;
  fieldActDate = st.other.FIELD_ACT_CONTRACT_DATE;
  fieldActStage = st.other.FIELD_ACT_STAGE;
  fPropantMassNKT = st.other.F_PROPANT_MASS_NKT;
  fieldActPropantTotalFact = st.other.FIELD_ACT_PROPANT_TOTAL_FACT;
  schemaProvider = st.other.SCHEMA_PROVIDER;

  for (let i = 0; i <= st.data.length - 1; i++) {
    let count = 1;

    if (document.getElementById(`${count}:${i}`) == null) {
      addRow(1);
    }
    //count указать вручную, перепрыгивая например, IS EDITABLBE
    document.getElementById(`${count}:${i}`).value = st.data[i].TITLE;

    if (st.data[i].IS_TITLE_EDITABLE == 0) {
      document.getElementById(`${count}:${i}`).disabled = true;
    }
    if (st.data[i].IS_EDITABLE == 0) {
      for (let j = 1; j <= 13; j++) {
        document.getElementById(`${j}:${i}`).disabled = true;
      }
    }

    count++;
    document.getElementById(`${2}:${i}`).value = st.data[i].UNIT;
    count++;
    document.getElementById(`${3}:${i}`).value =
      st.data[i].MB_BEFORE_FRACTURING;
    count++;
    document.getElementById(`${4}:${i}`).value = st.data[i].MB_AFTER_FRACTURING;
    count++;
    document.getElementById(`${5}:${i}`).value = st.data[i].MB_FACT;
    count++;
    document.getElementById(`${6}:${i}`).value = st.data[i].DESIGN;
    count++;
    document.getElementById(`${7}:${i}`).value = st.data[i].REDESIGN;
    count++;
    document.getElementById(`${8}:${i}`).value = st.data[i].FACT;
    count++;

    //
    // document.getElementById(`${count}:${i}`).value = st.data[i].SOURCE_TYPE;
    // count++;
    // document.getElementById(`${count}:${i}`).value = st.data[i].FACT_PARENT_FK;
    // count++;
    // document.getElementById(`${count}:${i}`).value = st.data[i].IS_EDITABLE;
    // count++;
    //

    settingsSourceType += `${st.data[i].SOURCE_TYPE};`;
    settingsFactParentFK += `${st.data[i].FACT_PARENT_FK};`;
    settingsIsEditable += `${st.data[i].IS_EDITABLE};`;
    settingsIsTitleEditable += `${st.data[i].IS_TITLE_EDITABLE};`;

    IDFieldAct += `${st.data[i].FIELD_ACT_ID};`;
    IDReasearch += `${st.data[i].RESEARCH_ID};`;
    //

    // Подсчёт
    var r = {
      TITLE: `${st.data[i].TITLE}`,
      UNIT: `${st.data[i].UNIT}`,
      MB_BEFORE_FRACTURING: `${st.data[i].MB_BEFORE_FRACTURING}`,
      MB_AFTER_FRACTURING: `${st.data[i].MB_AFTER_FRACTURING}`,
      MB_FACT: `${st.data[i].MB_FACT}`,
      DESIGN: `${st.data[i].DESIGN}`,
      REDESIGN: `${st.data[i].REDESIGN}`,
      FACT: `${st.data[i].FACT}`,
      SOURCE_TYPE: `${st.data[i].SOURCE_TYPE}`,
      FACT_PARENT_FK: `${st.data[i].FACT_PARENT_FK}`,
    };
    //calculatePercent похоже от последних двух столбцов

    //редизайн - фактмб
    let redFactMB = st.data[i].REDESIGN - st.data[i].MB_FACT;
    if (redFactMB != 0) {
      document.getElementById(`${9}:${i}`).value = redFactMB.toFixed(2); // Работает
    } else {
      document.getElementById(`${9}:${i}`).value = redFactMB;
    }

    document.getElementById(`${10}:${i}`).value = getPercentage(r); // Работает, кроме Форэс

    document.getElementById(`${11}:${i}`).value = getToPay(r); // Работает, кроме fildActCopy

    document.getElementById(`${12}:${i}`).value = calculatePercent(
      r.FACT,
      getFactMB(r)
    ).value; // Работает

    document.getElementById(`${13}:${i}`).value = calculatePercent(
      r.REDESIGN,
      getFactMB(r)
    ).value; // Работает

    if (calculatePercent(r.FACT, getFactMB(r)).isTooMuch == true) {
      document.getElementById(`${12}:${i}`).setAttribute("class", "isToMuch");
    }
    if (calculatePercent(r.REDESIGN, getFactMB(r)).isTooMuch == true) {
      document.getElementById(`${13}:${i}`).setAttribute("class", "isToMuch");
    }
  }
  document.getElementById(`dateInput`).value = formatDate(st.other.GRP_EDATE);
  document.getElementById(`dateInput`).disabled = true;
}

// Функция для перезагрузки таблицы (нужна, чтобы постоянно не обновлять страницу после открытого файла)
function reloadTable() {
  let rowCount = totalIndex();
  for (let i = 0; i < rowCount; i++) {
    deleteRow();
  }
  for (let i = 0; i < 5; i++) {
    row(i);
  }
}

// Функция для перезаписывания файла
function onSaveFile() {
  // RABOTAET ↓

  // let content = readAllInputs();
  // console.log(content);

  // uroContent = "data:application/octet-stream, " + encodeURIComponent(content);
  // newWindow = window.open(uroContent, '1.json');

  // RABOTAET ↑

  // saveFile('test.json', readAllInputs());

  let data = `${nameFile};${readAllInputs()}`;
  window.api.SaveFileOnCurrentDirectory(data);
  alert(`Файл ${nameFile} успешно сохранён`);
}
function saveFile(fileName, content) {
  let file = new Blob([content], { type: JSON });

  let a = document.createElement("a");
  url = URL.createObjectURL(file);

  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.url.revokeObjectURL(url);
  }, 0);
}

// Функция для считывания всей строки
function readAllInputs() {
  let inputsData = `{ "data":[ `;
  isInputEmpty = false;

  console.log(totalIndex());
  for (let i = 0; i <= totalIndex() - 1; i++) {
    count = 1;
    let dataFromThisInput;
    let fieldActID = IDFieldAct.split(";")[i];
    let reasearchID = IDReasearch.split(";")[i];

    let sourceType = settingsSourceType.split(";")[i];
    let factParentFK = settingsFactParentFK.split(";")[i];
    let isEditable = settingsIsEditable.split(";")[i];
    let isTitleEditable = settingsIsTitleEditable.split(";")[i];

    inputsData += `{"FIELD_ACT_ID" : "${fieldActID}",`;
    inputsData += `"RESEARCH_ID" : "${reasearchID}",`;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"TITLE" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"UNIT" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"MB_BEFORE_FRACTURING" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"MB_AFTER_FRACTURING" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"MB_FACT" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"DESIGN" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"REDESIGN" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    if (document.getElementById(`${count}:${i}`).value != null) {
      dataFromThisInput = document.getElementById(`${count}:${i}`).value;
      inputsData += `"FACT" : "${dataFromThisInput}",`;
    } else {
      isInputEmpty = true;
    }
    count++;

    ///
    // if (document.getElementById(`${count}:${i}`).value != null){
    //     dataFromThisInput = document.getElementById(`${count}:${i}`).value;
    //     inputsData += `"SOURCE_TYPE" : "${dataFromThisInput}",`;
    // }
    // else{
    //     isInputEmpty = true;
    // }
    inputsData += `"SOURCE_TYPE" : "${sourceType}",`;
    count++;

    // if (document.getElementById(`${count}:${i}`).value != null){
    //     dataFromThisInput = document.getElementById(`${count}:${i}`).value;
    //     inputsData += `"FACT_PARENT_FK" : "${dataFromThisInput}",`;
    // }
    // else{
    //     isInputEmpty = true;
    // }
    inputsData += `"FACT_PARENT_FK" : "${factParentFK}",`;
    count++;

    // if (document.getElementById(`${count}:${i}`).value != null){
    //     dataFromThisInput = document.getElementById(`${count}:${i}`).value;

    //     if (i != totalIndex() - 1){
    //         inputsData += `"IS_EDITABLE" : "${dataFromThisInput}" },`;
    //     }
    //     else{
    //         inputsData += `"IS_EDITABLE" : "${dataFromThisInput}" }`;
    //     }
    // }
    // else{
    //     isInputEmpty = true;
    // }
    inputsData += `"IS_EDITABLE" : "${isEditable}",`;
    count++;

    if (i != totalIndex() - 1) {
      inputsData += `"IS_TITLE_EDITABLE" : "${isTitleEditable}" },`;
    } else {
      inputsData += `"IS_TITLE_EDITABLE" : "${isTitleEditable}" }`;
    }
  }
  inputsData += `], "other": {"FINAL_REPORT_ID": "${FinalReportID}",
    "GRP_EDATE": "${GRPEDate}", "CLIENT_ROLE": "${cleintRole}", "CLIENT_PERSON": "${cleintPerson}",
    "EXECUTOR_ROLE": "${executerRole}", "EXECUTOR_PERSON": "${executerPerson}", "SHOP_ROLE": "${shopRole}",
    "SHOP_PERSON": "${shopPerson}", "FIELD_ACT_CONTRACT_NUM": "${fieldActContractNum}", "FIELD_ACT_CONTRACT_DATE": "${fieldActDate}",
    "FIELD_ACT_STAGE": "${fieldActStage}", "F_PROPANT_MASS_NKT": "${fPropantMassNKT}", 
    "FIELD_ACT_PROPANT_TOTAL_FACT": "${fieldActPropantTotalFact}", "SCHEMA_PROVIDER": "${schemaProvider}"}}`;

  // if (isInputEmpty = true){
  //     alert("Заполните поля");
  // }
  console.log(inputsData);
  return inputsData;
}

//Функция для "Каталога файлов"
function fileCatalog() {
  let filesCount = getFilesCount();
  for (let i = 1; i < filesCount + 1; i++) {
    let btn = document.getElementById(`fileBtn${i}`);
    btn.addEventListener("click", async function (event) {
      let fileName = btn.value.split("/");
      fileName = fileName[fileName.length - 1];

      console.log(`Мой путь - ${btn.value}`);
      // showFile(btn.value);

      window.api.ReadFileContent(btn.value);

      let s = await window.api.SendFileContent();
      // const inp = document.getElementById('file');
      // inp.value = btn.textContent;
      nameFile = fileName;
      openFileWithoutInput(s);
    });
  }
}

//сделать событие на TextChanged
function calculatePercent(a, b) {
  if (!a || !b) return { isTooMuch: false, value: "-" };

  const value = Math.round((10000 * a) / b) / 100;
  const isTooMuch = Math.abs(value - 100) > 5;
  // console.log(`Value: ${value} is too much = ${isTooMuch}`);
  return {
    value,
    isTooMuch,
  };
}

function getFactMB(r) {
  return (
    Math.round((r.MB_BEFORE_FRACTURING - r.MB_AFTER_FRACTURING) * 100) / 100 ||
    0
  );
}

function getPercentage(r) {
  return !r.REDESIGN || !this.getFactMB(r)
    ? 0
    : Math.round((this.getFactMB(r) / r.REDESIGN) * 10000) / 100;
}

// function getFactMB(r){
//     return Math.round((r.MB_BEFORE_FRACTURING - r.MB_AFTER_FRACTURING) * 100) / 100 || 0;
// }

function getToPay(r) {
  const factMB = this.getFactMB(r) || 0;
  const getResult = () => {
    let result = 0;
    const percentage = this.getPercentage(r) || 0;
    const redesign = r.REDESIGN || 0;
    if (percentage < 96) result = factMB;
    else if (percentage > 105) result = (redesign * 105) / 100;
    else if (percentage === 0) result = 0;
    else result = factMB;
    result = Math.round(result * 100) / 100;
    return result;
  };
  if (["propant", "agent"].includes(r.SOURCE_TYPE)) {
    return getResult();
  } else if (
    ![
      "Завоз воды на куст (норматив за 1 м3)",
      "Нагрев воды на кусту (норматив за 1 м3)",
    ].includes(r.TITLE)
  )
    return factMB;
  else {
    //   const row = this.fieldActCopy.find((f) => f.TITLE && f.TITLE.includes('Емкость для хранения'));
    //   if (!row) return this.getFactMB(r) || 0;
    //   const koef = row && row.TITLE.includes('50 м3') ? 3 : 5;
    //   const result = getResult();
    //   return result + koef * (row.MB_FACT || 0);
  }
}

function formatDate(date) {
  if (!date) return "-";

  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

//   isFixedField(r) {
//     return r.TITLE.toLowerCase().includes('биоцид') || r.SOURCE_TYPE === 'propant';
//   },

//   isOrangeBG(item) {
//     return (item.TITLE || '').includes('воды на куст') || item.SOURCE_TYPE === 'agent';
//   },
//   print() {
//     window.print();
//   },
