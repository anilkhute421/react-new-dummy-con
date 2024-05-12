import React, { useEffect, useMemo, useState } from "react";
import {
  BackLink,
  BtnWrap,
  Input,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../Styles";
import { AddBuildingBox as EditTenantBox } from "../buildings/Styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IntlMassage from "../../utils/IntlMassage";
import { Field, Form, Formik } from "formik";
import CustomInput from "../../validations/InputField";
import { useIntl } from "react-intl";
import { AutoSelect } from "../../validations/FormAutocomplete";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import BackdropLoader from "../../Loader/Backdrop";


export default function Tenantedit(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const intl = useIntl();
  const [countryCode, setCountryCode] = useState("");
  const [ data , setData] = useState('')
  const [loading  , setLoading] = useState(true)
  const [open, setOpen] = useState(false);

  

  const INITIAL_FORM_STATE = useMemo(()=>{
    if(data) {
      return {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        country_code:{country_code: data.country_code},
        phone: data.phone,
      }
    }
      return {
        first_name: "",
        last_name: "",
        email: "",
        country_code: "",
        phone: "",
      }
    
    
  },[data]);

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
        tenant_id:data.tenant_id,
        first_name:values.first_name,
        last_name:values.last_name,
        phone:values.phone,
        country_code:values.country_code.country_code
    }
    let res = await postApi("update_tenant", d);
    if (res.status === 200) {
      setOpen(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      toast.error(res, { theme: "colored" });
      setOpen(false);
    }
  };

  const getDetail = async (id) => {
    setLoading(true)
    let d = {
        tenant_id:id
        }
    let res = await postApi(`view_tenant_by_tenant_id` , d)
    if (res.status === 200) {
        setData(res.tenant_details)
        setLoading(false)
    }else {
        setLoading(false)
    }
}
useEffect(()=>{
    getDetail(props.location.state.id)
},[props.location.state.id])

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

  if (loading) {
    return <Loader />;
  }

  return (
    <PageWrap>
      <BackdropLoader play={open} />
      <PageLabel>
        <LabelBox>
          <Label>
            <BackLink Dir={dir} onClick={back}>
              <i className="icon-down-back" />
            </BackLink>
          
            <IntlMassage id="tenant.Edittenant" />
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
          <EditTenantBox>
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
            <Input
              type="text"
              name="email"
              value={data.email}
              style={{color: 'grey'}}
              readOnly
              placeholder={intl.formatMessage({ id: "placeholder.email" })}
            />
          
              <Field
                name="country_code"
                component={AutoSelect}
                options={countryCode}
                getOptionLabel={(option) => (option ? option.country_code : "")}
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
          </EditTenantBox>

          <BtnWrap>
            <span className="cancel-btn" onClick={back}>
              <IntlMassage id="button.cancel" />
            </span>
            <Button variant="contained" color="primary" type="submit">
              <IntlMassage id="button.submit" />
            </Button>
          </BtnWrap>
        </Form>
      </Formik>
     
    </PageWrap>
  );
}
