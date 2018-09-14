var pomelo = require('pomelo');
var CONFIG = require('./app/util/config');
var routeUtil = require('./app/util/routeUtil');
var app = pomelo.createApp();
app.set('name', 'weicai-game-server');

app.configure('production|development', 'connector', function() {
    app.set('connectorConfig', {
        connector: pomelo.connectors.hybridconnector,
        heartbeat: 3,
        useDict: true,
        useProtobuf: true
    });
});
app.configure('production|development', 'gate', function() {
    app.set('connectorConfig', {
        connector: pomelo.connectors.hybridconnector,
        useProtobuf: true
    });
});
app.configure('production|development', function() {
    app.route('chat', routeUtil.chat);
    app.filter(pomelo.timeout());
});
app.start();
process.on('uncaughtException', function(err) {
    console.error(' Caught exception: ' + err.stack);
});