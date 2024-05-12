import db from "./FireStoreData";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { sendNotification } from "./SendNotification";

// send message with thumbnail parameter
export const sendMediaMsg = async ({
  chat_id,
  senderID,
  senderName,
  id,
  message,
  receiverID,
  tenantID,
  messageType,
  thumbURL,
  unit_id,
}) => {
  let collRef = collection(db.db, `comments/${chat_id}/messages`);

  const d = new Date();
  let time = d.getTime();

  const res = await addDoc(collRef, {
    senderID,
    senderName,
    message,
    receiverID,
    tenantID,
    messageType,
    timestamp: time,
    thumbURL,
  });
  updateUnreadStatus(chat_id, senderID, receiverID, unit_id);
  if (res.id) {
    fireNotification({ senderName, message, tenantID, receiverID, chat_id });
  }
  return res;
};

export const updateUnreadStatus = async (
  chat_id,
  senderID,
  receiverID,
  unit_id
) => {
  let docRef = doc(db.db, `unitID/${unit_id}/requestID/${chat_id}`);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data();
  let receiverCount = data[receiverID] + 1;
  let senderCount = data[senderID];
  let d = {
    [receiverID]: receiverCount,
    [senderID]: senderCount,
  };
  await setDoc(doc(db.db, `unitID/${unit_id}/requestID/${chat_id}`), d);
};

export const markAsRead = async (chat_id, senderID, receiverID, unit_id) => {
  let docRef = doc(db.db, `unitID/${unit_id}/requestID/${chat_id}`);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data();
  let receiverCount = data[receiverID];
  let d = {
    [senderID]: 0,
    [receiverID]: receiverCount === "undefined" ? 0 : receiverCount,
  };

  await setDoc(doc(db.db, `unitID/${unit_id}/requestID/${chat_id}`), d);
};

export const getUnreadCount = async (chat_id, senderID, unit_id) => {
  onSnapshot(doc(db.db, `unitID/${unit_id}/requestID/${chat_id}`), (doc) => {
    let data = doc.data();
    let senderCount = data[senderID];
    return senderCount;
  });
};

const fireNotification = async ({
  senderName,
  message,
  tenantID,
  receiverID,
  chat_id,
}) => {
  let messagePayload = {
    title: `${senderName}`,
    body: message,
  };
  let dataPayload = `contolio_${tenantID}`;
  await sendNotification(messagePayload, dataPayload, receiverID, chat_id);
};
