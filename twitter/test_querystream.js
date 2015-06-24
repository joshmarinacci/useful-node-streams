var QueryStream = require('./QueryStream');
var LogStream = require('../general/LogStream');
var cfg = {
    consumer_key: '....',
    consumer_secret: '....',
    access_token_key: '....',
    access_token_secret: '....'
}
new QueryStream("#android",cfg).pipe(new LogStream());
