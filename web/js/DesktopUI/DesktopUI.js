export default class DesktopUI {
	constructor() {
		document.body.addEventListener("click", this.manageUI)
		this.manageUI()
	}

	manageUI() {
		if (window.innerWidth < 1080) return
		let details = document.querySelector("#details").classList
		let body = document.body.classList
		let navbar = document.querySelector("#navbar").classList
		document.querySelector("#darken").classList.add("visible")
		if (details.contains("shown")) {
			body.add("detailed")
			navbar.remove("expanded")
		}
		else {
			body.remove("detailed")
			navbar.add("expanded")
		}
	}
}