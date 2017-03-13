const request = require('sync-request');

const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function uploadFace(imageUrl) {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
    const response = request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: {
            url: imageUrl
        }
     });
    const arr = JSON.parse(response.getBody('utf8'));
    return arr[0].faceId;
}

module.exports = uploadFace;
