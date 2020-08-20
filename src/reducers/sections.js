export const defaultSectionsState = [];

export default (state = defaultSectionsState, action) => {
  switch (action.type) {
    case "ADD_SECTION":
      return [...state, action.section];
    default:
      return state;
  }
};
