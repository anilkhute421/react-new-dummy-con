import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import AddTenant from './AddTenant';
import Tenantdetail from './Tenantdetail';
import EditTenant from './Tenantedit';
import Tenants from './Tenants';

export default function TenantRoute() {
  return (
    <Switch>
            <Route path="/home/tenants/add" component={AddTenant} exact />
          <Route path="/home/tenants/view" component={Tenantdetail} exact />
          <Route path="/home/tenants/edit" component={EditTenant} exact />
          <Route path="/home/tenants/" component={Tenants} />
            <Redirect to="/home/tenants/"/>
  </Switch>
  )
}
