package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/bradfitz/slice"
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
func getBusDetails(c *gin.Context) {
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

func GetBuses(c *gin.Context) {

	source := c.Query("source")
	dest := c.Query("dest")
	sort := c.Query("sort")
	shortestRoute := getShortestRoute(source, dest)
	filteredBusses := getBuses(shortestRoute.RawRoute.RouteName, shortestRoute.ForwardFlag)

	if sort == "capacity" {
		slice.Sort(filteredBusses[:], func(i, j int) bool {
			return filteredBusses[i].CurrentCapacity < filteredBusses[j].CurrentCapacity
		})
	}

	if sort == "price" {
		slice.Sort(filteredBusses[:], func(i, j int) bool {
			return filteredBusses[i].Price < filteredBusses[j].Price
		})
	}

	c.IndentedJSON(http.StatusOK, filteredBusses)
}

func main() {
	router := gin.Default()
	router.GET("/places", getPlaces)
	router.GET("/routes", getRoutes)
	router.POST("/closestarea", getClosestArea)
	router.GET("/getbusDetails", getBusDetails)
	router.GET("/readdistance", ReadDistance)
	router.GET("/getbuses", GetBuses)

	router.Run("localhost:8080")
}
