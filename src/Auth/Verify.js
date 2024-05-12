import React, { useState } from "react";
import {
  LoginForm,
  LogoWrap,
  Logo,
  Logintext,
  OtpWrap,
  BtnWrap,
} from "./Style";
import { login_Logo } from "../utils/images";
import OtpInput from "react-otp-input";
import { Button, CircularProgress } from "@mui/material";
import { postApi } from "../services/ApiMethod";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getLogin } from "../store/action/AuthAction";
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);",
          background: "#145DA0",
          color: "#fff",
          padding: "13px 25px",
        },
      },
    },
  },
});
export default function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const email = useSelector((state) => state.Auth.email);
  const handleChnage = (val) => {
    setError(false);
    setOtp(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let d = {
      email: email,
      otp: otp,
    };
    setLoading(true);
    let res = await postApi("verify_otp", d);
    if (res.status === 200) {
      setLoading(false);
      toast.info("Login successfully.", { theme: "colored" });
      dispatch(getLogin(res.data));
    } else {
      setError(true);
      toast.error(res, { theme: "colored" });
      setLoading(false);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <LoginForm onSubmit={handleSubmit}>
        <LogoWrap>
          <Logo src={login_Logo} alt="contolio" />
        </LogoWrap>
        <Logintext>
          Two-Step Verifiction
          <br />
          <span>Kindly check your registered email for OTP</span>
        </Logintext>
        <OtpWrap>
          <OtpInput
            inputStyle="otp"
            value={otp}
            onChange={handleChnage}
            numInputs={4}
            containerStyle={"otp-wrap"}
            shouldAutoFocus={true}
            isInputNum={true}
            hasErrored={error}
            errorStyle={"otp-error"}
          />
        </OtpWrap>
        <BtnWrap>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              type="submit"
              disabled={otp.length !== 4 ? true : false}
              variant="contained"
            >
              VERIFY
            </Button>
          )}
        </BtnWrap>
      </LoginForm>
    </ThemeProvider>
  );
}
