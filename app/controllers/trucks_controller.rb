require 'pry'
class TrucksController < ApplicationController

  def index
    # get all trucks
    # params: {range: , truckType:}
    p "+"*100
    p params
    # filter by distance and range
    # this is distance in degrees lat/long
    distance = 0.007232
    ranges = Location.get_locations_within(distance, params)
    trucks = Truck.get_trucks(ranges)

    # TODO get all the trucks in range with a particular filter
    trucks = Truck.search_by_fooditem(params["truckType"].keys+params["search"].split(' '), trucks) unless params["truckType"].nil?

    if request.xhr?
      render :json => trucks.to_json(:include => [:location, :foods])
    end

  end

end
