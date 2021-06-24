import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AddStaff from "./components/AddStaff";
import ResetDefault from "./components/ResetDefault";
import ResetPassword from "./components/ResetPassword";
import Missing from "./components/Missing";

const Routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/auth/login" component={Login} />
			<Route exact path="/staff/add" component={AddStaff} />
			<Route exact path="/reset/default/password" component={ResetDefault} />
			<Route exact path="/reset/password" component={ResetPassword} />
			<Route component={Missing} />
		</Switch>
	</Router>
);

export default Routes;
