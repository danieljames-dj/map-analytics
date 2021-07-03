function getUsers() {
	return new Promise((resolve, reject) => {
		fetch("https://kyupid-api.vercel.app/api/users").then(response => response.json())
			.then(result => {
				resolve(result.users);
			})
			.catch(error => {
				reject(error);
			})
	})
}

function getAreas() {
	return new Promise((resolve, reject) => {
		fetch("https://kyupid-api.vercel.app/api/areas").then(response => response.json())
			.then(result => {
				resolve(result.features);
			})
			.catch(error => {
				reject(error);
			})
	})
}

export {
	getUsers,
	getAreas
}