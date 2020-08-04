const productsDefaultState = [];

export default (state = productsDefaultState, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return [...state, ...action.products];
    case "DELETE_PRODUCT":
      return [...state.filter((p) => p.sku !== action.id)];
    default:
      return state;
  }
};
