import App from "../App"
import { intToTime } from "../utils/timeUtils"

export default class Details {
	constructor() {
		this.app = new App()
		this.div = document.querySelector("#details")
		this.header = this.div.querySelector(".header")
		this.darken = document.querySelector("#darken").classList
		this.init()
	}

	init() {
		this.header.querySelector("i").addEventListener("click", () => {
			this.darken.remove("visible")
			this.div.classList.remove("shown")
		})
	}

	show() {
		this.darken.add("visible")
		this.div.classList.add("shown")
	}

	set(lesson) {
		// What a mess, to be cleaned up
		let name = lesson.subject
		let type = lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)
		let room = lesson.room
		let time = `${intToTime(lesson.timeFrom)} - ${intToTime(lesson.timeTo)}`
		let breakTime = `Including ${intToTime(lesson.timeBreak)} for break`

		let group = null
		if (lesson.group == "*") {
			group = "Everyone"
		}
		else if (lesson.group != "") {
			group = `Group ${lesson.group}/${lesson.groupsOf}`
		}

		let teachers = ""
		for (let teacher of lesson.teachers) {
			if (teachers != "") teachers += ", "
			teachers += `${teacher.name}`
		}

		let participants = ""
		let partRepeatMap = []
		for (let participant of lesson.groups) {
			let p = `${participant.name}`
			if (participant.groups != 1) {
				p = `Group ${participant.group}/${participant.groups} | ${p}`
			}

			if (!partRepeatMap.includes(p)) {
				if (participants != "") participants += "\n"
				participants += p
				partRepeatMap.push(p)
			}

		}

		this.div.querySelector("#details-subject").innerText = name
		this.div.querySelector("#details-type").innerText = type
		this.div.querySelector("#details-room").innerText = room

		let grp = this.div.querySelector("#details-group")
		if (group) {
			let groupInt = parseInt(lesson.group)
			let groupsOfInt = parseInt(lesson.groupsOf)
			if (!isNaN(groupInt) && !isNaN(groupsOfInt)) {
				let groupsColorId = Math.round(groupInt / groupsOfInt * this.app.timetable.groupColors.length - 1)
				let groupColor = this.app.timetable.groupColors[groupsColorId]
				grp.setAttribute("style", `--color: ${groupColor}`)
			}
			else grp.setAttribute("style", null)
			grp.style.display = null
			grp.querySelector("div").innerText = group
		}
		else {
			grp.parentNode.style.display = "none"
		}

		this.div.querySelector("#details-time").innerText = time
		this.div.querySelector("#details-break").innerText = breakTime
		this.div.querySelector("#details-teacher").innerText = teachers
		this.div.querySelector("#details-participants").innerText = participants
	}
}