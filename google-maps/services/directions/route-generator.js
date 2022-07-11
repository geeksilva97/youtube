/*
    * Dynamic zoom on marker
    * https://stackoverflow.com/questions/3897744/automatically-adjust-zoom-to-accommodate-all-marker-in-a-google-map
    * */
function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        // draggable: true
    });
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: { lat: 41.85, lng: -87.65 },
    });
    const me = new google.maps.Marker({
        map,
        position: { lat: 41.85, lng: -87.65 },
    });

    
    directionsRenderer.setMap(map);

    // directionsRenderer.addListener('directions_changed', () => {
    //     console.log(directionsRenderer);
    // });

    // directionsService.route({
    //     origin: 'Toronto, Canadá',
    //     destination: 'Montreal, Canadá',
    //     waypoints: [
    //         {location: 'Ottawa, Canadá', stopover: false} // one leg
    //         // {location: 'Ottawa, Canadá', stopover: true} // two legs
    //     ],
    //     travelMode: google.maps.TravelMode.DRIVING
    // }).then(response => {
    //     console.log({response});
    //     directionsRenderer.setDirections(response);

    //     // map.fitBounds( response.routes[0].bounds );
    //     // renderPolyline(response.routes[0].overview_path, map);

    // }).catch(err => {
    //     console.log({err});
    // });





    directionsService.route({
        origin: 'Terminal Siqueira, Fortaleza - CE',
        destination: 'Hospital Gastroclinica, Fortaleza - CE',
        // destination: 'UFC Benfica, Fortaleza - CE',
        language: 'pt_BR',
        // origin: 'Terminal do Siqueira',
        // destination: 'UFC Benfica',
        // travelMode: google.maps.TravelMode.TRANSIT
        travelMode: google.maps.TravelMode.DRIVING
    }).then(response => {
        const { routes: [route] } = response;
        const { legs: [routeLeg] } = route;
        const { steps } = routeLeg;
        console.log({steps});

        const routePoints = steps.reduce((accumulator, step, index) => {
            const startLocation = step.start_location.toJSON();
            const endLocation = step.end_location.toJSON();
            const isOnLastItem = index === steps.length - 1;
            const location = isOnLastItem ? endLocation : startLocation;

            return [...accumulator, location];
        }, []);

        async function sleep(timeout) {
            return new Promise((resolve) => {
                setTimeout(() => resolve(), timeout);
            });
        }

        async function simulate() {
            for(const point of routePoints) {
                await sleep(1300);
                map.panTo(point);
                map.setZoom(25);
                me.setPosition(point);
                // new google.maps.Marker({map, position: point});
            }
        }

        simulate();

        map.fitBounds( response.routes[0].bounds );
        renderPolyline(response.routes[0].overview_path, map);
        // directionsRenderer.setDirections(response);
    }).catch(err => {
        console.log({err});
    });



}

function renderPolyline(path, map) {
    new google.maps.Polyline({
        path: path,
        map: map
    });
}
