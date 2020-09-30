import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import style from "./style/style.css";
export default function Input(props) {
	const searchOptions = {
		types: ["(cities)"],
	};

	return (
		<PlacesAutocomplete
			value={props.city}
			onChange={props.setCity}
			searchOptions={searchOptions}
			onSelect={props.handleSelect}
		>
			{({
				getInputProps,
				suggestions,
				getSuggestionItemProps,
				loading,
			}) => (
				<div>
					<input {...getInputProps({ placeholder: "enter city" })} />
					<div className={style.suggestionList}>
						{loading ? <div> ... loading </div> : null}
						{suggestions.map((suggestion, i) => {
							const style = {
								opacity: suggestion.active ? "0.8" : "0.4",
								maxWidth: "500px",
								minWidth: "250px",
								width: "40vw",
								margin: "0 auto",
								textAlign: "center",
								left: "20vw",
								top: -10 + 15 * i,
							};
							return (
								<div
									className={style.suggestionss}
									key={suggestion.placeId}
									{...getSuggestionItemProps(suggestion, {
										style,
									})}
								>
									{suggestion.description}
								</div>
							);
						})}
					</div>
				</div>
			)}
		</PlacesAutocomplete>
	);
}
