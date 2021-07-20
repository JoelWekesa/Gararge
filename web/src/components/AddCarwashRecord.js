import React, { Component } from "react";
import Unauthorized from "./Unauthorized";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { allDepartments } from "../redux/departments/actions";
import { addNewStaff, getAllStaff } from "../redux/staff/actions";
import { washPrices, addWashRecord } from "../redux/carwash/actions";

export class AddCarwashRecord extends Component {
	state = {
		type: "",
		plates: "",
		member: "",
		open: false,
	};

	componentDidMount = () => {
		this.props.allDepartments();
		this.props.getAllStaff();
		this.props.washPrices();
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
		const { type, plates, member } = this.state;
		const staff = member;
		this.props.addWashRecord(type, plates, staff);

		this.setState({
			...this.state,
			open: true,
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				open: false,
				type: "",
				plates: "",
				member: "",
			});
		}, 3000);
	};
	render() {
		const { open, member, plates, type } = this.state;
		const { auth, staff, wash, addwash } = this.props;

		const { isAuthenticated } = auth;
		const { error, loading } = addwash;

		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}
		const { admin, super_admin } = auth.staff.user;
		if (!admin && !super_admin) {
			return <Unauthorized />;
		}
		try {
			const { rows } = staff.users.users;
			const { prices } = wash;
			return (
				<div className="grid-margin stretch-card">
					{!error && !loading ? (
						<Modal
							show={open}
							dialogClassName="modal-90w"
							aria-labelledby="example-custom-modal-styling-title"
							size="sm">
							<Modal.Body>
								<p>Record successfully added.</p>
							</Modal.Body>
						</Modal>
					) : null}

					<div className="card">
						<div className="card-body">
							{error && !loading && open ? (
								<Alert variant="danger" onClose={this.handleClose} dismissible>
									<Alert.Heading>Oh snap!</Alert.Heading>
									<p>{error}</p>
								</Alert>
							) : null}
							<h4 className="card-title">Hello, let's get started.</h4>
							<p className="card-description">
								{" "}
								Adding a new carwash has never been this easy.{" "}
							</p>
							<form className="forms-sample">
								<div className="form-group">
									<label htmlFor="plates">Vehicle plates</label>
									<input
										name="plates"
										type="text"
										className="form-control"
										id="plates"
										placeholder="Vehicle plates"
										value={plates}
										onChange={this.handleChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="type">Vehicle category</label>
									<select
										className="form-control form-control-lg"
										id="type"
										name="type"
										onChange={this.handleChange}
										value={type}>
										<option>Select Category</option>
										{prices.map((price) => {
											return (
												<option key={price.id} value={price.type}>
													{price.type}
												</option>
											);
										})}
									</select>
								</div>

								<div className="form-group">
									<label htmlFor="member">Staff</label>
									<select
										className="form-control form-control-lg"
										id="member"
										name="member"
										onChange={this.handleChange}
										value={member}>
										<option>Select Staff</option>
										{rows.map((user) => {
											return (
												<option key={user.id} value={user.id}>
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
										onClick={this.handleSubmit}>
										Add Record
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
		staff: state.staff,
		wash: state.wash,
		addwash: state.addwash,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		allDepartments: () => dispatch(allDepartments()),
		getAllStaff: () => dispatch(getAllStaff()),
		washPrices: () => dispatch(washPrices()),
		addWashRecord: (type, plates, staff) =>
			dispatch(addWashRecord(type, plates, staff)),
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCarwashRecord);
