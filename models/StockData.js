const mongoose              = require("mongoose");
const { ObjectId }          = mongoose.Schema.Types;

const Stock_model = mongoose.Schema({
    CompanyName     : String,
    Symbol          : String,
    MarketCap       : Number,
    CurretPrice     : Number
});

module.exports = mongoose.model("StockModel" , Stock_model);