const Router = require("express");
const router = new Router();

const TemplateController = require("../controllers/template.controller");

router.post("/create_template", TemplateController.createTemplate);
router.get("/get_templates", TemplateController.getTemplates);
router.get("/get_on_template/:id_code", TemplateController.getOneTemplate);
router.put("/update_template/:id_code", TemplateController.updateTemplate);
router.delete("/delete_template/:id_code", TemplateController.deleteTemplate);

module.exports = router;