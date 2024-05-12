import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IntlMassage from "../../utils/IntlMassage";
import * as Yup from "yup";
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
import { Button } from "@mui/material";
import { DependentInput } from "../../validations/DependentField";
import { getApi, postApi } from "../../services/ApiMethod";
import { useIntl } from "react-intl";
import { AutoSelect } from "../../validations/FormAutocomplete";
import CustomInput from "../../validations/InputField";
import CustomTextArea from "../../validations/TextArea";
import { toast } from "react-toastify";
import BackdropLoader from "../../Loader/Backdrop";
import TenantReqPayment from "../tenants/Modals/TenantReqPayment";

export default function AddUnit() {
  const dir = useSelector((state) => state.Language.dir);
  const [buildingList, setBuildingList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [tenantList, setTenantList] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [maintenanceIncluded, setMaintenanceIncluded] = useState(true);
  const pm_id = useSelector((state) => state.Auth.data.id);
  const intl = useIntl();
  const [uploadingData, setUploadingData] = useState(false);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const back = () => history.goBack();
  const INITIAL_FORM_STATE = {
    unit_num: "",
    building_id: "",
    owners_id: "",
    tenant_id: "",
    rooms: "",
    bathrooms: "",
    area: "",
    monthly_rent: "",
    description: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    unit_num: Yup.string()
      .matches(
        /^[aA-zZ0-9\s]+$/,
        intl.formatMessage({
          id: "error.alphanumeric",
        })
      )
      .required(
        intl.formatMessage({
          id: "error.required",
        })
      ),
    building_id: Yup.object()
      .nullable()
      .required(
        intl.formatMessage({
          id: "error.required",
        })
      ),
    owners_id: Yup.object()
      .nullable()
      .required(
        intl.formatMessage({
          id: "error.required",
        })
      ),
    tenant_id: Yup.object().nullable().optional(),
    rooms: Yup.number()
      .typeError(
        intl.formatMessage({
          id: "error.number",
        })
      )
      .max(
        1000,
        intl.formatMessage({
          id: "error.max1000",
        })
      )
      .required(
        intl.formatMessage({
          id: "error.required",
        })
      ),
    bathrooms: Yup.number()
      .typeError(
        intl.formatMessage({
          id: "error.number",
        })
      )
      .max(
        1000,
        intl.formatMessage({
          id: "error.max1000",
        })
      )
      .required(
        intl.formatMessage({
          id: "error.required",
        })
      ),
    monthly_rent: Yup.string()
      .matches(
        /^[0-9]\d*$/,
        intl.formatMessage({
          id: "error.number",
        })
      )
      .required(
        intl.formatMessage({
          id: "error.required",
        })
      ),
    area: Yup.string()
      .optional()
      .matches(/^[0-9]\d*$/, intl.formatMessage({ id: "error.number" })),
    description: Yup.string()
      .optional()
      .min(4, intl.formatMessage({ id: "error.description.short" }))
      .max(500, intl.formatMessage({ id: "error.description.large" })),
  });
  const handleSubmit = async (values) => {
    setUploadingData(true);
    let req = {
      unit_num: values.unit_num,
      building_id: values.building_id.id,
      owner_id: values.owners_id.id,
      tenant_id: values.tenant_id ? values.tenant_id.id : 0,
      rooms: values.rooms,
      bathrooms: values.bathrooms,
      area: values.area,
      monthly_rent: values.monthly_rent,
      maintenance_included : maintenanceIncluded === true ? 1 : 0,
      description: values.description,
    };

    let res = await postApi(`add_tenant_units`, req);

    if (res.status === 200) {
      setUploadingData(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      setUploadingData(false);
      toast.error(res, { theme: "colored" });
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

  const checkboxValue = () => {
    if(maintenanceIncluded){
      setMaintenanceIncluded(false);
    }else{
      setMaintenanceIncluded(true);
    }
  };

  useEffect(() => {
    getBuildingList();
    getOwnerList();
    getTenantList();
  }, []);

  return (
    <div>
      <BackdropLoader play={uploadingData} />
      <PageWrap>
        {show && <TenantReqPayment show={show} onHide={() => setShow(false)} />}
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="unit.add" />
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
            <AddPaymentBox>
              <CustomInput
                name="unit_num"
                placeholder={intl.formatMessage({ id: "placeholder.unitno" })}
              />
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

              <Field
                name="tenant_id"
                component={AutoSelect}
                options={tenantList}
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

              <CustomInput
                name="rooms"
                placeholder={intl.formatMessage({ id: "placeholder.rooms" })}
              />
              <CustomInput
                name="bathrooms"
                placeholder={intl.formatMessage({
                  id: "placeholder.bathrooms",
                })}
              />
              <CustomInput
                name="area"
                placeholder={intl.formatMessage({
                  id: "placeholder.area.square",
                })}
              />

              <Input
                style={{ color: "rgba(0,0,0,0.6)" }}
                value={currency}
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
            <InputCheckboxHeader>
              <IntlMassage id="placeholder.maintenanceIncluded" />
            </InputCheckboxHeader>
            <BtnWrap>
              <Button
                className="cancel-btn"
                sx={{ textTransform: "none" }}
                onClick={back}
              >
                <IntlMassage id="button.cancel" />
              </Button>

              <Button color="primary" variant="contained" type="submit">
                <IntlMassage id="button.submit" />
              </Button>
            </BtnWrap>
          </Form>
        </Formik>
      </PageWrap>
    </div>
  );
}
