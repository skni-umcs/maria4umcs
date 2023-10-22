import { pad } from "./pad"

export function timeToInt(time) {
	let split = time.split(":")
	let h = parseInt(split[0])
	let m = parseInt(split[1])
	return h * 60 + m
}

export function intToTime(time) {
	let h = Math.floor(time / 60)
	let m = time % 60
	return `${pad(h)}:${pad(m)}`
}
