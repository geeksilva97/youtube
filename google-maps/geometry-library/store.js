/**
 * Drawing Library
 */

const initDrawing = (map) => {
    let drawingManager = new google.maps.drawing.DrawingManager({
        map: map,
        drawingMode: google.maps.drawing.OverlayType.CIRCLE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
        },

        circleOptions: {
            fillColor: '#f00',
            editable: true,
            dragabble: true
        },

        polygonOptions: {
            fillColor: '#f00'
        },

        rectangleOptions: {
            fillColor: '#f00'
        },

        polylineOptions: {
            strokeColor: '#f00'
        }
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        let encoded = google.maps.geometry.encoding.encodePath(polygon.getPath());
        localStorage.setItem('polygon', JSON.stringify({
            path: encoded
        }))
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', (polyline) => {
        let encoded = google.maps.geometry.encoding.encodePath(polyline.getPath());
        localStorage.setItem('polyline', JSON.stringify({
            path: encoded
        }))
    });

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', (rect) => {
        localStorage.setItem('rectangle', JSON.stringify({
            bounds: rect.getBounds().toJSON()
        }))
    });

    google.maps.event.addListener(drawingManager, 'circlecomplete', (circle) => {
        localStorage.setItem('circle', JSON.stringify({
            center: circle.getCenter(),
            radius: circle.getRadius()
        }));
    });
};


async function initMap() {
    let map = new google.maps.Map(document.querySelector('#map'), {
        center: { lat: -3.726674649708012, lng: -38.53494220246682 },
        zoom: 14
    });

    initDrawing(map)
}


