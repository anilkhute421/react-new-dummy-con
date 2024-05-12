import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import {
  Autocomplete as MuiAutoComplete,
  CircularProgress,
} from "@mui/material";
import { AddBuildingBox as AddPaymentBox } from "../buildings/Styles";
import {
  BackLink,
  Label,
  PageLabel,
  PageWrap,
  LabelBox,
  SelectInput,
  Input,
  BtnWrap,
  NoData,
} from "../Styles";
import CustomInput from "../../validations/InputField";
import styled from "styled-components";
import CustomTextArea from "../../validations/TextArea";
import IntlMassage from "../../utils/IntlMassage";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import moment from "moment";
import { DependentInput } from "../../validations/DependentField";
import { PaymentDate } from "../../validations/PaymentDate";
import { Box } from "@mui/system";
import { getApi, postApi } from "../../services/ApiMethod";
import { toast } from "react-toastify";
import BackdropLoader from "../../Loader/Backdrop";
import { ChildInput } from "../../validations/ChildInput";

export default function Editpayment(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const intl = useIntl();
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [play, setPlay] = useState(false);
  const [buildingChanged, setBuildingChanged] = useState("");

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
  const INITIAL_FORM_STATE = useMemo(() => {
    if (data) {
      return {
        building_id: {
          building_name: data.building_name,
          id: data.building_id,
        },
        tenant_unit_id: {
          unit_no: data.unit_no,
          id: data.unit_id,
        },
        tenant_id: {
          tenant_name: data.tenant_name,
          id: data.tenant_id,
        },
        payment_type: {
          payment_type: data.payment_type,
          id: data.payment_type_int,
        },
        cheque_no: data.cheque_no,
        payment_date: data.payment_date_edit,
        remark: data.remark,

        amount: data.amount,
      };
    }
    return {
      building_id: "",
      tenant_unit_id: "",
      tenant_id: "",
      payment_type: "",
      cheque_no: "",
      payment_date: "",
      remark: "",

      amount: "",
    };
  }, [data]);
  const [defaultPaymentValue, setDefaultPaymentValue] = useState(
    data.payment_type_int
  );

  const FORM_VALIDATION = Yup.object().shape({
    building_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    tenant_unit_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
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
  });

  const handleSubmit = async (values) => {
    setPlay(true);
    let d = {
      payment_id: data.id,
      amount: values.amount,
      tenant_id: tenantIDList.tenant_id === null ? 0 : tenantIDList.tenant_id,
      building_id: values.building_id.id,
      tenant_unit_id: values.tenant_unit_id.id,
      payment_type: defaultPaymentValue,
      payment_date: values.payment_date,
      remark: values.remark,
      cheque_no: values.cheque_no,
      status: status.id,
    };
    let res = await postApi("update_payment", d);
    if (res.status === 200) {
      setPlay(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      toast.error(res, { theme: "colored" });
      setPlay(false);
    }
  };

  const getDetail = async (id) => {
    setLoading(true);
    let d = {
      payment_id: id,
    };
    let res = await postApi("view_payment_by_payment_id", d);

    if (res.status === 200) {
      setData(res.data);
      setTenantIDList({
        tenant_id: res.data.tenant_id,
        name: res.data.tenant_name,
      });
      if (res.data.payment_type === "manual") {
        setDefaultPaymentValue(0);
        setStatus({
          statusType: res.data.status,
          id: res.data.status_int,
        });
      } else {
        setDefaultPaymentValue(1);
        setStatus({
          statusType: res.data.status,
          id: res.data.status_int,
        });
      }
      setLoading(false);
    } else {
      toast.error(res.message, { theme: "colored" });
      setLoading(false);
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

  const getUnitDropdown = async (id) => {
    let d = {
      building_id: id,
    };
    let res = await postApi(`tenant_unit_dropdown_by_building_id`, d);

    if (res.status === 200) {
      setunitIDList(res.data);
    }
  };

  useMemo(() => {
    getUnitDropdown(data.building_id);
    if (data.tenant_name) {
      setTenantIDList({
        name: data.tenant_name,
        tenant_id: data.tenant_id,
      });
    }
  }, [data]);

  const datechanged = (date) => {
    let d = date;
    if (defaultPaymentValue === 0) {
      let today = new Date();
      let momentDate = moment(today).format("YYYY/MM/DD");
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
      if (momentDate > d) {
        setStatus(chequeObject[3]);
      }
      if (momentDate < d) {
        setStatus(chequeObject[0]);
      }
    }
  };

  const CheckStatusCheque = () => {
    return (
      <MuiAutoComplete
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
    );
  };
  const CheckStatusManual = () => {
    return (
      <MuiAutoComplete
        name="status"
        options={manualObject}
        value={status}
        defaultValue={manualObject[3]}
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

  const PaymentType = () => {
    return (
      <>
        <BackdropLoader play={play} />
        <MuiAutoComplete
          name="payment_type"
          options={paymentObject}
          defaultValue={
            defaultPaymentValue === 0 ? paymentObject[0] : paymentObject[1]
          }
          getOptionLabel={(option) => (option ? option.paymenttype : "")}
          onChange={(e, newvalue) => defaultValue(e, newvalue)}
          sx={{
            "& input": {
              width: "100%",
              bgcolor: "background.paper",
              color: (theme) =>
                theme.palette.getContrastText(theme.palette.background.paper),
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
    );
  };

  useMemo(() => {
    PaymentType();
  }, [data]);

  useMemo(() => {
    CheckStatusCheque();
  }, [status]);

  useMemo(() => {
    CheckStatusManual();
  }, [data]);

  useEffect(() => {
    getBuildingDropdown();
    getDetail(props.location.state.id);
  }, []);

  return (
    <PageWrap>
      <PageLabel>
        <LabelBox>
          <Label>
            <BackLink Dir={dir} onClick={back}>
              <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="payment.editpayment" />
          </Label>
        </LabelBox>
      </PageLabel>

      {loading ? (
        <NoData>
          <CircularProgress />
        </NoData>
      ) : (
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
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
                getChanges={getChanges1}
                options={unitIDList}
                parentVal={buildingChanged}
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
                placeholder={intl.formatMessage({
                  id: "placeholder.tenantname",
                })}
                
                value={
                  tenantIDList.name ? tenantIDList.name : "No Tenant Found"
                }
              />

              <CustomInput
                type="text"
                name="amount"
                placeholder={intl.formatMessage({ id: "table.amount" })}
              />

              <PaymentType />

              {defaultPaymentValue === 1 ? (
                <>
                  <CustomInput
                    type="text"
                    name="cheque_no"
                    placeholder={intl.formatMessage({ id: "table.cheque" })}
                  />

                  <Field
                    name="payment_date"
                    component={PaymentDate}
                    getChanges={datechanged}
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
                            id: "table.paymentdate",
                          })}
                        />
                        <DateIcon Dir={dir}>
                          {InputProps?.endAdornment}
                        </DateIcon>
                      </Box>
                    )}
                  />
                  <CheckStatusCheque />
                </>
              ) : (
                <>
                  <Field
                    name="payment_date"
                    component={PaymentDate}
                    getChanges={datechanged}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
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
                        <DateIcon ref={inputRef} {...inputProps} Dir={dir}>
                          {InputProps?.endAdornment}
                        </DateIcon>
                      </Box>
                    )}
                  />
                  <CheckStatusManual />
                </>
              )}
            </AddPaymentBox>
            <CustomTextArea name="remark"  placeholder={intl.formatMessage({
                            id: "placeholder.remarks",
                          })} />
            <BtnWrap>
              <span className="cancel-btn" onClick={back}>
                <IntlMassage id="button.cancel" />
              </span>
              <button className="submit-btn" type="submit">
                <IntlMassage id="button.submit" />
              </button>
            </BtnWrap>
          </Form>
        </Formik>
      )}
    </PageWrap>
  );
}

const DateIcon = styled.div`
  position: absolute;
  top: 67%;
  left: ${({ Dir }) => Dir === "rtl" && "10px"};
  right: ${({ Dir }) => Dir === "ltr" && "10px"};
`;
