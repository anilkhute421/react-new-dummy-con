import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BackLink,
  BtnWrap,
  Input,
  Label,
  LabelBox,
  LabelMedium,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../../Styles";
import { MaintanenceBox } from "../Style";
import IntlMassage from "../../../utils/IntlMassage";
import ExpenseList from "./ExpenseList";
import ExpenseItem from "./ExpenseItem";
import { getApi, postApi } from "../../../services/ApiMethod";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useIntl } from "react-intl";
import { DependentInput } from "../../../validations/DependentField";
import { AutoSelect } from "../../../validations/FormAutocomplete";
import BackdropLoader from "../../../Loader/Backdrop";
import { toast } from "react-toastify";
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: ".png , .jpg",
};

export default function AddExpenses() {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const intl = useIntl();
  const back = () => history.goBack();
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [requestId, setRequestId] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState([]);
  const [uploadingData, setUploadingData] = useState(false);
  const [userVali, setUserVali] = useState("");

  const INITIAL_FORM_STATE = {
    building_id: "",
    unit_id: "",
    request_For: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    building_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    unit_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    request_For: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
  });

  const getBuildingDropdown = async () => {
    let res = await getApi("building_dropdown_by_company_id");
    if (res.status === 200) {
      setBuildingList(res.data);
    }
  };
  const getChanges = async (changeValues) => {
    if (changeValues === null) {
      setunitIDList([]);
    } else {
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

    const getRequestID = async (id) => {
      let req = {
        unit_id: id,
      };
      let res = await postApi("request_dropdown", req);
      if (res.status === 200) {
        setRequestId(res.data);
      }
    };
    getRequestID(changeValues.id);
  };

  const handleSubmit = async (values) => {
    console.log(values , "values------------")
    console.log(selectedExpenses , "selectedExpense---")
    if (selectedExpenses.length > 0) {
      if (userVali === true) {
        toast.warning(intl.formatMessage({ id: "Maintenance.request.vali" }), {
          theme: "colored",
        });
      }
      if (userVali === false) {
        setUploadingData(true);
        var FD = new FormData();
        FD.append("building_id", values.building_id.id);
        FD.append("unit_id", values.unit_id.id);
        FD.append(
          "tenant_id",
          tenantIDList.tenant_id === null ? 0 : tenantIDList.tenant_id
        );
        FD.append("request_id", values.request_For.id);

        //items
        var a = 0;
        for (let i = 0; i < selectedExpenses.length; i++) {
          FD.append("expenses_lines_ids[]", selectedExpenses[i].itemName.id);
          FD.append("currency_ids[]", selectedExpenses[i].currency.id);
          FD.append("expenses_amounts[]", selectedExpenses[i].amount);
          FD.append("dates[]", selectedExpenses[i].date);
          // FD.append("description[]", selectedExpenses[i].remarks==="" ? null : selectedExpenses[i].remarks);
          FD.append("description[]", selectedExpenses[i].remarks);
          var arr = selectedExpenses[i].files;
          for (let i = 0; i < arr.length; i++) {
            var arr_name = "files_array[" + a + "][" + i + "]";
            FD.append(arr_name, arr[i], arr[i].name);
          }
          a++;
        }
        let res = await postApi("add_expense", FD);
        if (res.status === 200) {
          setUploadingData(false);
          toast.info(res.message, { theme: "colored" });
          history.push("/home/maintanence");
        } else {
          setUploadingData(false);
          toast.error(res, { theme: "colored" });
        }
      }
    } else {
      toast.warning(
        intl.formatMessage({ id: "Maintenance.request.atleastvali" }),
        {
          theme: "colored",
        }
      );
    }
  };

  const add = (newExpense) => {
    setSelectedExpenses([...selectedExpenses, newExpense]);
  };
  const removeExpense = (index) => {
    let newList = selectedExpenses.filter((ele, idx) => idx !== index);
    setSelectedExpenses(newList);
  };
  const addButtonValidation = (e) => {
    setUserVali(e);
  };

  const setTrueAddButton = (e) => {
    setUserVali(e);
  };

  useEffect(() => {
    getBuildingDropdown();
  }, []);
  return (
    <>
      <PageWrap>
        <BackdropLoader play={uploadingData} />

        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>

              <IntlMassage id="label.addexpenses" />
            </Label>
          </LabelBox>
        </PageLabel>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <MaintanenceBox>
              <Field
                name="building_id"
                component={DependentInput}
                options={buildingList}
                getChanges={getChanges}
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
                name="unit_id"
                component={DependentInput}
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
              <Field
                name="request_For"
                component={AutoSelect}
                // getChanges={getChanges1}
                options={requestId}
                getOptionLabel={(option) => (option ? option.request_code : "")}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder={intl.formatMessage({
                        id: "table.reqid",
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
                value={tenantIDList ? tenantIDList.name : "No Tenant Found"}
                placeholder={intl.formatMessage({
                  id: "table.tenantname",
                })}
              />
            </MaintanenceBox>
            <PageLabel>
              <LabelBox>
                <LabelMedium>
                  <IntlMassage id="Maintenance.addExpense" />
                </LabelMedium>
              </LabelBox>
            </PageLabel>

            

            {selectedExpenses.map((ele, i) => (
              <ExpenseList key={i} data={ele} Del={removeExpense} index={i} />
            ))}

            {selectedExpenses.length < 3 && (
              <ExpenseItem
                UserVali={(e) => addButtonValidation(e)}
                Add={(payload) => add(payload)}                
                AddButtonState={(e) => setTrueAddButton(e)}
              />
            )}
            {/* <CustomTextArea
              name="remarks"
              placeholder={intl.formatMessage({
                id: "placeholder.remarks",
              })}
            /> */}
            <BtnWrap>
              <span className="cancel-btn " onClick={back}>
                <IntlMassage id="button.cancel" />
              </span>
              <button className="submit-btn" type="submit">
                <IntlMassage id="button.submit" />
              </button>
            </BtnWrap>
          </Form>
        </Formik>
      </PageWrap>
    </>
  );
}
