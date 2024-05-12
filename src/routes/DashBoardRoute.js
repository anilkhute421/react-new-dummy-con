import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Maintanence from "../Pages/maintanence/Maintanence";
import EditProfile from "../Pages/profile/EditProfile";
import Profile from "../Pages/profile/Profile";
import UnitRoutes from "../Pages/unit/UnitRoutes";
import AddExpert from "../Pages/maintanence/Expert/AddExpert";
import AddExpenses from "../Pages/maintanence/Expense/AddExpenses";
import Addrequest from "../Pages/maintanence/Request/Addrequest";
import Viewrequest from "../Pages/maintanence/Request/Viewrequest";
import Editrequest from "../Pages/maintanence/Request/Editrequest";
import Notificationmanagement from "../Pages/notification/Notificationmanagement";
import EditExpert from "../Pages/maintanence/Expert/EditExpert";
import BuildingRoutes from "../Pages/buildings/BuildingRoutes";
import OwnersRoute from "../Pages/owners/OwnersRoute";
import UnitAvalableRoutes from "../Pages/unitAvailable/UnitAvalableRoutes";
import PaymentRoute from "../Pages/payments/PaymentRoute";
import EditExpenses from "../Pages/maintanence/Expense/EditExpenses";
import ViewExpense from "../Pages/maintanence/Expense/ViewExpense";
import AttachmentMedia from "../Pages/maintanence/Request/AttachmentMedia";
import DashboardDetails from "../Pages/profile/DashboardDetails";
import { useSelector } from "react-redux";
import TenantRoute from "../Pages/tenants/TenantRoute";
import ContractRoute from "../Pages/contracts/ContractRoute";

function DashBoardRoute() {
  const Roles = useSelector((state) => state.Auth.data.role_details);


  return (
    <Switch>
      <Route path="/home" component={DashboardDetails} exact />
      <Route path="/home/profile" component={Profile} exact />
      <Route path="/home/profile/edit" component={EditProfile} exact />

      {Roles.buildings_management_none === 0 && (
        <Route path="/home/buildings" component={BuildingRoutes} />
      )}
      {Roles.units_management_none === 0 && (
        <Route path="/home/units" component={UnitRoutes} />
      )}
      {Roles.avail_unit_none === 0 && (
        <Route path="/home/unit-available/" component={UnitAvalableRoutes} />
      )}

      {Roles.owner_none === 0 && (
        <Route path="/home/owners" component={OwnersRoute} />
      )}

      {Roles.tenant_management_none === 0 && (
        <Route path="/home/tenants/" component={TenantRoute} />
      )}

      {Roles.contracts_management_none === 0 && (
        <Route path="/home/contracts" component={ContractRoute} />
      )}

      {Roles.payment_management_none === 0 && (
        <Route path="/home/payments" component={PaymentRoute} />
      )}

      {Roles.expense_create === 1 && (
        <Route
          path="/home/maintanence/expenses/add"
          component={AddExpenses}
          exact
        />
      )}

      <Route
        path="/home/maintanence/expenses/view"
        component={ViewExpense}
        exact
      />
      <Route
        path="/home/maintanence/expenses/edit"
        component={EditExpenses}
        exact
      />

      <Route
        path="/home/maintanence/expert/edit"
        component={EditExpert}
        exact
      />

      {Roles.expert_create === 1 && (
        <Route path="/home/maintanence/addexpert" component={AddExpert} exact />
      )}
      <Route
        path="/home/maintanence/requests/attachment"
        component={AttachmentMedia}
        exact
      />
      <Route
        path="/home/maintanence/requests/edit"
        component={Editrequest}
        exact
      />
      <Route
        path="/home/maintanence/requests/view"
        component={Viewrequest}
        exact
      />

      {Roles.maintenance_req_create === 1 && (
        <Route
          path="/home/maintanence/createrequest"
          component={Addrequest}
          exact
        />
      )}

      <Route path="/home/maintanence" component={Maintanence} exact />
      <Route
        path="/home/notification"
        component={Notificationmanagement}
        exact
      />
      <Redirect to="/home" />
    </Switch>
  );
}

export default DashBoardRoute;
