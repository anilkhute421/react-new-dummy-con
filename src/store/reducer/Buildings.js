import { SEARCH_BUILDING,LOGOUT } from "../Constants";

const initialState = {
    keyword:''
}
export default function Buildings(state = initialState, action) {

    switch (action.type) {
        case SEARCH_BUILDING:
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