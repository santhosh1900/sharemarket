import { ADD_STOCKS } from "./StockAction";

const initialState = {
    Stocks        : [],
    TotalStocks   : 314,
};

export default (state = initialState , action) => {
    switch(action.type) {
        case ADD_STOCKS:
            return{
                ...state,
                Stocks : action.data
            }
        default:
            return state
    }
}
