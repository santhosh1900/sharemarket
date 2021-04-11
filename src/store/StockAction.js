import { apiCall } from "../service/api";


export const ADD_STOCKS = "ADD_STOCKS";
// const url = "http://localhost:3001";
const url = "https://stockmarketbackend.herokuapp.com";




export function RequestFunction (method , type , data=""){
    return async dispatch => {
      try{  
        let responseData; 
        if(method === "get" || method === "delete"){
          responseData = await apiCall(method , `${url}/${type}`);
        }else{
          responseData = await apiCall(method , `${url}/${type}`, { data });
        }  
        return dispatch({ 
          type      : responseData["action"],
          data      : responseData["data"]
        });
      }catch(err){
        throw(err);
      }
    }
  }
