import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddUnit from "./AddUnit";
import EditUnit from "./EditUnit";
import UnitManagement from "./Index";
import ViewMaintenanceINUnits from "./ViewMaintenanceINUnits";
import ViewPaymentINUnits from "./ViewPaymentINUnits";
import ViewUnit from "./ViewUnit";
export default function UnitRoutes() {
  return (
    <Switch>
      <Route component={AddUnit} path="/home/units/add" exact />
      <Route component={ViewPaymentINUnits} path="/home/units/viewpayment" exact />
      <Route component={ViewMaintenanceINUnits} path="/home/units/viewmaintenance" exact />
      <Route component={EditUnit} path="/home/units/edit" exact />
      <Route component={ViewUnit} path="/home/units/view" exact />
      <Route component={UnitManagement} path="/home/units/:page" exact />
      <Redirect to="/home/units/1" />
    </Switch>
  );
}
