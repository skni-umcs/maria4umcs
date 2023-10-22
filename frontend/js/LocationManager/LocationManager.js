export default class LocationManager {
	constructor() {
		this.onURLChange()
	}

	selectClassId(id) {
		let target = `${window.location.origin}?id=${id}`
		window.history.pushState("", "", target)
	}

	onURLChange() {}
}