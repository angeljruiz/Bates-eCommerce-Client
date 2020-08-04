import dashReducer from "./dashReducer";

const defaultState = { dash: { productModal: false, selectedProduct: null } };

export default (state = defaultState, action) => {
  switch (action.reducer) {
    case "dash":
      return { ...state, dash: dashReducer(state.dash, action) };
    default:
      return state;
  }
};
