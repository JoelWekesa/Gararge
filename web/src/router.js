import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import AddStaff from "./components/AddStaff";
import ResetDefault from "./components/ResetDefault";
import Missing from "./components/Missing";
import AddSupply from "./components/AddSupply";
import AddCarwashRecord from "./components/AddCarwashRecord";
import RequestPassWordReset from "./components/RequestPassWordReset";

const Routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/auth/login" component={Login} />
			<Route exact path="/staff/add" component={AddStaff} />
			<Route exact path="/reset/password" component={ResetDefault} />
			<Route exact path= "/request/reset/code" component={RequestPassWordReset} />
			<Route exact path="/supply/add" component={AddSupply} />
			<Route exact path="/carwash/add" component={AddCarwashRecord} />
			<Route component={Missing} />
		</Switch>
	</Router>
);

export default Routes;
