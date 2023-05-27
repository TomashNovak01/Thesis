const db = require("../db");

class RemarkController {
  async createRemark(req, res, next) {
    try {
      const { id_user, remarks, date, research_id, file_name } = req.body;
      const file_bin = !!file_name && req.file ? req.file.buffer : null;

      if (id_user === null || !date || !research_id)
        throw new Error("Недостаточно данных");

      if (!remarks && !file_bin)
        throw new Error("Невозможно создать замечание без текста или файла");

      const remark = await db.query(
        `
        insert into
          public."remark"
          (id_user, remarks, date, research_id)
        values
          ($1, $2, $3, $4)
        returning id_code
      `,
        [id_user, remarks, date, research_id]
      );

      let f = { rows: [{ name: null, bin: null }] };

      if (file_name && file_bin) {
        f = await db.query(
          `
            insert into
              public."file_remark"
              (id_remark, name, bin)
            values
              ($1, $2, $3)
            returning *
          `,
          [remark.rows[0].id_code, file_name, file_bin]
        );
      }

      res.json({
        ...remark.rows[0],
        file_name: f.rows[0].name,
        file_bin: f.rows[0].bin,
      });
      res.status(200);
    } catch (error) {
      next(error);
      res.status(500);
    }
  }
  async getRemarks(req, res, next) {
    try {
      const remarks = await db.query(
        `
          select
            r.id_code,
            r.remarks,
            r.date,
            r.research_id,

            u.surname,
            u.name,
            u.patronymic
          from public."remark" as r
            join public."user" as u on u.id_code = r.id_user
          order by
            r.research_id asc,
            r.id_code desc;
        `
      );

      let responseRemarks = [];

      for (const r of remarks.rows) {
        const file = await db.query(
          `
            select name, bin
            from public."file_remark"
            where id_remark = ${r.id_code}
          `
        );

        responseRemarks.push({
          ...r,
          file_name: file.rows.length ? file.rows[0].name : null,
          file_bin: file.rows.length ? file.rows[0].bin.toString("base64") : null,
        });
      }

      res.json(responseRemarks);
      res.status(200);
    } catch (error) {
      next(error);
      res.status(500);
    }
  }

  async getResearchRemarks(req, res, next) {
    try {
      const { research_id } = req.params;

      const remarks = await db.query(
        `
          select *
          from public."remark"
          where research_id = ${research_id}
          order by date
        `
      );

      let responseRemarks = [];

      for (const r of remarks.rows) {
        const file = await db.query(
          `
            select name, bin
            from public."file_remark"
            where id_remark = ${r.id_code}
          `
        );

        responseRemarks.push({
          ...r,
          file_name: file.rows.length ? file.rows[0].name : null,
          file_bin: file.rows.length ? file.rows[0].bin : null,
        });
      }

      res.json(responseRemarks);
      res.status(200);
    } catch (error) {
      next(error);
      res.status(500);
    }
  }
}

module.exports = new RemarkController();
