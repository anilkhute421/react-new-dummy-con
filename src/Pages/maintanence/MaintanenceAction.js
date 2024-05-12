import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/DeleteDialog";
import { ActionBox, Delete, Edit, Unlink, View } from "../../components/Style";
import { postApi } from "../../services/ApiMethod";
import ExpertModal from "./Modalmaintanence/ExpertModal";
import styled from "styled-components";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../firebase/FireStoreData";

export default function MaintanenceAction({ Action, id, reqData }) {
  const senderID = useSelector((state) => state.Auth.data.pm_company_id);
  const history = useHistory();
  const [reqOpen, setReqOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [unreadComment, setUnreadComment] = useState(0);

  const viewDetail = () => {
    if (reqData.expense_item_id) {
      let id = reqData.expense_item_id;
      history.push(Action.pathname, (id = { id }));
    } else {
      history.push(Action.pathname, (id = { id }));
    }
  };

  const editDetail = () => {
    if (reqData.expense_item_id) {
      let id = reqData.expense_item_id;
      history.push(Action.pathnameEdit, (id = { id }));
    } else {
      history.push(Action.pathnameEdit, (id = { id }));
    }
  };

  const openModal = (reqData) => {
    setReqOpen(true);
  };
  const closeModal = () => {
    setReqOpen(false);
    setOpenDelete(false);
  };

  const DeleteDone = () => {
    setOpenDelete(true);
  };
  const del = async () => {
    if (reqData.speciality_name) {
      let req = {
        expert_id: reqData.id,
      };
      let res = await postApi("delete_expert", req);
      if (res.status === 200) {
        closeModal();
        toast.info(res.message, { theme: "colored" });
        window.location.reload();
      } else {
        closeModal();
        toast.error(res, { theme: "colored" });
      }
    }
    if (reqData.expenses) {
      let req = {
        item_id: reqData.expense_item_id,
      };

      let res = await postApi("delete_expense_item_by_id", req);
      if (res.status === 200) {
        closeModal();
        toast.info(res.message, { theme: "colored" });
        window.location.reload();
      } else {
        closeModal();
        toast.info(res.message, { theme: "colored" });
      }
    }
  };

  const updateUnreadCount = () => {
    onSnapshot(
      doc(db.db, `unitID/${reqData.unit_id}/requestID`, id.toString()),
      (doc) => {
        let data = doc.data();
        let senderCount = data[senderID];
        setUnreadComment(senderCount);
      }
    );
  };

  useEffect(() => {
    updateUnreadCount();
  }, []);

  return (
    <ActionBox>
      {reqOpen && (
        <ExpertModal show={reqOpen} onHide={closeModal} id={reqData.id} />
      )}
      <DeleteDialog
        handleConfirm={() => del()}
        show={openDelete}
        onHide={closeModal}
      />
      {Action.view && !Action.openModal && (
        <View onClick={viewDetail} className="icon-view" />
      )}
      {Action.view && Action.openModal && (
        <View onClick={openModal} className="icon-view" />
      )}
      {Action.edit && <Edit onClick={editDetail} className="icon-edit" />}
      <Badge className={unreadComment > 0 ? "" : "d-none"}>
        {unreadComment}
      </Badge>
      {Action.delete && <Delete className="icon-delete" onClick={DeleteDone} />}
      {Action.unlink && <Unlink>Unlink</Unlink>}
      {Action.link && <Unlink>Link</Unlink>}
    </ActionBox>
  );
}

const Badge = styled.span`
  width: 20px;
  height: 20px;
  margin-top: 18px;
  border-radius: 50%;
  background: red;
  color: #fff;
  font-weight: 500;
  left: ${({ Dir }) => Dir === "rtl" && "0px"};
  right: ${({ Dir }) => Dir === "ltr" && "0px"};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
`;
