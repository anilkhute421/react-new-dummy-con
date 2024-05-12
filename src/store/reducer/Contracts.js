import { SEARCH_CONTRACT, LOGOUT } from "../Constants";

const initialState = {
  keyword: "",
};

export default function Contracts(state = initialState, action) {
  switch (action.type) {
    case SEARCH_CONTRACT:
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
