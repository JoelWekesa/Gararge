import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Alert from "react-bootstrap/Alert";
import Unauthorized from "./Unauthorized";
import { passwordReset } from "../redux/auth/actions";
import { getAllStaff } from "../redux/staff/actions";

export class ResetPassword extends Component {
	state = {
		username: "",
		open: false,
	};

	componentDidMount = () => {
		this.props.getAllStaff();
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
			open: false,
		});
	};

	handleReset = async (e) => {
		e.preventDefault();
		const { username } = this.state;
		await this.props.passwordReset(username);
		this.setState({
			...this.state,
			open: true,
			username: "",
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				open: false,
			});
		}, 4000);
	};
	render() {
		const { auth, password, staff } = this.props;
		const { isAuthenticated } = auth;
		const { error, loading, success } = password;
		const { username, open } = this.state;
		if (!isAuthenticated) {
			return <Redirect to="/" />;
		}

		const { super_admin } = auth.staff.user;
		if (!super_admin) {
			return <Unauthorized />;
		}

		const { rows } = staff.users.users;
		return (
			<div className="grid-margin stretch-card">
				{!error && !loading && success ? (
					<Modal
						show={open}
						dialogClassName="modal-90w"
						aria-labelledby="example-custom-modal-styling-title"
						size="sm">
						<Modal.Body>
							<p>Password reset was successful.</p>
						</Modal.Body>
					</Modal>
				) : null}
				<div className="card">
					<div className="card-body">
						{error && !loading && !success && open ? (
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
						<form className="forms-sample">
							<div className="form-group">
								<label htmlFor="department">User</label>
								<select
									className="form-control form-control-lg"
									id="username"
									name="username"
									onChange={this.handleChange}
									value={username}>
									<option>Select user</option>
									{rows.map((user) => {
										return (
											<option key={user.username} value={user.username}>
												{user.first_name} {user.last_name}
											</option>
										);
									})}
								</select>
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
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		passwordReset: (username) => dispatch(passwordReset(username)),
		getAllStaff: () => dispatch(getAllStaff()),
	};
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		password: state.password,
		staff: state.staff,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
