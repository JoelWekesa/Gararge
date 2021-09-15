import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import Alert from "react-bootstrap/Alert";
import { allDepartments, addDepartment } from "../redux/departments/actions";

export class Departments extends Component {
	state = {
		department: "",
		open: false,
	};
	componentDidMount = async () => {
		await this.props.allDepartments();
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
		const { department } = this.state;

		await this.props.addDepartment(department);
		this.setState({ ...this.state, open: true });
		this.props.allDepartments();
		setTimeout(() => {
			this.setState({ ...this.state, open: false });
		}, 3000);
	};

	render() {
		const { auth, departments, adddepartment } = this.props;
		const { isAuthenticated } = auth;
		const { department, open } = this.state;
		try {
			const { rows } = departments.departments.departments;
			const { loading, error } = adddepartment;
			if (!isAuthenticated) {
				return <Redirect to="/auth/login" />;
			}
			return (
				<div className="row">
					<div className="col-md-6 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<h4 className="card-title">Departments</h4>
								<p className="card-description">
									{" "}
									These are the departments in our team.
								</p>
								<div className="table-responsive">
									<table className="table table-hover ">
										<thead>
											<tr>
												<th>Department</th>
											</tr>
										</thead>
										<tbody>
											{rows.map((department, id) => {
												return (
													<tr key={id}>
														<td>{department.department}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-6 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								{error && !loading && open ? (
									<Alert
										variant="danger"
										onClose={this.handleClose}
										dismissible>
										<Alert.Heading>Oh snap!</Alert.Heading>
										<p>Department not created.</p>
									</Alert>
								) : !error && !loading && open ? (
									<Alert
										variant="success"
										onClose={this.handleClose}
										dismissible>
										<Alert.Heading>Success</Alert.Heading>
										<p>Department created.</p>
									</Alert>
								) : null}
								<h4 className="card-title">
									You can add a new department here.
								</h4>
								<p className="card-description">
									{" "}
									Adding departments has never been this easy.{" "}
								</p>
								<form className="forms-sample">
									<div className="form-group">
										<label htmlFor="first_name">Department Name</label>
										<input
											type="text"
											className="form-control"
											id="department_name"
											name="department"
											placeholder="Department"
											value={department}
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
											Add Department
										</button>
									)}
								</form>
							</div>
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
		adddepartment: state.adddepartment,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		allDepartments: () => dispatch(allDepartments()),
		addDepartment: (department) => dispatch(addDepartment(department)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
