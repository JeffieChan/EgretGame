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
var GameScenes;
(function (GameScenes) {
    var HistoryRowScene = (function (_super) {
        __extends(HistoryRowScene, _super);
        function HistoryRowScene() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        HistoryRowScene.prototype.onDestroy = function () {
            this.onDestroy();
        };
        HistoryRowScene.prototype.onAddToStage = function () {
            this.bg = new egret.Shape();
            this.addChild(this.bg);
            this.bg.width = 627;
            this.bg.height = 141;
            this.bg.graphics.beginFill(0xfff8e3);
            this.bg.graphics.drawRoundRect(0, 0, 640, 348, 20, 20);
            this.bg.graphics.endFill();
            this.scheduleTF = new egret.TextField();
            this.addChild(this.scheduleTF);
            this.scheduleTF.textColor = 0xa86d3d;
            this.scheduleTF.size = 24;
            this.scheduleTF.textAlign = egret.HorizontalAlign.CENTER;
            this.scheduleTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.scheduleTF.fontFamily = "PingFang-SC-Medium";
            this.scheduleTF.x = 20;
            this.scheduleTF.y = 28;
            this.gameStatusTF = new egret.TextField();
            this.addChild(this.gameStatusTF);
            this.gameStatusTF.textColor = 0xa86d3d;
            this.gameStatusTF.size = 24;
            this.gameStatusTF.textAlign = egret.HorizontalAlign.CENTER;
            this.gameStatusTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.gameStatusTF.fontFamily = "PingFang-SC-Medium";
            this.gameStatusTF.y = 28;
            var line = new egret.Shape();
            this.addChild(line);
            line.graphics.beginFill(0xf5dcc7);
            line.graphics.drawRect(0, 0, 612, 2);
            line.graphics.endFill();
            line.x = 11;
            line.y = 71;
            var hostTF = new egret.TextField();
            this.addChild(hostTF);
            hostTF.textColor = 0xa86d3d;
            hostTF.size = 23;
            hostTF.textAlign = egret.HorizontalAlign.CENTER;
            hostTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            hostTF.fontFamily = "PingFang-SC-Medium";
            hostTF.text = "庄:";
            hostTF.x = 19;
            hostTF.y = 110;
            var player1TF = new egret.TextField();
            this.addChild(player1TF);
            player1TF.textColor = 0xa86d3d;
            player1TF.size = 23;
            player1TF.textAlign = egret.HorizontalAlign.CENTER;
            player1TF.verticalAlign = egret.VerticalAlign.MIDDLE;
            player1TF.fontFamily = "PingFang-SC-Medium";
            player1TF.text = "青龙:";
            player1TF.x = 371;
            player1TF.y = 110;
            var player2TF = new egret.TextField();
            this.addChild(player2TF);
            player2TF.textColor = 0xa86d3d;
            player2TF.size = 23;
            player2TF.textAlign = egret.HorizontalAlign.CENTER;
            player2TF.verticalAlign = egret.VerticalAlign.MIDDLE;
            player2TF.fontFamily = "PingFang-SC-Medium";
            player2TF.text = "玄武:";
            player2TF.x = 19;
            player2TF.y = 155;
            var player3TF = new egret.TextField();
            this.addChild(player3TF);
            player3TF.textColor = 0xa86d3d;
            player3TF.size = 23;
            player3TF.textAlign = egret.HorizontalAlign.CENTER;
            player3TF.verticalAlign = egret.VerticalAlign.MIDDLE;
            player3TF.fontFamily = "PingFang-SC-Medium";
            player3TF.text = "白虎:";
            player3TF.x = 371;
            player3TF.y = 155;
            var player4TF = new egret.TextField();
            this.addChild(player4TF);
            player4TF.textColor = 0xa86d3d;
            player4TF.size = 23;
            player4TF.textAlign = egret.HorizontalAlign.CENTER;
            player4TF.verticalAlign = egret.VerticalAlign.MIDDLE;
            player4TF.fontFamily = "PingFang-SC-Medium";
            player4TF.text = "闲:";
            player4TF.x = 19;
            player4TF.y = 199;
            var player5TF = new egret.TextField();
            this.addChild(player5TF);
            player5TF.textColor = 0xa86d3d;
            player5TF.size = 23;
            player5TF.textAlign = egret.HorizontalAlign.CENTER;
            player5TF.verticalAlign = egret.VerticalAlign.MIDDLE;
            player5TF.fontFamily = "PingFang-SC-Medium";
            player5TF.text = "桥:";
            player5TF.x = 371;
            player5TF.y = 199;
            var line1 = new egret.Shape();
            this.addChild(line1);
            line1.graphics.beginFill(0xf5dcc7);
            line1.graphics.drawRect(0, 0, 612, 2);
            line1.graphics.endFill();
            line1.x = 11;
            line1.y = 263;
            this.timeTF = new egret.TextField();
            this.addChild(this.timeTF);
            this.timeTF.textColor = 0xa86d3d;
            this.timeTF.size = 23;
            this.timeTF.textAlign = egret.HorizontalAlign.CENTER;
            this.timeTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.timeTF.fontFamily = "PingFang-SC-Medium";
            this.timeTF.x = 20;
            this.timeTF.y = 289;
            this.beanTF = new egret.TextField();
            this.addChild(this.beanTF);
            this.beanTF.size = 23;
            this.beanTF.textAlign = egret.HorizontalAlign.CENTER;
            this.beanTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beanTF.fontFamily = "PingFang-SC-Medium";
            this.beanTF.y = 289;
        };
        HistoryRowScene.prototype.setHistoryData = function (model) {
            this.scheduleTF.text = "第" + model.ScheduleNumber + "期";
            if (model.State < 3) {
                this.gameStatusTF.text = "等待开牌";
            }
            else {
                this.gameStatusTF.text = "已结算";
            }
            this.gameStatusTF.x = this.bg.width - 27 - this.gameStatusTF.width;
            if (model.State == 3) {
                this.timeTF.text = "开奖时间:" + model.BetTime;
            }
            else {
                this.timeTF.text = "开奖时间:?";
            }
            for (var i = 0; i < 6; i++) {
                var option = model.Option[i];
                if (i > 0 && i < 4) {
                    if (option.WinStatus == 1) {
                        var markBitmap = CommonUtils.BitmapUtils.createBitmapByName("光_png");
                        this.addChild(markBitmap);
                        markBitmap.x = Math.floor(i % 2) * 353;
                        markBitmap.y = 105 + Math.floor(i / 2) * 47;
                        this.setChildIndex(markBitmap, this.numChildren - 12 - i);
                    }
                }
                if (i < 4) {
                    if (model.State == 3) {
                        var playerBitmap = CommonUtils.BitmapUtils.createBitmapByName(option.CardLevel + "-2_png");
                        this.addChild(playerBitmap);
                        playerBitmap.x = 70 + Math.floor(i % 2) * 375;
                        playerBitmap.y = 103 + Math.floor(i / 2) * 46;
                        if (i == 2) {
                            optionModel = model.Option[5];
                            var resultTF = new egret.TextField();
                            this.addChild(resultTF);
                            resultTF.textColor = 0xa86d3d;
                            resultTF.size = 23;
                            resultTF.textAlign = egret.HorizontalAlign.CENTER;
                            resultTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                            resultTF.fontFamily = "PingFang-SC-Medium";
                            resultTF.x = 96;
                            resultTF.y = 200;
                            switch (optionModel.WinStatus) {
                                case -1:
                                    resultTF.text = "负";
                                    break;
                                case 0:
                                    resultTF.text = "平";
                                    break;
                                case 1:
                                    resultTF.text = "胜";
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
                else {
                    var resultTF = new egret.TextField();
                    this.addChild(resultTF);
                    resultTF.textColor = 0xa86d3d;
                    resultTF.size = 23;
                    resultTF.textAlign = egret.HorizontalAlign.CENTER;
                    resultTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                    resultTF.fontFamily = "PingFang-SC-Medium";
                    resultTF.text = "";
                    var optionModel;
                    if (i == 5) {
                        optionModel = model.Option[4];
                    }
                    if (model.State == 3) {
                        switch (optionModel.WinStatus) {
                            case -1:
                                resultTF.text = "负";
                                break;
                            case 0:
                                resultTF.text = "平";
                                break;
                            case 1:
                                resultTF.text = "胜";
                                break;
                            default:
                                break;
                        }
                    }
                    resultTF.x = 96 + Math.floor(i / 5) * 378;
                    resultTF.y = 200;
                }
                var winBeanTF = new egret.TextField();
                this.addChild(winBeanTF);
                winBeanTF.textColor = 0xffa200;
                winBeanTF.size = 26;
                winBeanTF.textAlign = egret.HorizontalAlign.CENTER;
                winBeanTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                winBeanTF.fontFamily = "PingFang-SC-Medium";
                winBeanTF.text = option.TotalBetNumber.toString();
                var optionModel;
                if (i == 4) {
                    optionModel = model.Option[2];
                    winBeanTF.text = optionModel.TotalBetNumber.toString();
                }
                else if (i == 2) {
                    optionModel = model.Option[5];
                    winBeanTF.text = optionModel.TotalBetNumber.toString();
                }
                else if (i == 5) {
                    optionModel = model.Option[4];
                    winBeanTF.text = optionModel.TotalBetNumber.toString();
                }
                winBeanTF.x = 158 + Math.floor(i % 2) * 375;
                winBeanTF.y = 112 + Math.floor(i / 3) * 46;
                if (i == 2 || i == 5) {
                    winBeanTF.y = 200;
                }
            }
            if (model.State == 3) {
                if (model.WinNumber >= 0) {
                    this.beanTF.textColor = 0xffa200;
                    this.beanTF.text = "+" + model.WinNumber.toString();
                }
                else {
                    this.beanTF.textColor = 0x00b588;
                    this.beanTF.text = model.WinNumber.toString();
                }
            }
            else {
                this.beanTF.text = "";
            }
            this.beanTF.x = this.bg.width - 27 - this.beanTF.width;
            for (var i = 0; i < 6; i++) {
                if (model.State != 3) {
                    var noTF = new egret.TextField();
                    this.addChild(noTF);
                    noTF.textColor = 0xa86d3d;
                    noTF.size = 23;
                    noTF.textAlign = egret.HorizontalAlign.CENTER;
                    noTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                    noTF.fontFamily = "PingFang-SC-Medium";
                    noTF.x = 96 + Math.floor(i % 2) * 378;
                    noTF.y = 112 + Math.floor(i / 3) * 46;
                    noTF.text = "?";
                    if (i == 2 || i == 5) {
                        noTF.y = 200;
                    }
                }
            }
        };
        return HistoryRowScene;
    }(egret.DisplayObjectContainer));
    GameScenes.HistoryRowScene = HistoryRowScene;
    __reflect(HistoryRowScene.prototype, "GameScenes.HistoryRowScene");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=HistoryRowScene.js.map