import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TableComponent from "../../components/Table";
import { InputWrap, MyButton, SecondHeader } from "../../GlobalStyle";
import IntlMassage from "../../utils/IntlMassage";
import { useIntl } from "react-intl";
import AddOwner from "./AddOwner";
import {
  Icon,
  Input,
  Label,
  LabelBox,
  NoData,
  PageHeader,
  TableLoaderWrap,
  TableWrap,
} from "../Styles";
import PaginatedItems from "../../pageCounter/Pagination";
import { postApi } from "../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import { exportData } from "../../export/Export";
import { searchOwner } from "../../store/action/Owners";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";

export default function OwnerManagement() {
  const intl = useIntl();

  const OwnerFilter = [
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
  const dispatch = useDispatch();
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const dir = useSelector((state) => state.Language.dir);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(params.page);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const keyword = useSelector((state) => state.Owners.keyword);
  const [filterStatus, setFilterStatus] = useState(OwnerFilter[0].id);
  const Roles = useSelector((state) => state.Auth.data.role_details);

  const ownerheader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.names",
      key: "name",
      show: false,
    },
    
    {
      id: "table.email",
      key: "email",
      show: false,
    },
    {
      id: "table.phoneno",
      key: "phone",
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

  const getListOfOwners = async (p) => {
    setLoading(true);
    let d = { page: p, filter_by_status: filterStatus };
    let res = await postApi("owner_listing", d);
    if (res.status === 200) {
      setData(res.data);
      setTotalPage(res.pagecount);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getOwnerBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      filter_by_status: filterStatus,
    };
    let res = await postApi("search_owner_list", d);
    if (res.status === 200) {
      setData(res.data);
      setLoading(false);
      setTotalPage(res.pagecount);
    } else {
      setLoading(false);
    }
  };

  const getChangedPage = (newPage) => {
    setPage(newPage);
  };
  const search = (word) => {
    dispatch(searchOwner(word));
  };

  useEffect(() => {
    dispatch(searchOwner(""));
  }, []);

  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };

  useEffect(() => {
    if (keyword) {
      getOwnerBySearch(1);
      setPage(1)
    } else {
      getListOfOwners(params.page);
    }
  }, [keyword]);

  useEffect(()=>{
    if(filterStatus){
      getListOfOwners(1)
    }else {
      getListOfOwners(params.page);
    }
    setPage(1)
  },[filterStatus])

  useEffect(() => {
    if (keyword) {
      getOwnerBySearch(params.page);
    } else {
      getListOfOwners(params.page);
    }
  }, [params.page]);

  useEffect(() => {
    history.replace(`/home/owners/${page}`);
  }, [page]);

  const formActions = {
    apply: true,
    view: Roles?.owner_view === 1 ? true : false,
    edit: Roles?.owner_edit === 1 ? true : false,
    delete: Roles?.owner_delete === 1 ? true : false,
    pathname: "/home/owners/view",
    pathnameEdit: "/home/owners/edit",
    deletepath: "delete_owner/",
    delete_key: "owners_id",
  };
  return (
    <div>
      <PageHeader>
        <LabelBox>
          <Label>
            <IntlMassage id="owner.management" />
          </Label>
        </LabelBox>
      </PageHeader>
      <AddOwner
        show={modalShow}
        updatedata={() => getListOfOwners(params.page)}
        onHide={() => setModalShow(false)}
      />
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
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <MyButton
            className="export-btn"
            onClick={() => exportData(`${Pm_id}/owner_list`)}
          >
            <IntlMassage id="button.export" />
          </MyButton>
        </div>

        <div className="d-flex flex-row m-2">
          <FilterStatusText>{intl.formatMessage({ id: "button.statusbyfilter" })}</FilterStatusText>
          <FilterStatusSelect
            onChange={valueChanged}
            value={filterStatus}
            className="d-flex text-center "
            Dir={dir}
          >
            {OwnerFilter.map((item, i) => (
              <option key={i} value={item.id}>
                {item.status}
              </option>
            ))}
          </FilterStatusSelect>
        </div>

        {Roles.owner_create === 1 && (
          <MyButton Dir={dir} type="button" onClick={() => setModalShow(true)}>
            <IntlMassage id="button.addnewowner" />
          </MyButton>
        )}
      </SecondHeader>
      <TableWrap>
        {loading ? (
          <TableLoaderWrap>
            <CircularProgress />
          </TableLoaderWrap>
        ) : data.length === 0 ? (
          <NoData>
            <IntlMassage id="msg.nodata" />
          </NoData>
        ) : (
          <div>
            <TableComponent
              action={formActions}
              headerData={ownerheader}
              startfrom={params.page < 1 ? 0 : (params.page - 1) * 10}
              TableData={data}
            />
            <PaginatedItems
              currentPage={params.page - 1}
              pageCount={totalPage}
              getChangedPage={getChangedPage}
              itemsPerPage={10}
            />
          </div>
        )}
      </TableWrap>
    </div>
  );
}
