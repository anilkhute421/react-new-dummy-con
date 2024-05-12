import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import OwnerManagement from "./OwnerManagement";
import EditOwner from "./EditOwner";
import ViewOwner from "./ViewOwner";

export default function OwnersRoute() {
  return (
    <Switch>
      <Route component={ViewOwner} path="/home/owners/view" exact />
      <Route component={EditOwner} path="/home/owners/edit" exact />
      <Route component={OwnerManagement} path="/home/owners/:page" exact />
      <Redirect to="/home/owners/1" />
    </Switch>
  );
}
