import React, { useEffect, useState } from "react";
import { BackLink, Label, LabelBox, PageHeader, PageWrap } from "../Styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import IntlMassage from "../../utils/IntlMassage";
import { useIntl } from "react-intl";
import { BtnWrap, AddBuildingBox } from "./Styles";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../validations/InputField";
import CustomTextArea from "../../validations/TextArea";
import { getApi, postApi } from "../../services/ApiMethod";
import Loader from "../../Loader/Loader";
import BackdropLoader from "../../Loader/Backdrop";
import { toast } from "react-toastify";

export default function EditBuilding(props) {
  const intl = useIntl();
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  const Dir = useSelector((state) => state.Language.dir);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const INITIAL_FORM_STATE = {
    building_name: data.building_name,
    building_id: data.id,
    address: data.address,
    location: data.location_link,
    description: data.description ? data.description : "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    building_name: Yup.string()
      .matches(
        /^[aA-zZ][aA-zZ0-9\s]+$/,
        intl.formatMessage({ id: "error.alphanumeric" })
      )
      .min(4, intl.formatMessage({ id: "error.shortname" }))
      .max(40, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),
    address: Yup.string()
      .matches(
        /^[aA-zZ0-9,\s]+$/,
        intl.formatMessage({ id: "error.specialSymbol" })
      )
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    location: Yup.string()
      .url(intl.formatMessage({ id: "error.validUrl" }))
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    description: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .min(4, intl.formatMessage({ id: "error.description.short" }))
      .max(500, intl.formatMessage({ id: "error.description.large" })),
  });

  const viewBuildingDetail = async (id) => {
    let res = await getApi(`view_building/${id}`);
    if (res.status === 200) {
      setData(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    viewBuildingDetail(props.location.state.id);
  }, []);
  const handleSubmit = async (values) => {
    setOpen(true);
    let res = await postApi("update_building", values);
    if (res.status === 200) {
      setOpen(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      toast.error(res, { theme: "colored" });
      setOpen(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <PageWrap>
      <BackdropLoader play={open} />
      <div>
        <PageHeader>
          <LabelBox>
            <Label>
              <BackLink Dir={Dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="label.edit.building"/>
            </Label>
          </LabelBox>
        </PageHeader>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <AddBuildingBox>
              <CustomInput
                name="building_name"
                placeholder={intl.formatMessage({ id: "addBuildings.name" })}
              />

              <CustomInput
                name="address"
                placeholder={intl.formatMessage({ id: "addBuildings.address" })}
              />
              <CustomInput
                name="location"
                placeholder={intl.formatMessage({
                  id: "addBuildings.location",
                })}
              />
            </AddBuildingBox>
            <CustomTextArea
              name="description"
              placeholder={intl.formatMessage({
                id: "addBuildings.description",
              })}
            />
            <BtnWrap>
              <span className="cancel-btn" onClick={back}>
                <IntlMassage id="button.cancel" />
              </span>
              <button className="submit-btn" type="submit">
                <IntlMassage id="button.submit" />
              </button>
            </BtnWrap>
          </Form>
        </Formik>
      </div>
    </PageWrap>
  );
}
