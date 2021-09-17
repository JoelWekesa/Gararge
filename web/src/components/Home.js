import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { getAllStaff } from "../redux/staff/actions";
import { getWeeklySales } from "../redux/sales/actions.";
import { getWeeklyWashes } from "../redux/carwash/actions";
import { getAllSupplies, specificSupply } from "../redux/supplies/actions";
import { addToCart } from "../redux/sales/actions.";

export class Home extends Component {
	state = {
		term: "",
	};
	componentDidMount = async () => {
		await this.props.getAllStaff();
		await this.props.getWeeklySales();
		await this.props.getWeeklyWashes();
		await this.props.getAllSupplies();
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};

	handleAdd = (item) => {
		this.props.addToCart(item);
	};

	render() {
		const { auth, weekly, washes, supplies } = this.props;
		const { isAuthenticated } = auth;
		const { term } = this.state;
		if (!isAuthenticated) {
			return <Redirect to="/auth/login" />;
		}

		try {
			const { rows } = supplies.products.supplies;

			return (
				<div>
					<div className="page-header">
						<h3 className="page-title">
							<span className="page-title-icon bg-gradient-primary text-white mr-2">
								<i className="mdi mdi-home"></i>
							</span>{" "}
							Dashboard
						</h3>
						<nav aria-label="breadcrumb">
							<ul className="breadcrumb">
								<li className="breadcrumb-item active" aria-current="page">
									<span></span>Overview{" "}
									<i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
								</li>
							</ul>
						</nav>
					</div>
					<div className="row">
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-danger card-img-holder text-white">
								<div className="card-body">
									<h4 className="font-weight-normal mb-3">
										Monthly Sales{" "}
										<i className="mdi mdi-chart-line mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">KSH {weekly.amount.total}</h2>
									<h6 className="card-text">Car part sales</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-info card-img-holder text-white">
								<div className="card-body">
									<h4 className="font-weight-normal mb-3">
										Car wash{" "}
										<i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">KSH {washes.amount.total}</h2>
									<h6 className="card-text">Washes this week</h6>
								</div>
							</div>
						</div>
						<div className="col-md-4 stretch-card grid-margin">
							<div className="card bg-gradient-success card-img-holder text-white">
								<div className="card-body">
									<h4 className="font-weight-normal mb-3">
										Visitors Online{" "}
										<i className="mdi mdi-diamond mdi-24px float-right"></i>
									</h4>
									<h2 className="mb-5">95,5741</h2>
									<h6 className="card-text">Increased by 5%</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 grid-margin">
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
																<td className="text-success">
																	{" "}
																	{supply.selling_price}
																</td>
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
					</div>
				</div>
			);
		} catch (error) {
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
		weekly: state.weekly,
		washes: state.washes,
		supplies: state.supplies,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllStaff: () => dispatch(getAllStaff()),
		getWeeklySales: () => dispatch(getWeeklySales()),
		getWeeklyWashes: () => dispatch(getWeeklyWashes()),
		getAllSupplies: () => dispatch(getAllSupplies()),
		specificSupply: (id) => dispatch(specificSupply(id)),
		addToCart: (item) => dispatch(addToCart(item)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
