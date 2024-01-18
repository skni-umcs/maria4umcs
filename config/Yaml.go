package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

func loadYaml() {
	filename := "config.yaml"
	contents, err := os.ReadFile(filename)

	if err == nil {
		// File exists, load it
		err = yaml.Unmarshal(contents, &config)
		if err != nil {
			fmt.Println("Couldn't load config file: " + err.Error())
		}

	} else if os.IsNotExist(err) {
		// When config does not exist, create a new one
		fmt.Println("Config file does not exist. Creating '" + filename + "'...")
		yml, _ := yaml.Marshal(config)

		err = os.WriteFile(filename, yml, 0750)
		if err == nil {
			fmt.Println("Config file has been created.")
		} else {
			fmt.Println("Couldn't create config file: " + err.Error())
		}

	} else {
		// Another error?
		fmt.Println("Couldn't load config file: " + err.Error())
	}
}
