require 'pry'
class Truck < ActiveRecord::Base
  belongs_to :location

  def self.get_trucks(locations)
    trucks = []
    locations.each do |location|
      trucks << Truck.where(location_id: location)
    end
    trucks.flatten
  end

  def self.search_by_fooditem(term, trucks)
    trucks.select{|truck| (!(truck.fooditems.split(': ') & term.keys).empty?)  unless truck.fooditems.nil?}
  end
end
# hash = {
#   "one" => 1,
#   "two" => 2,
#   "three" => 3
# }

# ["four","three" , "banana one"]