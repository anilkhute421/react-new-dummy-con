import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import {
  BackLink,
  BtnWrap,
  CancelImg,
  FileSelect,
  ForMikWrap,
  ImageInputWrap,
  Input,
  Label,
  LabelBox,
  LabelMedium,
  PageLabel,
  PageWrap,
  PdfWrap,
  SelectedImgWrap,
  SelectInput,

} from "../../Styles";
import { AddBuildingBox, AddBuildingBox as MaintanenceBox } from "../../buildings/Styles";
import IntlMassage from "../../../utils/IntlMassage";

import { useIntl } from "react-intl";
import { postApi } from "../../../services/ApiMethod";
import Loader from "../../../Loader/Loader";
import { toast } from "react-toastify";
import { getApi } from "../../../services/ApiMethod";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { AutoSelect } from "../../../validations/FormAutocomplete";
import CustomInput from "../../../validations/InputField";
import { DateSelect } from "../../../validations/DateSelect";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { InputBg, invoice } from "../../../utils/images";
import BackdropLoader from "../../../Loader/Backdrop";
import DeleteImage from "../../../components/DeleteImage";
import CustomTextArea from "../../../validations/TextArea";

export default function EditExpenses(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => history.goBack();
  const intl = useIntl();
  const [listLoading, setListLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpeneseData] = useState([]);
  const [play, setPlay] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [notDelete, setNotDelete] = useState(false);

  const [expenseItemList, setExpenseItemList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [imageId, setImageId] = useState("");
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const getDataExpenses = async (id) => {
    setLoading(true);
    let req = {
      expense_item_id: id,
    };
    let res = await postApi("view_expenses_by_id", req);
    if (res.status === 200) {
      setData(res.data);
      setExpeneseData(res.expense_items);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const INITIAL_FORM_STATE = useMemo(() => {
    if (expenseData.length > 0) {
      return {
        expenseItemList: {
          expenseslines_name: expenseData[0].request_for,
          id: expenseData[0].expenses_lines_id,
        },
        currencyList: {
          currency: expenseData[0].currency_name,
          id: expenseData[0].currency_id,
        },
        amount: expenseData[0].cost,
        date: expenseData[0].date_for_edit,
        description: expenseData[0].description
      };
    }
    return {
      expenseItemList: "",
      currencyList: "",
      amount: "",
      date: "",
      description:""
    };
  }, [expenseData]);

  console.log(expenseData , "expenseData-------")

  const FORM_VALIDATION = Yup.object().shape({
    expenseItemList: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    currencyList: Yup.object()
      .nullable()
      .required(intl.formatMessage({ id: "error.required" })),
    amount: Yup.number().required(intl.formatMessage({ id: "error.required" })),
    date: Yup.date()
      .typeError(intl.formatMessage({ id: "error.date" }))
      .required(intl.formatMessage({ id: "error.required" })),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    let req = {
      expense_id: data.id,
      expense_item_id: Number(props.location.state.id),
      expenses_lines_id: values.expenseItemList.id,
      currency_id: values.currencyList.id,
      expenses_amount: values.amount,
      date: values.date,
      description: values.description
    };

    let res = await postApi("update_expenses", req);
    if (res.status === 200) {
      setLoading(false);
      toast.info(res.message, { theme: "colored" });
      back();
    } else {
      setLoading(false);
      toast.info(res.message, { theme: "colored" });
    }
  };

  const getExpenseList = async () => {
    let res = await getApi("expenes_dropdown");
    if (res.status === 200) {
      setExpenseItemList(res.data);
    }
  };
  const getCurrencyList = async () => {
    let res = await getApi("get_all_currency");
    if (res.status === 200) {
      setCurrencyList(res.data);
    }
  };

  const uploadImage = async (files) => {
    if (
      files[0].name.includes(".png") ||
      files[0].name.includes(".jpg") ||
      files[0].name.includes(".jpeg") ||
      files[0].name.includes(".heic") ||
      files[0].name.includes(".pdf")

    ) {
      setPlay(true);

      let FD = new FormData();
      FD.append("item_id", props.location.state.id);
      if(files[0].includes !== ".pdf"){
      FD.append("item_single_file", files[0], files[0].name);
      }else {
        const img = await imageCompression(files[0], options);
        FD.append("item_single_file", img, img.name);
      }

      let res = await postApi(`add_image_to_old_item`, FD);
      if (res.status === 200) {
        setPlay(false);
        getImages();
        toast.info(res.message, { theme: "colored" });
      } else {
        toast.error(res.message, { theme: "colored" });
        setPlay(false);
      }
    } else {
      toast.error("Invalid file type.", { theme: "colored" });
    }
  };

  const getImages = async () => {
    setListLoading(true);

    let req = {
      expense_item_id: props.location.state.id,
    };
    let res = await postApi("view_expenses_by_id", req);
    console.log(res , "res-----------")
    if (res.status === 200) {
      setFileList(res.expense_items[0].files);
      setListLoading(false);
    } else {
      setListLoading(false);
    }
  };

  const closeDelModal = () => {
    setOpenDelete(false);
    // setNotDelete(false);
  };

  const DeleteConfirm = async () => {
    let d = {
      image_id: imageId,
      item_id: props.location.state.id,
    };
    let res = await postApi(`delete_expense_item_image`, d);
    if (res.status === 200) {
      toast.error(res.message, { theme: "colored" });
      closeDelModal();
      getImages();
    } else {
      toast.error(res.message, { theme: "colored" });
      closeDelModal();
    }
  };

  const ConfirmDeleteMessge = (image_id) => {
    // if (fileList.length > 1) {
      setOpenDelete(true);
      setImageId(image_id);
    // } else {
    //   setNotDelete(true);
    // }
  };

  useEffect(() => {
    getImages(props.location.state.id);
  }, []);

  useEffect(() => {
    getExpenseList();
    getCurrencyList();
    getDataExpenses(props.location.state.id);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageWrap>
        <BackdropLoader play={play} />

        <DeleteImage
          show={openDelete}
          onHide={closeDelModal}
          handleConfirm={DeleteConfirm}
        />
        {/* <NotDeleteImage show={notDelete} onHide={closeDelModal} /> */}

        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="Maintenance.editExpense" />
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
              <Input
                readOnly
                value={data.building_name}
                placeholder={intl.formatMessage({
                  id: "placeholder.buildingname",
                })}
              />
              <Input
                readOnly
                value={data.unit_no}
                placeholder={intl.formatMessage({
                  id: "table.unitID",
                })}
              />
              <Input
                readOnly
                value={data.request_code}
                placeholder={intl.formatMessage({
                  id: "table.reqid",
                })}
              />
              <Input
                readOnly
                value={data.tenant}
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
            <ExpenseListWrapEdit>
              <Field
                name="expenseItemList"
                component={AutoSelect}
                options={expenseItemList}
                getOptionLabel={(option) =>
                  option ? option.expenseslines_name : ""
                }
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder={intl.formatMessage({
                        id: "placeholder.expenseitem",
                      })}
                      Dir={dir}
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
              <Field
                name="currencyList"
                component={AutoSelect}
                options={currencyList}
                getOptionLabel={(option) => (option ? option.currency : "")}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <SelectInput
                      placeholder={intl.formatMessage({
                        id: "placeholder.currency",
                      })}
                      Dir={dir}
                      type="text"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />

              <CustomInput
                type="text"
                name="amount"
                placeholder={intl.formatMessage({ id: "error.amount" })}
              />

              <Field
                name="date"
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
                      placeholder={intl.formatMessage({
                        id: "table.date",
                      })}
                    />
                    <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                  </Box>
                )}
              />
            </ExpenseListWrapEdit>

            <AddBuildingBox>

          
            <CustomTextArea
        name="description"
        // value={inputValues.remarks}
        // onChange={(e) => handleOnChange("remarks", e.target.value)}
        placeholder={intl.formatMessage({
          id: "placeholder.description",
        })}
      />
         
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
                  {fileList &&
                    fileList.map((image, index) => (
                      <SelectedImgWrap Dir={dir}>
                        {image.file_name.includes(".pdf") ? (
                          <PdfWrap Dir={dir}>
                            <div className="m-auto">
                              <img src={invoice} alt="" />
                              <p>Pdf</p>
                            </div>
                          </PdfWrap>
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
                  {fileList.length < 3 && (
                    <ImageInputWrap Dir={dir}>
                      <img src={InputBg} alt="" />
                      <IntlMassage id="label.uploadImages" />
                      <input
                        type="file"
                        accept=".jpg,.png,.pdf"
                        onChange={(e) => uploadImage(e.target.files)}
                      />
                    </ImageInputWrap>
                  )}
                </FileSelect>
              )}
            </ForMikWrap>

            </AddBuildingBox>

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

const DateIcon = styled.div`
  position: absolute;
  top: 67%;
  left: ${({ Dir }) => Dir === "rtl" && "10px"};
  right: ${({ Dir }) => Dir === "ltr" && "10px"};
`;

const ExpenseListWrapEdit = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(2, 1fr);
    input {
      height: 42px;
      margin-top: 20px;
    }
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
    input {
      height: 42px;
      margin-top: 20px;
    }
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;
