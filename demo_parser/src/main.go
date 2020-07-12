package main

import (
	"encoding/json"
	"io/ioutil"
	"log"

	common "github.com/marcelogdeandrade/csgo_demo_viewer/src/common"
)

const frameFactor = 5

func main() {
	p, f := common.OpenDemo("./demos/polaris_inferno.dem")

	defer f.Close()
	defer p.Close()

	header, match := common.CreateMatchStruct(p, frameFactor)

	common.RegisterEventHandlers(p, match)

	common.AddStates(p, header, match)

	matchJSON, err := json.Marshal(match)

	if err != nil {
		log.Println(err)
	}

	_ = ioutil.WriteFile("test3.json", matchJSON, 0644)
}
