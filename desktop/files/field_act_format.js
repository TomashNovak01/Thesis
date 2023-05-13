const template = {
  data: [
    "divide", // Если строка === "divide", значит там разрыв в таблице
    {
      FIELD_ACT_ID: 2810, // ID в БД
      RESEARCH_ID: 1180, // номер задачи
      TITLE: "12/18 RCP", // название
      UNIT: "тн", // ед. измеренния
      MB_BEFORE_FRACTURING: 0, // мат баланс до ГРП
      MB_AFTER_FRACTURING: 0, // мат баланс после ГРП
      MB_FACT: 0, // факт по МБ
      DESIGN: 23, // по дизайну
      REDESIGN: 23, // по редизайну
      FACT: 31.3, // факт по приборам
      SOURCE_TYPE: "propant", // тип строки
      FACT_PARENT_FK: null, // deprecated
      IS_EDITABLE: 0, // редактируемое?
      IS_TITLE_EDITABLE: 0, // название редактируемое?
    },
  ],
  other: {
    FINAL_REPORT_ID: 111, // id
    GRP_EDATE: "2022-11-16T19:00:00.000Z", // Дата ГРП
    CLIENT_ROLE: null, // Должность заказчика
    CLIENT_PERSON: null, // заказчик - ФИО
    EXECUTOR_ROLE: null, // Должность подрядчика
    EXECUTOR_PERSON: null, // подрядчик - ФИО
    SHOP_ROLE: null, // должность представителя Цеха
    SHOP_PERSON: null, // представитель цеха
    FIELD_ACT_CONTRACT_NUM: null, // Номер договора
    FIELD_ACT_CONTRACT_DATE: null, // дата договора
    FIELD_ACT_STAGE: null, // стадия
    F_PROPANT_MASS_NKT: null, // пропанта в нкт
    FIELD_ACT_PROPANT_TOTAL_FACT: 163.2, // всего пропанта
    SCHEMA_PROVIDER: "KIN_PRVD", // схема, регион
  },
  research: {
    RESEARCH_ID: 1180, // номер задачи
    SCHEMA: "KIN_PRVD", // схема
    CONTRACTOR: "ООО «РН-ГРП»", // подрядчик
    GRP_NUMBER: 1, // подрядковый номер ГРП
    GRP_COUNT: 2, // всего ГРП
    WELL_NAME: "6630", // скважина
    CLUSTER: "229", // куст
    OBJECTS: "БС4-5 Верх", // пласт
    OILFIELD: "ПРИРАЗЛОМНОЕ", // месторождение
    SHOP_NAME: "ЦДНГ-10", // цех
    COMPLICATION: null, // осложнения
  },
};
