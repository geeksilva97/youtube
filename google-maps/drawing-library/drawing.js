let initDrawing = (map) => {
    let drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        },
        markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        },

        polygonOptions: {
            fillColor: '#ffff00',
            fillOpacity: .7,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);


    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        console.log('completed');
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', function (poly) {
        var path = poly.getPath();
        console.log(google.maps.geometry.encoding.encodePath(path));
    });
};