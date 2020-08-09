export const showDashProductModal = (show) => {
  return {
    type: "SHOW_DASH_PRODUCT_MODAL",
    reducer: "dash",
    show,
  };
};

export const selectProduct = (id) => {
  return {
    type: "SELECT_PRODUCT",
    reducer: "dash",
    id,
  };
};

export const selectProductThumb = (id) => {
  return {
    type: "SELECT_PRODUCT_THUMB",
    reducer: "dash",
    id,
  };
};

export const addOrders = (orders) => {
  return {
    type: "ADD_ORDERS",
    reducer: "dash",
    orders,
  };
};
