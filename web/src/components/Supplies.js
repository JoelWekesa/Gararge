import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { getAllSupplies, specificSupply } from "../redux/supplies/actions";

export class Supplies extends Component {
	state = {
		term: "",
	};
	componentDidMount = async () => {
		await this.props.getAllSupplies();
	};

	handleAdd = async (id) => {
		await this.props.specificSupply(id);
		this.props.history.push(`/supply/${id}`);
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	render() {
		const { auth, supplies } = this.props;
		const { term } = this.state;
		const { isAuthenticated } = auth;
		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}

		try {
			const { rows } = supplies.products.supplies;
			return (
				<div className="grid-margin stretch-card">
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
							<h4 className="card-title">Available Supplies</h4>
							<p className="card-description">
								{" "}
								A breakdown of all available supplies
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
														{parseInt(supply.available) === 0 ? (
															<td className="text-danger">Out of stock</td>
														) : parseInt(supply.available) < 0 ? (
															<td className = "text-danger">Out of stock {supply.available}</td>
														) : (
															<td>{supply.available}</td>
														)}

														<td className="text-success"> {supply.price}</td>
														<td>
															<button
																onClick={() => this.handleAdd(supply.id)}
																type="submit"
																className="btn btn-gradient-info btn-fw">
																+ Add
															</button>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllSupplies: () => dispatch(getAllSupplies()),
		specificSupply: (id) => dispatch(specificSupply(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplies);
