import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BackLink,
  BtnWrap,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../../Styles";
import { getApi, postApi } from "../../../services/ApiMethod";
import { AddBuildingBox as MaintanenceBox } from "../../buildings/Styles";
import IntlMassage from "../../../utils/IntlMassage";
import CustomMultiSelect from "../../../validations/MultiSelect";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../validations/InputField";
import CustomTextArea from "../../../validations/TextArea";
import Loader from "../../../Loader/Loader";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { AutoSelect } from "../../../validations/FormAutocomplete";

export default function EditExpert(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const [specialties, setSpecialties] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [selectError, setSelectError] = useState(false);
  const [list, setList] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState("");

  const intl = useIntl();

  const INITIAL_FORM_STATE = useMemo(() => {
    if (details) {
      return {
        name: details.name,
        phone: details.phone,
        email: details.email,
        country_code: {
          country_code: details.country_code,
        },
        remark: details.remark,
      };
    }
    return {
      name: "",
      phone: "",
      email:"",
      country_code: {
        country_code: "",
      },
      remark: "",
    };
  }, [details]);

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, intl.formatMessage({ id: "error.name" }))
      .min(3, intl.formatMessage({ id: "error.shortname" }))
      .max(20, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),

    phone: Yup.string()
      .min(8, intl.formatMessage({ id: "error.short" }))
      .max(14, intl.formatMessage({ id: "error.large" }))
      .matches(/^\d+$/, intl.formatMessage({ id: "error.phone" }))
      .required(intl.formatMessage({ id: "error.required" })),

      email: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .email(intl.formatMessage({ id: "error.email" })),

    country_code: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),

    remark: Yup.string()
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

  const getExpertDetails = async (id) => {
    setLoading(true);
    let req = {
      expert_id: id,
    };
    let res = await postApi("view_expert_by_expert_id", req);

    if (res.status === 200) {
      setDetails(res.data);
      setList(res.data.speciality);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    if (selectedList.length === 0) {
      setSelectError(true);
      return;
    }
    const SelectList = selectedList.map((item, i) => item.id);
    let d = {
      expert_id: props.location.state.id,
      name: values.name,
      phone: values.phone,
      email: values.email,
      remark: values.remark,
      speciality_id: SelectList,
      country_code: values.country_code.country_code,
    };

    let res = await postApi("update_experts", d);
    if (res.status === 200) {
      toast.info(res.message, { theme: "colored" });
      back();
      setLoading(false);
    } else {
      toast.error(res, { theme: "colored" });
      setLoading(false);
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
    getExpertDetails(props.location.state.id);
  }, []);

  useEffect(() => {
    getListingSpecialties();
    getCountryCode();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <PageWrap>
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="Maintenance.editExpert" />
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
                placeholder={intl.formatMessage({
                  id: "placeholder.name",
                })}
                name="name"
              />

              {/* <CountryCode fieldName={'phone'} value1={details.phone} placeholder={intl.formatMessage({
                  id: "placeholder.phone",
                })}/> */}

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
                defaultValue={details.speciality_string}
                list={list}
                placeholder={intl.formatMessage({
                  id: "placeholder.specialties",
                })}
                updateSelectedOption={(e) => getSelectedList(e)}
                error={selectError}
                updateError={(e) => setSelectError(e)}
              />
            </MaintanenceBox>
            <CustomTextArea
              placeholder={intl.formatMessage({
                id: "placeholder.remarks",
              })}
              name="remark"
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
    </div>
  );
}
