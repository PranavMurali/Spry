package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// returns places as json (endpoint)
func getPlaces(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, readPlaces().Places)
}

// returns routes as json (endpoint)
func getRoutes(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, readRoutes().Routes)
}

// iterates through all possible routes to find a route where the source is before destination and the distance between
// them is shortest. Also checks the return route and denotes the route direction using a flag (ForwardFlag)
// Returns the route and flag
func getShortestRoute(c *gin.Context) {
	source := c.Query("source")
	dest := c.Query("dest")
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
	c.IndentedJSON(http.StatusOK, shortestRoute)
}

// gets the closest area(place) given coordinates (latitude, longitude)
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

// generates a randomized bus instance for testing/simulation
func getBusLocation(c *gin.Context) {
	var bus Bus
	bus.Set()
	c.JSON(http.StatusOK, bus)
}

// returns distance between source and location using Google Maps API
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
