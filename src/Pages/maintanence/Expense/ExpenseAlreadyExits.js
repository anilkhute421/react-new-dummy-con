import React, { useLayoutEffect, useState } from "react";
import {
  Input,
  ExpenseListWrap,

} from "../../Styles";
import { InvoiceWrap } from "../Style";
import IntlMassage from "../../../utils/IntlMassage";
import { invoice } from "../../../utils/images";
import { useSelector } from "react-redux";
import styled from "styled-components";

export default function ExpenseAlreadyExits({ data, Del, load }) {
  const { request_for, currency_name, date, files, cost } = data;
  const dir = useSelector((state) => state.Language.dir);
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const removeItem = () => {
    Del(data.id);
  };

 



  return (
    <div>
      <ExpenseListWrap>
        <Input readOnly value={request_for} placeholder="Expense Item" />
        <Input readOnly value={currency_name} placeholder="Currency" />
        <Input readOnly value={cost} placeholder="Expense Amount" />
        <Input readOnly value={date} placeholder="Date" />

        {size > 991 && (
          <SecondaryBtn onClick={removeItem} style={{ marginTop: "20px" }}>
            <IntlMassage id="button.delete" />
          </SecondaryBtn>
        )}
      </ExpenseListWrap>

      <div className="d-flex">
        {files.map((ele, index) => (
          <>
            {ele.file_name.toString().includes(".pdf") ? (
              <PdfWrap Dir={dir}>
                {/* <span className="cross icon-cross"></span> */}
                <div className="m-auto">
                  <img src={invoice} alt="" />
                  <p>Pdf</p>
                </div>
              </PdfWrap>
            ) : (
              <InvoiceWrap key={index} Dir={dir}>
                {/* <span className="cross icon-cross"></span> */}
                <img src={ele.file_name} alt="" />
              </InvoiceWrap>
            )}
          </>
        ))}
      </div>
    

      <ExpenseListWrap>
        {size < 992 && (
          <SecondaryBtn onClick={removeItem} style={{ marginTop: "20px" }}>
            <IntlMassage id="button.delete" />
          </SecondaryBtn>
        )}
      </ExpenseListWrap>
    </div>
  );
}
const SecondaryBtn = styled.span`
  color: #ffffff;
  background: #f44336;
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  padding: 13px 25px;
  height: 42px;
  cursor: pointer;

`;



const PdfWrap = styled.div`
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
