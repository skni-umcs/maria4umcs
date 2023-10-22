export function fetch(callback, method, id) {
	const api_url = "/api"

	let url = `${api_url}/${method}`
	if (id) url += `?id=${id}`

	let xhr = new XMLHttpRequest()
	xhr.open("GET", url)
	xhr.onload = function() {
		let json = JSON.parse(this.responseText)
		callback(json)
	}
	xhr.send()
}