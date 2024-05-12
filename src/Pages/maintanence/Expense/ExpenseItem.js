import { ImageInputWrap, PdfWrap, TextArea } from "../../Styles";
import { useSelector } from "react-redux";
import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import {
  Input,
  ExpenseListWrap,
  AddExpenseBtn,
  SelectInput,
  ForMikWrap,
} from "../../Styles";
import IntlMassage from "../../../utils/IntlMassage";
import { InputBg, invoice } from "../../../utils/images";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import { Autocomplete, Box } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DatePicker";
import { getApi } from "../../../services/ApiMethod";
import { useIntl } from "react-intl";
import { InvoiceWrap } from "../Style";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AddBuildingBox } from "../../buildings/Styles";
export default function ExpenseItem({ Add, UserVali, AddButtonState }) {
  const intl = useIntl();
  const defaultState = {
    itemName: null,
    amount: "",
    remarks: "",
    currency: null,
    date: null,
    files: [],
  };
  const dir = useSelector((state) => state.Language.dir);
  const [size, setSize] = useState(0);

  const [expenseList, setExpenseList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);
  const [previewList, setPreviewList] = useState([]);
  const [inputValues, setInputValues] = useState(defaultState);
  const [submitCount, setSubmitCount] = useState(0);

  const validate = () => {
    let nameError = "";
    let amountError = "";
    let currencyError = "";
    let dateError = "";
    let filesError = "";
    if (!inputValues.itemName) {
      nameError = intl.formatMessage({ id: "error.required" });
    }
    if (!inputValues.currency) {
      currencyError = intl.formatMessage({ id: "error.required" });
    }
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
    // if (invoiceList.length === 0) {
    //   filesError = intl.formatMessage({ id: "error.required" });
    // }
    if (nameError || amountError || currencyError || dateError || filesError) {
      setErrors({
        nameError,
        amountError,
        currencyError,
        dateError,
        filesError,
      });

      return false;
    }
    return true;
  };
  const userValidation = () => {
    if (
      inputValues.itemName ||
      inputValues.amount ||
      inputValues.currency ||
      inputValues.date ||
      invoiceList.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  const [errors, setErrors] = useState({});
  const handleOnChange = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };
  useMemo(() => {
    if (submitCount > 0) {
      validate();
    }
  }, [inputValues, invoiceList]);

  const getExpenseList = async () => {
    let res = await getApi("expenes_dropdown");
    if (res.status === 200) {
      setExpenseList(res.data);
    }
  };
  const getCurrencyList = async () => {
    let res = await getApi("get_all_currency");
    if (res.status === 200) {
      setCurrencyList(res.data);
    }
  };
  console.log(invoiceList, "invoiceList--");
  const chooseFile = (files) => {
    if (invoiceList.length > 0) {
      let requiredLength = 3 - invoiceList.length;
      let invalidType = [];
      for (let i = 0; i < files.length; i++) {
        if (
          files[0].name.includes(".png") ||
          files[0].name.includes(".jpg") ||
          files[0].name.includes(".jpeg") ||
          files[0].name.includes(".heic") ||
          files[0].name.includes(".pdf")
        ) {
          if (i < requiredLength) {
            setInvoiceList((prev) => [...prev, files[i]]);
          }
        } else {
          invalidType.push(files[i]);
        }
      }
      if (invalidType.length > 0) {
        toast.error("file type invalid", { theme: "colored" });
      }
    } else {
      let ar = [];
      let invalidType = [];
      for (let i = 0; i < files.length; i++) {
        if (
          files[0].name.includes(".png") ||
          files[0].name.includes(".jpg") ||
          files[0].name.includes(".jpeg") ||
          files[0].name.includes(".heic") ||
          files[0].name.includes(".pdf")
        ) {
          if (ar.length < 3) {
            ar.push(files[i]);
          }
        } else {
          invalidType.push(files[i]);
        }
      }
      if (invalidType.length > 0) {
        toast.error("file type invalid", { theme: "colored" });
      }
      setInvoiceList(ar);
    }
  };

  const handleDate = (manuall, second) => {
    if (second) {
      let d = moment(second).format("YYYY/MM/DD");
      handleOnChange("date", d);
    }
    if (manuall) {
      let d = moment(manuall).format("YYYY/MM/DD");
      handleOnChange("date", d);
    }
  };

  const handleAdd = async () => {
    AddButtonState(false);

    setSubmitCount(submitCount + 1);
    if (validate()) {
      Add(inputValues);
      setPreviewList([]);
      setInvoiceList([]);
      handleOnChange("date", null);
      setInputValues(defaultState);
      setSubmitCount(0);
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

  useMemo(() => {
    UserVali(userValidation);
  }, [inputValues]);
  useEffect(() => {
    getExpenseList();
    getCurrencyList();
  }, []);
  useMemo(() => {
    let ar = [];
    for (let i = 0; i < invoiceList.length; i++) {
      if (invoiceList[i].type === "application/pdf") {
        ar.push(invoiceList[i]);
      } else {
        ar.push(URL.createObjectURL(invoiceList[i]));
      }
    }
    setPreviewList(ar);
    handleOnChange("files", invoiceList);
  }, [invoiceList]);

  const InputMedia = () => {
    return (
      <>
        <input
          type="file"
          multiple
          onChange={(e) => chooseFile(e.target.files)}
          accept=".jpg,.png,.pdf"
        />
      </>
    );
  };

  return (
    <div>
      <ExpenseListWrap>
        <ForMikWrap>
          <Autocomplete
            value={inputValues.itemName}
            onChange={(e, newval) => handleOnChange("itemName", newval)}
            options={expenseList}
            getOptionLabel={(option) =>
              option ? option.expenseslines_name : ""
            }
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <SelectInput
                  placeholder={intl.formatMessage({
                    id: "placeholder.expenseitem",
                  })}
                  Dir={dir}
                  type="text"
                  {...params.inputProps}
                />
              </div>
            )}
          />
          <div className="err-msg">{errors.nameError}</div>
        </ForMikWrap>
        <ForMikWrap>
          <Autocomplete
            value={inputValues.currency}
            onChange={(e, newval) => handleOnChange("currency", newval)}
            options={currencyList}
            getOptionLabel={(option) => (option ? option.currency : "")}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <SelectInput
                  placeholder={intl.formatMessage({
                    id: "placeholder.currency",
                  })}
                  Dir={dir}
                  type="text"
                  {...params.inputProps}
                />
              </div>
            )}
          />
          <div className="err-msg">{errors.currencyError}</div>
        </ForMikWrap>
        <ForMikWrap>
          <Input
            onChange={(e) => handleOnChange("amount", e.target.value)}
            value={inputValues.amount}
            name="amount"
            placeholder={intl.formatMessage({
              id: "placeholder.expenseamount",
            })}
          />
          <div className="err-msg">{errors.amountError}</div>
        </ForMikWrap>
        <ForMikWrap>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              onChange={(e, y) => handleDate(e, y)}
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
        {size > 991 && (
          <AddExpenseBtn onClick={handleAdd} style={{ marginTop: "20px" }}>
            <IntlMassage id="button.add" />
          </AddExpenseBtn>
        )}
      </ExpenseListWrap>

      <AddBuildingBox>
        <TextArea
          name="remarks"
          value={inputValues.remarks}
          onChange={(e) => handleOnChange("remarks", e.target.value)}
          placeholder={intl.formatMessage({
            id: "placeholder.description",
          })}
        />
        <div className="d-flex">
          {invoiceList.length > 0 &&
            previewList.map((ele, i) => (
              <>
                {ele.type === "application/pdf" ? (
                  <PdfWrap Dir={dir}>
                    <div className="m-auto">
                      <img src={invoice} alt="" />
                      <p>Pdf</p>
                    </div>
                  </PdfWrap>
                ) : (
                  <InvoiceWrap key={i} Dir={dir}>
                    <img src={ele} alt="" />
                  </InvoiceWrap>
                )}
              </>
            ))}
          {invoiceList.length < 3 && (
            <ForMikWrap>
              <ImageInputWrap Dir={dir}>
                <img src={InputBg} alt="" />

                <IntlMassage id="button.upload" />
                <InputMedia />
              </ImageInputWrap>
              <div className="err-msg">{errors.filesError}</div>
            </ForMikWrap>
          )}
        </div>
      </AddBuildingBox>
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
