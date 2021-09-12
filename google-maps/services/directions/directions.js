function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true
    });
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 },
    });

    directionsRenderer.setMap(map);

    directionsService.route({
        origin: 'Toronto, Canadá',
        destination: 'Montreal, Canadá',
        waypoints: [
            // {location: 'Ottawa, Canadá', stopover: false} // one leg
            {location: 'Ottawa, Canadá', stopover: true} // two legs
        ],
        travelMode: google.maps.TravelMode.DRIVING
    }).then(response => {
        console.log({response});
        directionsRenderer.setDirections(response);

        // map.fitBounds( response.routes[0].bounds );
        // renderPolyline(response.routes[0].overview_path, map);

    }).catch(err => {
        console.log({err});
    });





    // directionsService.route({
    //     origin: 'Terminal Siqueira, Fortaleza - CE',
    //     destination: 'UFC Benfica, Fortaleza - CE',
    //     language: 'pt_BR',
    //     // origin: 'Terminal do Siqueira',
    //     // destination: 'UFC Benfica',
    //     travelMode: google.maps.TravelMode.TRANSIT
    //     // travelMode: google.maps.TravelMode.DRIVING
    // }).then(response => {
    //     console.log({response});
    //     directionsRenderer.setDirections(response);
    // }).catch(err => {
    //     console.log({err});
    // });


    
    // directionsRenderer.addListener('directions_changed', () => {
    //     console.log(directionsRenderer);
    // });

}

function renderPolyline(path, map) {
    new google.maps.Polyline({
        path: path,
        map: map
    });
}