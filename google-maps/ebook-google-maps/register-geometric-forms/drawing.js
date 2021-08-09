let initDrawing = (map) => {
    let drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
        },
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: .7,
            strokeWeight: 5,
            zIndex: 1
        },

        polygonOptions: {
            fillColor: '#ffff00',
            fillOpacity: .7,
            strokeWeight: 5,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);


    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        // circulo - raio, centro
        console.log('completed circle', circle);
        const center = circle.getCenter();
        const radius = circle.getRadius();

        const obj = {
            center: center,
            radius: radius,
        };

        localStorage.setItem('circleData', JSON.stringify(obj));
    });

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
        // bound - delmitações do retangulo
        console.log('completed rectangle', rectangle);
        const bounds = rectangle.getBounds();

        localStorage.setItem('rectangleData', JSON.stringify({bounds}));
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        // path
        console.log('completed poolygon', polygon);
        const encodedPath = google.maps.geometry.encoding.encodePath( polygon.getPath() );
        localStorage.setItem('polygonData', JSON.stringify({encodedPath}));
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', function (polyline) {
        // path
        console.log('completed polyline', polyline);
        const encodedPath = google.maps.geometry.encoding.encodePath( polyline.getPath() );
        localStorage.setItem('polylineData', JSON.stringify({encodedPath}));
    });
};