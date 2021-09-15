import React, { Component } from "react";
import Unauthorized from "./Unauthorized";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { jsPDF } from "jspdf";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { allCategories } from "../redux/categories/actions";
import { addSupply } from "../redux/supplies/actions";

export class AddSupply extends Component {
	state = {
		name: "",
		description: "",
		price: "",
		selling_price: "",
		quantity: "",
		category: "",
		categories: [],
		open: false,
		
	};

	componentDidMount = () => {
		this.props.allCategories();
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
			name: "",
			description: "",
			price: "",
			selling_price: "",
			quantity: "",
			category: "",
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { name, description, price, quantity, category, selling_price } = this.state;

		await this.props.addSupply(name, description, price, selling_price, quantity, category);

		this.setState({
			...this.state,
			open: true,
		});
	};

	handleDownload = () => {
		const { newsupply } = this.props;
		const { qrcode, name } = newsupply.supply.supply;
		
		const pdf = new jsPDF();

		pdf.addImage(qrcode, "JPEG", 10, 10);
		

		pdf.save(`${name}.pdf`);
		this.setState({
			...this.state,
			open: false,
			name: "",
			description: "",
			price: "",
			selling_price: "",
			quantity: "",
			category: "",
		});
	};

	render() {
		const { open, name, description, price, selling_price, quantity, category, } =
			this.state;
		const { auth, newsupply } = this.props;
		const { categories } = this.props.categories;
		const { isAuthenticated } = auth;
		const { error, loading } = newsupply;

		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}
		const { admin, super_admin } = auth.staff.user;
		if (!admin && !super_admin) {
			return <Unauthorized />;
		}

		return (
			<div className="grid-margin stretch-card">
				{!error && !loading ? (
					<Modal
						show={open}
						size="lg"
						aria-labelledby="contained-modal-title-vcenter"
						centered>
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title-vcenter">
								Success!
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h4>{name} was added.</h4>
							<p>{description}</p>
						</Modal.Body>
						<Modal.Footer>
							<button
								type="submit"
								className="btn btn-gradient-success mr-2"
								onClick={this.handleClose}>
								Add New
							</button>
							<button
								type="submit"
								className="btn btn-gradient-primary mr-2"
								onClick={this.handleDownload}>
								Download QRCode
							</button>
						</Modal.Footer>
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
							Adding new supplies has never been this easy.{" "}
						</p>
						<form className="forms-sample" id="form">
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									name="name"
									type="text"
									className="form-control"
									id="name"
									placeholder="Enter name of supply"
									value={name}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									name="description"
									type="text"
									className="form-control"
									id="description"
									placeholder="Describe new supply"
									value={description}
									rows={5}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="price">Price</label>
								<input
									name="price"
									type="number"
									className="form-control"
									id="price"
									placeholder="Enter buying price of supply."
									value={price}
									onChange={this.handleChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="price">Selling Price</label>
								<input
									name="selling_price"
									type="number"
									className="form-control"
									id="price"
									placeholder="Enter selling price of supply."
									value={selling_price}
									onChange={this.handleChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="quantity">Quantity</label>
								<input
									name="quantity"
									type="number"
									className="form-control"
									id="quantity"
									placeholder="Enter quantity of new supply."
									value={quantity}
									onChange={this.handleChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="category">Category</label>
								<select
									className="form-control form-control-lg"
									id="category"
									name="category"
									onChange={this.handleChange}
									value={category}>
									<option>Select Category</option>
									{categories.map((category) => {
										return (
											<option key={category.id} value={category.id}>
												{category.name}
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
									Add Supply
								</button>
							)}
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
		categories: state.categories,
		newsupply: state.newsupply,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addSupply: (name, description, price, selling_price, quantity, category) =>
			dispatch(addSupply(name, description, price, selling_price, quantity, category)),
		allCategories: () => dispatch(allCategories()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSupply);
