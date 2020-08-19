import { createStore, combineReducers } from "redux";

import globalReducer from "../reducers/global";
import productsReducer from "../reducers/products";
import accountReducer from "../reducers/account";
import cartReducer from "../reducers/cart";
import sidebarReducer from "../reducers/sidebar";

export default () => {
  return createStore(
    combineReducers({
      products: productsReducer,
      account: accountReducer,
      cart: cartReducer,
      sidebar: sidebarReducer,
      global: globalReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};
