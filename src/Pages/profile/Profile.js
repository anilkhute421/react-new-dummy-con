import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import IntlMassage from "../../utils/IntlMassage";

import { ProfilePageWrap, PageHeader } from "../Styles";
import {
  ProfileLabel,
  ProfileButtons,
  ProfileDetail,
  ProfileDetailBox,
  DetailList,
} from "./Style";
import Loader from "../../Loader/Loader";
import { Button } from "@mui/material";
import ChangePassword from "./ChangePassword";
import { getApi } from "../../services/ApiMethod";
import { updateProfileData } from "../../store/action/AuthAction";

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.Auth.data);
  const [loader, setLoader] = useState(false);

  const viewProfile = async () => {
    let res = await getApi(`view_pm_profile/${detail.id}`);
        if (res.status === 200) {
      setLoader(false);
      dispatch(updateProfileData(res.data));
    } else {
      setLoader(false);
    }
  };
  useEffect(() => {
    viewProfile();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <ProfilePageWrap>
      <div>
        <PageHeader>
          <ProfileLabel>
            <IntlMassage id="profile.myprofile" />
          </ProfileLabel>
          <ProfileButtons>
            <ChangePassword />

            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/home/profile/edit")}
            >
              <IntlMassage id="profile.editProfile" />
            </Button>
          </ProfileButtons>
        </PageHeader>

        <ProfileDetail>
          <ProfileDetailBox>
            <DetailList>
              <label>
                <IntlMassage id="profile.name" />
              </label>
              <h6>{detail.name}</h6>
            </DetailList>
            <DetailList>
              <label>
                <IntlMassage id="profile.email" />
              </label>
              <h6>{detail.email}</h6>
            </DetailList>
            <DetailList>
              <label>
                <IntlMassage id="profile.phone" />
              </label>
              <h6>{detail.phone}</h6>
            </DetailList>
            <DetailList>
              <label>
                <IntlMassage id="profile.role" />
              </label>
              <h6>{detail.role_name}</h6>
            </DetailList>
            <DetailList ID={"first-last"}>
              <label>
                <IntlMassage id="profile.country" />
              </label>
              <h6>{detail.country_name}</h6>
            </DetailList>
          </ProfileDetailBox>
          <ProfileDetailBox>
            <DetailList>
              <label>
                <IntlMassage id="profile.company" />
              </label>
              <h6>{detail.company_name}</h6>
            </DetailList>
            <DetailList ID={"last"}>
              <label>
                <IntlMassage id="profile.officeContact" />
              </label>
              <h6>{detail.office_contact_no}</h6>
            </DetailList>
          </ProfileDetailBox>
        </ProfileDetail>
      </div>
 
    </ProfilePageWrap>
  );
}
