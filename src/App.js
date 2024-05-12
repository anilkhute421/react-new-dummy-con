import { GlobalStyle } from "./GlobalStyle";
import Routes from "./routes/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./css/custom.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./muiTheme/MuiTheme";

export default function App() {
  const dir = useSelector((state) => state.Language.dir);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position={dir === "rtl" ? "top-left" : "top-right"}
        autoClose={3000}
        rtl={dir === "rtl" ? true : false}
        draggable
      />
      <GlobalStyle Dir={dir} />
      <Routes />
    </ThemeProvider>
  );
}
