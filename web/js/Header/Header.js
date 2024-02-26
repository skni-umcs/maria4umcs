import App from "../App"
import { pad } from "../utils/pad"

export default class Header {
	constructor() {
		this.app = new App()
		this.settings = this.app.settings
		this.div = document.querySelector("#header")
		this.weekday = 0
		this.weekdays = this.app.weekdays
		this.months = this.app.months
		this.init()
	}

	init() {
		this.div.querySelector("i").addEventListener("click", () => {
			this.app.navbar.toggle()
		})
		this.initDateTime()
		this.initWeekdays()
	}

	initWeekdays() {
		let target = document.querySelector("#weekdays")

		for (let i = 0; i < 7; i++) {
			let item = document.createElement("div")
			item.innerText = this.weekdays[i]

			item.addEventListener("click", () => {
				this.weekday = i
				document.querySelector("#body").setAttribute("style", `--i: ${i}; --days: 7`)
			})

			if (!i) item.click()
			target.appendChild(item)
		}
	}

	initDateTime() {
		this.tick()
		setInterval(() => { this.tick() }, 1000)
	}

	tick() {
		let hour = document.querySelector("#clock-hour")
		let date = document.querySelector("#clock-date")
		let dateDay = date.querySelector(".day")
		let dateMonth = date.querySelector(".month")

		let now = new Date()
		let hh = now.getHours()
		let mm = now.getMinutes()
		let ss = now.getSeconds()
		let d = now.getDate()
		let m = now.getMonth()

		let showSeconds = this.settings.storage.data.showSeconds
		let seconds = showSeconds ? `:${pad(ss)}` : ""

		hour.innerText = `${pad(hh)}:${pad(mm)}` + seconds
		dateDay.innerText = d
		dateMonth.innerText = this.months[m]
	}
}