const Router = require("express");
const router = new Router()

const ResearchController = require("../controllers/research.controller");

router.post("/create_research", ResearchController.createResearch);
router.get("/get_researches", ResearchController.getResearches);
router.get("/get_one_research/:research_id", ResearchController.getOneResearch);
router.put("/update_research/:research_id", ResearchController.updateResearch);

module.exports =router;