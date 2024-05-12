import React, { useLayoutEffect, useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Wrapper } from "../GlobalStyle";
import { useSelector, useDispatch } from "react-redux";
import { SelectLanguage } from "../store/action/Language";
import DashBoardRoute from "../routes/DashBoardRoute";
import { IntlProvider } from "react-intl";
import AppLocal from "../lngProvider/index";
import { ProfileFooter } from "../Pages/profile/Style";
import Term from "../Pages/profile/Term";
import Privacy from "../Pages/profile/Privacy";
import Contact from "../Pages/profile/Contact";
import { dp, login_Logo, logoutIcon, profileIcon } from "../utils/images";

import {
  PageWrap,
  ContentBox,
  MobileNav,
  Hamburger,
  List,
  BellIcon,
  DesktopGap,
  Dot,
  Dp,
  PageHeader,
  LanguageSelect,
  Logo,
  Name,
  ProfileDropDown,
  DropDown,
  Listitem,
  Icon,
} from "./Style";

import { logout } from "../store/action/AuthAction";
import { NavLink, useHistory } from "react-router-dom";
import { getApi } from "../services/ApiMethod";
import {
  BellCount,
  unReadMessageTotalCount,
} from "../store/action/NotificationTab";
import IntlMassage from "../utils/IntlMassage";

export default function DashBoard() {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);
  const [size, setSize] = useState(0);
  const history = useHistory();
  const language = useSelector((state) => state.Language.language);
  const Direction = useSelector((state) => state.Language.dir);
  const detail = useSelector((state) => state.Auth.data.name);
  const currentAppLocale = AppLocal[language];
  const [open, setOpen] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);

  const bellcount = useSelector((state) => state.Notification.bellcount);

  const SwitchLanguage = (type) => {
    if (type === "Ar") {
      dispatch(SelectLanguage({ language: "ar", dir: "rtl" }));
    }
    if (type === "En") {
      dispatch(SelectLanguage({ language: "en", dir: "ltr" }));
    }
  };
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const CloseSideBar = () => {
    if (open) {
      setOpen(false);
    }
  };
  const logoutUser = () => {
    dispatch(logout());
  };

  const gotoNotification = async () => {
    let res = await getApi("admin_to_pm_notification_count");
    if (res.status === 200) {
      dispatch(BellCount(res.count));
      dispatch(unReadMessageTotalCount(res.sum));
    } else {
      dispatch(BellCount(0));
      dispatch(unReadMessageTotalCount(0));
    }
  };

  useEffect(() => {
    setInterval(gotoNotification, 1200000);
  }, []);

  useMemo(() => {
    CloseSideBar();
  }, [history.location.pathname]);

  return (
    <IntlProvider
      locale={currentAppLocale}
      defaultLocale="en"
      messages={currentAppLocale.messages}
    >
      <Wrapper dir={Direction}>
        <PageWrap Dir={Direction}>
          <Sidebar open={open} dir={Direction} />

          <ContentBox onClick={CloseSideBar}>
            <DesktopGap>
              <PageHeader>
                {size < 992 && (
                  <MobileNav>
                    <div>
                      <Hamburger
                        onClick={() => setOpen(true)}
                        open={open}
                        Dir={Direction}
                      >
                        <div></div>
                        <div></div>
                        <div></div>
                      </Hamburger>
                      <Logo src={login_Logo} alt="" />
                    </div>
                  </MobileNav>
                )}
                {
                  <ClickAwayListener onClickAway={() => setExpand(false)}>
                    <LanguageSelect
                      onClick={() => setExpand(!expand)}
                      open={expand}
                    >
                      <div>
                        {language === "ar" ? "Arb" : "Eng"}
                        <i className="select-icon icon-down-arrow" />
                      </div>
                      {expand && (
                        <List>
                          {language === "ar" && (
                            <li onClick={() => SwitchLanguage("En")}>Eng</li>
                          )}
                          {language === "en" && (
                            <li onClick={() => SwitchLanguage("Ar")}>Arb</li>
                          )}
                        </List>
                      )}
                    </LanguageSelect>
                  </ClickAwayListener>
                }
                <BellIcon
                  className="icon-bell"
                  onClick={() => history.push("/home/notification")}
                >
                  {bellcount > 0 && <Dot Dir={Direction} />}
                </BellIcon>

                <ClickAwayListener
                  onClickAway={() =>
                    setProfileDropDown(profileDropDown && false)
                  }
                >
                  <DropDown>
                    <div
                      onClick={() => setProfileDropDown((prev) => !prev)}
                      className="d-flex flex-row align-items-center "
                    >
                      <Dp src={dp} alt="" />
                      <Name Dir={Direction}>
                        {size > 575 && detail} <i className="icon-down"></i>
                      </Name>
                    </div>
                    <ProfileDropDown
                      className={!profileDropDown && "d-none"}
                      Dir={Direction}
                      dir={Direction}
                    >
                      <span className="d" />
                      <NavLink
                        className="nav-link"
                        onClick={() => setProfileDropDown(false)}
                        to="/home/profile"
                      >
                        <Icon src={profileIcon} alt="" />

                        <IntlMassage id="profile.profile" />
                      </NavLink>
                      <hr style={{ margin: "0 5px" }} />
                      <Listitem onClick={logoutUser}>
                        <Icon src={logoutIcon} alt="" />

                        <IntlMassage id="profile.logout" />
                      </Listitem>
                    </ProfileDropDown>
                  </DropDown>
                </ClickAwayListener>
              </PageHeader>
              <DashBoardRoute />
            </DesktopGap>
            <ProfileFooter>
              <Term />
              <Privacy />
              <Contact />
            </ProfileFooter>
          </ContentBox>
        </PageWrap>
      </Wrapper>
    </IntlProvider>
  );
}
