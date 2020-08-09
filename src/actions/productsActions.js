export const addProduct = (products) => {
  return {
    type: "ADD_PRODUCTS",
    products,
  };
};

export const addImage = (id, image) => {
  return {
    type: "ADD_IMAGE",
    id,
    image,
  };
};

export const deleteImage = (id, image) => {
  return {
    type: "DELETE_IMAGE",
    id,
    image,
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
