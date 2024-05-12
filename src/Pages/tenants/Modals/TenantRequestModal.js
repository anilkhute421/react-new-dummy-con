import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteImage from "../../../components/DeleteImage";

import { SecondaryBtn } from "../../../GlobalStyle";
import { postApi } from "../../../services/ApiMethod";
import IntlMassage from "../../../utils/IntlMassage";
import {
  Box,
  BtnWrap,
  InfoLabel,
  InfoLine,
  InfoValue,
  ModalLabel,
  ModalWrap,
  NoData,
  TenantDetailbox,
} from "../../Styles";

export default function TenantRequestModal(props) {
  const Dir = useSelector((state) => state.Language.dir);
  const intl = useIntl();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [verifyLoader, setVerfiyLoader] = useState(false);
  const [declineLoader, setDeclineLoader] = useState(false);

  const getDetail = async () => {
    setLoading(true);
    let d = {
      tenant_id: props.data.id,
    };
    let res = await postApi(`view_tenant_request_by_tenant_id`, d);
    if (res.status === 200) {
      setData(res.tenant_details);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const sureMessage = () => {
    props.onHide();
    setShow(true);
  };

  const AccpetRequest = async () => {
    setVerfiyLoader(true);
    let req = {
      tenant_id: props.data.id,
      accept_decline: 1,
      //  1 means accept   2 means decline
    };

    let res = await postApi("tenant_verify_by_pm", req);
    if (res.status === 200) {
      props.onHide();
      setVerfiyLoader(false);
      toast.info(res.message, { theme: "colored" });
    } else {
      props.onHide();
      setVerfiyLoader(false);
      toast.info(res.message, { theme: "colored" });
    }
  };

  const DeclineRequest = async () => {
    setDeclineLoader(true);
    let req = {
      tenant_id: props.data.id,
      accept_decline: 2,
    };

    let res = await postApi("tenant_verify_by_pm", req);
    if (res.status === 200) {
      props.onHide();
      setDeclineLoader(false);
      toast.info(res.message, { theme: "colored" });
    } else {
      props.onHide();
      setDeclineLoader(false);
      toast.info(res.message, { theme: "colored" });
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <DeleteImage
        show={show}
        onHide={() => setShow(false)}
        handleConfirm={DeclineRequest}
      />
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
            <IntlMassage id="tenant.editRequestDetail" />
          </ModalLabel>

          {loading ? (
            <NoData>
              <CircularProgress />
            </NoData>
          ) : (
            <TenantDetailbox dir={Dir} modal={true}>
              <Box Dir={Dir}>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "profile.name" })}
                  </InfoLabel>
                  <InfoValue>
                    {data.first_name + " " + data.last_name}
                  </InfoValue>
                </InfoLine>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "profile.email" })}
                  </InfoLabel>
                  <InfoValue style={{ wordBreak: "break-all" }}>
                    {data.email}
                  </InfoValue>
                </InfoLine>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "profile.phone" })}
                  </InfoLabel>
                  <InfoValue>{data.phone}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "profile.country" })}
                  </InfoLabel>
                  <InfoValue>{data.country_name}</InfoValue>
                </InfoLine>
              </Box>
              <Box Dir={Dir}>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "building.info" })}
                  </InfoLabel>
                  <InfoValue>{data.building_name}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "unit.info.unitno" })}
                  </InfoLabel>
                  <InfoValue>{data.unit_details}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <InfoLabel>
                    {intl.formatMessage({ id: "addBuildings.address" })}
                  </InfoLabel>
                  <InfoValue>{data.address}</InfoValue>
                </InfoLine>
              </Box>
            </TenantDetailbox>
          )}
          <BtnWrap>
            <button className="cancel-btn" onClick={props.onHide}>
              <IntlMassage id="button.cancel" />
            </button>

            {declineLoader ? (
              <CircularProgress />
            ) : (
              <SecondaryBtn
                style={{ margin: "0px 10px" }}
                onClick={sureMessage}
              >
                <IntlMassage id="button.reject" />
              </SecondaryBtn>
            )}

            {verifyLoader ? (
              <CircularProgress />
            ) : (
              <button
                className="submit-btn"
                onClick={AccpetRequest}
                type="submit"
              >
                <IntlMassage id="button.verify" />
              </button>
            )}
          </BtnWrap>
        </ModalWrap>
      </Modal>
    </div>
  );
}
