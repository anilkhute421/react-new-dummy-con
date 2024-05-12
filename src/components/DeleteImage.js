import React from 'react';
import { Modal } from "react-bootstrap";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SecondaryBtn } from '../GlobalStyle';
import { BtnWrap,  ModalWrap } from '../Pages/Styles';
import IntlMassage from '../utils/IntlMassage';

export default function DeleteImage({ show, handleConfirm, onHide }) {
  const Dir = useSelector((state) => state.Language.dir);

  return <div>
      <Modal
        backdrop="static"
        size="sm"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <ModalWrap Dir={Dir}>
          <Deletemessage>
            <IntlMassage id="msg.delete.sure" />
            <Icon className="mx-2 icon-delete" />
          </Deletemessage>
          <BtnWrap>
            <button className="cancel-btn" onClick={onHide}>
              <IntlMassage id="button.cancel" />
            </button>
            <SecondaryBtn
              onClick={() => handleConfirm()}
              style={{ margin: "0px 10px" }}
            >
              <IntlMassage id="button.delete" />
            </SecondaryBtn>
          </BtnWrap>
        </ModalWrap>
      </Modal>
  </div>;
}

const Deletemessage = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 500;
  color: black;
`;
const Icon = styled.i`
  color: #5e5e5ef5;
  font-size: 20px;
`;
