import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogout } from "../redux/auth/actions";
import image from "../assets/logo2.jpg";

export class Holder extends Component {
	handleLogout = (e) => {
		e.preventDefault();
		this.props.userLogout();
	};

	render() {
		const { auth, cart } = this.props;
		const { staff } = auth;
		const { admin, super_admin } = staff.user;

		let grandtotal = 0;

		for (let index = 0; index < cart.length; index++) {
			grandtotal +=
				parseInt(cart[index].selling_price) * parseInt(cart[index].qty);
		}

		return (
			<div className="container-scroller">
				<nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
					<div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
						<a className="navbar-brand brand-logo" href="/">
							<img src={image} alt="logo" />
						</a>
						<a className="navbar-brand brand-logo-mini" href="/">
							<img src="../assets/logo.png" alt="logo" />
						</a>
					</div>
					<div className="navbar-menu-wrapper d-flex align-items-stretch">
						<button
							className="navbar-toggler navbar-toggler align-self-center"
							type="button"
							data-toggle="minimize">
							<span className="mdi mdi-menu"></span>
						</button>
						<ul className="navbar-nav navbar-nav-right">
							<li className="nav-item nav-profile dropdown">
								<a
									className="nav-link dropdown-toggle"
									id="profileDropdown"
									href="/"
									data-toggle="dropdown"
									aria-expanded="false">
									<div className="nav-profile-text">
										<p
											className="mb-1 text-black"
											style={{ textTransform: "capitalize" }}>
											Hello {staff.user.first_name} {staff.user.last_name}
										</p>
									</div>
								</a>

								<div
									className="dropdown-menu navbar-dropdown"
									aria-labelledby="profileDropdown">
									<a className="dropdown-item" href="/">
										<i className="mdi mdi-cached mr-2 text-success"></i>
										Activity Log
									</a>
									<div className="dropdown-divider"></div>
									<a
										className="dropdown-item"
										href="/"
										onClick={this.handleLogout}>
										<i className="mdi mdi-logout mr-2 text-primary"></i> Signout
									</a>
								</div>
							</li>

							<li className="nav-item nav-logout d-none d-lg-block">
								<a
									className="nav-link"
									href="/auth/login"
									onClick={this.handleLogout}>
									<i className="mdi mdi-power"></i>
								</a>
							</li>
							{admin || super_admin ? 
							<li className="nav-item nav-settings d-none d-lg-block">
								<a className="nav-link" href="/sales/all">
									<i className="mdi mdi-cart"></i> {grandtotal}
								</a>
							</li> : null}
						</ul>
						<button
							className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
							type="button"
							data-toggle="offcanvas">
							<span className="mdi mdi-menu"></span>
						</button>
					</div>
				</nav>
				<div className="container-fluid page-body-wrapper">
					<nav className="sidebar sidebar-offcanvas" id="sidebar">
						<ul className="nav">
							<li className="nav-item">
								<a className="nav-link" href="/">
									<span className="menu-title">Dashboard</span>
									<i className="mdi mdi-home menu-icon"></i>
								</a>
							</li>

							{admin || super_admin ? (
								<>
									<li className="nav-item">
										<a className="nav-link" href="/departments">
											<span className="menu-title">Departments</span>
											<i className="mdi mdi-contacts menu-icon"></i>
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link new" href="/supply/add">
											<span className="menu-title">New Supply</span>
											<i className="mdi mdi-new-box menu-icon"></i>
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="/supply/all">
											<span className="menu-title">Existing Supply</span>
											<i className="mdi mdi-folder-plus menu-icon"></i>
										</a>
									</li>
								</>
							) : null}
							{admin || super_admin ? (
								<>
									<li className="nav-item">
										<a className="nav-link" href="/carwash/add">
											<span className="menu-title">Add Wash</span>
											<i className="mdi mdi-car-wash menu-icon"></i>
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="pages/samples/login.html">
											<span className="menu-title">View Washes</span>
											<i className="mdi mdi-car-wash menu-icon"></i>
										</a>
									</li>
								</>
							) : null}
							<li className="nav-item">
								<a className="nav-link" href="pages/forms/basic_elements.html">
									<span className="menu-title">Forms</span>
									<i className="mdi mdi-format-list-bulleted menu-icon"></i>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="pages/charts/chartjs.html">
									<span className="menu-title">Charts</span>
									<i className="mdi mdi-chart-bar menu-icon"></i>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="pages/tables/basic-table.html">
									<span className="menu-title">Tables</span>
									<i className="mdi mdi-table-large menu-icon"></i>
								</a>
							</li>

							<li className="nav-item">
								<a
									className="nav-link"
									data-toggle="collapse"
									href="#management-based"
									aria-expanded="false"
									aria-controls="manager">
									<span className="menu-title">Management</span>
									<i className="menu-arrow"></i>
									<i className="mdi mdi-medical-bag menu-icon"></i>
								</a>
								<div className="collapse" id="management-based">
									<ul className="nav flex-column sub-menu">
										{super_admin ? (
											<>
												<li className="nav-item">
													<a className="nav-link" href="/staff/add">
														Add New Staff
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/staff/add">
														Add admin
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/staff/add">
														Remove staff
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/staff/add">
														Remove admin
													</a>
												</li>
											</>
										) : null}
										<li className="nav-item">
											<a
												className="nav-link"
												href="pages/samples/error-404.html">
												404
											</a>
										</li>
										<li className="nav-item">
											<a
												className="nav-link"
												href="pages/samples/error-500.html">
												500
											</a>
										</li>
									</ul>
								</div>
							</li>
							<li className="nav-item sidebar-actions">
								<span className="nav-link">
									<div className="border-bottom">
										<h6 className="font-weight-normal mb-3">Projects</h6>
									</div>
									<button className="btn btn-block btn-lg btn-gradient-primary mt-4">
										+ Add a project
									</button>
									<div className="mt-4">
										<div className="border-bottom">
											<p className="text-secondary">Categories</p>
										</div>
									</div>
								</span>
							</li>
						</ul>
					</nav>
					<div className="main-panel">
						<div className="content-wrapper">
							{this.props.children}
							<footer className="footer">
								<div className="container-fluid clearfix">
									<span className="text-muted d-block text-center text-sm-left d-sm-inline-block">
										Copyright © KARL Motors {new Date().getFullYear()}
									</span>
								</div>
							</footer>
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
		cart: state.cart.cart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLogout: () => dispatch(userLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Holder);
