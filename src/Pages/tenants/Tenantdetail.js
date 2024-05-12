import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import LocationLink from "../../components/LocationLink";
import TableComponent from "../../components/Table";
import UnlinkeModal from "../../components/UnlinkeModal";
import Loader from "../../Loader/Loader";
import { postApi } from "../../services/ApiMethod";
import IntlMassage from "../../utils/IntlMassage";
import PaymentTable from "../payments/PaymentTable";
import {
  BackLink,
  PageLabel,
  LabelMedium,
  Label,
  LabelBox,
  PageWrap,
  TableWrap,
  Box,
  DetailDivider,
  DetailLabel,
  TenantDetailbox,
  InfoLabel,
  InfoValue,
  InfoLine,
} from "../Styles";

import { ContactDetail, TenantDeatilHeader, TenantName } from "./Style";

export default function Tenantdetail(props) {
  const history = useHistory();
  const back = () => history.goBack();
  const dir = useSelector((state) => state.Language.dir);
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState([]);
  const [payment, setPayment] = useState([]);
  const [tenant_details, setTenant_details] = useState({});
  const [tenant_unit_details, setTenant_unit_details] = useState({});
  const [unlinkShow, setUnlinkShow] = useState(false);

  const FirstHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.contractName",
      key: "name",
      show: false,
    },
    {
      id: "table.startDate",
      key: "contract_statrt_date",
      show: false,
    },
    {
      id: "table.expiryDate",
      key: "contract_end_date",
      show: false,
    },

    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];
  const firstformActions = {
    apply: true,
    view: true,
    edit: true,
    unlink: false,
    pathname: `/home/contracts/view`,
    pathnameEdit: "/home/contracts/edit",
  };

  const PaymentHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.payment",
      key: "amount",
      show: false,
    },
    {
      id: "table.type",
      key: "payment_type",
      show: false,
    },

    {
      id: "table.dateTime",
      key: "payment_date",
      show: false,
    },

    {
      id: "table.paymentStatus",
      key: "payment_status",
      show: false,
    },

    {
      id: "table.action",
      key: "action",
      show: true,
    },
  ];

  const paymentformActions = {
    apply: true,
    view: true,
    edit: true,
    pathnameEdit: "/home/payments/edit",
  };

  const getDetail = async (id) => {
    setLoading(true);
    let d = {
      tenant_id: id,
    };
    let res = await postApi(`view_tenant_by_tenant_id`, d);
    if (res.status === 200) {
      setTenant_details(res.tenant_details);
      setTenant_unit_details(res.tenant_unit_details);
      setContract(res.contract);
      setPayment(res.payment);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail(props.location.state.id);
  }, [props.location.state.id]);

  if (loading) {
    return <Loader />;
  }
  return (
    <PageWrap>
      <UnlinkeModal
        show={unlinkShow}
        onHide={() => setUnlinkShow(false)}
        tenant_id={tenant_details.tenant_id}
      />
      <div className="d-flex flex-row align-items-center justify-content-between">
        <PageLabel>
          <LabelBox>
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="tenant.tenantDetails" />
             
            </Label>
          </LabelBox>
        </PageLabel>
       
      </div>
      <TableWrap>
        <TenantDeatilHeader>
          <TenantName Dir={dir}>
            {tenant_details.tenant_name}
            <span id="id">ID - {tenant_details.tenant_code}</span>
          </TenantName>
          <ContactDetail Dir={dir}>
            <div className="cell">
              <label>{intl.formatMessage({ id: "profile.phone" })}</label>
              <span>
                +{tenant_details.country_code} {tenant_details.phone}
              </span>
            </div>
            <div className="cell">
              <label>{intl.formatMessage({ id: "profile.email" })}</label>
              <span>{tenant_details.email}</span>
            </div>
            <div className="cell">
              <label>{intl.formatMessage({ id: "profile.country" })}</label>
              <span>{tenant_details.country_name}</span>
            </div>
          </ContactDetail>
        </TenantDeatilHeader>
        <DetailDivider />
        {Object.keys(tenant_unit_details).length > 0 && (
          <TenantDetailbox>
            <Box Dir={dir}>
              <DetailLabel>{intl.formatMessage({ id: "tenant.tenantDetails.unitDetail" })}</DetailLabel>
              <InfoLine>
              
                <InfoLabel>{intl.formatMessage({ id: "unit.info.unitno" })}</InfoLabel>
                <InfoValue>{tenant_unit_details.unit_no}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>{intl.formatMessage({ id: "unit.info.rooms" })}</InfoLabel>
                <InfoValue>{tenant_unit_details.rooms}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>{intl.formatMessage({ id: "unit.info.bathroom" })}</InfoLabel>
                <InfoValue>{tenant_unit_details.bathrooms}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>{intl.formatMessage({ id: "unit.info.rent" })}</InfoLabel>
                <InfoValue>
                  {tenant_unit_details.symbol}&nbsp;
                  {tenant_unit_details.monthly_rent}&nbsp;
                  {<IntlMassage id="unit.info.monthly" />}
                </InfoValue>
              </InfoLine>
            </Box>
            <Box Dir={dir}>
              <DetailLabel pt={true}>{intl.formatMessage({ id: "building.info" })}</DetailLabel>
              <InfoLine>
                <InfoLabel>{intl.formatMessage({ id: "placeholder.ownername" })}</InfoLabel>
                <InfoValue>{tenant_unit_details.owner_name}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>{intl.formatMessage({ id: "placeholder.buildingname" })}</InfoLabel>
                <InfoValue>{tenant_unit_details.building_name}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>{intl.formatMessage({ id: "unit.info.location" })}</InfoLabel>
                <InfoValue>
                  <LocationLink link={tenant_unit_details.location_link} />
                </InfoValue>
              </InfoLine>
            </Box>
          </TenantDetailbox>
        )}
      </TableWrap>
      {contract.length > 0 && (
        <>
          <LabelMedium>{intl.formatMessage({ id: "sidebar.contracts" })}</LabelMedium>
          <TableWrap className="mt-0">
            <TableComponent
              action={firstformActions}
              headerData={FirstHeader}
              startfrom={0}
              TableData={contract}
            />
          </TableWrap>
        </>
      )}

      {payment.length > 0 && (
        <>
          <LabelMedium>{intl.formatMessage({ id: "sidebar.payments" })}</LabelMedium>
          <TableWrap className="mt-0">
            <PaymentTable
              action={paymentformActions}
              headerData={PaymentHeader}
              startfrom={0}
              TableData={payment}
            />
          </TableWrap>
        </>
      )}
    </PageWrap>
  );
}

