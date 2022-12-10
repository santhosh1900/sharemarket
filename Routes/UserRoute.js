const express            = require("express"),
      router             = express.Router(),
      AuthCtrl           = require("../controller/user"),
      AuthMiddleware     = require("../middleware/AuthMiddleware");

router.post("/signup"  , AuthMiddleware.VerifyHeader ,  AuthCtrl.RegisterUser);

router.post("/login"  , AuthMiddleware.VerifyHeader ,  AuthCtrl.LoginUser);

router.get("/userbyid/:id", AuthMiddleware.VerifyToken, AuthCtrl.GetUserData);

router.get("/userstocks", AuthMiddleware.VerifyToken, AuthCtrl.GetUserStocks);

// router.get("/useraddress" , AuthMiddleware.VerifyToken , AuthCtrl.GetUserAddress);

// router.post("/addaddress" , AuthMiddleware.VerifyToken , AuthCtrl.AddAddress);

// router.post ("/orderbook" ,  AuthMiddleware.VerifyToken , AuthCtrl.OrderBook);

// router.get("/getuserpurchasehistory" , AuthMiddleware.VerifyToken , AuthCtrl.GetUserPurchaseHistory);



module.exports = router;