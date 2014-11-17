# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'json'
  file = File.read("db/foodtruck.json")
  data = JSON.parse(file)

  data.each do |truck|
    loc = Location.create(latitude: truck["latitude"].to_f, longitude: truck["longitude"].to_f)
    Truck.create(name: truck["applicant"], fooditems: truck["fooditems"], location: loc)
  end

# query = "select * from users where name like '#{input}%'"
    # User.find_by_sql(query)