//fetch follower count once an hour, stream to a JSON log file

var fs = require('fs');
var FollowersStream = require('./FollowersStream');
var NDJSON = require('../general/NDJSONOutStream');

/*
load twitter config from a file. It should match
 {
 consumer_key: '....',
 consumer_secret: '....',
 access_token_key: '....',
 access_token_secret: '....'
 }
*/

var cfg = JSON.parse(fs.readFileSync('twitter.json').toString());
new FollowersStream(cfg,60*60*1000)
    .pipe(new NDJSON("foo.log.json"));
