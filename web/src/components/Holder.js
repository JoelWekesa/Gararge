import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogout } from "../redux/auth/actions";

export class Holder extends Component {
	handleLogout = (e) => {
		e.preventDefault();
		this.props.userLogout();
	};

	render() {
		const { auth } = this.props;
		const { staff } = auth;
		const { admin, super_admin } = staff.user;
		return (
			<div className="container-scroller">
				<nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
					<div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
						<a className="navbar-brand brand-logo" href="/">
							<img src="/assets/images/logo.svg" alt="logo" />
						</a>
						<a className="navbar-brand brand-logo-mini" href="/">
							<img src="/assets/images/logo-mini.svg" alt="logo" />
						</a>
					</div>
					<div className="navbar-menu-wrapper d-flex align-items-stretch">
						<button
							className="navbar-toggler navbar-toggler align-self-center"
							type="button"
							data-toggle="minimize">
							<span className="mdi mdi-menu"></span>
						</button>
						{/* <div className="search-field d-none d-md-block">
							<form className="d-flex align-items-center h-100" action="/">
								<div className="input-group">
									<div className="input-group-prepend bg-transparent">
										<i className="input-group-text border-0 mdi mdi-magnify"></i>
									</div>
									<input
										type="text"
										className="form-control bg-transparent border-0"
										placeholder="Search projects"
										onMouseEnter={this.handleEntered}
										onMouseLeave={this.handleLeave}
									/>
								</div>
							</form>
						</div> */}
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
										<i className="mdi mdi-cached mr-2 text-success"></i>{" "}
										Activity Log{" "}
									</a>
									<div className="dropdown-divider"></div>
									<a
										className="dropdown-item"
										href="/"
										onClick={this.handleLogout}>
										<i className="mdi mdi-logout mr-2 text-primary"></i> Signout{" "}
									</a>
								</div>
							</li>

							<li className="nav-item d-none d-lg-block full-screen-link">
								<a href="/" className="nav-link">
									<i className="mdi mdi-fullscreen" id="fullscreen-button"></i>
								</a>
							</li>

							<li className="nav-item dropdown">
								<a
									className="nav-link count-indicator dropdown-toggle"
									id="messageDropdown"
									href="/"
									data-toggle="dropdown"
									aria-expanded="false">
									<i className="mdi mdi-email-outline"></i>
									<span className="count-symbol bg-warning"></span>
								</a>
								<div
									className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
									aria-labelledby="messageDropdown">
									<h6 className="p-3 mb-0">Messages</h6>
									<div className="dropdown-divider"></div>
									<a href="/" className="dropdown-item preview-item">
										<div className="preview-thumbnail">
											<img
												src="/assets/images/faces/face4.jpg"
												alt="missing"
												className="profile-pic"
											/>
										</div>
										<div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
											<h6 className="preview-subject ellipsis mb-1 font-weight-normal">
												Mark send you a message
											</h6>
											<p className="text-gray mb-0"> 1 Minutes ago </p>
										</div>
									</a>
									<div className="dropdown-divider"></div>
									<a href="/" className="dropdown-item preview-item">
										<div className="preview-thumbnail">
											<img
												src="/assets/images/faces/face2.jpg"
												alt="missing"
												className="profile-pic"
											/>
										</div>
										<div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
											<h6 className="preview-subject ellipsis mb-1 font-weight-normal">
												Cregh send you a message
											</h6>
											<p className="text-gray mb-0"> 15 Minutes ago </p>
										</div>
									</a>
									<div className="dropdown-divider"></div>
									<a href="/" className="dropdown-item preview-item">
										<div className="preview-thumbnail">
											<img
												src="/assets/images/faces/face3.jpg"
												alt="missing"
												className="profile-pic"
											/>
										</div>
										<div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
											<h6 className="preview-subject ellipsis mb-1 font-weight-normal">
												Profile picture updated
											</h6>
											<p className="text-gray mb-0"> 18 Minutes ago </p>
										</div>
									</a>
									<div className="dropdown-divider"></div>
									<h6 className="p-3 mb-0 text-center">4 new messages</h6>
								</div>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link count-indicator dropdown-toggle"
									id="notificationDropdown"
									href="/"
									data-toggle="dropdown">
									<i className="mdi mdi-bell-outline"></i>
									<span className="count-symbol bg-danger"></span>
								</a>
								<div
									className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
									aria-labelledby="notificationDropdown">
									<h6 className="p-3 mb-0">Notifications</h6>
									<div className="dropdown-divider"></div>
									<a href="/" className="dropdown-item preview-item">
										<div className="preview-thumbnail">
											<div className="preview-icon bg-success">
												<i className="mdi mdi-calendar"></i>
											</div>
										</div>
										<div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
											<h6 className="preview-subject font-weight-normal mb-1">
												Event today
											</h6>
											<p className="text-gray ellipsis mb-0">
												{" "}
												Just a reminder that you have an event today{" "}
											</p>
										</div>
									</a>
									<div className="dropdown-divider"></div>
									<a href="/" className="dropdown-item preview-item">
										<div className="preview-thumbnail">
											<div className="preview-icon bg-warning">
												<i className="mdi mdi-settings"></i>
											</div>
										</div>
										<div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
											<h6 className="preview-subject font-weight-normal mb-1">
												Settings
											</h6>
											<p className="text-gray ellipsis mb-0">
												{" "}
												Update dashboard{" "}
											</p>
										</div>
									</a>
									<div className="dropdown-divider"></div>
									<a href="/" className="dropdown-item preview-item">
										<div className="preview-thumbnail">
											<div className="preview-icon bg-info">
												<i className="mdi mdi-link-variant"></i>
											</div>
										</div>
										<div className="preview-item-content d-flex align-items-start flex-column justify-content-center">
											<h6 className="preview-subject font-weight-normal mb-1">
												Launch Admin
											</h6>
											<p className="text-gray ellipsis mb-0">
												{" "}
												New admin wow!{" "}
											</p>
										</div>
									</a>
									<div className="dropdown-divider"></div>
									<h6 className="p-3 mb-0 text-center">
										See all notifications
									</h6>
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
							<li className="nav-item nav-settings d-none d-lg-block">
								<a className="nav-link" href="/">
									<i className="mdi mdi-format-line-spacing"></i>
								</a>
							</li>
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
								<li className="nav-item">
									<a className="nav-link" href="/departments">
										<span className="menu-title">Departments</span>
										<i className="mdi mdi-contacts menu-icon"></i>
									</a>
								</li>
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
									href="#management"
									aria-expanded="false"
									aria-controls="management">
									<span className="menu-title">Management</span>
									<i className="menu-arrow"></i>
									<i className="mdi mdi-medical-bag menu-icon"></i>
								</a>
								<div className="collapse" id="management">
									<ul className="nav flex-column sub-menu">
										{super_admin ? (
											<>
												<li className="nav-item" id="addstaff">
													{" "}
													<a className="nav-link" id="test" href="/staff/add">
														{" "}
														Add New Staff{" "}
													</a>
												</li>
												<li className="nav-item" id="addadmin">
													{" "}
													<a className="nav-link" href="/staff/add">
														Add admin
													</a>
												</li>
												<li className="nav-item">
													{" "}
													<a
														className="nav-link"
														href="/staff/add"
														id="removestaff">
														Remove staff
													</a>
												</li>
												<li className="nav-item">
													{" "}
													<a className="nav-link" href="/staff/add">
														Remove admin
													</a>
												</li>{" "}
											</>
										) : null}

										{admin || super_admin ? (
											<>
												<li className="nav-item">
													{" "}
													<a className="nav-link" href="/supply/add">
														{" "}
														Add New Supply{" "}
													</a>
												</li>
												<li className="nav-item">
													{" "}
													<a className="nav-link" href="/supply/all">
														{" "}
														Add to Existing Supply{" "}
													</a>
												</li>
												<li className="nav-item">
													{" "}
													<a className="nav-link" href="/carwash/add">
														{" "}
														Add Car Wash Record{" "}
													</a>
												</li>
												<li className="nav-item">
													{" "}
													<a
														className="nav-link"
														href="pages/samples/login.html">
														{" "}
														View Staff Washes
													</a>
												</li>{" "}
											</>
										) : null}
										<li className="nav-item">
											{" "}
											<a
												className="nav-link"
												href="pages/samples/error-404.html">
												{" "}
												404{" "}
											</a>
										</li>
										<li className="nav-item">
											{" "}
											<a
												className="nav-link"
												href="pages/samples/error-500.html">
												{" "}
												500{" "}
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
										Copyright © bootstrapdash.com 2020
									</span>
									<span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
										{" "}
										Free{" "}
										<a href="https://www.bootstrapdash.com/bootstrap-admin-template/">
											Bootstrap admin templates{" "}
										</a>{" "}
										from Bootstrapdash.com
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLogout: () => dispatch(userLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Holder);
