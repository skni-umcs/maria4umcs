import App from "../App"
import { fetch } from "../utils/fetch"
import { keysrt } from "../utils/keysrt"
import { intToTime, timeToInt } from "../utils/timeUtils"

export default class Timetable {
	constructor() {
		this.app = new App()
		this.div = document.querySelector("#timetable")
		this.groupColors = ["#F22", "#F70", "#FC0", "#4D2", "#0DD", "#47F", "#B4F", "#F2A"]
		this.timetable = []
		this.id = null
		this.init()
	}

	init() {
		this.initPages()
	}

	initPages() {
		for (let i =  0; i < 7; i++) {
			let page = document.createElement("div")

			let scrollableContainer = document.createElement("div")
			scrollableContainer.innerText = "Please select from menu which group you want timetable for"

			page.appendChild(scrollableContainer)
			this.div.appendChild(page)
		}
	}

	load() {
		let currentURL = new URL(window.location.href)
		let id = currentURL.search.replace("?id=", "") // sooo bad
		this.get(id)
	}

	get(id) {
		this.id = id
		fetch((json) => {
			if (json.status != "ok") return
			let result = json.result.array
			this.timetable = Array.from({length: 7}, () => []);

			// Loop through subjects
			for (let entry of result) {

				// Loop though subject's events
				for (let event of entry.event_array) {

					let weekdayFromMonday = event.weekday - 1
					if (weekdayFromMonday < 0) weekdayFromMonday = 6

					// SmartGroup number indicator
					let group = ""
					let groups = 0
					let groupsOf = 0
					for (let g of entry.students_array) {
						if (g.id == this.id) {
							group = g.group
							groupsOf = g.groups
							groups++
						}
					}
					let allStudents = groupsOf == groups
					if (allStudents) group = "*"

					// Builds better per-day timetable object
					this.timetable[weekdayFromMonday].push({
						id: String(entry.id),
						subject: entry.subject,
						type: entry.type.name,
						teachers: entry.teacher_array,
						timeFrom: timeToInt(event.start_time),
						timeTo: timeToInt(event.end_time),
						timeBreak: timeToInt(event.break_length),
						room: event.room,
						group: group,
						groupsOf: groupsOf,
						groups: entry.students_array
					})
				}
			}
			this.addEntries()
		}, "activity_list_for_students", id)
	}

	addEntries() {
		for (let day of this.div.children) {
			day.children[0].innerHTML = ""
		}

		// Loop through week days
		for (let weekday in this.timetable) {
			let day = this.timetable[weekday]
			day.sort(keysrt("timeFrom"))

			// Loop through lessons in current day
			for (let lesson of day) {
				let item = document.createElement("div")
				item.classList.add("timetable-entry")

				let groupInt = parseInt(lesson.group)
				let groupsOfInt = parseInt(lesson.groupsOf)
				if (!isNaN(groupInt) && !isNaN(groupsOfInt)) {
					let groupsColorId = Math.round(groupInt / groupsOfInt * this.groupColors.length - 1)
					let groupColor = this.groupColors[groupsColorId]
					item.setAttribute("style", `--color: ${groupColor}`)
				}

				item.innerHTML = `
					<div>
						<div class="name">${lesson.subject}</div>
						<div class="info">
							<i>schedule</i>
							<div>${intToTime(lesson.timeFrom)} - ${intToTime(lesson.timeTo)}</div>
						</div>
						<div class="info">
							<i>domain</i>
							<div>${lesson.room}</div>
						</div>
					</div>
					<div class="group">${lesson.group}</div>
				`
				if (!isNaN(groupInt)) {
					item.querySelector(".group").setAttribute("style", `--groups: "/${groupsOfInt}"`)
				}

				this.div.children[weekday].appendChild(item)
			}
		}
	}
}
