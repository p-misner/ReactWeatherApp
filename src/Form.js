import React, { useState, useEffect } from "react";
import { openWeatherKey, googlePlacesKey } from "../apiKeys";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
// const loadScript = (url) => {
// 	let script = document.createElement("script");
// 	script.type = "text/javascript";
// 	script.crossOrigin = "";
// 	script.src = url;
// 	document.getElementsByTagName("head")[0].appendChild(script);
// };

function Form() {
	const [apiContent, setApi] = useState("wait");
	const [city, setCity] = useState("Reno");
	const [submitCity, setSubmitCity] = useState("Reno");
	const [unit, setUnit] = useState("imperial");

	let openWeatherCall =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		encodeURIComponent(submitCity) +
		"&units=" +
		unit +
		"&appid=" +
		openWeatherKey;

	let placesCall =
		"https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Cambridge&types=(cities)&key=" +
		googlePlacesKey;

	useEffect(() => {
		fetch(openWeatherCall)
			.then((response) => response.json())
			.then((json) => setApi([json, json.main]));
		// console.log(apiContent[0]);
	}, [unit, submitCity]);

	// useEffect(() => {
	// 	loadScript(
	// 		`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Cambridge&types=(cities)&key=${googlePlacesKey}`
	// 	);
	// 	fetch(placesCall)
	// 		.then((response) => response.json())
	// 		.then((json) => console.log(json.predictions));
	// 	// console.log(apiContent[0]);
	// }, []);

	function getForecast(e) {
		e.preventDefault();
		setSubmitCity(city);
	}

	return (
		<div className="content">
			<PlacesAutocomplete value={city} onChange={setCity} onSelect={}>
				

			</PlacesAutocomplete>
			<form onSubmit={getForecast}>
				<input
					type="text"
					placeholder="enter city"
					name="city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
				<label htmlFor="">
					<input
						type="radio"
						name="units"
						value="imperial"
						checked={unit === "imperial"}
						onChange={(e) => {
							setUnit(e.target.value);
						}}
					/>
					Fahrenheit
				</label>
				<label htmlFor="">
					<input
						type="radio"
						name="units"
						checked={unit === "metric"}
						value="metric"
						onChange={(e) => setUnit(e.target.value)}
					/>
					Celsius
				</label>

				<button>Submit</button>
			</form>
			<h2>current weather: {apiContent[1].temp}</h2>
			<h2>feels like: {apiContent[1].feels_like}</h2>
		</div>
	);
}

export default Form;
