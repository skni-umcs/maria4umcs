package main

import (
	"embed"
	"io"
	"io/fs"
	"net/http"
	"strconv"
	"strings"
)

var ApiUrl = "http://moria.umcs.lublin.pl/api/"

//go:embed dist/web
var Web embed.FS

// HTTP server
func main() {
	http.HandleFunc("/api/", ServeApi)

	fs, _ := fs.Sub(Web, "dist/web")
	http.Handle("/", http.FileServer(http.FS(fs)))

	http.ListenAndServe("0.0.0.0:3000", nil)
}

// Gets raw data from UMCS API
func FetchData(method string, id int) ([]byte, int, error) {
	var body_reader io.Reader
	var response []byte

	if id > -1 {
		body := `{"id": ` + strconv.Itoa(id) + `}`
		body_reader = strings.NewReader(body)
	}

	req, _ := http.NewRequest(http.MethodGet, (ApiUrl + method), body_reader)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	code := resp.StatusCode
	if err == nil {
		response, err = io.ReadAll(resp.Body)
	}

	return response, code, err
}

// Provides unchanged UMCS API directly to a webserver
func ServeApi(w http.ResponseWriter, r *http.Request) {
	method := strings.Replace(r.URL.Path, "/api/", "", 1)

	id, e := strconv.Atoi(r.URL.Query().Get("id"))
	if e != nil {
		id = -1
	}

	data, status, err := FetchData(method, id)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Add("Access-Control-Allow-Origin", "*")

	if err == nil {
		w.WriteHeader(status)
		w.Write(data)
	} else {
		w.WriteHeader(500)
		w.Write([]byte("Internal Server Error: " + err.Error()))
	}
}
