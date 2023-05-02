const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};

function initMap() {
  const symbolIcon = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    offset: '100%',
    strokeColor: '#F00',
    scale: 5,
  };

  const icon = {
    url: 'http://localhost:3000/car-icon?degree=0',
    anchor: new google.maps.Point(16, 16), // center of the icon
    size: new google.maps.Size(41, 41), // size of the icon
  };

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.47254534601006, lng: -106.28142209266413 },
    zoom: 7,
  });

  directionsRenderer.setMap(map);

  const rioRancho ={
    lat:  35.23291199672124,
    lng: -106.66566167299302
  };
  const albuquerque = { lat: 35.08443576955484, lng: -106.65043410215983 };

  const me = new google.maps.Marker({
    position: albuquerque,
    map: map,
    icon
  });

  directionsService.route({
    origin: albuquerque,
    destination: rioRancho,
    travelMode: 'DRIVING'
  }, async function(result, status) {
    if (status === 'OK') {
      const steps = result.routes[0].legs[0].steps.flatMap(step => step.path);
      console.log(steps);

      directionsRenderer.setDirections(result);

      await sleep(100);

      map.setZoom(17);
      map.panTo(me.getPosition());

      await sleep(1000);

      simulateWatchPosition({ steps, speed: 300 }, (coord) => {
        const heading = google.maps
          .geometry
          .spherical
          .computeHeading(me.getPosition(), coord)
          .toFixed(2);

        // me.setIcon({
        //   ...symbolIcon,
        //   rotation: parseFloat(heading)
        // });

        me.setIcon({
          ...icon,
          url: `http://localhost:3000/car-icon?degree=${heading}`,
        });

        me.setPosition(coord);
        map.panTo(me.getPosition());
      });
    }
  });
}
