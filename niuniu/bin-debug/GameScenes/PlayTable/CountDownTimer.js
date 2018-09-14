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
    var PlayTable;
    (function (PlayTable) {
        var CountDownTimer = (function (_super) {
            __extends(CountDownTimer, _super);
            function CountDownTimer(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            CountDownTimer.prototype.onAddToStage = function () {
                this.drawClock();
                this.drawBg();
                this.setChildIndex(this.clock, this.numChildren - 1);
                this.drawTimerTF();
                this.countNum = new egret.Bitmap();
                this.countNum.y = 517 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.addChild(this.countNum);
                this.countNum.visible = false;
                this.countdownRes = [];
                for (var i = 1; i <= 5; i++) {
                    this.countdownRes[i] = RES.getRes("倒计时" + i.toString() + "_png");
                }
                this.cacheAsBitmap = true;
            };
            CountDownTimer.prototype.drawClock = function () {
                this.clock = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.clock);
                this.clock.x = this.setting.left;
                this.clock.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            CountDownTimer.prototype.drawBg = function () {
                this.bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.bgIconName);
                this.addChild(this.bg);
                this.bg.x = 21;
                this.bg.y = this.setting.top + (this.clock.height - this.bg.height) / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            CountDownTimer.prototype.drawTimerTF = function () {
                this.timerTF = new egret.TextField();
                this.addChild(this.timerTF);
                this.timerTF.size = this.setting.textSize;
                this.timerTF.textColor = this.setting.textColor;
                this.timerTF.textAlign = egret.HorizontalAlign.CENTER;
                this.timerTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.timerTF.text = " ";
                this.timerTF.fontFamily = this.setting.font;
                this.timerTF.x = this.bg.x + (this.bg.width - this.timerTF.width) / 2;
                this.timerTF.y = this.bg.y + (this.bg.height - this.timerTF.height) / 2;
            };
            CountDownTimer.prototype.showCountdownSeconds = function (seconds, type) {
                seconds = (seconds < 0 ? 0 : seconds);
                this.timerTF.text = "下注倒计时 " + seconds.toString() + "s";
                this.timerTF.textColor = ((seconds <= 5) ? this.setting.noticeColor : this.setting.textColor);
                this.timerTF.x = this.bg.x + (this.bg.width - this.timerTF.width) / 2 + 10;
                this.timerTF.y = this.bg.y + (this.bg.height - this.timerTF.height) / 2;
                this.showCountDown(seconds);
            };
            CountDownTimer.prototype.showCountDown = function (second) {
                if (second > 5 || second < 1) {
                    this.countNum.visible = false;
                    return;
                }
                this.countNum.visible = true;
                var texture = this.countdownRes[second];
                console.log(texture);
                this.countNum.texture = texture;
                console.log(this.countNum);
                this.countNum.x = (750 - this.countNum.width) / 2;
            };
            return CountDownTimer;
        }(egret.DisplayObjectContainer));
        PlayTable.CountDownTimer = CountDownTimer;
        __reflect(CountDownTimer.prototype, "GameScenes.PlayTable.CountDownTimer");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=CountDownTimer.js.map