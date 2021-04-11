import axios from "axios";
import cookies from 'universal-cookie';
const Cookie = new cookies();


export const apiCall = async (method, path, data = "") => {
    try{
      if(!Cookie.get("token")){
        axios.defaults.headers.common["Authorization"] = "Sharemarket";
      }else{
        axios.defaults.headers.common["Authorization"] = `Sharemarket ${Cookie.get("token")}`;
      }
      const responseData = data ? await axios[method.toLowerCase()](path, data) : await axios[method.toLowerCase()](path);
      return (responseData.data);
    }catch(err){
      throw(err.response.data.message);
    }
}