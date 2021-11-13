import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  weatherReducer,
} from "./reducers/weatherReducer";
import {
  toggleFavoritesReducer
} from './reducers/FavoritesReducer'

const combine_reducers = combineReducers({
  weatherReducer,
  toggleFavoritesReducer
});

const middleware = [thunk];
const store = createStore(
  combine_reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
