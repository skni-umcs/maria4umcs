import Storage from "./Storage"

export default class Settings {
	constructor() {
		let n = document.getElementById("navbar")
		this.element = n.getElementsByClassName("settings")[0]
		this.storage = new Storage()
	}

	add(key, name, description, callback) {
		let nice = (val) => {return val ? "Enabled" : "Disabled"}
		let item = document.createElement("div")
		let value = this.storage.get(key)

		item.classList.add("item", "setting")
		item.innerHTML =
			`<div class="name">${name}</div>
			<div class="desc">${description}</div>
			<div class="status">${nice(value)}</div>`

		item.addEventListener("click", () => {
			let newval = !this.storage.get(key)
			this.storage.set(key, newval)
			item.getElementsByClassName("status")[0].innerText =
				nice(newval)
			if (callback) callback(newval)
		})

		if (callback) callback(value)
		this.element.appendChild(item)
	}

	init() {
		this.add("lightMode",
			"Light mode",
			"Can result in sunburns, you'd better put your sunglasses on",
			(val) => {
				let c = document.body.classList
				val ? c.add("light") : c.remove("light")
			}
		)

		this.add("showSeconds", "Show seconds", "Shows seconds in top bar's clock")
	}
}
