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

// iterates through all possible routes to find a route where the source is before destination and the distance between
// them is shortest. Also checks the return route and denotes the route direction using a flag (ForwardFlag)
// Returns the route and flag
func getShortestRoute(source string, dest string) ShortestRoute {
	routes := readRoutes()
	minDist := 100
	var shortestRoute ShortestRoute
	for _, route := range routes.Routes {
		sIndexlr := -1 // index of source when array is traversed from left to right (forward route)
		dIndexlr := -1 // index of destination when array is traversed from left to right (forward route)
		sIndexrl := -1 // index of source when array is traversed from right to left (return route)
		dIndexrl := -1 // index of destination when array is traversed from right to left (return route)
		for i, place := range route.Places {
			if place == source {
				sIndexlr = i
			}
			if place == dest {
				dIndexlr = i
			}
		}
		if sIndexlr < dIndexlr && sIndexlr != -1 && dIndexlr != -1 {
			if dIndexlr-sIndexlr < minDist {
				minDist = dIndexlr - sIndexlr
				shortestRoute.RawRoute = route
				shortestRoute.ForwardFlag = true
			}
		}
		for i, place := range route.RevPlaces {
			if place == source {
				sIndexrl = i
			}
			if place == dest {
				dIndexrl = i
			}
		}
		if sIndexrl < dIndexrl && sIndexrl != -1 && dIndexrl != -1 {
			if dIndexrl-sIndexrl < minDist {
				minDist = dIndexrl - sIndexrl
				shortestRoute.RawRoute = route
				shortestRoute.ForwardFlag = false
			}
		}
	}

	return shortestRoute
}

func getBuses(RouteName string, ForwardFlag bool) []Bus {
	var buses []Bus
	for i := 0; i < 10; i++ {
		var bus Bus
		bus.Set()
		buses = append(buses, bus)
	}

	var filteredBusses []Bus

	for _, bus := range buses {
		if bus.RouteName == RouteName && bus.ForwardFlag == ForwardFlag {
			filteredBusses = append(filteredBusses, bus)
		}
	}
	return filteredBusses
}
