import dashReducer, { defaultDashState } from "./dashReducer";

export const defaultState = { dash: { ...defaultDashState } };

export default (state = defaultState, action) => {
  switch (action.reducer) {
    case "dash":
      return { ...state, dash: dashReducer(state.dash, action) };
    default:
      return state;
  }
};
