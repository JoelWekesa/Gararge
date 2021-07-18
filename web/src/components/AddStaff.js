import React, { Component } from "react";
import Unauthorized from "./Unauthorized";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { allDepartments } from "../redux/departments/actions";
import { addNewStaff } from "../redux/staff/actions";

export class AddStaff extends Component {
	state = {
		first_name: "",
		last_name: "",
		username: "",
		national_id: "",
		phone_number: "",
		department: "",
		open: false,
	};

	componentDidMount = () => {
		this.props.allDepartments();
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { auth } = this.props;
		if (prevProps.auth !== auth) {
			this.props.allDepartments();
		}
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

	handleSubmit = async (e) => {
		e.preventDefault();
		const {
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department,
		} = this.state;

		await this.props.addNewStaff(
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department
		);

		this.setState({
			...this.state,
			first_name: "",
			last_name: "",
			username: "",
			national_id: "",
			phone_number: "",
			department: "",
			open: true,
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				open: false,
			});
		}, 5000);
	};
	render() {
		const {
			open,
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department,
		} = this.state;
		const { departments, auth, newstaff } = this.props;
		const { isAuthenticated } = auth;
		const { error, loading } = newstaff;

		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}
		const { admin, super_admin } = auth.staff.user;
		if (!admin && !super_admin) {
			return <Unauthorized />;
		}
		try {
			const { rows } = departments.departments.departments;
			return (
				<div className="grid-margin stretch-card">
					{!error && !loading ? (
						<Modal
							show={open}
							dialogClassName="modal-90w"
							aria-labelledby="example-custom-modal-styling-title"
							size="sm">
							<Modal.Body>
								<p>New staff successfully added.</p>
							</Modal.Body>
						</Modal>
					) : null}

					<div className="card">
						<div className="card-body">
							{error && !loading && open ? (
								<Alert variant="danger" onClose={this.handleClose} dismissible>
									<Alert.Heading>Oh snap!</Alert.Heading>
									<p>Staff not created.</p>
								</Alert>
							) : null}
							<h4 className="card-title">Hello, let's get started.</h4>
							<p className="card-description">
								{" "}
								Adding new staff has never been this easy.{" "}
							</p>
							<form className="forms-sample">
								<div className="form-group">
									<label htmlFor="first_name">First Name</label>
									<input
										name="first_name"
										type="text"
										className="form-control"
										id="first_name"
										placeholder="First Name"
										value={first_name}
										onChange={this.handleChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="last_name">Last Name</label>
									<input
										name="last_name"
										type="text"
										className="form-control"
										id="last_name"
										placeholder="Last Name"
										value={last_name}
										onChange={this.handleChange}
									/>
								</div>
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
									<label htmlFor="national_id">National ID</label>
									<input
										name="national_id"
										type="text"
										className="form-control"
										id="national_id"
										placeholder="National ID"
										value={national_id}
										onChange={this.handleChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="phone_number">Phone Number</label>
									<input
										name="phone_number"
										type="text"
										className="form-control"
										id="phone_number"
										placeholder="Phone Number"
										value={phone_number}
										onChange={this.handleChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="department">Department</label>
									<select
										className="form-control form-control-lg"
										id="department"
										name="department"
										onChange={this.handleChange}
										value={department}>
										<option>Select Department</option>
										{rows.map((department) => {
											return (
												<option key={department.id} value={department.id}>
													{department.department}
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
										onClick={this.handleSubmit}>
										Add Staff
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
			);
		} catch (error) {
			return (
				<div className="container mx-auto">
					<CircularProgress />
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		departments: state.departments,
		newstaff: state.newstaff,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		allDepartments: () => dispatch(allDepartments()),
		addNewStaff: (
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department
		) =>
			dispatch(
				addNewStaff(
					first_name,
					last_name,
					username,
					national_id,
					phone_number,
					department
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStaff);
