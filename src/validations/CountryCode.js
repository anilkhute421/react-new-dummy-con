import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import MaterialUiPhoneNumber from "material-ui-phone-number";

export default function CountryCode({ fieldName, placeholder , value1 }) {
  const [field, meta] = useField({
    name: fieldName,
  });
  const { setFieldValue, getFieldMeta } = useFormikContext();
  const [phoneNumber, setPhoneNumber] = useState();
  const { name, onBlur, value = "" } = field;
  const { error, touched } = meta;
  //   const { setValue } = helpers;
  const hasError = Boolean(error) && touched;

  const CountryFiled = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "#ffffff",
    boxShadow: "0px 2px 8px rgba(61, 107, 192, 0.28)",
    borderRadius: "10px",
    fontSize: "14px",
    color: "rgba(0, 0, 0, 1)",
    margin: 0,
    marginTop: "20px",
    padding: "0px 10px",
    // height:"100%",
    height: "44px",
    "&:placeholder": {
      fontSize: "14px",
      lineHeight: "17px",
      color: "#000",
      opacity: "0.4",
      height: "40px",
    },
    input: {
      margin: "-3px",
    },
  };

  return (
    <MaterialUiPhoneNumber
      countryCodeEditable={false}
      defaultCountry="qa"
      helperText={hasError && error}
      error={hasError}
      onBlur={onBlur}
      onChange={(value, event) => setFieldValue(fieldName, value)}
      name={fieldName}
      value={value1===null?phoneNumber:value1}
      sx={CountryFiled}
    />
  );
}
