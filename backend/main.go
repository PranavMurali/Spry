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
	sourceLat, _ := strconv.ParseFloat(c.Query("sourcelat"), 64)
	sourceLng, _ := strconv.ParseFloat(c.Query("sourcelng"), 64)
	dest := c.Query("dest")
	sort := c.Query("sort")
	var dist Distance
	shortestRoute := getShortestRoute(getClosestArea(sourceLat, sourceLng), dest)
	filteredBusses := getBuses(shortestRoute.RawRoute, shortestRoute.ForwardFlag, getClosestArea(sourceLat, sourceLng))

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

	if sort == "distance" {
		for i, _ := range filteredBusses {
			distance := GetDistanceLatLong(sourceLat, sourceLng, filteredBusses[i].Lat, filteredBusses[i].Lng)
			json.Unmarshal(distance, &dist)
			filteredBusses[i].DistanceFromUser = MakeProperApi(dist.Rows[0].Elements[0].Distance.Text)
		}
		slice.Sort(filteredBusses[:], func(i, j int) bool {
			return filteredBusses[i].DistanceFromUser < filteredBusses[j].DistanceFromUser
		})
	}

	c.IndentedJSON(http.StatusOK, filteredBusses)
}

func main() {
	router := gin.Default()
	router.GET("/places", getPlaces)
	router.GET("/routes", getRoutes)
	router.GET("/getbusDetails", getBusDetails)
	router.GET("/readdistance", ReadDistance)
	router.GET("/getbuses", GetBuses)

	router.Run()
}
