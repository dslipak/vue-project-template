const auth = {
	signin: function (email, pass, cb) {
		cb = arguments[arguments.length - 1]
			if (localStorage.token) {
			if (cb) cb(true)
			this.onChange(true)
			return
		}

		this.pretendRequest(email, pass, (res) => {
			if (res.authenticated) {
				localStorage.token = res.token
				if (cb) cb(true)
				this.onChange(true)
			} else {
				if (cb) cb(false)
				this.onChange(false)
			}
		})
	},

	pretendRequest: function (email, pass, cb) {
		setTimeout(() => {
			if (email === 'joe@example.com' && pass === 'password1') {
				cb({
					authenticated: true,
					token: Math.random().toString(36).substring(7)
				})
			} else {
				cb({ authenticated: false })
			}
		}, 0)
	},

	getToken: function () {
		return localStorage.token
	},

	signout: function (cb) {
		delete localStorage.token
		if (cb && typeof(cb) === 'function') cb()
		if (this) this.onChange(false)
	},

	signedIn: function () {
		return !!localStorage.token
	},

	onChange: function () {}
}

export default auth