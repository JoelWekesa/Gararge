import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const AddStaff = lazy(() => import("./components/AddStaff"));
const ResetDefault = lazy(() => import("./components/ResetDefault"));
const Missing = lazy(() => import("./components/Missing"));
const AddSupply = lazy(() => import("./components/AddSupply"));
const AddCarwashRecord = lazy(() => import("./components/AddCarwashRecord"));
const RequestPassWordReset = lazy(() =>
	import("./components/RequestPassWordReset")
);
const Supplies = lazy(() => import("./components/Supplies"));
const Supply = lazy(() => import("./components/Supply"));
const Sales = lazy(() => import("./components/Sales"));
const Sale = lazy(() => import("./components/Sale"));
const Departments = lazy(() => import("./components/Departments"));
const Categories = lazy(() => import("./components/Categories"));

const Routes = () => (
	<Suspense
		fallback={
			<div className="mt-5 mb-5">
				<CircularProgress />
			</div>
		}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/auth/login" component={Login} />
				<Route exact path="/staff/add" component={AddStaff} />
				<Route exact path="/reset/password" component={ResetDefault} />
				<Route
					exact
					path="/request/reset/code"
					component={RequestPassWordReset}
				/>
				<Route exact path="/supply/add" component={AddSupply} />
				<Route exact path="/departments" component={Departments} />
				<Route exact path="/carwash/add" component={AddCarwashRecord} />
				<Route exact path="/supply/all" component={Supplies} />
				<Route exact path="/sales/all" component={Sales} />
				<Route exact path="/supply/:id" component={Supply} />
				<Route exact path="/sale/:id" component={Sale} />
				<Route exact path="/categories/add" component={Categories} />
				<Route component={Missing} />
			</Switch>
		</Router>
	</Suspense>
);

export default Routes;
