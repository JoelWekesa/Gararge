import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import Loader from "./Loader";
import Alert from "react-bootstrap/Alert";
import { userLogin } from "../redux/auth/actions";
import { getAllSupplies } from "../redux/supplies/actions";

export class Login extends Component {
	state = {
		username: "",
		password: "",
		open: false,
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleLogin = (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		this.props.userLogin(username, password);
		this.props.getAllSupplies()

		this.setState({
			...this.state,
			open: true,
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				open: false,
			});
		}, 3000);
	};
	render() {
		const { auth } = this.props;
		const { open } = this.state;
		const { isAuthenticated, error, loading } = auth;
		if (isAuthenticated) {
			return <Loader />;
		}
		return (
			<>
				{error && !loading && open ? (
					<Alert variant="danger" onClose={this.handleClose} dismissible>
						<Alert.Heading>Oh snap!</Alert.Heading>
						<p>{error}</p>
					</Alert>
				) : null}
				<h4>Hello! let's get started.</h4>
				<h6 className="font-weight-light">Sign in to continue.</h6>
				<form className="pt-3">
					<div className="form-group">
						<label htmlFor="exampleInputUsername1">Username</label>
						<input
							name="username"
							type="text"
							className="form-control"
							id="exampleInputUsername1"
							placeholder="Username"
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input
							name="password"
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Password"
							onChange={this.handleChange}
						/>
					</div>
					<div className="mt-3">
						{loading ? (
							<CircularProgress />
						) : (
							<button
								type="submit"
								className="btn btn-gradient-primary mr-2"
								onClick={this.handleLogin}>
								Login
							</button>
						)}
					</div>

					<div className="mt-4 font-weight-light">
						{" "}
						New here of forgot password?{" "}
						<a href="/request/reset/code" className="text-primary">
							Reset Password
						</a>
					</div>
				</form>{" "}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLogin: (username, password) => {
			dispatch(userLogin(username, password));
		},
		getAllSupplies: () => dispatch(getAllSupplies()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
