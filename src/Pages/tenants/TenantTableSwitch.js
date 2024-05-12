import React, { useState, useEffect } from "react";
import TenantsTable from "./TenantsTable";
import { TableWrap, TableLoaderWrap, NoData } from "../Styles";
import PaginatedItems from "../../pageCounter/Pagination";
import { postApi } from "../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByAll,
  searchByLinked,
  searchByReq,
} from "../../store/action/Search";
import IntlMassage from "../../utils/IntlMassage";

export default function TenantTableSwitch({ tabletype, filterStatus }) {
  const [m, setM] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dataAlltenant, setDataAlltenant] = useState([]);
  const [dataLinked, setDataLinked] = useState([]);
  const [dataUnlinked, setDataUnlinked] = useState([]);
  const [dataReqest, setDataReqest] = useState([]);

  //Loading...!
  const [loadingAlltenant , setLoadingAllTenant] = useState(false)
  const [loadingLinked , setLoadingLinked] = useState(false)
  const [loadingUnLinked , setLoadingUnLinked] = useState(false)


  //Page
  const [alltenantpage, setAlltenantPage] = useState(1);
  const [unlinkedpage, setUnlinkedpage] = useState(1);
  const [linkedpage, setLinkedPage] = useState(1);
  const [reqestpage, setReqestPage] = useState(1);
  
  //Total Page 
  const [alltenantTotalPage, setAlltenantTotalPage] = useState(1);
  const [linkedTotalPage, setLinkedTotalPage] = useState(0);
  const [unlinkedTotalPage, setUnlinkedTotalPage] = useState(1);
  const [reqestTotalPage, setReqestTotalPage] = useState(0);

  // Error-Message
  const [errorMsgAllTenanat, setErrorMsgAllTenanat] = useState("");
  const [errorMsgUnlinked, setErrorMsgUnlinked] = useState("");
  const [errorMsgLinked, setErrorMsgLinked] = useState("");
  const [errorMsgReqest, setErrorMsgReqest] = useState("");

  // Search Keyword
  const keywordAll = useSelector((state) => state.Tenant.keywordAll);
  const keywordLinked = useSelector((state) => state.Tenant.keywordLinked);
  const keywordUnlinked = useSelector((state) => state.Tenant.keywordUnlinked);
  const keywordRequest = useSelector((state) => state.Tenant.keywordRequest);
  const dispatch = useDispatch();
  const Roles = useSelector((state) => state.Auth.data.role_details);

  //All Tenant
  const AlltenantHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.name",
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
      id: "table.unitno",
      key: "unit_no",
      show: false,
    },
    {
      id: "table.building",
      key: "building_name",
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

  const formActionsAlltenant = {
    apply: true,
    edit: Roles.tenant_management_edit === 1 ? true : false,
    view: Roles.tenant_management_view === 1 ? true : false,
    openModal: m,
    pathname: "/home/tenants/view",
    pathnameEdit: "/home/tenants/edit",
    UnlinkedDelPath: "delete_tenant",
  };

  const getListOfAlltenant = async (p) => {
    setLoadingAllTenant(true);
    let d = { page: p, filter_by_status: filterStatus };
    let res = await postApi("all_tenant_list_by_company_id", d);
    if (res.status === 200) {
      setDataAlltenant(res.data);
      setAlltenantTotalPage(res.pagecount);
      setLoadingAllTenant(false);
    } else {
      setErrorMsgAllTenanat(res.message);
      setLoadingAllTenant(false);
    }
  };

  const getChangedPageAll = (newpage) => {
    setAlltenantPage(newpage);
  };

  const getSearchofAllTenant = async (p) => {
    setLoading(true);
    if (tabletype === 1) {
      let req = {
        search_key: keywordAll,
        page: p,
        type: tabletype,
        filter_by_status: filterStatus,
      };
      let res = await postApi("search_all_tenants", req);

      if (res.status === 200) {
        setDataAlltenant(res.data);
        setAlltenantTotalPage(res.pagecount);
        setLoading(false);
      } else {
        setErrorMsgReqest(res.message);
        setLoading(false);
      }
    }
    if (tabletype === 2) {
      let req = {
        search_key: keywordLinked,
        page: p,
        type: tabletype,
      };
      let res = await postApi("search_all_tenants", req);

      if (res.status === 200) {
        setDataLinked(res.data);
        setLinkedTotalPage(res.pagecount);
        setLoading(false);
      } else {
        setErrorMsgAllTenanat(res.message);
        setLoading(false);
      }
    }
    if (tabletype === 3) {
      let req = {
        search_key: keywordUnlinked,
        page: p,
        type: tabletype,
      };
      let res = await postApi("search_all_tenants", req);

      if (res.status === 200) {
        setDataUnlinked(res.data);
        setUnlinkedTotalPage(res.pagecount);
        setLoading(false);
      } else {
        setErrorMsgUnlinked(res.message);
        setLoading(false);
      }
    }
    if (tabletype === 4) {
      let req = {
        search_key: keywordRequest,
        page: p,
        type: tabletype,
      };
      let res = await postApi("search_all_tenants", req);

      if (res.status === 200) {
        setDataReqest(res.data);
        setReqestTotalPage(res.pagecount);
        setLoading(false);
      } else {
        setErrorMsgLinked(res.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (keywordAll !== "") {
      getSearchofAllTenant(1);
      setAlltenantPage(1);
    } else {
      getListOfAlltenant(alltenantpage);
    }
  }, [keywordAll]);

  useEffect(() => {
    if (filterStatus) {
      getListOfAlltenant(1);
    } else {
      getListOfAlltenant(alltenantpage);
    }
    setAlltenantPage(1);
  }, [filterStatus]);

  useEffect(() => {
    if (keywordAll !== "") {
      getSearchofAllTenant(alltenantpage);
    } else {
      getListOfAlltenant(alltenantpage);
    }
  }, [alltenantpage]);

  // Unlikned Tenant
  const UnlinkedHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.name",
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

  const formActions = {
    apply: true,
    edit: Roles.tenant_management_edit === 1 ? true : false,
    view: Roles.tenant_management_view === 1 ? true : false,
    pathname: "/home/tenants/view",
    pathnameEdit: "/home/tenants/edit",
    UnlinkedDelPath: "delete_tenant",
  };

  const getListOfUnlinked = async (p) => {
    setLoadingUnLinked(true);
    let d = { page: p };
    let res = await postApi("unlinked_tenant_list_by_company_id", d);
    if (res.status === 200) {
      setDataUnlinked(res.data);
      setUnlinkedTotalPage(res.pagecount);
      setLoadingUnLinked(false);
    } else {
      setErrorMsgUnlinked(res.message);
      setLoadingUnLinked(false);
    }
  };

  const getChangedPageUnlinked = (newpage) => {
    setUnlinkedpage(newpage);
  };


  useEffect(() => {
    if (keywordUnlinked !== "") {
      getSearchofAllTenant(1);
      setUnlinkedpage(1);
    } else {
      getListOfUnlinked(unlinkedpage);
    }
  }, [keywordUnlinked]);

  useEffect(() => {
    if (keywordLinked !== "") {
      getSearchofAllTenant(unlinkedpage);
    } else {
      getListOfUnlinked(unlinkedpage);
    }
  }, [unlinkedpage]);


  useEffect(() => {
    getListOfUnlinked(1);
  }, []);

  //Linked Table

  const BuildingHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.name",
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
      id: "table.unitno",
      key: "unit_no",
      show: false,
    },
    {
      id: "table.building",
      key: "building_name",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const formActions1 = {
    apply: true,
    edit: Roles.tenant_management_edit === 1 ? true : false,
    view: Roles.tenant_management_view === 1 ? true : false,
    // openModal: m,
    pathname: "/home/tenants/view",
    pathnameEdit: "/home/tenants/edit",
  };

  const getListOfLinked = async (p) => {
    setLoadingLinked(true);
    let d = { page: p };
    let res = await postApi("linked_tenant_list_by_company_id", d);
    if (res.status === 200) {
      setDataLinked(res.data);
      setLinkedTotalPage(res.pagecount);
      setLoadingLinked(false);
    } else {
      setErrorMsgLinked(res.message);
      setLoadingLinked(false);
    }
  };

  const getChangedPageLinked = (newpage) => {
    setLinkedPage(newpage);
  };

  useEffect(() => {
    if (keywordLinked !== "") {
      getSearchofAllTenant(1);
      setLinkedPage(1);
    } else {
      getListOfLinked(linkedpage);
    }
  }, [keywordLinked]);

  useEffect(() => {
    if (keywordLinked !== "") {
      getSearchofAllTenant(linkedpage);
    } else {
      getListOfLinked(linkedpage);
    }
  }, [linkedpage]);
  useEffect(() => {
    getListOfLinked(1);
  }, []);

  // Request
  const RequestHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.name",
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
      id: "table.unitno",
      key: "unit_no",
      show: false,
    },
    {
      id: "table.building",
      key: "building_name",
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

  const formActionsReq = {
    apply: true,
    delete: Roles.tenant_management_delete === 1 ? true : false,
    view: Roles.tenant_management_view === 1 ? true : false,
    openModal: m,
    approved: true,
    pathnameEdit: "/home/tenants/edit",
  };

  const getListOfReqest = async (p) => {
    setLoading(true);
    let d = { page: p };
    let res = await postApi("tenant_request_list_by_company_id", d);
    if (res.status === 200) {
      setDataReqest(res.data);
      setReqestTotalPage(res.pagecount);
      setLoading(false);
    } else {
      setErrorMsgReqest(res.message);
      setLoading(false);
    }
  };

  const getChangedPageRequest = (newpage) => {
    setReqestPage(newpage);
  };

  useEffect(() => {
    if (keywordRequest !== "") {
      getSearchofAllTenant(1);
      setReqestPage(1);
    } else {
      getListOfReqest(reqestpage);
    }
  }, [keywordRequest]);

  useEffect(() => {
    if (keywordRequest !== "") {
      getSearchofAllTenant(reqestpage);
    } else {
      getListOfReqest(reqestpage);
    }
  }, [reqestpage]);

  useEffect(() => {
    tabletype === 4 ? setM(true) : setM(false);
  }, [tabletype]);

  useEffect(() => {
    dispatch(searchByAll(""));
    dispatch(searchByLinked(""));
    dispatch(searchByReq(""));
  }, []);

  return (
    <TableWrap>
      {tabletype === 1 && (
        <>
          {loadingAlltenant ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : dataAlltenant && dataAlltenant.length > 0 ? (
            <>
              <TenantsTable
                action={formActionsAlltenant}
                headerData={AlltenantHeader}
                startfrom={(alltenantpage - 1) * 10}
                TableData={dataAlltenant}
              />
              <PaginatedItems
                currentPage={alltenantpage - 1}
                pageCount={alltenantTotalPage}
                getChangedPage={getChangedPageAll}
                itemsPerPage={10}
              />
            </>
          ) : errorMsgAllTenanat ? (
            <NoData>{errorMsgAllTenanat}</NoData>
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </>
      )}

      {tabletype === 3 && (
        <>
          {loadingUnLinked ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : dataUnlinked && dataUnlinked.length > 0 ? (
            <>
              <TenantsTable
                action={formActions}
                headerData={UnlinkedHeader}
                startfrom={(unlinkedpage - 1) * 10}
                TableData={dataUnlinked}
              />
              <PaginatedItems
                currentPage={unlinkedpage - 1}
                pageCount={unlinkedTotalPage}
                getChangedPage={getChangedPageUnlinked}
                itemsPerPage={10}
              />
            </>
          ) : errorMsgUnlinked ? (
            <NoData>{errorMsgUnlinked}</NoData>
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </>
      )}

      {tabletype === 2 && (
        <>
          {loadingLinked ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : dataLinked && dataLinked.length > 0 ? (
            <>
              <TenantsTable
                action={formActions1}
                headerData={BuildingHeader}
                startfrom={(linkedpage - 1) * 10}
                TableData={dataLinked}
              />
              <PaginatedItems
                currentPage={linkedpage - 1}
                pageCount={linkedTotalPage}
                getChangedPage={getChangedPageLinked}
                itemsPerPage={10}
              />
            </>
          ) : errorMsgLinked ? (
            <NoData>{errorMsgLinked}</NoData>
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </>
      )}

      {tabletype === 4 && (
        <>
          {loading ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : dataReqest && dataReqest.length > 0 ? (
            <>
              <TenantsTable
                action={formActionsReq}
                headerData={RequestHeader}
                startfrom={(reqestpage - 1) * 10}
                TableData={dataReqest}
              />
              <PaginatedItems
                currentPage={reqestpage - 1}
                pageCount={reqestTotalPage}
                getChangedPage={getChangedPageRequest}
                itemsPerPage={10}
              />
            </>
          ) : errorMsgReqest ? (
            <NoData>{errorMsgReqest}</NoData>
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </>
      )}
    </TableWrap>
  );
}
