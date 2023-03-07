const https = require('https');

const projectId = '2MglFT530Bq91IHREYXBpWUaIFz';
const projectSecret = '361fd97a85175946dd71e3e6c8f883c3';

const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    path: '/api/v0/get?arg=QmYQPUSSi2YZr8V8j9ZUYVerq1bECmvoKXX7rLVRxYadHu',
    method: 'POST',
    auth: projectId + ':' + projectSecret,
};

let req = https.request(options, (res) => {
    let body = '';
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        console.log(body);
    });
});
req.end();