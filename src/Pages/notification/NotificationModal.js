import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { postApi } from "../../services/ApiMethod";
import { BellCount } from "../../store/action/NotificationTab";
import IntlMassage from "../../utils/IntlMassage";
import {
  InfoLine,
  InfoValue,
  ModalLabel,
  ModalWrap,
  TableLoaderWrap,
} from "../Styles";

export default function NotificationModal({ show, onHide, id }) {
  const Dir = useSelector((state) => state.Language.dir);
  const ActiveTab = useSelector((state) => state.Notification.ativeTab);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getMessage = async () => {
    setLoading(true);
    if (ActiveTab === 2) {
      let req = {
        tenant_notification_id: id,
      };
      let res = await postApi("view_tenant_notification_for_pm", req);
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(res.message, { theme: "colored" });
      }
    }
    if (ActiveTab === 1) {
      let req = {
        admin_notification_id: id,
      };
      let res = await postApi("view_admin_notification_for_pm", req);
      if (res.status === 200) {
        dispatch(BellCount(res.count));
        setData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(res.message, { theme: "colored" });
      }
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div>
      <Modal
        show={show}
        backdrop="static"
        size="lg"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalWrap Dir={Dir}>
          <span className="cross-btn" onClick={onHide}>
            <i className="icon-cross" />
          </span>
          <ModalLabel Dir={Dir}>
            <IntlMassage id="Notification.notificationDetails" />
          </ModalLabel>

          {loading ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : (
            <BoxNotification Dir={Dir}>
              <InfoLine>
                <InfoLabelNotification>
                  <IntlMassage id="table.title" />
                </InfoLabelNotification>
                <InfoValue>{data.title}</InfoValue>
              </InfoLine>
              {ActiveTab === 2 && (
                <InfoLine>
                  <InfoLabelNotification>
                    <IntlMassage id="table.sendto" />
                  </InfoLabelNotification>
                  <InfoValue>{data.tenant}</InfoValue>
                </InfoLine>
              )}
              <InfoLine>
                <InfoLabelNotification>
                  <IntlMassage id="table.datetime" />
                </InfoLabelNotification>
                <InfoValue>{data.created_at}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabelNotification>
                  <IntlMassage id="Notification.MessageDescription" />
                </InfoLabelNotification>
                <InfoValue>{data.message}</InfoValue>
              </InfoLine>
            </BoxNotification>
          )}
        </ModalWrap>
      </Modal>
    </div>
  );
}

const BoxNotification = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoLabelNotification = styled.div`
  min-width: 180px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
`;
