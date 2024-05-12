import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../Loader/Loader";
import { getApi } from "../../services/ApiMethod";
import IntlMassage from "../../utils/IntlMassage";
import { DetailList } from "../profile/Style";
import {
  BackLink,
  DetailBox,
  Label,
  LabelBox,
  PageLabel,
  PageWrap,
  DetailWrap,
} from "../Styles";

export default function ViewOwner(props) {

  const history = useHistory();
  const back = () => history.goBack();
  const [loading, setLoading] = useState(true);
  const [ownerData, setOwnerData] = useState("");

  const OwnerDetail = async (id) => {
    setLoading(true);
    let res = await getApi(`owner_details/${id}`);
    if (res.status === 200) {
      setOwnerData(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    OwnerDetail(props.location.state.id);
  }, []);

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
              <IntlMassage id="owner.view" />
            </Label>
          </LabelBox>
        </PageLabel>

        <DetailWrap>
          <DetailBox>
            <DetailList>
              <label>
                <IntlMassage id="table.name" />
              </label>
              <h6>{ownerData.name}</h6>
            </DetailList>
            <DetailList>
              <label>
                <IntlMassage id="table.phoneno" />
              </label>
              <h6>{ownerData.phone}</h6>
            </DetailList>

            <DetailList>
              <label>
                <IntlMassage id="view.building.status" />
              </label>
              <h6>
         
                {ownerData.status && ownerData.status === 1 ? (
                  <IntlMassage id="table.active" />
                ) : (
                  <IntlMassage id="table.deactive" />
                )}
              </h6>
            </DetailList>

            <DetailList>
              <label>
                <IntlMassage id="placeholder.remarks" />
              </label>
              <h6>{ownerData.remarks}</h6>
            </DetailList>
          </DetailBox>
          <DetailBox>
            <DetailList>
              <label>
                <IntlMassage id="table.email" />
              </label>
              <h6>{ownerData.email}</h6>
            </DetailList>
            <DetailList>
              <label>
                <IntlMassage id="table.ownerid" />
              </label>
              <h6>{ownerData.owner_code}</h6>
            </DetailList>
            <DetailList>
              <label>
                <IntlMassage id="profile.company" />
              </label>
              <h6>{ownerData.company_name}</h6>
            </DetailList>
          </DetailBox>
        </DetailWrap>

        {/* <TableWrap>
                      <TableComponent action={formActions} headerData={BuildingHeader} startfrom={0} TableData={Datatable} />
                  </TableWrap> */}
      </div>
    </PageWrap>
  );
}
