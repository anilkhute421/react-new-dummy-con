import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import IntlMassage from "../../utils/IntlMassage";
import PaymentTable from "../payments/PaymentTable";
import { InfoLabel, InfoValue, ModalLabel, ModalWrap, NoData } from "../Styles";
import MiantanenceTable from "../maintanence/MiantanenceTable";
import { postApi } from "../../services/ApiMethod";
import { Button, CircularProgress } from "@mui/material";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import PaginatedItems from "../../pageCounter/Pagination";
import TableComponent from "../../components/Table";
import { BaseUrl } from "../../utils/constants";

export default function DashboardCardModal({
  show,
  onHide,
  parameter,
  reqData,
  buildingName,
  ownerName,
  tenantName,
}) {
  const Dir = useSelector((state) => state.Language.dir);
  const [dataListing, setDataListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const [Paymentpage, setPaymentPage] = useState(1);
  const [PaymentpageCount, setPaymentPageCount] = useState(0);
  const [expensePage, setExpensePage] = useState(1);
  const [totalExpensePage, setTotalExpensePage] = useState(0);
  const [requestPage, setRequestPage] = useState(1);
  const [totalRequestPage, setTotalRequestPage] = useState(0);
  const [contractPage, setContractPage] = useState(1);
  const [totalContractPage, setTotalContractPage] = useState(0);
  const PmID = useSelector((state) => state.Auth.data.id);

  const PaymentHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.building",
      key: "BuildingName",
      show: false,
    },
    {
      id: "table.unitno",
      key: "UnitNumber",
      show: false,
    },
    {
      id: "table.tenantname",
      key: "TenantNAme",
      show: false,
    },
    {
      id: "table.paymentdate",
      key: "payment_date",
      show: false,
    },
    {
      id: "table.amount",
      key: "amount",
      show: false,
    },
    {
      id: "table.paymentMethod",
      key: "payment_type",
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
    view: Roles.payment_management_view === 1 ? true : false,
  };

  const getChangedPaymentPage = (newPage) => {
    setPaymentPage(newPage);
  };

  const ExpensesBuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.building",
      key: "BuildingName",
      show: false,
    },
    {
      id: "table.unitno",
      key: "UnitNumber",
      show: false,
    },
    {
      id: "table.tenantname",
      key: "TenantNAme",
      show: false,
    },
    {
      id: "table.expenses",
      key: "ExpensDes",
      show: false,
    },
    {
      id: "placeholder.currency",
      key: "Currency",
      show: false,
    },
    {
      id: "table.amount",
      key: "cost",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const ExpensesformActions = {
    apply: true,
    view: Roles?.expense_view === 1 ? true : false,
    pathname: "/home/maintanence/expenses/view",
  };

  const getChangedExpensePage = (newpage) => {
    setExpensePage(newpage);
  };

  const RequestsBuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.building",
      key: "BuildingName",
      show: false,
    },
    {
      id: "table.unitno",
      key: "unit_id",
      show: false,
    },
    {
      id: "table.reqby",
      key: "TenantNAme",
      show: false,
    },

    {
      id: "table.reqfor",
      key: "RequestFor",
      show: false,
    },
    {
      id: "contract.createOn",
      key: "created_at",
      show: false,
    },
    {
      id: "table.status",
      key: "status",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const RequestsformActions = {
    apply: true,
    view: Roles?.maintenance_req_view === 1 ? true : false,
    pathname: "/home/maintanence/requests/view",
  };

  const getChangedRequestPage = (newpage) => {
    setRequestPage(newpage);
  };

  const ContractHeader = [
    {
      id: "table.Sno",
      key: "id",
      show: true,
    },
    {
      id: "table.building",
      key: "BuildingName",
      show: false,
    },
    {
      id: "table.unitID",
      key: "UnitNo",
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
      id: "table.tenantname",
      key: "TenantName",
      show: false,
    },
  ];

  const formActionsContract = {
    apply: true,
  };

  const getChangedContractPage = (newPage) => {
    setContractPage(newPage);
  };

  const style = {
    position: "absolute",
    zIndex: 1,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: "80vh",
    maxWidth: "100%",
    bgcolor: "transparent",
    border: "none",
    pt: 0,
    px: 0,
    pb: 0,
    borderRadius: "0",
  };

  const getDrillDown = async () => {
    setLoading(true);

    if (parameter.type === "payment") {
      let req = {
        card_name: parameter.cardName,
        time_key: reqData.time_key,
        owner_id: reqData.owner_id,
        building_id: reqData.building_id,
        tenant_id: reqData.tenant_id,
        month_id: reqData.month_id,
        date_from: reqData.date_from,
        date_to: reqData.date_to,
        page: Paymentpage,
      };
      let res = await postApi("drill_down_list_by_card", req);
      if (res.status === 200) {
        setDataListing(res.list);
        setPaymentPageCount(res.pagecount);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    if (parameter.type === "expence") {
      let req = {
        card_name: parameter.cardName,
        time_key: reqData.time_key,
        owner_id: reqData.owner_id,
        building_id: reqData.building_id,
        tenant_id: reqData.tenant_id,
        month_id: reqData.month_id,
        date_from: reqData.date_from,
        date_to: reqData.date_to,
        page: expensePage,
      };
      let res = await postApi("drill_down_list_by_card", req);
      if (res.status === 200) {
        setDataListing(res.list);
        setTotalExpensePage(res.pagecount);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    if (parameter.type === "request") {
      let req = {
        card_name: parameter.cardName,
        time_key: reqData.time_key,
        owner_id: reqData.owner_id,
        building_id: reqData.building_id,
        tenant_id: reqData.tenant_id,
        month_id: reqData.month_id,
        date_from: reqData.date_from,
        date_to: reqData.date_to,
        page: requestPage,
      };
      let res = await postApi("drill_down_list_by_card", req);
      if (res.status === 200) {
        setDataListing(res.list);
        setTotalRequestPage(res.pagecount);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    if (parameter.type === "contract") {
      let req = {
        page: contractPage,
      };
      let res = await postApi("drill_down_list_contract_expiring2m", req);
      if (res.status === 200) {
        setDataListing(res.list);
        setTotalContractPage(res.pagecount);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const getExcelContractExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_contract_expiring2m?pm_id=${PmID}`;
    a.click();
  };

  const getExcelOpenRequestExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_card_open_request?pm_id=${PmID}&time_key=${reqData.time_key}&month_id=${reqData.month_id}&owner_id=${reqData.owner_id}&building_id=${reqData.building_id}&tenant_id=${reqData.tenant_id}&date_from=${reqData.date_from}&date_to=${reqData.date_to}`;
    a.click();
  };

  const getExcelClosedRequestExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_card_closed_request?pm_id=${PmID}&time_key=${reqData.time_key}&month_id=${reqData.month_id}&owner_id=${reqData.owner_id}&building_id=${reqData.building_id}&tenant_id=${reqData.tenant_id}&date_from=${reqData.date_from}&date_to=${reqData.date_to}`;
    a.click();
  };

  const getExcelExpenseExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_card_maintenance_expense?pm_id=${PmID}&time_key=${reqData.time_key}&month_id=${reqData.month_id}&owner_id=${reqData.owner_id}&building_id=${reqData.building_id}&tenant_id=${reqData.tenant_id}&date_from=${reqData.date_from}&date_to=${reqData.date_to}`;
    a.click();
  };

  const getExcelUpcomingPaymentExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_card_upcoming_payment?pm_id=${PmID}&time_key=${reqData.time_key}&month_id=${reqData.month_id}&owner_id=${reqData.owner_id}&building_id=${reqData.building_id}&tenant_id=${reqData.tenant_id}&date_from=${reqData.date_from}&date_to=${reqData.date_to}`;
    a.click();
  };

  const getExcelOverduePaymentExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_card_overdue_payment?pm_id=${PmID}&time_key=${reqData.time_key}&month_id=${reqData.month_id}&owner_id=${reqData.owner_id}&building_id=${reqData.building_id}&tenant_id=${reqData.tenant_id}&date_from=${reqData.date_from}&date_to=${reqData.date_to}`;
    a.click();
  };

  const getExcelSettledPaymentExport = () => {
    const a = document.createElement("a");
    a.target = "_blank";
    a.href = `${BaseUrl}excel_export_card_settled_payment?pm_id=${PmID}&time_key=${reqData.time_key}&month_id=${reqData.month_id}&owner_id=${reqData.owner_id}&building_id=${reqData.building_id}&tenant_id=${reqData.tenant_id}&date_from=${reqData.date_from}&date_to=${reqData.date_to}`;
    a.click();
  };

  useEffect(() => {
    getDrillDown();
  }, [contractPage, requestPage, Paymentpage, expensePage]);

  return (
    <div>
      <Modal
        backdrop="static"
        size="lg"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Box sx={style}>
          <ModalWrap Dir={Dir}>
            <span className="cross-btn" onClick={onHide}>
              <i className="icon-cross" />
            </span>
            <ModalLabel Dir={Dir} className="d-flex justify-content-center">
              {parameter.heading + " " + parameter.header}
            </ModalLabel>

            {parameter.type !== "contract" && (
              <div className="d-flex justify-content-around">
                <div className="my-2">
                  <IntlMassage id="dashboard.card.sortBy" />
                </div>
                <DrillDownSortParameters>
                  {reqData.month_id !== 0 && (
                    <InfoWrapper>
                      <InfoLabel>
                        <IntlMassage id="dashboard.card.months" />
                      </InfoLabel>
                      <InfoValue>{reqData.month_id}</InfoValue>
                    </InfoWrapper>
                  )}

                  {reqData.time_key === "date_range" && (
                    <InfoWrapper>
                      <InfoLabel>
                        <IntlMassage id="table.date" />
                      </InfoLabel>
                      <InfoValue>
                        {reqData.date_from + " "}
                        <span className="m-0" style={{ color: "red" }}>
                          <IntlMassage id="dashboard.card.to" />
                        </span>
                        {" " + reqData.date_to}
                      </InfoValue>
                    </InfoWrapper>
                  )}

                  <InfoWrapper>
                    <InfoLabel>
                      <IntlMassage id="dashboard.card.Buildings" />
                    </InfoLabel>
                    {buildingName === null ? (
                      <InfoValue>
                        <IntlMassage id="button.All" />
                      </InfoValue>
                    ) : (
                      <InfoValue>{buildingName.name}</InfoValue>
                    )}
                  </InfoWrapper>

                  <InfoWrapper>
                    <InfoLabel>
                      <IntlMassage id="dashboard.card.Tenants" />
                    </InfoLabel>
                    {tenantName === null ? (
                      <InfoValue>
                        <IntlMassage id="button.All" />
                      </InfoValue>
                    ) : (
                      <InfoValue>{tenantName.name}</InfoValue>
                    )}
                  </InfoWrapper>
                  <InfoWrapper>
                    <InfoLabel>
                      <IntlMassage id="dashboard.card.Owner" />
                    </InfoLabel>
                    {ownerName === null ? (
                      <InfoValue>
                        <IntlMassage id="button.All" />
                      </InfoValue>
                    ) : (
                      <InfoValue>{ownerName.name}</InfoValue>
                    )}
                  </InfoWrapper>
                </DrillDownSortParameters>
              </div>
            )}

            <BorderLine></BorderLine>

            {loading ? (
              <NoData>
                <CircularProgress sx={{ color: `${parameter.background}` }} />
              </NoData>
            ) : (
              <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
                {parameter.type === "payment" && (
                  <div dir={Dir}>
                    {dataListing.length > 0 ? (
                      <>
                        <PaymentTable
                          action={formActions}
                          headerData={PaymentHeader}
                          startfrom={(Paymentpage - 1) * 10}
                          TableData={dataListing}
                        />
                        <PaginatedItems
                          currentPage={Paymentpage - 1}
                          getChangedPage={getChangedPaymentPage}
                          pageCount={PaymentpageCount}
                          itemsPerPage={10}
                        />
                        {parameter.cardName === "upcoming_payment" && (
                          <Button
                            variant="contained"
                            className="export-btn mx-2"
                            onClick={getExcelUpcomingPaymentExport}
                            color="primary"
                          >
                            <IntlMassage id="button.export" />
                          </Button>
                        )}

                        {parameter.cardName === "overdue_payment" && (
                          <Button
                            variant="contained"
                            className="export-btn mx-2"
                            onClick={getExcelOverduePaymentExport}
                            color="primary"
                          >
                            <IntlMassage id="button.export" />
                          </Button>
                        )}

                        {parameter.cardName === "settled_payment" && (
                          <Button
                            variant="contained"
                            className="export-btn mx-2"
                            onClick={getExcelSettledPaymentExport}
                            color="primary"
                          >
                            <IntlMassage id="button.export" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <NoData>
                        <IntlMassage id="msg.nodata" />
                      </NoData>
                    )}
                  </div>
                )}

                {parameter.type === "expence" && (
                  <div dir={Dir}>
                    {dataListing.length > 0 ? (
                      <>
                        <MiantanenceTable
                          action={ExpensesformActions}
                          headerData={ExpensesBuildingHeader}
                          startfrom={(expensePage - 1) * 10}
                          TableData={dataListing}
                        />
                        <PaginatedItems
                          currentPage={expensePage - 1}
                          pageCount={totalExpensePage}
                          getChangedPage={getChangedExpensePage}
                          itemsPerPage={10}
                        />
                        <Button
                          variant="contained"
                          className="export-btn mx-2"
                          onClick={getExcelExpenseExport}
                          color="primary"
                        >
                          <IntlMassage id="button.export" />
                        </Button>
                      </>
                    ) : (
                      <NoData>
                        <IntlMassage id="msg.nodata" />
                      </NoData>
                    )}
                  </div>
                )}

                {parameter.type === "request" && (
                  <div dir={Dir}>
                    {dataListing.length > 0 ? (
                      <>
                        <MiantanenceTable
                          action={RequestsformActions}
                          headerData={RequestsBuildingHeader}
                          startfrom={(requestPage - 1) * 10}
                          TableData={dataListing}
                        />
                        <PaginatedItems
                          currentPage={requestPage - 1}
                          pageCount={totalRequestPage}
                          getChangedPage={getChangedRequestPage}
                          itemsPerPage={10}
                        />
                        {parameter.cardName === "open_requests" && (
                          <Button
                            variant="contained"
                            className="export-btn mx-2"
                            onClick={getExcelOpenRequestExport}
                            color="primary"
                          >
                            <IntlMassage id="button.export" />
                          </Button>
                        )}
                        {parameter.cardName === "closed_requests" && (
                          <Button
                            variant="contained"
                            className="export-btn mx-2"
                            onClick={getExcelClosedRequestExport}
                            color="primary"
                          >
                            <IntlMassage id="button.export" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <NoData>
                        <IntlMassage id="msg.nodata" />
                      </NoData>
                    )}
                  </div>
                )}

                {parameter.type === "contract" && (
                  <div dir={Dir}>
                    {dataListing.length > 0 ? (
                      <>
                        <TableComponent
                          action={formActionsContract}
                          headerData={ContractHeader}
                          startfrom={
                            contractPage < 1 ? 0 : (contractPage - 1) * 10
                          }
                          TableData={dataListing}
                        />

                        <PaginatedItems
                          currentPage={contractPage - 1}
                          getChangedPage={getChangedContractPage}
                          pageCount={totalContractPage}
                          itemsPerPage={10}
                        />
                        <Button
                          variant="contained"
                          className="export-btn mx-2"
                          onClick={getExcelContractExport}
                          color="primary"
                        >
                          <IntlMassage id="button.export" />
                        </Button>
                      </>
                    ) : (
                      <NoData>
                        <IntlMassage id="msg.nodata" />
                      </NoData>
                    )}
                  </div>
                )}
              </div>
            )}
          </ModalWrap>
        </Box>
      </Modal>
    </div>
  );
}

const DrillDownSortParameters = styled.div`
  background: #e7eff5;
  margin: 10px 0;
  // width:100%;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  padding: 2px 20px;
  overflow: hidden;

  @media screen and (max-width: 992px) {
    overflow-x: scroll;
  }
`;

const InfoWrapper = styled.div`
  label {
    min-width: 90px;
    margin: 0 20px;
  }
  span {
    white-space: nowrap;
    margin: 0 20px;
  }
`;

const BorderLine = styled.div`
  width: 100%;
  height: 1px;
  background: #80808059;
  margin: 5px 0;
`;
