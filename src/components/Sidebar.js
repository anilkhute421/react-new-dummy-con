import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { login_Logo } from "../utils/images";
import IntlMassage from "../utils/IntlMassage";

export default function Sidebar({ dir, open }) {
  const Roles = useSelector((state) => state.Auth.data.role_details);
  const unreadComment = useSelector((state) => state.Notification.unReadMessage);

  return (
    <SidebarContainer dir={dir} open={open}>
      <InnerContainer>
        <LogoWrap>
          <NavLogo src={login_Logo}></NavLogo>
        </LogoWrap>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavLink to="/home" activeClassName="activeLink" exact>
              <NavIcon>
                <i className="icon-dashboard" />
              </NavIcon>
              <SidebarMenuItemLabel>
                <IntlMassage id="sidebar.dashboard" />
              </SidebarMenuItemLabel>
            </NavLink>
          </SidebarMenuItem>

          {Roles.buildings_management_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/buildings" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-building" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.buildings" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {Roles.units_management_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/units" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-units" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.units" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {Roles.avail_unit_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/unit-available" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-units" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.unitsAvailable" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {Roles.owner_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/owners" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-owners" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.owners" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {Roles.tenant_management_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/tenants" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-tenants" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.tenants" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {Roles.contracts_management_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/contracts" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-contracts" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.contracts" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {Roles.payment_management_none === 0 && (
            <SidebarMenuItem>
              <NavLink to="/home/payments" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-payments" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.payments" />
                </SidebarMenuItemLabel>
              </NavLink>
            </SidebarMenuItem>
          )}

          {(Roles.maintenance_req_none === 0 || Roles.expense_none === 0 || Roles.expert_none === 0) && (
            <SidebarMenuItem>
              <NavLink to="/home/maintanence" activeClassName="activeLink">
                <NavIcon>
                  <i className="icon-maintanence" />
                </NavIcon>
                <SidebarMenuItemLabel>
                  <IntlMassage id="sidebar.maintanence" />
                </SidebarMenuItemLabel>
                

                <Badge className={unreadComment > 0 ? "" : "d-none"}>
        {unreadComment}
      </Badge>


              </NavLink>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <NavLink to="/home/notification" activeClassName="activeLink">
              <NavIcon>
                <i className="icon-bell" />
              </NavIcon>
              <SidebarMenuItemLabel>
                <IntlMassage id="sidebar.notification" />
              </SidebarMenuItemLabel>
            </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </InnerContainer>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  height: 100vh;
  min-height: 550px;
  width: 260px;
  background-color: #252529;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  color: #000;
  position: fixed;
  left: ${({ dir }) => dir === "ltr" && "0"};

  right: ${({ dir }) => dir === "rtl" && "0"};
  transition: all ease-out 0.4s;
  @media screen and (max-width: 991px) {
    position: fixed;
    z-index: 10;
    left: ${({ dir, open }) => dir === "ltr" && !open && "-100%"};
    left: ${({ dir, open }) => dir === "ltr" && open && "0"};
    right: ${({ dir, open }) => dir === "rtl" && !open && "-100%"};
    right: ${({ dir, open }) => dir === "rtl" && open && "0"};
  }
`;
const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  @media screen and (max-width: 991px) {
    display: none;
  }
`;
const NavLogo = styled.img`
  height: 62px;
`;
const SidebarMenu = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
`;
const SidebarMenuItem = styled.li`
  display: flex;
  height: 40px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-top: 5px;
  a {
    width: 100%;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    border-radius: 10px;
    height: 40px;
    text-decoration: none;
    &:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }
  .activeLink {
    background: #145da0;
    color: #ffffff;
    &:hover {
      background: #145da0;
      color: #ffffff;
    }
  }
`;
const SidebarMenuItemLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
  padding: 15px 0px;
  margin: 0;
`;
const InnerContainer = styled.div`
  width: 200px;
  margin: 0 auto;
  padding-top: 40px;
`;
const NavIcon = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  font-size: 20px;
  line-height: 17px;
  color: inherit;
`;


const Badge = styled.span`
  width: 24px;
  height: 24px;
  margin: 18px 0 0 10px;
  border-radius: 50%;
  background: red;
  color: #fff;
  font-weight: 500;
  left: ${({ Dir }) => Dir === "rtl" && "0px"};
  right: ${({ Dir }) => Dir === "ltr" && "0px"};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
`;