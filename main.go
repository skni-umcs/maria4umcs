package main

import (
	"embed"
	"fmt"
	"io/fs"
	"maria/handlers"
	"net/http"
	"os"
)

//go:embed dist/web
var Web embed.FS

// HTTP server
func main() {
	address := "0.0.0.0"
	port := os.Getenv("MARIA_PORT")
	if port == "" {
		port = "3000"
	}

	listen_on := address + ":" + port
	fmt.Println("App will be available on http://" + listen_on)

	http.HandleFunc("/api/", handlers.ServeMoriaApi)

	fs, _ := fs.Sub(Web, "dist/web")
	http.Handle("/", http.FileServer(http.FS(fs)))

	http.ListenAndServe(listen_on, nil)
}
