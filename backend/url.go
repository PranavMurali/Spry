package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// defines a url to interact with the google maps api
type Url struct {
	Prefix       string
	Transit_mode string
	Origin       string
	Destination  string
	URL          string
	DestLat      string
	DestLng      string
}

// url constructor to use the API
func (u *Url) Set(transit_mode string, origin string, destination string) {
	godotenv.Load("local.env")
	u.Prefix = "https://maps.googleapis.com/maps/api/distancematrix/json?"
	u.Transit_mode = "&transit_mode=" + transit_mode
	u.Origin = "origins=" + origin
	u.Destination = "&destinations=" + destination
	u.URL = u.Prefix + u.Origin + u.Destination + u.Transit_mode + "&key=" + os.Getenv("API_KEY")
}
func (u *Url) SetLatLng(origin string, destLat float64, destLng float64) {

	godotenv.Load("local.env")

	u.Origin = "origins=" + origin
	u.DestLat = fmt.Sprintf("%f", destLat)
	u.DestLng = fmt.Sprintf("%f", destLng)
	u.Prefix = "https://maps.googleapis.com/maps/api/distancematrix/json?"
	u.Transit_mode = "&transit_mode=bus"

	u.URL = u.Prefix + u.Origin + "&destinations=" + u.DestLat + "," + u.DestLng + "&key=" + os.Getenv("API_KEY")
	fmt.Println(u.URL)
}
