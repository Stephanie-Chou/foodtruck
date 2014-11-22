require 'pry'
class TrucksController < ApplicationController

  def index
    # get all trucks
    # params: {range: , truckType:}
    p "+"*100
    p params
    # filter by distance and range
    # this is distance in degrees lat/long
    distance = Location.convert_miles_to_degrees(params["range"])
    ranges = Location.get_locations_within(distance, params)
    trucks = Truck.get_trucks(ranges)

    # TODO get all the trucks in range with a particular filter

    unless params["truckType"].nil?
     # if the search box is empty and there are no terms, then don't parse any terms. search for everything
      unless params["truckType"]["search"].empty? && params["truckType"].keys.length == 1
        terms = parseTerms(params["truckType"])
        trucks = Truck.search_by_fooditem(terms, trucks)
      end
    end

    if request.xhr?
      render :json => trucks.to_json(:include => [:location, :foods])
    end

  end


  def parseTerms(terms)
    # if the search box is empty, then just grab the checked stuff...

    keywords = terms["search"].nil? || terms["search"].empty? ? [] : terms["search"].split(" ")
    terms.keys + keywords
  end

end
