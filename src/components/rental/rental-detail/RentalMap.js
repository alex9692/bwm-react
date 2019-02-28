import React from "react";

import { MapWithAGeoCode } from "../../map/GoogleMap";

class RentalMap extends React.Component {
	render() {
        const location = this.props.location;
		return (
			<MapWithAGeoCode
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCa_CwMxV4IgxZ4B6huQuavg-3dQdtH_g&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
			/>
		);
	}
}

export default RentalMap;
