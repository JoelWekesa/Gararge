import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { allDepartments } from "../redux/departments/actions";
import { addNewStaff } from "../redux/staff/actions";
import { password } from "../config/password";

export class AddStaff extends Component {
	state = {
		first_name: "",
		last_name: "",
		username: "",
		national_id: "",
		phone_number: "",
		department: "",
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

	handleSubmit = (e) => {
		e.preventDefault();
		const staff = {
			staff: true,
		};
		const {
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department,
		} = this.state;
		this.props.addNewStaff(
			first_name,
			last_name,
			username,
			national_id,
			phone_number,
			department,
			staff,
			password
		);
	};
	render() {
		const { departments, auth } = this.props;
		const { isAuthenticated } = auth;

		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}
		const { admin, super_admin } = auth.staff.user;
		if (!admin && !super_admin) {
			return <Redirect to="/" />;
		}
		try {
			const { rows } = departments.departments.departments;
			return (
				<div className="grid-margin stretch-card">
					<div className="card">
						<div className="card-body">
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
										onChange={this.handleChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="department">Department</label>
									<select
										className="form-control form-control-lg"
										id="department"
										name="department"
										onChange={this.handleChange}>
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
								<button
									type="submit"
									className="btn btn-gradient-primary mr-2"
									onClick={this.handleSubmit}>
									Add Staff
								</button>
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
