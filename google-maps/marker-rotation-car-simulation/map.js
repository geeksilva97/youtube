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

  function simulateDriving({ steps, me, speed, map }) {
    const animationSpeed = speed || 1000;
    let currentStepIndex = 0;

    const intervalID = setInterval(() => {
      if (currentStepIndex >= steps.length) {
        clearInterval(intervalID);
        return;
      }

      const nextCoord = steps[currentStepIndex];
      const heading = google.maps
        .geometry
        .spherical
        .computeHeading(me.getPosition(), nextCoord)
        .toFixed(2);

      // Also kept for YouTube video purposes - that's the demo for icon being generated on a backend application
      //
      me.setIcon({
        ...icon,
        url: `http://localhost:3000/car-icon?degree=${heading}`
      });
      // me.setIcon({
      //   ...symbolIcon,
      //   rotation: parseFloat(heading)
      // });

      me.setPosition(nextCoord);
      map.panTo(me.getPosition());

      currentStepIndex++;
    }, animationSpeed);
  }

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.47254534601006, lng: -106.28142209266413 },
    zoom: 7,
  });

  directionsRenderer.setMap(map);

  const santaFe = { lat: 35.68696918574762, lng: -105.93781702652073 };
  const rioRancho ={
    lat:  35.23291199672124,
    lng: -106.66566167299302
  };
  const albuquerque = { lat: 35.08443576955484, lng: -106.65043410215983 };

  const me = new google.maps.Marker({
    position: albuquerque,
    map: map,
    draggable: true,
    icon
  });

  directionsService.route({
    origin: albuquerque,
    destination: rioRancho,
    travelMode: 'DRIVING'
  }, function(result, status) {
    if (status === 'OK') {
      const steps = result.routes[0].legs[0].steps.flatMap(step => step.path);

      directionsRenderer.setDirections(result);

      // A quick refactor is needed here - but I'm too lazy to do it. We can promisify and have a sleep function. We'd have something like:
      //
      // await sleep(100);
      //
      // map.setZoom(17);
      // map.panTo(me.getPosition())
      //
      // await sleep(2000);
      //
      // simulateDriving({ ... })
      setTimeout(() => {
        map.setZoom(17);
        map.panTo(me.getPosition());

        setTimeout(() => {
          simulateDriving({ map, me, steps, speed: 400 });
        }, 1000);
      }, 100);
    }
  });
}
