import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import IntlMassage from "../../utils/IntlMassage";
import { docIcon, InputBg } from "../../utils/images";
import {
  AddBuildingBox as AddContractBox,
  AssignToGrid,
} from "../buildings/Styles";
import {
  BackLink,
  BtnWrap,
  CancelImg,
  FileSelect,
  ImageInputWrap,
  Input,
  Label,
  LabelBox,
  LabelMedium,
  PageLabel,
  PageWrap,
  SelectedImgWrap,
  SelectInput,
} from "../Styles";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import CustomInput from "../../validations/InputField";
import { useIntl } from "react-intl";
import { DependentInput } from "../../validations/DependentField";
import Box from "@mui/material/Box";
import BackdropLoader from "../../Loader/Backdrop";
import { getApi, postApi } from "../../services/ApiMethod";
import styled from "styled-components";
import { toast } from "react-toastify";

import { DateSelect } from "../../validations/DateSelect";
import imageCompression from "browser-image-compression";
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: ".png",
};

export default function AddContract() {
  const intl = useIntl();
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const [previewList, setPreviewList] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [unitIDList, setunitIDList] = useState([]);
  const [tenantIDList, setTenantIDList] = useState([]);
  const [uploadingData, setUploadingData] = useState(false);

  const chooseFiles = (files) => {
    if (fileList.length !== 0) {
      let previousLength = fileList.length;
      let requiredLength = 5 - previousLength;
      let invalidType = [];
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].type === "image/png" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/jpg" ||
          files[i].type === "application/pdf"
        ) {
          if (i < requiredLength) {
            setSelectedFile((prev) => [...prev, files[i]]);
            setFileList((prev) => [...prev, files[i]]);
          }
        } else {
          invalidType.push(files[i]);
        }
      }
      if (invalidType.length > 0) {
        toast.error("file type invalid", { theme: "colored" });
      }
    } else {
      if (files.length > 0 && files.length <= 5) {
        let InvalidFiles = [];
        for (let i = 0; i < files.length; i++) {
          if (
            files[i].type === "image/png" ||
            files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "application/pdf"
          ) {
            setSelectedFile((prev) => [...prev, files[i]]);
            setFileList((prev) => [...prev, files[i]]);
          } else {
            InvalidFiles.push(files[i]);
          }
        }
        if (InvalidFiles.length > 0) {
          toast.error("file type invalid", { theme: "colored" });
        }
      } else if (files.length > 5) {
        let arr = [];
        let InvalidList = [];
        for (let i = 0; i < files.length; i++) {
          if (
            files[i].type === "image/png" ||
            files[i].type === "image/jpeg" ||
            files[i].type === "application/pdf"
          ) {
            if (arr.length < 5) {
              arr.push(files[i]);
            }
          } else {
            InvalidList.push(files[i]);
          }
        }
        setSelectedFile(arr);
        if (InvalidList.length > 0) {
          toast.error("file type invalid", { theme: "colored" });
        }
      }
    }
  };

  const removeImg = (index) => {
    let current = [];
    for (let i = 0; i < selectedFile.length; i++) {
      if (selectedFile[i] !== selectedFile[index]) {
        current.push(selectedFile[i]);
      }
    }
    setFileList(current);
    setSelectedFile(current);
  };
  useMemo(() => {
    let ar = [];
    for (let i = 0; i < selectedFile.length; i++) {
      if (selectedFile[i].type === "application/pdf") {
        ar.push(selectedFile[i]);
      } else {
        ar.push(URL.createObjectURL(selectedFile[i]));
      }
    }
    setPreviewList(ar);
  }, [selectedFile]);

  const INITIAL_FORM_STATE = {
    contract_name: "",
    building_id: "",
    unit_id: "",
    start_date: "",
    expiry_date: "",
  };
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
    setUploadingData(true);
    let data = new FormData();
    data.append("contract_name", values.contract_name);
    data.append("building_id", values.building_id.id);
    data.append("unit_id", values.unit_id.id);
    data.append("start_date", values.start_date);
    data.append("expiry_date", values.expiry_date);
    data.append(
      "tenant_id",
      tenantIDList.tenant_id ? tenantIDList.tenant_id : 0
    );
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type === "application/pdf") {
        data.append("contract_media[]", fileList[i], fileList.name);
      } else {
        if (
          fileList[i].type === "image/png" ||
          fileList[i].type === "image/jpeg" ||
          fileList[i].type === "image/jpg"
        ) {
          const img = await imageCompression(fileList[i], options);
          data.append("contract_media[]", img, img.name);
        }
      }
    }

    let res = await postApi("add_contracts", data);
    if (res.status === 200) {
      setUploadingData(false);
      toast.info(res.message, { theme: "colored" });
      history.push("/home/contracts");
    } else {
      setUploadingData(false);
      toast.error(res, { theme: "colored" });
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
    }else {
      toast.error(res , {theme:"colored"})
    }
  };

  useEffect(() => {
    getBuildingDropdown();
  }, []);

  return (
    <PageWrap>
      <BackdropLoader play={uploadingData} />

      <PageLabel>
        <LabelBox>
          <Label>
            <BackLink Dir={dir} onClick={back}>
              <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="contract.addnewcontract" />
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

          <FileSelect>
            {previewList &&
              previewList.map((i, index) => (
                <SelectedImgWrap Dir={dir}>
                  {i.type === "application/pdf" ? (
                    <PdfBox>
                      <img src={docIcon} alt="" />
                    </PdfBox>
                  ) : (
                    <img src={i} alt="" />
                  )}

                  <CancelImg onClick={() => removeImg(index)} Dir={dir}>
                    <i className="icon-cross"></i>
                  </CancelImg>
                </SelectedImgWrap>
              ))}

            {selectedFile.length < 5 && (
              <ImageInputWrap Dir={dir}>
                <img src={InputBg} alt="" />
                <IntlMassage id="contract.uploadContracthere" />
                <input
                  type="file"
                  accept=".jpg,.png,.pdf"
                  multiple
                  onChange={(e) => chooseFiles(e.target.files)}
                />
              </ImageInputWrap>
            )}
          </FileSelect>
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
              value={
                tenantIDList.tenant_id === null
                  ? "No Tenant Found"
                  : tenantIDList.name
              }
            />
          </AssignToGrid>
          <BtnWrap>
            <button className="cancel-btn " onClick={back}>
              <IntlMassage id="button.cancel" />
            </button>
            <button className="submit-btn" type="submit">
              <IntlMassage id="button.submit" />
            </button>
          </BtnWrap>
        </Form>
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
const PdfBox = styled.div`
  width: 76px;
  height: 76px;
  background: #ffff;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 41px;
    height: 43px;
  }
`;
