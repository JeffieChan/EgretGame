module GameScenes {
    export class PlayTablePresenter extends GameScenes.BasePresenter {
        private view: PlayTableScene;
        private startSendCardPos: number;
        private cardIndex: number;
        private countdownSeconds: number;
        private countdownTimer: egret.Timer;
        private sendCardTimer: egret.Timer;
        private currentRoundState: Model.RoundState;
        private openCardTimer: egret.Timer;
        private openCardCount: number = 0;
        private resultHandData: Model.OpenPokerModel[];
        private enterData: Model.EnterData;
        private gameTimer: egret.Timer;
        public gameCountDownSeconds: number;
        private dices: Array<number>;
        private anmaitonDuration: number = 0;//摇色子发牌开牌结算时间
        private shuffleDuration: number = 1;//洗牌放牌时间
        private scheduleId: number;
        private myBetResultList: Array<any>;
        public currentBonus: number = 0;
        private betResults: Array<string>;//胜负结果
        public maxOdds: number;
        public constructor(view: PlayTableScene) {
            super();
            this.view = view;
        }



        public init() {
            Settings.GameSettingUtils.globalScale = this.view.stage.stageWidth / Settings.GameSettingUtils.gameSetting.globalWidth;
            this.view.initView();
            this.countdownTimer = new egret.Timer(1000, 0);
            this.countdownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountdownTimer, this);

            this.sendCardTimer = new egret.Timer(Settings.GameSettingUtils.timeSetting.sendPokerInterval, 0);
            this.sendCardTimer.addEventListener(egret.TimerEvent.TIMER, this.onSendCardTimer, this);

            this.gameTimer = new egret.Timer(1000, 0);
            this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);

            this.view.stage.addEventListener(egret.Event.DEACTIVATE, this.onDeactivate, this)
            this.view.stage.addEventListener(egret.Event.ACTIVATE, this.onActivate, this);
            this.openCardTimer = new egret.Timer(1000, 4);
            this.openCardTimer.addEventListener(egret.TimerEvent.TIMER, this.openCard, this);

            this.dices = new Array();
            this.myBetResultList = new Array();
            this.betResults = new Array();

        }

        public startEnterGameServer() {
            Server.Connector.getGameClient().enter(CommonUtils.AccountUtils.getAccountToken(), 0, this);
        }
        public startBeting(betPackages: TransmissionPackage.BetItem[]) {
            this.view.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.view.putBet, this.view);
            Server.Connector.getGameClient().bet(betPackages, this.scheduleId, this);

        }
        public onBetSuccess(data) {//下注成功的返回 
            this.view.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.view.putBet, this.view);
            this.view.ownBetNumUI.setTotleBetNum((Number(data.CurrentBonus)));
            var myBetNum: number = 0;
            data.MyBetList.forEach((betNum) => {
                myBetNum += betNum;
            });


            this.currentBonus = Number(data.CurrentBonus);
            this.view.putBetOn();
            if (!data.MyBetList)
                return;
            if (data.MyBetList.length == 0)
                return;
            this.view.showPlayerBetInfo(data.MyBetList);
            if (!data.OptionBetList)
                return;
            if (data.OptionBetList.length == 0)
                return;
            this.view.showTotleBetInfo(data.OptionBetList);


        }
        public onBetFailed(data) {//下注失败的返回
            this.view.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.view.putBet, this.view);
            console.log(`failedData: ${data}`);
            if (data.Message) {
                this.view.showNotEnough(data.Message);

            } else if (data.Data.NeedBonus > 0) {
                this.view.showNotEnough(data.Data.NeedBonus, 1);
            } else if (data.Data.LeftBetBonus > 0) {
                this.view.showNotEnough(data.Data.LeftBetBonus, 2);
            } else if (data.Data.NeedBonus == 0 && data.Data.LeftBetBonus == 0) {
                this.view.showNotEnough(data.Data.LeftBetBonus, 2);
            }
        }

        public onUserEnterSuccess(data: Model.EnterData) {
            this.view.cleanPlayTableSence();
            this.view.drawScene(data);
            if (data.Data.Action == 0) {
                this.enterData = data;
                this.view.registEvents();
                this.registDataReceiveHandlers();
                this.registGameClientReceiveMsgCallback();
            } else {
                this.view.playDiceUI.visible = false;
                this.view.shuffleUI.role.visible = false;
                this.view.hidePlayerCover();
            }
            this.view.onLineIcon.setOnlinePeoples(data.Data.UserCount);
            this.view.ownBetNumUI.setTotleBetNum(data.Data.CurrentBonus);
            this.maxOdds = data.Data.MaxOdds;
            var myBetNum: number = 0;
            if (data.Data.MyBetList) {
                data.Data.MyBetList.forEach((betNum) => {
                    myBetNum += betNum;
                });
            }

            this.currentBonus = data.Data.CurrentBonus;
            this.countdownSeconds = data.Data.CurrentSchedule.CountDown - this.shuffleDuration;
            this.gameCountDownSeconds = data.Data.CurrentSchedule.CountDown - this.anmaitonDuration;

            switch (data.Data.CurrentSchedule.State) {
                case 0://未开始
                    this.countdownTimer.stop();
                    this.view.countDownTimer.visible = false;
                    this.sendCardTimer.stop();
                    this.view.playTableTitle.setTssue(data.Data.PrevSchedule.ScheduleNumber);

                    this.currentRoundState = Model.RoundState.Unstarted;
                    this.gameTimer.reset();
                    this.gameTimer.start();
                    this.view.betCoinContainer.unTouchEable();
                    this.view.drawPokerBg(32);

                    if (!data.Data.MyBetList)
                        return;
                    if (data.Data.MyBetList.length == 0)
                        return;
                    if (data.Data.MyBetList.length > 0) {
                        this.view.showPlayerBetInfo(data.Data.MyBetList);
                    }
                    if (!data.Data.OptionBetList)
                        return;
                    if (data.Data.OptionBetList.length == 0)
                        return;
                    if (data.Data.OptionBetList.length > 0) {
                        this.view.showTotleBetInfo(data.Data.OptionBetList);
                    }
                    this.view.drawBet(data.Data.OptionBetNumberList);
                    if (data.Data.CardData.HandList.length > 0) {
                        this.resultHandData = data.Data.CardData.HandList;
                        this.openedCard();
                    }
                    this.view.playerQL.showCover();
                    this.view.playerBH.showCover();
                    this.view.playerXW.showCover();
                    this.view.playerX.showCover();
                    this.view.playerQ.showCover();
                    this.view.alert.visible = true;
                    break;
                case 1://已开始
                    if (!data.Data.MyBetList)
                        return;
                    if (data.Data.MyBetList.length == 0)
                        return;
                    if (data.Data.MyBetList.length > 0) {
                        this.view.showPlayerBetInfo(data.Data.MyBetList);
                    }
                    if (!data.Data.OptionBetList)
                        return;
                    if (data.Data.OptionBetList.length == 0)
                        return;
                    if (data.Data.OptionBetList.length > 0) {
                        this.view.showTotleBetInfo(data.Data.OptionBetList);
                    }
                    this.view.drawBet(data.Data.OptionBetNumberList);

                    this.view.playTableTitle.setTssue(data.Data.CurrentSchedule.ScheduleNumber);
                    this.scheduleId = data.Data.CurrentSchedule.ScheduleId;

                    this.currentRoundState = Model.RoundState.Started;
                    this.countdownTimer.reset();
                    this.countdownTimer.start();
                    this.view.drawPokerBg(52);
                    this.view.startPutBet();
                    this.view.showBet();
                    this.startSendPokerCountdown();
                    if (!data.Data.MyBetList)
                        return;
                    if (data.Data.MyBetList.length == 0)
                        return;
                    if (data.Data.MyBetList.length > 0) {
                        this.view.showPlayerBetInfo(data.Data.MyBetList);
                    }
                    if (!data.Data.OptionBetList)
                        return;
                    if (data.Data.OptionBetList.length == 0)
                        return;
                    if (data.Data.OptionBetList.length > 0) {
                        this.view.showTotleBetInfo(data.Data.OptionBetList);
                    }
                    this.view.betCoinContainer.checkBetNum(myBetNum, data.Data.CurrentBonus, this.maxOdds);
                    this.view.playerQL.hideCover();
                    this.view.playerBH.hideCover();
                    this.view.playerXW.hideCover();
                    this.view.playerX.hideCover();
                    this.view.playerQ.hideCover();
                    this.view.alert.visible = false;
                    this.gameTimer.stop();
                    break;
                case 2://已封盘
                    this.view.playTableTitle.setTssue(data.Data.CurrentSchedule.ScheduleNumber);
                    this.currentRoundState = Model.RoundState.Frozen;
                    this.view.drawPokerBg(52);
                    this.view.stopPutBet();
                    this.view.betCoinContainer.unTouchEable();
                    this.view.showInfo("请耐心等待下一局");
                    this.view.playerQL.showCover();
                    this.view.playerBH.showCover();
                    this.view.playerXW.showCover();
                    this.view.playerX.showCover();
                    this.view.playerQ.showCover();
                    break;


                default:
                    break;
            }




        }


        private registDataReceiveHandlers() {
            // 注册接收到服务器端推送消息的处理事件 ： onReceiveChat
            ReceiveDataHandlers.ReceiveDataManager.initBusinessHandlers(this.view);
        }
        private registGameClientReceiveMsgCallback() {
            egret.log("消息推送事件");
            let self = this;

            // 心跳超时
            Server.Connector.getGameClient().on(Server.BaseClient.EVENT_HEART_BEAT_TIMEOUT, function (event) {
                egret.log("超时");
                self.onSocketException();
            });
            Server.Connector.getGameClient().on(Server.BaseClient.EVENT_CLOSE, function (event) {
                egret.log("EVENT_CLOSE");
                self.onSocketException();
            });
            Server.Connector.getGameClient().on(Server.BaseClient.EVENT_IO_ERROR, function (event) {
                egret.log("EVENT_IO_ERROR");
                self.onSocketException();

            });

            //用户进入
            Server.Connector.getGameClient().setOnAccountEnter((data) => {
                self.view.onLineIcon.setOnlinePeoples(data.UserCount);
                egret.log("用户进入");
            });
            //用户离开
            Server.Connector.getGameClient().setOnAccountLeave((data) => {
                self.view.onLineIcon.setOnlinePeoples(data.UserCount);
                egret.log("用户离开");
            });
            //用户下注
            Server.Connector.getGameClient().setOnUserBet((data) => {
                console.log("data:" + data);
                egret.log("用户下注");
                self.view.showTotleBetInfo(data.OptionBetList);

                self.view.putOtherBetOn(data.BetData.BetContent);
            });

            //开始新一期
            Server.Connector.getGameClient().setOnStartSchedule((data) => {
                egret.log("开始新的一期");

                if (self.view.alert.bitmapText && self.view.alert.bitmapText.text == "请耐心等待下一局") {
                    self.view.removeAlert();
                }
                self.view.hidePlayerCover();

                while (self.betResults.length > 0) {
                    self.betResults.pop();
                }
                self.view.showPlayerBetInfo([0, 0, 0, 0, 0]);
                self.view.showTotleBetInfo([0, 0, 0, 0, 0]);

                self.scheduleId = data.scheduleData.ScheduleId;
                self.view.playTableTitle.setTssue(data.scheduleData.ScheduleNumber);

                self.countdownSeconds = data.scheduleData.CountDown - this.shuffleDuration;
                self.currentRoundState = data.scheduleData.State;

                self.countdownTimer.reset();
                self.countdownTimer.start();
                console.log("data:" + data);

            });
            //封盘
            Server.Connector.getGameClient().setOnFreezeSchedule((data) => {

                console.log("data:" + data);
                this.view.betCoinContainer.unTouchEable();
                this.view.playerQL.showCover();
                this.view.playerBH.showCover();
                this.view.playerXW.showCover();
                this.view.playerX.showCover();
                this.view.playerQ.showCover();

            });
            //摇骰子，发牌，单播（包含下注结果）
            Server.Connector.getGameClient().setOnSettleSchedule((data) => {

                egret.log("结算");
                self.view.playerQL.showCover();
                self.view.playerBH.showCover();
                self.view.playerXW.showCover();
                self.view.playerX.showCover();
                self.view.playerQ.showCover();
                this.view.betCoinContainer.unTouchEable();
                if (self.view.contains(self.view.alert)) {
                    self.view.removeAlert();
                }
                self.scheduleId = data.scheduleData.ScheduleId;
                self.resultHandData = data.cardData.HandList;
                self.gameCountDownSeconds = data.scheduleData.CountDown - self.anmaitonDuration;
                self.currentRoundState = data.scheduleData.State;
                self.dices = data.cardData.Dice;
                self.myBetResultList = data.MyBetResultList;
                if (data.MyBetResultList) {
                    self.currentBonus = data.CurrentBonus;
                }
                data.cardData.HandList.forEach((val) => {
                    if (val.WinStatus.length > 0) {
                        self.betResults.push(val.WinStatus);
                    }

                });
                self.gameTimer.reset();
                self.gameTimer.start();
                self.view.setChildIndex(self.view.playDiceUI, 100);
                self.view.playDiceUI.visible = true;
                self.view.playDiceUI.play(self.dices);

            });


        }

        private onGameTimer(event: egret.TimerEvent) {
            this.gameCountDownSeconds--;
            if (this.gameCountDownSeconds <= 0) {
                this.gameTimer.stop();

                this.view.cleanPlayTableSence();
                this.view.removeAlert();

                this.view.shuffleUI.shufflePoker();
                return;
            }

            this.view.showInfo("下一局倒计时 ", this.gameCountDownSeconds);
        }

        public startSendPokerCountdown(): void {
            this.view.playerQL.hideCover();
            this.view.playerBH.hideCover();
            this.view.playerXW.hideCover();
            this.view.playerX.hideCover();
            this.view.playerQ.hideCover();

            this.view.countDownTimer.visible = true;
            this.view.countDownTimer.showCountdownSeconds(this.countdownSeconds, this.currentRoundState);
        }


        public onCountdownTimer(event: egret.TimerEvent): void {
            this.countdownSeconds--;
            if (this.view.countDownTimer.visible) {
                this.view.countDownTimer.showCountdownSeconds(this.countdownSeconds, this.currentRoundState);
            }

            if (this.countdownSeconds <= 0) {
                this.countdownTimer.stop();
                this.view.countDownTimer.visible = false;

                // this.view.showStopBet();

                this.view.playerQL.showCover();
                this.view.playerBH.showCover();
                this.view.playerXW.showCover();
                this.view.playerX.showCover();
                this.view.playerQ.showCover();
                this.view.stopPutBet();

                this.view.betCoinContainer.unTouchEable();
            }
        }



        private startSendCard() {
            this.view.pokerBg.refreshCards();
            this.cardIndex = 0;
            this.startSendCardPos = this.getStartPosition();
            this.sendCardTimer.start();
        }
        public showPlyerCover() {
            var position = ((this.dices[0] + this.dices[1] - 1) % 4);
            this.view.showPlyerCover(position);
            var timer = new egret.Timer(1000, 1);
            timer.once(egret.TimerEvent.TIMER_COMPLETE, () => {
                this.startSendCard();
            }, this);
            timer.start();
        }

        private getStartPosition() {
            var position = ((this.dices[0] + this.dices[1] - 1) % 4);
            return position;
        }

        private onSendCardTimer(event: egret.TimerEvent): void {
            if (this.cardIndex >= 20) {
                this.sendCardTimer.stop();
                this.openCardCount = 0;
                this.openCardTimer.reset();
                this.openCardTimer.start();
                this.view.hidePlayerCover();
                return;
            }
            this.view.sendCard(this.cardIndex, this.startSendCardPos);
            this.cardIndex++;
            this.startSendCardPos = (this.startSendCardPos + 1) % 4;

        }
        //展示上一期开牌结果
        private openedCard() {
            for (var i: number = 0; i < this.resultHandData.length; i++) {
                var cardResult = this.resultHandData[i];
                this.view.openCard(i, cardResult,cardResult.HasNiu);
                this.view.showResult(cardResult.WinStatus, i);
            }
        }


        private openCard(evt: egret.TimerEvent) {//开牌从青龙开始

            var cardResult = this.resultHandData[(this.openCardCount + 1) % 4];
            this.view.openCard((this.openCardCount + 1) % 4, cardResult,cardResult.HasNiu);
            switch (this.openCardCount) {//从青龙开始删除
                case 0:
                    this.view.pokerBg.sendCards0.forEach((val) => {
                        this.view.pokerBg.removeChild(val);
                    });
                    break;
                case 1:
                    this.view.pokerBg.sendCards1.forEach((val) => {
                        this.view.pokerBg.removeChild(val);
                    });
                    break;
                case 2:
                    this.view.pokerBg.sendCards2.forEach((val) => {
                        this.view.pokerBg.removeChild(val);
                    });
                    break;
                case 3:
                    this.view.pokerBg.sendCards3.forEach((val) => {
                        this.view.pokerBg.removeChild(val);
                    });
                    break;

                default:
                    break;
            }

            this.openCardCount++;
            if (this.openCardCount >= 4) {
                for (var i = 0; i < 6; i++) {
                    cardResult = this.resultHandData[i];
                    this.view.showResult(cardResult.WinStatus, i);
                }
                //结算
                this.settleAccounts(this.betResults);
            }

        }
        private settleAccounts(betResults: Array<string>) {
            var betNum: number = 0;

            if (this.myBetResultList) {
                this.myBetResultList.forEach((val) => {
                    if (val.WinNumber > 0) {
                        betNum += val.WinNumber;
                    }
                });
                this.view.ownBetNumUI.setTotleBetNum(this.currentBonus);

            }

            this.view.betAnimation(betNum, betResults);
        }

        public onUserEnterFailed() {

        }
        public onUserReEnterSuccess(data: any) {
            console.info("用户重连成功" + data);
            egret.log("用户重连成功");
            this.view.hideReConnect();
            this.setReEnterSuccess(data);
        }

        private onDeactivate() {

            Server.Connector.getGameClient().enterBackground();
            egret.ticker.pause();
            console.warn("转入后台运行");
            this.view.cleanPlayTableSence();
            //断开连接
            // this.closeConnect();
            if (this.view.betCoinContainer) {
                this.view.betCoinContainer.betNum = 0;
                this.view.betCoinContainer.betBitmapIndex = 0;
            }


        }
        private onActivate() {
            console.warn("转到前台运行");
            egret.ticker.resume();

            //如果socket还在连接状态重新请求数据更新游戏状态
            if (Server.Connector.getGameClient().State == Server.ClientState.Connedted) {
                Server.Connector.getGameClient().enter(CommonUtils.AccountUtils.getAccountToken(), 1, this);
            }
        }

        private closeConnect() {
            if (Server.Connector) {
                if (Server.Connector.getGameClient()) {
                    Server.Connector.getGameClient().close();
                }
            }
        }
        private onSocketException() {
            this.closeConnect();
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(this);
            this.view.showReConnect();


        }
        private setReEnterSuccess(data: any) {
            this.view.hidePlayerCover();
            this.view.cleanPlayTableSence();
            this.view.onLineIcon.setOnlinePeoples(data.UserCount);
            this.view.ownBetNumUI.setTotleBetNum(data.CurrentBonus);
            this.maxOdds = data.MaxOdds;
            var myBetNum: number = 0;
            if (data.MyBetList) {
                data.MyBetList.forEach((betNum) => {
                    myBetNum += betNum;
                });
            }

            this.currentBonus = data.CurrentBonus;
            this.countdownSeconds = data.CurrentSchedule.CountDown - this.shuffleDuration;
            this.gameCountDownSeconds = data.CurrentSchedule.CountDown - this.anmaitonDuration;

            switch (data.CurrentSchedule.State) {
                case 0://未开始
                    this.countdownTimer.stop();
                    this.view.countDownTimer.visible = false;
                    this.sendCardTimer.stop();
                    this.view.playTableTitle.setTssue(data.PrevSchedule.ScheduleNumber);
                    this.currentRoundState = Model.RoundState.Unstarted;
                    this.gameTimer.reset();
                    this.gameTimer.start();
                    this.view.betCoinContainer.unTouchEable();
                    this.view.drawPokerBg(32);

                    if (!data.MyBetList)
                        return;
                    if (data.MyBetList.length == 0)
                        return;
                    if (data.MyBetList.length > 0) {
                        this.view.showPlayerBetInfo(data.MyBetList);
                    }
                    if (!data.OptionBetList)
                        return;
                    if (data.OptionBetList.length == 0)
                        return;
                    if (data.OptionBetList.length > 0) {
                        this.view.showTotleBetInfo(data.OptionBetList);
                    }
                    this.view.drawBet(data.OptionBetNumberList);

                    if (data.CardData.HandList.length > 0) {
                        this.resultHandData = data.CardData.HandList;
                        this.openedCard();
                    }
                    this.view.playerQL.showCover();
                    this.view.playerBH.showCover();
                    this.view.playerXW.showCover();
                    this.view.playerX.showCover();
                    this.view.playerQ.showCover();
                    this.view.alert.visible = true;
                    break;
                case 1://已开始
                    if (!data.MyBetList)
                        return;
                    if (data.MyBetList.length == 0)
                        return;
                    if (data.MyBetList.length > 0) {
                        this.view.showPlayerBetInfo(data.MyBetList);
                    }
                    if (!data.OptionBetList)
                        return;
                    if (data.OptionBetList.length == 0)
                        return;
                    if (data.OptionBetList.length > 0) {
                        this.view.showTotleBetInfo(data.OptionBetList);
                    }
                    this.view.drawBet(data.OptionBetNumberList);

                    this.view.playTableTitle.setTssue(data.CurrentSchedule.ScheduleNumber);
                    this.scheduleId = data.CurrentSchedule.ScheduleId;
                    this.currentRoundState = Model.RoundState.Started;
                    this.countdownTimer.reset();
                    this.countdownTimer.start();
                    this.view.drawPokerBg(52);
                    this.view.startPutBet();
                    this.view.showBet();
                    this.startSendPokerCountdown();
                    if (!data.MyBetList)
                        return;
                    if (data.MyBetList.length == 0)
                        return;
                    if (data.MyBetList.length > 0) {
                        this.view.showPlayerBetInfo(data.MyBetList);
                    }
                    if (!data.OptionBetList)
                        return;
                    if (data.OptionBetList.length == 0)
                        return;
                    if (data.OptionBetList.length > 0) {
                        this.view.showTotleBetInfo(data.OptionBetList);
                    }
                    this.view.betCoinContainer.checkBetNum(myBetNum, data.CurrentBonus, this.maxOdds);
                    this.view.playerQL.hideCover();
                    this.view.playerBH.hideCover();
                    this.view.playerXW.hideCover();
                    this.view.playerX.hideCover();
                    this.view.playerQ.hideCover();
                    this.view.alert.visible = false;
                    this.gameTimer.stop();
                    break;
                case 2://已封盘
                    this.view.playTableTitle.setTssue(data.CurrentSchedule.ScheduleNumber);
                    this.currentRoundState = Model.RoundState.Frozen;
                    this.view.drawPokerBg(52);
                    this.view.stopPutBet();
                    this.view.betCoinContainer.unTouchEable();
                    this.view.showInfo("请耐心等待下一局");
                    this.view.betCoinContainer.unTouchEable();
                    this.view.playerQL.showCover();
                    this.view.playerBH.showCover();
                    this.view.playerXW.showCover();
                    this.view.playerX.showCover();
                    this.view.playerQ.showCover();
                    break;
                default:
                    break;
            }

        }


    }


}