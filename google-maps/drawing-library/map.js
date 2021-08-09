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
        console.log(JSON.stringify(polygon.getPath().getArray().map(i => i.toJSON())));
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', (polyline) => {
        console.log(JSON.stringify(polyline.getPath().getArray().map(i => i.toJSON())));
    });

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
        console.log(JSON.stringify(rectangle.getBounds().toJSON()));
    });

    google.maps.event.addListener(drawingManager, 'circlecomplete', (circle) => {
        console.log({
            center: JSON.stringify(circle.getCenter().toJSON()),
            radius: circle.getRadius()
        });
    });
};


async function initMap() {
    let map = new google.maps.Map(document.querySelector('#map'), {
        // center: { lat: -3.726674649708012, lng: -38.53494220246682 },
        center: { lat: 33.678, lng: -116.243 },
        zoom: 10
    });

    // initDrawing(map)

    // Polígono
    const polygon = new google.maps.Polygon({
        map: map,
        path: [
            { "lat": 33.58867182193198, "lng": -116.23270031738281 },
            { "lat": 33.479924025198954, "lng": -116.31372448730468 },
            { "lat": 33.48679635312219, "lng": -116.15304943847656 }
        ]
    });

    // Linha
    const polyline = new google.maps.Polyline({
        map: map,
        path: [
            { "lat": 33.80119193985558, "lng": -116.25467297363281 },
            { "lat": 33.74068869132062, "lng": -116.32059094238281 },
            { "lat": 33.629845755874996, "lng": -116.36590954589843 }
        ]
    });

    // Retângulo
    const rectangle = new google.maps.Rectangle({
        map: map,
        bounds: {
            south: 33.71099223661525,
            west: -116.63507458496093,
            north: 33.80233309986016,
            east: -116.51971813964843
        }
    });

    // Círculo
    const circle = new google.maps.Circle({
        map: map,
        center: { "lat": 33.78293131053824, "lng": -115.92508312988281 },
        radius: 12000
    });


}


