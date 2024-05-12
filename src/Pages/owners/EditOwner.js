import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import styled from "styled-components";
import Loader from "../../Loader/Loader";
import { useIntl } from "react-intl";
import BackdropLoader from "../../Loader/Backdrop";
import { getApi, postApi } from "../../services/ApiMethod";
import IntlMassage from "../../utils/IntlMassage";
import {
  BackLink,
  BtnWrap,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
} from "../Styles";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomInput from "../../validations/InputField";
import { toast } from "react-toastify";

export default function EditOwner(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const intl = useIntl();
  const back = () => history.goBack();
  const [ownerDetail, setOwnerDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [play, setPlay] = useState(false);

  const INITIAL_FORM_STATE = useMemo(() => {
    if (ownerDetail) {
      return {
        name: ownerDetail.name,
        phone: ownerDetail.phone,
        email: ownerDetail.email,
        remarks: ownerDetail.remarks,
        owner_id: ownerDetail.id,
      };
    }
    return {
      name: "",
      phone: "",
      email: "",
      remarks: "",
    };
  }, [ownerDetail]);

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .min(3, intl.formatMessage({ id: "error.short" }))
      .max(20, intl.formatMessage({ id: "error.large" }))
      .required(intl.formatMessage({ id: "error.required" })),
    phone: Yup.number()
      .typeError(intl.formatMessage({ id: "error.phone" }))
      .min(999, intl.formatMessage({ id: "error.short" }))
      .max(999999999999999, intl.formatMessage({ id: "error.large" }))
      .required(intl.formatMessage({ id: "error.required" })),
    email: Yup.string().required(intl.formatMessage({ id: "error.required" })).email(intl.formatMessage({ id: "error.email" })),
    remarks: Yup.string()
      .min(3, intl.formatMessage({ id: "error.short" }))
      .max(255, intl.formatMessage({ id: "error.large" }))
      .optional(""),
  });

  const OwnerDetail = async (id) => {
    setLoading(true);
    let res = await getApi(`owner_details/${id}`);
    if (res.status === 200) {
      setOwnerDetail(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleSubmit = async (values) => {
    setPlay(true);
    let res = await postApi("edit_owner", values);
    if (res.status === 200) {
      setPlay(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      setPlay(false);
      toast.error(res, { theme: "colored" });
    }
  };
  useEffect(() => {
    OwnerDetail(props.location.state.id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <BackdropLoader play={play} />
      <PageWrap>
        <PageLabel>
          <LabelBox>
            <Label>
            <BackLink Dir={dir} onClick={back}>
            <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="label.edit.owner" />
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
            <EditOwnerBox>
              <CustomInput name="name" type="text" placeholder={intl.formatMessage({ id: "placeholder.name" })} />
              <CustomInput name="phone" type="text" placeholder={intl.formatMessage({ id: "placeholder.phone" })}/>
              <CustomInput name="email" type="text" placeholder={intl.formatMessage({ id: "placeholder.email" })} />
              <CustomInput name="remarks" type="text" placeholder={intl.formatMessage({ id: "placeholder.remarks" })} />
            </EditOwnerBox>

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

const EditOwnerBox = styled.div`
  width: 100%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(2, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;
