require 'rails_helper'

RSpec.describe Location, :type => :model do
  it "gets locations within certain distance of current location" do
    current_location = {"lat"=> 0, "long"=>0}
    distance = 5
    loc1 = Location.create!(latitude: 0, longitude: 0)
    loc2 = Location.create!(latitude: 10, longitude: 10)
    loc3 = Location.create!(latitude: 2, longitude: 2)


    expect(Location.get_locations_within(distance, current_location).sort).to eq([loc1, loc3].sort)
  end
end