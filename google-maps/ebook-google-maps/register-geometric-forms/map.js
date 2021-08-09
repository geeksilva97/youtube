
let map;

function showShapes(map) {
  const circleData = localStorage.circleData;
  const rectangleData = localStorage.rectangleData;
  const polygonData = localStorage.polygonData;
  const polylineData = localStorage.polylineData;


  if(circleData) {
    const obj = JSON.parse( circleData );
    new google.maps.Circle({
      map,
      fillColor: '#ffff00',
      fillOpacity: .5,
      strokeWeight: 5,
      radius: obj.radius,
      center: obj.center
    });
  }

  if(rectangleData) {
    const obj = JSON.parse( rectangleData );
    new google.maps.Rectangle({
      map,
      bounds: obj.bounds
    });
  }

  if(polygonData) {
    const obj = JSON.parse( polygonData );
    const path = google.maps.geometry.encoding.decodePath( obj.encodedPath );
    new google.maps.Polygon({
      map,
      path: path
    });
  }

  if(polylineData) {
    const obj = JSON.parse( polylineData );
    const path = google.maps.geometry.encoding.decodePath( obj.encodedPath );
    new google.maps.Polyline({
      map,
      path: path
    });
  }
}


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.551653, lng: -46.672384 },
    zoom: 15,
  });

  initDrawing(map);
  showShapes(map);

}


