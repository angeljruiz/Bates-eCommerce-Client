const productsDefaultState = [];

export default (state = productsDefaultState, action) => {
  let t;
  switch (action.type) {
    case "ADD_PRODUCTS":
      return [...state, ...action.products];
    case "EDIT_PRODUCT":
      t = state.find((p) => p.sku === action.product);
      return [...state, ...t];
    case "ADD_IMAGE":
      t = state.find((p) => p.sku === action.id);
      t.images.push(action.image);
      return [...state.filter((s) => s.sku !== action.id), t];
    case "DELETE_IMAGE":
      t = state.find((p) => p.sku === action.id);
      t.images = t.images.filter((img, i) => i !== Number(action.image));
      return [...state.filter((s) => s.sku !== action.id), t];
    case "DELETE_PRODUCT":
      return [...state.filter((p) => p.sku !== action.id)];
    default:
      return state;
  }
};
