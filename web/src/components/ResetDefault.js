import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Alert from "react-bootstrap/Alert";
import { baseUrl } from "../config/baseUrl";

export class ResetDefault extends Component {
	state = {
		username: "",
		password: "",
		code: "",
		open: false,
		loading: false,
		error: null,
		redirect: false,
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleReset = async (e) => {
		e.preventDefault();
		this.setState({
			...this.state,
			loading: true,
		});
		const { username, password, code } = this.state;
		const url = `${baseUrl}/password/default`;
		const body = { username, password, code };
		await axios
			.put(url, body)
			.then(() => {
				this.setState({
					...this.state,
					error: null,
					loading: false,
					redirect: true,
				});
			})
			.catch((err) => {
				this.setState({
					...this.state,
					open: true,
					error: err.message,
					loading: false,
				});
			});
		setTimeout(() => {
			this.setState({
				...this.state,
				open: false,
			});
		}, 5000);
	};
	render() {
		const { auth } = this.props;
		const { isAuthenticated } = auth;
		const { error, loading, open, username, password, redirect, code } =
			this.state;
		if (isAuthenticated) {
			return <Redirect to="/" />;
		}
		if (redirect) {
			return <Redirect to="/" />;
		}
		return (
			<>
				{error && !loading && open ? (
					<Alert variant="danger" onClose={this.handleClose} dismissible>
						<Alert.Heading>Oh snap!</Alert.Heading>
						<p>Password not reset.</p>
					</Alert>
				) : null}
				<h4 className="card-title">Hello, let's reset your password.</h4>
				<p className="card-description">
					{" "}
					Reset your password to access services{" "}
				</p>
				<form className="pt-3">
					<div className="form-group">
						<label htmlFor="exampleInputUsername1">Username</label>
						<input
							name="username"
							type="text"
							className="form-control"
							id="exampleInputUsername1"
							placeholder="Username"
							value={username}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputCode1">Reset Code</label>
						<input
							name="code"
							type="code"
							className="form-control"
							id="exampleInputCode1"
							placeholder="Reset code"
							value={code}
							onChange={this.handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">New Password</label>
						<input
							name="password"
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="New Password"
							value={password}
							onChange={this.handleChange}
						/>
					</div>
					{loading ? (
						<CircularProgress />
					) : (
						<button
							type="submit"
							className="btn btn-gradient-primary mr-2"
							onClick={this.handleReset}>
							Reset Password
						</button>
					)}
					<div className="mt-4 font-weight-light">
						{" "}
						Already reset your password?{" "}
						<a href="/auth/login" className="text-primary">
							Login
						</a>
					</div>
				</form>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(ResetDefault);
