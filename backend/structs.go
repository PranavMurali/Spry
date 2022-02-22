package main

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
	RevPlaces   []string
}

// defines the return for getShortestRoute() i.e. a route and a forward flag to denote direction
type ShortestRoute struct {
	RawRoute    Route
	ForwardFlag bool
}

// defines the routes.json input format (for reading only)
type RouteList struct {
	Routes []Route
}

// structs to handle google maps api response
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
