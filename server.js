'use strict';

var http 	= require('http'),
	fs 	 	= require('fs'),
	io 		= require('socket.io'),
	port 	= 8080,
	server;

server = http.createServer(function(req, res) {
	console.log(new Date() + ": " + req.method + " " + req.url);

  	var file = "public" + ((req.url === "/") ? "/index.html" : req.url);
	fs.exists(file, function(exists) {
		if (exists) {
			fs.readFile(file, function(error, content) {
				if (error) {
					res.writeHead(500);
					res.end();
				}
				else {
					res.writeHead(200, {
            			"Content-Type": 'text/html'
          			});
					res.end(content);
				}
			});
		}
		else {
			res.writeHead(404);
			res.end();
		}
	});


}).listen(port, function() {
    console.log((new Date()) + ": ws-paint started on port " + port);
});

io.listen(server).sockets.on('connection', function(socket) {
  	socket.on('data', function (data) {
    	console.log(data);
		socket.broadcast.emit('data', data);
  	});
});


