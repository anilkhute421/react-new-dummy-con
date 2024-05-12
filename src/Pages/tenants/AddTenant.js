import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import IntlMassage from "../../utils/IntlMassage";
import { AddBuildingBox as AddTenantBox } from "../buildings/Styles";
import {
  Label,
  PageLabel,
  PageWrap,
  LabelBox,
  BackLink,
  BtnWrap,
  SelectInput,
} from "../Styles";
import { Button } from "@mui/material";
import CustomInput from "../../validations/InputField";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import { postApi } from "../../services/ApiMethod";
import BackdropLoader from "../../Loader/Backdrop";
import { toast } from "react-toastify";
import { AutoSelect } from "../../validations/FormAutocomplete";

export default function AddTenant(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [countryCode, setCountryCode] = useState([]);

  const INITIAL_FORM_STATE = {
    first_name: "",
    last_name: "",
    email: "",
    country_code: "",
    phone: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    first_name: Yup.string()
      .matches(
        /^[aA-zZ][aA-zZ0-9\s]+$/,
        intl.formatMessage({ id: "error.alphanumeric" })
      )
      .min(3, intl.formatMessage({ id: "error.shortname" }))
      .max(20, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),
    last_name: Yup.string()
    .matches(
      /^[aA-zZ][aA-zZ0-9\s]+$/,
      intl.formatMessage({ id: "error.alphanumeric" })
    )
    .min(3, intl.formatMessage({ id: "error.shortlast" }))
    .max(15, intl.formatMessage({ id: "error.largelast" }))
    .required(intl.formatMessage({ id: "error.required" })),
    email: Yup.string()
    .required(intl.formatMessage({ id: "error.required" }))
    .email(intl.formatMessage({ id: "error.email" })),
    country_code: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    phone: Yup.number()
      .min(9999, intl.formatMessage({ id: "error.short" }))
      .max(99999999999999, intl.formatMessage({ id: "error.large" }))
      .typeError(intl.formatMessage({ id: "error.phone" }))
      .required(intl.formatMessage({ id: "error.required" })),
  });
  
  const handleSubmit = async (values) => {
    setOpen(true);
    let d = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      country_code: values.country_code.country_code,
    };
    let res = await postApi("add_tenant", d);
    if (res.status === 200) {
      setOpen(false);
      toast.info(res.message , { theme: "colored" });
      back();
    } else {
      setOpen(false);
      toast.error(res, { theme: "colored" });
    }
  };

  const getCountryCode = async () => {
    let res = await postApi("country_code_dropdown");
    if (res.status === 200) {
      setCountryCode(res.data);
    } else {
      toast.error(res.message);
    }
  };
  
  useEffect(() => {
    getCountryCode();
  }, []);

  return (
    <>
      <BackdropLoader play={open} />

      <PageWrap>
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="tenant.Addtenant" />
            </Label>
          </LabelBox>
        </PageLabel>
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
            <AddTenantBox>
              <CustomInput
                type="text"
                name="first_name"
                placeholder={intl.formatMessage({
                  id: "placeholder.first_name",
                })}
              />
              <CustomInput
                type="text"
                name="last_name"
                placeholder={intl.formatMessage({
                  id: "placeholder.last_name",
                })}
              />
              <CustomInput
                type="text"
                name="email"
                placeholder={intl.formatMessage({ id: "placeholder.email" })}
              />

              <Field
                name="country_code"
                component={AutoSelect}
                options={countryCode}
                getOptionLabel={(option) =>
                  option ? `+${option.country_code}` : ""
                }
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder={intl.formatMessage({
                        id: "placeholder.country_code",
                      })}
                      Dir={dir}
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />

              <CustomInput
                type="text"
                name="phone"
                placeholder={intl.formatMessage({ id: "table.phoneno" })}
              />
            </AddTenantBox>
            <BtnWrap>
              <Button
                className="cancel-btn"
                sx={{ textTransform: "none" }}
                onClick={back}
              >
                <IntlMassage id="button.cancel" />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="submit-btn"
                type="submit"
              >
                <IntlMassage id="button.submit" />
              </Button>
            </BtnWrap>
          </Form>
        </Formik>
      </PageWrap>
    </>
  );
}
