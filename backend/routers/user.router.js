const Router = require("express");
const router = new Router();

const UserController = require("../controllers/user.controller");

router.get("/get_users", UserController.getUsers);
router.get("/get_one_user/:id_code", UserController.getOneUser);

module.exports = router;