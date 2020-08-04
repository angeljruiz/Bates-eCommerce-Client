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
