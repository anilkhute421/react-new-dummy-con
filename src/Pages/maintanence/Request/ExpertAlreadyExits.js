import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import IntlMassage from "../../../utils/IntlMassage";
import { AddBuildingBox, Input } from "../../buildings/Styles";

export default function ExpertAlreadyExits({ data, index, Del }) {
  const intl = useIntl();

  console.log(data , "data-----------")

  const removeItem = async () => {
    Del(data);
  };

  return (
    <AddBuildingBox>
      <>
        <Input
          placeholder={intl.formatMessage({
            id: "table.assignExperts",
          })}
          value={data.name}
          readOnly
        />
        <Input
          placeholder={intl.formatMessage({
            id: "Maintenance.request.expert.phone",
          })}
          value={data.phone}
          readOnly
        />
         <Input
          placeholder={intl.formatMessage({
            id: "Maintenance.request.expert.phone",
          })}
          value={data.request_date}
          readOnly
        />
      </>

      <SecondaryBtn onClick={removeItem} style={{ marginTop: "20px" }}>
        <IntlMassage id="button.delete" />
      </SecondaryBtn>
    </AddBuildingBox>
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
  display: flex;
  justify-content: center;
`;
