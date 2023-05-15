const db = require("../db");

class RemarkController {
  async createRemark(req, res, next) {
    try {
      const { id_user, remarks, date, research_id } = req.body;

      if (id_user === null || !remarks || !date || !research_id)
        throw new Error("Недостаточно данных");

      const remark = await db.query(
        `
        insert into
          public."remark"
          (id_user, remarks, date, research_id)
        values
          ($1, $2, $3, $4)
      `,
        [id_user, remarks, date, research_id]
      );

      res.json(remark.rows[0]);
    } catch (error) {
      next(error);
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
          order by r.research_id asc
          `
        );
      res.json(remarks.rows);
    } catch (error) {
      next(error);
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

      res.json(remarks.rows);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RemarkController();
