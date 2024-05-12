import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LabelBox, Label, BtnWrap, BackLink, Input } from "../Styles";
import { FieldsBox } from "../Styles";
import IntlMassage from "../../utils/IntlMassage";
import { useIntl } from "react-intl";
import { Form, Formik } from "formik";
import { postApi } from "../../services/ApiMethod";
import * as Yup from "yup";
import CustomInput from "../../validations/InputField";
import { toast } from "react-toastify";
import BackdropLoader from "../../Loader/Backdrop";
import { updateProfileData } from "../../store/action/AuthAction";
import { Button } from "@mui/material";

export default function EditProfile() {
  const intl = useIntl();
  const history = useHistory();
  const dispatch = useDispatch();
  const back = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const detail = useSelector((state) => state.Auth.data);
  const Dir = useSelector((state) => state.Language.dir);
  const [open, setOpen] = useState(false);
  const INITIAL_FORM_STATE = {
    name: detail.name,
    email: detail.email,
    phone: detail.phone,
    country_id: {
      id: detail.country_id,
      country: detail.country_name,
    },
    role_id: {
      id: detail.role_id,
      role_title: detail.role_name,
    },
    pm_company_id: {
      name: detail.company_name,
      id: detail.pm_company_id,
    },
    office_contact_no: detail.office_contact_no ? detail.office_contact_no : "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, intl.formatMessage({ id: "error.validName" }))
      .min(4, intl.formatMessage({ id: "error.shortname" }))
      .max(20, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),
    email: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .email(intl.formatMessage({ id: "error.email" })),
    phone: Yup.number()
      .min(9999, intl.formatMessage({ id: "error.short" }))
      .max(99999999999999, intl.formatMessage({ id: "error.large" }))
      .typeError(intl.formatMessage({ id: "error.phone" }))
      .required(intl.formatMessage({ id: "error.required" })),
    country_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    role_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    pm_company_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    office_contact_no: Yup.number()
      .min(9999, intl.formatMessage({ id: "error.short" }))
      .max(99999999999999, intl.formatMessage({ id: "error.large" }))
      .typeError(intl.formatMessage({ id: "error.phone" }))
      .required(intl.formatMessage({ id: "error.required" })),
  });

  const handleSubmit = async (values) => {
    setOpen(true);
    let fd = new FormData();
    fd.append("name", values.name.replace(/\s+/g, " "));
    fd.append("email", values.email);
    fd.append("phone", values.phone);
    fd.append("role_id", values.role_id.id);
    fd.append("country_id", values.country_id.id);
    fd.append("pm_company_id", values.pm_company_id.id);
    fd.append("office_contact_no", values.office_contact_no);
    let res = await postApi("update_pm_profile", fd);
    if (res.status === 200) {
      dispatch(updateProfileData(res.data));
      setOpen(false);
      toast.info(res.message, { theme: "colored" });
      history.push("/home/profile");
    } else {
      setOpen(false);
      toast.error(res, { theme: "colored" });
    }
  };
  return (
    <div style={{ paddingBottom: "30px" }}>
      <LabelBox>
        <Label>
          <BackLink Dir={Dir} onClick={back}>
            <i className="icon-down-back" />
          </BackLink>
          <IntlMassage id="edit.profile" />
        </Label>
      </LabelBox>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form>
          <FieldsBox>
            <CustomInput
              name="name"
              placeholder={intl.formatMessage({ id: "placeholder.name" })}
            />
            <CustomInput
              name="email"
              placeholder={intl.formatMessage({ id: "placeholder.email" })}
            />
            <CustomInput
              name="phone"
              type="number"
              placeholder={intl.formatMessage({ id: "placeholder.phone" })}
            />
          </FieldsBox>

          <FieldsBox>
            <Input
              placeholder={intl.formatMessage({ id: "placeholder.role" })}
              style={{ textTransform: "capitalize", color: "rgba(0,0,0,0.6)" }}
              value={detail.role_name}
              readOnly
            />

            <Input
              name="country_id"
              value={detail.country_name}
              placeholder={intl.formatMessage({ id: "placeholder.country" })}
              readOnly
              style={{ textTransform: "capitalize", color: "rgba(0,0,0,0.6)" }}
            />
          </FieldsBox>
          <FieldsBox>
            <Input
              name="pm_company_id"
              value={detail.company_name}
              placeholder={intl.formatMessage({
                id: "placeholder.companyname",
              })}
              readOnly
              style={{ textTransform: "capitalize", color: "rgba(0,0,0,0.6)" }}
            />

            <CustomInput
              name="office_contact_no"
              type="number"
              placeholder={intl.formatMessage({
                id: "placeholder.officecontact",
              })}
            />
          </FieldsBox>

          <BtnWrap>
            <Button
              className="cancel-btn"
              onClick={back}
              sx={{ textTransform: "none" }}
            >
              <IntlMassage id="button.cancel" />
            </Button>
            <Button variant="contained" color="primary" type="submit">  
              {" "}
              <IntlMassage id="button.submit" />
            </Button>
          </BtnWrap>
        </Form>
      </Formik>

      <BackdropLoader play={open} />
    </div>
  );
}
