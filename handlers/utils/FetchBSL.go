package utils

import (
	"encoding/json"
	"maria/config"
	"maria/handlers/utils/cached"
	"maria/handlers/utils/types"
	"strconv"
	"time"
)

type TimetableEntry struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

var needsRefresh = true

func BSLBackgroundJob() {
	for {
		if needsRefresh {
			needsRefresh = false
			FetchBSL(true)
		}
		time.Sleep(time.Minute)
	}
}

func FetchBSL(args ...bool) (types.Request, error) {
	if len(args) == 0 {
		args = append(args, false)
	}
	isBackgroundJob := args[0]

	const key = "better_students_list"

	// Return cached data if up to date
	maxCacheMins := uint64(config.Get().BSLTime)
	if !isBackgroundJob {
		needsRefresh = !cached.IsOutdated(key, maxCacheMins)
		return cached.Get(key), nil
	}

	// Fetch data from moria
	studentsList, err := FetchDataRaw("students_list", "", false)

	// Proceed if we have rocznik list
	if err == nil {
		var jsonData map[string]map[string][]TimetableEntry
		json.Unmarshal([]byte(studentsList.Content), &jsonData)
		arr := jsonData["result"]["array"]
		var timetablesNonEmpty []TimetableEntry

		// Loop over roczniks
		for _, x := range arr {
			var timetable map[string]map[string][]interface{}
			id := strconv.Itoa(x.Id)

			// Fetch timetable for single rocznik
			r, err := FetchDataRaw("activity_list_for_students", id, false)
			if err != nil {
				continue
			}

			// If successful, parse it and check if is empty
			json.Unmarshal([]byte(r.Content), &timetable)
			empty := len(timetable["result"]["array"]) == 0
			if !empty {
				timetablesNonEmpty = append(timetablesNonEmpty, x)
			}
		}

		// Save cache info
		stringifed, _ := json.Marshal(timetablesNonEmpty)
		cached.Refresh(key, types.Request{
			Status:      200,
			Content:     string(stringifed),
			ContentType: "application/json",
		})
	}

	return cached.Get(key), err
}
