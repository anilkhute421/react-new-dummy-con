import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Formik } from "formik";
import { CrossBtn } from "./Style";
import IntlMassage from "../../utils/IntlMassage";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@mui/material";
import { useIntl } from "react-intl";
import { Input, ModalLabel, BtnWrap, ForMikWrap } from "../Styles";
import { postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "calc(100% - 24px)",
  bgcolor: "background.paper",
  border: "none",
  pt: 3,
  px: 2,
  pb: 3,
  borderRadius: "16px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.25)",
};

export default function ChangePassword() {
  const dir = useSelector((state) => state.Language.dir);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const intl = useIntl();
  const Dir = useSelector((state) => state.Language.dir);
  const [process, setProcess] = useState(false);
  const SubmitHandler = async (data) => {
    if (process) {
      return false;
    }
    let fd = new FormData();
    setProcess(true);
    fd.append("current_password", data.current_password);
    fd.append("new_password", data.new_password);
    fd.append("confirm_new_password", data.confirm_new_password);
    let res = await postApi("change_password", data);
    if (res.status === 200) {
      setProcess(false);
      toast.info(res.message, { theme: "colored" });
      handleClose();
    } else {
      setProcess(false);
      toast.error(res, { theme: "colored" });
    }
  };

  return (
    <div>
      <Button
        Dir={dir}
        type="button"
        variant="contained"
        onClick={handleOpen}
        sx={{ m: { sm: 1 } }}
        color="secondary"
      >
        <IntlMassage id="profile.changePassword" />
      </Button>
      <Modal
        disableEnforceFocus={true}
        disableEscapeKeyDown={true}
        open={open}
        aria-labelledby="parent-modal-title"
      >
        <Box sx={style}>
          <CrossBtn Dir={dir} onClick={handleClose}>
            <i className="icon-cross" />
          </CrossBtn>
          <Formik
            initialValues={{
              current_password: "",
              new_password: "",
              confirm_new_password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.current_password) {
                errors.current_password = intl.formatMessage({
                  id: "error.required",
                });
              }
              if (!values.new_password) {
                errors.new_password = intl.formatMessage({
                  id: "error.required",
                });
              } else if (values.new_password.length < 8) {
                errors.confirm_new_password = intl.formatMessage({
                  id: "error.passwordshort",
                });
              }
              if (!values.confirm_new_password) {
                errors.confirm_new_password = intl.formatMessage({
                  id: "error.required",
                });
              } else if (values.new_password !== values.confirm_new_password) {
                errors.confirm_new_password = intl.formatMessage({
                  id: "error.passwordnotmatch",
                });
              }
              return errors;
            }}
            onSubmit={(values) => {
              SubmitHandler(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <ModalLabel dir={Dir}>
                  <IntlMassage id="changePassword.changePassword" />
                </ModalLabel>
                <ForMikWrap dir={Dir}>
                  <Input
                    dir={Dir}
                    type="password"
                    name="current_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.current_password}
                    placeholder={intl.formatMessage({
                      id: "placeholder.currentpassword",
                    })}
                  />
                  {errors.current_password && touched.current_password && (
                    <div className="err-msg">{errors.current_password}</div>
                  )}
                </ForMikWrap>
                <ForMikWrap dir={Dir}>
                  <Input
                    dir={Dir}
                    type="password"
                    name="new_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.new_password}
                    placeholder={intl.formatMessage({
                      id: "placeholder.newpassword",
                    })}
                  />
                  {errors.new_password && touched.new_password && (
                    <div className="err-msg">{errors.new_password}</div>
                  )}
                </ForMikWrap>
                <ForMikWrap dir={Dir}>
                  <Input
                    dir={Dir}
                    name="confirm_new_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_new_password}
                    type="password"
                    placeholder={intl.formatMessage({
                      id: "placeholder.confirmpassword",
                    })}
                  />
                  {errors.confirm_new_password &&
                    touched.confirm_new_password && (
                      <div className="err-msg">
                        {errors.confirm_new_password}
                      </div>
                    )}
                </ForMikWrap>
                <BtnWrap dir={Dir}>
                  <span className="cancel-btn" onClick={handleClose}>
                    {" "}
                    <IntlMassage id="button.cancel" />
                  </span>
                  {process ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      className="submit-btn"
                      type="submit"
                    >
                      <IntlMassage id="button.submit" />
                    </Button>
                  )}
                </BtnWrap>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
