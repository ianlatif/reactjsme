import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login/Login";
import Partner from "./containers/Partner/Partner";
import { useDispatch, useSelector } from "react-redux";
import { loginProtected } from "./containers/Login/action";
import Loading from "./components/Loading/Loading";
import axios from "axios";
import Cookie from "js-cookie";
import PartnerDetail from "./containers/Partner/PartnerDetail";
import Devices from "./containers/Devices/Devices";
import DeviceDetail from "./containers/Devices/DevicesDetail";
import CreatePartner from "./containers/Partner/CreatePartner";
import User from "./containers/Users/Users";
import { SelectorType } from "./reducer/type";

const access_token = Cookie.get("access_token");

console.log(access_token);
if (access_token)
  axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: SelectorType) => state.loginProtected);
  const isAuthLoading = useSelector(
    (state: SelectorType) => state.loginLoading
  );

  useEffect(() => {
    dispatch(loginProtected());
    return () => {};
  }, [dispatch]);
  return (
    <div>
      {isAuthLoading ? (
        <Loading />
      ) : (
        <Route
          render={() =>
            isAuth ? (
              <Switch>
                <Route exact path={`/partner`}>
                  <Partner />
                </Route>
                <Route path={`/partner/:id/:menu(devices|users)`}>
                  <PartnerDetail />
                </Route>
                <Route
                  exact
                  path={`/create/partner/:progress(company-information|user-credential|verify)`}
                >
                  <CreatePartner />
                </Route>
                <Route exact path={`/devices`}>
                  <Devices />
                </Route>
                <Route exact path={`/devices/:id`}>
                  <DeviceDetail />
                </Route>
                <Route exact path={`/users`}>
                  <User />
                </Route>
                <Redirect to={`/partner`} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path={`/login`}>
                  <Login />
                </Route>
                <Redirect to={`/login`} />
              </Switch>
            )
          }
        />
      )}
    </div>
  );
}

export default App;
