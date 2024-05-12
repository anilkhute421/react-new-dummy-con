import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box, ButtonBase, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { exportData } from "../../../export/Export";
import {
  DateIcon,
  FilterButton,
  InputDate,
  InputWrap,
  MyButton,
  SecondHeader,
  ThirdHeader,
} from "../../../GlobalStyle";
import PaginatedItems from "../../../pageCounter/Pagination";
import { getApi, postApi } from "../../../services/ApiMethod";
import { searchExpense } from "../../../store/action/ExpenseMaintenance";
import { FilterIcon } from "../../../utils/images";
import IntlMassage from "../../../utils/IntlMassage";
import { Icon, Input, NoData, TableLoaderWrap, TableWrap } from "../../Styles";
import MiantanenceTable from "../MiantanenceTable";
import { FilterStatusSelect, FilterStatusText } from "../Style";
import moment from "moment";
import styled from "@emotion/styled";
import { useIntl } from "react-intl";

export default function MaintanenceExpenses() {
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [listingExpense, setListingExpense] = useState([]);
  const [expensePage, setExpensePage] = useState(1);
  const [totalExpensePage, setTotalExpensePage] = useState([]);
  const [expenseError, setExpenseError] = useState(null);
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const dispatch = useDispatch("");
  const keyword = useSelector((state) => state.ExpenseMaintenance.keyword);
  const [filterStatus, setFilterStatus] = useState(0);
  const [filters, setFilters] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [expenseList, setExpenseList] = useState([]);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const intl = useIntl();

  var arrayForAll = [
    {
      expenseslines_name: intl.formatMessage({ id: "button.All" }),
      id: 0,
    },
  ];

  const getExpensesListing = async () => {
    setLoading(true);
    let d = {
      page: expensePage,
      expense_line_id: filterStatus,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
      amount_from: amountFrom === "" ? null : amountFrom,
      amount_to: amountTo === "" ? null : amountTo,
    };
    let res = await postApi("expenses_list_by_company_id", d);

    if (res.status === 200) {
      setListingExpense(res.data);
      setTotalExpensePage(res.pagecount);
      setLoading(false);
    } else {
      setExpenseError(res.message);
      setLoading(false);
    }
  };

  const getChangedPage = (newpage) => {
    setExpensePage(newpage);
  };

  const search = (word) => {
    dispatch(searchExpense(word));
  };

  useEffect(() => {
    dispatch(searchExpense(""));
  }, []);

  const getSearchExpense = async (page) => {
    setLoading(true);
    let req = {
      search_key: keyword,
      page: page,
      expense_line_id: filterStatus,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
      amount_from: amountFrom === "" ? null : amountFrom,
      amount_to: amountTo === "" ? null : amountTo,
    };
    let res = await postApi("search_maintanence_expenses", req);
    if (res.status === 200) {
      setListingExpense(res.data);
      setTotalExpensePage(res.pagecount);
      setLoading(false);
    } else {
      setExpenseError(res.message);
      setLoading(false);
    }
  };

  const getExpenseList = async () => {
    let res = await getApi("expenes_dropdown");
    if (res.status === 200) {
      setExpenseList(res.data);
    }
  };

  const getAppendArray = () => {
    arrayForAll.push(...expenseList);
  };
  getAppendArray();

  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };

  const AmountFrom = (e) => {
    setAmountFrom(e.target.value);
  };
  const AmountTo = (e) => {
    setAmountTo(e.target.value);
  };

  const resetFilters = () => {
    setFilterStatus(0);
    setAmountFrom("");
    setAmountTo("");
    setFromDate(null);
    setToDate(null);
  };

  useEffect(() => {
    if (keyword !== "") {
      getSearchExpense(1);
    } else {
      getExpensesListing(expensePage);
    }
  }, [keyword]);

  useEffect(() => {
    if (filterStatus) {
      getExpensesListing(1);
      setExpensePage(1);
    } else {
      getExpensesListing(expensePage);
    }
  }, [filterStatus]);

  useEffect(() => {
    if (fromDate) {
      getExpensesListing(1);
      setExpensePage(1);
    } else {
      getExpensesListing(expensePage);
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      getExpensesListing(1);
      setExpensePage(1);
    } else {
      getExpensesListing(expensePage);
    }
  }, [toDate]);

  useEffect(() => {
    if (amountTo) {
      getExpensesListing(1);
      setExpensePage(1);
    } else {
      getExpensesListing(expensePage);
    }
  }, [amountTo]);

  useEffect(() => {
    if (amountFrom) {
      getExpensesListing(1);
      setExpensePage(1);
    } else {
      getExpensesListing(expensePage);
    }
  }, [amountFrom]);

  useEffect(() => {
    if (keyword !== "") {
      getSearchExpense(expensePage);
    } else {
      getExpensesListing(expensePage);
      getExpenseList();
    }
  }, [expensePage]);

  // This is Data Expenses table

  const ExpensesBuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
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
      id: "table.reqid",
      key: "request_code",
      show: false,
    },
    {
      id: "table.expenses",
      key: "expenses",
      show: false,
    },
    {
      id: "table.amount",
      key: "amount",
      show: false,
    },
    {
      id: "table.date",
      key: "date",
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
    edit: Roles?.expense_edit === 1 ? true : false,
    delete: Roles?.expense_delete === 1 ? true : false,
    pathname: "/home/maintanence/expenses/view",
    pathnameEdit: "/home/maintanence/expenses/edit",
  };

  const buttonStyle = {
    color: "#878787",
    padding: "0 10px",
    fontWeight: "500",
    "&:hover": {
      color: "red",
    },
  };
  return (
    <>
      <SecondHeader Dir={dir}>
        <div className="mobile d-flex flex-row align-items-center">
          <InputWrap>
            <Input
              className="search-input"
              placeholder={intl.formatMessage({ id: "placeholder.search" })}
              type="text"
              value={keyword}
              onChange={(e) => search(e.target.value)}
            />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton
            className="export-btn"
            onClick={() => exportData(`${Pm_id}/maintenance_expenses`)}
          >
            <IntlMassage id="button.export" />
          </MyButton>
        </div>

        <div className="d-flex flex-row align-items-center">
          {Roles.expense_create === 1 && (
            <MyButton
              className="m-2"
              style={{ background: "rgba(46, 139, 192, 1)" }}
              onClick={() => history.push("/home/maintanence/expenses/add")}
            >
              <IntlMassage id="button.addexpenses"></IntlMassage>
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
              <IntlMassage id="filters.status" />
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged}
              value={filterStatus}
              className="d-flex text-center "
              Dir={dir}
            >
              {arrayForAll.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.expenseslines_name}
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
                      />
                      <DateIcon Dir={dir}>{InputProps?.endAdornment}</DateIcon>
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>

          <AmountWrapper className="amount">
            <FilterStatusText>
              <IntlMassage id="table.amount" />
            </FilterStatusText>

            <Input
              type="number"
              placeholder={intl.formatMessage({
                id: "filters.From",
              })}
              className="m-2"
              style={{
                textOverflow: "ellipsis",
              }}
              onChange={AmountFrom}
              value={amountFrom}
            />
            <Input
              type="number"
              placeholder={intl.formatMessage({
                id: "filters.To",
              })}
              className="m-2"
              style={{
                textOverflow: "ellipsis",
              }}
              onChange={AmountTo}
              value={amountTo}
            />
          </AmountWrapper>

          <ButtonBase sx={buttonStyle} onClick={resetFilters}>
            <IntlMassage id="filters.Reset" />
          </ButtonBase>
        </ThirdHeader>
      )}

      {loading ? (
        <TableLoaderWrap>
          <CircularProgress />
        </TableLoaderWrap>
      ) : listingExpense.length > 0 ? (
        <TableWrap>
          <MiantanenceTable
            action={ExpensesformActions}
            headerData={ExpensesBuildingHeader}
            startfrom={(expensePage - 1) * 10}
            TableData={listingExpense}
          />
          <PaginatedItems
            currentPage={expensePage - 1}
            pageCount={totalExpensePage}
            getChangedPage={getChangedPage}
            itemsPerPage={10}
          />
        </TableWrap>
      ) : expenseError ? (
        <TableWrap>
          <NoData>{expenseError}</NoData>
        </TableWrap>
      ) : (
        <TableWrap>
          <NoData>
            <IntlMassage id="msg.nodata" />
          </NoData>
        </TableWrap>
      )}
    </>
  );
}

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 10px;
`;
