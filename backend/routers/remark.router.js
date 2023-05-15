const Router = require("express");
const router = new Router();

const RemarkController = require("../controllers/remark.controller");

router.post("/create_remark", RemarkController.createRemark);
router.get("/get_remarks", RemarkController.getRemarks);
router.get("/get_research_remarks/:research_id", RemarkController.getResearchRemarks);

module.exports = router;