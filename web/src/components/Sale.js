import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { specificSupply, editSupply } from "../redux/supplies/actions";

export class Sale extends Component {
	state = {
		description: "",
		price: "",
		quantity: "",
		open: false,
	};
	componentDidMount = async () => {
		const { id } = this.props.match.params;

		await this.props.specificSupply(id);
		const { supply } = this.props;

		const product = supply.product.supply;
		this.setState({
			...this.state,
			description: product.description,
			price: product.price,
			id: product.id,
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { supply } = this.props;
		if (prevProps.supply !== supply) {
			const product = supply.product.supply;
			this.setState({
				...this.state,
				description: product.description,
				price: product.price,
				id: product.id,
			});
		}
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { description, price, id, quantity } = this.state;
		const supply = { description, price, id, quantity };
		await this.props.editSupply(supply);
		this.setState({
			...this.state,
			open: true,
		});
	};

	handleCancel = (e) => {
		this.props.history.push("/supply/all");
	};

	handleClose = () => {
		this.props.history.push("/supply/all");
	};
	render() {
		const { auth, supply } = this.props;
		const product = supply.product.supply;
		const { error, loading } = supply;
		const { description, price, quantity, open } = this.state;
		const { isAuthenticated } = auth;
		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}
		return (
			<div className="grid-margin stretch-card">
				{!loading && !error ? (
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
							<h4>{product.name} was edited.</h4>
							<p>{description}</p>
						</Modal.Body>
						<Modal.Footer>
							<button
								type="submit"
								className="btn btn-gradient-success mr-2"
								onClick={this.handleClose}>
								Close
							</button>
						</Modal.Footer>
					</Modal>
				) : null}
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Make a new sale</h4>
						<p className="card-description">
							{" "}
							Always endeavour to sale at a fair price{" "}
						</p>
						<form className="forms-sample">
							<div className="form-group">
								<label htmlFor="exampleInputName1">Name</label>
								<input
									type="text"
									className="form-control"
									id="exampleInputName1"
									readOnly
									value={product.name}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="exampleTextarea1">Description</label>
								<textarea
									className="form-control"
									id="exampleTextarea1"
									name="description"
									value={product.description}
									readOnly
									rows="4"></textarea>
							</div>

							<div className="form-group">
								<label htmlFor="exampleInputQty">Available</label>
								<input
									type="number"
									className="form-control"
									placeholder="Quantity"
									name="available"
									value={product.quantity}
									readOnly
								/>
							</div>

							<div className="form-group">
								<label htmlFor="exampleInputPrice">Price</label>
								<input
									type="number"
									className="form-control"
									name="price"
									value={price}
									onChange={this.handleChange}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="exampleInputQty">Quantity</label>
								<input
									type="number"
									className="form-control"
									placeholder="Quantity"
									name="quantity"
									value={quantity}
									onChange={this.handleChange}
								/>
								{parseInt(quantity) > parseInt(product.quantity) ? (
									<small style = {{color: "red"}}>Cannot sell more than available quantity</small>
								) : null}
							</div>

							<div className="d-flex flex-row">
								{parseInt(quantity) > parseInt(product.quantity) ? (
									<button
										type="submit"
										className="btn btn-gradient-primary mr-2"
										onClick={this.handleSubmit}
										disabled>
										Sale
									</button>
								) : (
									<button
										type="submit"
										className="btn btn-gradient-primary mr-2"
										onClick={this.handleSubmit}>
										Sale
									</button>
								)}
								<div className=""></div>
								<button
									className="btn btn-gradient-danger"
									onClick={this.handleCancel}>
									Cancel
								</button>
							</div>
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
		supply: state.supply,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		specificSupply: (id) => dispatch(specificSupply(id)),
		editSupply: (supply) => dispatch(editSupply(supply)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sale);
