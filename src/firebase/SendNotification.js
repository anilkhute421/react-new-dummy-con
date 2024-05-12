import { postApi } from "../services/ApiMethod";

export const sendNotification = async (dataPayload, fcmToken , receiverID , chat_id) => {

  const req = {
    topic: fcmToken,
    title: dataPayload.title,
    message: dataPayload.body,
    unit_id : receiverID,
    request_for_id: chat_id
  };
  await postApi("send_push_noti_for_frontend", req);
};




