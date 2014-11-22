require 'rails_helper'

RSpec.describe TrucksController, :type => :controller do
  describe "GET 'index'" do
    it 'assigns trucks' do
      location = Location.create(longitude: 0, latitude:0)
      truck = Truck.create(location: location)
      get :index, :format => :json
      expect(assigns(:trucks)).to eq([truck])
    end

    it 'should be a success' do
      get :index, :format => :json
      expect(response).to have_http_status(200)
    end
  end
end