const express            = require("express"),
      router             = express.Router(),
      StockData          = require("../models/StockData"),
    {StatusCodes}        = require("http-status-codes"),
    StockController      = require("../controller/stocks"),
    AuthHandler          = require("../middleware/AuthMiddleware"),
    csv                  =require("csvtojson");

router.get("/allstocks", AuthHandler.VerifyToken,  StockController.GetAllStocks);
router.post("/addstock", AuthHandler.VerifyToken, StockController.AddStock);
router.put("/removestock", AuthHandler.VerifyToken, StockController.PullStock);
router.get("/searchstocks/:search", AuthHandler.VerifyToken, StockController.SearchStock);






module.exports = router;