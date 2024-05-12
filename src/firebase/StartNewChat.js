import db from "./FireStoreData";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export const addNewCollection = async (chat_id, unitId, pm_company_id) => {
  let d = {
    [unitId]: 0,
    [pm_company_id]: 0,
  };
  let req = {
    unit: unitId,
  };

  let collRef = doc(db.db, `unitID/${unitId}/requestID/${chat_id}`);
  let addFiled = doc(db.db, `unitID/${unitId}`);
  try {
    await setDoc(doc(db.db, "comments", chat_id.toString()), {});
    await setDoc(collRef, d);
    await setDoc(addFiled, req);
  } catch (e) {
    toast.error("Error adding document: ", e)
  }
};
