import React, { useState, useEffect } from "react";
import { openWeatherKey } from "../apiKeys";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

export default function Form(){
	
	const [apiContent, setApi] = useState("wait");
	const [city, setCity] = useState("Reno");
	const [submitCity, setSubmitCity] = useState("Reno");
	const [unit, setUnit] = useState("imperial");
	const [latlong, setLatLong] = useState(["",""])

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
			.then((json) => setApi([json, json.main]));
	}, [unit, submitCity]);

	
	function getForecast(e) {
		e.preventDefault();
		setSubmitCity(city);
	}
	// const handleSelect = async value => {
	// 	let results = await geocodeByAddress(value);
	// 	console.log()
	// }

	function handleSelect(e) {
		setCity(e);
		setSubmitCity(e);

	}
	
	const searchOptions = {
		types: ['(cities)']
	}

	return (
		<div className="content" >
			
			<form onSubmit={getForecast}>
				
				<PlacesAutocomplete
				value={city}
				onChange={setCity}
				searchOptions={searchOptions}
				onSelect={handleSelect}
			>
				
			{({getInputProps, suggestions, getSuggestionItemProps, loading })=> 
				(
					<div>
						<input { ...getInputProps({placeholder: 'enter city'})} />
						<div>
							{loading ? <div> ... loading </div> : null}
								{suggestions.map((suggestion) =>{
								const style = {
									backgroundColor: suggestion.active ? "#ffb549" : "transparent"
								}
								return (
									<div key={suggestion.placeId} {...getSuggestionItemProps(suggestion,{style})}>
										{suggestion.description}
									</div>
								);
							})}
							
						</div>

					</div>

				)
			}
			</PlacesAutocomplete>
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

