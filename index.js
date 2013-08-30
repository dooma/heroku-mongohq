var http = require('http');
var database = require('./database.js');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    database.write(function (err, data, end) {
        res.write(data + '\n');
        if (end) {
            res.end('done');
        }
    });
});

server.listen(process.env.PORT);
