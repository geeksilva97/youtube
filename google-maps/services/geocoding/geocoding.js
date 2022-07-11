function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 },
  });

  const geocoder = new google.maps.Geocoder();
  geocoder
    .geocode({ address: "Toledo", region: 'BR' })
    .then((response) => {
      console.log(response);
      const position = response.results[0].geometry.location;

      map.setCenter(position);
      new google.maps.Marker({
        map,
        position,
      });
    })
    .catch((e) =>
      window.alert("Geocode was not successful for the following reason: " + e)
    );
}
