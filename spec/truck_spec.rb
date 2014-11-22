require 'rails_helper'
require 'pry'
RSpec.describe Truck, :type => :model do
  let!(:location) {Location.create!(latitude: 0, longitude: 0)}
  let!(:truck1) {Truck.create!(fooditems: "meat: potatoes", location_id: 1)}
  let!(:truck2) {Truck.create!(fooditems:"cookies: iced coffee", location_id: 2)}
  let!(:food1) {Food.create!(name: 'meat')}
  let!(:food2) {Food.create!(name: 'potatoes')}
  let!(:food3) {Food.create!(name: 'cookies')}
  let!(:food4) {Food.create!(name: 'iced coffee')}


  it "finds trucks with certain locations" do
    expect(Truck.get_trucks([1,2])).to eq([truck1,truck2])
  end

  it "does not find trucks not in certain locations" do
    expect(Truck.get_trucks([1])).to eq([truck1])
  end

  it "searches by fooditem" do
      MenuItem.create!(truck: truck1, food: food1)
      MenuItem.create!(truck: truck1, food: food2)
      MenuItem.create!(truck: truck2, food: food3)
      MenuItem.create!(truck: truck2, food_id: food4)
    trucks = Truck.all

    expect(Truck.search_by_fooditem(["cookies"], trucks)).to eq([truck2])
  end

  it "searches by fooditem and finds partial matches" do
    MenuItem.create!(truck: truck1, food: food1)
    MenuItem.create!(truck: truck2, food: food4)

    expect(Truck.search_by_fooditem(["coffees"], [truck2])).to eq([truck2])
  end
end