import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import AddContract from "./AddContract";
import Contracts from "./Contracts";
import EditContract from "./EditContract";
import ViewContract from "./ViewContract";

export default function ContractRoute() {
  return (
    <Switch>
      <Route path="/home/contracts/view" component={ViewContract} exact />
      <Route path="/home/contracts/edit" component={EditContract} exact />
      <Route path="/home/contracts/add" component={AddContract} exact />
      <Route path="/home/contracts/:page" component={Contracts} exact />
      <Redirect to="/home/contracts/1" />
    </Switch>
  );
}
