import { combineReducers } from "redux";
import pricesReducer from "./pricesReducer.js";
import coinsReducer from "./coinsReducer.js";

export default combineReducers({
    prices: pricesReducer,
    coins: coinsReducer,
});