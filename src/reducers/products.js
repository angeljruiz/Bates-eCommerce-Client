const productsDefaultState = [];

export default (state = productsDefaultState, action) => {
  let t;
  switch (action.type) {
    case "ADD_PRODUCTS":
      if (!Array.isArray(action.products)) {
        return [
          ...state.filter((p) => p.id !== action.products.id),
          action.products,
        ];
      } else {
        return [
          ...state.filter((p) =>
            action.products.find((product) => p.id === product.id)
          ),
          ...action.products,
        ];
      }
    case "EDIT_PRODUCT":
      t = state.find((p) => p.id === action.product);
      return [...state, ...t];
    case "ADD_IMAGE":
      t = state.find((p) => p.id === action.id);
      t.images.push(action.image);
      return [...state.filter((s) => s.id !== action.id), t];
    case "DELETE_IMAGE":
      t = state.find((p) => p.id === action.id);
      t.images = t.images.filter((img, i) => i !== Number(action.image));
      return [...state.filter((s) => s.id !== action.id), t];
    case "DELETE_PRODUCT":
      return [...state.filter((p) => p.id !== action.id)];
    default:
      return state;
  }
};
