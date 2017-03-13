const request = require('then-request');

const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function uploadFace(imageUrl) {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
    return request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: {
            url: imageUrl
        }
    })
    .then(res => res.getBody('utf8'))
    .then(result => {
        const arr = JSON.parse(result);
        return arr[0].faceId;
    });
}

module.exports = uploadFace;

// uploadFace('https://khoapham-face.herokuapp.com/tien.png')
// .then(res => console.log(res));
