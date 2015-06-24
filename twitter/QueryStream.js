var Twitter = require('twitter');
var util   = require('util');
var Readable = require('stream').Readable;
var Writable = require('stream').Writable;
//var LogStream = require('./LogStream');

function TwitterStream(query, cfg) {
    Readable.call(this,{objectMode:true});
    console.log("searching Twitter for",query);

    var client = new Twitter(cfg);
    var params = {screen_name: 'joshmarinacci'};


    this._read = function() {
        //console.log("this is a push stream. _read() is a noop");
    };
    var self = this;
    function connect() {
        client.stream('statuses/filter', {track: query}, function(stream) {
            stream.on('data', function(tweet) {
                self.push(tweet);
            });

            stream.on('error', function(error) {
                console.log("got an error",error);
                console.log('reconnecting');
                connect();
                //throw error;
            });
        });
    }
    connect();
}
util.inherits(TwitterStream, Readable);


module.exports = TwitterStream;
//new TwitterStream("#android").pipe(new LogStream());
