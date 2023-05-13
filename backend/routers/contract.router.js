const Router = require("express");
const router = new Router();

const ContractController = require("../controllers/contract.controller");

router.post("/create_contract", ContractController.createContract);
router.get("/get_contracts", ContractController.getContracts);
router.get("/get_one_contract/:id_code", ContractController.getOneContract);
router.put("/update_contract/:id_code", ContractController.updateContract);
router.delete("/delete_contract/:id_code", ContractController.deleteContract);

module.exports = router;
