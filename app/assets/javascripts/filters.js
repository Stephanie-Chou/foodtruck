function filters(){
  $("#filters").change(function(e){
    e.preventDefault();
    var inputs = $(this).serializeArray();
    inputs.push({name:"lat", "value": latitude});
    inputs.push({name: "long", "value": longitude});
    var request = $.get('trucks',inputs);
    request.done(function(data){
      console.log(data);
      deleteMarkers();
      makeTruckMarkers(data);
    });
  });
}