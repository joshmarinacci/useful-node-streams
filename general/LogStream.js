/**
 * Created by josh on 5/12/15.
 * Writable output stream
 * Stream objects to the console, prepended with the string LOG
 *
 */

var Writable = require('stream').Writable;
var util   = require('util');

function LogStream(opt) {
    if(!opt) opt = {};
    opt.objectMode = true;
    Writable.call(this,opt);

    this._write = function(obj,encoding,callback) {
        console.log("LOG",obj);
        callback();
    };
}
util.inherits(LogStream,Writable);

module.exports = LogStream;
