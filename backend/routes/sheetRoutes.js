const express = require("express");
const router = express.Router();
const balanceSheet = require("../controllers/balanceSheet");

router.get("/getBalanceSheet", balanceSheet.getBalanceSheet);

module.exports = router;
