/* my own code here*/

var markers = [];
var map;
var latitude;
var longitude;

function setAllMap(map) {
  console.log(markers);
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function showMarkers() {
  setAllMap(map);
}

function clearMarkers(){
    for (var i = 0, marker; marker = markers[i]; i++) {
    marker.setMap(null);
  }
}

function deleteMarkers(){
  console.log("delete markers");
  clearMarkers();
  markers = [];
}

function makeTruckMarkers(trucks){
  var position;
  var title;
  var marker;
  var infowindow;
  var contentString;
  var color;

  if(trucks !== null){
    trucks.forEach(function(truck, i){
        position = new google.maps.LatLng(truck.location.latitude, truck.location.longitude);
        title = truck.name;

        contentString = generateContentString(truck);

        color = 'green'

        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: "http://maps.google.com/mapfiles/ms/icons/"+color+"-dot.png",
          infowindow: new google.maps.InfoWindow({content: contentString})
        })

        google.maps.event.addListener(marker, 'click', function(frozenMarker) {
          return function(){
            this.infowindow.open(map,frozenMarker);
          }
        }(marker));

        markers.push(marker);
      });
    }

  console.log(markers);
}

function generateContentString(truck){
  var listEl = '';
  truck.foods.forEach(function(food,i){
    listEl+= '<li class = "menuitem">'+food.name+'</li>';
  });

  return '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+truck.name+'</h1>'+
    '<div id="bodyContent">'+
    '<h3>Menu</h3>'+
    '<ul>'+
    listEl+
    '</ul>'+
    '</div>'+
    '</div>'
}

function getNearestTrucks(long, lat){
  request = $.get('trucks',{long: long, lat: lat, range: '.5'});
  request.done(function(data){
    makeTruckMarkers(data);
  });
}

function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
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

    getNearestTrucks(longitude, latitude);

    deleteMarkers();

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
    }
    map.fitBounds(bounds);
  });

  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  $("#filters").change(function(e){
    e.preventDefault();
    console.log("change");
    filters($("#filters"));
  });

  $("#filters").submit(function(e){
    e.preventDefault();
    console.log("submit");
    // filters($("#filters"));
  });


}

google.maps.event.addDomListener(window, 'load', initialize);


