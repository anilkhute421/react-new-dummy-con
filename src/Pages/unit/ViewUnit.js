import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import IntlMassage from "../../utils/IntlMassage";
import {
  BackLink,
  CardBackground,
  Label,
  LabelBox,
  PageHeader,
  PageWrap,
  TenantDetailbox,
  Box,
  DetailLabel,
  InfoLine,
  InfoLabel,
  InfoValue,
  DetailDivider,
  ContractLeased,
  LabelMedium,
  NoData,
  StatusWrap,
} from "../Styles";
import {
  DescriptionLabel,
  DescriptionText,
  UnitNo,
} from "../unitAvailable/Style";
import Toggle from "react-toggle";
import { Button, CircularProgress } from "@mui/material";
import { getApi, postApi } from "../../services/ApiMethod";
import Loader from "../../Loader/Loader";
import LocationLink from "../../components/LocationLink";
import Alert from "../../alert/Alert";
import { toast } from "react-toastify";
import DisconnectModal from "../../components/DisconnectModal";
import { useIntl } from "react-intl";
import TableComponent from "../../components/Table";
import PaginatedItems from "../../pageCounter/Pagination";

export default function ViewUnit(props) {
  const history = useHistory();
  const dir = useSelector((state) => state.Language.dir);
  const back = () => {
    history.goBack();
  };
  const intl = useIntl();
  const [tenantUnitData, setTenantUnitData] = useState([]);
  const [tenantUnitId, setTenantUnitID] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [msg, setMsg] = useState("");
  const [disconnectShow, setDisconnectShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contractData, setContractData] = useState([]);
  const [page , setPage] = useState(1)
  const [pageCount , setPageCount] = useState(0)

  const getTenantData = async () => {
    setLoader(true);
    let res = await getApi(`get_tenant_units_info/${props.location.state.id}`);
    if (res.status === 200) {
      setTenantUnitData(res.data);
      setTenantUnitID(res.data.id);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const ActivateBuilding = () => {
    setMsg(intl.formatMessage({ id: "msg.activate.building" }));
    setOpen(true);
  };
  const DeactivateBuilding = () => {
    setMsg(intl.formatMessage({ id: "msg.deactivate.building" }));
    setOpen(true);
  };

  const handleToggle = (state) => {
    if (state.target.checked === true) {
      ActivateBuilding();
    } else {
      DeactivateBuilding();
    }
  };
  const handleConfirm = async () => {
    setOpen(false);
    let res = await postApi("activate_deactivate_tenant_units", {
      unit_id: props.location.state.id,
    });
    if (res.status === 200) {
      toast.info(res.message, { theme: "colored" });
      getTenantData();
    } else {
      toast.error(res, { theme: "colored" });
    }
  };

  const Disconnect = () => {
    setDisconnectShow(true);
  };

  const ContractHeader = [
    {
      id: "table.Sno",
      key: "id",
      show: true,
    },
    {
      id: "table.name",
      key: "name",
      show: false,
    },

    {
      id: "table.startDate",
      key: "start_date",
      show: false,
    },
    {
      id: "table.expiryDate",
      key: "end_date",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];



  const formActions = {
    apply: true,
    view: true,
    pathname: "/home/contracts/view",
  };

  const getcontractLisiting = async () => {
    setLoading(true);

    let req = {
      page: 1,
      unit_id: props.location.state.id,
    };
    let res = await postApi("contract_list_by_unit_id", req);
    if (res.status === 200) {
      setContractData(res.data);
      setPageCount(res.pagecount)
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.message, { theme: "colored" });
    }
  };

  const getChangedPage = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getTenantData();
    getcontractLisiting();
  }, []);

  if (loader && loading) {
    return <Loader />;
  }

  if (!loader && !tenantUnitData) {
    return (
      <CardBackground className="mt-5">
        <NoData>
          <IntlMassage id="msg.nodata" />
        </NoData>
      </CardBackground>
    );
  }

  return (
    <>
      <Alert
        MsgText={msg}
        open={open}
        handleConfirm={handleConfirm}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      {disconnectShow && (
        <DisconnectModal
          show={disconnectShow}
          onHide={() => setDisconnectShow(false)}
          tenant_unit_id={tenantUnitData.id}
        />
      )}
      <PageWrap>
        <PageHeader>
          <LabelBox className="d-flex justify-content-between">
            <Label>
              <BackLink Dir={dir} onClick={back}>
                <i className="icon-down-back" />
              </BackLink>
              <IntlMassage id="units.management" />
            </Label>

            {tenantUnitData.tenant_id && (
              <Button
                onClick={Disconnect}
                sx={{ background: "aliceblue", border: "1px solid #145DA0 " }}
              >
                <IntlMassage id="label.disconnect" />
              </Button>
            )}
          </LabelBox>
        </PageHeader>

        <CardBackground className="mt-4">
          <StatusWrap>
            <p className="px-1">
              <IntlMassage id="label.status" />
            </p>
            <label className="switch-toggle">
              <Toggle
                icons={false}
                checked={tenantUnitData.status === 0 ? false : true}
                value={tenantUnitData.status === 0 ? false : true}
                onChange={handleToggle}
              />
            </label>
          </StatusWrap>
          <div className="d-flex justify-content-between">
            <UnitNo>
              <span className="unitno">
                <IntlMassage id="unit.info.unitno" />
              </span>
              <span className="number">{tenantUnitData.unit_no}</span>
              <span className="id d-flex flex-row">
                <IntlMassage id="unit.info.id" /> - {tenantUnitData.unit_code}
              </span>
            </UnitNo>
          </div>

          <TenantDetailbox className="px-0 pb-2">
            <Box className="px-0 " Dir={dir}>
              {/* <Leased>
                <IntlMassage id="label.leased" />
              </Leased> */}

              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="placeholder.rooms" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.rooms}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="placeholder.bathrooms" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.bathrooms}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="unit.info.area" />
                </InfoLabel>
                <InfoValue>
                  {tenantUnitData.area_sqm} &nbsp;
                  {<IntlMassage id="unit.info.sqm" />}
                </InfoValue>
              </InfoLine>

              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="unit.info.rent" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.currency_symbol} {tenantUnitData.monthly_rent}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="label.payment" />
                </InfoLabel>
                {tenantUnitData.payment === "1" ? (
                  <InfoValue>
                    <IntlMassage id="label.manual" />
                  </InfoValue>
                ) : (
                  <InfoValue>
                    <IntlMassage id="label.cheque" />
                  </InfoValue>
                )}
              </InfoLine>
            </Box>
            <Box Dir={dir}>
              <DetailLabel pt={true}>
                <IntlMassage id="building.info" />
              </DetailLabel>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="placeholder.ownername" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.owner_name}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="addBuildings.name" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.building_name}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="addBuildings.address" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.building_address}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="addBuildings.location" />
                </InfoLabel>
                <InfoValue>
                  <LocationLink link={tenantUnitData.location_link} />
                </InfoValue>
              </InfoLine>
            </Box>
          </TenantDetailbox>
          <DetailDivider className="w-100 mb-2" />
          <DescriptionLabel>
            <IntlMassage id="unit.info.description" />
          </DescriptionLabel>
          <DescriptionText>{tenantUnitData.description}</DescriptionText>
        </CardBackground>
        <div className="d-flex flex-row align-items-center justify-content-end">
          <Button
            sx={{ mx: 2 }}
            color="secondary"
            variant="contained"
            onClick={() =>
              history.push("/home/units/viewpayment", { id: tenantUnitId })
            }
          >
            <IntlMassage id="button.viewpayment"></IntlMassage>
          </Button>
          <Button
            color="primary"
            variant="contained"
            Dir={dir}
            onClick={() =>
              history.push("/home/units/viewmaintenance", { id: tenantUnitId })
            }
          >
            <IntlMassage id="button.viewrequest" />
          </Button>
        </div>

        <ContractLeased>
          <TenantDetailbox className="pb-2">
            <Box className="px-0" Dir={dir}>
              <LabelMedium style={{ padding: "0px" }}>
                <IntlMassage id="label.tenantinfo" />
              </LabelMedium>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="label.name" />
                </InfoLabel>
                <InfoValue>
                  {tenantUnitData.tenant_first_name}
                  {tenantUnitData.tenant_last_name}
                </InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="label.email" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.tenant_email}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="label.phone" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.tenant_phone}</InfoValue>
              </InfoLine>
              <InfoLine>
                <InfoLabel>
                  <IntlMassage id="label.country" />
                </InfoLabel>
                <InfoValue>{tenantUnitData.tenant_country}</InfoValue>
              </InfoLine>
            </Box>
            <Box Dir={dir}>
              <DetailLabel pt={true}>
                <IntlMassage id="label.contractinfo" />
              </DetailLabel>

              <div>
                {/* <TableWrap> */}
                {loading ? (
                  <NoData>
                    <CircularProgress />
                  </NoData>
                ) : contractData.length > 0 ? (
                  <div>
                    <TableComponent
                      action={formActions}
                      headerData={ContractHeader}
                      startfrom={page < 1 ? 0 : (page - 1) * 10}
         
                      TableData={contractData}
                    />

                    <PaginatedItems
                      currentPage={page - 1}
                      getChangedPage={getChangedPage}
                      pageCount={pageCount}
                      itemsPerPage={10}
                    />
                  </div>
                ) : (
                  <NoData>
                    <IntlMassage id="msg.nodata" />
                  </NoData>
                )}
                {/* </TableWrap> */}
              </div>
              {/* <ContractDocBox>
                  <img src={docIcon} alt="" />
                </ContractDocBox>
                <i className="icon-view">
                  <span className="mx-2">
                    <IntlMassage id="label.view" />
                  </span>
                </i> */}
            </Box>
          </TenantDetailbox>
        </ContractLeased>
      </PageWrap>
    </>
  );
}
