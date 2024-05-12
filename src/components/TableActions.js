import React, { useState } from "react";
import { ActionBox, View, Edit, Delete, Unlink } from "./Style";
import { useHistory } from "react-router";
import DeleteDialog from "./DeleteDialog";
import { getApi, postApi } from "../services/ApiMethod";
import { toast } from "react-toastify";

export default function TableActions({ Data, Action, id }) {

  const [openDelete, setOpenDelete] = useState(false);
  const history = useHistory();
  
  const viewDetail = () => {
    history.push(Action.pathname , id={id} );
   
  };
  const editDetail = () => {
      history.push(Action.pathnameEdit , id={id} );

  };
  const openModal = () => {
    setOpenDelete(true);
  };
  const closeModal = () => { 
    setOpenDelete(false);
  };

  const del = async () => {
    if (Action.delete_key === "unit_id") {
      let d = {
        [Action.delete_key]: id,
      };

      let res = await postApi(Action.deletepath, d);
      if (res.status === 200) {
        toast.info(res.message, { theme: "colored" });
        closeModal();
        window.location.reload();
      } else {
        toast.error(res, { theme: "colored" });
      }
    }
    if (Action.delete_key === "owners_id") {
      let res = await getApi("delete_owner/" + id);
      if (res.status === 200) {
        toast.info(res.message, { theme: "colored" });
        closeModal();
        window.location.reload();
      } else {
        toast.error(res, { theme: "colored" });
      }
    }
    if (Action.delete_key === "contract_id") {

      let d = {
        [Action.delete_key]: id,
      };
      let res = await postApi("delete_contract", d);
      if (res.status === 200) {
        toast.info(res.message, { theme: "colored" });
        closeModal();
        window.location.reload();
      } else {
        toast.error(res, { theme: "colored" });
      }
    }
    if (Action.delete_key === "building_id") {

      let d = {
        [Action.delete_key]: id,
      };
      let res = await postApi("building_delete_by_building_id", d);
      console.log(res , "res Dleeteb e buliduing")
      if (res.status === 200) {
        toast.info(res.message, { theme: "colored" });
        closeModal();
        window.location.reload();
      } else {
        toast.error(res, { theme: "colored" });
      }
    }
  };

  return (
    <ActionBox>
      <DeleteDialog
        handleConfirm={() => del()}
        show={openDelete}
        onHide={closeModal}
      />

      {Action.view && !Action.openModal && (
        <View onClick={viewDetail} className="icon-view" />
      )}
      {Action.view && Action.openModal && <View className="icon-view" />}

      {Action.edit && Data.is_expired === 1 ? (
        <Edit style={{ color:"grey" , opacity:"0.6" }} className="icon-edit" />) : Action.edit&&(
        <Edit onClick={editDetail} className="icon-edit" />
      )}
      {Action.delete && <Delete onClick={openModal} className="icon-delete" />}
      {Action.unlink &&<Unlink>Unlink</Unlink>}
    </ActionBox>
  );
}
