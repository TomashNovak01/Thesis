const db = require("../db");

class ContractController {
  async getContracts(req, res, next) {
    try {
      const contracts = await db.query(`select * from public."contract"`);
      res.json(contracts.rows);
    } catch (error) {
      next(error);
    }
  }

  async getOneContract(req, res, next) {
    try {
      const { id_code } = req.params;

      if (!id_code) throw new Error("Укажите уникальный код договора");

      const contract = await db.query(
        `
          select *
          from public."contract"
          where id_code = ${id_code}
        `
      );
      res.json(contract.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async createContract(req, res, next) {
    try {
      const { value_short, value_full, date } = req.body;

      if (!value_short || !value_full || !date)
        throw new Error("Недостаточно данных");

      const contract = await db.query(
        `
          insert into
            public."contract"
            (value_short, value_full, date)
          values
            ($1, $2, $3)
          returning id_code
        `,
        [value_short, value_full, date]
      );

      res.json(contract.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async updateContract(req, res, next) {
    try {
      const { id_code } = req.params;
      const { value_short, value_full, date } = req.body;

      if (!id_code) throw new Error("Укажите уникальный код договора");
      if (!value_short || !value_full || !date)
        throw new Error("Недостаточно данных");

      await db.query(
        `
          update
            public."contract"
          set
            value_short = $2,
            value_full = $3,
            date = $4
          where
            id_code = $1
        `,
        [id_code, value_short, value_full, date]
      );

      res.json("OK");
    } catch (error) {
      next(error);
    }
  }

  async deleteContract(req, res, next) {
    try {
      const { id_code } = req.params;

      if (!id_code) throw new Error("Укажите уникальный код договора");

      await db.query(
        `delete from public."contract" where id_code = ${id_code}`
      );

      res.json("OK");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContractController();
