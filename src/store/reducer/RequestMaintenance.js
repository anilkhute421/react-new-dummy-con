import { SEARCH_REQUESTMAINTENANCE, LOGOUT } from "../Constants";

const initialState = {
  keyword: "",
};

export default function RequestMaintenance(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUESTMAINTENANCE:
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
