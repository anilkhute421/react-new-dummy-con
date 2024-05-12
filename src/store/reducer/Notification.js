import { NOTIFICATION, BELL_COUNT , LOGOUT, SEARCH_NOTIFICATION, UNREAD_MESSAGE } from "../Constants";

const initialState = {
  ativeTab: 1,
  bellcount:0,
  unReadMessage : 0,
  searchNotification :""
};

export default function Notification(state = initialState, action) {

  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        ativeTab: action.payload,
      };
      case BELL_COUNT:
        return {
          ...state,
          bellcount:action.payload
        }
        case UNREAD_MESSAGE:
          return {
            ...state,
            unReadMessage:action.payload
          }
        case SEARCH_NOTIFICATION:
        return {
          ...state,
          searchNotification:action.payload
        }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
