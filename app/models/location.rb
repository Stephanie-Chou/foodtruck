require 'pry'
class Location < ActiveRecord::Base
  has_many :trucks


  def self.get_locations_within(distance, curr_location)
    # curr_location = {latitude: 0, longitude: 0}
    p "*"*100
    p curr_location
    Location.where(latitude: (curr_location["lat"].to_f-distance/2)..(curr_location["lat"].to_f+distance/2), longitude: (curr_location["long"].to_f-distance/2)..(curr_location["long"].to_f+distance/2))
  end

  def self.convert_miles_to_degrees(miles)
    miles.to_f*0.014464
  end
end