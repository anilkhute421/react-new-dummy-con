import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { InputWrap, MyButton, SecondHeader } from "../../GlobalStyle";
import {
  NotificationTab,
  SearchNotification,
} from "../../store/action/NotificationTab";
import IntlMassage from "../../utils/IntlMassage";
import { Icon, Input, Label, LabelBox, PageLabel, PageWrap } from "../Styles";
import { TabItem, TabSwitch } from "../tenants/Style";
import AddNotificationModal from "./AddNotificationModal";
import NotificationTable from "./NotificationTable";

export default function Notificationmanagement() {
  const dir = useSelector((state) => state.Language.dir);
  const [addnoti, setAddnoti] = useState(false);
  const intl = useIntl();

  const openaddnotification = () => {
    setAddnoti(true);
  };
  const closeaddnotification = () => {
    setAddnoti(false);
  };

  const activeTab = useSelector((state) => state.Notification.ativeTab);
  const dispatch = useDispatch();

  const SwitchTableTab = (tabID) => {
    dispatch(NotificationTab(tabID));
  };

  const searchToTenantNotification = (word) => {
    dispatch(SearchNotification(word));
  };

  return (
    <>
      {<AddNotificationModal open={addnoti} close={closeaddnotification} />}
      <PageWrap>
        <PageLabel>
          <LabelBox>
            <Label>
              <IntlMassage id="Notification.header" />
            </Label>
          </LabelBox>
        </PageLabel>

        <div className="d-flex flex-row  justify-content-start">
          <TabSwitch>
            <TabItem
              onClick={() => SwitchTableTab(1)}
              active={activeTab === 1 ? true : false}
            >
              <IntlMassage id="Notification.tab.Admin" />
            </TabItem>
            <TabItem
              onClick={() => SwitchTableTab(2)}
              active={activeTab === 2 ? true : false}
            >
              <IntlMassage id="Notification.tab.Tenant" />
            </TabItem>
          </TabSwitch>
        </div>

        <SecondHeader Dir={dir}>
          <div className="mobile d-flex flex-row align-items-center">
            <InputWrap>
              <Input
                className="mt-0"
                placeholder={intl.formatMessage({ id: "placeholder.search" })}

                type="text"
                onChange={(e) => searchToTenantNotification(e.target.value)}
              />
              <Icon Dir={dir} className="icon-search"></Icon>
            </InputWrap>
            {/* <MyButton className="export-btn">
              <IntlMassage id="button.export" />
            </MyButton> */}
          </div>
          {activeTab === 2 && (
            <MyButton onClick={openaddnotification} Dir={dir}>
              <IntlMassage id="button.addnotification" />
            </MyButton>
          )}
        </SecondHeader>
        <NotificationTable />
      </PageWrap>
    </>
  );
}
