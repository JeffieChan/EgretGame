module Server {
    class Route {
        static Enter: string = "Enter";
        static Bet: string = "Bet";
        static Chart: string = "Chart";
        static History: string = "History";
        static Background: string = "Background";
    }
    class GameEvents {
        static OnAccountEnter = "AccountEnter";
        static OnAccountLeave = "AccountLeave";
        static OnUserBet = "UserBet";
        static OnStartSchedule = "StartSchedule";
        static OnFreezeSchedule = "FreezeSchedule";
        static OnSettleSchedule = "SettleSchedule";

    }

    export class GameClient extends BaseClient {
        public constructor() {
            super();
        }
        public enter(Token: string, Action: number, sender: any) {//Action0第一次1刷新

            if (this.State == ClientState.Connedted) {
                this.request({ Route: Route.Enter, Data: { Token, Action } }, function (data) {
                    if (!data) {
                        Connector.onUserEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != RequestState.Success) {
                        Connector.onUserEnterFailed(data, sender);
                        return;
                    }
                    Connector.onUserEnterSuccess(data, sender);
                });
                return;
            }
            setInterval(function () { this.enter(Token, Action, sender); }, 1000);

        }
        public reEnter(Token: string, Action: number, sender: any) {

            if (this.State == ClientState.Connedted) {
                this.request({ Route: Route.Enter, Data: { Token, Action } }, function (data) {
                    if (!data) {
                        Connector.onUserReEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != RequestState.Success) {
                        Connector.onUserReEnterFailed(data.Data, sender);
                        return;
                    }
                    Connector.onUserReEnterSuccess(data.Data, sender);
                });
                return;
            }

            setTimeout(function () { this.reEnter(Token, Action, sender); }, 1000);
        }

        public bet(betPackages: TransmissionPackage.BetItem[], scheduleId: number, sender: any) {

            if (this.State == ClientState.Connedted) {
                let reqPackage = {
                    ScheduleId: scheduleId,
                    BetContent: betPackages
                };
                this.request({ Route: Route.Bet, Data: reqPackage }, function (data) {
                    if (!data) {
                        sender.onBetFailed(data.Data)
                        return;
                    }
                    if (data.Code != RequestState.Success) {
                        sender.onBetFailed(data.Data)
                        return;
                    }
                    sender.onBetSuccess(data.Data);
                });
                return;
            }
        }
        //获取走势图
        public getTrend(sender: any) {

            if (this.State == ClientState.Connedted) {
                this.request({ Route: Route.Chart }, function (data) {
                    if (!data) {
                        sender.onGetTrendFailed(data);
                        return;
                    }
                    if (data.Code != RequestState.Success) {
                        sender.onGetTrendFailed(data);
                        return;
                    }
                    sender.onGetTrendSuccess(data);
                });
            }
            setTimeout(function () { this.getTrend(sender); }, 1000);

        }
        public getHistoryRecord(scheduleId: number, count: number, sender: any) {
            let reqPackage = {
                Count: count,
                ScheduleId: scheduleId
            };

            this.request({ Route: Route.History, Data: reqPackage }, function (data) {
                if (!data) {
                    sender.onGetHistoryRecordFailed(data)
                    return;
                }
                if (data.Code != RequestState.Success) {
                    sender.onGetHistoryRecordFailed(data)
                    return;
                }
                sender.onGetHistoryRecordSuccess(data.Data);
            });
        }
        public enterBackground() {
            if (this.State == ClientState.Connedted) {
                this.request({ Route: Route.Background}, function (data) {
                     if (data.Code != RequestState.Success) {
                         return ;
                     }
                });
            }

        }


        // Start: 定义处理服务器端推送消息的事件
        public setOnAccountEnter(callback: Function) {
            this.on(GameEvents.OnAccountEnter, callback);
        }
        public setOnAccountLeave(callback: Function) {
            this.on(GameEvents.OnAccountLeave, callback);
        }
        public setOnUserBet(callback: Function) {
            this.on(GameEvents.OnUserBet, callback);
        }
        public setOnStartSchedule(callback: Function) {
            this.on(GameEvents.OnStartSchedule, callback);
        }
        public setOnFreezeSchedule(callback: Function) {
            this.on(GameEvents.OnFreezeSchedule, callback);
        }

        public setOnSettleSchedule(callback: Function) {
            this.on(GameEvents.OnSettleSchedule, callback);
        }


        // End:定义处理服务器端推送消息的事件

    }

}