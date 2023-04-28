function initMap() {
  const symbolIcon = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    offset: '100%',
    strokeColor: '#F00',
    scale: 5,
  };

  function simulateDriving({ microStepCoords, me }) {
    let currentStepIndex = 0;

    const intervalID = setInterval(() => {
      if (currentStepIndex >= microStepCoords.length) {
        clearInterval(intervalID);
        return;
      }

      // old implementation kept for youtube video purposes
      // when I started I was using the Directions steps as the reference but they aren't that granular and didn't fit
      // the simulation purposes
      //
      // const currentStep = steps[currentStepIndex];
      // const stepStartLocation = currentStep.start_location;

      const nextCoord = microStepCoords[currentStepIndex];
      const heading = google.maps
        .geometry
        .spherical
        .computeHeading(me.getPosition(), nextCoord)
        .toFixed(2);

      // Also kept for YouTube video purposes - that's the demo for icon being generated on a backend application
      //
      // me.setIcon({
      //   ...icon,
      //   url: `http://localhost:3000/car-icon?degree=${heading}`
      // });
      me.setIcon({
        ...symbolIcon,
        rotation: parseFloat(heading)
      });
      me.setPosition(nextCoord);

      currentStepIndex++;
    }, 500);
  }

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true })
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.47254534601006, lng: -106.28142209266413 },
    zoom: 7,
  });

  directionsRenderer.setMap(map);

  const santaFe = { lat: 35.68696918574762, lng: -105.93781702652073 };
  const albuquerque = { lat: 35.08443576955484, lng: -106.65043410215983 };

  const icon = {
    url: 'http://localhost:3000/car-icon?degree=0',
    anchor: new google.maps.Point(16, 16), // center of the icon
    size: new google.maps.Size(32, 32), // size of the icon
  }

  const me = new google.maps.Marker({
    position: albuquerque,
    map: map,
    draggable: true,
    icon: symbolIcon
  });

  directionsService.route({
    origin: albuquerque,
    destination: santaFe,
    travelMode: 'DRIVING'
  }, function(result, status) {
    if (status === 'OK') {
      const steps = result.routes[0].legs[0].steps;
      const microStepCoords = steps.flatMap(step => step.path);

      directionsRenderer.setDirections(result);

      setTimeout(() => {
        map.setZoom(17);
        map.panTo(me.getPosition());

        setTimeout(() => {
          simulateDriving({ me, microStepCoords });
        }, 2000);
      }, 100);
    }
  });
}
