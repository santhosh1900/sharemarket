const { StatusCodes }   = require("http-status-codes"),
    User              = require("../models/UserData"), 
    bcrypt            = require("bcryptjs"),
    jwt               = require("jsonwebtoken"),
    bdConfig          = require("../config/jwt");

    module.exports = {
        RegisterUser : async(req,res) => {
            try{
                const data      = req.body.data;
                var Username    = data.username;
                var Email       = data.email;
                var Password    = data.password
                var existedUser   = await User.findOne({Email : Email});
            if(existedUser){
                return res
                .status(StatusCodes.CONFLICT)
                .json({ message : "User already exist" });
            };
            return bcrypt.hash(Password , 13 , (err, hash) => {
                if(err){
                    return res
                        .status(StatusCodes.BAD_REQUEST)
                        .json({ message : "Please enter valid password" })
                }
                const body = {
                    Email       : Email,
                    Username    : Username,
                    Password    : hash
                };
                User.create(body).then(async user => {
                    var token_user = await User.findById(user._id).select("-Password");
                    const token = jwt.sign({ data : token_user } , bdConfig.secret , {
                        expiresIn : "2hr"
                    });
                    res.cookie("auth", token);
                    return res
                        .status(StatusCodes.CREATED)
                        .json({ action : "ADD_USER", token, data : token_user});
                }).catch(error => {
                    return res
                    .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .json({message : "Oops something went wrong"});
                });
            });
            }catch(err){
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({message : "Oops something went wrong"});
            }
        },
        LoginUser : async (req,res) => {
            try{
                const data          = req.body.data;
                const Email         = data.email;
                // console.log(Email)
                const user          = await User.findOne({Email}).select("-Password");
                const user2         = await User.findOne({Email}).select("Password");
                    if(!user){
                        return res
                        .status(StatusCodes.NOT_FOUND)
                        .json({message : "Account not found"});
                    }
                    await bcrypt.compare(data.password , user2.Password).then((result) => {
                        if(!result){
                            return res
                            .status(StatusCodes.INTERNAL_SERVER_ERROR)
                            .json({message : "Username or Password is incorrect"});
                        }
                        const token = jwt.sign({data : user } , bdConfig.secret , {
                            expiresIn : "2hr"
                        });
                        res.cookie("auth" , token);
                        return res
                        .status(StatusCodes.OK)
                        .json({ action : "ADD_USER", token, data : user });
                });
            }catch(err){
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({message : "Unknown Error Occured"});
            }
        },

        GetUserData : async(req,res) => {
            try{
                const UserData = await User.findById(req.user._id);
                return res
                .status(StatusCodes.OK)
                .json({ action : "ADD_USER", data : UserData });
            }catch(err){
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({message : "Unknown Error Occured"});
            }
        },

        GetUserStocks : async(req, res) => {
            try{
                const userData = await User.findById(req.user._id).populate("StockData");
                return res
                .status(StatusCodes.OK)
                .json({ action : "ADD_USERSTOCKS", data : userData.StockData });
            }catch(err){
                return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({message : "Unknown Error Occured"});
            }
        }
    }