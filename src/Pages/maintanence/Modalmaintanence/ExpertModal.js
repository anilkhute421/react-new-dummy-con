import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
// import IntlMassage from '../../../utils/IntlMassage'
import {
  InfoLabel,
  InfoValue,
  ModalLabel,
  ModalWrap,
  TableLoaderWrap,
} from "../../Styles";
import styled from "styled-components";
import { postApi } from "../../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import IntlMassage from "../../../utils/IntlMassage";

export default function ExpertModal(props) {
  const Dir = useSelector((state) => state.Language.dir);
  const intl = useIntl();

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [speciality_name, setSpeciality_name] = useState([]);

  const getExpertDetails = async () => {
    setLoading(true);
    let req = {
      expert_id: props.id,
    };
    let res = await postApi("view_expert_by_expert_id", req);
    console.log(res , "resknjdbf");
    if (res.status === 200) {
      setDetails(res.data);
      setSpeciality_name(res.data.speciality);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(
        intl.formatMessage({
          id: "error.toast.ViewExpert",
        }),
        { theme: "colored" }
      );
      props.onHide();
    }
  };

  useEffect(() => {
    getExpertDetails();
  }, []);

  return (
    <>
      <Modal
        {...props}
        backdrop="static"
        size="md"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalWrap Dir={Dir}>
          <span className="cross-btn" onClick={props.onHide}>
            <i className="icon-cross" />
          </span>
          <ModalLabel Dir={Dir}>
            <IntlMassage id="Maintenance.expertDetails" />
          </ModalLabel>
          <Mianexpertmodal>
            {loading ? (
              <TableLoaderWrap>
                <CircularProgress />
              </TableLoaderWrap>
            ) : (
              <>
                <Expertmodal>
                  <InfoLabel>
                    <IntlMassage id="placeholder.name" />
                  </InfoLabel>
                  <InfoValue>{details.name}</InfoValue>
                </Expertmodal>

                <Expertmodal>
                  <InfoLabel>
                    <IntlMassage id="placeholder.phone" />
                  </InfoLabel>
                  <InfoValue>+{details.country_code} {details.phone}</InfoValue>
                </Expertmodal>

                <Expertmodal>
                  <InfoLabel>
                    <IntlMassage id="placeholder.email" />
                  </InfoLabel>
                  <InfoValue>{details.email}</InfoValue>
                </Expertmodal>

                <Expertmodal>
                  <InfoLabel>
                    <IntlMassage id="placeholder.specialties" />
                  </InfoLabel>
                  <div className="d-flex flex-wrap">
                    {speciality_name &&
                      speciality_name.map((item, i) => (
                        <div className="speciality">
                          {item.name}
                          {i < speciality_name.length - 1 && ","} &nbsp;
                        </div>
                      ))}
                  </div>
                </Expertmodal>

                <Expertmodal>
                  <InfoLabel>
                    <IntlMassage id="placeholder.remarks" />
                  </InfoLabel>
                  <InfoValue>{details.remark}</InfoValue>
                </Expertmodal>
              </>
            )}
          </Mianexpertmodal>
        </ModalWrap>
      </Modal>
    </>
  );
}

const Expertmodal = styled.div`
display: flex;
flex-direction:row;
justify-content-center;
align-items-center;
padding:20px;
width:100%;

label{
  min-width:100px;
}
.speciality {
  width:auto;
  display:flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
}

@media screen and (max-width:400px){
  padding:20px 10px;
}
`;

const Mianexpertmodal = styled.div`
  border: 1px solid rgba(20, 93, 160, 0.3);
  box-sizing: border-box;
  border-radius: 6px;
`;
