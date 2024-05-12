import { Formik, Form, Field } from "formik";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IntlMassage from "../../utils/IntlMassage";
import { AddBuildingBox as AddPaymentBox } from "../buildings/Styles";
import {
  BackLink,
  BtnWrap,
  Input,
  InputCheckbox,
  InputCheckboxHeader,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  SelectInput,
} from "../Styles";
import { useIntl } from "react-intl";
import { Button } from "@mui/material";
import * as Yup from "yup";
import CustomInput from "../../validations/InputField";
import { getApi, postApi } from "../../services/ApiMethod";
import { DependentInput } from "../../validations/DependentField";
import { AutoSelect } from "../../validations/FormAutocomplete";
import CustomTextArea from "../../validations/TextArea";
import Loader from "../../Loader/Loader";
import { toast } from "react-toastify";
import BackdropLoader from "../../Loader/Backdrop";
import TenantReqPayment from "../tenants/Modals/TenantReqPayment";
import { ChildInput } from "../../validations/ChildInput";
import DisconnectModal from "../../components/DisconnectModal";

export default function EditUnit(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const intl = useIntl();
  const back = () => history.goBack();
  const [buildingList, setBuildingList] = useState([]);
  const [currency, setCurrency] = useState("");
  const [ownerList, setOwnerList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const pm_id = useSelector((state) => state.Auth.data.id);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});
  const [play, setPlay] = useState(false);
  const [show, setShow] = useState(false);
  const [tenantUnitID, setTenantUnitID] = useState("");
  const [clearVal, setClearVal] = useState(0);
  const [disconnectShow, setDisconnectShow] = useState(false);
  const [maintenanceIncluded, setMaintenanceIncluded] = useState();

  console.log(maintenanceIncluded , "maintenanceIncludedmaintenanceIncluded")

  const handleClick = useRef();
  const INITIAL_FORM_STATE = useMemo(() => {
    if (data) {
      return {
        unit_num: data.unit_no,
        building_id: {
          building_name: data.building_name,
          id: data.building_id,
        },
        owners_id: {
          name: data.owner_name,
          id: data.owner_id,
        },
        tenant_id: {
          name: `${
            data.tenant_last_name === ""
              ? ""
              : `${data.tenant_first_name} ${data.tenant_last_name}`
          }`,
          id: data.tenant_id,
        },
        address: data.building_address,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        area_sqm: data.area_sqm,
        monthly_rent: data.monthly_rent,
        currency: data.currency,
        description: data.description,
      };
    }
    return {
      unit_num: "",
      building_id: "",
      owners_id: "",
      tenant_id: "",
      address: "",
      rooms: "",
      bathrooms: "",
      area_sqm: "",
      monthly_rent: "",
      currency: "",
      description: "",
    };
  }, [data]);

  const FORM_VALIDATION = Yup.object().shape({
    unit_num: Yup.string()
      .matches(
        /^[aA-zZ0-9\s]+$/,
        intl.formatMessage({
          id: "error.alphanumeric",
        })
      )
      .required(intl.formatMessage({ id: "error.required" })),
    building_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    owners_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    tenant_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    rooms: Yup.number()
      .typeError(
        intl.formatMessage({
          id: "error.number",
        })
      )
      .max(1000, intl.formatMessage({ id: "error.max1000" }))
      .required(intl.formatMessage({ id: "error.required" })),
    bathrooms: Yup.number()
      .typeError(intl.formatMessage({ id: "error.number" }))
      .max(1000, intl.formatMessage({ id: "error.max1000" }))
      .required(intl.formatMessage({ id: "error.required" })),
    monthly_rent: Yup.string()
      .matches(/^[0-9]\d*$/, intl.formatMessage({ id: "error.number" }))
      .required(intl.formatMessage({ id: "error.required" })),
    area_sqm: Yup.string()
      .optional()
      .matches(/^[0-9]\d*$/, intl.formatMessage({ id: "error.number" })),
    description: Yup.string()
      .optional()
      .min(4, intl.formatMessage({ id: "error.description.short" }))
      .max(500, intl.formatMessage({ id: "error.description.large" })),
  });

  const viewUnitDetail = async () => {
    setLoader(true);
    let res = await getApi(`get_tenant_units_info/${props.location.state.id}`);
    console.log(res , "res-------------8564616")
    if (res.status === 200) {
      console.log(res.data);
      setData(res.data);
      setMaintenanceIncluded(res.data.maintenance_included === 1 ? true : false)
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getBuildingList = async () => {
    let res = await getApi(`get_all_buildings/${pm_id}`);
    if (res.status === 200) {
      setBuildingList(res.data);
    }
  };
  const getChanges = async (changedBuilding_id) => {
    if (changedBuilding_id !== null) {
      let res = await getApi(
        `get_currency_code_by_building_id/${changedBuilding_id.id}`
      );
      if (res.status === 200) {
        setCurrency(res.data);
      }
    }
  };

  const getOwnerList = async () => {
    let res = await getApi("owners_dropdown_by_pm/");
    if (res.status === 200) {
      setOwnerList(res.data);
    }
  };
  const getTenantList = async () => {
    let res = await getApi("tenants_dropdown_by_pm_company_id");
    if (res.status === 200) {
      setTenantList(res.data);
    }
  };

  const handleSubmit = async (values) => {
    setPlay(true);
    const FD = {
      unit_id: data.id,
      unit_num: values.unit_num,
      building_id: values.building_id.id,
      owner_id: values.owners_id.id,
      tenant_id: values.tenant_id.id === "" ? 0 : values.tenant_id.id,
      address: values.address,
      rooms: values.rooms,
      bathrooms: values.bathrooms,
      area: values.area_sqm,
      monthly_rent: values.monthly_rent,
      maintenance_included : maintenanceIncluded === true ? 1 : 0,
      description: values.description,
    };

    let res = await postApi(`edit_tenant_units`, FD);
    if (res.status === 200) {
      toast.info(res.message, { theme: "colored" });
      back();
      setPlay(false);
    } else {
      setPlay(false);
      toast.error(res, { theme: "colored" });
    }
  };

  const manuallSubmit = () => {
    handleClick.current.click();
  };

  const showTenantAction = async (tenantUnit) => {
    setPlay(true);

    let req = {
      tenant_id: tenantUnit.id,
      tenant_unit_id: data.id,
    };

    let res = await postApi(
      "on_change_tenant_drop_down_of_tenant_unit_edit",
      req
    );
    if (res.status === 200) {
      if (res.show_pop_up === 1) {
        setTenantUnitID(tenantUnit.id);
        setShow(true);
        setPlay(false);
      } else {
        setPlay(false);
      }
    }
  };

  const Disconnect = () => {
    setDisconnectShow(true);
  };

  const checkboxValue = () => {
    if(maintenanceIncluded){
      setMaintenanceIncluded(false);
    }else{
      setMaintenanceIncluded(true);
    }
  };

  useEffect(() => {
    viewUnitDetail();
    getBuildingList();
    getOwnerList();
    getTenantList();
  }, []);

  const modalCancel = () => {
    setClearVal(clearVal + 1);
    setShow(false);
  };

  useMemo(() => {
    getChanges(data);
  }, [data]);
  if (loader) {
    return <Loader />;
  } else {
    return (
      <div>
        {show && (
          <TenantReqPayment
            show={show}
            onHide={() => setShow(false)}
            tenant_unit_id={data.id}
            tenant_id={tenantUnitID}
            modalCancel={modalCancel}
            manuallSubmit={manuallSubmit}
          />
        )}

        {disconnectShow && (
          <DisconnectModal
            show={disconnectShow}
            onHide={() => setDisconnectShow(false)}
            tenant_unit_id={data.id}
          />
        )}
        <BackdropLoader play={play} />
        <PageWrap>
          <PageLabel>
            <LabelBox className="d-flex justify-content-between">
              <Label>
                <BackLink Dir={dir} onClick={back}>
                  <i className="icon-down-back" />
                </BackLink>
                <IntlMassage id="unit.edit" />
              </Label>

              {data.tenant_id && (
                <Button
                  onClick={Disconnect}
                  sx={{ background: "aliceblue", border: "1px solid #145DA0 " }}
                >
                  {intl.formatMessage({ id: "label.disconnect" })}
                </Button>
              )}
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
              <AddPaymentBox>
                <CustomInput
                  name="unit_num"
                  placeholder={intl.formatMessage({
                    id: "placeholder.unitno",
                  })}
                />
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
                  name="owners_id"
                  component={AutoSelect}
                  options={ownerList}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                      <SelectInput
                        placeholder={intl.formatMessage({
                          id: "placeholder.ownername",
                        })}
                        Dir={dir}
                        type="text"
                        {...params.inputProps}
                      />
                    </div>
                  )}
                />

                {data.tenant_id ? (
                  <Input
                    style={{ color: "rgba(0,0,0,0.6)" }}
                    value={`${data.tenant_first_name} ${data.tenant_last_name}`}
                    readOnly
                    placeholder={intl.formatMessage({
                      id: "placeholder.tenantname",
                    })}
                  />
                ) : (
                  <Field
                    name="tenant_id"
                    component={ChildInput}
                    parentVal={clearVal}
                    options={tenantList}
                    getChanges={showTenantAction}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <SelectInput
                          placeholder={intl.formatMessage({
                            id: "placeholder.tenantname",
                          })}
                          Dir={dir}
                          type="text"
                          {...params.inputProps}
                        />
                      </div>
                    )}
                  />
                )}

                <CustomInput
                  name="rooms"
                  placeholder={intl.formatMessage({
                    id: "placeholder.rooms",
                  })}
                />
                <CustomInput
                  name="bathrooms"
                  placeholder={intl.formatMessage({
                    id: "placeholder.bathrooms",
                  })}
                />
                <CustomInput
                  name="area_sqm"
                  placeholder={intl.formatMessage({
                    id: "placeholder.area.square",
                  })}
                />

                <CustomInput
                  name="currency"
                  style={{ color: "rgba(0,0,0,0.6)" }}
                  readOnly
                  placeholder={intl.formatMessage({
                    id: "placeholder.currency",
                  })}
                />

                <CustomInput
                  name="monthly_rent"
                  placeholder={intl.formatMessage({
                    id: "placeholder.monthlyrent",
                  })}
                />
              </AddPaymentBox>
              <CustomTextArea
                name="description"
                type="text"
                placeholder={intl.formatMessage({
                  id: "placeholder.description",
                })}
              />

              <InputCheckbox
                type="checkbox"
                checked={maintenanceIncluded}
                value={maintenanceIncluded}
                onChange={checkboxValue}
              />
              <InputCheckboxHeader>Maintenance Included</InputCheckboxHeader>
              <BtnWrap>
                <Button
                  className="cancel-btn"
                  sx={{ textTransform: "none" }}
                  onClick={back}
                >
                  <IntlMassage id="button.cancel" />
                </Button>

                <Button
                  ref={handleClick}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  <IntlMassage id="button.submit" />
                </Button>
              </BtnWrap>
            </Form>
          </Formik>
        </PageWrap>
      </div>
    );
  }
}
