package main

import (
	"maria/maria"
	"net/http"
)

func main() {
	http.HandleFunc("/", maria.ServeFrontend)
	http.HandleFunc("/api/", maria.ServeApi)

	http.ListenAndServe("0.0.0.0:3000", nil)
}
