import React, { useMemo, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { InputBg } from "../../utils/images";
import IntlMassage from "../../utils/IntlMassage";

import {
  Input,
  BackLink,
  BtnWrap,
  FieldsBox,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  SelectInput,
  ForMikWrap,
} from "../Styles";
import {
  FileSelect,
  SelectedImgWrap,
  CancelImg,
  ImageInputWrap,
} from "./Style";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import CustomInput from "../../validations/InputField";
import { getApi, postApi } from "../../services/ApiMethod";
import * as Yup from "yup";
import CustomTextArea from "../../validations/TextArea";
import imageCompression from "browser-image-compression";
import BackdropLoader from "../../Loader/Backdrop";
import { toast } from "react-toastify";
import { DependentInput } from "../../validations/DependentField";
const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: ".png",
};
export default function AddUnit() {
  const history = useHistory();
  const intl = useIntl();
  const back = () => {
    history.goBack();
  };
  const dir = useSelector((state) => state.Language.dir);
  const [fileList, setFileList] = useState([]);
  const [previewList, setPreviewList] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [fileError, setFileError] = useState("");
  const [touched, setTouched] = useState(false);
  const [uploadingData, setUploadingData] = useState(false);
  const pm_id = useSelector((state) => state.Auth.data.id);
  const INITIAL_FORM_STATE = {
    unit_num: "",
    building_id: "",
    rooms: "",
    bathrooms: "",
    area_sqm: "",
    month_rent: "",
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
      .required(intl.formatMessage({ id: "error.required" })),
    rooms: Yup.number()
      .typeError(intl.formatMessage({ id: "error.number" }))
      .max(1000, intl.formatMessage({ id: "error.max1000" }))
      .required(intl.formatMessage({ id: "error.required" })),
    building_id: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    bathrooms: Yup.number()
      .typeError(intl.formatMessage({ id: "error.number" }))
      .max(1000, intl.formatMessage({ id: "error.max1000" }))
      .required(intl.formatMessage({ id: "error.required" })),
    month_rent: Yup.string()
      .matches(/^[0-9]\d*$/, intl.formatMessage({ id: "error.number" }))
      .required(intl.formatMessage({ id: "error.required" })),
    area_sqm: Yup.string()
      .matches(/^[0-9]\d*$/, intl.formatMessage({ id: "error.number" }))
      .required(intl.formatMessage({ id: "error.required" })),
    description: Yup.string()
      .required(intl.formatMessage({ id: "error.required" }))
      .min(4, intl.formatMessage({ id: "error.description.short" }))
      .max(500, intl.formatMessage({ id: "error.description.large" })),
  });

  const chooseFiles = (files) => {
    setTouched(true);
    if (fileList.length > 0) {
      let requiredLength = 5 - fileList.length;
      for (let i = 0; i < files.length; i++) {
        if (i < requiredLength) {
          setPreviewList((prev) => [...prev, URL.createObjectURL(files[i])]);
          setFileList((prev) => [...prev, files[i]]);
        }
      }
    } else {
      if (files.length > 0 && files.length < 5) {
        setFileList(files);
        for (let i = 0; i < files.length; i++) {
          setPreviewList((prev) => [...prev, URL.createObjectURL(files[i])]);
        }
      }
      if (files.length === 5) {
        setFileList(files);
        for (let i = 0; i < files.length; i++) {
          setPreviewList((prev) => [...prev, URL.createObjectURL(files[i])]);
        }
      } else if (files.length > 5) {
        let arr = [];
        for (let i = 0; i < 5; i++) {
          arr.push(files[i]);
        }
        for (let i = 0; i < 5; i++) {
          setPreviewList((prev) => [...prev, URL.createObjectURL(files[i])]);
        }

        setFileList(arr);
      }
    }
  };

  const removeImg = (index) => {
    let current = [];
    let viewList = [];
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i] !== fileList[index]) {
        current.push(fileList[i]);
        viewList.push(URL.createObjectURL(fileList[i]));
      }
    }
    setFileList(current);
    setPreviewList(viewList);
  };
  useMemo(() => {
    if (!fileList && touched) {
      setFileError("Required");
    } else {
      setFileError("");
    }
  }, [fileList]);

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      setFileError("Required");
      return false;
    } else {
      setUploadingData(true);
      let data = new FormData();
      data.append("unit_num", values.unit_num);
      data.append("building_id", values.building_id.id);
      data.append("rooms", values.rooms);
      data.append("bathrooms", values.bathrooms);
      data.append("area_sqm", values.area_sqm);
      data.append("description", values.description);
      data.append("monthly_rent", values.month_rent);
      for (let i = 0; i < fileList.length; i++) {
        const img = await imageCompression(fileList[i], options);
        data.append("units_file[]", img, img.name);
      }
      let res = await postApi("add_units", data);
      if (res.status === 200) {
        setUploadingData(false);
        toast.info(res.message, { theme: "colored" });
        history.push("/home/unit-available");
      } else {
        setUploadingData(false);
        toast.error(res, { theme: "colored" });
      }
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
  useEffect(() => {
    getBuildingList();
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
            <IntlMassage id="unit.add.unit" />
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
          <FieldsBox>
            <CustomInput
              name="unit_num"
              placeholder={intl.formatMessage({ id: "placeholder.unitno" })}
            />
            <Field
              name="building_id"
              component={DependentInput}
              options={buildingList}
              getChanges={getChanges}
              getOptionLabel={(option) => (option ? option.building_name : "")}
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

            <CustomInput
              name="rooms"
              placeholder={intl.formatMessage({ id: "placeholder.rooms" })}
            />
            <CustomInput
              name="bathrooms"
              placeholder={intl.formatMessage({ id: "placeholder.bathrooms" })}
            />
            <CustomInput
              name="area_sqm"
              placeholder={intl.formatMessage({
                id: "placeholder.area.square",
              })}
            />
          </FieldsBox>
          <FieldsBox>
            <Input
              style={{ color: "rgba(0,0,0,0.6)" }}
              value={currency}
              readOnly
              placeholder={intl.formatMessage({
                id: "placeholder.currency",
              })}
            />

            <CustomInput
              name="month_rent"
              placeholder={intl.formatMessage({
                id: "placeholder.monthlyrent",
              })}
            />
          </FieldsBox>
          <ForMikWrap>
            <FileSelect>
              {previewList &&
                previewList.map((i, index) => (
                  <SelectedImgWrap Dir={dir}>
                    <img src={i} alt="" />
                    <CancelImg onClick={() => removeImg(index)} Dir={dir}>
                      <i className="icon-cross"></i>
                    </CancelImg>
                  </SelectedImgWrap>
                ))}

              {fileList.length < 5 && (
                <ImageInputWrap Dir={dir}>
                  <img src={InputBg} alt="" />
                  <IntlMassage id="label.uploadImages" />
                  <input
                    type="file"
                    accept=".jpg,.png"
                    multiple
                    onChange={(e) => chooseFiles(e.target.files)}
                  />
                </ImageInputWrap>
              )}
            </FileSelect>
            <div className="err-msg">{fileError}</div>
          </ForMikWrap>
          <CustomTextArea
            name="description"
            type="text"
            placeholder={intl.formatMessage({ id: "placeholder.description" })}
          />
          <BtnWrap>
            <Button
              className="cancel-btn"
              onClick={back}
              sx={{ textTransform: "none" }}
            >
              <IntlMassage id="button.cancel" />
            </Button>
            <Button variant="contained" color="primary" type="submit">
              <IntlMassage id="button.submit" />
            </Button>
          </BtnWrap>
        </Form>
      </Formik>
    </PageWrap>
  );
}
