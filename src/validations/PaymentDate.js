import React from "react";
import { useFormikContext } from "formik";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import { ForMikWrap } from "../Pages/Styles";
import moment from "moment";
export const PaymentDate = ({
  required,
  getChanges,
  index,
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
  const handleDate = (first, manuall) => {
    if (manuall) {
      return;
    } else {
      let data = moment(first).format("YYYY/MM/DD");
      setFieldValue(name, data);
      getChanges(data , index);
      return;
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
