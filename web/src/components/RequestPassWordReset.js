import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import Alert from "react-bootstrap/Alert";
import { Redirect } from "react-router-dom";

export class RequestPassWordReset extends Component {
	state = {
		username: "",
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

	handleClose = () => {
		this.setState({
			...this.state,
			error: null,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({
			...this.state,
			loading: true,
		});
		const url = `${baseUrl}/staff/request/code`;
		const { username } = this.state;
		const body = { username };
		axios
			.post(url, body)
			.then(() => {
				this.setState({
					...this.state,
					loading: false,
					redirect: true,
					error: null,
				});
			})
			.catch((err) => {
				this.setState({
					...this.state,
					redirect: false,
					error: err.message,
					loading: false,
				});
			});

		setTimeout(() => {
			this.setState({
				...this.state,
				error: null,
			});
		}, 5000);
	};
	render() {
		const { username, error, loading, redirect } = this.state;
		if (redirect) {
			return <Redirect to="/reset/password" />;
		}
		return (
			<div className="grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						{error && !loading ? (
							<Alert variant="danger" onClose={this.handleClose} dismissible>
								<Alert.Heading>Oh snap!</Alert.Heading>
								<p>Password reset code not sent..</p>
							</Alert>
						) : null}
						<h4 className="card-title">Hello, let's get started.</h4>
						<p className="card-description">
							{" "}
							Resetting your password has never been this easy.{" "}
						</p>
						<form className="forms-sample">
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

							{loading ? (
								<CircularProgress />
							) : (
								<button
									type="submit"
									className="btn btn-gradient-primary mr-2"
									onClick={this.handleSubmit}>
									Request Code
								</button>
							)}

							<div className="mt-4 font-weight-light">
								{" "}
								Remembered your login credentials?{" "}
								<a href="/auth/login" className="text-primary">
									Login
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default RequestPassWordReset;
