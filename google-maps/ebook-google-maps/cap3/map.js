
const initDrawing = (map) => {
  let drawingManager = new google.maps.drawing.DrawingManager({
      map: map,
      drawingMode: google.maps.drawing.OverlayType.CIRCLE,
      drawingControl: true,
      drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
      },

      circleOptions: {
          fillColor: '#f00',
          editable: true,
          dragabble: true
      },

      polygonOptions: {
          fillColor: '#f00'
      },

      rectangleOptions: {
          fillColor: '#f00'
      },

      polylineOptions: {
          strokeColor: '#f00'
      }
  });

  google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      console.log(JSON.stringify(polygon.getPath().getArray().map(i => i.toJSON())));
  });

  google.maps.event.addListener(drawingManager, 'polylinecomplete', (polyline) => {
      console.log(JSON.stringify(polyline.getPath().getArray().map(i => i.toJSON())));
  });

  google.maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
      console.log(JSON.stringify(rectangle.getBounds().toJSON()));
  });

  google.maps.event.addListener(drawingManager, 'circlecomplete', (circle) => {
      console.log({
          center: JSON.stringify(circle.getCenter().toJSON()),
          radius: circle.getRadius()
      });
  });
};

let map;

function initMap() {

  const washington = {lat: 38.91740169738149,lng: -77.03371846889557};
  map = new google.maps.Map(document.getElementById("map"), {
    center: washington,
    zoom: 15,
  });

  initDrawing(map);

  const polygon1 = new google.maps.Polygon({
    path: [{"lat":38.92090760131717,"lng":-77.03384721492827},{"lat":38.913494914669386,"lng":-77.04032743190825},{"lat":38.91416275601359,"lng":-77.02466333126128}],
    map: map
  });

  const polygon2 = new google.maps.Polygon({
    path: [{"lat":38.925715416464755,"lng":-77.03811729167998},{"lat":38.92601589409378,"lng":-77.02644431804717},{"lat":38.921074544802956,"lng":-77.03391158794463}],
    map: map,
    fillColor: '#f00'
  });

  const marker = new google.maps.Marker({
    map,
    position: washington
  });

  console.log('polygon 1 contains marker: ' + google.maps.geometry.poly.containsLocation(marker.getPosition(), polygon1))
  console.log('polygon 1 contains marker: ' + google.maps.geometry.poly.containsLocation(marker.getPosition(), polygon2))
  
}


