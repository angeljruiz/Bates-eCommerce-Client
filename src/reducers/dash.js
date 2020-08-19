export const defaultDashState = {
  productModal: false,
  selectedProduct: null,
  selectedProductThumb: null,
  orders: [],
};

export default (state = defaultDashState, action) => {
  switch (action.type) {
    case "SHOW_DASH_PRODUCT_MODAL":
      return { ...state, productModal: action.show };

    case "SELECT_PRODUCT":
      return { ...state, selectedProduct: action.id };
    case "SELECT_PRODUCT_THUMB":
      return { ...state, selectedProductThumb: action.id };
    case "ADD_ORDERS":
      return { ...state, orders: action.orders };
    default:
      return state;
  }
};
