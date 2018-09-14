var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Server;
(function (Server) {
    var ClientState;
    (function (ClientState) {
        ClientState[ClientState["Disconnected"] = 0] = "Disconnected";
        ClientState[ClientState["Connecting"] = 1] = "Connecting";
        ClientState[ClientState["Connedted"] = 2] = "Connedted";
    })(ClientState = Server.ClientState || (Server.ClientState = {}));
    var BaseClient = (function () {
        function BaseClient() {
            this.initCallback = null;
            this.socket = null;
            this.callbacks = {};
            this.eventCallbacks = {};
            this.reqId = 1;
            this.State = ClientState.Disconnected;
        }
        BaseClient.prototype.on = function (event, fn) {
            (this.eventCallbacks[event] = this.eventCallbacks[event] || []).push(fn);
        };
        BaseClient.prototype.init = function (params, initCb) {
            this.State = ClientState.Connecting;
            this.initCallback = initCb;
            var host = params.host;
            var port = params.port;
            this.initWebSocket(host, port);
        };
        BaseClient.prototype.close = function () {
            this.socket.flush();
            this.socket.close();
        };
        BaseClient.prototype.reConnect = function (host, port, callback) {
            this.init({ host: host, port: port }, callback);
        };
        BaseClient.prototype.isConnected = function () {
            console.log("socket connected: " + this.socket.connected);
            return this.socket.connected;
        };
        BaseClient.prototype.initWebSocket = function (host, port) {
            console.log("[Pomelo] connect to:", host, port);
            console.log(this.socket);
            this.socket = null;
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_STRING;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onMessage, this);
            this.socket.connect(host, port);
        };
        BaseClient.prototype.onConnect = function (e) {
            this.State = ClientState.Connedted;
            console.log("[Pomelo] connect success", e);
            this.initCallback(true);
        };
        BaseClient.prototype.onClose = function (e) {
            console.error("[Pomelo] connect close:", e);
            this.emit(BaseClient.EVENT_CLOSE, e);
        };
        BaseClient.prototype.onIOError = function (e) {
            console.error('socket error: ', e);
            this.emit(BaseClient.EVENT_IO_ERROR, e);
        };
        BaseClient.prototype.onMessage = function (event) {
            var message = this.socket.readUTF();
            console.log(new Date().toString() + "收到服务器端的消息：" + message);
            var msgPackage = JSON.parse(message);
            this.processMessage(msgPackage);
        };
        BaseClient.prototype.processMessage = function (msg) {
            console.log("processMessage");
            console.log(msg);
            if (!msg.ReqId || msg.ReqId == 0) {
                // server push message
                if (Server.GateClient.DEBUG) {
                    console.group("EVENT:");
                    console.info("Route:", msg.ReqId);
                    console.info("Msg:", msg.Data);
                    console.groupEnd();
                }
                this.emit(msg.Route, msg.Data);
                return;
            }
            if (Server.GateClient.DEBUG) {
                console.group("RESPONSE:");
                console.info("Id:", msg.ReqId);
                console.info("Msg:", msg.Data);
                console.groupEnd();
            }
            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.ReqId];
            delete this.callbacks[msg.ReqId];
            if (typeof cb !== 'function') {
                return;
            }
            if (msg.Code == 500) {
                var obj = { "code": 500, "desc": "服务器内部错误", "key": "INTERNAL_ERROR" };
                msg.Data = msg.Data;
            }
            cb(msg);
            return;
        };
        BaseClient.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var params = [].slice.call(arguments, 1);
            var callbacks = this.eventCallbacks[event];
            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }
            return this;
        };
        BaseClient.prototype.request = function (msg, cb) {
            this.reqId++;
            if (this.reqId > BaseClient.MAX_REQ_COUNT) {
                this.reqId = 1;
            }
            var reqId = this.reqId;
            msg.reqId = reqId;
            if (BaseClient.DEBUG) {
                console.group("REQUEST:");
                console.log("Id:", reqId);
                console.log("Param:", msg);
                console.groupEnd();
            }
            if (this.socket && this.socket.connected) {
                this.socket.writeUTF(JSON.stringify(msg));
                this.socket.flush();
            }
            this.callbacks[reqId] = cb;
        };
        BaseClient.EVENT_IO_ERROR = "io-error";
        BaseClient.EVENT_CLOSE = "close";
        BaseClient.EVENT_KICK = "onKick";
        BaseClient.EVENT_HEART_BEAT_TIMEOUT = 'heartbeat timeout';
        BaseClient.DEBUG = true;
        BaseClient.MAX_REQ_COUNT = 255;
        return BaseClient;
    }());
    Server.BaseClient = BaseClient;
    __reflect(BaseClient.prototype, "Server.BaseClient");
})(Server || (Server = {}));
//# sourceMappingURL=BaseClient.js.map