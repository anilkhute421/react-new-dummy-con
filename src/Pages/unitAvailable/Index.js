import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { InputWrap, SecondHeader } from "../../GlobalStyle";
import PaginatedItems from "../../pageCounter/Pagination";
import IntlMassage from "../../utils/IntlMassage";
import {
  Icon,
  Input,
  Label,
  LabelBox,
  NoData,
  PageHeader,
  PageWrap,
  TableWrap,
} from "../Styles";
import { ListWrap, UnitWrap } from "./Style";
import UTable from "./UTable";
import { postApi } from "../../services/ApiMethod";
import { exportData } from "../../export/Export";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";

export default function UnitAvailable() {
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const intl = useIntl();

  const UnitAvailableFilter = [
    {
      status: intl.formatMessage({ id: "button.All" }),
      id: 0,
    },
    {
      status: intl.formatMessage({ id: "button.active" }),
      id: 1,
    },
    {
      status: intl.formatMessage({ id: "button.inactive" }),
      id: 2,
    },
  ];

  const history = useHistory();
  const params = useParams();
  const dir = useSelector((state) => state.Language.dir);
  const [data, setData] = useState([]);
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(params.page);
  const [keyword, setKeyword] = useState("");
  const getChangedPage = (newPage) => {
    setPage(newPage);
  };
  const [filterStatus, setFilterStatus] = useState(UnitAvailableFilter[0].id);

  const viewUnitListing = async (p) => {
    setLoading(true);
    let d = {
      page: p,
      filter_by_status: filterStatus,
    };
    let res = await postApi("get_available_units_listing", d);
    if (res.status === 200) {
      setLoading(false);
      setData(res.data);
      setPageCount(res.pagecount);
    } else {
      setLoading(false);
    }
  };

  const getUnitBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      filter_by_status: filterStatus,
    };

    let res = await postApi("search_available_units", d);
    if (res.status === 200) {
      setLoading(false);
      setData(res.data);
      setPageCount(res.pagecount);
    } else {
      setLoading(false);
    }
  };

  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };
  useEffect(() => {
    if (keyword) {
      getUnitBySearch(1);
    setPage(1)
    } else {
      viewUnitListing(params.page);
    }
  }, [keyword]);

  useEffect(()=>{
    if(filterStatus){
      viewUnitListing(1)
    }else {
      viewUnitListing(params.page);
    }
    setPage(1)
  },[filterStatus])



  useEffect(() => {
    if (keyword !== "") {
      getUnitBySearch(params.page);
    } else {
      viewUnitListing(params.page);
    }
  }, [params.page, filterStatus]);

  useEffect(() => {
    history.replace(`/home/unit-available/${page}`);
  }, [page]);
  return (
    <PageWrap>
      <div>
        <PageHeader>
          <LabelBox>
            <Label>
              <IntlMassage id="units.management" />
            </Label>
          </LabelBox>
        </PageHeader>
        <SecondHeader Dir={dir}>
          <div className="mobile d-flex flex-row align-items-center">
            <InputWrap Dir={dir}>
              <Input
                className="search-input"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={intl.formatMessage({ id: "placeholder.search" })}
                type="text"
              />
              <Icon className="icon-search"></Icon>
            </InputWrap>

            <Button
              variant="contained"
              color="primary"
              onClick={() => exportData(`${Pm_id}/available_units`)}
              className="export-btn mx-2"
            >
              <IntlMassage id="button.export" />
            </Button>
          </div>

          <div className="d-flex flex-row m-2">
            <FilterStatusText>{intl.formatMessage({ id: "button.statusbyfilter" })}</FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged}
              value={filterStatus}
              className="d-flex text-center "
              Dir={dir}
            >
              {UnitAvailableFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          {Roles.avail_unit_create === 1 && (
            <Button
              color="primary"
              variant="contained"
              className="my-2"
              onClick={() => history.push("/home/unit-available/add")}
            >
              <IntlMassage id="button.addnewunit" />
            </Button>
          )}
        </SecondHeader>
        <TableWrap>
          <UnitWrap>
            <ListWrap>
              {loading ? (
                <NoData>
                  <CircularProgress />
                </NoData>
              ) : data && data.length > 0 ? (
                <div>
                  {data.map((item, idx) => (
                    <UTable data={item} key={idx} />
                  ))}
                  <PaginatedItems
                    currentPage={params.page - 1}
                    pageCount={pageCount}
                    getChangedPage={getChangedPage}
                    itemsPerPage={10}
                  />
                </div>
              ) : (
                <NoData>
                  <IntlMassage id="msg.nodata" />
                </NoData>
              )}
            </ListWrap>
          </UnitWrap>
        </TableWrap>
      </div>
    </PageWrap>
  );
}
