require 'json'
file = File.read("foodtruck.json")
data = JSON.parse(file)

data.each do |truck|
  p truck["fooditems"].split(":").map(&:lstrip) if truck["fooditems"]
end


