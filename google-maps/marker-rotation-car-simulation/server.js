const app = require('express')();
const fs = require('fs');
const sharp = require('sharp');

app.get('/car-icon', (req, res) => {
  const degree = req.query.degree || 0;

  fs.readFile('./car-top-view.png', (err, buffer) => {
    if (err) {
      return res.send('Error while reading the car icon');
    }

    sharp(buffer)
      .rotate(parseFloat(degree), {
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toBuffer(function(err, buff) {

        if (err) {
          return res.send('Error while rotating the image');
        }

        res.setHeader('Content-Type', 'image/png');
        res.send(buff);
      });
  });
});

app.listen(3000, () => console.log('server running at 3000'))
