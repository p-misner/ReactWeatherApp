import React from "react";
import {states} from './data/states';
function Place({city, state, country}) {
	
	return(
		<div> 
			<h1>{city}|{(state != "none" && country == "USA")  ? states[0][state] : country} </h1>

		</div>

	);

}

export default Place;
