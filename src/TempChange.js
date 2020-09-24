import React from 'react';

export default function TempChange({unit, setUnit}){
	return(
	<div>
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
			</div>

	);

}