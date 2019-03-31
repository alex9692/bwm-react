import React from "react";
import Cacher from "../../services/cacher";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Circle,
	InfoWindow
} from "react-google-maps";

const MapComponent = props => {
	const coordinates = props.coordinates;
	const isError = props.isError;
	const isLocationLoaded = props.isLocationLoaded;

	return (
		<GoogleMap
			defaultZoom={13}
			defaultCenter={coordinates}
			center={coordinates}
			options={{ disableDefaultUI: isError ? true : false }}
		>
			{isLocationLoaded && !isError && (
				<Circle radius={500} center={coordinates} />
			)}
			{isLocationLoaded && isError && (
				<InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
					<div>
						Ooops, there is a problem to find location on the map, we are trying
						to resolve the problem as fast as possible. Contact host for
						additional informations if you are still interested in booking this
						place. We are sorry for the inconvenience.
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
};

const withGeoCode = WrappedComponet => {
	return class extends React.Component {
		constructor() {
			super();

			this.cacher = new Cacher();
			this.state = {
				coordinates: {
					lat: 0,
					lng: 0
				},
				isError: false,
				isLocationLoaded: false
			};
		}

		componentWillMount() {
			this.getGeocodeLocation();
		}

		componentDidUpdate() {
			const { isReloading } = this.props;
			if (isReloading) {
				this.getGeocodeLocation();
			}
		}

		updateCoordinates = coordinates => {
			this.props.reloadMapFinish();
			this.setState({
				coordinates,
				isLocationLoaded: true
			});
		};

		geocodeLocation = location => {
			const geocoder = new window.google.maps.Geocoder();
			return new Promise((resolve, reject) => {
				geocoder.geocode({ address: location }, (result, status) => {
					if (status === "ok") {
						const geometry = result[0].geometry.location;
						const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
						this.cacher.cacheValue(location, coordinates);

						resolve(coordinates);
					} else {
						reject("Error!!!");
					}
				});
			});
		};

		getGeocodeLocation = () => {
			const location = this.props.location;

			if (this.cacher.isValueCached(location)) {
				this.updateCoordinates(this.cacher.getCacheValue(location));
			} else {
				this.geocodeLocation(location).then(
					coordinates => {
						this.updateCoordinates(coordinates);
					},
					error => {
						this.props.reloadMapFinish();
						this.setState({ isError: true, isLocationLoaded: true });
					}
				);
			}
		};

		render() {
			return <WrappedComponet {...this.props} {...this.state} />;
		}
	};
};

export const MapWithAGeoCode = withScriptjs(
	withGoogleMap(withGeoCode(MapComponent))
);
