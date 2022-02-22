package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"math/rand"
	"net/http"
	"time"
)

// reads places.json and returns a PlacesList object
func readPlaces() PlacesList {
	content, err := ioutil.ReadFile("./places.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}
	var placesJson PlacesList
	err = json.Unmarshal(content, &placesJson)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}
	return placesJson
}

// reads routes.json and returns a RouteList object
func readRoutes() RouteList {
	content, err := ioutil.ReadFile("./routes.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}
	var routesJson RouteList
	err = json.Unmarshal(content, &routesJson)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}
	return routesJson
}

func EucDist(x1 float64, y1 float64, x2 float64, y2 float64) float64 {
	return math.Sqrt(math.Pow(x1-x2, 2) + math.Pow(y1-y2, 2))
}

func Randate() time.Time {
	min := time.Date(2001, 1, 0, 0, 0, 0, 0, time.UTC).Unix()
	max := time.Date(2020, 1, 0, 0, 0, 0, 0, time.UTC).Unix()
	delta := max - min

	sec := rand.Int63n(delta) + min
	return time.Unix(sec, 0)
}

// func GetDistance(origin string, destination string) map[string]interface{} {
// 	var url Url
// 	url.Set("bus", origin, destination)
// 	method := "GET"

// 	client := &http.Client{}
// 	req, err := http.NewRequest(method, url.URL, nil)

// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	res, err := client.Do(req)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	defer res.Body.Close()

// 	body, err := ioutil.ReadAll(res.Body)
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// 	fmt.Println("Util.go")
// 	fmt.Println(string(body))
// 	var raw map[string]interface{}
// 	json.Unmarshal(body, &raw)

// 	return raw
// }

func GetDistance(origin string, destination string) []byte {
	var url Url
	url.Set("bus", origin, destination)
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url.URL, nil)

	if err != nil {
		fmt.Println(err)
	}
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
	}

	return body
}
