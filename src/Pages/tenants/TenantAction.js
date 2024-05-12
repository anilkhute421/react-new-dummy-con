import React, { useState } from "react";
import { useHistory } from "react-router";
import TenantRequestModal from "./Modals/TenantRequestModal";
import {
  ActionBox,
  View,
  Edit,
  Delete,
  Unlink,
 
} from "../../components/Style";
import DeleteDialog from "../../components/DeleteDialog";

export default function TenantAction({ Action, id, reqData }) {
  const history = useHistory();
  const [reqOpen, setReqOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const viewDetail = () => {
    history.push(Action.pathname  , id={id});
  };
  const editDetail = () => {
    history.push(Action.pathnameEdit , id={id});
  };
  const openModal = (reqData) => {
    setReqOpen(true);
  };
  const closeModal = () => {
    setReqOpen(false);
  };

  const openDelModal = () => {
    setOpenDelete(true);
  };
  const closeDelModal = () => {
    setOpenDelete(false);
  };

  return (
    <ActionBox>
      <TenantRequestModal show={reqOpen} onHide={closeModal} data={reqData} />
      <DeleteDialog show={openDelete} onHide={closeDelModal} />

      {Action.view && !Action.openModal && (
        <View onClick={viewDetail} className="icon-view" />
      )}
      {Action.view && Action.openModal && (
        <View onClick={openModal} className="icon-view" />
      )}
      {Action.edit && <Edit onClick={editDetail} className="icon-edit" />}
      {Action.delete && (
        <Delete onClick={openDelModal} className="icon-delete" />
      )}
     
      {Action.unlink && <Unlink>Unlink</Unlink>}
      {Action.link && <Unlink>Link</Unlink>}
    </ActionBox>
  );
}
