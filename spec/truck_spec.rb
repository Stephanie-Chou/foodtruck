require 'rails_helper'

RSpec.describe Truck, :type => :model do
  it "orders by last name" do
    Location.create!(latitude: 0, longitude: 0)
    truck1 = Truck.create!(location_id: 1)
    truck2 = Truck.create!(location_id: 2)

    expect(Truck.get_trucks([1,2])).to eq([truck1,truck2])
  end
end