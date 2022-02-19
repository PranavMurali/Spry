package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PlacesList struct {
	Places []string
}

type Route struct {
	RouteName   string
	Origin      string
	Destination string
	Places      []string
}

type RouteList struct {
	Routes []Route
}

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
	fmt.Println(source)
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

func main() {
	router := gin.Default()
	router.GET("/places", getPlaces)
	router.GET("/routes", getRoutes)
	router.POST("/shortestroute", getShortestRoute)

	router.Run("localhost:8080")
}
