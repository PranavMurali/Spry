package main

import (
	"os"

	"github.com/joho/godotenv"
)

type Url struct {
	Prefix       string
	Transit_mode string
	Origin       string
	Destination  string
	URL          string
}

func (u *Url) Set(transit_mode string, origin string, destination string) {
	godotenv.Load("local.env")
	u.Prefix = "https://maps.googleapis.com/maps/api/distancematrix/json?"
	u.Transit_mode = "&transit_mode=" + transit_mode
	u.Origin = "origins=" + origin
	u.Destination = "&destinations=" + destination
	u.URL = u.Prefix + u.Origin + u.Destination + u.Transit_mode + "&key=" + os.Getenv("API_KEY")
}
