import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form.js";
// import MyImage from './assets/dog.jpg';

const App = () => {
	return (
		<div>
			<Form />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
