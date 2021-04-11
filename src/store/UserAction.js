import { apiCall } from "../service/api";
import cookies from 'universal-cookie';
const Cookie = new cookies();


export const ADD_USER = "ADD_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_USERSTOCKS = "ADD_USERSTOCKS";
export const EDIT_USERSTOCKS = "EDIT_USERSTOCKS";
// const url = "http://localhost:3001";
const url = "https://stockmarketbackend.herokuapp.com";


export function LogoutUser(){
  return dispatch => {
    dispatch({type : LOGOUT_USER });
  }
}


export function setCurrentUser(user) {
  return dispatch => {
    dispatch({type: ADD_USER, data : user});
  };
}

export function RequestFunction (method, type, data=""){
    return async dispatch => {
      try{  
        let responseData; 
        if(method === "get" || method === "delete"){
          responseData = await apiCall(method , `${url}/${type}`);
        }else{
          responseData = await apiCall(method , `${url}/${type}`, { data });
        } 
        if(responseData.token){
          let token              = responseData.token;
          let token_user         = responseData["data"];
          localStorage.setItem("token", token);
          Cookie.set("token", token , {path : "/"});
          localStorage.setItem('userdata', JSON.stringify(token_user)); 
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