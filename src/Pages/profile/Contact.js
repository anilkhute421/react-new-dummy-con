import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Item } from "./Style";
import IntlMassage from "../../utils/IntlMassage";
import { useSelector } from "react-redux";
import { BtnWrap, ModalLabel, ModalWrap } from "../Styles";
import { postApi } from "../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import CustomTextArea from "../../validations/TextArea";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useIntl } from "react-intl";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  maxWidth: "100%",
  bgcolor: "transparent",
  border: "none",
  pt: 0,
  px: 0,
  pb: 0,
  borderRadius: "0",
};

export default function Contact() {
  const dir = useSelector((state) => state.Language.dir);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const intl = useIntl();

  const INITIAL_FORM_STATE = {
    description: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    description: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .min(4, intl.formatMessage({ id: "error.description.short" }))
      .max(255, intl.formatMessage({ id: "error.description.large" })),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    let req = {
      description: values.description,
    };
    let res = await postApi("pm_contact_to_admin", req);
    if (res.status === 200) {
      setLoading(false);
      handleClose()
      toast.info(res.message , {theme:"colored"})
    } else {
      setLoading(false);
      toast.info(res.message , {theme:"colored"})
    }
  }

  
  return (
    <div>
      <Item style={{ padding: "0 10px" }} Dir={dir} onClick={handleOpen}>
        <IntlMassage id="footer.contact" />
      </Item>
      <Modal
        disableScrollLock={false}
        disableEscapeKeyDown={true}
        open={open}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={style}>
          <ModalWrap Dir={dir}>
            <span className="cross-btn" onClick={handleClose}>
              <i className="icon-cross" />
            </span>

            
            <ModalLabel dir={dir}>
              <IntlMassage id="footer.contact" />
            </ModalLabel>
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

            <CustomTextArea
              name="description"
              placeholder={intl.formatMessage({
                id: "placeholder.description",
              })}
            

            />

            <BtnWrap>
              <button className="cancel-btn ">
                <IntlMassage id="button.cancel" />
              </button>

              {loading ? (
                <CircularProgress />
              ) : (
                <button
                  className="submit-btn"
                  // onClick={getContactUs}
                  type="submit"
                >
                  <IntlMassage id="button.submit" />
                </button>
              )}
            </BtnWrap>
            </Form>
            </Formik>
          </ModalWrap>
        </Box>
      </Modal>
    </div>
  );
}
