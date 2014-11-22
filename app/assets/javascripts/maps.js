/* my own code here*/

var markers = []; // stores current markers
var map;
var latitude;
var longitude;

var boundsChange = 0;
var boundsSet = false;
var maxBounds = {
  eak: 0,
  eaj: 0,
  vak: 0,
  vaj: 0
};
// keep track of max bounds so far.
// when new max bounds exceeds old max bounds by x degrees, reset old max bounds to current max bounds

function getNearestTrucks(long, lat, options){

  options.push({name:"lat", "value": lat});
  options.push({name: "long", "value": long});
  request = $.get('trucks',options);
  request.done(function(data){
    makeTruckMarkers(data);
  });
}

/* Google Maps API */
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
  clearMarkers();
  markers = [];
}

function calculateBoundsChange(bounds){
    if (boundsSet == false){
      boundsSet = true;

      console.log("first time set");
      maxBounds.eak = bounds.Ea.k;
      maxBounds.eaj = bounds.Ea.j;
      maxBounds.vak = bounds.va.k;
      maxBounds.vaj = bounds.va.j;

    }else{
      boundsChange = Math.max(bounds.Ea.k-maxBounds.eak, bounds.Ea.j-maxBounds.eaj, bounds.va.k-maxBounds.vak, bounds.va.j-maxBounds.vaj)
      console.log(boundsChange);
      if (boundsChange >= 0.0004){
        boundsSet = false;
        boundsChange = 0;
        console.log("more that 6686")
        latitude = bounds.getCenter().k;
        longitude = bounds.getCenter().B;
        var options = $("#filters").serializeArray()
        getNearestTrucks(longitude, latitude, options );
      }
    }

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

    latitude = places[0].geometry.location.k;
    longitude = places[0].geometry.location.B;

    new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map,
      title: "You are Here",
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });

    getNearestTrucks(longitude, latitude, []);

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
    // when bounds have moved more than x amount, ajax for more!
    calculateBoundsChange(bounds);
    searchBox.setBounds(bounds);
  });

  /* My own Code here */

  $("#filters").change(function(e){
    e.preventDefault();
    filters($("#filters"));
  });

  $("#filters").submit(function(e){
    e.preventDefault();
    console.log("submit");
  });
}

google.maps.event.addDomListener(window, 'load', initialize);