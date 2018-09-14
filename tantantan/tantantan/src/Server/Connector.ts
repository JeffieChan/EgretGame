module Server {
    export interface ServerSetting {
        ip: string;
        port: number;
    }

    export class RequestState {
        static Success: number = 200;
        static ServerError: number = 500;
    }

    export class Connector {
        private static gateServerSetting: ServerSetting;
        private static gateClient: GateClient;
        private static gameClient: GameClient;
        private static gameServerSettingList: any[];
        private static currentGameServerSetting: any;
        private static timer: egret.Timer;
        public static getGameClient(): GameClient {
            return Connector.gameClient;
        }
        public static getGateClient(): GateClient {
            return Connector.gateClient;
        }
        public static initConnector(gateServerSetting: ServerSetting) {
            this.gateServerSetting = gateServerSetting;
            this.gateClient = new GateClient();
        }
        public static startConnectToGateServer(sender: IServerConnectorSender, stayCurrentPage?: boolean) {
            if (this.gateServerSetting == null) {
                sender.onGateServerConnectFailed("gate server setting is not setted.");
                return;
            }
            sender.onBeforeGateServerConnected();
            this.gateClient.init(
                { host: this.gateServerSetting.ip, port: this.gateServerSetting.port },
                function () {
                    sender.onGateServerConnected();
                    Connector.onGateServerConnected(sender);
                }
            );
        }

        // Start: Game server methods
        public static startConnectToGameServer(sender: IServerConnectorSender) {
            if (Connector.gameServerSettingList == null) {
                sender.onConnectToGameServerFailed("没有可用的游戏服务器");
                return;
            }
            Connector.gameClient = new GameClient();
            Connector.connectedToGameServer(0, sender);
        }

        private static connectedToGameServer(serverIndex: number, sender: IServerConnectorSender) {
            Connector.currentGameServerSetting = Connector.gameServerSettingList[serverIndex];
            // 开始连接游戏服务器，连接成功后自动登录
            Connector.gameClient.init(
                { host: Connector.currentGameServerSetting.HostAddress, port: Connector.currentGameServerSetting.Port },
                function () {
                    sender.onGameServerConnected();
                });
        }
        // End: Game server methods


        // Start: Gate server 连接处理事件
        private static onGateServerConnected(sender: IServerConnectorSender): void {
            CommonUtils.LoggerUtil.log("gate server connect success, start to get all game entry");
            this.gateClient.getAllEntry({}, function (data) {
                if (data.Code == RequestState.Success) {
                    if (!data.Data || data.Data.length == 0) {
                        sender.onGetGameServerFailed("没有可用的游戏服务器");
                        return;
                    }
                    Connector.gameServerSettingList = data.Data;
                    sender.onGetGameServerSuccess(data);
                    Connector.startConnectToGameServer(sender);
                    return;
                }
                sender.onGetGameServerFailed(data.Data);
            });
        }
        // End: Gate server 连接处理事件

        // Start: Game server 连接处理事件
        public static startReconnectTimer(sender: IServerConnectorSender) {
            if (!Connector.timer) {
                Connector.timer = new egret.Timer(5000);
                Connector.timer.addEventListener(egret.TimerEvent.TIMER, function () { Connector.reConnectToGameServer(null, sender) }, sender);
            }
            if (!Connector.timer.running) {
                Connector.timer.start();
            }
        }
        public static reConnectToGameServer(serverReconnected: (any) => void, sender: IServerConnectorSender, forceReconnedted?: boolean) {

            if (Connector.gameClient.State == ClientState.Disconnected || forceReconnedted) {
                Connector.gameClient.close();
                platform.login().then((jsCode) => {
                    CommonUtils.LoggerUtil.log(jsCode);
                    CommonUtils.AccountUtils.updateWxJsCode(jsCode.code);
                    Connector.gameClient.reConnect(
                        Connector.currentGameServerSetting.HostAddress, Connector.currentGameServerSetting.Port,
                        function () {
                            CommonUtils.LoggerUtil.log("重连游戏服务器成功");
                            Connector.gameClient.reEnter(CommonUtils.AccountUtils.getwxUserData(), sender);
                        }
                    );
                });
            }

        }
        public static onUserEnterSuccess(data: any, sender: IServerConnectorSender) {
            sender.onUserEnterSuccess(data);
        }
        public static onUserEnterFailed(message, sender: IServerConnectorSender) {
            if (sender.onUserEnterFailed) {
                sender.onUserEnterFailed(message);
            }
        }
        public static onUserReEnterSuccess(data: any, sender: IServerConnectorSender) {
            if (Connector.timer) {
                Connector.timer.stop();
            }
            sender.onUserReEnterSuccess(data);
        }
        public static onUserReEnterFailed(message, sender: IServerConnectorSender) {
            if (sender.onUserReEnterFailed) {
                sender.onUserReEnterFailed(message);
            }
        }
        public static onReloadGameDataSuccess(data: any, sender: IServerConnectorSender) {
            if (Connector.timer) {
                Connector.timer.stop();
            }
            sender.onReloadGameDataSuccess(data);
        }
        // End: Game server 连接处理事件
    }
}