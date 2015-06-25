/*
 * Created by joshua@marinacci.org on 2015/05/12.
 * readable input stream
 * Queries Twitter for a particular hashtag, returning as an ongoing stream.
 */
var Twitter = require('twitter');
var util   = require('util');
var Readable = require('stream').Readable;

function TwitterStream(cfg, query) {
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

