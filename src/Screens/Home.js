import React , { useEffect , useState, useCallback } from 'react';
import { RequestFunction } from "../store/StockAction";
import { useDispatch , useSelector } from "react-redux";
import Card from "../Components/Card";
import "./Home.css";
import StockTable from "../Components/Table";
import * as M from "materialize-css";
import { useHistory } from "react-router-dom";

function Home() {
    const history                                       = useHistory();
    const dispatch                                      = useDispatch();
    const AllStocks                                     = useSelector(state => state.stocks);
    const [pageNumber , setPageNumber]                  = useState(1);
    const [previousPageNumber , setPreviousPageNumber]  = useState(0);
    const [isLoading , setIsLoading]                    = useState(true);
    const [search, setSearch]                           = useState("");
    
    const UpdatePageNumber = useCallback(async (num=1) => {
        if(pageNumber >= 0){
            num == -1 ? setPreviousPageNumber(prev => prev - 1) : setPreviousPageNumber(pageNumber);
            setPageNumber(prev => prev + num);
        }
    },[pageNumber, previousPageNumber]);


    useEffect(() => {
        if(search == ""){
            console.log("running fetch");
            fetchdata();
        }else{
            console.log("running search");
            fetchSearchData();
        }
    },[pageNumber, search]);

    const fetchdata = async () => {
        try{
            setIsLoading(true);
            await dispatch(RequestFunction("get",`allstocks?page=${pageNumber}`));
            setIsLoading(false);
            return
        }catch(err){
            setIsLoading(false);
            return
        }
    }

    const fetchSearchData = async () => {
        try{
            // /searchstocks/:search
            await setIsLoading(true);
            await dispatch(RequestFunction("get",`searchstocks/${search}`));
            await setIsLoading(false);
            return
        }catch(err){
            setIsLoading(false);
            return
        }
    }
    const UpdateSearch = async (e) => {
        try{
            await setSearch(e.target.value);
        }catch(err){
            console.log(err)
            setIsLoading(false);
            return
        }
    }

    const AddStockData = async(id) => {
        try{
            await dispatch(RequestFunction("post","addstock",id));
            return M.toast({html: "Stock Data is added" , classes:"green"});
        }catch(err){
            console.log(err)
            return M.toast({html: "Unkown Error occured" , classes:"#c62828 red darken-3"});
        }
    }

    const Navigate_to_Userstocks = () => {
        history.push("/userstocks");
    }

    return (
        <div className="Home">
            <Card />
            <StockTable 
                data                = {AllStocks.Stocks} 
                UpdatePageNumber    = {UpdatePageNumber} 
                pageNumber          = {pageNumber} 
                previousPageNumber  = {previousPageNumber} 
                totalStocks         = {AllStocks.TotalStocks}
                isLoading           = {isLoading}
                AddStockData        = {AddStockData}
                Navigate_to_Userstocks = {Navigate_to_Userstocks}
                search                 = {search}
                UpdateSearch           = {UpdateSearch}
            />
        </div>
    )
}

export default Home
