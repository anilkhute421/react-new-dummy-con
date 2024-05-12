import { LOGIN,LOGOUT,EMAIL, UPDATE_PROFILE } from "../Constants";

const initialState = {
   token:null,
   data:{},
   email:null,
}

export default function User(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                data: action.payload,
                token:action.payload.token,
            };
            case EMAIL:
                return{
                    ...state,
                    email:action.payload
                }
            case UPDATE_PROFILE:
                return{
                    ...state,
                    data:action.payload
                }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}