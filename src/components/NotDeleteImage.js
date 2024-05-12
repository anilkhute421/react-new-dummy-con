import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ModalWrap } from "../Pages/Styles";
import { useIntl } from "react-intl";

export default function NotDeleteImage({ show, onHide }) {
  const intl = useIntl();

  const Dir = useSelector((state) => state.Language.dir);
  return (
    <div>
      <Modal
        backdrop="static"
        size="sm"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <ModalWrap Dir={Dir}>
          <span className="cross-btn" onClick={onHide}>
            <i className="icon-cross" />
          </span>
          <Deletemessage>
            {intl.formatMessage({ id: "msg.Atleast1Image" })}
          </Deletemessage>
        </ModalWrap>
      </Modal>
    </div>
  );
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
