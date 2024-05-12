import { SEARCH_EXPERT, LOGOUT } from "../Constants";

const initialState = {
  keyword: "",
};

export default function ExpertMaintanence(state = initialState, action) {
  switch (action.type) {
    case SEARCH_EXPERT:
      return {
        ...state,
        keyword: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
