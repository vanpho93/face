const request = require('sync-request');

const KEY = '6849f848e58547a3997fd750e0ac4a3b';
const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/employee/persons';
const opts = {
    headers: { 'Ocp-Apim-Subscription-Key': KEY }
};

try {
    const response = request('GET', url, opts);
    console.log(response.getBody('utf8'));
} catch (e) {
    console.log(`${e} `);
}
