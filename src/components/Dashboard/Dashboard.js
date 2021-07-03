import './Dashboard.css';
import Slider from '@material-ui/core/Slider';

function Dashboard(props) {

	return (
		<div className="dashboard">
			<h2>Map Analytics</h2>
			<div style={{
				textAlign: 'left',
				padding: '50px'
			}}>
				<h4>User Count</h4>
				<div className="mb-3">
					<div>
						<Slider
							value={[props.filters.displayUsers.min, props.filters.displayUsers.max]}
							onChange={(event, newValue) => {
								props.setFilters(filters => {
									return {
										...filters,
										displayUsers: {
											...(filters.displayUsers),
											min: newValue[0],
											max: newValue[1]
										}
									}
								})}}
							aria-labelledby="range-slider"
							valueLabelDisplay="auto"
							min={props.filters.displayUsers.minLimit}
							max={props.filters.displayUsers.maxLimit}
						/>
					</div>
				</div>
				<h4>User Type</h4>
				<div className="mb-3">
					<div>
						<div>
							<input type="checkbox" className='checkbox' checked={props.filters.users.proUser} onChange={(event) => {
								props.setFilters(filters => {
									return {
										...filters,
										users: {
											...(filters.users),
											proUser: event.target.checked
										}
									}
								})
							}}></input>
							<label>Pro users</label>
						</div>
						<div>
							<input type="checkbox" className='checkbox' checked={props.filters.users.freeUser} onChange={(event) => {
								props.setFilters(filters => {
									return {
										...filters,
										users: {
											...(filters.users),
											freeUser: event.target.checked
										}
									}
								})
							}}></input>
							<label>Free users</label>
						</div>
					</div>
				</div>
				<h4>Gender</h4>
				<div className="mb-3">
					<div>
						<div>
							<input type="checkbox" className='checkbox' checked={props.filters.gender.male} onChange={(event) => {
								props.setFilters(filters => {
									return {
										...filters,
										gender: {
											...(filters.gender),
											male: event.target.checked
										}
									}
								})
							}}></input>
							<label>Male</label>
						</div>
						<div>
							<input type="checkbox" className='checkbox' checked={props.filters.gender.female} onChange={(event) => {
								props.setFilters(filters => {
									return {
										...filters,
										gender: {
											...(filters.gender),
											female: event.target.checked
										}
									}
								})
							}}></input>
							<label>Female</label>
						</div>
					</div>
				</div>
				<h4>Gender Score</h4>
				<div className="mb-3">
					<div>
						<Slider
							value={[props.filters.genderScore.min, props.filters.genderScore.max]}
							onChange={(event, newValue) => {
								props.setFilters(filters => {
									return {
										...filters,
										genderScore: {
											...(filters.genderScore),
											min: newValue[0],
											max: newValue[1]
										}
									}
								})}}
							aria-labelledby="range-slider"
							valueLabelDisplay="auto"
							min={props.filters.genderScore.minLimit}
							max={props.filters.genderScore.maxLimit}
						/>
					</div>
				</div>
				<h4>Age</h4>
				<div className="mb-3">
					<div>
						<Slider
							value={[props.filters.age.min, props.filters.age.max]}
							onChange={(event, newValue) => {
								props.setFilters(filters => {
									return {
										...filters,
										age: {
											...(filters.age),
											min: newValue[0],
											max: newValue[1]
										}
									}
								})}}
							aria-labelledby="range-slider"
							valueLabelDisplay="auto"
							min={props.filters.age.minLimit}
							max={props.filters.age.maxLimit}
						/>
					</div>
				</div>
				<h4>Total matches</h4>
				<div className="mb-3">
					<div>
						<Slider
							value={[props.filters.match.min, props.filters.match.max]}
							onChange={(event, newValue) => {
								props.setFilters(filters => {
									return {
										...filters,
										match: {
											...(filters.match),
											min: newValue[0],
											max: newValue[1]
										}
									}
								})}}
							aria-labelledby="range-slider"
							valueLabelDisplay="auto"
							min={props.filters.match.minLimit}
							max={props.filters.match.maxLimit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;