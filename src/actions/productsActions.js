export const addProduct = (products) => {
  return {
    type: "ADD_PRODUCTS",
    products,
  };
};

export const deleteProduct = (id) => {
  return {
    type: "DELETE_PRODUCT",
    id,
  };
};

export const showModal = (show) => {
  return {
    type: "SHOW_MODAL",
    show,
  };
};
