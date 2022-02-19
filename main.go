package main

import (
	"encoding/json"
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

func getPlaces(c *gin.Context) {
	content, err := ioutil.ReadFile("./places.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}
	var placesJson PlacesList
	err = json.Unmarshal(content, &placesJson)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}
	c.IndentedJSON(http.StatusOK, placesJson.Places)
}

func getRoutes(c *gin.Context) {
	content, err := ioutil.ReadFile("./routes.json")
	if err != nil {
		log.Fatal("Error when opening file: ", err)
	}
	var routesJson RouteList
	err = json.Unmarshal(content, &routesJson)
	if err != nil {
		log.Fatal("Error during Unmarshal(): ", err)
	}
	c.IndentedJSON(http.StatusOK, routesJson.Routes)
}

func main() {
	router := gin.Default()
	router.GET("/places", getPlaces)
	router.GET("/routes", getRoutes)

	router.Run("localhost:8080")
}
