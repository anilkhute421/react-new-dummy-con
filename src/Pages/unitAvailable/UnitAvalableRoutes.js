import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Index from "./Index";
import UnitAvailabeEdit from "./UnitAvailabeEdit";
import AddUnit from "./AddUnit";
import ViewUnitAvailable from "./ViewUnitAvailable";
export default function UnitAvalableRoutes() {
  return (
    <Switch>
      <Route component={AddUnit} path="/home/unit-available/add" exact />
      <Route
        component={UnitAvailabeEdit}
        path="/home/unit-available/edit"
        exact
      />
      <Route
        component={ViewUnitAvailable}
        path="/home/unit-available/view"
        exact
      />
      <Route component={Index} path="/home/unit-available/:page" exact />
      <Redirect to="/home/unit-available/1" />
    </Switch>
  );
}
