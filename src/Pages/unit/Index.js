import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../components/Table";
import { useParams, useHistory } from "react-router-dom";
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
import { exportData } from "../../export/Export";
import { postApi } from "../../services/ApiMethod";
import { searchUnit } from "../../store/action/Search";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";
export default function UnitManagement() {
  const intl = useIntl()

  const UnitFilter = [
    {
      status: intl.formatMessage({ id: "button.All" }) ,
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

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(params.page);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const dir = useSelector((state) => state.Language.dir);
  const searchWord = useSelector((state) => state.Units.keyword);
  const [filterStatus, setFilterStatus] = useState(UnitFilter[0].id);
  const Roles = useSelector((state) => state.Auth.data.role_details);
  
  const BuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.unitno",
      key: "unit_no",
      show: false,
    },
    {
      id: "table.unitid",
      key: "unit_code",
      show: false,
    },
    {
      id: "table.buildingname",
      key: "building_name",
      show: false,
    },
    {
      id: "table.address",
      key: "address",
      show: false,
    },
    {
      id: "table.tenantname",
      key: "tenant_name",
      show: false,
    },
    {
      id: "table.status",
      key: "status",
      show: false,
    },
    {
      id: "table.action",
      key: "action",
      show: true,
    },
  ];

  const formActions = {
    apply: true,
    view: Roles.tenant_management_view? true: false,
    edit: Roles.units_management_edit? true: false,
    delete: Roles.units_management_delete? true: false,
    pathname: "/home/units/view",
    pathnameEdit: "/home/units/edit",
    deletepath: "delete_tenant_units",
    delete_key: "unit_id",
  };
  const getChangedPage = (newPage) => {
    setPage(newPage);
  };
  const addUnits = () => {
    history.push("/home/units/add");
  };
  const getUnitsList = async (p) => {
    setLoading(true);
    let d = {
      page: p,
      filter_by_status: filterStatus,
    };
    let res = await postApi("get_tenant_units_list", d);
    if (res.status === 200) {
      setLoading(false);
      setData(res.data);
      setPageCount(res.pagecount);
    } else {
      setLoading(false);
    }
  };
  const unitBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: searchWord,
      page: p,
      filter_by_status: filterStatus,
    };
    let res = await postApi("search_all_units", d);
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

  const search = (word) => {
    dispatch(searchUnit(word));
  };
  useEffect(() => {
    dispatch(searchUnit(""));
  }, []);

  useEffect(() => {
    if (searchWord !== "") {
      unitBySearch(1);
      setPage(1)
    } else {
      getUnitsList(params.page);
    }
  }, [searchWord]);

  useEffect(()=>{
    if(filterStatus){
      getUnitsList(1)
    }else {
      getUnitsList(params.page);
    }
    setPage(1)
  },[filterStatus])

  useEffect(() => {
    if (searchWord !== "") {
      unitBySearch(1);
    } else {
      getUnitsList(params.page);
    }
  }, [params.page]);

  useEffect(() => {
    history.push(`/home/units/${page}`);
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
            <InputWrap>
              <Input
                value={searchWord}
                onChange={(e) => search(e.target.value)}
                className="search-input"
                placeholder={intl.formatMessage({ id: "placeholder.search" })}
                type="text"
              />
              <Icon className="icon-search"></Icon>
            </InputWrap>
            <Button
              className="export-btn mx-2"
              onClick={() => exportData(`${Pm_id}/tenant_units`)}
              variant="contained"
              color="primary"
            >
              <IntlMassage id="button.export" />
            </Button>
          </div>

          <div className="d-flex flex-row m-2">
            <FilterStatusText>
            {intl.formatMessage({ id: "button.statusbyfilter" })}
            </FilterStatusText>
            <FilterStatusSelect
              onChange={valueChanged}
              value={filterStatus}
              className="d-flex text-center "
              Dir={dir}
            >
              {UnitFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>
          {Roles.units_management_create === 1 && (
            <Button onClick={addUnits} color="primary" variant="contained">
              <IntlMassage id="button.addnewunit" />
            </Button>
          )}
        </SecondHeader>
        <TableWrap>
          {loading ? (
            <NoData>
              <CircularProgress />
            </NoData>
          ) : data.length > 0 ? (
            <div>
              <TableComponent
                action={formActions}
                headerData={BuildingHeader}
                startfrom={params.page < 1 ? 0 : (params.page - 1) * 10}
                TableData={data}
              />
              <PaginatedItems
                currentPage={params.page - 1}
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
        </TableWrap>
      </div>
    </PageWrap>
  );
}
