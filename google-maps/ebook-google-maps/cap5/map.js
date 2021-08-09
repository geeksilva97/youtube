function drawStepPolyline(path, map) {
  new google.maps.Polyline({
    path: path,
    strokeColor: '#f00',
    strokeWeight: 5,
    zIndex: 99,
    map: map
  });
}

function initMap() {

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.47254534601006, lng: -106.28142209266413 },
    zoom: 7,
  });
  directionsRenderer.setMap(map);
  const santaFe = { lat: 35.68696918574762, lng: -105.93781702652073 };
  const albuquerque = { lat: 35.08443576955484, lng: -106.65043410215983 };

  // marcador do motorista
  const me = new google.maps.Marker({
    label: 'ME',
    position: albuquerque,
    map: map,
    draggable: true
  });

  // círculo que acompanha o marcador
  const circle = new google.maps.Circle({
    radius: 100,
    map: map,
    fillOpacity: 0,
    strokeWeight: 0,
    center: me.getPosition()
  });

  let steps = [], nextStep = 1;

  directionsService.route({
    origin: albuquerque,
    destination: santaFe,
    travelMode: 'DRIVING'
  }, function (result, status) {
    if (status === 'OK') {
      steps = result.routes[0].legs[0].steps;
      directionsRenderer.setDirections(result);


      // para simulação da movimentação do marcador
      // em um exemplo real seria um watchPosition (seção 2-1)
      me.addListener('dragend', function (e) {
        // o círculo acompanha o marcador alterando o centro
        circle.setCenter(this.getPosition());
        console.log('Next Step Index: ' + nextStep);

        // verifica se o próximo passo está dentro do círculo
        // se sim deve informar as instruções assim o motorista saberá com antecedência
        if (circle.getBounds().contains(steps[nextStep].start_point.toJSON())) {
          // desenha a polyline do próximo passo
          drawStepPolyline(
            steps[nextStep].path,
            map
          );
          // mostra as intruções
          console.log(steps[nextStep++].instructions);
        }
      });
    }
  });
}
