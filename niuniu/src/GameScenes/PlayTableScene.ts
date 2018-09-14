declare function NativeClose();
declare function ocClick();
module GameScenes {
    export class PlayTableScene extends BaseScene {
        private static selfObject: PlayTableScene;
        public playTableTitle: GameScenes.PlayTable.TitleUI;
        private bg: egret.Bitmap;
        private helpBtn: GameScenes.PlayTable.IconUI;
        private trendBtn: GameScenes.PlayTable.IconUI;
        private recordBtn: GameScenes.PlayTable.IconUI;
        private host: GameScenes.PlayTable.IconUI;
        public hostCover: egret.Bitmap;
        public playerCover: egret.Bitmap;
        public onLineIcon: GameScenes.PlayTable.OnlineUI;
        private betStatisticsUI: GameScenes.PlayTable.BetStatisticsUI;
        public ownBetNumUI: GameScenes.PlayTable.BetNumUI;
        public betCoinContainer: GameScenes.PlayTable.BetCoinContainerUI;
        public playerQL: GameScenes.PlayTable.PlayerPosition;
        public playerBH: GameScenes.PlayTable.PlayerPosition;
        public playerXW: GameScenes.PlayTable.PlayerPosition;
        public playerQ: GameScenes.PlayTable.PlayerPosition;
        public playerX: GameScenes.PlayTable.PlayerPosition;
        public pokerBg: GameScenes.PlayTable.PokerBg;
        private poker: egret.Bitmap;
        private frameArr: Array<egret.Point>;
        private pokerPadding: number = 30;
        private positionArr: Array<GameScenes.PlayTable.PlayerPosition>;
        public countDownTimer: GameScenes.PlayTable.CountDownTimer;
        public alert: GameScenes.PlayTable.Alert;
        // private resultPaddingTop: number = 70;
        // private resultPaddingTop1: number = 80;
        private resultPaddingTop: number = -15;
        private resultPaddingTop1: number = -15;
        public playDiceUI: GameScenes.PlayTable.PlayDice;
        public shuffleUI: GameScenes.PlayTable.Shuuffle;
        public presenter: PlayTablePresenter;
        private results: Array<any>;
        private betList: Array<TransmissionPackage.BetItem>;
        private myBetList: Array<Model.BetModel>
        private optionId: number;
        private betAddBitmapText: egret.BitmapText;
        private betAddNumTimer: egret.Timer;
        private bet: GameScenes.PlayTable.BetCoin;
        private betX: number;
        private betY: number;
        private otherBelList: Array<Model.BetModel>
        private serverConnectView: ConnectingUI;
        private lastBetNum: number;
        private wantageAlert: egret.TextField;
        private connectErrorView: GameScenes.PlayTable.ConnectErrorView;
        public optionNumList: Array<number>;
        private positionViewTitleHeight: number = 35;
        public canPutBet: Boolean;
        private lastBetList: Array<Model.BetModel>;//上局下注筹码集合
        private betView: egret.DisplayObjectContainer;
        public constructor() {
            super();
            this.presenter = new PlayTablePresenter(this);
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        public onAddToStage() {
            this.presenter.init();
            this.presenter.startEnterGameServer();
        }

        public initView() {
            this.frameArr = [new egret.Point(392, 194 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2),
            new egret.Point(34.5, 712 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2),
            new egret.Point(279.5, 991 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2),
            new egret.Point(520.5, 712 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2)
            ];
            this.positionArr = [];
            this.positionArr[0] = null;
            this.results = new Array();
            this.betList = new Array();
            this.myBetList = new Array();
            this.betAddNumTimer = new egret.Timer(100, 10);
            this.otherBelList = new Array();
            this.lastBetList = new Array();
            this.canPutBet = true;

        }

        public drawScene(data: any) {
            this.optionNumList = data.Data.OptionNumList;
            if (!this.contains(this.bg)) {
                this.drawPlaytableBg();

            }
            if (!this.contains(this.playTableTitle)) {
                this.drawPlaytableTitle();

            }
            if (!this.contains(this.helpBtn)) {
                this.drawHelpBtn();
            }
            if (!this.contains(this.trendBtn)) {
                this.drawtrendBtn();

            }
            if (!this.contains(this.recordBtn)) {
                this.drawRecordBtn();

            }
            if (!this.contains(this.onLineIcon)) {
                this.drawOnLineIcon();

            }
            if (!this.contains(this.host)) {
                this.drawHost();
            }

            if (!this.contains(this.betStatisticsUI)) {
                this.drawBetStatisticsUI();
            }

            if (!this.contains(this.ownBetNumUI)) {
                this.drawOwnBetNumUI();

            }
            if (!this.contains(this.playerQL)) {
                this.drawPlayerQL();
            }

            if (!this.contains(this.playerBH)) {
                this.drawPlayerBH();

            }
            if (!this.contains(this.playerXW)) {
                this.drawPlayerXW();

            }
            if (!this.contains(this.playerX)) {
                this.drawPlayerX();

            }
            if (!this.contains(this.playerQ)) {
                this.drawPlayerQ();

            }
            if (!this.contains(this.countDownTimer)) {
                this.drawCountDownTimer();

            }
            if (!this.contains(this.alert)) {
                this.drawAlert();

            }
            if (!this.contains(this.betCoinContainer)) {
                this.drawBetCoinContainer();

            }
            if (!this.contains(this.playDiceUI)) {
                this.createDiceUI();

            }
            if (!this.contains(this.shuffleUI)) {
                this.createShufflePokerUI();

            }
            if (!this.contains(this.betAddBitmapText)) {
                this.createBetAddUI();

            }
            if (!this.contains(this.serverConnectView)) {
                this.drawBetAlert();

            }
            if (!this.contains(this.wantageAlert)) {
                this.drawWantageAlert();

            }
            if (!this.contains(this.connectErrorView)) {
                this.drawConnectErrorView();
            }
            if (!this.contains(this.betView)) {
                this.drawBetView();
            }

        }

        private drawPlaytableBg() {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_jpg");
            this.bg.x = (this.stage.stageWidth - this.bg.width) / 2;
            this.addFixedChild(this.bg);
            this.setChildIndex(this.bg, 0)

        }

        private drawPlaytableTitle() {
            this.playTableTitle = new GameScenes.PlayTable.TitleUI(Settings.GameSettingUtils.gameSetting.title);
            this.addFixedChild(this.playTableTitle);
            this.setChildIndex(this.playTableTitle, 1);

        }
        private drawHelpBtn() {
            this.helpBtn = new GameScenes.PlayTable.IconUI(Settings.GameSettingUtils.gameSetting.helpBtn);
            this.addFixedChild(this.helpBtn);
            this.setChildIndex(this.helpBtn, 1);

        }
        private drawtrendBtn() {
            this.trendBtn = new GameScenes.PlayTable.IconUI(Settings.GameSettingUtils.gameSetting.trendBtn);
            this.addFixedChild(this.trendBtn);
            this.setChildIndex(this.trendBtn, 1);
        }
        private drawRecordBtn() {
            this.recordBtn = new GameScenes.PlayTable.IconUI(Settings.GameSettingUtils.gameSetting.recordBtn);
            this.addFixedChild(this.recordBtn);
            this.setChildIndex(this.recordBtn, 1);

        }
        private drawHost() {
            this.host = new GameScenes.PlayTable.IconUI(Settings.GameSettingUtils.gameSetting.host);
            this.addFixedChild(this.host);
            this.hostCover = CommonUtils.BitmapUtils.createBitmapByName("发牌方遮罩_png");
            this.hostCover.x = this.host.icon.x - 10;
            this.hostCover.y = this.host.icon.y - 10;
            this.hostCover.width = this.host.icon.width + 20;
            this.hostCover.height = this.host.icon.height + 20;
            this.hostCover.visible = false;
            this.addFixedChild(this.hostCover);
            this.setChildIndex(this.host, 1);
            this.setChildIndex(this.hostCover, 2);


        }
        private drawOnLineIcon() {
            this.onLineIcon = new GameScenes.PlayTable.OnlineUI(Settings.GameSettingUtils.gameSetting.onLineIcon);
            this.addFixedChild(this.onLineIcon);
            this.setChildIndex(this.onLineIcon, 1);
        }
        private drawBetStatisticsUI() {
            this.betStatisticsUI = new GameScenes.PlayTable.BetStatisticsUI(Settings.GameSettingUtils.gameSetting.betStatistics);
            this.addFixedChild(this.betStatisticsUI);
            this.setChildIndex(this.betStatisticsUI, 1);

        }
        private drawOwnBetNumUI() {
            this.ownBetNumUI = new GameScenes.PlayTable.BetNumUI(Settings.GameSettingUtils.gameSetting.ownBetNum);
            this.addFixedChild(this.ownBetNumUI);
            this.setChildIndex(this.ownBetNumUI, 1);
        }
        private drawPlayerQL() {
            this.playerQL = new GameScenes.PlayTable.PlayerPosition(Settings.GameSettingUtils.gameSetting.playerQL);
            this.addFixedChild(this.playerQL);
            this.positionArr[1] = this.playerQL;
            this.setChildIndex(this.playerQL, 1);

        }

        private drawPlayerXW() {
            this.playerXW = new GameScenes.PlayTable.PlayerPosition(Settings.GameSettingUtils.gameSetting.playerXW);
            this.addFixedChild(this.playerXW);
            this.positionArr[2] = this.playerXW;
            this.setChildIndex(this.playerXW, 1);

        }
        private drawPlayerBH() {
            this.playerBH = new GameScenes.PlayTable.PlayerPosition(Settings.GameSettingUtils.gameSetting.playerBH);
            this.addFixedChild(this.playerBH);
            this.positionArr[3] = this.playerBH;
            this.setChildIndex(this.playerBH, 1);


        }

        private drawPlayerX() {
            this.playerX = new GameScenes.PlayTable.PlayerPosition(Settings.GameSettingUtils.gameSetting.playerX);
            this.addFixedChild(this.playerX);
            this.positionArr[5] = this.playerX;
            this.setChildIndex(this.playerX, 1);

        }
        private drawPlayerQ() {
            this.playerQ = new GameScenes.PlayTable.PlayerPosition(Settings.GameSettingUtils.gameSetting.playerQ);
            this.addFixedChild(this.playerQ);
            this.positionArr[4] = this.playerQ;
            this.setChildIndex(this.playerQ, 1);
        }
        //创建倒计时时钟
        private drawCountDownTimer() {
            this.countDownTimer = new GameScenes.PlayTable.CountDownTimer(Settings.GameSettingUtils.gameSetting.countDownTimer);
            this.addFixedChild(this.countDownTimer);
            this.setChildIndex(this.countDownTimer, 200);
            this.countDownTimer.visible = false;
        }
        //当前金额不满足投注条件时的提示
        private drawWantageAlert() {
            this.wantageAlert = new egret.TextField();
            this.addFixedChild(this.wantageAlert);
            this.wantageAlert.size = 24;
            this.wantageAlert.textColor = 0xffffff;
            this.wantageAlert.textAlign = egret.HorizontalAlign.CENTER;
            this.wantageAlert.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.wantageAlert.fontFamily = "苹方";

            this.wantageAlert.x = 264;
            this.wantageAlert.y = 1143 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            this.wantageAlert.visible = false;
        }
        public showWantageAlert(maxOdds: number) {
            this.wantageAlert.visible = true;
            this.wantageAlert.textFlow = <Array<egret.ITextElement>>[{ text: "金额大于", style: { "textColor": 0xffffff } }
                , { text: (maxOdds * 100 - 1).toString(), style: { "textColor": 0xffd801 } }
                , { text: "才可以投注呦~", style: { "textColor": 0xffffff } }];
        }
        public hideWantageAlert() {
            this.wantageAlert.visible = false;
        }
        //发牌方遮罩
        public showPlyerCover(position: number) {

            switch (position) {
                case 0:
                    this.hostCover.visible = true;
                    break;
                case 1:
                    this.playerQL.cover.visible = true;
                    break;
                case 2:
                    this.playerXW.cover.visible = true;
                    break;
                case 3:
                    this.playerBH.cover.visible = true;
                    break;

                default:
                    break;
            }
        }
        public hidePlayerCover() {
            this.hostCover.visible = false;
            this.playerQL.cover.visible = false;
            this.playerXW.cover.visible = false;
            this.playerBH.cover.visible = false;
        }
        //中心提示
        private drawAlert() {
            this.alert = new GameScenes.PlayTable.Alert(Settings.GameSettingUtils.gameSetting.alert);
            this.addFixedChild(this.alert);
            this.alert.visible = false;
            this.setChildIndex(this.alert, 21);
        }
        //投注提示 
        private drawBetAlert() {

            this.serverConnectView = new ConnectingUI();
            this.serverConnectView.x = 0;
            this.serverConnectView.y = (this.stage.stageHeight - this.serverConnectView.height) / 2;
            console.log(`stageHeight : ${this.stage.stageHeight}`);
            this.addFixedChild(this.serverConnectView);

            this.setChildIndex(this.serverConnectView, 100);
        }
        //创建摇骰子
        public createDiceUI() {
            this.playDiceUI = new GameScenes.PlayTable.PlayDice(Settings.GameSettingUtils.gameSetting.dice, this);
            this.addFixedChild(this.playDiceUI);
            this.setChildIndex(this.playDiceUI, 150);
        }
        //创建洗牌
        private createShufflePokerUI() {
            this.shuffleUI = new GameScenes.PlayTable.Shuuffle(Settings.GameSettingUtils.gameSetting.shuffle, this);
            this.addFixedChild(this.shuffleUI);
            this.setChildIndex(this.shuffleUI, 100);

        }

        //创建一副牌
        public drawPokerBg(cardCound: number) {
            if (!this.contains(this.pokerBg)) {
                this.pokerBg = new GameScenes.PlayTable.PokerBg(Settings.GameSettingUtils.gameSetting.poker, cardCound);
                this.addFixedChild(this.pokerBg);
                this.setChildIndex(this.pokerBg, 10);
                this.results.push(this.pokerBg);

            }


        }

        private drawBetCoinContainer() {
            this.betCoinContainer = new GameScenes.PlayTable.BetCoinContainerUI();
            this.betCoinContainer.optionNumList = this.optionNumList;
            this.addFixedChild(this.betCoinContainer);
            this.betCoinContainer.x = 0;
            this.betCoinContainer.y = this.stage.stageHeight - this.betCoinContainer.height;
            this.betCoinContainer.loadCoins();
        }
        //发牌
        public sendCard(cardIndex: number, position: number) {
            var loc: egret.Point = this.frameArr[position];
            this.pokerBg.dealCard(cardIndex, loc);
        }

        //开牌
        public openCard(position: number, obj: Model.OpenPokerModel, hasNiu: boolean) {
            if (!obj)
                return;
            if (!obj.CardList)
                return;
            if (obj.CardList.length == 0)
                return;

            var loc: egret.Point = this.frameArr[position];
            var list = obj.CardList;
            var cardLevel = obj.CardLevel;
            var cardH: number;
            var cardW: number;
            for (var i = 0; i < obj.CardList.length; i++) {
                var val = obj.CardList[i];
                var openCard = CommonUtils.BitmapUtils.createBitmapByName(val.Color.toString() + "_" + val.Num.toString() + "_png");
                openCard.x = loc.x + i * this.pokerPadding;
                openCard.y = loc.y;
                if (i > 2 && hasNiu) {
                    openCard.y = loc.y - 28;
                }
                this.addFixedChild(openCard);
                cardH = openCard.height;
                cardW = openCard.width;
                this.results.push(openCard);
                this.setChildIndex(openCard, 16 + i);


            }

            var result = CommonUtils.BitmapUtils.createBitmapByName(obj.CardLevel + "_png");

            result.x = loc.x + (4 * this.pokerPadding + cardW - result.width) / 2;
            result.y = loc.y + openCard.height - result.height;
            if (obj.CardLevel == "牛牛") {
                result.y = loc.y + openCard.height - result.height + 10;
            }
            if (obj.CardLevel == "无牛") {
                result.y = loc.y;
            }
            this.addFixedChild(result);
            this.setChildIndex(result, 21);
            this.results.push(result);

        }
        public showResult(text: string, positon: number) {
            if (text == null)
                return;
            var positionView = this.positionArr[positon];
            if (positionView == null)
                return;
            var result = CommonUtils.BitmapUtils.createBitmapByName(text + "_png");

            // result.x = positionView.bitmap.x + (positionView.bitmap.width - result.width) / 2;
            // if (positon == 5) {
            //     result.y = positionView.bitmap.y + this.resultPaddingTop;
            // } else {
            //     result.y = positionView.bitmap.y + this.resultPaddingTop1;
            // }
            result.x = positionView.bitmap.x + positionView.bitmap.width - result.width;
            if (positon == 5) {
                result.y = positionView.bitmap.y + this.resultPaddingTop;
            } else {
                result.y = positionView.bitmap.y + this.resultPaddingTop1;
            }
            this.results.push(result);
            this.addFixedChild(result);
            this.setChildIndex(result, 22);

        }
        public cleanPlayTableSence() {
            while (this.results.length > 0) {
                var item = this.results.pop();
                if (item == null)
                    break;
                if (this.contains(item))
                    this.removeChild(item);

            }

            while (this.myBetList.length > 0) {
                var betModel = this.myBetList.pop();
                if (betModel == null)
                    break;
                if (this.betView.contains(betModel.bet))
                    this.betView.removeChild(betModel.bet);
            }
            while (this.otherBelList.length > 0) {
                var betModel = this.otherBelList.pop();
                if (betModel == null)
                    break;
                if (this.betView.contains(betModel.bet))
                    this.betView.removeChild(betModel.bet);
            }
            while (this.lastBetList.length > 0) {
                var betModel = this.lastBetList.pop();
                if (betModel == null)
                    break;
                if (this.betView.contains(betModel.bet))
                    this.betView.removeChild(betModel.bet);
            }


        }


        //开始下注
        public startPutBet() {
            while (this.myBetList.length > 0) {
                this.myBetList.pop();
            }
            while (this.otherBelList.length > 0) {
                this.otherBelList.pop();
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.putBet, this);


        }
        private drawBetView() {
            this.betView = new egret.DisplayObjectContainer();
            this.addChild(this.betView);
            this.setChildIndex(this.betView, 6);
        }

        //下注
        public putBet(evt: egret.TouchEvent) {
            while (this.betList.length > 0) {
                this.betList.pop();
            }
            if (this.betCoinContainer.betNum) {
                for (var i = 1; i < 6; i++) {
                    var positionView = this.positionArr[i];
                    var betListItem = new TransmissionPackage.BetItem();
                    if (positionView.hitTestPoint(evt.stageX, evt.stageY, true)) {
                        switch (this.betCoinContainer.betNum) {
                            case this.optionNumList[0]:
                                this.bet = new GameScenes.PlayTable.BetCoin(this.optionNumList[0], 0);
                                break;
                            case this.optionNumList[1]:
                                this.bet = new GameScenes.PlayTable.BetCoin(this.optionNumList[1], 1);
                                break;
                            case this.optionNumList[2]:
                                this.bet = new GameScenes.PlayTable.BetCoin(this.optionNumList[2], 2);
                                break;
                            case this.optionNumList[3]:
                                this.bet = new GameScenes.PlayTable.BetCoin(this.optionNumList[3], 3);
                                break;

                            default:
                                break;

                        }
                        var betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小100_png");
                        this.bet.anchorOffsetX = betBitmap.width / 2;
                        this.bet.anchorOffsetY = betBitmap.height / 2;
                        this.bet.x = this.ownBetNumUI.betNumTF.x;
                        this.bet.y = this.ownBetNumUI.betNumTF.y;

                        this.bet.rotation = Math.random() * 360;

                        this.betX = evt.stageX;
                        this.betY = evt.stageY;
                        if (this.betX <= positionView.bitmap.x + betBitmap.width / 2) {
                            this.betX = positionView.bitmap.x + betBitmap.width / 2
                        }
                        if (this.betX >= positionView.bitmap.x + positionView.bitmap.width - betBitmap.width / 2) {
                            this.betX = positionView.bitmap.x + positionView.bitmap.width - betBitmap.width / 2;
                        }
                        if (this.betY <= positionView.bitmap.y + betBitmap.width / 2 + this.positionViewTitleHeight) {
                            this.betY = positionView.bitmap.y + betBitmap.width / 2 + this.positionViewTitleHeight;
                        }
                        if (this.betY >= positionView.bitmap.y + positionView.bitmap.height - betBitmap.width / 2) {
                            this.betY = positionView.bitmap.y + positionView.bitmap.height - betBitmap.width / 2;
                        }
                        this.optionId = i;//当前下注位置
                        betListItem.OptionId = i;
                        betListItem.BetNumber = this.betCoinContainer.betNum;
                        this.lastBetNum = this.betCoinContainer.betNum;
                        this.betList.push(betListItem);
                        this.presenter.startBeting(this.betList);
                    }
                }
            }


        }
        //下注成功将筹码加在舞台上
        public putBetOn() {

            this.betView.addChild(this.bet);
            egret.Tween.get(this.bet).to({ x: this.betX, y: this.betY }, 300);
            var betModel = new Model.BetModel;
            betModel.optionId = this.optionId - 1;
            betModel.bet = this.bet;
            this.myBetList.push(betModel);


        }
        //其他玩家投注筹码
        public putOtherBetOn(otherBets: Array<Array<number>>) {
            var bet: GameScenes.PlayTable.BetCoin;
            var betModel: Model.BetModel;
            for (var i = 1; i < 6; i++) {
                var positionView = this.positionArr[i];
                var arr = otherBets[i - 1];
                betModel = new Model.BetModel();
                betModel.optionId = i - 1;
                arr.forEach((val) => {
                    this.optionNumList.forEach((betNum, index) => {
                        if (betNum == val) {
                            bet = new GameScenes.PlayTable.BetCoin(val, index);
                            this.betView.addChild(bet);
                            bet.x = this.onLineIcon.icon.x;
                            bet.y = this.onLineIcon.icon.y;

                            var x = positionView.bitmap.x + Math.random() * (positionView.bitmap.width - 2 * bet.width);
                            var y = positionView.bitmap.y + this.positionViewTitleHeight + Math.random() * (positionView.bitmap.height - 2 * bet.height - this.positionViewTitleHeight);
                            egret.Tween.get(bet).to({ x: x, y: y }, 300);
                            betModel.bet = bet;
                            this.otherBelList.push(betModel);

                        }
                    });



                });


            }



        }
        //绘制上期下注的筹码
        public drawBet(betList: Array<Model.OptionBetNumberListItem>) {
            var bet: GameScenes.PlayTable.BetCoin;
            var betModel: Model.BetModel;

            for (var i = 1; i < 6; i++) {
                var positionView = this.positionArr[i];
                var optionBetNumberListItem = betList[i - 1];
                optionBetNumberListItem.BetNumberList.forEach((val) => {
                    this.optionNumList.forEach((betNum, index) => {
                        if (betNum == val) {
                            bet = new GameScenes.PlayTable.BetCoin(val, index);
                            this.betView.addChild(bet);
                            bet.x = positionView.bitmap.x + Math.random() * (positionView.bitmap.width - 2 * bet.width);
                            bet.y = positionView.bitmap.y + this.positionViewTitleHeight + Math.random() * (positionView.bitmap.height - 2 * bet.height - this.positionViewTitleHeight);
                            betModel = new Model.BetModel();
                            betModel.optionId = i - 1;
                            betModel.bet = bet;
                            this.lastBetList.push(betModel);
                        }
                    });


                });
                optionBetNumberListItem.MyBetNumberList.forEach((val) => {
                    this.optionNumList.forEach((betNum, index) => {
                        if (betNum == val) {
                            bet = new GameScenes.PlayTable.BetCoin(val, index);
                            this.betView.addChild(bet);
                            bet.x = positionView.bitmap.x + bet.width + Math.random() * (positionView.bitmap.width - 2 * bet.width);
                            bet.y = positionView.bitmap.y + this.positionViewTitleHeight + Math.random() * (positionView.bitmap.height - 2 * bet.height - this.positionViewTitleHeight);
                            betModel = new Model.BetModel();
                            betModel.optionId = i - 1;
                            betModel.bet = bet;
                            this.lastBetList.push(betModel);
                        }
                    });


                });
            }
        }
        //结算时的筹码飞
        public betAnimation(betNum: number, betResults: Array<string>) {
            for (var i: number = 0; i < betResults.length; i++) {
                var result = betResults[i];
                if (result == "负") {
                    this.myBetList.forEach((betModel) => {
                        if (betModel.optionId == i) {
                            egret.Tween.get(betModel.bet).wait(Settings.GameSettingUtils.timeSetting.betWaitInterval)
                                .to({ x: this.host.icon.x + this.host.width / 2, y: this.host.icon.y + this.host.height }, Settings.GameSettingUtils.timeSetting.settleInterval).call(() => {
                                    if (this.betView.contains(betModel.bet)) {
                                        this.betView.removeChild(betModel.bet);
                                    }
                                });
                        }
                    });

                    this.otherBelList.forEach((betModel) => {
                        if (betModel.optionId == i) {
                            egret.Tween.get(betModel.bet).wait(Settings.GameSettingUtils.timeSetting.betWaitInterval)
                                .to({ x: this.host.icon.x + this.host.width / 2, y: this.host.icon.y + this.host.height }, Settings.GameSettingUtils.timeSetting.settleInterval).call(() => {
                                    if (this.betView.contains(betModel.bet)) {
                                        this.betView.removeChild(betModel.bet);
                                    }
                                });
                        }
                    });

                    this.lastBetList.forEach((betModel) => {
                        if (betModel.optionId == i) {
                            egret.Tween.get(betModel.bet).wait(Settings.GameSettingUtils.timeSetting.betWaitInterval)
                                .to({ x: this.host.icon.x + this.host.width / 2, y: this.host.icon.y + this.host.height }, Settings.GameSettingUtils.timeSetting.settleInterval).call(() => {
                                    if (this.betView.contains(betModel.bet)) {
                                        this.betView.removeChild(betModel.bet);
                                    }
                                });
                        }
                    });



                } else {
                    this.myBetList.forEach((betModel) => {
                        if (betModel.optionId == i) {
                            egret.Tween.get(betModel.bet).wait(Settings.GameSettingUtils.timeSetting.betWaitInterval)
                                .to({ x: this.ownBetNumUI.betNumTF.x, y: this.ownBetNumUI.betNumTF.y }, Settings.GameSettingUtils.timeSetting.settleInterval).call(() => {
                                    if (this.betView.contains(betModel.bet)) {
                                        this.betView.removeChild(betModel.bet);
                                    }
                                });
                        }


                    });

                    this.otherBelList.forEach((betModel) => {
                        if (betModel.optionId == i) {
                            egret.Tween.get(betModel.bet).wait(Settings.GameSettingUtils.timeSetting.betWaitInterval)
                                .to({ x: this.onLineIcon.icon.x, y: this.onLineIcon.icon.y }, Settings.GameSettingUtils.timeSetting.settleInterval).call(() => {
                                    if (this.betView.contains(betModel.bet)) {
                                        this.betView.removeChild(betModel.bet);
                                    }
                                });
                        }
                    });

                    this.lastBetList.forEach((betModel) => {
                        if (betModel.optionId == i) {
                            egret.Tween.get(betModel.bet).wait(Settings.GameSettingUtils.timeSetting.betWaitInterval)
                                .to({ x: this.onLineIcon.icon.x, y: this.onLineIcon.icon.y }, Settings.GameSettingUtils.timeSetting.settleInterval).call(() => {
                                    if (this.betView.contains(betModel.bet)) {
                                        this.betView.removeChild(betModel.bet);
                                    }
                                });
                        }
                    });


                }

            }

            this.alert.visible = true;
            if (betNum > 0) {
                this.betAddAnimation(betNum);
            }
        }

        private createBetAddUI() {
            this.betAddBitmapText = new egret.BitmapText();
            this.addFixedChild(this.betAddBitmapText);
            this.betAddBitmapText.font = CommonUtils.BitmapFontUtils.createBitmapFontByName(Settings.GameSettingUtils.gameSetting.bitmapTextFont);
            this.betAddBitmapText.text = "";
            this.betAddBitmapText.visible = false;
        }

        //筹码数值加动画
        private betAddAnimation(betNum: number) {
            this.betAddBitmapText.visible = true;
            this.betAddBitmapText.text = "+" + betNum.toString();
            this.betAddBitmapText.x = this.ownBetNumUI.betNumTF.x;
            this.betAddBitmapText.y = this.ownBetNumUI.bg.y - this.betAddBitmapText.height;
            this.betAddBitmapText.alpha = 1;

            this.setChildIndex(this.betAddBitmapText, 35);
            this.betAddNumTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                this.betAddBitmapText.alpha -= 0.1;
            }, this);


            egret.Tween.get(this.betAddBitmapText)
                .wait(2 * Settings.GameSettingUtils.timeSetting.betWaitInterval + Settings.GameSettingUtils.timeSetting.settleInterval)
                .call(() => {
                    this.betAddNumTimer.reset();
                    this.betAddNumTimer.start();
                })
                .to({ x: this.betAddBitmapText.x, y: this.betAddBitmapText.y - 100 }, Settings.GameSettingUtils.timeSetting.settleInterval)
                .call(() => {
                    this.betAddBitmapText.visible = false;
                    this.betAddBitmapText.x = this.ownBetNumUI.betNumTF.x + this.ownBetNumUI.betNumTF.width;
                    this.betAddBitmapText.y = this.ownBetNumUI.bg.y - this.betAddBitmapText.height;
                });


        }
        //展示自己的投注情况
        public showPlayerBetInfo(bets: Array<number>) {
            for (var i = 0; i < 5; i++) {
                switch (i) {
                    case 0://青龙
                        this.betStatisticsUI.player1TF.setBetNum(bets[0]);
                        break;
                    case 1://玄武
                        this.betStatisticsUI.player2TF.setBetNum(bets[2]);

                        break;
                    case 2://白虎
                        this.betStatisticsUI.player3TF.setBetNum(bets[1]);

                        break;
                    case 3://桥
                        this.betStatisticsUI.player4TF.setBetNum(bets[4]);

                        break;
                    case 4://闲
                        this.betStatisticsUI.player5TF.setBetNum(bets[3]);

                        break;

                    default:
                        break;
                }
            }
        }
        //展示总投注信息
        public showTotleBetInfo(bets: Array<number>) {
            for (var i = 0; i < 5; i++) {
                switch (i) {
                    case 0://青龙
                        this.playerQL.setTotleBet(bets[0]);
                        break;
                    case 1://玄武
                        this.playerBH.setTotleBet(bets[2]);

                        break;
                    case 2://白虎
                        this.playerXW.setTotleBet(bets[1]);

                        break;
                    case 3://桥
                        this.playerX.setTotleBet(bets[4]);

                        break;
                    case 4://闲
                        this.playerQ.setTotleBet(bets[3]);

                        break;

                    default:
                        break;
                }
            }
        }
        //展示信息
        public showInfo(text: string, second?: number) {
            // this.alert.visible = true;
            this.alert.showBitmapTextContent(text, second);

        }

        public showStartBet() {
            this.alert.visible = true;
            this.alert.showStartBet();
            var timer: egret.Timer = new egret.Timer(Settings.GameSettingUtils.timeSetting.alertWaitInterval, 1);
            timer.addEventListener(egret.TimerEvent.TIMER, this.removeAlert, this);
            timer.start();
        }
        public showBet() {
            this.serverConnectView.setConnectText("游戏进行中，请开始投注");
        }
        public showNotEnough(message?: any, type?: number) {
            if (!type) {
                this.serverConnectView.setConnectText(message);
            } else {
                this.serverConnectView.setConnectText(message, type);
            }

        }
        public showStopBet() {
            this.alert.visible = true;
            this.serverConnectView.visible = false;
            this.alert.showStopBet();
            var timer: egret.Timer = new egret.Timer(Settings.GameSettingUtils.timeSetting.alertWaitInterval, 1);
            timer.addEventListener(egret.TimerEvent.TIMER, this.removeAlert, this);
            timer.start();
        }
        public removeAlert() {
            if (this.contains(this.alert))
                this.alert.visible = false;
        }
        private drawConnectErrorView() {
            this.connectErrorView = new GameScenes.PlayTable.ConnectErrorView();
            this.addFixedChild(this.connectErrorView);
            this.connectErrorView.visible = false;
            this.setChildIndex(this.connectErrorView, 255);
        }
        //显示断线重连
        public showReConnect() {
            this.connectErrorView.visible = true;
        }

        //隐藏断线重连
        public hideReConnect() {
            if (this.connectErrorView) {
                this.connectErrorView.visible = false;

            }

        }
        //停止下注
        public stopPutBet() {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.putBet, this);
            this.betCoinContainer.betNum = this.lastBetNum;
        }

        // Start：对事件进行注册和设置的函数
        public registEvents() {

            this.helpBtn.touchEnabled = true;
            this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                //TODU:跳转玩法介绍页面
                console.log("玩法说明");
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.putBet, this);
                this.canPutBet = false;
                GameSceneManger.pushScene(GameScenes.HelpScene, Settings.GameSettingUtils.helpSetting, Settings.GameSettingUtils.gameSetting.globalWidth);
            }, this);
            this.trendBtn.touchEnabled = true;
            this.trendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                //TODU:跳转走势图页面
                console.log("走势");
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.putBet, this);
                this.canPutBet = false;
                GameSceneManger.pushScene(GameScenes.TrendScene, Settings.GameSettingUtils.trendSetting, Settings.GameSettingUtils.gameSetting.globalWidth);

            }, this);
            this.recordBtn.touchEnabled = true;
            this.recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                //TODU:跳转参与记录页面
                console.log("参与记录");
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.putBet, this);
                this.canPutBet = false;
                GameSceneManger.pushScene(GameScenes.HistroyScene, Settings.GameSettingUtils.historySetting, Settings.GameSettingUtils.gameSetting.globalWidth);

            }, this);
        }


    }
}