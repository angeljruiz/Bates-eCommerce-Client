import dashReducer, { defaultDashState } from "./dash";
import sectionsReducer, { defaultSectionsState } from "./sections";

export const defaultState = {
  dash: { ...defaultDashState },
  sections: [...defaultSectionsState],
};

export default (state = defaultState, action) => {
  switch (action.reducer) {
    case "dash":
      return { ...state, dash: dashReducer(state.dash, action) };
    case "sections":
      return { ...state, sections: sectionsReducer(state.sections, action) };
    default:
      return state;
  }
};
