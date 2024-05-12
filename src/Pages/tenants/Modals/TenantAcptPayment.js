import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Modal } from "react-bootstrap";
import {BtnWrap,  ModalWrap} from "../../Styles";
import IntlMassage from "../../../utils/IntlMassage";
import TenantReqPayment from "./TenantReqPayment";
import styled from "styled-components";


export default function TenantAcptPayment(props) {
  const Dir = useSelector((state) => state.Language.dir);


  const [reqOpen, setReqOpen] = useState(false);

  const openModal = (reqData) => {
    setReqOpen(true);
  };
  const closeModal = () => {
    setReqOpen(false);
  };
  const SubmitHandler = () => {
    props.onHide();
    openModal();
  };

  return (
    <div>
      <TenantReqPayment show={reqOpen} onHide={closeModal} />

        <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
      >
        <ModalWrap Dir={Dir}>
          <span className="cross-btn" onClick={props.onHide}>
            <i className="icon-cross" />
          </span>
 
          <HeadingTitle>Would you like to link Tanant to exiting payments?</HeadingTitle>
        
          <BtnWrap>
            <button className="cancel-btn" onClick={props.onHide}>
              <IntlMassage id="button.cancel" />
            </button>
           
            <button
              className="submit-btn"
              onClick={SubmitHandler}
              type="submit"
            >
              <IntlMassage id="button.save" />
            </button>
          </BtnWrap> 
        </ModalWrap>
      </Modal>
    </div>
  );
}

const HeadingTitle = styled.h4`
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 29px;
text-align: center;

`