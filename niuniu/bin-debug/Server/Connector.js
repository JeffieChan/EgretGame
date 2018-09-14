var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Server;
(function (Server) {
    var RequestState = (function () {
        function RequestState() {
        }
        RequestState.Success = 200;
        RequestState.ServerError = 500;
        return RequestState;
    }());
    Server.RequestState = RequestState;
    __reflect(RequestState.prototype, "Server.RequestState");
    var Connector = (function () {
        function Connector() {
        }
        Connector.getGameClient = function () {
            return Connector.gameClient;
        };
        Connector.initConnector = function (gateServerSetting) {
            this.gateServerSetting = gateServerSetting;
            this.gateClient = new Server.GateClient();
        };
        Connector.startConnectToGateServer = function (sender) {
            if (this.gateServerSetting == null) {
                sender.onGateServerConnectFailed("gate server setting is not setted.");
                return;
            }
            sender.onBeforeGateServerConnected();
            this.gateClient.init({ host: this.gateServerSetting.ip, port: this.gateServerSetting.port }, function () {
                sender.onGateServerConnected();
                Connector.onGateServerConnected(sender);
            });
        };
        // Start: Game server methods
        Connector.startConnectToGameServer = function (sender) {
            if (Connector.gameServerSettingList == null) {
                sender.onConnectToGameServerFailed("没有可用的游戏服务器");
                return;
            }
            Connector.gameClient = new Server.GameClient();
            Connector.connectedToGameServer(0, sender);
        };
        Connector.connectedToGameServer = function (serverIndex, sender) {
            Connector.currentGameServerSetting = Connector.gameServerSettingList[serverIndex];
            // TODO 注册对服务器端推送消息的监听
            // 开始连接游戏服务器，连接成功后自动登录
            Connector.gameClient.init({ host: Connector.currentGameServerSetting.HostAddress, port: Connector.currentGameServerSetting.Port }, function () {
                sender.onGameServerConnected();
            });
        };
        // End: Game server methods
        // Start: Gate server 连接处理事件
        Connector.onGateServerConnected = function (sender) {
            console.info("gate server connect success, start to get all game entry");
            this.gateClient.getAllEntry({}, function (data) {
                if (data.Code == RequestState.Success) {
                    if (!data.Data || data.Data.length == 0) {
                        sender.onGetGameServerFailed("没有可用的游戏服务器");
                        return;
                    }
                    Connector.gameServerSettingList = data.Data;
                    sender.onGetGameServerSuccess();
                    Connector.startConnectToGameServer(sender);
                    return;
                }
                sender.onGetGameServerFailed(data.Data);
            });
        };
        // End: Gate server 连接处理事件
        // Start: Game server 连接处理事件
        Connector.startReconnectTimer = function (sender) {
            if (!Connector.timer) {
                Connector.timer = new egret.Timer(5000, 1);
                Connector.timer.addEventListener(egret.TimerEvent.TIMER, function () { Connector.reConnectToGameServer(null, sender); }, sender);
            }
            if (!Connector.timer.running) {
                Connector.timer.reset();
                Connector.timer.start();
            }
        };
        Connector.reConnectToGameServer = function (serverReconnected, sender) {
            if (Connector.gameClient.State == Server.ClientState.Disconnected) {
                Connector.gameClient.reConnect(Connector.currentGameServerSetting.HostAddress, Connector.currentGameServerSetting.Port, function (isSuccess) {
                    egret.log("重连" + isSuccess);
                    if (isSuccess) {
                        Connector.timer.stop();
                        Connector.gameClient.reEnter(CommonUtils.AccountUtils.getAccountToken(), 0, sender);
                    }
                    else {
                        // Connector.getGameClient().close();
                        // this.startReconnectTimer();
                    }
                });
            }
        };
        Connector.onUserEnterSuccess = function (data, sender) {
            sender.onUserEnterSuccess(data);
        };
        Connector.onUserEnterFailed = function (message, sender) {
            if (sender.onConnectFailed) {
                sender.onConnectFailed(message);
            }
        };
        Connector.onUserReEnterSuccess = function (data, sender) {
            if (Connector.timer) {
                Connector.timer.stop();
            }
            sender.onUserReEnterSuccess(data);
        };
        Connector.onUserReEnterFailed = function (message, sender) {
            if (sender.onReconnectFailed) {
                sender.onReconnectFailed(message);
            }
        };
        return Connector;
    }());
    Server.Connector = Connector;
    __reflect(Connector.prototype, "Server.Connector");
})(Server || (Server = {}));
//# sourceMappingURL=Connector.js.map