/*
 * Created by joshua@marinacci.org on 2015/05/12.
 * readable input stream
 * Queries Twitter for a particular hashtag, returning as an ongoing stream.
 */
var Twitter = require('twitter');
var util   = require('util');
var Readable = require('stream').Readable;

function FollowersStream(cfg,interval) {
    Readable.call(this,{objectMode:true});
    console.log("getting followers for the current user every ",interval,'msec');

    var client = new Twitter(cfg);
    var params = {screen_name: 'joshmarinacci'};


    this._read = function() {
        //console.log("this is a push stream. _read() is a noop");
    };
    var self = this;
    function connect() {
        client.get('account/verify_credentials',{}, function(error, data, resp) {
            if(!error) {
                console.log("got follower count", data.followers_count);
                self.push({
                    screen_name:data.screen_name,
                    followers_count:data.followers_count,
                    timestamp: new Date(),
                });
            }
        });
    }
    setTimeout(function() {
        connect();
        setInterval(connect,interval);
    });
}
util.inherits(FollowersStream, Readable);


module.exports = FollowersStream;
//new TwitterStream("#android").pipe(new LogStream());
