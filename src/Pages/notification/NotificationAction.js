import React, { useState } from "react";
import { ActionBox, Delete, View } from "../../components/Style";
import NotificationModal from "./NotificationModal";
import DeleteDialog from "../../components/DeleteDialog";
import { useSelector } from "react-redux";
import { postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";

export default function NotificationAction({ Action, id }) {
  const [reqOpen, setReqOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const activeTab = useSelector((state) => state.Notification.ativeTab);

  const openModal = () => {
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

  const deleteToTenant = async () => {
    let req = {
      tenant_notification_id: id,
    };
    let res = await postApi("pm_delete_tenant_noti", req);
    if (res.status === 200) {
      closeDelModal();
      toast.info(res.message, { theme: "colored" });
      Action.listing();
    } else {
      closeDelModal();
      toast.info(res.message, { theme: "colored" });
    }
  };

  const handleConfirm = () => {
    if (activeTab === 2) {
      deleteToTenant();
    }
  };
  
  return (
    <div>
      <ActionBox>
        <DeleteDialog
          show={openDelete}
          onHide={closeDelModal}
          handleConfirm={handleConfirm}
        />
        {reqOpen && (
          <NotificationModal show={reqOpen} onHide={closeModal} id={id} />
        )}

        {Action.view && Action.openModal && (
          <View onClick={openModal} className="icon-view" />
        )}
        {Action.delete && (
          <Delete onClick={openDelModal} className="icon-delete" />
        )}
      </ActionBox>
    </div>
  );
}
