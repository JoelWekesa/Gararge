import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../redux/auth/actions";

export class Login extends Component {
	state = {
		username: "",
		password: "",
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
	};
	render() {
		return (
			<div className="grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Hello, let's get started.</h4>
						<p className="card-description">
							{" "}
							Login to your account to access services{" "}
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
							<button
								type="submit"
								className="btn btn-gradient-primary mr-2"
								onClick={this.handleLogin}>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
