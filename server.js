// Requirements

var app = require('express').createServer()
  , express = require('express')
  , io = require('socket.io').listen(app)
  , jqtpl = require("jqtpl");


// Load the config file
var config = require('config').Server;
io.set('log level', 1);

 // App Stuff
app.use('/public', express.static(__dirname + '/public'));
app.listen(config.port);
app.set("view engine", "html");
app.set("view options", {layout: false});
app.register(".html", require("jqtpl").express);

app.get('/', function (req, res) {
  res.redirect('/' + randomString());
});

app.get('/:hash', function (req, res) {
  res.render (__dirname + '/index', {domain: config.siteDomain});
});

// P2P Stuff
io.sockets.on('connection', function (socket) {

	socket.on('joiner', function (data) {

		len = io.sockets.clients(data).length;

		if(len == undefined || len == 0){
			socket.emit('host');
			socket.join(data);
			socket.isHost = true;
			socket.isPeer = false;
			socket.room = data;
		}
		else if(len == 1){
			socket.emit('peer');
			socket.join(data);
			socket.isHost = false;
			socket.isPeer = true;
			socket.room = data;
			socket.hoster = io.sockets.clients(data)[0];
			io.sockets.clients(data)[0].peer = socket;
			if(socket.hoster.fileslist != undefined){
				socket.emit('fileslist', socket.hoster.fileslist);
			}
			if(socket.hoster != undefined){
				socket.hoster.emit('peerconnected');
			}
		}
		else{
			socket.emit('warn', "This connection is full. Please try later.");
		}

		io.sockets.in(data).emit('info', socket.id + " joined!");

	});

	socket.on('disconnect', function(){
	   if(socket.isPeer){
	   	socket.hoster.emit('peerdisconnected');
	   }
	   else if(socket.isHost && socket.peer != undefined){
	   	socket.peer.emit('hostdisconnected');
	   }
	});

	socket.on('listfiles', function (data) {
		if(socket.isHost){
			socket.fileslist = data;
			if(socket.peer){
				socket.peer.emit('fileslist', data);
			}
		};
	});

	socket.on('begintransfer', function (file, chunk) {
		if(socket.isPeer && socket.hoster != undefined){
			socket.hoster.emit('begintransfer', file, chunk);
	   	}
	});

	socket.on('datatransfer', function (data, file, chunk) {
		if(socket.isHost && socket.peer != undefined){
			socket.peer.emit('datatransfer', data, file, chunk);
	   	}
	});

});


// Utilities
function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}
