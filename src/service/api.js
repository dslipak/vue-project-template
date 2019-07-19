const axios = require('axios')
const api = {
	serviceStatus: function (cb) {
		let resp;
		axios.get('/api/status')
		.then(function (response) {
			resp = response
		})
		.catch(function (error) {
			resp = error
		}).
		finally(function () {
			if (cb) {
				cb (resp)
			}
		})
	}
}

export default api