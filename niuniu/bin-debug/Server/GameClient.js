var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Server;
(function (Server) {
    var Route = (function () {
        function Route() {
        }
        Route.Enter = "Enter";
        Route.Bet = "Bet";
        Route.Chart = "Chart";
        Route.History = "History";
        Route.Background = "Background";
        return Route;
    }());
    __reflect(Route.prototype, "Route");
    var GameEvents = (function () {
        function GameEvents() {
        }
        GameEvents.OnAccountEnter = "AccountEnter";
        GameEvents.OnAccountLeave = "AccountLeave";
        GameEvents.OnUserBet = "UserBet";
        GameEvents.OnStartSchedule = "StartSchedule";
        GameEvents.OnFreezeSchedule = "FreezeSchedule";
        GameEvents.OnSettleSchedule = "SettleSchedule";
        return GameEvents;
    }());
    __reflect(GameEvents.prototype, "GameEvents");
    var GameClient = (function (_super) {
        __extends(GameClient, _super);
        function GameClient() {
            return _super.call(this) || this;
        }
        GameClient.prototype.enter = function (Token, Action, sender) {
            if (this.State == Server.ClientState.Connedted) {
                this.request({ Route: Route.Enter, Data: { Token: Token, Action: Action } }, function (data) {
                    if (!data) {
                        Server.Connector.onUserEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        Server.Connector.onUserEnterFailed(data, sender);
                        return;
                    }
                    Server.Connector.onUserEnterSuccess(data, sender);
                });
                return;
            }
            setInterval(function () { this.enter(Token, Action, sender); }, 1000);
        };
        GameClient.prototype.reEnter = function (Token, Action, sender) {
            if (this.State == Server.ClientState.Connedted) {
                this.request({ Route: Route.Enter, Data: { Token: Token, Action: Action } }, function (data) {
                    if (!data) {
                        Server.Connector.onUserReEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        Server.Connector.onUserReEnterFailed(data.Data, sender);
                        return;
                    }
                    Server.Connector.onUserReEnterSuccess(data.Data, sender);
                });
                return;
            }
            setTimeout(function () { this.reEnter(Token, Action, sender); }, 1000);
        };
        GameClient.prototype.bet = function (betPackages, scheduleId, sender) {
            if (this.State == Server.ClientState.Connedted) {
                var reqPackage = {
                    ScheduleId: scheduleId,
                    BetContent: betPackages
                };
                this.request({ Route: Route.Bet, Data: reqPackage }, function (data) {
                    if (!data) {
                        sender.onBetFailed(data.Data);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onBetFailed(data.Data);
                        return;
                    }
                    sender.onBetSuccess(data.Data);
                });
                return;
            }
        };
        //获取走势图
        GameClient.prototype.getTrend = function (sender) {
            if (this.State == Server.ClientState.Connedted) {
                this.request({ Route: Route.Chart }, function (data) {
                    if (!data) {
                        sender.onGetTrendFailed(data);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onGetTrendFailed(data);
                        return;
                    }
                    sender.onGetTrendSuccess(data);
                });
            }
            setTimeout(function () { this.getTrend(sender); }, 1000);
        };
        GameClient.prototype.getHistoryRecord = function (scheduleId, count, sender) {
            var reqPackage = {
                Count: count,
                ScheduleId: scheduleId
            };
            this.request({ Route: Route.History, Data: reqPackage }, function (data) {
                if (!data) {
                    sender.onGetHistoryRecordFailed(data);
                    return;
                }
                if (data.Code != Server.RequestState.Success) {
                    sender.onGetHistoryRecordFailed(data);
                    return;
                }
                sender.onGetHistoryRecordSuccess(data.Data);
            });
        };
        GameClient.prototype.enterBackground = function () {
            if (this.State == Server.ClientState.Connedted) {
                this.request({ Route: Route.Background }, function (data) {
                    if (data.Code != Server.RequestState.Success) {
                        return;
                    }
                });
            }
        };
        // Start: 定义处理服务器端推送消息的事件
        GameClient.prototype.setOnAccountEnter = function (callback) {
            this.on(GameEvents.OnAccountEnter, callback);
        };
        GameClient.prototype.setOnAccountLeave = function (callback) {
            this.on(GameEvents.OnAccountLeave, callback);
        };
        GameClient.prototype.setOnUserBet = function (callback) {
            this.on(GameEvents.OnUserBet, callback);
        };
        GameClient.prototype.setOnStartSchedule = function (callback) {
            this.on(GameEvents.OnStartSchedule, callback);
        };
        GameClient.prototype.setOnFreezeSchedule = function (callback) {
            this.on(GameEvents.OnFreezeSchedule, callback);
        };
        GameClient.prototype.setOnSettleSchedule = function (callback) {
            this.on(GameEvents.OnSettleSchedule, callback);
        };
        return GameClient;
    }(Server.BaseClient));
    Server.GameClient = GameClient;
    __reflect(GameClient.prototype, "Server.GameClient");
})(Server || (Server = {}));
//# sourceMappingURL=GameClient.js.map