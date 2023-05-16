function initMap() {
  google.maps.Marker.prototype.setPositionAnimated = async function(position, duration = 2000) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const from = this.getPosition().toJSON();
      const setPosition = this.setPosition.bind(this);

      function setPositionAnimated() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const lat = from.lat + (position.lat - from.lat) * progress;
        const lng = from.lng + (position.lng - from.lng) * progress;

        setPosition({ lat, lng });

        if (progress < 1) requestAnimationFrame(setPositionAnimated);
        else resolve({ lat, lng })
      }

      setPositionAnimated();
    })
  }

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.47254534601006, lng: -106.28142209266413 },
    zoom: 15,
  });

  const marker = new google.maps.Marker({
    map,
    position: map.getCenter()
  });

  const computedPosition = google.maps.geometry.spherical.computeOffset(map.getCenter(), 500, 45).toJSON();

  new google.maps.Marker({
    map,
    position: computedPosition
  });

  marker.setPositionAnimated(computedPosition).then(position => console.log(position))
}

