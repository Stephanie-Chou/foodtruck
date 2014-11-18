class WelcomeController < ApplicationController
  def nearestTrucks
    distance = 0.007232
    ranges = Location.get_locations_within(distance, params)
    # get all the trucks in range
    trucks = Truck.get_trucks(ranges)
    if request.xhr?
      render :json => trucks.to_json(:include => :location)
    end
  end
end
