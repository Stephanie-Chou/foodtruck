function filters(form){
  var inputs = form.serializeArray();
  deleteMarkers();
  getNearestTrucks(longitude, latitude, inputs);
}