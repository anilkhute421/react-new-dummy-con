import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { Autocomplete } from "@mui/material";
import { ForMikWrap } from "../Pages/Styles";

export const ReAssign = ({
  getChanges,
  parentVal,
  required,
  type,
  label,
  form,
  field,
  options,
  fullWidth,
  margin,
  placeholder,
  pageName,
  expertData,
  ...props
}) => {
  const { name, value } = field;
  const { setFieldValue, getFieldMeta } = useFormikContext();


  useMemo(() => {
    if (pageName === "Editrequest") {
    if (expertData.length === 0) {
      if (parentVal > 0) {
        setFieldValue(name, options[1]);
      }
      if (parentVal === 0) {
        setFieldValue(name, options[0]);
      }
    }
    }
  }, [parentVal , expertData]);

  useMemo(() => {
    if (pageName === "Addrequest") {
      if (parentVal > 0) {
        setFieldValue(name, options[1]);
      }
      if (parentVal === 0) {
        setFieldValue(name, options[0]);
      }
    }
  }, [parentVal]);

  const handle = (name, value) => {
    setFieldValue(name, value);
    getChanges(value);
  };
  return (
    <ForMikWrap>
      <Autocomplete
        type={type}
        name={name}
        value={value}
        onChange={(e, newvalue) => handle(name, newvalue)}
        options={options}
        sx={{
          "& input": {
            width: "100%",
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        {...props}
      />
      <div className="err-msg">{getFieldMeta(name).error}</div>
    </ForMikWrap>
  );
};
