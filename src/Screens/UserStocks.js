import React,{ useState, useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import Card from "../Components/Card";
// import "./Home.css";
import StockTable from "../Components/Table";
import { RequestFunction } from "../store/UserAction";
import * as M from "materialize-css";
// /userstocks

function UserStocks() {
    const dispatch = useDispatch();
    const UserData = useSelector(state => state.user);
    const [isLoading , setIsLoading] = useState(true);

    const DeleteStockData = (id) => {
        dispatch(RequestFunction("put", "removestock", id))
    }

    useEffect(async () => {
        try{
            setIsLoading(true);
            await dispatch(RequestFunction("get","userstocks"));
            setIsLoading(false);
        }catch(err){
            return M.toast({html: "Unkown Error occured" , classes:"#c62828 red darken-3"});
        }
    },[])


    return (
        <div>
            <Card />
            <StockTable 
                data            =   { UserData.UserStocks } 
                isLoading       =   { isLoading }
                DeleteStockData =   { DeleteStockData }
            />
        </div>
    )
}

export default UserStocks
