const request = require('sync-request');
const arrayEmp = require('../data');

const groupId = 'employee';
const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function getText(text, post, pre) {
  const start = text.indexOf(post) + post.length;
  const stop = text.indexOf(pre);
  return text.substring(start, stop);
}

function identify(faceId) {
    const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/identify';
    const response = request('POST', url, { 
        headers: { 'Ocp-Apim-Subscription-Key': KEY },
        json: {    
            personGroupId: groupId,
            faceIds: [faceId],
            maxNumOfCandidatesReturned: 1,
            confidenceThreshold: 0.5
        }
     });
    const data = response.getBody('utf8').replace('\n', '');
    const id = getText(data, '"personId":"', '","confidence"');
    return arrayEmp.find(e => e.personId === id).name;
}

module.exports = identify;
