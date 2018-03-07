# Map Label Rotated - A Google Maps JavaScript API utility library

Simple Javascript library to display rotated text on Google Maps.

Example:

[Demo image](img/demo.png)


## Installation
To install the stable version:

	npm install --save map-label-rotated
	
This assumes you are using npm as your package manager.	

## Usage

Hello world with rotation without styles:

	new RotatedLabel(new google.maps.LatLng(0, 0), "Hellow world", 45, map);
	
Hello world with rotation witho custom styles:

	new RotatedLabel(new google.maps.LatLng(0, 0), "Hellow world", 45, {
		color: "red",
		fontSize: "22px",
	});
	
## API

It simply extends the google.maps.OverlayView class with custom constructor:

Param | Type  | Description  
-------|------|------------
**`position`** | [`LatLng`](https://developers.google.com/maps/documentation/javascript/reference/3.exp/coordinates#LatLng) | Label position. Required.
**`text`** | `string` | Label text. Required.
**`rotation`** | `number` | Label rotation in degrees.
**`map`** | [`Map`](https://developers.google.com/maps/documentation/javascript/reference/3.exp/map#Map) | Map on which to display label.
**`customStyles`** | [`Style object`](https://www.w3schools.com/jsref/dom_obj_style.asp) | Set of CSS properties. Optional.

## License

MIT