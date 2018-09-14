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
        public static initConnector(gateServerSetting: ServerSetting) {
            this.gateServerSetting = gateServerSetting;
            this.gateClient = new GateClient();
        }
        public static startConnectToGateServer(sender: any) {
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
        public static startConnectToGameServer(sender: any) {
            if (Connector.gameServerSettingList == null) {
                sender.onConnectToGameServerFailed("没有可用的游戏服务器");
                return;
            }
            Connector.gameClient = new GameClient();
            Connector.connectedToGameServer(0, sender);
        }
        private static connectedToGameServer(serverIndex: number, sender: any) {
            Connector.currentGameServerSetting = Connector.gameServerSettingList[serverIndex];

            // TODO 注册对服务器端推送消息的监听

            // 开始连接游戏服务器，连接成功后自动登录
            Connector.gameClient.init(
                { host: Connector.currentGameServerSetting.HostAddress, port: Connector.currentGameServerSetting.Port },
                function () {
                    sender.onGameServerConnected();
                });
        }
        // End: Game server methods


        // Start: Gate server 连接处理事件
        private static onGateServerConnected(sender: any): void {
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
        }
        // End: Gate server 连接处理事件

        // Start: Game server 连接处理事件
        public static startReconnectTimer(sender: any) {
            if (!Connector.timer) {
                Connector.timer = new egret.Timer(5000, 1);
                Connector.timer.addEventListener(egret.TimerEvent.TIMER, function () { Connector.reConnectToGameServer(null, sender) }, sender);
            }
            if (!Connector.timer.running) {
                Connector.timer.reset();
                Connector.timer.start();
            }
        }
        public static reConnectToGameServer(serverReconnected: (any) => void, sender: any) {

            if (Connector.gameClient.State == ClientState.Disconnected) {
                Connector.gameClient.reConnect(
                    Connector.currentGameServerSetting.HostAddress, Connector.currentGameServerSetting.Port,
                    function (isSuccess: boolean) {
                        egret.log("重连"+isSuccess);
                        if (isSuccess) {
                            Connector.timer.stop();
                            Connector.gameClient.reEnter(CommonUtils.AccountUtils.getAccountToken(), 0,sender);
                        } else {
                            // Connector.getGameClient().close();
                            // this.startReconnectTimer();
                        }
                    }
                );
            }

        }
        public static onUserEnterSuccess(data: any, sender: any) {
            sender.onUserEnterSuccess(data);
        }
        public static onUserEnterFailed(message, sender: any) {
            if (sender.onConnectFailed) {
                sender.onConnectFailed(message);
            }
        }
        public static onUserReEnterSuccess(data: any, sender: any) {
            if (Connector.timer) {
                Connector.timer.stop();
            }
            sender.onUserReEnterSuccess(data);
        }
        public static onUserReEnterFailed(message, sender: any) {
            if (sender.onReconnectFailed) {
                sender.onReconnectFailed(message);
            }
        }

        // End: Game server 连接处理事件
    }
}