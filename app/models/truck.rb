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

    trucks.select{|truck| included?(terms, truck.foods.pluck('name'))  unless truck.fooditems.nil?}
  end

  private

  def self.included?(terms, foods)
    terms.each do |term|
      foods.each do |food|
        return true if (food.include?(term) || food.include?(term[0...-1]))
      end
    end
    return false
  end

end