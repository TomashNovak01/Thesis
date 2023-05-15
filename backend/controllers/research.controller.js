const db = require("../db");

class ResearchController {
  async createResearch(req, res, next) {
    try {
      const { contractor, well_name, cluster, objects, oilfield } = req.body;

      if (!contractor || !well_name || !cluster || !objects || !oilfield)
        throw new Error("Недостаточно данных");

      const research = await db.query(
        `
          insert into
            public."research"
            (contractor, well_name, cluster, objects, oilfield, is_new)
          values
            ($1, $2, $3, $4, $5, true)
          returning *
        `,
        [contractor, well_name, cluster, objects, oilfield]
      );

      res.json(research.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async getResearches(req, res, next) {
    try {
      const researchesDB = await db.query(
        `
          select * from public."research"
        `
      );
      const fieldsDB = await db.query(`select * from public."field_research"`);

      const researches = [];

      for (const research of researchesDB.rows) {
        const fields = [];

        for (const field of fieldsDB.rows) {
          const f = await db.query(
            `
              select *
              from public."field"
              where id_code = ${field.id_code}
              order by sequence asc
            `
          );
          if (research.research_id === field.research_id)
            fields.push({
              ...field,
              title: f.rows[0].value_full,
              unit: f.rows[0].unit,
              block_id: f.rows[0].block_id,
              sequence: f.rows[0].sequence,
            });
        }

        researches.push({ ...research, data: fields });
      }

      res.json(researches);
    } catch (error) {
      next(error);
    }
  }

  async getOneResearch(req, res, next) {
    try {
      const { research_id } = req.params;

      if (!research_id) throw new Error("Укажите уникальный код полевого акта");

      const research = await db.query(
        `
        select *
        from public."research"
        where research_id = ${research_id}
        `
      );
      const fieldsDB = await db.query(`select * from public."field_research"`);

      const fields = [];

      for (const field of fieldsDB.rows)
        if (research_id == field.research_id) fields.push(field);

      res.json({ ...research.rows[0], data: fields });
    } catch (error) {
      next(error);
    }
  }

  async updateResearch(req, res, next) {
    try {
      const { research_id } = req.params;
      const body = req.body;

      await db.query(
        `
          update
            public."research"
          set
            grp_date = $2,
            id_contract = $3,
            client_role = $4,
            client_person = $5,
            executer_role = $6,
            executer_person = $7,
            shop_role = $8,
            shop_person = $9,
            f_propant_mass_nkt = $10,
            remarks = $11,
            id_status = $12,
            id_user = $13
          where
            research_id = $1
        `,
        [
          research_id,
          body.grp_date,
          body.id_contract,
          body.client_role,
          body.client_person,
          body.executer_role,
          body.executer_person,
          body.shop_role,
          body.shop_person,
          body.f_propant_mass_nkt,
          body.remarks,
          body.id_status,
          body.id_user
        ]
      );

      await db.query(
        `delete from public."field_research" where research_id = ${research_id}`
      );

      if (body.data.length)
        for (const field of body.data)
          await db.query(
            `
              insert into
                public."field_research"
                (id_code, research_id, mb_before_fracturing, mb_after_fracturing, mb_frac, design, redesign, fact, to_pay, is_editable, is_title_editable)
              values
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            `,
            [
              field.id_code,
              research_id,
              field.mb_before_fracturing,
              field.mb_after_fracturing,
              field.mb_frac,
              field.design,
              field.redesign,
              field.fact,
              field.to_pay,
              field.is_editable,
              field.is_title_editable,
            ]
          );

      res.json("OK");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ResearchController();
