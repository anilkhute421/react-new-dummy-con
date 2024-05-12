import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import IntlMassage from "../../utils/IntlMassage";
import { ModalLabel, ModalWrap, BtnWrap } from "../Styles";
import { InputGrid } from "./Styles";
import { Box, Button, CircularProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../validations/InputField";
import { postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "100%",
  bgcolor: "none",
  border: "none",
  boxShadow: "none",
  pt: 3,
  px: 2,
  pb: 3,
  borderRadius: "16px",
};

export default function AddOwner({ show, onHide, updatedata }) {
  const Dir = useSelector((state) => state.Language.dir);
  const intl = useIntl();
  const [loader, setLoader] = useState(false);
  const INITIAL_FORM_STATE = {
    name: "",
    phone: "",
    email: "",
    remarks: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, intl.formatMessage({ id: "error.validName" }))
      .min(3, intl.formatMessage({ id: "error.shortname" }))
      .max(20, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),
    email: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .email(intl.formatMessage({ id: "error.email" })),

    phone: Yup.number()
      .min(9999, intl.formatMessage({ id: "error.shortname" }))
      .max(99999999999999, intl.formatMessage({ id: "error.large" }))
      .typeError(intl.formatMessage({ id: "error.phone" }))
      .required(intl.formatMessage({ id: "error.required" })),
    remarks: Yup.string()
      .min(3, intl.formatMessage({ id: "error.short" }))
      .max(255, intl.formatMessage({ id: "error.large" }))
      .optional(),
  });

  const handleSubmit = async (values) => {
    setLoader(true);
    let res = await postApi("add_owner", values);
    if (res.status === 200) {
      setLoader(false);
      toast.info(res.message, { theme: "colored" });
      updatedata();
      onHide();
    } else {
      toast.error(res, { theme: "colored" });
      setLoader(false);
    }
  };

  return (
    <Modal
      disableEnforceFocus={true}
      disableEscapeKeyDown={true}
      open={show}
      aria-labelledby="parent-modal-title"
    >
      <Box sx={style}>
        <ModalWrap Dir={Dir}>
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form>
              <span className="cross-btn" onClick={onHide}>
                <i className="icon-cross" />
              </span>
              <ModalLabel dir={Dir}>
                <IntlMassage id="owner.addnew" />
              </ModalLabel>
              <InputGrid>
                <CustomInput
                  name="name"
                  placeholder={intl.formatMessage({ id: "placeholder.name" })}
                />
                <CustomInput
                  name="phone"
                  type="number"
                  placeholder={intl.formatMessage({ id: "placeholder.phone" })}
                />
                <CustomInput
                  name="email"
                  placeholder={intl.formatMessage({ id: "placeholder.email" })}
                />
                <CustomInput
                  name="remarks"
                  placeholder={intl.formatMessage({
                    id: "placeholder.remarks",
                  })}
                />
              </InputGrid>
              <BtnWrap dir={Dir}>
                <span className="cancel-btn" onClick={onHide}>
                  <IntlMassage id="button.cancel" />
                </span>
                {loader ? (
                  <CircularProgress />
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    className="submit-btn"
                    type="submit"
                  >
                    <IntlMassage id="button.submit" />
                  </Button>
                )}
              </BtnWrap>
            </Form>
          </Formik>
        </ModalWrap>
      </Box>
    </Modal>
  );
}
