package utils

import (
	"io"
	"maria/handlers/utils/cached"
	"maria/handlers/utils/types"
	"net/http"
	"path"
	"strings"
)

var ApiUrl = "http://moria.umcs.lublin.pl/api/"

// Same as below, but cache is enabled
func FetchData(method string, id string) (types.Request, error) {
	return FetchDataRaw(method, id, true)
}

// Gets raw data from Moria's API
func FetchDataRaw(method string, id string, useCache bool) (types.Request, error) {
	var body_reader io.Reader
	var data types.Request
	var err error

	// If cache is outdated, do a request
	if cached.IsOutdated(method) || !useCache {
		var response []byte

		// Create request body
		body := `{"id": ` + id + `}`
		body_reader = strings.NewReader(body)
		req, _ := http.NewRequest(http.MethodGet, ApiUrl, body_reader)
		req.URL.Path = path.Join(req.URL.Path, method)
		req.Header.Set("Content-Type", "application/json")

		// Do a request
		var resp *http.Response
		resp, err = http.DefaultClient.Do(req)
		data.Status = resp.StatusCode
		ok := data.Status == 200

		if err == nil {
			response, err = io.ReadAll(resp.Body)
			data.Content = string(response)
			data.ContentType = resp.Header.Get("Content-Type")
			if ok {
				cached.Refresh(method+"/"+id, data)
			}
		}
	} else {
		data = cached.Get(method)
	}

	return data, err
}
