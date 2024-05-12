import React from "react";
import { useSelector } from "react-redux";
import {
  UnitListWrap,
  ListImgWrap,
  DetailWrap,
  UnitDetailBox,
  UnitBtnBox,
  Row,
  ValueLabel,
  UnitActionBtn,
  UnitLabel,
  UnitValue,
  Active,
  UnitListRight,
} from "./Style";
import { useHistory } from "react-router";
import IntlMassage from "../../utils/IntlMassage";

export default function UTable({ data }) {
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const history = useHistory();
  const dir = useSelector((state) => state.Language.dir);
  const view = (id) => {
    history.push(`/home/unit-available/view`, (id = { id }));
  };
  const edit = (id) => {
    history.push(`/home/unit-available/edit`, (id = { id }));
  };
  return (
    <UnitListWrap>
      <ListImgWrap Dir={dir}>
        <img src={data.file_image} alt="" />
      </ListImgWrap>
      <UnitListRight>
        <DetailWrap>
          <UnitDetailBox>
            <Row Dir={dir}>
              <div className="d-flex flex-row">
                <UnitLabel color={"#000"} transform={"capitalize"}>
                  <IntlMassage id="label.unit" />
                </UnitLabel>
                <UnitLabel color={"#000"} transform={"capitalize"}>
                  {data.unit_no}
                </UnitLabel>
                <UnitLabel color={"#145DA0"} transform={"uppercase"}>
                  <IntlMassage id="unit.info.id" />
                  {`- ${data.unit_code}`}
                </UnitLabel>
              </div>
              <div className="d-flex flex-row">
                <Active>
                  {data.status === 0 ? (
                    <IntlMassage id="label.deactive" />
                  ) : (
                    <IntlMassage id="unit.info.active" />
                  )}
                </Active>
              </div>
            </Row>
          </UnitDetailBox>
          <UnitDetailBox>
            <Row Dir={dir}>
              <div className="d-flex flex-row">
                <ValueLabel>
                  <IntlMassage id="label.rooms" />
                </ValueLabel>
                <UnitValue>{data.rooms}</UnitValue>
              </div>
              <div className="d-flex flex-row">
                <ValueLabel>
                  <IntlMassage id="unit.info.area" />
                </ValueLabel>
                <UnitValue>
                  {data.area_sqm} <IntlMassage id="unit.info.sqm" />
                </UnitValue>
              </div>
              <div className="d-flex flex-row">
                <ValueLabel>
                  <IntlMassage id="placeholder.bathrooms" />
                </ValueLabel>
                <UnitValue style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  {data.bathrooms}
                </UnitValue>
              </div>
            </Row>
          </UnitDetailBox>
          <UnitDetailBox>
            <Row Dir={dir}>
              <div className="d-flex flex-row">
                <ValueLabel>
                  <IntlMassage id="unit.info.rent" />
                </ValueLabel>
                <UnitValue>
                  {data.currency_symbol}
                  {`${data.monthly_rent} `}
                  <IntlMassage id="unit.info.monthly" />
                </UnitValue>
              </div>
              <div className="d-flex flex-row">
                <ValueLabel>
                  <IntlMassage id="table.building" />
                </ValueLabel>
                <UnitValue>{data.building_name}</UnitValue>
              </div>
            </Row>
          </UnitDetailBox>
        </DetailWrap>
        <UnitBtnBox>
          <Row Dir={dir} className="btns flex-nowrap">
            {Roles.avail_unit_edit === 1 && (
              <UnitActionBtn Dir={dir} onClick={() => edit(data.id)}>
                <IntlMassage id="button.edit" />
              </UnitActionBtn>
            )}
            {Roles.avail_unit_view === 1 && (
              <UnitActionBtn Dir={dir} onClick={() => view(data.id)}>
                <IntlMassage id="button.viewdetail" />
              </UnitActionBtn>
            )}
          </Row>
        </UnitBtnBox>
      </UnitListRight>
    </UnitListWrap>
  );
}
