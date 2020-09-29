import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

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
					<div>
						{loading ? <div> ... loading </div> : null}
						{suggestions.map((suggestion) => {
							const style = {
								backgroundColor: suggestion.active
									? "#ffb549"
									: "transparent",
							};
							return (
								<div
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
