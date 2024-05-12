import { Box, ButtonBase, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  DateIcon,
  FilterButton,
  InputDate,
  InputWrap,
  MyButton,
  SecondHeader,
  ThirdHeader,
} from "../../GlobalStyle";
import PaginatedItems from "../../pageCounter/Pagination";
import { postApi } from "../../services/ApiMethod";
import IntlMassage from "../../utils/IntlMassage";
import {
  Icon,
  Input,
  Label,
  LabelBox,
  NoData,
  PageLabel,
  PageWrap,
  TableWrap,
} from "../Styles";
import PaymentTable from "./PaymentTable";
import { paymentSearch } from "../../store/action/PaymentSearch";
import { exportData } from "../../export/Export";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { FilterIcon } from "../../utils/images";
import moment from "moment";
import { useIntl } from "react-intl";

export default function Payments() {
  const intl = useIntl();

  const MethodFilter = [
    {
      status: intl.formatMessage({ id: "button.All" }),
      id: 2,
    },
    {
      status: intl.formatMessage({ id: "label.manual" }),
      id: 0,
    },
    {
      status: intl.formatMessage({ id: "label.cheque" }),
      id: 1,
    },
  ];

  const FilterStatus = [
    {
      status: intl.formatMessage({ id: "button.All" }),
      id: 0,
    },
    {
      status: intl.formatMessage({ id: "payment.upcomingPayment" }),
      id: 1,
    },
    {
      status: intl.formatMessage({ id: "payment.voided" }),
      id: 2,
    },
    {
      status: intl.formatMessage({ id: "payment.Settled" }),
      id: 3,
    },
    {
      status: intl.formatMessage({ id: "payment.overdue" }),
      id: 4,
    },
    {
      status: intl.formatMessage({ id: "payment.chequeReturned" }),
      id: 5,
    },
    {
      status: intl.formatMessage({ id: "payment.paymentInDefault" }),
      id: 6,
    },
  ];

  const history = useHistory();
  const params = useParams();
  const [page, setPage] = useState(params.page);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const dir = useSelector((state) => state.Language.dir);
  const keyword = useSelector((state) => state.Payment.keyword);
  const [filterMethod, setFilterMethod] = useState(MethodFilter[0].id);
  const [filterStatus, setFilterStatus] = useState(FilterStatus[0].id);
  const [filters, setFilters] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const Roles = useSelector((state) => state.Auth.data.role_details);

  const search = (word) => {
    dispatch(paymentSearch(word));
  };

  const getPaymentBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      payment_type: filterMethod,
      payment_status: filterStatus,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
    };
    let res = await postApi(`search_payment_list`, d);
    if (res.status === 200) {
      setData(res.data);
      setPageCount(res.pagecount);
      setLoading(false);
    } else {
      setData([]);
      setLoading(false);
    }
  };

  const PaymentHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.amount",
      key: "amount",
      show: false,
    },
    {
      id: "table.tenantname",
      key: "tenant_name",
      show: false,
    },
    {
      id: "table.building",
      key: "building_name",
      show: false,
    },
    {
      id: "table.unitno",
      key: "unit_no",
      show: false,
    },
    {
      id: "table.paymentdate",
      key: "payment_date",
      show: false,
    },
    {
      id: "table.paymentStatus",
      key: "status",
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
    edit: Roles.payment_management_edit === 1 ? true : false,
    delete: Roles.payment_management_delete === 1 ? true : false,
    pathnameEdit: "/home/payments/edit",
  };

  const getChangedPage = (newPage) => {
    setPage(newPage);
  };

  const getPaymentListing = async (p) => {
    setLoading(true);
    let d = {
      page: p,
      payment_type: filterMethod,
      payment_status: filterStatus,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
    };
    let res = await postApi("payment_list_by_company_id", d);
    if (res.status === 200) {
      setLoading(false);
      setData(res.data);
      setPageCount(res.pagecount);
    } else {
      setLoading(false);
    }
  };

  const valueChanged = (e) => {
    setFilterMethod(e.target.value);
  };
  const valueChanged1 = (e) => {
    setFilterStatus(e.target.value);
  };

  const resetFilters = () => {
    setFilterMethod(MethodFilter[0].id);
    setFilterStatus(FilterStatus[0].id);
    setFromDate(null);
    setToDate(null);
  };

  useEffect(() => {
    dispatch(paymentSearch(""));
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      getPaymentBySearch(1);
    } else {
      getPaymentListing(params.page);
    }
  }, [keyword]);

  useEffect(() => {
    if (filterMethod) {
      getPaymentListing(1);
      setPage(1);
    } else {
      getPaymentListing(params.page);
    }
  }, [filterMethod]);

  useEffect(() => {
    if (filterStatus) {
      getPaymentListing(1);
      setPage(1);
    } else {
      getPaymentListing(params.page);
    }
  }, [filterStatus]);

  useEffect(() => {
    if (fromDate) {
      getPaymentListing(1);
      setPage(1);
    } else {
      getPaymentListing(params.page);
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      getPaymentListing(1);
      setPage(1);
    } else {
      getPaymentListing(params.page);
    }
  }, [toDate]);

  useEffect(() => {
    if (keyword !== "") {
      getPaymentBySearch(params.page);
    } else {
      getPaymentListing(params.page);
    }
  }, [params.page]);

  useEffect(() => {
    history.replace(`/home/payments/${page}`);
  }, [page]);

  const buttonStyle = {
    color: "#878787",
    padding: "0 10px",
    fontWeight: "500",
    "&:hover": {
      color: "red",
    },
  };

  return (
    <PageWrap>
      <PageLabel>
        <LabelBox>
          <Label>
            <IntlMassage id="payment.paymentManagement" />
          </Label>
        </LabelBox>
      </PageLabel>
      <SecondHeader Dir={dir}>
        <div className="mobile d-flex flex-row align-items-center">
          <InputWrap>
            <Input
              value={keyword}
              className="search-input"
              placeholder={intl.formatMessage({ id: "placeholder.search" })}
              onChange={(e) => search(e.target.value)}
              type="text"
            />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton
            className="export-btn"
            onClick={() => exportData(`${Pm_id}/payments`)}
          >
            <IntlMassage id="button.export" />
          </MyButton>
        </div>

        <div>
          {Roles.payment_management_create === 1 && (
            <MyButton
              onClick={() => history.push("/home/payments/addpayments")}
              Dir={dir}
            >
              <IntlMassage id="button.addpayments" />
            </MyButton>
          )}

          <FilterButton onClick={() => setFilters(!filters)} Dir={dir}>
            <img src={FilterIcon} alt="" />
            <IntlMassage id="button.filters" />
          </FilterButton>
        </div>
      </SecondHeader>

      {filters && (
        <ThirdHeader>
          <div className="d-flex flex-row m-2">
            <FilterStatusText>
              <IntlMassage id="filters.method" />
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged}
              value={filterMethod}
              className="d-flex text-center "
              Dir={dir}
            >
              {MethodFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          <div className="d-flex flex-row m-2">
            <FilterStatusText>
              <IntlMassage id="filters.status" />
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged1}
              value={filterStatus}
              className="d-flex text-center "
              Dir={dir}
            >
              {FilterStatus.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FilterStatusText>
                <IntlMassage id="filters.Choosedate" />
              </FilterStatusText>
              <div style={{ margin: "0 10px" }}>
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
                        <DateIcon Dir={dir}>
                          {InputProps?.endAdornment}
                        </DateIcon>
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              </div>

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
                        placeholder={intl.formatMessage({
                          id: "filters.To",
                        })}
                        readOnly
                      />
                      <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <ButtonBase sx={buttonStyle} onClick={resetFilters}>
            <IntlMassage id="filters.Reset" />
          </ButtonBase>
        </ThirdHeader>
      )}

      <TableWrap>
        {loading ? (
          <NoData>
            <CircularProgress />
          </NoData>
        ) : data.length > 0 ? (
          <>
            <PaymentTable
              action={formActions}
              headerData={PaymentHeader}
              startfrom={params.page < 1 ? 0 : (params.page - 1) * 10}
              TableData={data}
            />
            <PaginatedItems
              currentPage={page - 1}
              getChangedPage={getChangedPage}
              pageCount={pageCount}
            />
          </>
        ) : (
          <NoData>
            <IntlMassage id="msg.nodata" />
          </NoData>
        )}
      </TableWrap>
    </PageWrap>
  );
}
