package handlers

import (
	"maria/handlers/utils"
	"net/http"
)

func BetterStudentsList(w http.ResponseWriter, r *http.Request) {
	// The main purpose of the whole backend lol
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Fetch data from moria
	data, err := utils.FetchBSL()

	if err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(200)
		w.Write([]byte(data.Content))
	} else {
		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(500)
		w.Write([]byte("Internal Server Error: " + err.Error()))
	}
}
