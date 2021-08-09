function showForms(map) {
  let circleData = JSON.parse(localStorage.circle); // { radius, center }
  let rectangleData = JSON.parse(localStorage.rectangle); // { bounds }
  let polygonData = JSON.parse(localStorage.polygon); // { path }
  let polylineData = JSON.parse(localStorage.polyline); // { path }


  const circle = new google.maps.Circle({
    map,
    center: circleData.center,
    radius: circleData.radius
  });


  const rectangle = new google.maps.Rectangle({
    map,
    bounds: rectangleData.bounds
  });

  const polyline = new google.maps.Polyline({
    map,
    strokeWeight: 6,
    path: google.maps.geometry.encoding.decodePath(polylineData.path)
  });

  const polygon = new google.maps.Polygon({
    map,
    path: google.maps.geometry.encoding.decodePath(polygonData.path)
  });

  return {
    circle,
    rectangle,
    polyline,
    polygon
  };
}

function addContent(contentResult, content) {
  contentResult.innerHTML = `<p>${content}</p>` + contentResult.innerHTML;
}

function attachEvents(map) {
  const geometryForms = showForms(map);
  const contentResult = document.querySelector('#content-result');
  const marker = new google.maps.Marker({
    position: {
      lat: -3.7319420595209425,
      lng: -38.50258403291114
    },
    draggable: true,
    map
  });



  document.querySelector('#interpolate').addEventListener('click', function() {
    // faz a interpolaçã da distancia
    // se a distancia entre dois poontos é 2m e a fração é 1 - vai retornar a coordenada da mesma distância após
    const interpolatePosition = google.maps.geometry.spherical.interpolate(
      marker.getPosition(), // from
      geometryForms.circle.getCenter(), // to
      .5 // fraction
    );
    new google.maps.Marker({
      position: interpolatePosition,
      title: 'interpolate',
      map
    });

    map.setCenter(interpolatePosition);
  });


  document.querySelector('#area').addEventListener('click', function() {
    addContent(
      contentResult,
      `Polygon area: ${google.maps.geometry.spherical.computeArea(geometryForms.polygon.getPath())}`
    );
  });

  document.querySelector('#distance').addEventListener('click', function() {
    addContent(
      contentResult,
      `Distance between marker and circle center: ${google.maps.geometry.spherical.computeDistanceBetween( marker.getPosition(), geometryForms.circle.getCenter() )}`
    );
  });

  document.querySelector('#heading').addEventListener('click', function() {
    addContent(
      contentResult,
      `Heading marker and circle center: ${google.maps.geometry.spherical.computeHeading( marker.getPosition(), geometryForms.circle.getCenter() )}`
    );
  });

  document.querySelector('#length').addEventListener('click', function() {
    addContent(
      contentResult,
      `Polyline Length: ${google.maps.geometry.spherical.computeLength( geometryForms.polyline.getPath() )}`
    );
  });

  document.querySelector('#offset').addEventListener('click', function() {
    const heading = google.maps.geometry.spherical.computeHeading( marker.getPosition(), geometryForms.circle.getCenter() );
    const distance = parseFloat(prompt('Distance:'));
    const final = google.maps.geometry.spherical.computeOffset( marker.getPosition(), distance, heading );
    new google.maps.Marker({
      map,
      position: final
    });
  });

  document.querySelector('#offset-origin').addEventListener('click', function() {
    const heading = google.maps.geometry.spherical.computeHeading( marker.getPosition(), geometryForms.circle.getCenter() );
    const distance = parseFloat(prompt('Distance:'));
    const final = google.maps.geometry.spherical.computeOffsetOrigin( marker.getPosition(), distance, heading );
    new google.maps.Marker({
      map,
      position: final
    });
  });

  document.querySelector('#signed-area').addEventListener('click', function() {
    addContent(
      contentResult,
      `Polygon signed area: ${google.maps.geometry.spherical.computeSignedArea(geometryForms.polygon.getPath())}`
    );
  });


  document.querySelector('#contains-location').addEventListener('click', function() {
    addContent(
      contentResult,
      `is marker inside polygon: ${google.maps.geometry.poly.containsLocation( marker.getPosition(), geometryForms.polygon )}`
    );
  });

  document.querySelector('#on-edge').addEventListener('click', function() {
    addContent(
      contentResult,
      `is marker on polygon edge: ${google.maps.geometry.poly.isLocationOnEdge( marker.getPosition(), geometryForms.polygon, 1e-5 )}`
    );
    addContent(
      contentResult,
      `is marker on polyline edge: ${google.maps.geometry.poly.isLocationOnEdge( marker.getPosition(), geometryForms.polyline, 0.00001  )}`
    );
  });

  document.querySelector('#encode').addEventListener('click', function() {
    const path = geometryForms.polyline.getPath();
    console.log('Normal path', path);
    addContent(
      contentResult,
      `Normal Path: <b>${path}</b>`
    );
    addContent(
      contentResult,
      `encoded path of polyline: ${google.maps.geometry.encoding.encodePath( path )}`
    );
  });

  document.querySelector('#decode').addEventListener('click', function() {
    const path = geometryForms.polyline.getPath();
    const encoded = google.maps.geometry.encoding.encodePath( path );
    console.log('Encoded path', encoded);
    console.log(`Decoded path of polyline: ${google.maps.geometry.encoding.decodePath( encoded )}`);
    addContent(
      contentResult,
      `Encoded path: ${encoded}`
    );
    addContent(
      contentResult,
      `Decoded path of polyline: ${google.maps.geometry.encoding.decodePath( encoded )}`
    );
  });
}


async function initMap() {
  let map = new google.maps.Map(document.querySelector('#map'), {
    center: {lat: -3.7530542057788963, lng: -38.53236728181251},
    zoom: 13
  });

  attachEvents(map);
}


