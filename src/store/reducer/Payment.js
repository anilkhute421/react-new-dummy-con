import { SEARCH_PAYMENT, LOGOUT } from "../Constants";

const initialState = {
    keyword: "",
  };


export default function Payment(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PAYMENT:
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
