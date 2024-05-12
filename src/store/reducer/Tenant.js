import { SEARCH_TENANT_All, LOGOUT, SEARCH_TENANT_LINKED, SEARCH_TENANT_REQUEST , SEARCH_TENANT_UNLINKED } from "../Constants";

const initialState = {
  keywordAll: "",
  keywordLinked: "",
  keywordRequest: ""
};

export default function Tenant(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TENANT_All:
      return {
        ...state,
        keywordAll: action.payload,
      };
      case SEARCH_TENANT_LINKED: 
      return {
        ...state,
        keywordLinked: action.payload
      };
      case SEARCH_TENANT_UNLINKED: 
      return {
        ...state,
        keywordUnlinked: action.payload
      };
      case SEARCH_TENANT_REQUEST: 
      return {
        ...state,
        keywordRequest: action.payload
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

