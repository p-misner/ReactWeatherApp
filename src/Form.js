import React, { useState, useEffect } from "react";
import { openWeatherKey } from "../apiKeys";
import { geocodeByAddress } from "react-places-autocomplete";
import Place from "./Place";
import Input from "./Input";
import TempChange from "./TempChange";
import WeatherImage from "./WeatherImage";
import { states } from "./data/states";

export default function Form() {
	const [apiContent2, setApi2] = useState("wait");
	const [city, setCity] = useState("Reno | Nevada");
	const [submitCity, setSubmitCity] = useState("Reno, NV, USA");
	const [unit, setUnit] = useState("imperial");
	const [coords, setCoords] = useState({
		lat: 33.441792,
		long: -94.037689,
	});

	let oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=${unit}&appid=${openWeatherKey}`;

	useEffect(() => {
		fetch(oneCall)
			.then((response) => response.json())
			.then((json) =>
				setApi2([json, json.current, json.current.weather[0]])
			);
	}, [unit, coords]);

	function getForecast(e) {
		e.preventDefault();
		setSubmitCity(city);
	}

	function handleSelect(e) {
		let length = e.split(",").map((i) => i.trim());
		let city = e.split(",")[0];
		let state = length.length > 2 ? length[1] : "none";
		let country = length[length.length - 1];
		geoCode(e);
		setCity(
			`${city} |  ${
				state != "none" && country == "USA" ? states[0][state] : country
			}`
		);
		setSubmitCity(e);
	}

	async function geoCode(value) {
		try {
			var result = await geocodeByAddress(value);
			result = Array.from(result)[0].geometry.location;
			setCoords({ lat: result.lat(), long: result.lng() });
		} catch (err) {
			console.log(err);
		}
	}

	const length = submitCity.split(",").map((i) => i.trim());

	return (
		<div className="content">
			<form onSubmit={getForecast}>
				<Input
					city={city}
					setCity={setCity}
					handleSelect={handleSelect}
					coords={coords}
				/>
				<TempChange unit={unit} setUnit={setUnit} />
			</form>
			<h2>current weather: {apiContent2[1].temp}</h2>
			<h2>weather conditions: {apiContent2[2].main}</h2>
			<WeatherImage icon={apiContent2[2].icon}></WeatherImage>
		</div>
	);
}
