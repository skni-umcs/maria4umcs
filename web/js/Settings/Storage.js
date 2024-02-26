export default class Storage {
	constructor() {
		this.available = true
		this.data = {}

		try { let x = localStorage }
		catch (e) {
			this.available = false
			console.warn("WARN: localStorage is unavailable. All preferences will be reset upon reload.")
		}

		this.loadData()
	}

	loadData() {
		let x = { getItem: (key) => {} }
		if (this.available) {
			x = localStorage
		}
		this.data = {
			lightMode: x.getItem("lightMode") == "true" || false,
			showSeconds: x.getItem("showSeconds") == "true" || false
		}
	}

	set(key, value) {
		this.data[key] = value
		if (this.available) {
			localStorage.setItem(key, value)
		}
	}

	get(key) {
		return this.data[key]
	}
}
