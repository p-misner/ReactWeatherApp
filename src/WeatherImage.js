import React from "react";

export default function WeatherImage({ icon }) {
	return (
		<div>
			<img
				src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
				alt=""
			/>
		</div>
	);
}
