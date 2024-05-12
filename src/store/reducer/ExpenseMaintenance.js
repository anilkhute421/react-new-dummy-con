import { SEARCH_EXPENSE, LOGOUT } from "../Constants";

const initialState = {
  keyword: "",
};

export default function ExpenseMaintenance(state = initialState, action) {
  switch (action.type) {
    case SEARCH_EXPENSE:
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
