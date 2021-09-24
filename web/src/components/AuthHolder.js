import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogout } from "../redux/auth/actions";


export class Holder extends Component {
	render() {
		return (
			<div className="container-scroller">
				<div className="container-fluid page-body-wrapper full-page-wrapper">
					<div className="content-wrapper d-flex align-items-center auth">
						<div className="row flex-grow">
							<div className="col-lg-4 mx-auto">
								<div className="auth-form-light text-left p-5">
									<div className="brand-logo">
										<img src="/assets/images/logo.svg" alt="logo" />
									</div>
									{this.props.children}
								</div>
							</div>
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
