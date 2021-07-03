import 'bootstrap/dist/css/bootstrap.min.css';
import './Container.css'
import { useEffect, useState } from 'react';
import { getAreas, getUsers } from '../../apis/getData';
import Dashboard from '../Dashboard/Dashboard';
import Map from '../Map/Map';
import filterObject from '../../data/filter';

function Container() {
	const [areas, setAreas] = useState({});
	const [filters, setFilters] = useState(filterObject);

	const filter = function() {
		setAreas(areas => {
			Object.entries(areas).forEach(([areaId, areaObj]) => {
				let count = 0;
				areaObj.users.forEach(user => {
					let isUserCounted = true;
					isUserCounted &= (user.isProUser ? filters.users.proUser : filters.users.freeUser);
					isUserCounted &= (user.gender === 'M' ? filters.gender.male : filters.gender.female);
					isUserCounted &= (user.age >= filters.age.min && user.age <= filters.age.max);
					isUserCounted &= (user.totalMatches >= filters.match.min && user.totalMatches <= filters.match.max);
					count += isUserCounted;
				});
				areaObj.count = count;
			});
			return {...areas};
		})
	}

	useEffect(() => {
		Promise.all([getAreas(), getUsers()])
			.then(([areaList, userList]) => {
				const areasObject = {};
				let [minAgeLimit, maxAgeLimit] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
				let [minMatchLimit, maxMatchLimit] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
				let maxUserCount = 0;
				areaList.forEach(area => {
					areasObject[area.properties.area_id] = {
						name: area.properties.name.toUpperCase(),
						pinCode: area.properties.pin_code,
						polygonCoordinates: area.geometry.coordinates,
						users: [],
						count: 0
					};
				});
				userList.forEach(user => {
					areasObject[user.area_id].users.push({
						userId: user.user_id,
						age: user.age,
						gender: user.gender,
						isProUser: user.is_pro_user,
						totalMatches: user.total_matches
					});
					minAgeLimit = Math.min(minAgeLimit, user.age);
					maxAgeLimit = Math.max(maxAgeLimit, user.age);
					minMatchLimit = Math.min(minMatchLimit, user.total_matches);
					maxMatchLimit = Math.max(maxMatchLimit, user.total_matches);
					maxUserCount = Math.max(maxUserCount, areasObject[user.area_id].users.length);
				});
				setAreas(areasObject);
				setFilters(filters => {
					return {
						...filters,
						displayUsers: {
							...(filters.displayUsers),
							max: maxUserCount,
							maxLimit: maxUserCount
						},
						age: {
							min: minAgeLimit,
							max: maxAgeLimit,
							minLimit: minAgeLimit,
							maxLimit: maxAgeLimit
						},
						match: {
							min: minMatchLimit,
							max: maxMatchLimit,
							minLimit: minMatchLimit,
							maxLimit: maxMatchLimit
						}
					}
				})
			})
			.catch(error => {
				console.log(error);
			})
	}, []);
	useEffect(() => {
		filter();
	}, [filters]);
	return (
		<div className="Container">
			<Dashboard filters={filters} setFilters={setFilters}></Dashboard>
			<Map filters={filters} areas={areas}></Map>
		</div>
	);
}

export default Container;