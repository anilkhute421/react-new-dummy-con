import React, { useEffect, useMemo, useState } from "react";
import {
  BackLink,
  BtnWrap,
  CancelImg,
  FileSelect,
  ImageInputWrap,
  SelectInput,
  Label,
  LabelBox,
  LabelMedium,
  PageLabel,
  PageWrap,
  SelectedImgWrap,
  Input,
  ForMikWrap,
} from "../Styles";
import {
  AddBuildingBox as AddContractBox,
  AssignToGrid,
} from "../buildings/Styles";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { InputBg, docIcon } from "../../utils/images";
import IntlMassage from "../../utils/IntlMassage";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useIntl } from "react-intl";
import CustomInput from "../../validations/InputField";
import { getApi, postApi } from "../../services/ApiMethod";
import { DependentInput } from "../../validations/DependentField";
import Loader from "../../Loader/Loader";
import { DateSelect } from "../../validations/DateSelect";
import { Box } from "@mui/system";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import DeleteImage from "../../components/DeleteImage";
import NotDeleteImage from "../../components/NotDeleteImage";
import BackdropLoader from "../../Loader/Backdrop";
import { ChildInput } from "../../validations/ChildInput";

export default function EditContract(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const [play, setPlay] = useState(false);
  const [previewList, setPreviewList] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const intl = useIntl();
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState({});
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [fileError, setFileError] = useState("");
  const [listLoading, setListLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [notDelete, setNotDelete] = useState(false);
  const [imageId, setImageId] = useState("");
  const [buildingChanged, setBuildingChanged] = useState("");

  useMemo(() => {
    let ar = [];
    for (let i = 0; i < selectedFile.length; i++) {
      ar.push(URL.createObjectURL(selectedFile[i]));
    }
    setPreviewList(ar);
  }, [selectedFile]);

  const INITIAL_FORM_STATE = useMemo(() => {
    if (data) {
      return {
        contract_name: data.name,
        building_id: {
          id: data.building_id,
          building_name: data.building_name,
        },
        unit_id: {
          unit_no: data.unit_no,
          id: data.unit_id,
        },
        start_date: data.start_date,
        expiry_date: data.end_date,
      };
    }

    return {
      contract_name: "",
      building_id: "",
      unit_id: "",
      start_date: "",
      expiry_date: "",
      tenant_id: "",
    };
  }, [data]);

  const FORM_VALIDATION = Yup.object().shape({
    contract_name: Yup.string()
      .matches(
        /^[aA-zZ0-9\s]+$/,
        intl.formatMessage({ id: "error.alphanumeric" })
      )
      .min(4, intl.formatMessage({ id: "error.shortname" }))
      .max(40, intl.formatMessage({ id: "error.largename" }))
      .required(intl.formatMessage({ id: "error.required" })),
    building_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    unit_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    start_date: Yup.date()
      .typeError(intl.formatMessage({ id: "error.date" }))
      .required(intl.formatMessage({ id: "error.required" })),
    expiry_date: Yup.date()
      .typeError(intl.formatMessage({ id: "error.date" }))
      .required(intl.formatMessage({ id: "error.required" })),
  });

  const handleSubmit = async (values) => {
    let d = {
      contract_id: props.location.state.id,
      contract_name: values.contract_name,
      building_id: values.building_id.id,
      unit_id: values.unit_id.id,
      start_date: values.start_date,
      expiry_date: values.expiry_date,
      tenant_id: tenantIDList.tenant_id === null ? 0 : tenantIDList.tenant_id,
    };

    setPlay(true);
    let res = await postApi("update_contract", d);
    if (res.status === 200) {
      setPlay(false);
      toast.info(res.message , { theme: "colored" });
      back();
    } else {
      toast.error(res, { theme: "colored" });
      setPlay(false);
    }
  };

  const getBuildingDropdown = async () => {
    let res = await getApi("building_dropdown_by_company_id");
    if (res.status === 200) {
      setBuildingList(res.data);
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
      setTenantIDList(null);
      return;
    }
    let res = await getApi(`get_tenant_by_unit_id/${changeValues.id}`);

    if (res.status === 200) {
      setTenantIDList(res.data);
    }
  };

  const viewdetails = async (id) => {
    setLoading(true);
    let d = {
      contract_id: id,
    };

    let res = await postApi(`view_contract_by_contract_id`, d);
    if (res.status === 200) {
      setData(res.data);

      setTenantIDList({
        tenant_id: res.data.Tenant_id,
        name: res.data.tenant_name,
      });
      setLoading(false);
    }
  };

  const uploadImage = async (files) => {
    setPlay(true);
    let FD = new FormData();
    FD.append("contract_id", data.id);
    FD.append("contract_file", files[0], files[0].name);

    let res = await postApi(`add_new_contract_file`, FD);
    if (res.status === 200) {
      setPlay(false);
      getImages(props.location.state.id);
      toast.info(res.message , { theme: "colored" });
    } else {
      toast.error(res, { theme: "colored" });
      setPlay(false);
    }
  };

  const ConfirmDeleteMessge = (image_id) => {
    if (fileList.length > 1) {
      setOpenDelete(true);
      setImageId(image_id);
    } else {
      setNotDelete(true);
      setImageId("");
    }
  };
  const closeDelModal = () => {
    setOpenDelete(false);
    setNotDelete(false);
  };

  const DeleteConfirm = async () => {
    let d = {
      contract_file_id: imageId,
    };
    let res = await postApi(`delete_contract_file_by_file_id`, d);
    if (res.status === 200) {
      getImages(props.location.state.id);
      closeDelModal();
    } else {
      toast.error(res, { theme: "colored" });
      closeDelModal();
    }
  };

  const getImages = async (id) => {
    setListLoading(true);
    let d = {
      contract_id: id,
    };
    let res = await postApi("all_files_by_contract_id", d);
    if (res.status === 200) {
      setFileList(res.data);
      setListLoading(false);
    } else {
      setListLoading(false);
    }
  };

  useMemo(() => {
    getImages();
  }, []);
  useMemo(() => {
    getUnitDropdown(data.building_id);
    if (data.tenant_name) {
      setTenantIDList({
        name: data.tenant_name,
      });
    }
  }, [data]);

  useEffect(() => {
    if (fileList.length === 0) {
      return false;
    } else {
      setPreviewList(fileList);
    }
  }, [fileList]);

  useEffect(() => {
    getBuildingDropdown();
    viewdetails(props.location.state.id);
    getImages(props.location.state.id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <DeleteImage
        show={openDelete}
        onHide={closeDelModal}
        handleConfirm={DeleteConfirm}
      />
      <NotDeleteImage show={notDelete} onHide={closeDelModal} />
      <BackdropLoader play={play} />

      <PageWrap>
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="contract.header.edit" />
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
          <Form>
            <AddContractBox>
              <CustomInput
                type="text"
                name="contract_name"
                placeholder={intl.formatMessage({ id: "table.contractName" })}
              />
            </AddContractBox>

            <ForMikWrap>
              {listLoading ? (
                <Box
                  sx={{ width: "100%", height: "90px" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <FileSelect>
                  {previewList &&
                    previewList.map((image, index) => (
                      <SelectedImgWrap Dir={dir} key={index}>
                        {image.file_name.toString().includes(".pdf") ? (
                          <img className="p-4" src={docIcon} alt="" />
                        ) : (
                          <img src={image.file_name} alt="" />
                        )}

                        <CancelImg
                          onClick={() => ConfirmDeleteMessge(image.id)}
                          Dir={dir}
                        >
                          <i className="icon-delete"></i>
                        </CancelImg>
                      </SelectedImgWrap>
                    ))}
                  {fileList.length < 5 && (
                    <ImageInputWrap Dir={dir}>
                      <img src={InputBg} alt="" />
                      <IntlMassage id="contract.uploadContracthere" />
                      <input
                        type="file"
                        accept=".jpg,.png,.pdf"
                        onChange={(e) => uploadImage(e.target.files)}
                      />
                    </ImageInputWrap>
                  )}
                </FileSelect>
              )}
              <div className="err-msg">{fileError}</div>
            </ForMikWrap>

            <PageLabel>
              <LabelBox>
                <LabelMedium>
                  <IntlMassage id="contract.assignTo" />
                </LabelMedium>
              </LabelBox>
            </PageLabel>

            <AssignToGrid>
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
                component={ChildInput}
                parentVal={buildingChanged}
                options={unitIDList}
                getChanges={getChanges1}
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
            </AssignToGrid>
            <AssignToGrid>
              <Field
                name="start_date"
                component={DateSelect}
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
                      id: "table.startDate",
                    })}
                  />
                    <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                  </Box>
                )}
              />

              <Field
                name="expiry_date"
                component={DateSelect}
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
                      id: "table.expiryDate",
                    })}
                  />
                    <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                  </Box>
                )}
              />
            </AssignToGrid>
            <AssignToGrid>
              <Input
                readOnly
                placeholder={intl.formatMessage({ id: "table.tenantname" })}
                value={tenantIDList ? tenantIDList.name : "No Tenant Found"}
              />
            </AssignToGrid>

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
    </div>
  );
}

const DateIcon = styled.div`
  position: absolute;
  top: 67%;
  left: ${({ Dir }) => Dir === "rtl" && "10px"};
  right: ${({ Dir }) => Dir === "ltr" && "10px"};
`;
