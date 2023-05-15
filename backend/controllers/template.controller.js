const db = require("../db");

class TemplateController {
  async createTemplate(req, res, next) {
    try {
      const { name, fields } = req.body;

      if (!name || !fields.length) throw new Error("Недостаточно данных");

      const template = await db.query(
        `
          insert into
            public."template"
            (name)
          values
            ($1)
          returning id_code
        `,
        [name]
      );

      for (const field of fields)
        await db.query(
          `
            insert into
              public."field_template_lkp"
              (id_field, id_template)
            values
              ($1, $2)
          `,
          [field.id_code, template.rows[0].id_code]
        );

      res.json(template.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async getTemplates(req, res, next) {
    try {
      const templatesDB = await db.query(
        `
        select *
        from public."template"
      `);
      const field_template_lkp = await db.query(
        `select id_field, id_template from public."field_template_lkp"`
      );

      const templates = [];

      for (const template of templatesDB.rows) {
        const fields = [];

        for (const ft of field_template_lkp.rows) {
          if (ft.id_template === template.id_code) {
            const f = await db.query(
              `
              select * from public."field"
              where id_code = ${ft.id_field}
              order by sequence asc
            `
            );

            fields.push(f.rows[0]);
          }
        }

        templates.push({ ...template, fields: fields });
      }

      res.json(templates);
    } catch (error) {
      next(error);
    }
  }

  async getOneTemplate(req, res, next) {
    try {
      const { id_code } = req.params;

      if (!id_code) throw new Error("Укажите уникальный код шаблона");

      const template = await db.query(
        `select name from public."template" where id_code = ${id_code}`
      );
      const field_template_lkp = await db.query(
        `select id_field, id_template from public."field_template_lkp"`
      );

      const fields = [];

      for (const ft of field_template_lkp.rows) {
        if (ft.id_template == id_code) {
          const f = await db.query(
            `
              select *
              from public."field"
              where id_code = ${ft.id_field}
              order by sequence asc
            `
          );

          fields.push(f.rows[0]);
        }
      }

      res.json({ name: template.rows[0].name, fields: fields });
    } catch (error) {
      next(error);
    }
  }

  async updateTemplate(req, res, next) {
    try {
      const { id_code } = req.params;
      if (!id_code) throw new Error("Укажите уникальный код шаблона");

      const { name, fields } = req.body;
      if (!name || !fields.length) throw new Error("Недостаточно данных");

      await db.query(
        `delete from public."field_template_lkp" where id_template = ${id_code}`
      );

      await db.query(
        `
          update
            public."template"
          set
            name = $2
          where
            id_code = $1
        `,
        [id_code, name]
      );

      for (const field of fields)
        await db.query(
          `
            insert into
              public."field_template_lkp"
              (id_field, id_template)
            values
              ($1, $2)
          `,
          [field.id_code, id_code]
        );

      res.json("OK");
    } catch (error) {
      next(error);
    }
  }

  async deleteTemplate(req, res, next){
    try {
      const { id_code } = req.params;
      if (!id_code) throw new Error("Укажите уникальный код шаблона");

      await db.query(
        `delete from public."field_template_lkp" where id_template = ${id_code}`
      );

      await db.query(
        `delete from public."template" where id_code = ${id_code}`
      );

      res.json("OK")
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TemplateController();
