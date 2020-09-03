import React from "react";
import ReactDOM from "react-dom";
import { API } from "./API";

const App = () => {
	return (
		<div>
			<div>
				<API />
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
