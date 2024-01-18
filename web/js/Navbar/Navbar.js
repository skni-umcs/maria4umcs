import App from "../App"
import { fetch } from "../utils/fetch"

export default class Navbar {
	constructor() {
		this.app = new App()
		this.div = document.querySelector("#navbar")
		this.init()
	}

	toggle() {
		this.div.classList.toggle("expanded")
		let darken = document.querySelector("#darken").classList
		if (this.div.classList.contains("expanded")) {
			darken.add("visible")
		}
		else {
			this.showPage("main")
			darken.remove("visible")
		}
	}

	showPage(target) {
		let pages = this.div.querySelectorAll("[page]")
		for (let page of pages) {
			if (page.getAttribute("page") == target) page.classList.add("current")
			else page.classList.remove("current")
		}
	}

	init() {
		this.initMain()
		this.fetchGroups()
	}

	initMain() {
		// Button to close navbar
		this.divMain = this.div.querySelector(`[page="main"]`)
		this.divMain.querySelector("i").addEventListener("click", () => {
			this.toggle()
		})

		// Close navbar when clicked outside
		document.querySelector("#darken").addEventListener("click", () => {
			this.toggle()
		})

		// Index page navigation items
		for (let item of this.divMain.querySelectorAll(".item")) {
			item.addEventListener("click", () => {
				this.showPage(item.getAttribute("target"))
			})
		}

		// Init subpage back buttons to go back to main page
		let pages = this.div.querySelectorAll("[page]")
		for (let page of pages) {
			if (page.getAttribute("page") != "main") {
				page.querySelector("i").addEventListener("click", () => {
					this.showPage("main")
				})
			}
		}

		// Show default page
		this.showPage("main")
	}

	fetchGroups() {
		let target = document.querySelector(`[page="group-select"]`)
		target = target.querySelector(".list")

		fetch((res) => {
			let groups = res
			target.innerHTML = ""

			for (let group of groups) {
				if (group.name.trim() == "") continue
				let item = document.createElement("div")
				item.innerText = group.name
				item.setAttribute("id", group.id)
				item.classList.add("item")
				
				item.addEventListener("click", () => {
					this.app.locationManager.selectClassId(group.id)
					this.app.timetable.load()
					this.toggle()
				})

				target.appendChild(item)
			}

		}, "better_students_list")

		let search = this.div.querySelector("#group-search")
		search.addEventListener("input", () => {
			let keyword = search.value.replaceAll(" ", "")
			keyword = keyword.toLowerCase()

			let groupList = target.children
			for (let item of groupList) {

				let hmm = item.innerText.replaceAll(" ", "")
				hmm = hmm.toLowerCase()

				if (!hmm.includes(keyword)) item.style.display = "none"
				else item.style.display = null
			}
		})
	}
}