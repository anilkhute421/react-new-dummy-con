import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import IntlMassage from "../../../utils/IntlMassage";
import { AddBuildingBox, BtnWrap } from "../../buildings/Styles";
import * as Yup from "yup";

import {
  BackLink,
  Input,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../../Styles";
import { Form, Formik, Field } from "formik";
import { useIntl } from "react-intl";
import { DependentInput } from "../../../validations/DependentField";
import { getApi, postApi } from "../../../services/ApiMethod";
import { AutoSelect } from "../../../validations/FormAutocomplete";
import { ReAssign } from "../../../validations/ReAssign";
import ExpertItem from "./ExpertItem";
import CustomTextArea from "../../../validations/TextArea";
import ExpertList from "./ExpertList";
import BackdropLoader from "../../../Loader/Backdrop";
import { toast } from "react-toastify";
import { addNewCollection } from "../../../firebase/StartNewChat";
import moment from "moment";

export default function Addrequest() {
  const history = useHistory();
  const back = () => history.goBack();
  const dir = useSelector((state) => state.Language.dir);
  const company_id = useSelector((state) => state.Auth.data.pm_company_id);
  const intl = useIntl();
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState([]);
  const [requestFor, setRequestFor] = useState([]);
  const [addMoreData, setAddMoreData] = useState([]);
  const [uploadingData, setUploadingData] = useState(false);
  const [userVali, setUserVali] = useState("");


  const request_Status = [
    {
      request: intl.formatMessage({ id: "Maintenance.request.raised" }),
      id: 1,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.assigned" }),
      id: 2,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.completed" }),
      id: 3,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.hold" }),
      id: 4,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.canceled" }),
      id: 5,
    },
  ];

  const INITIAL_FORM_STATE = {
    building_id: "",
    unit_id: "",
    request_For: "",
    description: "",
    requestStatus: request_Status[0],
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
    description: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .min(4, intl.formatMessage({ id: "error.short" }))
      .max(500, intl.formatMessage({ id: "error.large" })),
    requestStatus: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
  });
  const openAttachment = (id) => {
    history.push("/home/maintanence/requests/attachment", (id = { id }));
  };
  const handleSubmit = async (values) => {
    if (userVali === true) {
      toast.warning(intl.formatMessage({ id: "Maintenance.request.vali" }), {
        theme: "colored",
      });
    } else {
      setUploadingData(true);
      var arr = [];
      addMoreData.map((item, i) => arr.push(item.itemName.id));

      var DateTimeArray = [];
      addMoreData.map((item, i) =>
        DateTimeArray.push(
          moment(item.dateTimeValue).format("MM/DD/YYYY HH:mm")
        )
      );

      let req = {
        expert_id: arr,
        tenant_id: tenantIDList.tenant_id === null ? 0 : tenantIDList.tenant_id,
        building_id: values.building_id.id,
        unit_id: values.unit_id.id,
        status: values.requestStatus.id,
        description: values.description,
        maintenance_request_id: values.request_For.id,
        visit_date_time: DateTimeArray,
      };
      console.log(req, "req----------");

      let res = await postApi("add_maintanence_request", req);
      if (res.status === 200) {
        setUploadingData(false);

        addNewCollection(
          res.data.maintenance_request_id,
          res.data.unit_id,
          company_id
        );
        toast.info(res.message, { theme: "colored" });

        openAttachment(res.data.maintenance_request_id);
      } else {
        setUploadingData(false);
        toast.error(res, { theme: "colored" });
      }
    }
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
    } else {
      let d = {
        building_id: changeValues.id,
      };
      let res = await postApi(`tenant_unit_dropdown_by_building_id`, d);
      if (res.status === 200) {
        let arr = [];
        res.data.filter(
          (item, index) => item.maintenance_included === 1 && arr.push(item)
        );
        setunitIDList(arr);
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

  const request_For = async () => {
    let res = await getApi(`maintance_request`);
    if (res.status === 200) {
      setRequestFor(res.data);
    }
  };

  const add = (e) => {
    console.log(e, "sdkbsdvh");
    setAddMoreData([...addMoreData, e]);
  };

  const removeExperts = (index) => {
    let newList = addMoreData.filter((el, i) => i !== index);
    setAddMoreData(newList);
  };

  const userValidation = (e) => {
    setUserVali(e);
  };
  useEffect(() => {
    getBuildingDropdown();
    request_For();
  }, []);

  return (
    <PageWrap>
      <BackdropLoader play={uploadingData} />
      <PageLabel>
        <LabelBox>
          <AddreqWrap>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="Maintenance.request.header" />
            </Label>
          </AddreqWrap>
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
        <Form>
          <AddBuildingBox>
            <Field
              name="building_id"
              component={DependentInput}
              getChanges={getChanges}
              options={buildingList}
              getOptionLabel={(option) => (option ? option.building_name : "")}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <SelectInput
                    placeholder={intl.formatMessage({
                      id: "placeholder.buildingid",
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
            <Input
              readOnly
              placeholder={intl.formatMessage({ id: "table.tenantname" })}
              value={
                tenantIDList.tenant_id === null
                  ? "No Tenant Found"
                  : tenantIDList.name
              }
            />

            <Field
              name="request_For"
              component={AutoSelect}
              // getChanges={getChanges1}
              options={requestFor}
              getOptionLabel={(option) =>
                option ? option.maitinance_request_name : ""
              }
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <SelectInput
                    placeholder={intl.formatMessage({
                      id: "table.reqfor",
                    })}
                    Dir={dir}
                    type="text"
                    {...params.inputProps}
                  />
                </div>
              )}
            />
          </AddBuildingBox>
          <CustomTextArea
            type="text"
            name="description"
            placeholder={intl.formatMessage({
              id: "addBuildings.description",
            })}
          />

          <AddBuildingBox>
            <Field
              name="requestStatus"
              component={ReAssign}
              getChanges={(e) => console.log(e)}
              parentVal={addMoreData.length}
              pageName={"Addrequest"}
              expertData={[]}
              options={request_Status}
              getOptionLabel={(option) => (option ? option.request : "")}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <SelectInput
                    placeholder={intl.formatMessage({
                      id: "table.reqStatus",
                    })}
                    Dir={dir}
                    type="text"
                    {...params.inputProps}
                  />
                </div>
              )}
            />
          </AddBuildingBox>

          {addMoreData.length > 0 &&
            addMoreData.map((item, i) => (
              <ExpertList data={item} index={i} Del={removeExperts} key={i} />
            ))}
          <ExpertItem Add={(e) => add(e)} UserVali={(e) => userValidation(e)} />
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
  );
}

const AddreqWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
