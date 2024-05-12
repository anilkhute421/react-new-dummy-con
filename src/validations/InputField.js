import React from "react";
import { Input, ForMikWrap } from "../Pages/Styles";
import { useField } from "formik";
export default function CustomInput(props) {
  const [field, meta] = useField(props.name);
  return (
    <ForMikWrap>
      <Input {...field} {...props} />
      {meta.error && meta.touched && (
        <div className="err-msg">{meta.error}</div>
      )}
    </ForMikWrap>
  );
}
