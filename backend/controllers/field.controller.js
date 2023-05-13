const db = require("../db");

class FieldController {
  async createField(req, res, next) {
    try {
      const { value_short, value_full, sequence, block_id, unit } = req.body;

      if (!value_short || !value_full || !sequence || !block_id || !unit)
        throw new Error("Недостаточно данных");

      const field = await db.query(
        `
        insert into
          public."field"
          (value_short, value_full, sequence, block_id, unit)
        values
          ($1, $2, $3, $4, $5)
          returning id_code
        `,
        [value_short, value_full, sequence, block_id, unit]
      );
      res.json(field.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async getFields(req, res, next) {
    try {
      const fields = await db.query(`select * from public."field"`);
      res.json(fields.rows);
    } catch (error) {
      next(error);
    }
  }

  async getOneField(req, res, next) {
    try {
      const { id_code } = req.params;

      if (!id_code) throw new Error("Укажите уникальный код поля");

      const fields = await db.query(
        `
        select *
        from public."field"
        where id_code = ${id_code}
        `
      );
      res.json(fields.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async updateField(req, res, next) {
    try {
      const { id_code } = req.params;
      if (!id_code) throw new Error("Укажите уникальный код поля");

      const { value_short, value_full, sequence, block_id, unit } = req.body;
      if (!value_short || !value_full || !sequence || !block_id || !unit)
        throw new Error("Недостаточно данных");

      await db.query(
        `
          update
            public."field"
          set
            value_short = $2,
            value_full = $3,
            sequence = $4,
            block_id = $5,
            unit = $6
          where
            id_code = $1
        `,
        [id_code, value_short, value_full, sequence, block_id, unit]
      );

      res.json("OK");
    } catch (error) {
      next(error);
    }
  }

  async deleteField(req, res, next) {
    try {
      const { id_code } = req.params;

      if (!id_code) throw new Error("Укажите уникальный код поля");

      await db.query(`delete from public."field" where id_code = ${id_code}`);

      res.json("OK");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FieldController();
