const request = require('sync-request');

const groupId = 'employee';
const KEY = '6849f848e58547a3997fd750e0ac4a3b';

function getPersonById(id) {
    const url = `https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/${groupId}/persons/${id}`;
    const response = request('GET', url, { headers: { 'Ocp-Apim-Subscription-Key': KEY } });
    return JSON.parse(response.getBody('utf8')).personId; 
}

module.exports = getPersonById;
