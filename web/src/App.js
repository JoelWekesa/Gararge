import React, { Component } from "react";
import Routes from "./router";
import { connect } from "react-redux";
import Holder from "./components/Holder";
import AuthHolder from "./components/AuthHolder";

export class App extends Component {
	render() {
		const { auth } = this.props;
		const { isAuthenticated } = auth;
		if (!isAuthenticated) {
			return (
				<div>
					<AuthHolder>
						<Routes />
					</AuthHolder>
				</div>
			);
		}
		return (
			<div>
				<Holder>
					<Routes />
				</Holder>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps)(App);
