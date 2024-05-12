import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/DeleteDialog";
import { ActionBox, Delete, Edit, View } from "../../components/Style";
import { postApi } from "../../services/ApiMethod";
import ChequeView from "./ChequeView";
import ManualView from "./ManualView";

export default function PaymentAction({ Action, id, reqData }) {
  const history = useHistory();
  const [chequeOpen, setChequeOpen] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const editDetail = () => {
    history.push(Action.pathnameEdit,  id={id});
  };


  
  const openModal = () => {
    setChequeOpen(true);
    // setTimeout(()=>Action.closeParentModal(),1000)
    
  };
  const closeModal = () => {
    setChequeOpen(false);
  };
  const openManualModal = () => {
    setManualOpen(true);
  };
  const closeManualModal = () => {
    setManualOpen(false);
  };

  const openModal1 = () => {
    setOpenDelete(true);
  };
  const closeModal1 = () => {
    setOpenDelete(false);
  };

  const del = async () => {
    let d = {
      payment_id: reqData.id,
    };

    let res = await postApi("delete_payment", d);
    if (res.status === 200) {
      toast.info(res.message, { theme: "colored" });
      closeModal();
      window.location.reload();
    } else {
      toast.error(res, { theme: "colored" });
    }
  };
  return (
    <div>
      <ActionBox>
        <DeleteDialog
          handleConfirm={() => del()}
          show={openDelete}
          onHide={closeModal1}
        />
        {chequeOpen && (
          <ChequeView
            show={chequeOpen}
            data={reqData}
            id={id}
            onHide={closeModal}
          />
        )}
        {manualOpen && (
          <ManualView
            show={manualOpen}
            data={reqData}
            id={id}
            onHide={closeManualModal}
          />
        )}

        {Action.view && (reqData.payment_type === ("cheque") || reqData.payment_type === 1) && (
          <View onClick={openModal} className="icon-view" />
        )}
        {Action.view && (reqData.payment_type === "manual" || reqData.payment_type === 0 ) && (
          <View onClick={openManualModal} className="icon-view" />
        )}
        {Action.edit && <Edit onClick={editDetail} className="icon-edit" />}
        {Action.delete && (
          <Delete onClick={openModal1} className="icon-delete" />
        )}
      </ActionBox>
    </div>
  );
}
