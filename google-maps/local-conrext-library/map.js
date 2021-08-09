async function initMap() {


    const localContextMapView = new google.maps.localContext.LocalContextMapView({
        element: document.getElementById('map'),
        placeTypePreferences: ['restaurant', 'tourist_attraction'],
        maxPlaceCount: 12,
    });

    map = localContextMapView.map;

    map.setOptions({
        center: { lat: -3.726674649708012, lng: -38.53494220246682 },
        zoom: 14
    });


}