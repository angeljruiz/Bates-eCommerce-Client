const defaultState = {
  productModal: true,
  selectedProduct: null,
  selectedProductThumb: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "SHOW_DASH_PRODUCT_MODAL":
      return { ...state, productModal: action.show };

    case "SELECT_PRODUCT":
      return { ...state, selectedProduct: action.id };
    case "SELECT_PRODUCT_THUMB":
      return { ...state, selectedProductThumb: action.id };
    default:
      return state;
  }
};
