/**
 * Created by joshua@marinacci.org on 2015/05/12.
 * Writable output stream
 * Opens a websocket server on the specified port.
 * Any objects written to this stream will be sent to all
 * currently connected websocket clients.
 */
var util   = require('util');
var Writable = require('stream').Writable;
var ws  = require('nodejs-websocket');

function WebsocketServerStream(port) {
    Writable.call(this,{objectMode:true});
    console.log("creating websocket server on port",port);
    this._write = function(obj,encoding,callback) {
        console.log("sending object",obj," to", this._server.connections.length, 'connections');
        this._server.connections.forEach(function(conn) {
            conn.sendText(JSON.stringify(obj));
        });
        callback();
    };
    this._server = ws.createServer().listen(port);
}
util.inherits(WebsocketServerStream,Writable);


module.exports = WebsocketServerStream;
