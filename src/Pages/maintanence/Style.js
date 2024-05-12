import styled from "styled-components";
import { downarrowwhite } from "../../utils/images";

export const FilterStatusText = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  margin: 0px 5px;
`;

export const FilterStatusSelect = styled.select`
  width: 100%;
  border: none;
  outline: none;
  padding: 5px 20px;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  color: #fff;
  background: url(${downarrowwhite}) #1873b7 no-repeat;
  background-position: ${({ Dir }) => (Dir === "ltr" ? "right" : "left")};
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
`;

export const UnReadFilter = styled.select`
  width: 150px;
  border: none;
  outline: none;
  padding: 5px 20px;
  margin: 0 5px;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  color: #fff;
  background: url(${downarrowwhite}) #1873b7 no-repeat;
  background-position: ${({ Dir }) => (Dir === "ltr" ? "right" : "left")};
  white-space: nowrap;
  text-overflow: ellipsis;
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

export const InvoiceWrap = styled.div`
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
  img {
    height: 100%;
    width: 100%;
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
export const MaintanenceBox = styled.div`
  width: 100%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(3, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;
