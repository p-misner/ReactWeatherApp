import React, { useState, useEffect } from "react";
import { openWeatherKey } from "../apiKeys";
import { geocodeByAddress } from "react-places-autocomplete";
import Place from "./Place";
import Input from "./Input";
import TempChange from "./TempChange";
import WeatherImage from "./WeatherImage";
export default function Form() {
	// const [apiContent, setApi] = useState("wait");
	const [apiContent2, setApi2] = useState("wait");
	const [city, setCity] = useState("Reno, NV, USA");
	const [submitCity, setSubmitCity] = useState("Reno, NV, USA");
	const [unit, setUnit] = useState("imperial");
	const [coords, setCoords] = useState({
		lat: 33.441792,
		long: -94.037689,
	});

	let openWeatherCall =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		encodeURIComponent(submitCity) +
		"&units=" +
		unit +
		"&appid=" +
		openWeatherKey;
	let oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&appid=${openWeatherKey}`;

	// useEffect(() => {
	// 	fetch(openWeatherCall)
	// 		.then((response) => response.json())
	// 		.then((json) => setApi([json, json.main, json.weather]));
	// }, [unit, submitCity]);

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
		geoCode(e);
		setCity(e);
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
	// const iconimg = Array.from(apiContent[2])[0].icon;
	// const iconimg2 = ;
	// var hold1 = apiContent2[1];
	// try {
	// 	console.log(apiContent2[1].weather[0].icon);
	// } catch (err) {
	// 	console.log(err);
	// }
	/*	<h2>
				weather conditions:
				{Array.from(apiContent[2]).map((condition) => {
					return (
						<p key={condition.description}>
							{" "}
							{condition.main} ({condition.description})
						</p>
					);
				})}
			</h2>*/

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
