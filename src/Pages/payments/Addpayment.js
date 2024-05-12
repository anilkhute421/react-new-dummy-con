import { Field, Formik, Form, FieldArray, ErrorMessage } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/material";
import IntlMassage from "../../utils/IntlMassage";
import { AddBuildingBox as AddPaymentBox } from "../buildings/Styles";
import {
  AddExpenseBtn,
  BackLink,
  BtnWrap,
  ExpenseListWrap,
  Input,
  Label,
  LabelBox,
  LabelMedium,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../Styles";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import { Autocomplete as MuiAutoComplete } from "@mui/material";
import { DependentInput } from "../../validations/DependentField";
import CustomInput from "../../validations/InputField";
import styled from "styled-components";
import { getApi, postApi } from "../../services/ApiMethod";
import { PaymentDate } from "../../validations/PaymentDate";
import moment from "moment";
import CustomTextArea from "../../validations/TextArea";
import { toast } from "react-toastify";
import BackdropLoader from "../../Loader/Backdrop";
import { ChildInput } from "../../validations/ChildInput";
import AddMultiPaymentItem from "./AddMultiPaymentItem";
import { SecondaryBtn } from "../../GlobalStyle";

export default function Addpayment() {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const intl = useIntl();
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState([]);
  const [defaultPaymentValue, setDefaultPaymentValue] = useState(1);
  const [uploadingData, setUploadingData] = useState(false);
  const [status, setStatus] = useState([]);
  const [buildingChanged, setBuildingChanged] = useState("");
  const [multiPayments, setMultiPayments] = useState([]);

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

  const INITIAL_FORM_STATE = {
    building_id: "",
    tenant_unit_id: "",
    tenant_id: "",
    payments: [
      {
        payment_type: "",
        cheque_no: "",
        payment_date: "",
        remark: "",
        amount: "",
        status: "",
      },
    ],
  };
  const FORM_VALIDATION = Yup.object().shape({
    building_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    tenant_unit_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    payments: Yup.array().of(
      Yup.object().shape({
        payment_date: Yup.date()
          .typeError(intl.formatMessage({ id: "error.number" }))
          .required(intl.formatMessage({ id: "error.required" })),
        remark: Yup.string()
          .min(4, intl.formatMessage({ id: "error.short" }))
          .max(500, intl.formatMessage({ id: "error.large" }))
          .optional(),
        amount: Yup.string()
          .matches(/^[0-9]\d*$/, intl.formatMessage({ id: "error.number" }))
          .required(intl.formatMessage({ id: "error.required" })),
      })
    ),
  });

  const handleSubmit = async (values) => {
    setUploadingData(true);
    var finalamount = [];
    var finalchequeno = [];
    var finalpaymentDate = [];
    var finalstatus = [];
    var finalremark = [];

    for (const key in status) {
      finalstatus.push(status[key].id);
    }
    values.payments.map(
      (item, index) =>
        finalamount.push(item.amount) &&
        finalchequeno.push(item.cheque_no) &&
        finalpaymentDate.push(item.payment_date) &&
        finalremark.push(item.remark)
    );
    var finalpaymentType = [];

    finalchequeno.map((item) =>
      item === "" ? finalpaymentType.push(0) : finalpaymentType.push(1)
    );

    let req = {
      building_id: values.building_id.id,
      tenant_unit_id: values.tenant_unit_id.id,
      tenant_id: tenantIDList.tenant_id === null ? 0 : tenantIDList.tenant_id,
      payment_type: finalpaymentType,
      cheque_no: finalchequeno,
      payment_date: finalpaymentDate,
      remark: finalremark,
      status: finalstatus,
      amount: finalamount,
    };

    console.log(req, "reqqqqqq");

    let res = await postApi("add_payment", req);
    if (res.status === 200) {
      setUploadingData(false);
      toast.info(res.message, { theme: "colored" });
      history.push("/home/payments");
    } else {
      setUploadingData(false);
      toast.error(res, { theme: "colored" });
    }
  };

  const defaultValue = (e, newvalue) => {
    setDefaultPaymentValue(newvalue.id);
  };

  const getBuildingDropdown = async () => {
    let res = await getApi("building_dropdown_by_company_id");
    if (res.status === 200) {
      setBuildingList(res.data);
    }
  };
  const getChanges = async (changeValues) => {
    if (changeValues === null) {
      setunitIDList([]);
      setBuildingChanged("");
    } else {
      setBuildingChanged(changeValues);
      let d = {
        building_id: changeValues.id,
      };
      let res = await postApi(`tenant_unit_dropdown_by_building_id`, d);
      if (res.status === 200) {
        setunitIDList(res.data);
      }
    }
  };
  const getChanges1 = async (changeValues) => {
    if (changeValues === null) {
      setTenantIDList("");

      return;
    }

    let res = await getApi(`get_tenant_by_unit_id/${changeValues.id}`);
    if (res.status === 200) {
      setTenantIDList(res.data);
    }
  };

  const datechanged = (date, index) => {
    console.log(date, index, "jfbdd");
    let d = date;
    if (defaultPaymentValue === 0) {
      let today = new Date();
      let momentDate = moment(today).format("YYYY/MM/DD");
      if (momentDate > d) {
        setStatus({ ...status, [index]: manualObject[3] });
        // setStatus(manualObject[3]);
      }
      if (momentDate < d) {
        setStatus({ ...status, [index]: manualObject[0] });
        // setStatus(manualObject[0]);
      }
    }
    if (defaultPaymentValue === 1) {
      let today = new Date();
      let momentDate = moment(today).format("YYYY/MM/DD");
      if (momentDate > d) {
        setStatus({ ...status, [index]: chequeObject[3] });
        // setStatus(chequeObject[3]);
      }
      if (momentDate < d) {
        setStatus({ ...status, [index]: chequeObject[0] });
        // setStatus(chequeObject[0]);
      }
    }
  };

  useEffect(() => {
    getBuildingDropdown();
  }, []);

  const CheckStatusCheque = ({ idx }) => {
    return (
      <MuiAutoComplete
        name="status"
        options={chequeObject}
        defaultValue={chequeObject[status]}
        value={status !== [] ? status[idx] : status[idx].statusType}
        onChange={(e, newvalue) => setStatus({ ...status, [idx]: newvalue })}
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
    );
  };
  const CheckStatusManual = ({ idx }) => {
    console.log(idx, "ksfbdvhfd vhsd");
    return (
      <MuiAutoComplete
        name="status"
        options={manualObject}
        defaultValue={manualObject[status]}
        value={status !== [] ? status[idx] : status[idx].statusType}
        onChange={(e, newvalue) => setStatus({ ...status, [idx]: newvalue })}
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

  return (
    <PageWrap>
      <BackdropLoader play={uploadingData} />
      <PageLabel>
        <LabelBox>
          <Label>
            <BackLink Dir={dir} onClick={back}>
              <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="payment.addpayment" />
          </Label>
        </LabelBox>
      </PageLabel>

      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <AddPaymentBox>
              <Field
                name="building_id"
                component={DependentInput}
                getChanges={getChanges}
                options={buildingList}
                getOptionLabel={(option) =>
                  option ? option.building_name : ""
                }
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder={intl.formatMessage({
                        id: "placeholder.buildingname",
                      })}
                      Dir={dir}
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />

              <Field
                name="tenant_unit_id"
                component={ChildInput}
                parentVal={buildingChanged}
                getChanges={getChanges1}
                options={unitIDList}
                getOptionLabel={(option) => (option ? option.unit_no : "")}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder={intl.formatMessage({
                        id: "table.unitID",
                      })}
                      Dir={dir}
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />

              <Input
                readOnly
                name="tenant_name"
                placeholder={intl.formatMessage({ id: "table.tenantname" })}
                value={
                  tenantIDList.name === ""
                    ? "No Tenant Found"
                    : tenantIDList.name
                }
              />
            </AddPaymentBox>

            <PageLabel>
              <LabelBox>
                <LabelMedium>
                  <IntlMassage id="payment.addpayment" />s
                </LabelMedium>
              </LabelBox>
            </PageLabel>

            <FieldArray name="payments">
              {({ insert, remove, push }) => (
                <div>
                  {values.payments.map((item, index) => (
                    // console.log(item ,"item----" , index , "index---------")
                    <div>
                      <ExpenseListWrap>
                        <>
                          <CustomInput
                            type="text"
                            name={`payments.${index}.amount`}
                            placeholder={intl.formatMessage({
                              id: "table.amount",
                            })}
                          />
                        </>
                        <>
                          <MuiAutoComplete
                            name={`payments.${index}.payment_type`}
                            options={paymentObject}
                            defaultValue={paymentObject[1]}
                            getOptionLabel={(option) =>
                              option ? option.paymenttype : ""
                            }
                            onChange={(e, newvalue) =>
                              defaultValue(e, newvalue)
                            }
                            sx={{
                              "& input": {
                                width: "100%",
                                bgcolor: "background.paper",
                                color: (theme) =>
                                  theme.palette.getContrastText(
                                    theme.palette.background.paper
                                  ),
                              },
                            }}
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
                        </>

                        {defaultPaymentValue === 1 ? (
                          <>
                            <CustomInput
                              type="text"
                              name={`payments.${index}.cheque_no`}
                              placeholder={intl.formatMessage({
                                id: "table.cheque",
                              })}
                            />

                            <Field
                              name={`payments.${index}.payment_date`}
                              component={PaymentDate}
                              index={index}
                              getChanges={datechanged}
                              renderInput={({
                                inputRef,
                                inputProps,
                                InputProps,
                              }) => (
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
                                      id: "table.paymentdate",
                                    })}
                                  />
                                  <DateIcon Dir={dir}>
                                    {InputProps?.endAdornment}
                                  </DateIcon>
                                </Box>
                              )}
                            />

                            <CheckStatusCheque idx={index} />
                          </>
                        ) : (
                          <>
                            <Field
                              name={`payments.${index}.payment_date`}
                              component={PaymentDate}
                              index={index}
                              getChanges={datechanged}
                              renderInput={({
                                inputRef,
                                inputProps,
                                InputProps,
                              }) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    position: "relative",
                                  }}
                                >
                                  <Input
                                    {...inputProps}
                                    readOnly
                                    placeholder={intl.formatMessage({
                                      id: "table.paymentdate",
                                    })}
                                  />
                                  <DateIcon
                                    ref={inputRef}
                                    {...inputProps}
                                    Dir={dir}
                                  >
                                    {InputProps?.endAdornment}
                                  </DateIcon>
                                </Box>
                              )}
                            />
                            <CheckStatusManual idx={index} />
                          </>
                        )}
                      </ExpenseListWrap>
                      <div>
                        <CustomTextArea
                          name={`payments.${index}.remark`}
                          placeholder={intl.formatMessage({
                            id: "placeholder.remarks",
                          })}
                        />
                      </div>

                      <SecondaryBtn
                        type="button"
                        className="secondary"
                        style={{ marginTop: "20px" }}
                        onClick={() => remove(index)}
                      >
                        <IntlMassage id="button.delete" />
                      </SecondaryBtn>
                      {index > 0 && (
                        <div
                          style={{
                            width: "100%",
                            height: "0.5px",
                            background: "grey",
                            marginTop: "10px",
                          }}
                        ></div>
                      )}
                    </div>
                  ))}

                  <AddExpenseBtn
                    type="button"
                    className="secondary"
                    style={{ marginTop: "20px" }}
                    onClick={() =>
                      push({
                        payment_type: "",
                        cheque_no: "",
                        payment_date: "",
                        remark: "",
                        amount: "",
                        status: null,
                      })
                    }
                  >
                    <IntlMassage id="button.add" />
                  </AddExpenseBtn>
                </div>
              )}
            </FieldArray>
            <BtnWrap>
              <span className="cancel-btn" onClick={back}>
                <IntlMassage id="button.cancel" />
              </span>
              <button className="submit-btn" type="submit">
                <IntlMassage id="button.submit" />
              </button>
            </BtnWrap>
          </Form>
        )}
      </Formik>
    </PageWrap>
  );
}

const DateIcon = styled.div`
  position: absolute;
  top: 67%;
  left: ${({ Dir }) => Dir === "rtl" && "10px"};
  right: ${({ Dir }) => Dir === "ltr" && "10px"};
`;
