import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MyButton } from "../../../GlobalStyle";
import IntlMassage from "../../../utils/IntlMassage";
import {
  BackLink,
  Box,
  CardBackground,
  DetailDivider,
  EditBtn,
  InfoLabel,
  InfoLine,
  InfoValue,
  Label,
  LabelBox,
  RequestHeader,
  PageWrap,
  TableLoaderWrap,
  TenantDetailbox,
} from "../../Styles";
import { DescriptionLabel, DescriptionText } from "../../unitAvailable/Style";
import ViewComments from "./ViewComments";
import { postApi } from "../../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../../firebase/FireStoreData";

export default function Viewrequest(props) {
  const dir = useSelector((state) => state.Language.dir);
  const senderID = useSelector((state) => state.Auth.data.pm_company_id);
  const history = useHistory();
  const back = () => {
    history.goBack();
  };

  const [openbox, setOpenbox] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expert, setExpert] = useState([]);
  const [unreadComment, setUnreadComment] = useState(0);
  const openChatBox = () => {
    setOpenbox(true);
  };
  const closeChatBox = () => {
    setOpenbox(false);
  };
  const getViewReqestDetail = async () => {
    setLoading(true);
    let d = {
      request_id: props.location.state.id,
    };
    let res = await postApi("view_maintanence_request_by_request_id", d);
    if (res.status === 200) {
      setData(res.data);
      setExpert(res.experts);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const gotoEdit = () => {
    let id = data.id;
    history.push("/home/maintanence/requests/edit", (id = { id }));
  };
  const viewAllAttachment = () => {
    let id = props.location.state.id;
    history.push("/home/maintanence/requests/attachment", (id = { id }));
  };

  const getCount = async () => {
    let id = props.location.state.id;
    onSnapshot(doc(db.db, `unitID/${data.unit_id}/requestID/${id}`), (doc) => {
      let data = doc.data();
      let senderCount = data[senderID];
      setUnreadComment(senderCount);
    });
  };

  useEffect(() => {
    getViewReqestDetail();
    getCount();
  }, []);

  return (
    <>
      {openbox && (
        <ViewComments
          id={props.location.state.id}
          tenantID={data.tenant_id}
          receiverID={data.unit_id}
          open={openbox}
          close={closeChatBox}
          unit_id={data.unit_id}
        />
      )}
      <PageWrap>
        <RequestHeader Dir={dir}>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="maintanence.viewrequest" />
            </Label>
          </LabelBox>
          <ButtonWrapper className="btns">
            <EditBtn onClick={viewAllAttachment}>
              <IntlMassage id="button.viewallattachment"></IntlMassage>
            </EditBtn>

            <MyButton className="comment-btn" onClick={openChatBox}>
              <Badge Dir={dir} className={unreadComment > 0 ? "" : "d-none"}>
                {unreadComment}
              </Badge>
              <IntlMassage id="button.comments"></IntlMassage>
            </MyButton>
          </ButtonWrapper>
        </RequestHeader>

        <CardBackground className="mt-4">
          {loading ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : (
            <>
              <TenantDetailbox className="px-0 pb-2">
                <Box className="px-0" Dir={dir}>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.building" />
                    </InfoLabel>
                    <InfoValue>{data.building_name}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.unitno" />
                    </InfoLabel>
                    <InfoValue>{data.unit_no}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.address" />
                    </InfoLabel>
                    <InfoValue>{data.building_address}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.reqid" />
                    </InfoLabel>
                    <InfoValue>{data.request_code}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.reqfor" />
                    </InfoLabel>
                    <InfoValue>{data.request_for}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.reqby" />
                    </InfoLabel>
                    <InfoValue>{data.requested_by}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.status" />
                    </InfoLabel>
                    <InfoValue>{data.status}</InfoValue>
                  </InfoLine>

                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="placeholder.preferred_date_time" />
                    </InfoLabel>
                    <InfoValue>{data.preferred_date_time}</InfoValue>
                  </InfoLine>
                </Box>

                <Box Dir={dir}>
                  <InfoValue style={{ fontSize: "18px" }} className="px-2 py-1">
                    <IntlMassage id="table.assignedexpert" />
                  </InfoValue>
                  {expert &&
                    expert.map((item, i) => (
                      <>
                        <DetailDivider className="w-100 mb-2" />
                        <InfoLine>
                          <InfoLabel>
                            <IntlMassage id="label.name" />
                          </InfoLabel>
                          <InfoValue>{item.name}</InfoValue>
                        </InfoLine>
                        <InfoLine>
                          <InfoLabel>
                            <IntlMassage id="table.phoneno" />
                          </InfoLabel>
                          <InfoValue>{item.phone}</InfoValue>
                        </InfoLine>
                        <InfoLine>
                          <InfoLabel>
                            <IntlMassage id="table.Expertreqdate" />
                          </InfoLabel>
                          <InfoValue>{item.request_date}</InfoValue>
                        </InfoLine>
                      </>
                    ))}
                </Box>
              </TenantDetailbox>
              <DetailDivider className="w-100 mb-2" />
              <DescriptionLabel>
                <IntlMassage id="unit.info.description" />
              </DescriptionLabel>
              <DescriptionText>{data.description}</DescriptionText>
              <div className="d-flex justify-content-end">
                {data.pm_can_edit === 1 && (
                  <EditBtn onClick={gotoEdit}>
                    <IntlMassage id="button.edit"></IntlMassage>
                  </EditBtn>
                )}
              </div>
            </>
          )}
        </CardBackground>
      </PageWrap>
    </>
  );
}

const Badge = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: red;
  color: #fff;
  font-weight: 500;
  position: absolute;
  top: 0;
  left: ${({ Dir }) => Dir === "rtl" && "0px"};
  right: ${({ Dir }) => Dir === "ltr" && "0px"};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
`;

const ButtonWrapper = styled.div`
  @media (max-width: 425px) {
    button {
      font-size: 10px;
      padding: 13px 20px;
      font-weight: 400;
    }
  }
`;
