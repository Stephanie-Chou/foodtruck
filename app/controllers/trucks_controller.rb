require 'pry'
class TrucksController < ApplicationController

  def index
    p "+"*100
    p params

    distance = params["range"] ? Location.convert_miles_to_degrees(params["range"]) : 0.007232
    ranges = Location.get_locations_within(distance, params)
    @trucks = Truck.get_trucks(ranges)
    unless params["truckType"].nil?
     # if the search box is empty, then don't parse any terms. search for everything
      unless params["truckType"]["search"].empty?
        terms = parseTerms(params["truckType"])
        @trucks = Truck.search_by_fooditem(terms, @trucks)
      end
    end

    if request.xhr?
      render :json => @trucks.to_json(:include => [:location, :foods])
    else
      respond_to do |format|
        format.json { render json: @trucks.to_json(:include => [:location, :foods]) }
      end
    end

  end

  private

  def parseTerms(terms)
    keywords = terms["search"].nil? || terms["search"].empty? ? [] : terms["search"].split(",")
  end

end