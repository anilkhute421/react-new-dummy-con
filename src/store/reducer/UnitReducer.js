import { SEARCH_UNIT ,LOGOUT} from "../Constants";



const initialState = {
    keyword: "",
  };
  
  export default function Units(state = initialState, action) {
    switch (action.type) {
      case SEARCH_UNIT:
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
  