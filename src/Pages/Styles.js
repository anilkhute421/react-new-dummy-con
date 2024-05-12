import styled from "styled-components";
import { downarrow } from "../utils/images";

export const PageWrap = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 20px;
  min-height: 540px;
`;
export const ProfilePageWrap = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  height: calc(100vh - 100px);
  justify-content: space-between;
`;

export const PageHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: cenetr;

  justify-content: space-between;
  @media screen and (max-width: 670px) {
    flex-direction: column;
    justify-content: flex-start;

    div {
      // width:100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const RequestHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: cenetr;
  justify-content: space-between;
  .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  @media screen and (min-width: 768px) {
    .comment-btn {
      margin-left: ${({ Dir }) => Dir === "ltr" && "10px"};
      margin-right: ${({ Dir }) => Dir === "rtl" && "10px"};
    }
  }
  @media screen and (min-width: 991px) and (max-width: 1130px) {
    .btns {
      width: 100%;
      justify-content: space-between;
    }
    button {
      margin-top: 10px;
    }
    .comment-btn {
      margin-left: 0px;
      margin-right: 0px;
    }
    flex-direction: column;
    justify-content: flex-start;
  }
  @media screen and (max-width: 881px) {
    flex-direction: column;
    justify-content: flex-start;

    .btns {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const LabelBox = styled.div`
  width: 100%;
`;
export const Label = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  @media screen and (max-width: 400px) {
    font-size: 20px;
  }
`;
export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 20px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    height: 40px;
  }
`;

export const TableWrap = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  word-break: break-word;
  // overflow-x:auto;
`;

export const PageLabel = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
`;
export const PageBackBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const FieldsBox = styled.div`
  width: 100%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(2, 1fr);
  }
  input,
  select {
    margin-top: 0;
    height: 42px;
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const DetailWrap = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;

  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-bottom: 30px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
export const DetailBox = styled.div`
  width: 50%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 25px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .cancel-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    padding: 12px 30px;
    border: none;
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
  }
  .submit-btn {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    background: #145da0;
    box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
    padding: 12px 30px;
    border: none;
    border-radius: 10px;
    color: #fff;
  }
`;
export const Select = styled.select`
  width: 100%;
  border: none;

  outline: none;
  padding: 10px 20px;

  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  color: rgba(0, 0, 0, 0.6);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    position: relative;
  }

  background: url(${downarrow}) #fff no-repeat;
  background-position: ${({ Dir }) => (Dir === "ltr" ? "right" : "left")};
`;

export const SelectInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 10px 20px;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  color: rgba(0, 0, 0, 0.6);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    position: relative;
  }

  background: url(${downarrow}) #fff no-repeat;
  background-position: ${({ Dir }) => (Dir === "ltr" ? "right" : "left")};
`;

export const TextArea = styled.textarea`
width:100%;
resize:none;
width:100%;
height:100px;
border:none;
outline:none;
padding:12px 20px;
background: #FFFFFF;
box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
border-radius: 10px;
margin-top:20px;
color:rgba(0,0,0,0.6);
&:placeholder{
font-size: 14px;
line-height: 17px;
color:rgba(0,0,0,0.4);

`;
export const Icon = styled.i`
  position: absolute;
  left: ${({ Dir }) => Dir === "ltr" && "0"};
  right: ${({ Dir }) => Dir === "rtl" && "0"};
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #145da09a;
`;
export const ModalWrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  position: relative;
  width: calc(100% - 24px);
  padding: 30px;
  .cross-btn {
    position: absolute;
    z-index: 3;
    right: ${({ Dir }) => Dir === "ltr" && "-24px"};
    left: ${({ Dir }) => Dir === "rtl" && "-24px"};
    top: -24px;
    width: 48px;
    height: 48px;
    border-radius: 48px;
    border: none;
    background: #f44336;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 18px;
  }
  @media screen and (max-width: 400px) {
    padding: 30px 10px;
  }
`;
export const ModalLabel = styled.h2`
  width: 100%;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
`;

export const BackLink = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 16px;
  margin-right: ${({ Dir }) => Dir === "ltr" && "8px"};
  margin-left: ${({ Dir }) => Dir === "rtl" && "8px"};
  transform: ${({ Dir }) => (Dir === "rtl" ? "rotate(180deg)" : "")};
  @media screen and (max-width: 400px) {
    margin-right: ${({ Dir }) => Dir === "ltr" && "10px"};
    margin-left: ${({ Dir }) => Dir === "rtl" && "10px"};
  }
`;
// unit page
export const CardBackground = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 30px;
`;

// tenant / unit detail box

export const DetailDivider = styled.div`
  width: calc(100% - 40px);
  height: 2px;
  background: rgba(00, 0, 0, 0.1);
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: calc(100% - 20px);
  }
`;

export const TenantDetailbox = styled.div`
  padding: 20px 20px 30px;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 991px) {
    flex-direction: ${({ modal }) => modal && "column"};
  }

  @media screen and (max-width: 767px) {
    padding: 20px 10px 30px;
    flex-direction: column;
  }
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media screen and (min-width: 768px) {
    &:first-child {
      border-right: ${({ Dir }) =>
        Dir === "ltr" && "2px solid rgba(0,0,0,0.1)"};
      border-left: ${({ Dir }) => Dir === "rtl" && "2px solid rgba(0,0,0,0.1)"};
    }
    padding-left: 20px;
    padding-right: 20px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
export const DetailLabel = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  @media screen and (max-width: 767px) {
    padding-top: ${({ pt }) => pt && "20px"};
  }
`;
export const InfoLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-top: 10px;
  padding-bottom: 10px;
  label {
    margin-right: 20px;
  }
`;
export const InfoLabel = styled.label`
  min-width: 110px;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
`;
export const InfoValue = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
`;
export const LabelMedium = styled.h5`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  padding-top: 30px;
`;

export const FileSelect = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: evenly;
`;

export const SelectedImgWrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
  transition: all ease-in-out 0.5s;
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: none;
    outline: none;
  }
`;

export const CancelImg = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: ${({ Dir }) => Dir === "rtl" && "0"};
  right: ${({ Dir }) => Dir === "ltr" && "0"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;

export const ImageInputWrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  cursor: pointer;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #00a3ff;
  img {
    height: 30px;
    margin-bottom: 10px;
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
  }
`;

export const EditBtn = styled.button`
  height: 42px;
  background: #2e8bc0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 12px 30px;
  cursor: pointer;
  min-width: max-content;
`;
export const AddExpenseBtn = styled.span`
  height: 42px;
  background: #2e8bc0;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 12px 30px;
  cursor: pointer;
  text-align: center;
  min-width: max-content;
`;

export const ContractLeased = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: "20px"
  padding-top: 30px;
  padding-bottom: 30px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const ContractLabelBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0px 20px;
`;
export const ContractDetail = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 20px;

  .cell {
    display: flex;
    flex-direction: row;
    padding-right: ${({ Dir }) => Dir === "ltr" && "50px"};
    padding-left: ${({ Dir }) => Dir === "rtl" && "50px"};
    padding-top: 13px;
    label {
      font-size: 14px;
      line-height: 17px;
      color: #000000;

      min-width: 80px;
    }
    span {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }
`;
export const ContractDocBox = styled.div`
  width: 76px;
  height: 76px;
  margin: 20px 20px 5px;
  background: #ffff;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 41px;
    height: 43px;
  }
`;
export const ContractPreviewBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  i {
    cursor: pointer;
  }
`;

export const ForMikWrap = styled.div`
  .err-msg {
    margin: 0;
    color: #f44336;
    font-size: 10px;
    font-weight: 500;

    // transform:translateY(-10px);
  }
  .myinput {
    width: 100%;
    border: none;
    outline: none;
    padding: 10px 20px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
    border-radius: 10px;
    // margin-top: 20px;
    font-size: 14px;
    color: rgba(0, 0, 0, 1);
    &:placeholder {
      font-size: 14px;
      line-height: 17px;
      color: #000;
      opacity: 0.4;
      height: 40px;
    }
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  textarea {
    color: #000;
  }
`;

// active deactive btn

export const StatusWrap = styled.div`
  display: flex;
  justify-content: end;
  align-items: start;
  width: 100%;
  .status-label {
    padding: 0 5px;
  }
  transform: translateY(-10px);
`;
export const TableLoaderWrap = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const NoData = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
`;
export const ExpenseListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  @media screen and (max-width: 991px) {
    grid-template-columns: repeat(4, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(3, 1fr);
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


export const InfoLabelHeader = styled.label`
  fonytsize: 22px;
  font-weight: 400;
  padding: 5px 10px;
`;

export const InfoValueHeader = styled.span`
  fontsize: 22px;
  font-weight: 700;
  padding: 5px 10px;
`;

export const InnnerInfo = styled.div`
  display: flex;
  padding: 0px 14px;

  @media screen and (max-width: 1082px) {
    padding: 0 10px;
  }
  @media screen and (max-width: 792px) {
    display: flex;
    flex-direction: column;
  }
`;

export const PdfWrap = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  cursor: pointer;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #00a3ff;
  overflow: hidden;
  div {
    img {
      height: 40px;
      width: 40px;
    }
    p {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  .cross {
    position: absolute;
    left: ${({ Dir }) => Dir === "rtl" && "0px"};
    right: ${({ Dir }) => Dir === "ltr" && "0px"};
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 20px;
  }
`;


export const InputCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;

export const InputCheckboxHeader = styled.span`
  padding: 10px;
  font-size: 14px;
`;