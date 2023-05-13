const db = require("../db");

class UserController {
  async getUsers(req, res, next) {
    try {
      const users = await db.query(
        `
        select
          u.id_code,
          u.login,
          u.email,
          u.password,
          u.surname,
          u.name,
          u.patronymic,

          r.name role
        from public."user" as u
          join public."role" as r on r.id_code = u.id_role
        `
      );
      res.json(users.rows);
    } catch (error) {
      next(error);
    }
  }

  async getOneUser(req, res, next) {
    try {
      const {id_code} = req.params;

      if (!id_code) throw new Error("Укажите уникальный код пользователя");

      const user = await db.query(
        `
        select
          u.id_code,
          u.login,
          u.email,
          u.password,
          u.password,
          u.surname,
          u.name,
          u.patronymic,

          r.name role
        from public."user" as u
          join public."role" as r on r.id_code = u.id_role
        where
          u.id_code = ${id_code}
        `
      );
      res.json(user.rows[0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
