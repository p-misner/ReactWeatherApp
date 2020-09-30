import React from "react";
import style from "./style/style.css";
export default function TempChange({ unit, setUnit }) {
	return (
		<div className={style.temp}>
			<input
				id="f"
				type="radio"
				name="units"
				value="imperial"
				checked={unit === "imperial"}
				onChange={(e) => {
					setUnit(e.target.value);
				}}
			/>

			<label htmlFor="f">˚F</label>

			<input
				id="c"
				type="radio"
				name="units"
				checked={unit === "metric"}
				value="metric"
				onChange={(e) => setUnit(e.target.value)}
			/>
			<label htmlFor="c">˚C</label>
		</div>
	);
}
