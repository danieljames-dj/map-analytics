import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MapContainer, TileLayer, Popup, Polygon, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

const bengaluruCoordinates = [12.9716, 77.5946];
const defaultZoom = 10;

function Map(props) {
	const [map, setMap] = useState(null);

	function getColor(value, min, max) {
		const numberOfLevels = 10;
		const levelRange = (max-min)/numberOfLevels;
		const level = Math.floor((value-min-1)/levelRange);
		return `rgba(5, 68, 94, ${0.5 + 0.5 * level/numberOfLevels})`;
	}

	function MapStateListener() {
		useMapEvents({
			zoomend: () => {
				localStorage.setItem('mapZoom', map.getZoom());
			},
			move: () => {
				if (map.getCenter()) {
					localStorage.setItem('mapCenter', JSON.stringify([map.getCenter().lat, map.getCenter().lng]));
				}
			}
		});
	  	return null;
	}
	
	let maxCount = Number.MIN_SAFE_INTEGER, minCount = Number.MAX_SAFE_INTEGER;
	Object.entries(props.areas).forEach(([areaId, areaObj]) => {
		if (areaObj.count) {
			maxCount = Math.max(maxCount, areaObj.count);
			minCount = Math.min(minCount, areaObj.count);
		}
	});
	return (
		<MapContainer
			className="mapContainer"
			center={localStorage.getItem('mapCenter') ? JSON.parse(localStorage.getItem('mapCenter')) : bengaluruCoordinates}
			zoom={localStorage.getItem('mapZoom') || defaultZoom}
			scrollWheelZoom={true}
			whenCreated = {setMap}
		>
			<MapStateListener/>
			<TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				Object.entries(props.areas).map(([areaId, areaObj]) => {
					const userCount = areaObj.users.length;
					const maleCount = areaObj.users.filter(user => user.gender === 'M').length;
					const femaleCount = areaObj.users.filter(user => user.gender === 'F').length;
					const genderScore = (100 * Math.min(maleCount, femaleCount) / Math.max(maleCount, femaleCount)).toFixed(2);
					return (
						(userCount >= props.filters.displayUsers.min && userCount <= props.filters.displayUsers.max) &&
						(genderScore >= props.filters.genderScore.min && genderScore <= props.filters.genderScore.max) &&
						<Polygon key={areaId.toString()} pathOptions={{
							fillColor: getColor(areaObj.count, minCount, maxCount),
							weight: 1,
							color: 'black',
							fillOpacity: 0.9,
					}} positions={areaObj.polygonCoordinates[0].map(v => [v[1], v[0]])}>
						<Popup>
							<b>{areaObj.name}</b><br/>
							Pincode: {areaObj.pinCode}<br/>
							Users: {userCount}<br/>
							Pro-users: {areaObj.users.filter(user => user.isProUser).length}<br/>
							Free-users: {areaObj.users.filter(user => !user.isProUser).length}<br/>
							Male-users: {maleCount}<br/>
							Female-users: {femaleCount}<br/>
							Gender score: {genderScore}<br/>
						</Popup>
					</Polygon>)
				})
			}
		</MapContainer>
	)
}

export default Map;