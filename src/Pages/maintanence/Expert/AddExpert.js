import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import IntlMassage from "../../../utils/IntlMassage";
import { AddBuildingBox as MaintanenceBox } from "../../buildings/Styles";
import {
  BackLink,
  BtnWrap,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../../Styles";
import CustomInput from "../../../validations/InputField";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { getApi, postApi } from "../../../services/ApiMethod";
import BackDropLoader from "../../../Loader/Backdrop";
import CustomTextArea from "../../../validations/TextArea";
import CustomMultiSelect from "../../../validations/MultiSelect";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { AutoSelect } from "../../../validations/FormAutocomplete";

export default function AddExpert() {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const [specialties, setSpecialties] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [selectError, setSelectError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const INITIAL_FORM_STATE = {
    name: "",
    phone: "",
    email:"",
    country_code:"",
    remarks: "",
  };
  const intl = useIntl();
  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, intl.formatMessage({ id: "error.name" }))
      .min(3, intl.formatMessage({ id: "error.shortname" }))
      .max(20, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),

    phone: Yup.string()
      .min(8, intl.formatMessage({ id: "error.short" }))
      .max(14, intl.formatMessage({ id: "error.large" }))
      .matches( /^\d+$/, intl.formatMessage({ id: "error.phone" }))
      .required(intl.formatMessage({ id: "error.required" })),

      email: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .email(intl.formatMessage({ id: "error.email" })),

    country_code: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),

    remarks: Yup.string()
      .min(3, intl.formatMessage({ id: "error.short" }))
      .max(500, intl.formatMessage({ id: "error.large" }))
      .required(intl.formatMessage({ id: "error.required" })),
  });

  const getListingSpecialties = async () => {
    let res = await getApi("specialties_dropdown");
    if (res.status === 200) {
      setSpecialties(res.data);
    }
  };

  const handleSubmit = async (values) => {
    console.log(values , 'values--------')

    
    if (selectedList.length === 0) {
      setSelectError(true);
      return;
    }
    setLoading(true);
    let FD = new FormData();
    FD.append("name", values.name);
    FD.append("phone", values.phone);
    FD.append("email", values.email);
    FD.append("country_code", values.country_code.country_code);
    FD.append("remark", values.remarks);
    for (let i = 0; i < selectedList.length; i++) {
      FD.append("speciality_id[]", selectedList[i].id);
    }
    let res = await postApi("add_experts", FD);
    if (res.status === 200) {
      setLoading(false);
      toast.info(res.message, { theme: "colored" });
      history.goBack();
    } else {
      setLoading(false);
      toast.error(res, { theme: "colored" });
    }
  };

  const getSelectedList = (e) => {
    setSelectedList(e);
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
    getListingSpecialties();
  }, []);

  return (
    <>
      <PageWrap>
        <BackDropLoader play={loading} />
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="button.addexpert" />
            </Label>
          </LabelBox>
        </PageLabel>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <MaintanenceBox>
              <CustomInput
                type="text"
                name="name"
                placeholder={intl.formatMessage({
                  id: "placeholder.name",
                })}
              />

              <Field
                name="country_code"
                component={AutoSelect}
                options={countryCode}
                getOptionLabel={(option) =>
                  option ? ` +${option.country_code}` : ""
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

               <CustomInput
                type="text"
                name="email"
                placeholder={intl.formatMessage({ id: "table.email" })}
              />

              <CustomMultiSelect
                name="specialties"
                options={specialties}
                list={selectedList}
                placeholder={intl.formatMessage({
                  id: "placeholder.specialties",
                })}
                updateSelectedOption={(e) => getSelectedList(e)}
                error={selectError}
                updateError={(e) => setSelectError(e)}
              />
            </MaintanenceBox>

            <CustomTextArea
              name="remarks"
              placeholder={intl.formatMessage({
                id: "placeholder.remarks",
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
      </PageWrap>
    </>
  );
}
