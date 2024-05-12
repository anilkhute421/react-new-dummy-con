import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SecondaryBtn } from "../../GlobalStyle";
import IntlMassage from "../../utils/IntlMassage";
import {
  Box,
  BtnWrap,
  InfoLabel,
  InfoLine,
  InfoValue,
  ModalLabel,
  ModalWrap,
  TenantDetailbox,
} from "../Styles";

export default function TenantRequestModal(props) {
  const Dir = useSelector((state) => state.Language.dir);
  const [submit, setSubmit] = React.useState(false);
  const history = useHistory();
  const back = () => history.goBack();

  return (
    <div>
      <Modal
        {...props}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <ModalWrap Dir={Dir}>
          <span className="cross-btn" onClick={props.onHide}>
            <i className="icon-cross" />
          </span>
          <ModalLabel Dir={Dir}>
            Tenant Request Detail1
          </ModalLabel>
          <TenantDetailbox dir={Dir} modal={true}>
            <Box Dir={Dir}>
              {/* <DetailLabel>
                            Units Detail
                        </DetailLabel> */}
              <InfoLine>
                <InfoLabel>Name</InfoLabel>
                <InfoValue>John Watson</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>johnwatson@gmail.com</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>+1 687 640 4561</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>Country</InfoLabel>
                <InfoValue>USA</InfoValue>
              </InfoLine>
            </Box>
            <Box Dir={Dir}>
              {/* <DetailLabel pt={true}>
                            Building Info
                        </DetailLabel> */}
              <InfoLine>
                <InfoLabel>Building Name</InfoLabel>
                <InfoValue>White Tower</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>Unit No.</InfoLabel>
                <InfoValue>12</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>Address</InfoLabel>
                <InfoValue>#123, Royal City, USA</InfoValue>
              </InfoLine>
            </Box>
          </TenantDetailbox>
          <BtnWrap>
            <button className="cancel-btn" onClick={back}>
              <IntlMassage id="button.cancel" />
            </button>
            <SecondaryBtn style={{ margin: "0px 10px" }}>
              <IntlMassage id="button.reject" />
            </SecondaryBtn>

            <button
              className="submit-btn"
              onClick={() => setSubmit(true)}
              type="submit"
            >
              <IntlMassage id="button.verify" />
            </button>
          </BtnWrap>
        </ModalWrap>
      </Modal>
    </div>
  );
}
