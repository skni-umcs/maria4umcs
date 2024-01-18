package cached

import "maria/handlers/utils/types"

// In-memory cache object
var cache = make(map[string]cachedItem)

// Get cached data from memory
func memoryGetCache(url string) types.Request {
	item := cache[url].Data
	return item
}

// Update cached data
func memoryRefreshCache(url string, data types.Request) {
	cache[url] = cachedItem{
		Time: GetTime(),
		Data: data,
	}
}

// Check if it's needed to refresh cache
func memoryIsOutdated(url string, offset uint64) bool {
	item, exists := cache[url]
	outdated := GetTime() >= item.Time+offset
	return outdated || !exists
}
