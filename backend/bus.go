package main

import (
	"math/rand"
	"time"
	"strconv"
)

// defines a singular bus that is part of the BMTC
type Bus struct {
	RouteName            string
	BusId                string
	FullCapacity         int32
	CurrentCapacity      int32
	MaintenanceRemaining int32
	StopCrossed          string
	Lat                  float64
	Lng                  float64
	StartTime            time.Time
	ForwardFlag          bool
	Price                float64
	DistanceFromUser     float64
}

// randomized constructor for simulation purposes
func (b *Bus) Set() {
	randRoutes := []string{"201R",  "500KC", "210A", "500 KR"}
	places := readPlaces().Places
	routes := readRoutes().Routes
	b.RouteName = randRoutes[rand.Intn(len(randRoutes))]
	b.FullCapacity = 50
	b.BusId = "KN" + strconv.Itoa(rand.Intn(100))
	b.CurrentCapacity = int32(rand.Intn(int(b.FullCapacity)))
	b.Price = float64(rand.Intn(100))
	for _, route := range routes {
		if b.RouteName == route.RouteName {
			b.StopCrossed = route.Places[rand.Intn(len(route.Places)-1)]
			for _, place := range places {
				if b.StopCrossed == place.Name {
					b.Lat = place.Lat
					b.Lng = place.Lng
					break
				}
			}
			break
		}
	}
	flags := []bool{true, false}
	b.ForwardFlag = flags[rand.Intn(2)]
	b.StartTime = Randate()
}
