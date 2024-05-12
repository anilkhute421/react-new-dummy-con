import React from "react";
import { useFormikContext } from "formik";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import { ForMikWrap } from "../Pages/Styles";
import moment from "moment";
export const DateSelect = ({
  required,
  type,
  label,
  form,
  field,
  options,
  fullWidth,
  margin,
  placeholder,
  ...props
}) => {
  const { name, value } = field;
  const { setFieldValue, getFieldMeta } = useFormikContext();
  const handleDate = (manuall, second) => {
    if (second) {
      let data = moment(second).format("YYYY/MM/DD");
      setFieldValue(name, data);
    }
    if (manuall) {
      let data = moment(manuall).format("YYYY/MM/DD");
      setFieldValue(name, data);
    }
  };

  return (
    <ForMikWrap>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          name={name}
          value={value}
          onChange={(second, manuall) => handleDate(second, manuall)}
          {...props}
        />
      </LocalizationProvider>
      <div className="err-msg"> {getFieldMeta(name).error}</div>
    </ForMikWrap>
  );
};
