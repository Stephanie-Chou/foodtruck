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

Ruby on Rails was chosen for its use of Active Record. A relational database was needed to store the information about Trucks, Food and Location. These three components are split into different models with the consideration that if this application were to grow and have other uses, Trucks, Food and Location should be different entities. Food and Location could be applied to many different types of venues such as restaurants or farmer's markets.

Rails is also useful for RESTful application design. Had this application had more routes, it would have been easy to extend the truck controller to include ways to retrieve information about individual trucks or make changes to trucks.

Rails also lends itself to testing. Rspec is easily included, implemented and run.

/truck

1. search by location (lat and long)
2. search by truck
3. search by range (default )

Types of parameters accepted:
{
  lat: string or integer,
  long: string or integer,
  range: string or integer,
  truckType: string delimited by spaces
}



## Frontend

### UI
The majority of the app page is taken up by a map. A full screen map immediately suggests that the point of the app is to locate something.

### Search UI
Users can search by location and type. Originally, users could search for type with either a searchbox or checking filters in a Yelp-style. However, this seemed redundant. The one tradeoff of not having suggested filters to checkoff is that there are no longer suggestions for the user.

Users are able to search in 3 ranges: walking distance, biking distance, driving distance. These are set distances and users cannot adjust them at this time. Given more time, I would have allowed users to input any distance.

### Google Maps API

 The Google Maps API is well maintained and well documented. This makes it the simplest way to integrate basic map functions into a web app. Google Maps provides the following functionality:
  1. Map View
  2. Search by Location
  3. Markers of current location

### jQuery
  No frameworkds were used. Because the map is the main focus of the app, there was no need for any frameworks. Jquery was sufficient to make AJAX calls and event handlers for the filtering.

## About Me

  Learn more about me and my other projects at www.stephaniechou.com

