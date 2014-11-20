require 'rails_helper'

RSpec.describe Truck, :type => :model do
  it "finds trucks with certain locations" do
    Location.create!(latitude: 0, longitude: 0)
    truck1 = Truck.create!(location_id: 1)
    truck2 = Truck.create!(location_id: 2)

    expect(Truck.get_trucks([1,2])).to eq([truck1,truck2])
  end

  it "does not find trucks not in certain locations" do
    Location.create!(latitude: 0, longitude: 0)
    truck1 = Truck.create!(location_id: 1)
    truck2 = Truck.create!(location_id: 2)

    expect(Truck.get_trucks([1])).to eq([truck1])
  end

  it "searches by fooditem" do
    truck1 = Truck.create!(fooditems: "meat: potatoes")
    truck2 = Truck.create!(fooditems:"cookies")
    trucks = Truck.all

    expect(Truck.search_by_fooditem("cookies", trucks)).to eq([truck2])
  end
end