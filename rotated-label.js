export class RotatedLabel extends window.google.maps.OverlayView {

	constructor(position, text, rotation, map, customStyles = {}) {
		super();

		// Initialize all properties.
		this.position_ = position;
		this.text_ = text;
		if (rotation > 90 && rotation < 270) {
			rotation += 180;
		}
		this.rotation_ = rotation;
		this.customStyles_ = customStyles;

		// Define a property to hold the image's div. We'll
		// actually create this div upon receipt of the onAdd()
		// method so we'll leave it null for now.
		this.div_ = null;


		// Explicitly call setMap on this overlay.
		this.setMap(map);
	}

	/**
	 * onAdd is called when the map's panes are ready and the overlay has been
	 * added to the map.
	 */
	onAdd() {

		const div = document.createElement('div');
		div.style.borderStyle = 'none';
		div.style.borderWidth = '0px';
		div.style.position = 'absolute';
		div.style.transform = 'translate(-50%, 0)';

		// Create the img element and attach it to the div.
		const textElement = document.createElement('div');
		textElement.textContent = this.text_;
		textElement.style.transform = `rotate(${this.rotation_}deg)`;
		textElement.style.transformOrigin = "50% 50%";
		textElement.style.whiteSpace = 'nowrap';
		for (let [key, value] of Object.entries(this.customStyles_)) {
			textElement.style[key] = value;
		}
		this.textElement = textElement;
		div.appendChild(textElement);
		this.div_ = div;

		// Add the element to the "overlayLayer" pane.
		const panes = this.getPanes();
		panes.overlayLayer.appendChild(div);
	};

	draw() {

		// We use the south-west and north-east
		// coordinates of the overlay to peg it to the correct position.
		// To do this, we need to retrieve the projection from the overlay.
		this.overlayProjection = this.getProjection();
		this.moveOverlayDiv();
	};

	moveOverlayDiv() {
		// Retrieve position coordinates of this overlay
		// in LatLngs and convert them to pixel coordinates.
		// We'll use these coordinates to resize the div.
		const divPixel = this.overlayProjection.fromLatLngToDivPixel(this.position_);

		const div = this.div_;
		div.style.left = divPixel.x + 'px';
		div.style.top = divPixel.y + 'px';
	}

	// The onRemove() method will be called automatically from the API if
	// we ever set the overlay's map property to 'null'.
	onRemove() {
		if (!this.div_) {
			return;
		}

		this.div_.parentNode.removeChild(this.div_);
		this.div_ = null;
	};

	getPosition() {
		return this.position_;
	}

	setPosition(position) {
		this.position_ = position;

		if (!this.overlayProjection) return;

		this.moveOverlayDiv();
	}

	getText() {
		return this.text_;
	}

	setText(text) {
		this.text_ = text;
		this.textElement.textContent = this.text_;
	}

	getRotation() {
		return this.rotation_;
	}

	setRotation(rotation) {
		this.rotation_ = rotation;
		this.textElement.style.transform = `rotate(${this.rotation_}deg)`;
	}

	getCustomStyles() {
		return this.customStyles_;
	}

	setCustomStyles(customStyles) {
		this.customStyles_ = customStyles;
		for (let [key, value] of Object.entries(this.customStyles_)) {
			this.textElement.style[key] = value;
		}
	}

}
