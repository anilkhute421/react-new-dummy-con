import React, { useState } from "react";
import { InputWrap, SecondHeader } from "../../GlobalStyle";
import IntlMassage from "../../utils/IntlMassage";
import { Icon, Input, Label, LabelBox, PageLabel, PageWrap } from "../Styles";
import { useDispatch, useSelector } from "react-redux";
import { TabSwitch, TabItem } from "./Style";
import TenantTableSwitch from "./TenantTableSwitch";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { exportData } from "../../export/Export";
import { useIntl } from "react-intl";

import {
  searchByAll,
  searchByLinked,
  searchByReq,
  searchByUnlinked,
} from "../../store/action/Search";
import { FilterStatusSelect, FilterStatusText } from "../maintanence/Style";
import { TenantTab } from "../../store/action/ActiveTabTenant";

export default function Tenants() {
  const intl = useIntl();

  const TenantFilter = [
    {
      status: intl.formatMessage({ id: "button.All" }),
      id: 5,
    },
    // {
    //   status: intl.formatMessage({ id: "tenant.filters.PendingApproval" }),
    //   id: 0,
    // },
    {
      status: intl.formatMessage({ id: "tenant.filters.Approved" }),
      id: 1,
    },
    // {
    //   status: intl.formatMessage({ id: "tenant.filters.Declined" }),
    //   id: 2,
    // },
    {
      status: intl.formatMessage({ id: "tenant.filters.Disconnected" }),
      id: 3,
    },
  ];

  // const [activeTab, setActiveTab] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ActiveTabTenant.ativeTab);
  const dir = useSelector((state) => state.Language.dir);
  const Pm_id = useSelector((state) => state.Auth.data.id);
  const keywordAll = useSelector((state) => state.Tenant.keywordAll);
  const keywordLinked = useSelector((state) => state.Tenant.keywordLinked);
  const keywordUnlinked = useSelector((state) => state.Tenant.keywordUnlinked);
  const keywordRequest = useSelector((state) => state.Tenant.keywordRequest);
  const [filterStatus, setFilterStatus] = useState(TenantFilter[0].id);
  const Roles = useSelector((state) => state.Auth.data.role_details);

  const SwitchTableTab = (tabID) => {
    dispatch(TenantTab(tabID));
  };

  const search = (word) => {
    if (activeTab === 1) {
      dispatch(searchByAll(word));
    }
    if (activeTab === 2) {
      dispatch(searchByLinked(word));
    }
    if (activeTab === 3) {
      dispatch(searchByUnlinked(word));
    }
    if (activeTab === 4) {
      dispatch(searchByReq(word));
    }
  };

  const valueChanged = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <PageWrap>
      <PageLabel>
        <LabelBox>
          <Label>
            <IntlMassage id="tenant.header.Management" />
          </Label>
        </LabelBox>
      </PageLabel>
      <div className="d-flex flex-row  justify-content-start">
        <TabSwitch>
          <TabItem
            onClick={() => SwitchTableTab(1)}
            active={activeTab === 1 ? true : false}
          >
       
            <IntlMassage id="tenant.tabs.Alltenant" />
          </TabItem>
          <TabItem
            onClick={() => SwitchTableTab(2)}
            active={activeTab === 2 ? true : false}
          >
            <IntlMassage id="tenant.tabs.Linked" />
          </TabItem>
          <TabItem
            onClick={() => SwitchTableTab(3)}
            active={activeTab === 3 ? true : false}
          >
            <IntlMassage id="tenant.tabs.Unlinked" />
          </TabItem>
          {/* <TabItem
            onClick={() => SwitchTableTab(4)}
            active={activeTab === 4 ? true : false}
          >
            <IntlMassage id="tenant.tabs.Request" />
          </TabItem> */}
        </TabSwitch>
      </div>
      <SecondHeader Dir={dir}>
        <div className="mobile d-flex flex-row align-items-center">
          <InputWrap>
            <Input
              className="search-input"
              placeholder={intl.formatMessage({ id: "placeholder.search" })}
              onChange={(e) => search(e.target.value)}
              value={
                activeTab === 1
                  ? keywordAll
                  : activeTab === 2
                  ? keywordLinked
                  : activeTab === 3
                  ? keywordUnlinked
                  : activeTab === 4 && keywordRequest
              }
              type="text"
            />
            <Icon Dir={dir} className="icon-search"></Icon>
          </InputWrap>
          <Button
            color="primary"
            variant="contained"
            onClick={() => exportData(`${Pm_id}/all_tenant`)}
            className="export-btn mx-2"
          >
            <IntlMassage id="button.export" />
          </Button>
        </div>

        {activeTab === 1 && (
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
              {TenantFilter.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.status}
                </option>
              ))}
            </FilterStatusSelect>
          </div>
        )}

        {Roles.tenant_management_create === 1 && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push("/home/tenants/add")}
            Dir={dir}
            className="my-2"
          >
            <IntlMassage id="button.addnewtenants" />
          </Button>
        )}
      </SecondHeader>
      <TenantTableSwitch tabletype={activeTab} filterStatus={filterStatus} />
    </PageWrap>
  );
}
