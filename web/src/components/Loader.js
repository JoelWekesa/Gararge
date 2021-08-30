import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export class Loader extends Component {
	state = {
		redirect: false,
	};

	componentDidMount = async () => {
		await setTimeout(() => {
			this.setState({
				...this.state,
				redirect: true,
			});
			window.location.reload();
		}, 5);
	};
	render() {
		const { redirect } = this.state;
		if (redirect) {
			return <Redirect to="/" />;
		}
		return (
			<div className="container">
				<CircularProgress />
			</div>
		);
	}
}

export default Loader;
