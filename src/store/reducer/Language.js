import { SELECT_LANGUAGE,LOGOUT } from "../Constants";

const initialState = {
    language: 'en',
    dir: 'ltr'
}
export default function User(state = initialState, action) {
    switch (action.type) {
        case SELECT_LANGUAGE:
            return {
                ...state,
                language: action.payload.language,
                dir: action.payload.dir
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}