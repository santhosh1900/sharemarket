const mongoose              = require("mongoose");
const { ObjectId }          = mongoose.Schema.Types;

const User_Data = mongoose.Schema({
    Username        : String,
    Email           : String,
    Password        : String,
    NumberOfStocks  : {type : Number, default : 0 },
    StockData       : [{ type : ObjectId, ref : "StockModel" }]
});

module.exports = mongoose.model("User" , User_Data);