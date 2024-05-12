import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { DateIcon, InputDate } from "../../GlobalStyle";
import {
  DashboardBuilding,
  DashboardUnitsRents,
  DashboardTenants,
  DashboardUnits,
} from "../../utils/images";
import { FilterStatusText } from "../maintanence/Style";
import ReactCountTimer from "react-count-timer";
import { Slide } from "react-reveal";
import SelectWithSearch from "../../components/SelectWithSearch";
import { postApi } from "../../services/ApiMethod";
import { useHistory } from "react-router-dom";
import DashboardCardModal from "./DashboardCardModal";
import Loader from "../../Loader/Loader";
import { NoData } from "../Styles";
import { useIntl } from "react-intl";
import IntlMassage from "../../utils/IntlMassage";
import moment from "moment";
import { ButtonBase } from "@mui/material";
import { CircularProgress } from "@mui/material";

export default function DashboardDetails() {
  const dir = useSelector((state) => state.Language.dir);
  const [activeTab, setActiveTab] = useState(12);
  const SwitchTableTab = (e) => {
    setActiveTab(e);
  };
  const intl = useIntl();
  const history = useHistory();
  const [activeBuilding, setActiveBuilding] = useState(0);
  const [activeUnit, setActiveUnit] = useState(0);
  const [activeTenant, setActiveTenant] = useState(0);
  const [activeForRent, setActiveForRent] = useState(0);
  const [activeContractExpiry2m, setActiveContractExpiry2m] = useState(0);
  const [buildingDropdown, setBuildingDropdown] = useState([]);
  const [ownerDropdown, setOwnerDropdown] = useState([]);
  const [tenantDropdown, setTenantDropdown] = useState([]);
  const [show, setShow] = useState(false);
  const [parameter, setParameter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectOwnerID, setSelectOwnerID] = useState(0);
  const [selectBuildingID, setSelectBuildingId] = useState(0);
  const [selectTenantID, setSelectTenantID] = useState(0);
  const [requestData, setRequestData] = useState();

  //Bottom Card
  const [maintenenceClosed, setMaintenanceClosed] = useState([]);
  const [maintenenceOpen, setMaintenanceOpen] = useState([]);
  const [maintenenceExpense, setMaintenanceExpense] = useState([]);
  const [paymentOverdue, setPaymentOverdue] = useState([]);
  const [paymentSettled, setPaymentSettled] = useState([]);
  const [paymentUpcoming, setPaymentUpcoming] = useState([]);
  const [bottomCardLoading, setBottomCardLoading] = useState(true);
  const [bottomCardErrorMsg, setBottomCardErrorMsg] = useState("");

  // This Roles is for Authorties
  const Roles = useSelector((state) => state.Auth.data.role_details);

  const getDashBoardDetails = async () => {
    setLoading(true);
    let res = await postApi("dashboard_counts_or_dropdown");
    if (res.status === 200) {
      setActiveBuilding(res.active_buildings_count);
      setActiveUnit(res.active_units_count);
      setActiveTenant(res.active_tenants_count);
      setActiveForRent(res.active_avaliable_units_count);
      setActiveContractExpiry2m(res.total_contracts_expiring2m_count);
      setBuildingDropdown(res.buildings_dropdown);
      setOwnerDropdown(res.owner_dropdown);
      setTenantDropdown(res.tenants_dropdown);
      setLoading(false);
    } else {
      setErrorMsg(res.message);
      setLoading(false);
    }
  };

  const openModal = (item) => {
    setParameter(item);
    setShow(true);
  };

  const getFiltersCards = async () => {
    setBottomCardLoading(true);
    let req = {
      time_key: fromDate || toDate ? "date_range" : "month",
      owner_id: selectOwnerID ? selectOwnerID.id : 0,
      building_id: selectBuildingID ? selectBuildingID.id : 0,
      tenant_id: selectTenantID ? selectTenantID.id : 0,
      month_id: fromDate === null ? activeTab : 0,
      date_from: fromDate === null ? 0 : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? 0 : moment(toDate).format("YYYY-MM-DD"),
    };
    setRequestData(req);
    let res = await postApi("dashboard_filters", req);
    if (res.status === 200) {
      setMaintenanceClosed(res.maintenace_closed_record);
      setMaintenanceOpen(res.maintenace_opne_record);
      setMaintenanceExpense(res.maintenace_expenses_record);
      setPaymentOverdue(res.payment_overdue_record);
      setPaymentSettled(res.payment_settled_record);
      setPaymentUpcoming(res.payment_upcoming_record);
      setBottomCardLoading(false);
      setBottomCardErrorMsg("");
    } else {
      setBottomCardLoading(false);
      setBottomCardErrorMsg(res);
    }
  };

  const bottomCard = [
    {
      heading: intl.formatMessage({ id: "dashboard.card.Payment" }),
      header: intl.formatMessage({ id: "dashboard.card.Settled" }),
      amount: paymentSettled,
      background: "#00C19D",
      color: "#fff",
      type: "payment",
      cardName: "settled_payment",
      cardShow: Roles.amount_view,
    },
    {
      heading: intl.formatMessage({ id: "dashboard.card.Payment" }),
      header: intl.formatMessage({ id: "dashboard.card.Overdue" }),
      amount: paymentOverdue,
      background: "#868ECB",
      color: "#fff",
      type: "payment",
      cardName: "overdue_payment",
      cardShow: Roles.amount_view,
    },
    {
      heading: intl.formatMessage({ id: "dashboard.card.Payment" }),
      header: intl.formatMessage({ id: "dashboard.card.Upcoming" }),
      amount: paymentUpcoming,
      background: "#EC4A85",
      color: "#fff",
      type: "payment",
      cardName: "upcoming_payment",
      cardShow: Roles.amount_view,
    },
    {
      heading: intl.formatMessage({
        id: "dashboard.card.TotalAmountMaintenance",
      }),
      header: intl.formatMessage({ id: "dashboard.card.Expenses" }),
      amount: maintenenceExpense,
      background: "#FFAB50",
      color: "#fff",
      type: "expence",
      cardName: "expenses_amount",
      cardShow: Roles.amount_view,
    },
    {
      heading: intl.formatMessage({
        id: "dashboard.card.TotalNumberMaintenance",
      }),
      header: intl.formatMessage({ id: "dashboard.card.Closedrequests" }),
      amount: maintenenceClosed,
      background: "#099ECD",
      color: "#fff",
      type: "request",
      cardName: "closed_requests",
      cardShow: 1,
    },
    {
      heading: intl.formatMessage({
        id: "dashboard.card.TotalNumberMaintenance",
      }),
      header: intl.formatMessage({ id: "dashboard.card.Openrequests" }),
      amount: maintenenceOpen,
      background: "#9C9DA3",
      color: "#fff",
      type: "request",
      cardName: "open_requests",
      cardShow: 1,
    },
  ];

  const topCard = [
    {
      heading: intl.formatMessage({ id: "dashboard.card.Active" }),
      header: intl.formatMessage({ id: "dashboard.card.Buildings" }),
      count: activeBuilding,
      background: DashboardBuilding,
      location: "home/buildings",
    },
    {
      heading: intl.formatMessage({ id: "dashboard.card.Active" }),
      header: intl.formatMessage({ id: "dashboard.card.Units" }),
      count: activeUnit,
      background: DashboardUnits,
      location: "home/units",
    },
    {
      heading: intl.formatMessage({ id: "dashboard.card.Active" }),
      header: intl.formatMessage({ id: "dashboard.card.Tenants" }),
      count: activeTenant,
      background: DashboardTenants,
      location: "home/tenants",
    },
    {
      heading: intl.formatMessage({ id: "dashboard.card.Active" }),
      header: intl.formatMessage({ id: "dashboard.card.ForRent" }),
      count: activeForRent,
      background: DashboardUnitsRents,
      location: "home/unit-available",
    },
  ];

  const Contract2months = [
    {
      heading: intl.formatMessage({ id: "dashboard.card.contract" }),
      header: intl.formatMessage({ id: "dashboard.card.expiry2m" }),
      count: activeContractExpiry2m,
      background: DashboardTenants,
      location: "home/unit-available",
      type: "contract",
    },
  ];

  const selectOwner = (value) => {
    setSelectOwnerID(value);
  };

  const selectBuilding = (value) => {
    setSelectBuildingId(value);
  };

  const selectTenant = (value) => {
    setSelectTenantID(value);
  };

  const resetFilters = () => {
    // setSelectOwnerID(0);
    // setSelectBuildingId(0);
    // setSelectTenantID(0);
    setFromDate(null);
    setToDate(null);
    setActiveTab(12);
  };

  useEffect(() => {
    getFiltersCards();
  }, [
    activeTab,
    fromDate,
    toDate,
    selectOwnerID,
    selectBuildingID,
    selectTenantID,
  ]);

  useEffect(() => {
    getDashBoardDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (errorMsg) {
    return <NoData>{errorMsg}</NoData>;
  }

  const buttonStyle = {
    color: "#878787",
    padding: "0 10px",
    fontWeight: "500",
    "&:hover": {
      color: "red",
    },
  };

  return (
    <DashWrapper>
      {show && (
        <DashboardCardModal
          show={show}
          onHide={() => setShow(false)}
          parameter={parameter}
          reqData={requestData}
          buildingName={selectBuildingID === 0 ? null : selectBuildingID}
          ownerName={selectOwnerID === 0 ? null : selectOwnerID}
          tenantName={selectTenantID === 0 ? null : selectTenantID}
        />
      )}
      <DashCardWrap>
        {topCard.map((item, i) => (
          <DashCard
            style={{ background: `url(${item.background}) #fff no-repeat ` }}
            onClick={() => {
              history.push(item.location);
            }}
          >
            <p>{item.heading}</p>
            <h4>{item.header}</h4>
            <ReactCountTimer
              className="amount"
              count={item.count}
              duration={2000}
            />
          </DashCard>
        ))}

        {Contract2months.map((item, index) => (
          <DashCard
            style={{ background: `url(${item.background}) #fff no-repeat ` }}
            onClick={() => openModal(item)}
          >
            <p>{item.heading}</p>
            <h4>{item.header}</h4>
            <ReactCountTimer
              className="amount"
              count={item.count}
              duration={2000}
            />
          </DashCard>
        ))}
      </DashCardWrap>

      <DashSecondScreen>
        <div className="d-flex flex-row w-100 py-2">
          {!fromDate && !toDate ? (
            <TabSwitch>
              <TabItem
                onClick={() => SwitchTableTab(12)}
                active={activeTab === 12 ? true : false}
              >
                {intl.formatMessage({ id: "dashboard.card.12months" })}
              </TabItem>
              <TabItem
                onClick={() => SwitchTableTab(9)}
                active={activeTab === 9 ? true : false}
              >
                {intl.formatMessage({ id: "dashboard.card.9months" })}
              </TabItem>
              <TabItem
                onClick={() => SwitchTableTab(6)}
                active={activeTab === 6 ? true : false}
              >
                {intl.formatMessage({ id: "dashboard.card.6months" })}
              </TabItem>
              <TabItem
                onClick={() => SwitchTableTab(1)}
                active={activeTab === 1 ? true : false}
              >
                {intl.formatMessage({ id: "dashboard.card.1months" })}
              </TabItem>
            </TabSwitch>
          ) : (
            <TabSwitch>
              <TabItem onClick={() => SwitchTableTab(null)}>
                {intl.formatMessage({ id: "dashboard.card.12months" })}
              </TabItem>
              <TabItem onClick={() => SwitchTableTab(null)}>
                {intl.formatMessage({ id: "dashboard.card.9months" })}
              </TabItem>
              <TabItem onClick={() => SwitchTableTab(null)}>
                {intl.formatMessage({ id: "dashboard.card.6months" })}
              </TabItem>
              <TabItem onClick={() => SwitchTableTab(null)}>
                {intl.formatMessage({ id: "dashboard.card.1months" })}
              </TabItem>
            </TabSwitch>
          )}
        </div>

        <div className="mx-2">
          <DashSecondScreenDivide />
          <span style={{ color: "#808080b3", fontWeight: "500" }}>
            {intl.formatMessage({ id: "dashboard.card.or" })}
          </span>
          <DashSecondScreenDivide />
        </div>

        <div className="d-flex flex-row  w-100 py-2">
          <FilterStatusText>
            <IntlMassage id="table.date" />
          </FilterStatusText>
          <div className="mx-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From"
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <InputDate
                      ref={inputRef}
                      {...inputProps}
                      readOnly
                      placeholder={intl.formatMessage({
                        id: "filters.From",
                      })}
                    />
                    <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="mx-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="To"
                value={toDate}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <InputDate
                      ref={inputRef}
                      {...inputProps}
                      readOnly
                      placeholder={intl.formatMessage({
                        id: "filters.To",
                      })}
                    />
                    <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                  </Box>
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        <ButtonBase sx={buttonStyle} onClick={resetFilters} className="p-2">
          <IntlMassage id="filters.Reset" />
        </ButtonBase>
      </DashSecondScreen>

      <DashDropdown>
        <SelectWithSearch
          placeholder={intl.formatMessage({ id: "sidebar.owners" })}
          options={ownerDropdown}
          updateSelectedOption={(value) => selectOwner(value)}
        />
        <SelectWithSearch
          placeholder={intl.formatMessage({ id: "sidebar.buildings" })}
          options={buildingDropdown}
          updateSelectedOption={(value) => selectBuilding(value)}
        />
        <SelectWithSearch
          placeholder={intl.formatMessage({ id: "sidebar.tenants" })}
          options={tenantDropdown}
          updateSelectedOption={(value) => selectTenant(value)}
        />
      </DashDropdown>

      {bottomCardErrorMsg && (
        <div class="alert alert-danger" role="alert">
          {bottomCardErrorMsg}
        </div>
      )}

      <DashCardWrap>
        {bottomCard.map((item, i) => (
          <Slide up opposite delay={i * 70}>
            {item.cardShow === 1 && (
              <DashCard
                style={{
                  background: `${item.background}`,
                  color: `${item.color}`,
                }}
                onClick={() => openModal(item)}
              >
                <p>{item.heading}</p>
                <h4>{item.header}</h4>
                {bottomCardLoading ? (
                  <CircularProgress sx={{ color: "inherit", p: 1, mx: 1 }} />
                ) : (
                  <>
                    <span className="amount">
                      {item.amount > 999 && item.amount < 1000000
                        ? (item.amount / 1000).toFixed(1) + "K"
                        : item.amount > 1000000
                        ? (item.amount / 1000000).toFixed(1) + "M"
                        : item.amount}
                    </span>
                  </>
                )}
              </DashCard>
            )}
          </Slide>
        ))}
      </DashCardWrap>
    </DashWrapper>
  );
}

const DashSecondScreenDivide = styled.div`
  border: 1px solid #808080b3;
  opacity: 0.7;
  width: 0;
  height: 17px;
  margin: 0 0 0 10px;
`;

const TabSwitch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  box-shadow: 0px 2px 16px rgba(61, 107, 192, 0.25);
  border-radius: 10px;
  padding: 0 5px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
const TabItem = styled.div`
  background: ${({ active }) => (active ? "#145DA0" : "transparent")};
  border-radius: 10px;
  color: ${({ active }) => (active ? "#fff" : "rgba(0,0,0,0.6)")};
  height: 100%;
  padding: 13px 25px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
  transition: all ease-in-out 0.3s;
  min-width: max-content;
`;

const DashSecondScreen = styled.div`
  width: 100%;
  background: #fff;
  margin: 20px 0;
  box-shadow: 0px 2px 8px rgba(61, 107, 192, 0.28);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  div {
    justify-content: center;
  }
`;

const DashDropdown = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const DashWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const DashCardWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media (max-width: 991px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 575px) {
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const DashCard = styled.div`
  width: 100%;
  max-width: 259px;
  height: 120px;
  border-radius: 10px;
  // border-style: none;
  cursor: pointer;
  color: #000;
  background: #fff;
  background-position: right;
  box-shadow: 0px 6px 18px rgba(61, 107, 192, 0.18);
  // transition: all ease-in 0.19s;
  @media (max-width: 575px) {
    min-width: 250px;
  }
  &:hover {
    transform: scale(1.07);
    box-shadow: 0px 6px 18px grey;
  }
  p {
    width: 100%;
    margin: 0;
    padding: 5px 10px 0 10px;
    line-height: 20px;
  }
  h4 {
    width: 100%;
    padding: 0 10px;
    margin: 0;
  }
  .amount {
    width: 100%;
    padding: 0 10px;
    font-size: 30px;
    font-weight: 700;
  }
`;
