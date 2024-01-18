package handlers

import (
	"maria/handlers/utils"
	"net/http"
	"net/url"
	"strings"
)

// Provides unchanged UMCS API directly to a webserver
func ServeMoriaApi(w http.ResponseWriter, r *http.Request) {
	// The main purpose of the whole backend lol
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Get method & passed id
	method := strings.Replace(r.URL.Path, "/api/moria/", "", 1)
	params, _ := url.ParseQuery(r.URL.RawQuery)
	id := params.Get("id")

	// Fetch data from moria
	data, err := utils.FetchData(method, id)
	if err == nil {
		w.Header().Set("Content-Type", data.ContentType)
		w.WriteHeader(data.Status)
		w.Write([]byte(data.Content))
	} else {
		w.Header().Set("Content-Type", "text/plain")
		w.WriteHeader(500)
		w.Write([]byte("Internal Server Error: " + err.Error()))
	}
}
