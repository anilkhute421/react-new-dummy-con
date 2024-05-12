import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IntlMassage from "../../../utils/IntlMassage";
import { AutoSelect } from "../../../validations/FormAutocomplete";
import CustomTextArea from "../../../validations/TextArea";
import { AddBuildingBox } from "../../buildings/Styles";
import {
  BackLink,
  BtnWrap,
  InfoLabel,
  InfoLine,
  InfoValue,
  Input,
  Label,
  LabelBox,
  PageHeader,
  PageWrap,
  SelectInput,
} from "../../Styles";
import * as Yup from "yup";
import { getApi, postApi } from "../../../services/ApiMethod";
import ExpertList from "./ExpertList";
import ExpertItem from "./ExpertItem";
import Loader from "../../../Loader/Loader";
import ExpertAlreadyExits from "./ExpertAlreadyExits";
import { toast } from "react-toastify";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import BackdropLoader from "../../../Loader/Backdrop";
import { ReAssign } from "../../../validations/ReAssign";
import moment from "moment";


export default function Editrequest(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  const id = props.location.state.id;
  const intl = useIntl();
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState([]);
  const [requestFor, setRequestFor] = useState([]);
  const [addMoreData, setAddMoreData] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expertDetails, setExpertDetails] = useState([]);
  const [yesMan, setYesMan] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
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

  const INITIAL_FORM_STATE = useMemo(() => {
    if (details) {
      return {
        building_id: {
          building_name: details.building_name,
          id: details.building_id,
        },
        unit_id: {
          unit_no: details.unit_no,
          id: details.unit_id,
        },
        tenant_id: {
          tenant_name: details.requested_by,
          id: details.tenant_id,
        },
        request_For: {
          maitinance_request_name: details.request_for,
          id: details.request_for_id,
        },
        description: details.description,
        requestStatus: {
          request: details.status,
          id: details.status_int,
        },
      };
    }
    return {
      building_id: "",
      unit_id: "",
      tenant_id: "",
      request_For: "",
      description: "",
      requestStatus: "",
    };
  }, [details]);
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
  const handleSubmit = async (values) => {
    if (userVali === true) {
      toast.warning(intl.formatMessage({ id: "Maintenance.request.vali" }), {
        theme: "colored",
      });
    } else {
      setUploadingData(true);
      var arrMy = [];
      addMoreData.map((item, i) => arrMy.push(item.itemName.id));

      var DateTimeArray = [];
      addMoreData.map((item, i) => DateTimeArray.push(moment(item.dateTimeValue).format("MM/DD/YYYY HH:mm")));

      let req = {
        request_id: details.id,
        expert_id: arrMy,
        tenant_id: tenantIDList.tenant_id === null ? 0 : tenantIDList.tenant_id,
        building_id: values.building_id.id,
        unit_id: values.unit_id.id,
        status: values.requestStatus.id,
        description: values.description,
        maintenance_request_id: values.request_For.id,
        visit_date_time: DateTimeArray,
      };

      let res = await postApi("update_maintanence_request_by_request_id", req);
      if (res.status === 200) {
        setUploadingData(false);
        toast.info(res.message, { theme: "colored" });
        let id = props.location.state.id;
        history.push(`/home/maintanence/requests/attachment`, (id = { id }));
      } else {
        toast.error(res.message, { theme: "colored" });
        setUploadingData(false);
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
  const request_For = async () => {
    let res = await getApi(`maintance_request`);
    if (res.status === 200) {
      setRequestFor(res.data);
    }
  };

  const getViewReqestDetail = async (id) => {
    setLoading(true);
    let d = {
      request_id: id,
    };
    let res = await postApi("view_maintanence_request_by_request_id", d);
    if (res.status === 200) {
      setDetails(res.data);
      setTenantIDList({
        tenant_id: res.data.tenant_id,
        name: res.data.requested_by,
      });
      setExpertDetails(res.experts);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const add = (e) => {
    setAddMoreData([...addMoreData, e]);
  };
  const removeExperts = (index) => {
    let newList = addMoreData.filter((el, i) => i !== index);
    setAddMoreData(newList);
  };
  const delExpert = (id) => {
    let newList = expertDetails.filter((el) => el.id !== id);
    setExpertDetails(newList);
  };

  const removeExitingExperts = async (data) => {
    setYesMan(true);
    setLoadingList(true);
    let req = {
      request_expert_id: data.id,
    };
    let res = await postApi("unassign_expert_from_maintenance_request", req);
    if (res.status === 200) {
      delExpert(data.id);
      setLoadingList(false);
      toast.info(res.message, { theme: "colored" });
    } else {
      setLoadingList(false);
      toast.info(res, { theme: "colored" });
    }
  };

  const userValidation = (e) => {
    setUserVali(e);
  };

  useMemo(() => {
    if (details.requested_by) {
      setTenantIDList({
        name: details.requested_by,
      });
    }
  }, [details]);

  useEffect(() => {
    getBuildingDropdown();
    request_For();
    getViewReqestDetail(id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageWrap>
        <BackdropLoader play={uploadingData} />

        <PageHeader>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="maintanence.editrequest" />
            </Label>
          </LabelBox>
        </PageHeader>

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
              <Input
                readOnly
                placeholder={intl.formatMessage({
                  id: "placeholder.buildingid",
                })}
                value={
                  details.building_name === null
                    ? "No Buliding Found"
                    : details.building_name
                }
              />

              <Input
                readOnly
                placeholder={intl.formatMessage({
                  id: "table.unitID",
                })}
                value={
                  details.unit_no === null ? "No Unit Found" : details.unit_no
                }
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
              {/* <Field
                name="requestStatus"
                component={AutoSelect}
                // getChanges={getChanges1}
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
              /> */}

              <Field
                name="requestStatus"
                component={ReAssign}
                parentVal={addMoreData.length}
                pageName={"Editrequest"}
                expertData={expertDetails}
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

              <InfoLine className="m-0 d-flex align-items-end">
                <InfoLabel>
                  <IntlMassage id="placeholder.preferred_date_time" />
                </InfoLabel>
                <InfoValue>{details.preferred_date_time}</InfoValue>
              </InfoLine>
            </AddBuildingBox>

            {loadingList ? (
              <Box
                sx={{ width: "100%", height: "90px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                {expertDetails.length > 0 &&
                  expertDetails.map((item, i) => (
                    <ExpertAlreadyExits
                      data={item}
                      index={i}
                      Del={removeExitingExperts}
                      key={i}
                    />
                  ))}
              </>
            )}

            {addMoreData.length > 0 &&
              addMoreData.map((item, i) => (
                <ExpertList data={item} index={i} Del={removeExperts} key={i} />
              ))}
            <ExpertItem
              Add={(e) => add(e)}
              UserVali={(e) => userValidation(e)}
            />
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
