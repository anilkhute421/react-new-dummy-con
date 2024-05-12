import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { BtnWrap, InfoValue, ModalLabel, ModalWrap } from "../Styles";
import IntlMassage from "../../utils/IntlMassage";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import CustomInput from "../../validations/InputField";
import CustomTextArea from "../../validations/TextArea";
import CustomMultiSelect from "../../validations/MultiSelect";
import { getApi, postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import MultiBulidingSelect from "./MultiBulidingSelect";

export default function AddNotificationModal({ open, close }) {
  const dir = useSelector((state) => state.Language.dir);

  const [langSwitch, setLangSwitch] = useState("en");
  const [selectError, setSelectError] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [selectedListBuilding, setSelectedListBuilding] = useState([]);
  const [sendTo, setSendTo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buildingList, setBuildingList] = useState([]);
  const [selectSender, setSelectSender] = useState("0");

  const switchRadio = (val) => {
    setLangSwitch(val);
  };

  const selectedSender = (values) => {
    setSelectSender(values);
  };
  const intl = useIntl();

  const INITIAL_FORM_STATE = {
    name: "",
    description: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      // .matches(/^[aA-zZ\s]+$/, intl.formatMessage({ id: "error.validName" }))
      .min(3, intl.formatMessage({ id: "error.shortname" }))
      .max(50, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),
    description: Yup.string()
      .min(3, intl.formatMessage({ id: "error.short" }))
      .max(255, intl.formatMessage({ id: "error.large" }))
      .required(intl.formatMessage({ id: "error.required" })),
  });

  const getSendtoTenants = async () => {
    let res = await getApi("tenant_drop_down_at_notification");
    if (res.status === 200) {
      setSendTo(res.data);
    }
  };

  const getSendtoBulidings = async () => {
    let res = await getApi("building_dropdown_by_company_id");
    if (res.status === 200) {
      setBuildingList(res.data);
    }
  };

  useEffect(() => {
    getSendtoTenants();
    getSendtoBulidings();
  }, []);

  const handleSubmit = async (values) => {
    if (selectSender === "1") {
      if (selectedList.length === 0) {
        toast.warning("Please , Select the sender", { theme: "colored" });
      } else {
        setLoading(true);

        var array = [];
        var final = [];
        selectedList.map((item) => array.push(item.id));

        array.filter((item, index) => {
          if (item !== 0) {
            final.push(item);
          }
        });
        let req = {
          title: values.name,
          message: values.description,
          message_language: langSwitch,
          tenant_ids: selectedList.length === sendTo.length ? [0] : final,
          type: "tenant",
          building_ids: null,
        };
        let res = await postApi("pm_send_notification_to_tenant", req);
        if (res.status === 200) {
          setLoading(false);
          close();
          toast.info(res.message, { theme: "colored" });
          window.location.reload();
        } else {
          setLoading(false);
          close();
          toast.error(res, { theme: "colored" });
        }
      }
    }
    if (selectSender === "0") {
      if (selectedListBuilding.length === 0) {
        toast.warning("Please , Select the buliding", { theme: "colored" });
      } else {
        setLoading(true);
        var arrayBuliding = [];
        var finalBuliding = [];
        selectedListBuilding.map((item) => arrayBuliding.push(item.id));
        arrayBuliding.filter((item, index) => {
          if (item !== 0) {
            finalBuliding.push(item);
          }
        });
        let req = {
          title: values.name,
          message: values.description,
          message_language: langSwitch,
          tenant_ids: null,
          type: "building",
          building_ids:
            selectedListBuilding.length === buildingList.length
              ? [0]
              : finalBuliding,
        };
        let res = await postApi("pm_send_notification_to_tenant", req);
        if (res.status === 200) {
          setLoading(false);
          close();
          toast.info(res.message, { theme: "colored" });
          window.location.reload();
        } else {
          setLoading(false);
          close();
          toast.error(res, { theme: "colored" });
        }
      }
    }
  };

  const getSelectedList = (e) => {
    setSelectedList(e);
  };
  const getSelectedListBuliding = (e) => {
    setSelectedListBuilding(e);
  };

  return (
    <>
      <Modal
        show={open}
        backdrop="static"
        size="lg"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        Dir={dir}
      >
        <ModalWrap Dir={dir}>
          <span className="cross-btn" onClick={close}>
            <i className="icon-cross" />
          </span>
          <ModalLabel Dir={dir}>
            {intl.formatMessage({ id: "button.addnotification" })}
          </ModalLabel>

          <AddNotificationBox>
            <LanguageBox>
              <InfoValue>
                {intl.formatMessage({ id: "table.sendto" })}
              </InfoValue>
              <div>
                <input
                  type="radio"
                  onChange={(e) => selectedSender(e.target.value)}
                  checked={selectSender === "0" ? "checked" : ""}
                  name="building"
                  value="0"
                ></input>
                <label>{intl.formatMessage({ id: "table.building" })}</label>
              </div>
              <div>
                <input
                  type="radio"
                  onChange={(e) => selectedSender(e.target.value)}
                  checked={selectSender === "1" ? "checked" : ""}
                  name="tenants"
                  value="1"
                ></input>
                <label>
                  {intl.formatMessage({ id: "dashboard.card.Tenants" })}{" "}
                </label>
              </div>
            </LanguageBox>
          </AddNotificationBox>

          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <AddNotificationBox>
                <CustomInput
                  name="name"
                  placeholder={intl.formatMessage({ id: "table.title" })}
                />

                {selectSender === "0" ? (
                  <MultiBulidingSelect
                    name="sendToBuliding"
                    options={buildingList}
                    list={selectedListBuilding}
                    placeholder={intl.formatMessage({
                      id: "sidebar.buildings",
                    })}
                    updateSelectedOption={(e) => getSelectedListBuliding(e)}
                    error={selectError}
                    updateError={(e) => setSelectError(e)}
                  />
                ) : (
                  <CustomMultiSelect
                    name="sendToTenant"
                    options={sendTo}
                    list={selectedList}
                    placeholder={intl.formatMessage({ id: "sidebar.tenants" })}
                    updateSelectedOption={(e) => getSelectedList(e)}
                    error={selectError}
                    updateError={(e) => setSelectError(e)}
                  />
                )}

                <LanguageBox>
                  <InfoValue>
                    {intl.formatMessage({ id: "table.Language" })}
                  </InfoValue>
                  <div>
                    <input
                      type="radio"
                      onChange={(e) => switchRadio(e.target.value)}
                      checked={langSwitch === "en" ? "checked" : ""}
                      name="switch"
                      value="en"
                    ></input>
                    <label>{intl.formatMessage({ id: "table.English" })}</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      checked={langSwitch === "ar" ? "checked" : ""}
                      onChange={(e) => switchRadio(e.target.value)}
                      name="switch"
                      value="ar"
                    ></input>
                    <label>{intl.formatMessage({ id: "table.Arabic" })} </label>
                  </div>
                </LanguageBox>
              </AddNotificationBox>
              <CustomTextArea
                name="description"
                placeholder={intl.formatMessage({
                  id: "unit.info.description",
                })}
              />

              <BtnWrap>
                <button className="cancel-btn " onClick={close}>
                  <IntlMassage id="button.cancel" />
                </button>

                {loading ? (
                  <CircularProgress />
                ) : (
                  <button className="submit-btn" type="submit">
                    <IntlMassage id="button.submit" />
                  </button>
                )}
              </BtnWrap>
            </Form>
          </Formik>
        </ModalWrap>
      </Modal>
    </>
  );
}

const AddNotificationBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(2, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;

const LanguageBox = styled.div`
  padding: 0 20px;
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  input[type="radio"] {
    margin: 0;
  }
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  label {
    padding: 0 6px;
  }
  @media screen and (max-width: 575px) {
    padding: 0;
  }
`;
