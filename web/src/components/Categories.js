import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addCategory } from "../redux/categories/actions";

export class Categories extends Component {
	state = {
		name: "",
		description: "",
		loading: false,
		open: false,
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
		this.setState({
			...this.state,
			loading: true,
		});
		const { name, description } = this.state;
		this.props.addCategory(name, description);

		this.setState({
			...this.state,
			open: true,
		});

		setTimeout(() => {
			this.setState({
				...this.state,
				loading: false,
				open: false,
				name: "",
				description: "",
			});
		}, 3000);
	};

	render() {
		const { name, description, loading, open } = this.state;
		const { auth, category } = this.props;
		const { error } = category;
		const { isAuthenticated } = auth;
		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}
		return (
			<div>
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
							<h4 className="card-title">Add New Product Category.</h4>
							<p className="card-description">Let's get started</p>
							<form className="forms-sample">
								<div className="form-group">
									<label htmlFor="plates">Category name</label>
									<input
										name="name"
										type="text"
										className="form-control"
										id="name"
										placeholder="Category"
										value={name}
										onChange={this.handleChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="plates">Description</label>
									<input
										name="description"
										type="text"
										className="form-control"
										id="description"
										placeholder="Describe this category"
										value={description}
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
										Add Record
									</button>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		category: state.addcategory.category,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addCategory: (name, description) =>
			dispatch(addCategory(name, description)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
