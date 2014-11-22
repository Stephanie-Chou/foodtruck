foodtruck
=========

uber coding challenge

# Overview
## Problem
  Users need to find foodtrucks in the city of San Francisco by type near a certain location. This information also needs to be visualized on a map.
## Solution
  Users can search by location and food type. The locations of foodtrucks matching the search criteria will appear as a marker on a map. Each marker can be clicked on and will show information about the food truck including the name of the foodtruck and the menu. The full solution is hosted on http://foodtrucktrek.herokuapp.com/

# Technical

## Backend
### Ruby on Rails

/truck

Types of parameters accepted:
{
  lat: string or integer,
  long: string or integer,
  range: string or integer,
  truckType: string delimited by spaces
}

1. search by location (lat and long)
2. search by truck
3. search by range (default )

## Frontend

### Google Maps API

 The Google Maps API is well maintained and well documented. This makes it the simplest way to integrate basic map functions into a web app. Google Maps provides the following functionality:
  1. Map View
  2. Search by Location
  3. Markers of current location

### jQuery

No frameworkds were used.


## About Me

Learn more about me at www.stephaniechou.com

