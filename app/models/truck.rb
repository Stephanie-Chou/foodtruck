require 'pry'
class Truck < ActiveRecord::Base
  belongs_to :location
  has_many :menu_items
  has_many :foods, through: :menu_items

  def self.get_trucks(locations)
    trucks = []
    locations.each do |location|
      trucks << Truck.where(location_id: location)
    end
    trucks.flatten
  end

  def self.search_by_fooditem(terms, trucks)
    trucks.select{|truck| (!(truck.foods.pluck('name') & terms).empty?)  unless truck.fooditems.nil?}
  end
end