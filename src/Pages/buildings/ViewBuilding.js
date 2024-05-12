import React, { useLayoutEffect, useState } from "react";
import {
  BackLink,
  DetailBox,
  DetailWrap,
  PageLabel,
  PageWrap,
  StatusWrap,
} from "../Styles";
import { LabelBox, Label } from "../Styles";
import styled from "styled-components";
import { useHistory } from "react-router";
import IntlMassage from "../../utils/IntlMassage";
import { getApi, postApi } from "../../services/ApiMethod";
import { useEffect } from "react";
import Loader from "../../Loader/Loader";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Alert from "../../alert/Alert";
import { toast } from "react-toastify";
import LocationLink from "../../components/LocationLink";
import { useSelector } from "react-redux";

export default function ViewBuilding(props) {
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const history = useHistory();
  const back = () => history.goBack();
  const [size, setSize] = useState(0);
  const [buildingData, setBuildingData] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [msg, setMsg] = useState("");
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);


  console.log(buildingData , "buildingData")

  const viewBuildingDetail = async (id) => {
    setLoading(true);
    let res = await getApi(`view_building/${id}`);
    if (res.status === 200) {
      setBuildingData(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    viewBuildingDetail(props.location.state.id);
  }, []);

  const handleConfirm = async () => {
    setOpen(false);
    let data = { building_id: props.location.state.id };
    let res = await postApi("activate_deactivate_building", data);
    if (res.status === 200) {
      viewBuildingDetail(props.location.state.id);
    } else {
      toast.error(res, { theme: "colored" });
    }
  };
  const ActivateBuilding = () => {
    setMsg(<IntlMassage id="msg.activate.building" />);
    setOpen(true);
  };

  const DeactivateBuilding = () => {
    setMsg(<IntlMassage id="msg.deactivate.building" />);
    setOpen(true);
  };

  const handleToggle = (state) => {
    if (state.target.checked === true) {
      ActivateBuilding();
    } else {
      DeactivateBuilding();
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <PageWrap>
      <div>
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="view.building" />
            </Label>
          </LabelBox>
        </PageLabel>
        <div>
          <Alert
            MsgText={msg}
            open={open}
            handleConfirm={handleConfirm}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
          <DetailWrap>
            <DetailBox>
              {Roles.buildings_management_edit === 1 ? (
                <>
                  {size < 767 && (
                    <StatusWrap>
                      <p className="status-label">
                        <IntlMassage id="label.status" />
                      </p>
                      <label className="switch-toggle">
                        <Toggle
                          checked={buildingData.status === 0 ? false : true}
                          value={buildingData.status === 0 ? false : true}
                          icons={false}
                          onChange={handleToggle}
                        />
                      </label>
                    </StatusWrap>
                  )}
                </>
              ) : (
                <>
                  {size < 767 && (
                    <StatusWrap>
                      <p className="status-label">
                        <IntlMassage id="label.status" />
                      </p>
                      <label className="switch-toggle">
                        <Toggle
                          checked={buildingData.status === 0 ? false : true}
                          value={buildingData.status === 0 ? false : true}
                          icons={false}
                          // onChange={handleToggle}
                        />
                      </label>
                    </StatusWrap>
                  )}
                </>
              )}
              <DetailList>
                <label className="f-600">
                  <IntlMassage id="view.building.name" />
                </label>
                <h6 className="f-600">{buildingData.building_name}</h6>
              </DetailList>

              <DetailList>
                <label>
                  <IntlMassage id="view.building.id" />
                </label>
                <h6>{buildingData.building_code}</h6>
              </DetailList>

              <DetailList>
                <label>
                  <IntlMassage id="view.building.address" />
                </label>
                <h6>{buildingData.address}</h6>
              </DetailList>
              <DetailList ID={"first-last"}>
                <label>
                  <IntlMassage id="view.building.location" />
                </label>
                <h6>
                  <LocationLink link={buildingData.location_link} />
                </h6>
              </DetailList>

              <DetailList  >
                <label className="py-3"  >
                  <IntlMassage id="addBuildings.description" />
                </label>
                <h6 className="py-3" >{buildingData.description}</h6>
              </DetailList>
             
            </DetailBox>
          
            <DetailBox>
          
            {Roles.buildings_management_edit === 1 ? (
                <>
                  {size > 767 && (
                    <StatusWrap>
                      <p className="status-label">
                        <IntlMassage id="label.status" />
                      </p>
                      <label className="switch-toggle">
                        <Toggle
                          checked={buildingData.status === 0 ? false : true}
                          value={buildingData.status === 0 ? false : true}
                          icons={false}
                          onChange={handleToggle}
                        />
                      </label>
                    </StatusWrap>
                  )}
                </>
              ) : (
                <>
                  {size > 767 && (
                    <StatusWrap>
                      <p className="status-label">
                        <IntlMassage id="label.status" />
                      </p>
                      <label className="switch-toggle">
                        <Toggle
                          checked={buildingData.status === 0 ? false : true}
                          value={buildingData.status === 0 ? false : true}
                          icons={false}
                          // onChange={handleToggle}
                        />
                      </label>
                    </StatusWrap>
                  )}
                </>
              )}
              <DetailList>
                <label>
                  <IntlMassage id="view.building.units" />
                </label>
                <h6>{buildingData.units}</h6>
              </DetailList>
              <DetailList>
                <label>
                  <IntlMassage id="view.building.propertycompany" />
                </label>
                <h6>{buildingData.name}</h6>
              </DetailList>
              <DetailList ID={"last"}>
                <label>
                  <IntlMassage id="view.building.status" />
                </label>
                <h6>
                  {buildingData.status === 0 ? (
                    <IntlMassage id="table.deactive" />
                  ) : (
                    <IntlMassage id="table.active" />
                  )}
                </h6>
              </DetailList>
            </DetailBox>
          </DetailWrap>
        </div>
      </div>
    </PageWrap>
  );
}

const DetailList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  padding-bottom: ${({ ID }) => (ID === "last" ? "0" : "20px")};
  padding-bottom: ${({ ID }) => ID === "first-last" && "0px"};
  label {
    min-width: 150px;
    font-size: 14px;
    line-height: 17px;
    font-weight: 400;
    color: #000000;
  }
  h6 {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    text-transform: capitalize;
  }
  .f-600 {
    font-weight: 600;
  }
  @media screen and (max-width: 767px) {
    padding-bottom: ${({ ID }) => ID === "first-last" && "20px"};
  }
  @media screen and (max-width: 380px) {
    label {
      min-width: 120px;
      max-width: 120px;
      word-wrap: break-word;
    }
  }
`;
