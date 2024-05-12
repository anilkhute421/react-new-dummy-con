import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  LabelBox,
  PageHeader,
  PageWrap,
  TableWrap,
  Icon,
  TableLoaderWrap,
  NoData,
} from "../Styles";
import { InputWrap, SecondHeader } from "../../GlobalStyle";
import { useParams } from "react-router-dom";
import TableComponent from "../../components/Table";
import { useHistory } from "react-router";
import IntlMassage from "../../utils/IntlMassage";
import { useIntl } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { postApi } from "../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import PaginatedItems from "../../pageCounter/Pagination";
import { Button } from "@mui/material";
import { exportData } from "../../export/Export";
import { searchBuilding } from "../../store/action/Buildings";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";
export default function Buildings() {
  const intl = useIntl();

  const BuildingFilter = [
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

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const dir = useSelector((state) => state.Language.dir);
  const keyword = useSelector((state) => state.Buildings.keyword);
  const [page, setPage] = useState(params.page);
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const [pagecount, setPagecount] = useState(0);
  const [buildingList, setBuildingList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(BuildingFilter[0].id);

  const Roles = useSelector((state) => state.Auth.data.role_details);

  const BuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
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
      id: "table.locationlink",
      key: "location_link",
      show: false,
    },
    {
      id: "table.unit",
      key: "units",
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
  const getChangedPage = (changedpage) => {
    setPage(changedpage);
  };

  const formActions = {
    apply: true,
    edit: Roles?.buildings_management_edit===1?true:false,
    pathnameEdit: "/home/buildings/edit",
    view: Roles?.buildings_management_view===1?true:false, 
    delete:Roles?.buildings_management_delete===1?true:false,
    delete_key: "building_id",
    pathname: "/home/buildings/view",
  };

  const getBuilding = async (p) => {
    setLoading(true);
    let d = {
      page: p,
      filter_by_status: filterStatus,
    };

    let res = await postApi("building_listing", d);
    if (res.status === 200) {
      setBuildingList(res.data);
      setLoading(false);
      setPagecount(res.pagecount);
    } else {
      setErrorMsg(res.message);
      setLoading(false);
    }
  };
  const search = (word) => {
    dispatch(searchBuilding(word));
  };

  useEffect(() => {
    dispatch(searchBuilding(""));
  }, []);

  const getBuildingBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      filter_by_status: filterStatus,
    };
    let res = await postApi("search_building", d);
    if (res.status === 200) {
      setBuildingList(res.data);
      setLoading(false);
      setPagecount(res.pagecount);
    } else {
      setErrorMsg(res.message);
      setLoading(false);
    }
  };

  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };

  useEffect(() => {
    if (keyword) {
      getBuildingBySearch(1);
      setPage(1)
    } else {
      getBuilding(params.page);
    }
  }, [keyword]);


  useEffect(()=>{
    if(filterStatus){
      getBuilding(1)
    }else {
      getBuilding(params.page);
    }
    setPage(1)
  },[filterStatus])


  useEffect(() => {
    if (keyword !== "") {
      getBuildingBySearch(params.page);
    } else {
      getBuilding(params.page);
    }
  }, [params.page ]);

  useEffect(() => {
    history.replace(`/home/buildings/${page}`);
  }, [page]);

  return (
    <PageWrap>
      <div>
        <PageHeader>
          <LabelBox>
            <Label>
              <IntlMassage id="building.management" />
            </Label>
          </LabelBox>
        </PageHeader>
        <SecondHeader Dir={dir}>
          <div className="mobile d-flex flex-row align-items-center">
            <InputWrap>
              <Input
                className="search-input"
                value={keyword}
                onChange={(e) => search(e.target.value)}
                placeholder={intl.formatMessage({ id: "placeholder.search" })}
                type="text"
              />
              <Icon className="icon-search"></Icon>
            </InputWrap>
            <Button
              variant="contained"
              className="export-btn mx-2"
              onClick={() => exportData(`${Pm_id}/building`)}
              color="primary"
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
              {BuildingFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>

          {Roles.buildings_management_create === 1 &&  (
            <Button
              variant="contained"
              className="export-btn my-2"
              onClick={() => history.push("/home/buildings/add")}
              color="primary"
            >
              <IntlMassage id="building.addnew" />
            </Button>
          )}
        </SecondHeader>
        <TableWrap>
          {loading ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : buildingList && buildingList.length > 0 ? (
            <div>
              <TableComponent
                action={formActions}
                headerData={BuildingHeader}
                startfrom={params.page < 1 ? 0 : (params.page - 1) * 10}
                TableData={buildingList}
              />
              <PaginatedItems
                currentPage={params.page - 1}
                pageCount={pagecount}
                getChangedPage={getChangedPage}
                itemsPerPage={10}
              />
            </div>
          ) : errorMsg ? (
            <NoData>{errorMsg}</NoData>
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
