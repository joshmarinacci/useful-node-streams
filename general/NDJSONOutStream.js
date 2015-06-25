/**
 * Created by josh on 6/25/15.
 * Writable output stream
 * Stream objects to a file as newline delimited JSON
 */

var Writable = require('stream').Writable;
var util   = require('util');
var fs     = require('fs');

function NDJSONOutStream(path) {
    console.log("appending to log file",path);
    Writable.call(this,{objectMode:true});

    var fout = fs.createWriteStream(path,{flags:'a'});
    this._write = function(obj,encoding,callback) {
        fout.write(JSON.stringify(obj)+"\n",function() {
            callback();
        });
    };
}
util.inherits(NDJSONOutStream,Writable);

module.exports = NDJSONOutStream;
