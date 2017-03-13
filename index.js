const express = require('express');
const parser = require('body-parser').urlencoded({ extended: false });
// const formidble = require('express-formidable');
const getFaceByImageUrl = require('./api/uploadFace');
const getNameByFaceId = require('./api/identify');

const app = express();
app.listen(3000, () => console.log('server started'));

app.post('/find', parser, (req, res) => {
    const { imageUrl } = req.body;
    try {
        const faceId = getFaceByImageUrl(imageUrl);
        const name = getNameByFaceId(faceId);
        res.send(name);
    } catch (e) {
        res.send(`${e} `);
    }
});
