package main

import (
	"math/rand"
	"time"
)

type Bus struct {
	RouteName            string
	FullCapacity         int32
	CurrentCapacity      int32
	MaintenanceRemaining int32
	BusStop              string
	Lat                  float64
	Lng                  float64
	StartTime            time.Time
}

func (b *Bus) Set() {
	randRoutes := []string{"195", "276", "365"}
	places := readPlaces().Places
	routes := readRoutes().Routes
	b.RouteName = randRoutes[rand.Intn(len(randRoutes)-1)]
	b.FullCapacity = 50
	b.CurrentCapacity = int32(rand.Intn(int(b.FullCapacity)))
	for _, route := range routes {
		if b.RouteName == route.RouteName {
			b.BusStop = route.Places[rand.Intn(len(route.Places)-1)]
			for _, place := range places {
				if b.BusStop == place.Name {
					b.Lat = place.Lat
					b.Lng = place.Lng
					break
				}
			}
			break
		}
	}
	b.StartTime = Randate()
}
