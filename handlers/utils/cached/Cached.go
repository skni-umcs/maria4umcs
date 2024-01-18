package cached

import (
	"maria/handlers/utils/types"
	"time"
)

// Cached request with timestamp
type cachedItem struct {
	Time uint64
	Data types.Request
}

// Read data from cache
func Get(url string) types.Request {
	return memoryGetCache(url)
}

// Update cached data
func Refresh(url string, data types.Request) {
	memoryRefreshCache(url, data)
}

// Check if cache should be updated
func IsOutdated(url string, mins ...uint64) bool {
	if len(mins) == 0 {
		mins = append(mins, 15) // 15 minutes
	}
	seconds := mins[0] * 60

	return memoryIsOutdated(url, seconds)
}

// Helper function to get time in seconds
func GetTime() uint64 {
	return uint64(time.Now().Unix())
}
