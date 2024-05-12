import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBuilding from "./AddBuilding";
import Buildings from "./Buildings";
import EditBuilding from "./EditBuilding";
import ViewBuilding from "./ViewBuilding";
export default function BuildingRoutes() {
  return (
    <Switch>
      <Route component={AddBuilding} path="/home/buildings/add" exact />
      <Route component={EditBuilding} path="/home/buildings/edit" exact />
      <Route component={ViewBuilding} path="/home/buildings/view" exact />
      <Route component={Buildings} path="/home/buildings/:page" exact />
      <Redirect to="/home/buildings/1" />
    </Switch>
  );
}
