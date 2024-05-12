import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Loader from "../../Loader/Loader";
import { postApi } from "../../services/ApiMethod";
import IntlMassage from "../../utils/IntlMassage";
import { ModalLabel, ModalWrap, NoData } from "../Styles";

export default function ChequeView({ show, id, onHide }) {
  const dir = useSelector((state) => state.Language.dir);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getChequeDetail = async () => {
    let d = {
      payment_id: id,
    };
    let res = await postApi("view_payment_by_payment_id", d);
    if (res.status === 200) {
      setLoading(false);
      setData(res.data);
    } else {
      toast.error(res.message, { theme: "colored" });
      setLoading(false);
      onHide();
    }
  };

  useEffect(() => {
    getChequeDetail();
  }, []);
  return (
    <div style={{zIndex:99999,position:"relative"}}>
      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        show={show}
        centered
      >
        <ModalWrap Dir={dir}  style={{zIndex:"99",position:"relative"}}>
          <span className="cross-btn" onClick={onHide}>
            <i className="icon-cross" />
          </span>
          <ModalLabel dir={dir}>
            <IntlMassage id="payment.chequePayment" />
            {loading ? (
              <NoData>
                <Loader />
              </NoData>
            ) : (
              <PaymentModalWrap>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.amount" />
                  </KeyInfo>
                  <ValueInfo>{data.symbol} {data.amount}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.cheque" />
                  </KeyInfo>
                  <ValueInfo>{data.cheque_no}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.tenantname" />
                  </KeyInfo>
                  <ValueInfo>{data.tenant_name}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.building" />
                  </KeyInfo>
                  <ValueInfo>{data.building_name}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.unitno" />
                  </KeyInfo>
                  <ValueInfo>{data.unit_no}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.paymentdate" />
                  </KeyInfo>
                  <ValueInfo>{data.payment_date}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="payment.paymentcode" />
                  </KeyInfo>
                  <ValueInfo>{data.payment_code}</ValueInfo>
                </PaymentModal>
                <PaymentModal>
                  <KeyInfo>
                    <IntlMassage id="table.status" />
                  </KeyInfo>
                  <ValueInfo>{data.status}</ValueInfo>
                </PaymentModal>
              </PaymentModalWrap>
            )}
          </ModalLabel>
        </ModalWrap>
      </Modal>
    </div>
  );
}

const KeyInfo = styled.span`
  min-width: 130px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
`;

const ValueInfo = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
`;

const PaymentModal = styled.div`
display: flex;
flex-direction:row;
justify-content-center;
align-items-center;
padding:15px;
width:100%;

label{
  min-width:100px;
}
@media screen and (max-width:400px){
  padding:20px 10px;
}
@media screen and (max-width:500px){
  display: flex;
  flex-direction:column;
}
`;

const PaymentModalWrap = styled.div`
  border: 1px solid rgba(20, 93, 160, 0.3);
  box-sizing: border-box;
  border-radius: 6px;
  padding: 20px;
  margin: 30px;
`;
