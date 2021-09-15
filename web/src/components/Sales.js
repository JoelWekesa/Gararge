import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { getAllSupplies, specificSupply } from "../redux/supplies/actions";
import {
	addToCart,
	adjustQTY,
	removeFromCart,
	clearCart,
	newSale,
} from "../redux/sales/actions.";

export class Sales extends Component {
	state = {
		term: "",
		loading: false,
		price: 0,
	};
	componentDidMount = async () => {
		await this.props.getAllSupplies();
	};

	handleAdd = (item) => {
		this.props.addToCart(item);
	};

	handleSubtract = (item) => {
		if (item.qty <= 1) {
			this.props.removeFromCart(item);
		}

		this.props.adjustQTY(item);
	};

	handleClear = () => {
		this.props.clearCart();
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleSubmit = async () => {
		this.setState({
			...this.state,
			loading: true,
		});
		const { cart } = this.props;
		await cart.forEach((element) => {
			const quantity = element.qty;
			const { id, selling_price } = element;
			this.props.newSale(quantity, selling_price, id);
		});

		this.setState({
			...this.state,
			loading: false,
		});

		this.props.getAllSupplies();
		this.props.clearCart();
	};

	render() {
		const { auth, supplies, cart } = this.props;
		const { term, loading, price } = this.state;
		const { isAuthenticated } = auth;
		let grandtotal = 0;
		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}

		for (let index = 0; index < cart.length; index++) {
			grandtotal += parseInt(cart[index].selling_price) * parseInt(cart[index].qty);
		}

		try {
			const { rows } = supplies.products.supplies;
			return (
				<div className="row">
					<div className="col-md-7 grid-margin stretch-card">
						<div className="card">
							<form>
								<div className="input-group">
									<input
										type="text"
										className="form-control bg-transparent border-0"
										placeholder="Search supplies"
										name="term"
										value={term}
										onChange={this.handleChange}
									/>
								</div>
							</form>
							<div className="card-body">
								<h4 className="card-title">Available for sales</h4>
								<p className="card-description">
									{" "}
									A breakdown of all available supplies available for sale
								</p>
								<div className="table-responsive">
									<table className="table table-hover ">
										<thead>
											<tr>
												<th>Product</th>
												<th>Quantity Available</th>
												<th>Price</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{rows
												.filter((val) => {
													if (term === "") {
														return val;
													} else if (
														val.name
															.replaceAll(" ", "")
															.toLowerCase()
															.includes(
																term.replaceAll(" ", "").toLocaleLowerCase()
															)
													) {
														return val;
													} else {
														return val.name
															.replaceAll(" ", "")
															.toLowerCase()
															.includes(
																term.trim().replaceAll(" ", "").toLowerCase()
															);
													}
												})
												.map((supply, id) => {
													return (
														<tr key={id}>
															<td>{supply.name}</td>
															{supply.available > 0 ? (
																<td>{supply.available}</td>
															) : (
																<td className="text-danger">Out of stock</td>
															)}
															<td className="text-success"> {supply.selling_price}</td>
															{supply.available > 0 ? (
																<td>
																	<button
																		onClick={() => this.handleAdd(supply)}
																		type="submit"
																		className="btn btn-gradient-info btn-fw">
																		Add
																	</button>
																</td>
															) : (
																<td>
																	<button
																		onClick={() => this.handleAdd(supply)}
																		type="submit"
																		className="btn btn-gradient-info btn-fw"
																		disabled>
																		Add
																	</button>
																</td>
															)}
														</tr>
													);
												})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-5 grid-margin stretch-card">
						<div className="card">
							<div className="card-body">
								<h4 className="card-title">Items in cart</h4>
								<p className="card-description"> Items selected to be sold</p>
								<div className="table-responsive">
									<table className="table table-hover ">
										<thead>
											<tr>
												<th>Product</th>
												<th>Quantity</th>
												<th>Price</th>
												<th>Total</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{cart.map((supply, id) => {
												return (
													<tr key={id}>
														<td>{supply.name}</td>
														{supply.qty <= supply.available ? (
															<td>{supply.qty}</td>
														) : (
															<td className="text-danger">{supply.qty}</td>
														)}
														<td> {supply.selling_price}</td>
														
														<td className="text-success">
															{parseInt(supply.qty) * parseInt(supply.selling_price)}
														</td>
														<td>
															<button
																type="button"
																className="btn btn-gradient-success btn-rounded btn-icon"
																onClick={() => this.handleAdd(supply)}>
																<i className="mdi mdi-plus"></i>
															</button>
														</td>
														<td>
															<button
																type="button"
																className="btn btn-gradient-warning btn-rounded btn-icon"
																onClick={() => this.handleSubtract(supply)}>
																<i className="mdi mdi-minus"></i>
															</button>
														</td>
													</tr>
												);
											})}
											<tr>
												<td colSpan="3">Grand total</td>
												<td>{grandtotal}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="d-flex justify-content-end mt-3">
									<div className="mr-2">
										{loading ? (
											<CircularProgress />
										) : (
											<button
												type="button"
												className="btn btn-gradient-success btn-fw"
												onClick={this.handleSubmit}>
												Submit
											</button>
										)}{" "}
									</div>
									{/* <div className="">Space</div> */}
									<div>
										<button
											type="button"
											className="btn btn-gradient-danger btn-fw"
											onClick={this.handleClear}>
											Clear
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} catch (err) {
			return (
				<div className="container mx-auto mb-3">
					<CircularProgress />
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		supplies: state.supplies,
		cart: state.cart.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSupplies: () => dispatch(getAllSupplies()),
		specificSupply: (id) => dispatch(specificSupply(id)),
		addToCart: (item) => dispatch(addToCart(item)),
		adjustQTY: (item) => dispatch(adjustQTY(item)),
		removeFromCart: (item) => dispatch(removeFromCart(item)),
		clearCart: () => dispatch(clearCart()),
		newSale: (quantity, price, id) => dispatch(newSale(quantity, price, id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
