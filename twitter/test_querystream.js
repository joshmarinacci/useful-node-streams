var fs = require('fs');
var QueryStream = require('./QueryStream');
var LogStream = require('../general/LogStream');
/*
var cfg = {
    consumer_key: '....',
    consumer_secret: '....',
    access_token_key: '....',
    access_token_secret: '....'
}
*/
var cfg = JSON.parse(fs.readFileSync('twitter.json').toString());
console.log("config = ", cfg);
new QueryStream(cfg,"#android").pipe(new LogStream());
