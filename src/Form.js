import React, { useState, useEffect } from "react";
import { openWeatherKey } from "../apiKeys";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import Place from "./Place";
import Input from "./Input";
import TempChange from "./TempChange";
import WeatherImage from "./WeatherImage";
export default function Form() {
	const [apiContent, setApi] = useState("wait");
	const [city, setCity] = useState("Reno, NV, USA");
	const [submitCity, setSubmitCity] = useState("Reno, NV, USA");
	const [unit, setUnit] = useState("imperial");
	// const [latlong, setLatLong] = useState(["",""])

	let openWeatherCall =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		encodeURIComponent(submitCity) +
		"&units=" +
		unit +
		"&appid=" +
		openWeatherKey;

	useEffect(() => {
		fetch(openWeatherCall)
			.then((response) => response.json())
			.then((json) => setApi([json, json.main, json.weather]));
	}, [unit, submitCity]);

	function getForecast(e) {
		e.preventDefault();
		setSubmitCity(city);
	}

	function handleSelect(e) {
		setCity(e);
		setSubmitCity(e);
	}

	// const searchOptions = {
	// 	types: ['(cities)']
	// }

	const length = submitCity.split(",").map((i) => i.trim());
	const iconimg = Array.from(apiContent[2])[0].icon;
	return (
		<div className="content">
			<form onSubmit={getForecast}>
				<Place
					city={submitCity.split(",")[0]}
					state={length.length > 2 ? length[1] : "none"}
					country={length[length.length - 1]}
				/>
				<Input
					city={city}
					setCity={setCity}
					handleSelect={handleSelect}
				/>
				<TempChange unit={unit} setUnit={setUnit} />

				<button>Submit</button>
			</form>
			<h2>current weather: {apiContent[1].temp}</h2>
			<h2>feels like: {apiContent[1].feels_like}</h2>
			<h2>
				weather conditions:
				{Array.from(apiContent[2]).map((condition) => {
					return (
						<p key={condition.description}>
							{" "}
							{condition.main} ({condition.description})
						</p>
					);
				})}
			</h2>
			<WeatherImage icon={iconimg}></WeatherImage>
		</div>
	);
}
