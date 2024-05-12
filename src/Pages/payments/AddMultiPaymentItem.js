import React, { useLayoutEffect,  useState } from "react";
import { useIntl } from "react-intl";

import {
  Input,
  ExpenseListWrap,
  AddExpenseBtn,
  SelectInput,
  ForMikWrap,
  TextArea,
} from "../Styles";
import { Autocomplete } from "@mui/material";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import styled from "styled-components";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import IntlMassage from "../../utils/IntlMassage";

export default function AddMultiPaymentItem({ Checkstatus , Add, UserVali, AddButtonState }) {
  const intl = useIntl();
  const dir = useSelector((state) => state.Language.dir);
  const [defaultPaymentValue, setDefaultPaymentValue] = useState(1);
  const [status, setStatus] = useState(null);
  const [size, setSize] = useState(0);

  const chequeObject = [
    {
      statusType: intl.formatMessage({ id: "payment.upcomingPayment" }),
      id: 1,
    },
    {
      statusType: intl.formatMessage({ id: "payment.voided" }),
      id: 2,
    },
    {
      statusType: intl.formatMessage({ id: "payment.Settled" }),
      id: 3,
    },
    {
      statusType: intl.formatMessage({ id: "payment.overdue" }),
      id: 4,
    },
    {
      statusType: intl.formatMessage({ id: "payment.chequeReturned" }),
      id: 5,
    },
    {
      statusType: intl.formatMessage({ id: "payment.paymentInDefault" }),
      id: 6,
    },
  ];

  const manualObject = [
    {
      statusType: intl.formatMessage({ id: "payment.upcomingPayment" }),
      id: 1,
    },
    {
      statusType: intl.formatMessage({ id: "payment.voided" }),
      id: 2,
    },
    {
      statusType: intl.formatMessage({ id: "payment.Settled" }),
      id: 3,
    },
    {
      statusType: intl.formatMessage({ id: "payment.overdue" }),
      id: 4,
    },
    {
      statusType: intl.formatMessage({ id: "payment.paymentInDefault" }),
      id: 6,
    },
  ];

  const paymentObject = [
    {
      paymenttype: intl.formatMessage({ id: "label.manual" }),
      id: 0,
    },
    {
      paymenttype: intl.formatMessage({ id: "label.cheque" }),
      id: 1,
    },
  ];

  const defaultState = {
    amount: "",
    payment_type: paymentObject[1],
    date: "",
    status: null,
    remarks: "",
  };

  const validate = () => {

    let amountError = "";
    let dateError = "";
    let chequeError = "";

    let remarksError = "";

    if (!inputValues.date || inputValues.date === "Invalid date") {
      if (!inputValues.date) {
        dateError = intl.formatMessage({ id: "error.required" });
      }
      if (inputValues.date === "Invalid date") {
        dateError = intl.formatMessage({ id: "error.date" });
      }
    }

    const reg = /^[0-9]\d*$/;
    if (!inputValues.amount || reg.test(inputValues.amount) === false) {
      if (!inputValues.amount) {
        amountError = intl.formatMessage({ id: "error.required" });
      } else {
        amountError = intl.formatMessage({ id: "error.amount" });
      }
    } else {
      if (inputValues.amount.length > 8) {
        amountError = intl.formatMessage({ id: "error.amountlessthan8" });
      }
    }

    if (inputValues.remarks) {
      if (inputValues.amount.length > 500) {
        remarksError = intl.formatMessage({ id: "error.large" });
      }
      if (inputValues.amount.length < 4) {
        remarksError = intl.formatMessage({ id: "error.short" });
      }
      
    }
    if (inputValues.cheque_no) {
      if (inputValues.cheque_no.length > 14) {
        chequeError = intl.formatMessage({ id: "error.large" });
      }
      if (inputValues.cheque_no.length < 6) {
        chequeError = intl.formatMessage({ id: "error.short" });
      }
      if (reg.test(inputValues.cheque_no) === false){
        chequeError = intl.formatMessage({ id: "error.amount" });
      }
    }

    if (amountError || dateError || remarksError || chequeError) {
      setErrors({
        amountError,
        dateError,
        chequeError,
        remarksError,
      });
      return false;
    }
    return true;
  };

  const [errors, setErrors] = useState({});
  const [inputValues, setInputValues] = useState(defaultState);

  console.log(inputValues, "inputValues");
  const handleOnChange = (name, value) => {
    console.log(name, "name", value, "value");

    setInputValues({ ...inputValues, [name]: value });
  };
  const defaultValue = (e, newvalue) => {
    setDefaultPaymentValue(newvalue.id);
    handleOnChange("payment_type", newvalue);
  };

  const datechanged = (date) => {
    let d = moment(date).format("YYYY/MM/DD");
    if (date) {
      if (defaultPaymentValue === 0) {
        let today = new Date();
        let momentDate = moment(today).format("YYYY/MM/DD");
        handleOnChange("date", d);
        if (momentDate > d) {
          setStatus(manualObject[3]);
        }
        if (momentDate < d) {
          setStatus(manualObject[0]);
        }
      }

      if (defaultPaymentValue === 1) {
        let today = new Date();
        let momentDate = moment(today).format("YYYY/MM/DD");
        handleOnChange("date", d);
        if (momentDate > d) {
          setStatus(chequeObject[3]);
        }
        if (momentDate < d) {
          setStatus(chequeObject[0]);
        }
      }
    }
  };

  console.log(status, "--------------satus");
  const CheckStatusCheque = () => {
    return (
      <ForMikWrap>
        <Autocomplete
          name="status"
          options={chequeObject}
          defaultValue={chequeObject[status]}
          value={status}
          onChange={(e, newvalue) => setStatus(newvalue)}
          getOptionLabel={(option) => (option ? option.statusType : "")}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <SelectInput
                style={{ color: "black" }}
                placeholder={intl.formatMessage({
                  id: "table.status",
                })}
                Dir={dir}
                type="text"
                {...params.inputProps}
              />
            </div>
          )}
        />
        <div className="err-msg">{errors.statusError}</div>
      </ForMikWrap>
    );
  };

  const CheckStatusManual = () => {
    return (
      <Autocomplete
        name="status"
        options={manualObject}
        defaultValue={manualObject[status]}
        value={status}
        onChange={(e, newvalue) => setStatus(newvalue)}
        getOptionLabel={(option) => (option ? option.statusType : "")}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <SelectInput
              style={{ color: "black" }}
              placeholder={intl.formatMessage({ id: "table.status" })}
              Dir={dir}
              type="text"
              {...params.inputProps}
            />
          </div>
        )}
      />
    );
  };

  const handleAdd = async () => {
    // AddButtonState(false);
    if (validate()) {
      Add(inputValues);
      setInputValues(defaultState);
      Checkstatus(status)

    }
  };

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      <ExpenseListWrap>
        <ForMikWrap>
          <Input
            onChange={(e) => handleOnChange("amount", e.target.value)}
            value={inputValues.amount}
            name="amount"
            placeholder={intl.formatMessage({
              id: "table.amount",
            })}
          />
          <div className="err-msg">{errors.amountError}</div>
        </ForMikWrap>

        <ForMikWrap>
          <Autocomplete
            value={
              inputValues.payment_type === null
                ? paymentObject[1]
                : inputValues.payment_type
            }
            onChange={(e, newval) => defaultValue("payment_type", newval)}
            options={paymentObject}
            getOptionLabel={(option) => (option ? option.paymenttype : "")}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <SelectInput
                  placeholder={intl.formatMessage({
                    id: "placeholder.paymentType",
                  })}
                  Dir={dir}
                  type="text"
                  {...params.inputProps}
                />
              </div>
            )}
          />
          <div className="err-msg">{errors.paymentTypeError}</div>
        </ForMikWrap>

        {defaultPaymentValue === 1 ? (
          <>
            <ForMikWrap>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  onChange={(e, y) => datechanged(e, y)}
                  // getChanges={datechanged}
                  value={inputValues.date}
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
                          id: "table.date",
                        })}
                      />
                      <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                    </Box>
                  )}
                />
              </LocalizationProvider>
              <div className="err-msg">{errors.dateError}</div>
            </ForMikWrap>
            <CheckStatusCheque />
            <ForMikWrap>
              <Input
                onChange={(e) => handleOnChange("cheque_no", e.target.value)}
                value={inputValues.cheque_no}
                name="cheque_no"
                placeholder={intl.formatMessage({
                  id: "table.cheque",
                })}
              />
              <div className="err-msg">{errors.chequeError}</div>
            </ForMikWrap>

            {size > 991 && (
              <AddExpenseBtn
                className="m-0"
                onClick={handleAdd}
                style={{ marginTop: "20px" }}
              >
                <IntlMassage id="button.add" />
              </AddExpenseBtn>
            )}
          </>
        ) : (
          <>
            <ForMikWrap>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  onChange={(e, y) => datechanged(e, y)}
                  getChanges={datechanged}
                  value={inputValues.date}
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
                          id: "table.date",
                        })}
                      />
                      <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                    </Box>
                  )}
                />
              </LocalizationProvider>
              <div className="err-msg">{errors.dateError}</div>
            </ForMikWrap>
            <CheckStatusManual />
            {size > 991 && (
              <AddExpenseBtn onClick={handleAdd} style={{ marginTop: "20px" }}>
                <IntlMassage id="button.add" />
              </AddExpenseBtn>
            )}
          </>
        )}
      </ExpenseListWrap>
      <ForMikWrap>
        <TextArea
          onChange={(e) => handleOnChange("remarks", e.target.value)}
          value={inputValues.remarks}
          name="remarks"
          placeholder={intl.formatMessage({
            id: "placeholder.remarks",
          })}
        />
        <div className="err-msg">{errors.remarksError}</div>
      </ForMikWrap>

      <ExpenseListWrap>
        {size < 992 && (
          <AddExpenseBtn onClick={handleAdd} style={{ marginTop: "20px" }}>
            <IntlMassage id="button.add" />
          </AddExpenseBtn>
        )}
      </ExpenseListWrap>
    </div>
  );
}

const DateIcon = styled.div`
  position: absolute;
  top: 67%;
  left: ${({ Dir }) => Dir === "rtl" && "10px"};
  right: ${({ Dir }) => Dir === "ltr" && "10px"};
`;
