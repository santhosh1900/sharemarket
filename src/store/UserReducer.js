import { ADD_USER, LOGOUT_USER, ADD_USERSTOCKS, EDIT_USERSTOCKS} from "./UserAction";
import _ from "lodash";
const initialState = {
    UserData        : null,
    UserStocks      : []
};

export default (state = initialState , action) => {
    switch(action.type) {
        case ADD_USER:
            return{
                ...state,
                UserData : action.data
            }
        case LOGOUT_USER:
            return{
                ...state,
                UserData : null
            }
        case ADD_USERSTOCKS:
            return{
                ...state,
                UserStocks : action.data
            }
        case EDIT_USERSTOCKS:
            let UserDataStocks = state.UserData;
            _.remove(UserDataStocks.StockData, function(i){
                return i == action.data
            });
            let stocks = state.UserStocks;
            _.remove(stocks, function(data){
                return data._id == action.data;
            });
            return{
                ...state,
                UserData : UserDataStocks,
                UserStocks : stocks
            }
        default:
            return state
    }
}