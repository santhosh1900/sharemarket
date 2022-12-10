const express           = require("express"),
      serverless        = require("serverless-http"), 
      app               = express(),
      mongoose          = require("mongoose"),
      PORT              = process.env.PORT || 3001,
      cookieParser      = require("cookie-parser"),
      bodyParser        = require("body-parser"),
      StockDataRoute    = require("../Routes/StockData"),
      {MONGO_URI}       = require("../key"),
      UserRoute         = require("../Routes/UserRoute"),
      cors              = require("cors"),
      router            = express.Router();


app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

mongoose.Promise        = global.Promise;
mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false	
}).then(() =>{
    console.log("connected to db cluster");
}).catch(err =>{
    console.log("error",err.message);
});


app.use(express.json({ limit : "50mb" }));

app.use(express.urlencoded({ extended : true  , limit : "50mb"}));

      
router.get("/" , (req,res) => {
    res.json({message : "nothing to view here"});
});

app.use('/.netlify/functions/api',router); 
app.use('/.netlify/functions/api',StockDataRoute);
app.use('/.netlify/functions/api',UserRoute);
     
module.exports = app;
module.exports.handler = serverless(app);      
      
// app.listen(PORT,()=>{
//     console.log("server is running in port" ,PORT);
// });