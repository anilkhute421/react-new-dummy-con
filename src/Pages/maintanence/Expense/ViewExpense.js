import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../../Loader/Loader";
import { postApi } from "../../../services/ApiMethod";
import { invoice } from "../../../utils/images";
import IntlMassage from "../../../utils/IntlMassage";
import { openContractFile } from "../../../viewDocument/ViewContract";
import {
  BackLink,
  Box,
  CardBackground,
  DetailDivider,
  InfoLabel,
  InfoLine,
  InfoValue,
  Label,
  LabelBox,
  PageHeader,
  PageWrap,
  TenantDetailbox,
} from "../../Styles";

function ViewExpense(props) {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const back = () => {
    history.goBack();
  };

  const [data, setData] = useState([]);
  const [expenseData, setExpeneseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getViewData = async (id) => {
    setLoading(true);
    let req = {
      expense_item_id: props.location.state.id,
    };
    let res = await postApi("view_expenses_by_id", req);

    if (res.status === 200) {
      setData(res.data);
      setExpeneseData(res.expense_items);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getViewData();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <>
        <PageWrap>
          <PageHeader>
            <LabelBox>
              <Label>
                <BackLink Dir={dir} onClick={back}>
                  <i className="icon-down-back" />
                </BackLink>
                <IntlMassage id="Maintenance.expense.ViewExpense" />
              </Label>
            </LabelBox>
          </PageHeader>
          <CardBackground className="mt-4">
            <InfoLine>
              <InfoLabelHeader>
                <IntlMassage id="table.buildingname" />
              </InfoLabelHeader>
              <InfoValueHeader>{data.building_name}</InfoValueHeader>
            </InfoLine>

            <InnnerInfo>
              <InfoLine>
                <InfoLabel className="px-2">
                  <IntlMassage id="table.unitno" />
                </InfoLabel>
                <InfoValue className="px-2">{data.unit_no}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel className="px-2">
                  <IntlMassage id="table.tenantname" />
                </InfoLabel>
                <InfoValue className="px-2">{data.tenant}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel className="px-2">
                  <IntlMassage id="table.reqid" />
                </InfoLabel>
                <InfoValue className="px-2">
                  {data.request_code === "" ? "--" : data.request_code}
                </InfoValue>
              </InfoLine>
            </InnnerInfo>
            <DetailDivider className="w-100 mb-2" />

            {expenseData.map((item, i) => (
              <TenantDetailbox className="px-0 pb-2">
                <Box className="px-0" Dir={dir}>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.reqfor" />
                    </InfoLabel>
                    <InfoValue>{item.request_for}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.amount" />
                    </InfoLabel>
                    <InfoValue>{item.amount}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="table.date" />
                    </InfoLabel>
                    <InfoValue>{item.date}</InfoValue>
                  </InfoLine>
                  <InfoLine>
                    <InfoLabel>
                      <IntlMassage id="placeholder.description" />
                    </InfoLabel>
                    <InfoValue>{item.description}</InfoValue>
                  </InfoLine>
                </Box>
                <Box Dir={dir}>
                  <InfoLine>
                    <div>
                      <InfoLabel className="m-0">
                        <IntlMassage id="Maintenance.expense.image" />
                      </InfoLabel>
                    </div>
                    <div className="d-flex flex-wrap ">
                      {item.files.map((el, i) => (
                        <ViewImage>
                          <ImageHolder Dir={dir}>
                            {el.file_name.toString().includes(".pdf") ? (
                              <img src={invoice} alt="" />
                            ) : (
                              <img src={el.file_name} alt="" />
                            )}
                          </ImageHolder>
                          <i
                            className="icon-view"
                            onClick={() => openContractFile(el.file_name)}
                          />
                        </ViewImage>
                      ))}
                    </div>
                  </InfoLine>
                </Box>
              </TenantDetailbox>
            ))}
          </CardBackground>
        </PageWrap>
      </>
    </div>
  );
}

export default ViewExpense;

const ViewImage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  align-items: center;
  i {
    cursor: pointer;
    margin: 10px 15px 10px 0px;
  }
`;

const InfoLabelHeader = styled.label`
  fonytsize: 22px;
  font-weight: 400;
  padding: 5px 20px 5px 20px;
`;

const InfoValueHeader = styled.span`
  fontsize: 22px;
  font-weight: 700;
  padding: 5px 20px 5px 20px;
`;

const InnnerInfo = styled.div`
  display: flex;
  padding: 0px 20px;

  @media screen and (max-width: 1082px) {
    padding: 0 10px;
  }
  @media screen and (max-width: 792px) {
    display: flex;
    flex-direction: column;
  }
`;

const ImageHolder = styled.div`
  width: 70px;
  min-width: 70px;
  height: 70px;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  margin-right: ${({ Dir }) => Dir === "ltr" && "20px"};
  margin-left: ${({ Dir }) => Dir === "rtl" && "20px"};
  img {
    width: 100%;
    height: 100%;

    border-radius: 6px;
  }
`;
