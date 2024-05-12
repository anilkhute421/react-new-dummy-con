import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Addpayment from "./Addpayment";
import Editpayment from "./Editpayment";
import Payments from "./Payments";

export default function PaymentRoute() {
  return (
    <Switch>
      <Route component={Addpayment} path="/home/payments/addpayments" exact />
      <Route component={Editpayment} path="/home/payments/edit" exact />
      <Route component={Payments} path="/home/payments/:page" exact />
      <Redirect to="/home/payments/1" />
    </Switch>
  );
}
