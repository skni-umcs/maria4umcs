package config

type Config struct {
	ListenAddr string
	ListenPort uint16
	UseCache   bool
	CacheTime  uint
}

var config = Config{
	ListenAddr: "0.0.0.0", // Listen address
	ListenPort: 3000,      // Listen port
	UseCache:   true,      // Enable Moria request caching
	CacheTime:  15,        // For how long cache is valid, in minutes
}

func Init() {
	loadYaml()
}

func Get() Config {
	return config
}
