describe ("Markers", function(){
  var markers = [];
  var truck = {"id":1, "name":"food truck", "location_id":1, "fooditems":"food", "created_at":"2014-11-20T02:30:00.735Z", "updated_at":"2014-11-20T02:30:00.735Z", "foods":[{"id":1, "name":"food", "created_at":"2014-11-20T02:30:00.782Z", "updated_at":"2014-11-20T02:30:00.782Z"}], "location":{"id":1, "longitude":"-122.398658184604", "latitude":"37.7901490737255", "created_at":"2014-11-20T02:30:00.685Z", "updated_at":"2014-11-20T02:30:00.685Z"}};
  describe ("makeTruckMarkers", function(){
    it ("should return populate an array with markers", function(){
      expect(makeTruckMarkers(trucks).length).toEqual(4);
    });
  });

  describe ("generateContentString", function(){
    it ("should return a content string that includes truck name and menu items", function(){
      expect(generateContentString(truck)).toEqual('<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">'+"food truck"+'</h1>'+
    '<div id="bodyContent">'+
    '<h3>Menu</h3>'+
    '<ul>'+
    '<li class = "menuitem">'+'food'+'</li>'+
    '</ul>'+
    '</div>'+
    '</div>'
        );
    });
  });
}