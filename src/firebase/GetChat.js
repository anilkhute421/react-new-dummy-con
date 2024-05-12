import db from "./FireStoreData";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const getChat = async ({ id, getUpdatedChat }) => {
  let collRef = collection(db.db, `comments/${id}/messages`);
  const q = query(collRef, orderBy("timestamp", "asc"));
  onSnapshot(q, (doc) => getData(doc.docs));

  const getData = (payload) => {
    let d = payload.map((ele) => ({ ...ele.data() }));
    getUpdatedChat(d);
  };
};

export const getUreadCount = async (chat_id, senderID, updateUnreadCount) => {
 
  try {
    const docRef = collection(db.db, `unreadMessages/${chat_id}/${senderID}`);
    // let docRef = doc(db.db, `unitID/${unit_id}/requestID/${chat_id}`);

    const q = query(docRef);
    onSnapshot(q, (doc) => updateUnreadCount(doc.docs));
  } catch (err) {
    console.log(err);
  }
};
