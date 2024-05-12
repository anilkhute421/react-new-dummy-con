import React, { useEffect, useState } from "react";
import { NoData, TableLoaderWrap, TableWrap } from "../Styles";
import TableComponent from "../../components/Table";
import { useSelector } from "react-redux";
import PaginatedItems from "../../pageCounter/Pagination";
import { postApi } from "../../services/ApiMethod";
import { CircularProgress } from "@mui/material";
import IntlMassage from "../../utils/IntlMassage";

export default function NotificationTable() {
  const activeTab = useSelector((state) => state.Notification.ativeTab);
  const searchKeyword = useSelector(
    (state) => state.Notification.searchNotification
  );

  const [adminloading, setAdminLoading] = useState(true);
  const [adminNotificationData, setAdminNotificationData] = useState([]);
  const [adminNotificationError, setAdminNotificationError] = useState("");
  const [adminpagecount, setAdminPagecount] = useState(0);
  const [adminNotificationPage, setAdminNotificationPage] = useState(1);

  const [tenantloading, setTenantLoading] = useState(true);
  const [tenantNotificationData, setTenantNotificationData] = useState([]);
  const [tenantNotificationError, setTenantNotificationError] = useState("");
  const [tenantpagecount, setTenantPagecount] = useState(0);
  const [tenantNotificationPage, setTenantNotificationPage] = useState(1);


  // Notification Come From Admin To PM

  const AdminNotificationHeader = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.title",
      key: "title",
      show: false,
    },
    {
      id: "table.message",
      key: "message",
      show: false,
    },
    {
      id: "table.datetime",
      key: "date",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const AdminNotificationformActions = {
    apply: true,
    view: true,
    openModal: true,
    forNotification: true,
  };

  const getAdminNotification = async () => {
    setAdminLoading(true);
    let req = {
      page: tenantNotificationPage,
    };
    let res = await postApi("admin_notification_list", req);
    if (res.status === 200) {
      setAdminNotificationData(res.data);
      setAdminLoading(false);
      setAdminPagecount(res.pagecount);
    } else {
      setAdminNotificationError(res.message);
      setAdminLoading(false);
    }
  };

  const getChangedPageAdmin = (newpage) => {
    setAdminNotificationPage(newpage);
  };

  const getSearchAdmin = async (p) => {
    let req = {
      page: p,
      search_key: searchKeyword,
    };
    let res = await postApi("search_admin_noti_for_pm", req);
    if (res.status === 200) {
      setAdminNotificationData(res.data);
      setAdminLoading(false);
      setAdminPagecount(res.pagecount);
    } else {
      setAdminNotificationError(res.message);
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      if (searchKeyword !== "") {
        getSearchAdmin(1);
      } else {
        getAdminNotification(adminNotificationPage);
      }
    }
  }, [searchKeyword]);

  useEffect(() => {
    getAdminNotification();
  }, [adminNotificationPage]);

  // Notification Goes to Tenant to Login PM
  const TenantNotification = [
    {
      id: "table.Sno",
      key: "sno",
      show: true,
    },
    {
      id: "table.title",
      key: "title",
      show: false,
    },
    {
      id: "table.message",
      key: "message",
      show: false,
    },
    {
      id: "table.sendto",
      key: "send_to",
      show: false,
    },
    {
      id: "table.datetime",
      key: "date",
      show: false,
    },
    {
      id: "table.action",
      key: "",
      show: true,
    },
  ];

  const getTenantNotification = async () => {
    setTenantLoading(true);
    let req = {
      page: tenantNotificationPage,
    };
    let res = await postApi("tenant_notification_list_for_pm", req);
    if (res.status === 200) {
      setTenantNotificationData(res.data);
      setTenantLoading(false);
      setTenantPagecount(res.pagecount);
    } else {
      setTenantNotificationError(res.message);
      setTenantLoading(false);
    }
  };

  const TenantNotificationformActions = {
    apply: true,
    view: true,
    delete: true,
    openModal: true,
    forNotification: true,
    listing: getTenantNotification,
  };

  const getChangedPageTenant = (newpage) => {
    setTenantNotificationPage(newpage);
  };

  const getSearchTenant = async (p) => {
    let req = {
      page: p,
      search_key: searchKeyword,
    };
    let res = await postApi("search_tenant_noti_for_pm", req);
    if (res.status === 200) {
      setTenantNotificationData(res.data);
      setTenantLoading(false);
      setTenantPagecount(res.pagecount);
    } else {
      setTenantNotificationError(res.message);
      setTenantLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 2) {
      if (searchKeyword) {
        getSearchTenant(1);
        setTenantNotificationPage(1);
      } else {
        getTenantNotification(tenantNotificationPage);
      }
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (searchKeyword !== "") {
      getSearchTenant(tenantNotificationPage);
    } else {
      getTenantNotification(tenantNotificationPage);
    }
  }, [tenantNotificationPage]);

  return (
    <div>
      {activeTab === 1 && (
        <TableWrap>
          {adminloading ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : adminNotificationData && adminNotificationData.length > 0 ? (
            <div>
              <TableComponent
                action={AdminNotificationformActions}
                headerData={AdminNotificationHeader}
                startfrom={
                  adminNotificationPage < 0
                    ? 0
                    : (adminNotificationPage - 1) * 10
                }
                TableData={adminNotificationData}
              />
              <PaginatedItems
                currentPage={adminNotificationPage - 1}
                pageCount={adminpagecount}
                getChangedPage={getChangedPageAdmin}
                itemsPerPage={10}
              />
            </div>
          ) : adminNotificationError ? (
            <NoData>{adminNotificationError}</NoData>
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </TableWrap>
      )}

      {activeTab === 2 && (
        <TableWrap>
          {tenantloading ? (
            <TableLoaderWrap>
              <CircularProgress />
            </TableLoaderWrap>
          ) : tenantNotificationData && tenantNotificationData.length > 0 ? (
            <div>
              <TableComponent
                action={TenantNotificationformActions}
                headerData={TenantNotification}
                startfrom={
                  tenantNotificationPage < 1
                    ? 0
                    : (tenantNotificationPage - 1) * 10
                }
                TableData={tenantNotificationData}
              />
              <PaginatedItems
                currentPage={tenantNotificationPage - 1}
                pageCount={tenantpagecount}
                getChangedPage={getChangedPageTenant}
                itemsPerPage={10}
              />
            </div>
          ) : tenantNotificationError ? (
            <NoData>{tenantNotificationError}</NoData>
          ) : (
            <NoData>
              <IntlMassage id="msg.nodata" />
            </NoData>
          )}
        </TableWrap>
      )}
    </div>
  );
}
