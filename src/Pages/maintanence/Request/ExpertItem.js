import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { getApi } from "../../../services/ApiMethod";
import IntlMassage from "../../../utils/IntlMassage";
import { AddBuildingBox, Input } from "../../buildings/Styles";
import { AddExpenseBtn, ForMikWrap, SelectInput } from "../../Styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Box } from "@mui/system";
import { DateIcon } from "../../../GlobalStyle";

export default function ExpertItem({ Add, UserVali }) {
  const dir = useSelector((state) => state.Language.dir);
  const intl = useIntl();
  const defaultState = {
    itemName: null,
    dateTimeValue: null,
  };
  const [expertsList, setExpertsList] = useState([]);
  const [inputValues, setInputValues] = useState(defaultState);
  const [errors, setErrors] = useState({
    itemName: null,
    dateTimeValue: null,
  });

  const handleOnChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleError = (name, err) => {
    setErrors({ ...errors, [name]: err });
  };

  const validation = () => {
    if (inputValues.itemName !== null) {
      handleError("itemName", null);
    } else {
      handleError("itemName", intl.formatMessage({ id: "error.required" }));
      return false;
    }
    if (inputValues.dateTimeValue !== null) {
      handleError("dateTimeValue", null);
    } else {
      handleError(
        "dateTimeValue",
        intl.formatMessage({ id: "error.required" })
      );
      return false;
    }
    return true;
  };

  const userVali = () => {
    if (inputValues.itemName) {
      return true;
    }
    if (inputValues.dateTimeValue) {
      return true;
    } else {
      return false;
    }
  };

  const getExpertsList = async () => {
    let res = await getApi("expert_dropdown");
    if (res.status === 200) {
      setExpertsList(res.data);
    }
  };

  const handleAdd = () => {
    if (validation()) {
      Add(inputValues);
      setInputValues(defaultState);
    }
  };

  useMemo(() => {
    UserVali(userVali);
  }, [inputValues]);

  useEffect(() => {
    getExpertsList();
  }, []);

  return (
    <div>
      <AddBuildingBox>
        <ForMikWrap>
          <Autocomplete
            value={inputValues.itemName}
            onChange={(e, newval) => handleOnChange("itemName", newval)}
            options={expertsList}
            getOptionLabel={(option) => (option ? option.name : "")}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <SelectInput
                  placeholder={intl.formatMessage({
                    id: "table.assignExperts",
                  })}
                  Dir={dir}
                  type="text"
                  {...params.inputProps}
                />
              </div>
            )}
          />
          <div className="err-msg">{errors.itemName && errors.itemName}</div>
        </ForMikWrap>
        <ForMikWrap>
          <Input
            // onChange={(e) => handleOnChange("phone", e.target.phone)}
            value={inputValues.itemName ? inputValues.itemName.phone : ""}
            name="phone"
            placeholder={intl.formatMessage({
              id: "Maintenance.request.expert.phone",
            })}
            readOnly
          />
        </ForMikWrap>

        <ForMikWrap>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={inputValues.dateTimeValue}
              ampm={false}
              onChange={(second) => handleOnChange("dateTimeValue", second)}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Input
                    ref={inputRef}
                    {...inputProps}
                    readOnly
                    placeholder={intl.formatMessage({
                      id: "table.dateTime",
                    })}
                  />
                  <DateIcon className="my-1" Dir={dir}>
                    {InputProps?.endAdornment}
                  </DateIcon>
                </Box>
              )}
            />
          </LocalizationProvider>
          <div className="err-msg">
            {errors.dateTimeValue && errors.dateTimeValue}
          </div>
        </ForMikWrap>

        <AddExpenseBtn onClick={handleAdd} style={{ marginTop: "20px" }}>
          <IntlMassage id="button.addexpert"></IntlMassage>
        </AddExpenseBtn>
      </AddBuildingBox>
    </div>
  );
}
