import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import IntlMassage from "../../utils/IntlMassage";
import Toggle from "react-toggle";
import { useIntl } from "react-intl";
import {
  Label,
  PageHeader,
  LabelBox,
  BackLink,
  CardBackground,
  PageWrap,
  NoData,
  StatusWrap,
} from "../Styles";
import {
  Avialable,
  DetailColumn,
  ImageSlideBox,
  ImgBox,
  BuildingInfo,
  FlexBox,
  UnitNo,
  InfoRow,
  DescriptionLabel,
  DescriptionText,
} from "./Style";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useHistory } from "react-router";
import { getApi } from "../../services/ApiMethod";
import Loader from "../../Loader/Loader";
import { postApi } from "../../services/ApiMethod";
import LocationLink from "../../components/LocationLink";
import Alert from "../../alert/Alert";
import { toast } from "react-toastify";

export default function ViewUnitAvailable(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [msg, setMsg] = useState("");
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  const intl = useIntl();
  const dir = useSelector((state) => state.Language.dir);
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const viewUnitDetail = async () => {
    setLoader(true);
    let res = await getApi(`view_available_unit/${props.location.state.id}`);

    if (res.status === 200) {
      setLoader(false);
      setData(res.data[0]);
    } else {
      setLoader(false);
    }
  };
  useEffect(() => {
    viewUnitDetail();
  }, []);

  if (loader) {
    return <Loader />;
  }
  if (!loader && !data) {
    return <NoData>No Data Found</NoData>;
  }

  const handleConfirm = async () => {
    setOpen(false);
    let res = await postApi("activate_deactivate_units", {
      unit_id: props.location.state.id,
    });
    if (res.status === 200) {
      toast.info(res, { theme: "colored" });
      viewUnitDetail();
    } else {
      toast.error(res, { theme: "colored" });
    }
  };
  const ActivateBuilding = () => {
    setMsg(
      intl.formatMessage({
        id: "msg.activate.unit",
      })
    );
    setOpen(true);
  };
  const DeactivateBuilding = () => {
    setMsg(
      intl.formatMessage({
        id: "msg.deactivate.unit",
      })
    );
    setOpen(true);
  };

  const handleToggle = (state) => {
    if (state.target.checked === true) {
      ActivateBuilding();
    } else {
      DeactivateBuilding();
    }
  };

  return (
    <PageWrap>
      <PageHeader>
        <LabelBox>
          <Label>
            <BackLink Dir={dir} onClick={back}>
              <i className="icon-down-back" />
            </BackLink>
            <IntlMassage id="unit.management" />
          </Label>
        </LabelBox>
      </PageHeader>
      <UnitDetailBox>
        <ImageSlideBox dir={"ltr"}>
          <Carousel autoPlay emulateTouch={true} infiniteLoop={true}>
            {data && data.file_images ? (
              data.file_images.map((item, idx) => (
                <ImgBox key={idx}>
                  <img src={item.image_name} alt="" />
                </ImgBox>
              ))
            ) : (
              <ImgBox>
                <img src={"Oops.!"} alt="no image" />
              </ImgBox>
            )}
          </Carousel>
        </ImageSlideBox>

        <Alert
          MsgText={msg}
          open={open}
          handleConfirm={handleConfirm}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />

        <DetailColumn Dir={dir}>
          <CardBackground>
            {Roles.avail_unit_edit === 1 ? (
              <StatusWrap>
                <div className="d-flex align-items-start ">
                  <p className="px-1">
                    <IntlMassage id="label.status" />
                  </p>
                  <label className="switch-toggle">
                    <Toggle
                      checked={data.status === 0 ? false : true}
                      value={data.status === 0 ? false : true}
                      icons={false}
                      onChange={handleToggle}
                    />
                  </label>
                </div>
              </StatusWrap>
            ) : (
              <StatusWrap>
                <div className="d-flex align-items-start ">
                  <p className="px-1">
                    <IntlMassage id="label.status" />
                  </p>
                  <label className="switch-toggle">
                    <Toggle
                      checked={data.status === 0 ? false : true}
                      value={data.status === 0 ? false : true}
                      icons={false}
                    />
                  </label>
                </div>
              </StatusWrap>
            )}

            <UnitNo>
              <span className="unitno">
                <IntlMassage id="unit.info.unitno" />
              </span>
              <span className="number">{data.unit_no}</span>
              <span className="id d-flex flex-row">
                <IntlMassage id="unit.info.id" /> - {`${data.unit_code}`}
              </span>
            </UnitNo>
            <Avialable className="my-2">
              {data.status === 0 ? (
                <IntlMassage id="table.deactive" />
              ) : (
                <IntlMassage id="unit.info.active" />
              )}
            </Avialable>
            <FlexBox>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center single-value-row">
                  <label>
                    <IntlMassage id="unit.info.rooms" />
                  </label>
                  <h6>{data.rooms}</h6>
                </div>
                <div className="d-flex flex-row align-items-center  single-value-row">
                  <label>
                    <IntlMassage id="unit.info.bathroom" />
                  </label>
                  <h6>{data.bathrooms}</h6>
                </div>
                <div className="d-flex flex-row align-items-center  single-value-row">
                  <label>
                    <IntlMassage id="unit.info.area" />
                  </label>
                  <h6>
                    {`${data.area_sqm}`} <IntlMassage id="unit.info.sqm" />
                  </h6>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex flex-row align-items-center  single-value-row">
                  <label>
                    <IntlMassage id="unit.info.rent" />
                  </label>
                  <h6>
                    {data.currency_symbol}
                    {data.monthly_rent} <IntlMassage id="unit.info.monthly" />
                  </h6>
                </div>
              </div>
            </FlexBox>
          </CardBackground>
          <CardBackground>
            <BuildingInfo>
              <IntlMassage id="building.info" />
            </BuildingInfo>
            <InfoRow>
              <label>
                <IntlMassage id="unit.info.name" />
              </label>
              <span>{data.building_name}</span>
            </InfoRow>

            <InfoRow>
              <label>
                <IntlMassage id="unit.info.address" />
              </label>
              <span>{data.building_address}</span>
            </InfoRow>
            <InfoRow>
              <label>
                <IntlMassage id="unit.info.location" />
              </label>
              <span>
                <LocationLink link={data.building_location_link} />
              </span>
            </InfoRow>
            <DescriptionLabel>
              <IntlMassage id="unit.info.description" />
            </DescriptionLabel>
            <DescriptionText>{data.building_description}</DescriptionText>
          </CardBackground>
        </DetailColumn>
      </UnitDetailBox>
    </PageWrap>
  );
}
export const UnitDetailBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding-bottom: 30px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;
