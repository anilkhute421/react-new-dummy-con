import { NOTIFICATION , BELL_COUNT , SEARCH_NOTIFICATION, UNREAD_MESSAGE } from "../Constants";

export const NotificationTab = (keyword ) => {
  return { type: NOTIFICATION, payload: keyword }
};

export const BellCount = (keyword) =>{
  return { type: BELL_COUNT, payload: keyword }
};

export const unReadMessageTotalCount = (keyword) => {
  return { type: UNREAD_MESSAGE , payload: keyword }

}

export const SearchNotification = (keyword) => {
  return { type: SEARCH_NOTIFICATION, payload: keyword }
}