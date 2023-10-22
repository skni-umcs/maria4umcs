package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed dist/web
var Web embed.FS

func main() {
	http.HandleFunc("/api/", ServeApi)

	fs, _ := fs.Sub(Web, "dist/web")
	http.Handle("/", http.FileServer(http.FS(fs)))

	http.ListenAndServe("0.0.0.0:3000", nil)
}
