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

  def self.search_by_fooditem(term)
    trucks = Truck.all
    trucks.select{|truck| truck.fooditems.include?(term) unless truck.fooditems.nil?}
   end
end
