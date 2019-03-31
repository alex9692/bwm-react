import React from "react";
import { connect } from "react-redux";

import { MapWithAGeoCode } from "../../map/GoogleMap";
import * as actions from "../../../actions";

class RentalMap extends React.Component {
	reloadMapFinish = () => {
		this.props.dispatch(actions.reloadMapFinish());
	};

	render() {
		const { location, isReloading } = this.props;
		return (
			<MapWithAGeoCode
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDCa_CwMxV4IgxZ4B6huQuavg-3dQdtH_g&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `360px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				location={location}
				isReloading={isReloading}
				reloadMapFinish={this.reloadMapFinish}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		isReloading: state.rentalMap.isReloading
	};
};

export default connect(mapStateToProps)(RentalMap);
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
// AIzaSyDCa_CwMxV4IgxZ4B6huQuavg-3dQdtH_g
