import { SEARCH_OWNER,LOGOUT } from "../Constants";

const initialState = {
    keyword: ""
}
export default function Owners(state = initialState, action) {
 
    switch (action.type) {
        case SEARCH_OWNER:
            return {
                ...state,
                keyword:action.payload
            };
            case LOGOUT:
                return initialState;
        default:
            return state;
    }
}