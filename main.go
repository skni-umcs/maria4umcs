package main

import (
	"embed"
	"fmt"
	"io/fs"
	"maria/config"
	"maria/handlers"
	"net/http"
	"strconv"
)

//go:embed dist/web
var Web embed.FS

// HTTP server
func main() {
	config.Init()
	var conf = config.Get()
	listen_on := conf.ListenAddr + ":" + strconv.Itoa(int(conf.ListenPort))
	fmt.Println("App will be available on http://" + listen_on)

	// Handlers
	http.HandleFunc("/api/moria/", handlers.ServeMoriaApi)

	// Static assets
	fs, _ := fs.Sub(Web, "dist/web")
	http.Handle("/", http.FileServer(http.FS(fs)))

	// Run app
	err := http.ListenAndServe(listen_on, nil)
	fmt.Println(err)
}
