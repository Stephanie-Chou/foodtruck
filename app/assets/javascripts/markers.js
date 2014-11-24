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
