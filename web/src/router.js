import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AddStaff from "./components/AddStaff";

const Routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/auth/login" component={Login} />
			<Route exact path="/staff/add" component={AddStaff} />
		</Switch>
	</Router>
);

export default Routes;
