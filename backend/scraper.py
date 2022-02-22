import random
from bs4 import BeautifulSoup as Soup
import requests
import json

class Route():
    routeName = None
    origin = None
    destination = None 
    places = None
    revPlaces = None

    def __init__(self, routeName, origin, destination, places):
        self.routeName = routeName
        self.origin = origin
        self.destination = destination
        self.places = []
        self.places.append(origin)
        self.places += places.split(', ')
        self.places.append(destination)
        self.revPlaces = list(reversed(self.places))



class Place():
    name = None
    lat = None
    lng = None
    
    def __init__(self, name, lat, lng):
        self.name = name
        self.lat = lat
        self.lng = lng


my_url = 'https://opencity.in/explainer/bmtc-bus-routes'
r = requests.get(my_url)
page_soup = Soup(r.text, "html.parser")
routes = page_soup.findAll("td", {"valign": "middle"})

temp_routes = []
places = set()

for i in range(0, len(routes), 4):
    temp_routes.append(Route(routes[i].text, routes[i+1].text, routes[i+2].text, routes[i+3].text))
    places.add(routes[i+1].text)
    places.add(routes[i+2].text)
    for place in routes[i+3].text.split(', '):
        places.add(place)
    if routes[i+3].text == 'Adugodi, Krupanidhi college, Madiwala, Bommanahalli':
        break

json_string = json.dumps({"routes": [ob.__dict__ for ob in temp_routes]})
f = open("routes.json", "w")
f.write(json_string)
f.close()

placesList = []

for place in places:
    placesList.append(Place(place, random.uniform(12.0, 12.5), random.uniform(77.0, 78.0)))

# json_string = json.dumps({"places": [ob.__dict__ for ob in placesList]})
# f = open("places.json", "w")
# f.write(json_string)
# f.close()
