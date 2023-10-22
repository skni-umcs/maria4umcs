export function pad(number, minLength = 2) {
	let result = String(number)
	let n = result.length

	while (n < minLength) {
		result = "0" + result
		n++
	}

	return result
}