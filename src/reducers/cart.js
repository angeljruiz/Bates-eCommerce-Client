const cartDefaultState = { show: false, products: [], totalItems: 0 };

export default (state = cartDefaultState, { type, product, show }) => {
  switch (type) {
    case "SHOW_CART":
      return { ...state, show };
    case "ADD_PRODUCT_CART":
      let item = state.products.findIndex((p) => p.id === product.id);
      if (state.products[item] !== undefined)
        product.amount += state.products[item].amount;
      return {
        ...state,
        products: [
          ...state.products.filter((p) => p.id !== product.id),
          product,
        ],
        totalItems:
          state.totalItems +
          product.amount -
          ((state.products[item] || {}).amount || 0),
      };
    case "REMOVE_PRODUCT":
      let products = {};

      Object.keys(state.products).forEach((k) => {
        if (product.id !== state.products[k].id)
          products[k] = state.products[k];
      });

      return {
        ...state,
        products: { ...products },
        totalItems: state.totalItems - product.amount,
      };
    default:
      return state;
  }
};
