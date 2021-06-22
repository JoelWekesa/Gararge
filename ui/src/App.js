import React, { Component } from "react";
import Routes from "./router";
import Holder from "./components/Holder";

export class App extends Component {
	render() {
		return (
			<div>
				<Holder>
					<Routes />
				</Holder>
			</div>
		);
	}
}

export default App;
