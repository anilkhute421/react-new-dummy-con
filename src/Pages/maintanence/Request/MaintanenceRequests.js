import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  DateIcon,
  FilterButton,
  InputDate,
  InputWrap,
  MyButton,
  SecondHeader,
  ThirdHeader,
} from "../../../GlobalStyle";
import { Icon, Input, NoData, TableLoaderWrap, TableWrap } from "../../Styles";
import IntlMassage from "../../../utils/IntlMassage";
import { FilterStatusText, FilterStatusSelect , UnReadFilter } from "../Style";
import MiantanenceTable from "../MiantanenceTable";
import PaginatedItems from "../../../pageCounter/Pagination";
import { getApi, postApi } from "../../../services/ApiMethod";
import { ButtonBase, CircularProgress } from "@mui/material";
import { exportData } from "../../../export/Export";
import { searchRequest } from "../../../store/action/RequestMaintenance";
import { FilterIcon } from "../../../utils/images";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Box } from "@mui/system";
import moment from "moment";
import { useIntl } from "react-intl";
import Toggle from "react-toggle";

export default function MaintanenceRequests() {
  const intl = useIntl();

  const request_Status = [
    {
      request: intl.formatMessage({ id: "button.All" }),
      id: 0,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.raised" }),
      id: 1,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.assigned" }),
      id: 2,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.completed" }),
      id: 3,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.hold" }),
      id: 4,
    },
    {
      request: intl.formatMessage({ id: "Maintenance.request.canceled" }),
      id: 5,
    },
  ];

  const requestForFilter = [
    {
      maitinance_request_name: intl.formatMessage({ id: "button.All" }),
      id: 0,
    },
  ];

  const [listingRequest, setListingRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [requestPage, setRequestPage] = useState(1);
  const [totalRequestPage, setTotalRequestPage] = useState(0);
  const [reqStatusValue, setReqStatusValue] = useState(request_Status[0].id);
  const [requestForValue, setRequestForValue] = useState(
    requestForFilter[0].id
  );
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const dir = useSelector((state) => state.Language.dir);
  const history = useHistory();
  const dispatch = useDispatch("");
  const keyword = useSelector((state) => state.RequestMaintenance.keyword);
  const [filters, setFilters] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [requestFor, setRequestFor] = useState([]);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const [unReadMessage, setUnReadMessage] = useState(0);
  const [unReadMessageListing, setUnReadMessageListing] = useState([]);
  const [unReadPage, setUnReadPage] = useState(1);
  const [totalunReadPage, setTotalunReadPage] = useState(1);
  const [unReadFilter , setUnReadFilter] = useState('bycount')

  const getAppendArray = () => {
    requestForFilter.push(...requestFor);
  };
  getAppendArray();

  const request_For = async () => {
    let res = await getApi(`maintance_request`);
    if (res.status === 200) {
      setRequestFor(res.data);
    }
  };

  // This is Data of request Table
  const RequestsBuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.reqby",
      key: "requested_by",
      show: false,
    },
    {
      id: "table.reqid",
      key: "request_code",
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
      id: "table.reqfor",
      key: "request_for",
      show: false,
    },
    {
      id: "table.status",
      key: "status",
      show: false,
    },
    {
      id: "table.reqdate",
      key: "request_date",
      show: false,
    },
    {
      id: "table.experts",
      key: "expert",
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
    edit: Roles?.maintenance_req_edit === 1 ? true : false,
    pathname: "/home/maintanence/requests/view",
    pathnameEdit: "/home/maintanence/requests/edit",
    moduleName: "Request",
  };

  const getRequestListing = async (p) => {
    setLoading(true);
    let d = {
      page: p,
      filter_by_status: reqStatusValue,
      maintenance_request_for_id: requestForValue,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
    };
    let res = await postApi("maintanence_request_list_by_company_id", d);

    if (res.status === 200) {
      setListingRequest(res.data);
      setTotalRequestPage(res.pagecount);
      setLoading(false);
    } else {
      setRequestError(res.message);
      setLoading(false);
    }
  };

  const getChangedPage = (newpage) => {
    setRequestPage(newpage);
  };

  const getChangedunReadPage = (newpage) => {
    setUnReadPage(newpage);
  };

  const valueChanged = (e) => {
    setReqStatusValue(e.target.value);
  };

  const valueChangedunReadMessage = (e) => {
    setUnReadFilter(e.target.value);
  };

  const valueChanged1 = (e) => {
    setRequestForValue(e.target.value);
  };
  const search = (word) => {
    dispatch(searchRequest(word));
  };
  useEffect(() => {
    dispatch(searchRequest(""));
  }, []);

  const getRequestBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      filter_by_status: reqStatusValue,
      maintenance_request_for_id: requestForValue,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
    };

    let res = await postApi("search_maintanence_request", d);

    if (res.status === 200) {
      setListingRequest(res.data);
      setLoading(false);
      setTotalRequestPage(res.pagecount);
    } else {
      setRequestError(res.message);
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setReqStatusValue(request_Status[0].id);
    setRequestForValue(requestForFilter[0].id);
    setFromDate(null);
    setToDate(null);
  };

  const getUnreadmessage = async () => {
    let req = {
      page: 1,
      filter_by_status: 0,
      maintenance_request_for_id: 0,
      dropdown : unReadFilter
    };
    let res = await postApi("unread_comment_maintenance_req_list", req);
    if (res.status === 200) {
      setUnReadMessageListing(res.data);
      setTotalunReadPage(res.pagecount);
      setLoading(false);
    } else {
      setRequestError(res.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUnreadmessage();
  }, [unReadMessage , unReadFilter , unReadPage]);

  useEffect(() => {
    if (keyword !== "") {
      getRequestBySearch(1);
    } else {
      getRequestListing(requestPage);
    }
  }, [keyword]);

  useEffect(() => {
    if (reqStatusValue) {
      getRequestListing(1);
      setRequestPage(1);
    } else {
      getRequestListing(requestPage);
    }
  }, [reqStatusValue]);

  useEffect(() => {
    if (requestForValue) {
      getRequestListing(1);
      setRequestPage(1);
    } else {
      getRequestListing(requestPage);
    }
  }, [requestForValue]);

  useEffect(() => {
    if (fromDate) {
      getRequestListing(1);
      setRequestPage(1);
    } else {
      getRequestListing(requestPage);
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      getRequestListing(1);
      setRequestPage(1);
    } else {
      getRequestListing(requestPage);
    }
  }, [toDate]);

  useEffect(() => {
    if (keyword !== "") {
      getRequestBySearch(requestPage);
    } else {
      getRequestListing(requestPage);
      request_For();
    }
  }, [requestPage]);

  const handleToggle = (payload) => {
  
    if (payload.target.checked) {
      setUnReadMessage(1);
    } else {
      setUnReadMessage(0);
    }
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
              className="mt-0"
              placeholder={intl.formatMessage({ id: "placeholder.search" })}
              type="text"
              value={keyword}
              onChange={(e) => search(e.target.value)}
            />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton
            className="export-btn"
            onClick={() => exportData(`${Pm_id}/maintenance_request`)}
          >
            <IntlMassage id="button.export" />
          </MyButton>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontWeight: "500", padding: "0 5px 5px 0"}}>
            <IntlMassage id="label.unReadMsg" />
          </span>
          <label className="switch-toggle">
            <Toggle
              icons={false}
              checked={unReadMessage === 0 ? false : true}
              value={setUnReadMessage === 0 ? false : true}
              onChange={handleToggle}
            />
          </label>

          {unReadMessage === 1 && (
            <UnReadFilter
              onChange={valueChangedunReadMessage}
              value={unReadFilter}
              className="d-flex text-center "
              Dir={dir}
            >
              <option value={'bycount'}>By Count</option>
              <option value={'bydate'} >By Date</option>
            </UnReadFilter>
          )}

          {Roles.maintenance_req_create === 1 && (
            <MyButton
              className="m-2"
              onClick={() => history.push("/home/maintanence/createrequest")}
              Dir={dir}
            >
              <IntlMassage id="button.createrequest" />
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
              value={reqStatusValue}
              className="d-flex text-center "
              Dir={dir}
            >
              {request_Status.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.request}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          <div className="d-flex flex-row m-2">
            <FilterStatusText>
              <IntlMassage id="table.reqfor" />
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged1}
              value={requestForValue}
              className="d-flex text-center "
              Dir={dir}
            >
              {requestForFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.maitinance_request_name}
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

          <ButtonBase sx={buttonStyle} onClick={resetFilters}>
            <IntlMassage id="filters.Reset" />
          </ButtonBase>
        </ThirdHeader>
      )}

      {unReadMessage === 0 ? (
        <>
          {loading ? (
            <TableWrap>
              <TableLoaderWrap>
                <CircularProgress />
              </TableLoaderWrap>
            </TableWrap>
          ) : listingRequest.length > 0 ? (
            <TableWrap>
              <MiantanenceTable
                action={RequestsformActions}
                headerData={RequestsBuildingHeader}
                startfrom={(requestPage - 1) * 10}
                TableData={listingRequest}
              />
              <PaginatedItems
                currentPage={requestPage - 1}
                pageCount={totalRequestPage}
                getChangedPage={getChangedPage}
                itemsPerPage={10}
              />
            </TableWrap>
          ) : requestError ? (
            <TableWrap>
              <NoData>{requestError}</NoData>
            </TableWrap>
          ) : (
            <TableWrap>
              <NoData>
                <IntlMassage id="msg.nodata" />
              </NoData>
            </TableWrap>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <TableWrap>
              <TableLoaderWrap>
                <CircularProgress />
              </TableLoaderWrap>
            </TableWrap>
          ) : unReadMessageListing.length > 0 ? (
            <TableWrap>
              <MiantanenceTable
                action={RequestsformActions}
                headerData={RequestsBuildingHeader}
                startfrom={(unReadPage - 1) * 10}
                TableData={unReadMessageListing}
              />
              <PaginatedItems
                currentPage={unReadPage - 1}
                pageCount={totalunReadPage}
                getChangedPage={getChangedunReadPage}
                itemsPerPage={10}
              />
            </TableWrap>
          ) : requestError ? (
            <TableWrap>
              <NoData>{requestError}</NoData>
            </TableWrap>
          ) : (
            <TableWrap>
              <NoData>
                <IntlMassage id="msg.nodata" />
              </NoData>
            </TableWrap>
          )}
        </>
      )}
    </>
  );
}



