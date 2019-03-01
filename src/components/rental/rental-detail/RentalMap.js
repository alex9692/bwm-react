import React from "react";

import { MapWithAGeoCode } from "../../map/GoogleMap";

class RentalMap extends React.Component {
	render() {
        const location = this.props.location;
		return (
			<MapWithAGeoCode
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCa_CwMxV4IgxZ4B6huQuavg-3dQdtH_g&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
			/>
		);
	}
}

export default RentalMap;
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
// AIzaSyDCa_CwMxV4IgxZ4B6huQuavg-3dQdtH_g