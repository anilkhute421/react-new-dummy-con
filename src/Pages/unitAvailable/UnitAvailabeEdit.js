import React, { useEffect, useState, useMemo } from "react";
import {
  PageWrap,
  PageLabel,
  LabelBox,
  Label,
  FieldsBox,
  Input,
  BtnWrap,
  SelectInput,
  BackLink,
  ForMikWrap,
  FileSelect,
  SelectedImgWrap,
  CancelImg,
  ImageInputWrap,
} from "../Styles";
import IntlMassage from "../../utils/IntlMassage";
import { useIntl } from "react-intl";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import CustomInput from "../../validations/InputField";
import { getApi, postApi } from "../../services/ApiMethod";
import Loader from "../../Loader/Loader";
import { Formik, Form, Field } from "formik";
import CustomTextArea from "../../validations/TextArea";
import { DependentInput } from "../../validations/DependentField";
import BackdropLoader from "../../Loader/Backdrop";
import * as Yup from "yup";
import { toast } from "react-toastify";
import DeleteImage from "../../components/DeleteImage";
import imageCompression from "browser-image-compression";
import NotDeleteImage from "../../components/NotDeleteImage";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { InputBg } from "../../utils/images";

export default function UnitAvailabeEdit(props) {
  const intl = useIntl();
  const history = useHistory();
  const [data, setData] = useState({});
  const dir = useSelector((state) => state.Language.dir);
  const pm_id = useSelector((state) => state.Auth.data.id);
  const [loader, setLoader] = useState(true);
  const back = () => {
    history.goBack();
  };
  const [buildingList, setBuildingList] = useState([]);
  const [play, setPlay] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewList, setPreviewList] = useState([]);
  const [fileError, setFileError] = useState("");
  const [listLoading, setListLoading] = useState(true);
  const [currency, setCurrency] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [notDelete, setNotDelete] = useState(false);
  const [imageId, setImageId] = useState("");

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const INITIAL_FORM_STATE = useMemo(() => {
    if (data) {
      return {
        unit_num: data.unit_no,
        building_id: {
          building_name: data.building_name,
          id: data.building_id,
        },
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        area_sqm: data.area_sqm,
        month_rent: data.monthly_rent,
        description: data.building_description,
      };
    }
    return {
      unit_num: "",
      building_id: "",
      rooms: "",
      bathrooms: "",
      area_sqm: "",
      month_rent: "",
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
  const viewUnitDetail = async () => {
    let res = await getApi(`view_available_unit/${props.location.state.id}`);
    if (res.status === 200) {
      setData(res.data[0]);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const buildings = async () => {
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

  const handleSubmit = async (values) => {
    setPlay(true);
    let FD = new FormData();
    FD.append("unit_num", values.unit_num);
    FD.append("building_id", values.building_id.id);
    FD.append("rooms", values.rooms);
    FD.append("bathrooms", values.bathrooms);
    FD.append("area", values.area_sqm);
    FD.append("description", values.description);
    FD.append("monthly_rent", values.month_rent);
    FD.append("unit_id", data.id);
    let res = await postApi("edit_available_units", FD);
    if (res.status === 200) {
      setPlay(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      toast.error(res, { theme: "colored" });
      setPlay(false);
    }
  };

  const getImages = async () => {
    setListLoading(true);
    let d = {
      available_unit_id: data.id,
    };
    let res = await postApi("get_all_images_by_available_unit_id", d);
    if (res.status === 200) {
      setFileList(res.data);
      setListLoading(false);
    } else {
      setListLoading(false);
    }
  };

  const ConfirmDeleteMessge = (image_id) => {
    if (fileList.length > 1) {
      setOpenDelete(true);
      setImageId(image_id);
    } else {
      setNotDelete(true);
    }
  };
  const closeDelModal = () => {
    setOpenDelete(false);
    setNotDelete(false);
  };
  const DeleteConfirm = async () => {
    let d = {
      available_unit_image_id: imageId,
    };
    let res = await postApi(`delete_image_of_available_unit`, d);
    if (res.status === 200) {
      toast.error(res.message, { theme: "colored" });
      getImages();
      closeDelModal();
    } else {
      toast.error(res.message, { theme: "colored" });
      closeDelModal();
    }
  };

  const uploadImage = async (files) => {
    setPlay(true);
    let FD = new FormData();
    FD.append("available_unit_id", data.id);
    for (let i = 0; i < files.length; i++) {
      const img = await imageCompression(files[i], options);
      FD.append("available_unit_image", img, img.name);
    }

    let res = await postApi(`add_new_image_to_available_unit`, FD);
    if (res.status === 200) {
      setPlay(false);
      getImages();
      toast.info(res.message, { theme: "colored" });
    } else {
      toast.error(res, { theme: "colored" });
      setPlay(false);
    }
  };

  useMemo(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (!data) {
      return false;
    } else {
      let d = {
        id: data.building_id,
      };
      getChanges(d);
      getImages();
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
    viewUnitDetail();
    buildings();
  }, []);
  if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <DeleteImage
          show={openDelete}
          onHide={closeDelModal}
          handleConfirm={DeleteConfirm}
        />
        <NotDeleteImage show={notDelete} onHide={closeDelModal} />
        <PageWrap>
          <BackdropLoader play={play} />
          <div>
            <PageLabel>
              <LabelBox>
                <Label>
                  <BackLink Dir={dir} onClick={back}>
                    <i className="icon-down-back" />
                  </BackLink>{" "}
                  <IntlMassage id="unit.edit.Availableunit" />
                </Label>
              </LabelBox>{" "}
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
                    placeholder={intl.formatMessage({
                      id: "placeholder.unitno",
                    })}
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
                  <Input
                    style={{ color: "rgba(0,0,0,0.6" }}
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
                          <SelectedImgWrap Dir={dir}>
                            <img src={image.image_name} alt="" />
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
                          <IntlMassage id="label.uploadImages" />
                          <input
                            type="file"
                            accept=".jpg,.png"
                            onChange={(e) => uploadImage(e.target.files)}
                          />
                        </ImageInputWrap>
                      )}
                    </FileSelect>
                  )}
                  <div className="err-msg">{fileError}</div>
                </ForMikWrap>
                <CustomTextArea
                  name="description"
                  placeholder={intl.formatMessage({
                    id: "placeholder.description",
                  })}
                ></CustomTextArea>
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
          </div>
        </PageWrap>
      </>
    );
  }
}

// {fileList.length < 5 && (
//   <ImageInputWrap Dir={dir}>
//     <img src={InputBg} alt="" />
//     upload images here
//     <input
//       type="file"
//       accept=".jpg,.png"
//       multiple
//       onChange={(e) => chooseFiles(e.target.files)}
//     />
//   </ImageInputWrap>
// )}
