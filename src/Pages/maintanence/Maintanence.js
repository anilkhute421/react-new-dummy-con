import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Label, LabelBox, PageLabel, PageWrap } from "../Styles";
import { TabItem, TabSwitch } from "../tenants/Style";
import MaintanenceTableSwitch from "./MaintanenceTableSwitch";
import { Tab } from "../../store/action/MaintenanceActiveTab";
import IntlMassage from "../../utils/IntlMassage";

export default function Maintanence() {
  const activeTab = useSelector((state) => state.ActiveTabMaintenance.ativeTab);
  const dispatch = useDispatch();

  const SwitchTableTab = (tabID) => {
    dispatch(Tab(tabID));
  };

  return (
    <PageWrap>
      <PageLabel>
        <LabelBox>
          <Label>
            <IntlMassage id="Maintenance.Management.header" />
          </Label>
        </LabelBox>
      </PageLabel>
      <div className="d-flex flex-row justify-content-start">
        <TabSwitch>
          <TabItem
            onClick={() => SwitchTableTab("Requests")}
            active={activeTab === "Requests" ? true : false}
          >
            <IntlMassage id="Maintenance.tab.Request" />
          </TabItem>
          <TabItem
            onClick={() => SwitchTableTab("Expenses")}
            active={activeTab === "Expenses" ? true : false}
          >
            <IntlMassage id="Maintenance.tab.Expense" />
          </TabItem>
          <TabItem
            onClick={() => SwitchTableTab("Experts")}
            active={activeTab === "Experts" ? true : false}
          >
            <IntlMassage id="Maintenance.tab.Experts" />
          </TabItem>
        </TabSwitch>
      </div>

      <MaintanenceTableSwitch Tab={activeTab} />
    </PageWrap>
  );
}
