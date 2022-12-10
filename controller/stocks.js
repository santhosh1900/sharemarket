const Stocks            = require("../models/StockData"),
    Users               = require("../models/UserData"),
    { StatusCodes }     = require("http-status-codes"),
    _                   = require("lodash");


module.exports = {
    GetAllStocks : async (req, res) =>{
        try{
            var perPage = 5;
            var pageQuery = parseInt(req.query.page);
            var pageNumber = pageQuery ? pageQuery : 1;
            const AllStocks = await Stocks.find({}).skip((perPage * pageNumber) - perPage).limit(perPage);
            return res
            .status(StatusCodes.OK)
            .json({ action : "ADD_STOCKS" , data : AllStocks });
        }catch(err){
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message : "Oops something went wrong"});
        }
    },
    AddStock : async (req, res) => {
        try{
            Users.findByIdAndUpdate(req.user._id,{
                $push:{ StockData : req.body.data },
                $inc : { NumberOfStocks : 1 }
            }).then((userdata) => {
                var data = userdata;
                data.StockData.push(req.body.data);
                return res
                .status(StatusCodes.OK)
                .json({action : "ADD_USER", data});
            })
        }catch(err){
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message : "Oops something went wrong"});
        }
    },
    PullStock : async (req, res) => {
        try{
            Users.findByIdAndUpdate(req.user._id,{
                $pull: { StockData : req.body.data },
                $inc : { NumberOfStocks : -1 }
            }).then(() => {
                return res
                .status(StatusCodes.OK)
                .json({action : "EDIT_USERSTOCKS", data : req.body.data });
            })
        }catch(err){
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message : "Oops something went wrong"});
        }
    },
    SearchStock : async (req, res) => {
        try{
            let SearchPattern   = new RegExp("^"+ req.params.search);
            let search          = req.params.search;
            if(search.toUpperCase == search){
                const data = await Stocks.find({Symbol : { $regex : SearchPattern }});
                return res
                .status(StatusCodes.OK)
                .json({ action : "ADD_STOCKS" , data });
            }else{
                const data = await Stocks.find({CompanyName : { $regex : SearchPattern }});
                return res
                .status(StatusCodes.OK)
                .json({ action : "ADD_STOCKS" , data });
            }
        }catch(err){
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({message : "Oops something went wrong"});
        }
    }
}