import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import TableComponent from "../../components/Table";
import PaginatedItems from "../../pageCounter/Pagination";
import { TableWrap, NoData } from "../Styles";
import { postApi } from "../../services/ApiMethod";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import IntlMassage from "../../utils/IntlMassage";

export default function ContractTableSwitch({
  filterStatus,
  fromDate,
  toDate,
}) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(params.page);
  const [pageCount, setPageCount] = useState(0);
  const keyword = useSelector((state) => state.Contracts.keyword);
  const history = useHistory();

  const Roles = useSelector((state) => state.Auth.data.role_details);

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
      id: "table.building",
      key: "building_name",
      show: false,
    },
    {
      id: "table.unitID",
      key: "unit_no",
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
      key: "tenant_name",
      show: false,
    },

    {
      id: "table.expired",
      key: "is_expired",
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
    edit: Roles.contracts_management_edit === 1 ? true : false,
    view: Roles.contracts_management_view === 1 ? true : false,
    delete: Roles.contracts_management_delete === 1 ? true : false,
    pathname: "/home/contracts/view",
    pathnameEdit: "/home/contracts/edit",
    deletepath: "delete_contract/",
    delete_key: "contract_id",
  };

  const getChangedPage = (newPage) => {
    setPage(newPage);
  };

  const getContractListing = async (p) => {
    setLoading(true);
    let d = {
      page: p,
      filter_by_status: filterStatus,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
    };
    let res = await postApi("contract_list_by_company_id", d);
    if (res.status === 200) {
      setData(res.data);
      setPageCount(res.pagecount);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getContractBySearch = async (p) => {
    setLoading(true);
    let d = {
      search_key: keyword,
      page: p,
      filter_by_status: filterStatus,
      date_from:
        fromDate === null ? null : moment(fromDate).format("YYYY-MM-DD"),
      date_to: toDate === null ? null : moment(toDate).format("YYYY-MM-DD"),
    };
    let res = await postApi(`search_contract_list`, d);
    if (res.status === 200) {
      setData(res.data);
      setPageCount(res.pagecount);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword !== "") {
      getContractBySearch(1);
      setPage(1);
    } else {
      getContractListing(page);
    }
  }, [keyword]);

  useEffect(() => {
    if (filterStatus) {
      getContractListing(1);
    } else {
      getContractListing(params.page);
    }
    setPage(1);
  }, [filterStatus]);

  useEffect(() => {
    if (fromDate) {
      getContractListing(1);
    } else {
      getContractListing(params.page);
    }
    setPage(1);
  }, [fromDate]);

  useEffect(() => {
    if (toDate) {
      getContractListing(1);
    } else {
      getContractListing(params.page);
    }
    setPage(1);
  }, [toDate]);

  useEffect(() => {
    if (keyword !== "") {
      getContractBySearch(page);
    } else {
      getContractListing(page);
    }
  }, [page]);

  useEffect(() => {
    history.replace(`/home/contracts/${page}`);
  }, [page]);

  return (
    <TableWrap>
      {loading ? (
        <NoData>
          <CircularProgress />
        </NoData>
      ) : data.length > 0 ? (
        <div>
          <TableComponent
            action={formActions}
            headerData={ContractHeader}
            startfrom={page < 1 ? 0 : (page - 1) * 10}
            // startfrom={0}
            TableData={data}
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
    </TableWrap>
  );
}
