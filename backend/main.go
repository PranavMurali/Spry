package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
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
	var shortestRoute ShortestRoute
	for _, route := range routes.Routes {
		sIndexlr := -1
		dIndexlr := -1
		sIndexrl := -1
		dIndexrl := -1
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
	var distance = GetDistance(c.Query("src"), c.Query("dest"))
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
