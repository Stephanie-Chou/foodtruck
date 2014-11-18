require 'pry'
class Truck < ActiveRecord::Base
  belongs_to :location

  def self.get_trucks(locations)
    trucks = []
    locations.each do |location|
      trucks<<Truck.where(location_id: location)
    end
    trucks.flatten
  end
end
