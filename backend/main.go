package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// defines a standard geographical area
type Place struct {
	Name string
	Lat  float64
	Lng  float64
}

// defines the places.json input format (for reading only)
type PlacesList struct {
	Places []Place
}

// defines a standard bangalore bus route
type Route struct {
	RouteName   string
	Origin      string
	Destination string
	Places      []string
}

// defines the routes.json input format (for reading only)
type RouteList struct {
	Routes []Route
}

type Distance struct {
	Destination_addresses []string
	Origin_addresses      []string
	Rows                  []Row
}

type Row struct {
	Elements []Element `json:"elements"`
}

type Element struct {
	Distance Distance_struct `json:"distance"`
	Duration Duration_struct `json:"duration"`
	Status   string          `json:"status"`
}

type Distance_struct struct {
	Text  string `json:"text"`
	Value int    `json:"value"`
}

type Duration_struct struct {
	Text  string `json:"text"`
	Value int    `json:"value"`
}

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

func getPlaces(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, readPlaces().Places)
}

func getRoutes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, readRoutes().Routes)
}

func getShortestRoute(c *gin.Context) {
	source := c.Query("source")
	dest := c.Query("dest")
	routes := readRoutes()
	minDist := 100
	var shortestRoute Route
	for _, route := range routes.Routes {
		sIndex := -1
		dIndex := -1
		for i, place := range route.Places {
			if place == source {
				sIndex = i
			}
			if place == dest {
				dIndex = i
			}
		}
		if sIndex < dIndex && sIndex != -1 && dIndex != -1 {
			if dIndex-sIndex < minDist {
				minDist = dIndex - sIndex
				shortestRoute = route
			}
		}
	}
	c.IndentedJSON(http.StatusOK, shortestRoute)
}

func getClosestArea(c *gin.Context) {
	inpLat, _ := strconv.ParseFloat(c.Query("lat"), 64)
	inpLng, _ := strconv.ParseFloat(c.Query("lng"), 64)
	places := readPlaces()
	minDist := 100.00
	var closestPlace Place
	for _, place := range places.Places {
		dist := EucDist(inpLat, inpLng, place.Lat, place.Lng)
		if dist < float64(minDist) {
			minDist = dist
			closestPlace = place
		}
	}
	c.IndentedJSON(http.StatusOK, closestPlace)
}

func getBusLocation(c *gin.Context) {
	var bus Bus
	bus.Set()
	c.JSON(http.StatusOK, bus)
}

func ReadDistance(c *gin.Context) {
	var distance = GetDistance("Bengaluru", "chennai")
	var dist Distance
	json.Unmarshal(distance, &dist)
	c.IndentedJSON(http.StatusOK, dist.Rows[0].Elements[0].Distance.Text)
}

func main() {
	router := gin.Default()
	router.GET("/places", getPlaces)
	router.GET("/routes", getRoutes)
	router.POST("/shortestroute", getShortestRoute)
	router.POST("/closestarea", getClosestArea)
	router.GET("/getbuslocation", getBusLocation)
	router.GET("/readdistance", ReadDistance)

	router.Run("localhost:8080")
}
