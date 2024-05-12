import styled from "styled-components";

export const PageWrap = styled.div`
  width: 100%;
  padding-top: 35px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  min-height: 540px;
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
  color: rgba(0, 0, 0, 0.6);
  &:placeholder {
    font-size: 14px;
    line-height: 17px;
    color: #000;
    opacity: 0.4;
    height: 42px;
  }
`;

export const TableWrap = styled.div`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  margin-top: 20px;
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

export const AddBuildingBox = styled.div`
  width: 100%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(2, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;
export const AssignToGrid = styled.div`
  width: 100%;
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  @media screen and (max-width: 891px) {
    grid-template-columns: repeat(2, 1fr);
  }
  input {
    margin-top: 0;
  }
  @media screen and (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
  }
  input {
    height: 42px;
    margin-top: 20px;
  }
`;
