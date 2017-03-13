const express = require('express');
const parser = require('body-parser').json();
const formidble = require('express-formidable')({ uploadDir: './public' });
const fs = require('fs');

const getFaceByImageUrl = require('./api/uploadFace');
const getNameByFaceId = require('./api/identify');

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('server started'));

app.get('/', (req, res) => res.send('Still alive'));

app.post('/findByUrl', parser, async (req, res) => {
    const { imageUrl } = req.body;
    console.log('URL:::', imageUrl);
    try {
        const faceId = await getFaceByImageUrl(imageUrl);
        const name = await getNameByFaceId(faceId);
        res.send(name);
    } catch (e) {
        console.log(e + '');
        res.send(`${e} `);
    }
});

app.post('/findByImage', formidble, (req, res) => {
    let { path } = req.files.avatar;
    fs.rename(path, `${path}.png`.replace('_', ''), err => {
        if (err) return res.send(`${err} `);
        path = `${path}.png`;
        let output = path.replace('public/', '').replace('_', '');
        output = `https://khoapham-face.herokuapp.com/${output}`;
        res.send(output);
    });
});

app.get('/list', (req, res) => {
  fs.readdir('./public', (err, files) => {
    if (err) return res.send(`${err} `); 
    res.send(files.join('\n'));
  });
});
