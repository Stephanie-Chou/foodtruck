
/* my own code here*/
function setFoodTruckMarkers(trucks, map){
  var position;
  var title;
  trucks.forEach(function(truck, i){
    position = new google.maps.LatLng(truck.location.latitude, truck.location.longitude);
    title = truck.name;

    console.log(truck);

    new google.maps.Marker({
      position: position,
      map: map,
      title: title,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    })
  });
}


function getNearestTrucks(long, lat, map){
  request = $.get('nearestTrucks',{long: long, lat: lat});
  request.done(function(data){
    setFoodTruckMarkers(data, map)
  });
}


function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.8, 237.0259),
      new google.maps.LatLng(37.7, 238.1131));
  map.fitBounds(defaultBounds);


  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  google.maps.event.addListener(searchBox, 'places_changed', function() {

    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    /* my own code here*/
    latitude = places[0].geometry.location.k;
    longitude = places[0].geometry.location.B;
    new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      title: "You are Here",
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });

    var trucks = getNearestTrucks(longitude, latitude, map);


    // setFoodTruckMarkers(trucks,map);

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(latitude+.003516, longitude-.003516),
      new google.maps.LatLng(latitude-.003516, longitude+.003516)
      );
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(15, 15)
      };

      // Create a marker for each place.
      // var marker = new google.maps.Marker({
      //   map: map,
      //   icon: image,
      //   title: place.name,
      //   position: place.geometry.location
      // });

      // markers.push(marker);

      // bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


