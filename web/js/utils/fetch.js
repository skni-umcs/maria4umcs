export function fetch(callback, method, id) {
	const dev = import.meta.env.MODE == "development"

	let api_url
	if (dev) api_url = "http://localhost:3000/api/moria"
	else api_url = "/api/moria"

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