import React, { useState } from "react";
import { login_Logo } from "../utils/images";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import {
  ForgetWrap,
  FieldWrap,
  InputField,
  IconWrap,
  Icon,
  BtnWrap,
  Logintext,
  LoginForm,
  LogoWrap,
  Logo,
} from "./Style";
import { useDispatch } from "react-redux";
import { getEmail } from "../store/action/AuthAction";
import { loginApi } from "../services/Auth";
import { toast } from "react-toastify";
import { Button, CircularProgress } from "@mui/material";

export default function Login() {
  const langDirection = "ltr";
  const [loging, setLoging] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  
  const SubmitHandler = async (values) => {
    let fd = new FormData();
    fd.append("email", values.email);
    fd.append("password", values.password);
    setLoging(true);
    if (!loging) {
      let res = await loginApi(fd);
      if (res.status === 200) {
        if (res.data.status === 200) {
          dispatch(getEmail(values.email));
          history.push("/verify");
          setLoging(false);
        } else {
          toast.error(res, { theme: "colored" });
          setLoging(false);
        }
      } else {
        toast.error(res, { theme: "colored" });
        setLoging(false);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
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
      }) => (
        <LoginForm onSubmit={handleSubmit}>
          <LogoWrap>
            <Logo src={login_Logo} alt="contolio" />
          </LogoWrap>
          <Logintext>Log in to your account</Logintext>
          <div className="formik-wrap">
            <FieldWrap>
              <InputField
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <IconWrap>
                <Icon
                  Direction={langDirection}
                  viewBox="0 0 14 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 9.8C11.5 9.8 13.75 13.3 13.75 15.4C13.75 17.5 10.75 18.2 7 18.2C3.25 18.2 0.25 17.5 0.25 15.4C0.25 13.3 2.5 9.8 7 9.8ZM7 0C9.07 0 10.75 1.568 10.75 3.5C10.75 5.432 9.07 8.4 7 8.4C4.93 8.4 3.25 5.432 3.25 3.5C3.25 1.568 4.93 0 7 0Z"
                    fill="#2E8BC0"
                  />
                </Icon>
              </IconWrap>
            </FieldWrap>
            {errors.email && touched.email && <p>{errors.email}</p>}
          </div>
          <div className="formik-wrap">
            <FieldWrap>
              <InputField
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <IconWrap>
                <Icon Direction={langDirection}>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.4285 6.69515C13.2511 6.02466 12.6841 5.51646 11.9778 5.39503C10.8052 5.23274 9.96325 5.03846 7 5.03846C3.75877 5.03846 3.01259 5.22208 1.93566 5.37371C1.26986 5.52238 0.745205 6.01518 0.573386 6.65369C0.41875 7.45271 0.25 8.69063 0.25 10.3692C0.25 12.0194 0.413227 13.2443 0.571546 14.0433C0.748886 14.7138 1.31589 15.222 2.02218 15.3434C3.19484 15.5057 4.03675 15.7 7 15.7C9.96325 15.7 10.8052 15.5057 11.9797 15.3517C12.689 15.2303 13.2597 14.7191 13.4383 14.0457C13.5868 13.2443 13.75 12.0194 13.75 10.3692C13.75 8.71906 13.5868 7.49417 13.4285 6.69515ZM7.83761 10.6423C7.70875 10.7513 7.63511 10.9076 7.63389 11.0729C7.61364 11.5823 7.61364 12.1462 7.61364 12.1462C7.61364 12.4731 7.33873 12.7385 7 12.7385C6.66127 12.7385 6.38636 12.4731 6.38636 12.1462V11.0759C6.38636 10.9047 6.30966 10.7424 6.17589 10.6298C5.92307 10.4273 5.77273 10.1187 5.77273 9.77693C5.77273 9.12302 6.32255 8.59231 7 8.59231C7.67745 8.59231 8.22727 9.12302 8.22727 9.77693C8.22727 10.1181 8.07755 10.4261 7.83761 10.6423ZM5.15909 3.26154C5.15909 2.2404 5.67761 1.48462 7 1.48462C8.32239 1.48462 8.84091 2.2404 8.84091 3.26154C8.84091 3.5885 9.11582 3.85385 9.45455 3.85385C9.79327 3.85385 10.0682 3.5885 10.0682 3.26154C10.0682 1.66646 9.0655 0.300003 7 0.300003C4.9345 0.300003 3.93182 1.66646 3.93182 3.26154C3.93182 3.5885 4.20673 3.85385 4.54545 3.85385C4.88418 3.85385 5.15909 3.5885 5.15909 3.26154Z"
                    fill="#2E8BC0"
                  />
                </Icon>
              </IconWrap>
            </FieldWrap>
            {errors.password && touched.password && <p>{errors.password}</p>}
          </div>
          <ForgetWrap Direction={langDirection}>
            <Link to="/forgot">Forgot Password</Link>
          </ForgetWrap>
          <BtnWrap>
            {loging ? (
              <CircularProgress />
            ) : (
              <Button
                className="submit-btn"
                color="primary"
                sx={{ p: 3, fontSize: "18px" }}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            )}
          </BtnWrap>
        </LoginForm>
      )}
    </Formik>
  );
}
