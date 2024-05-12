import React, { lazy, Suspense } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import WhatsaapLinkPage from "../Pages/GuestUser/WhatsaapLinkPage";
const LoginPage = lazy(() => import("../layout/Index"));
const Dashboard = lazy(() => import("../layout/DashBoard"));

const PublicRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.Auth.token);
  const RolesData = useSelector((state) => state.Auth.data);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn !== null && RolesData.hasOwnProperty("role_details") ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.Auth.token);
  const RolesData = useSelector((state) => state.Auth.data);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn !== null && RolesData.hasOwnProperty("role_details") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          <Route
            restricted={false}
            component={WhatsaapLinkPage}
            path="/maintenance_request_details/:id"
          />
          <PrivateRoute component={Dashboard} path="/home" />
          <PublicRoute restricted={false} component={LoginPage} path="/" />
          <PublicRoute
            restricted={false}
            component={WhatsaapLinkPage}
            path="/maintenance_request_details/:id"
          />
        </Switch>
      </Router>
    </Suspense>
  );
}
