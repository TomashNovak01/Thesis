const Router = require("express");
const router = new Router();

const FieldController = require("../controllers/field.controller");

router.post("/create_field", FieldController.createField);
router.get("/get_fields", FieldController.getFields);
router.get("/get_one_field/:id_code", FieldController.getOneField);
router.put("/update_field/:id_code", FieldController.updateField);
router.delete("/delete_field/:id_code", FieldController.deleteField);

module.exports = router;