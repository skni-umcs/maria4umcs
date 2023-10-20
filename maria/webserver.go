package maria

import (
	"net/http"
	"os"
	"path"
)

var FrontendPath = "frontend"
var IndexFile = "index.html"

// Serves frontend files without directory listings
// Redirects to root path (/) on error
func ServeFrontend(w http.ResponseWriter, r *http.Request) {
	absolute_path := path.Join(FrontendPath, r.URL.Path)
	target, err := os.Stat(absolute_path)

	if err != nil || target.IsDir() {
		index, err2 := os.Stat(path.Join(absolute_path, IndexFile))

		if os.IsNotExist(err2) || index.IsDir() {
			http.Redirect(w, r, "/", http.StatusMovedPermanently)
			return
		}

		absolute_path = path.Join(absolute_path, IndexFile)
	}

	absolute_path = path.Join("./", absolute_path)
	http.ServeFile(w, r, absolute_path)
}
