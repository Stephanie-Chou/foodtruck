class Location < ActiveRecord::Base
  has_many :trucks


  def get_locations_within(distance, curr_location)
    # curr_location = {latitude: 0, longitude: 0}
    Location.where(latitude: (curr_location-distance/2)..(curr_location+distance/2), longitude: (curr_location-distance/2)..(curr_location+distance/2))

  end
end