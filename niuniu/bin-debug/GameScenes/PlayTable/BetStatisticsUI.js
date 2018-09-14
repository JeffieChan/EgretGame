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
        var BetStatisticsUI = (function (_super) {
            __extends(BetStatisticsUI, _super);
            function BetStatisticsUI(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BetStatisticsUI.prototype.onAddToStage = function () {
                this.drawBg();
                this.drawTitle();
                this.drawPlayer1TF();
                this.drawPlayer2TF();
                this.drawPlayer3TF();
                this.drawPlayer4TF();
                this.drawPlayer5TF();
            };
            BetStatisticsUI.prototype.drawBg = function () {
                this.cacheAsBitmap = true;
                this.bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.bg);
                this.bg.x = this.setting.left;
                this.bg.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            BetStatisticsUI.prototype.drawTitle = function () {
                this.title = new egret.TextField();
                this.addChild(this.title);
                this.title.size = this.setting.textSize;
                this.title.textColor = this.setting.textColor;
                this.title.textAlign = egret.HorizontalAlign.CENTER;
                this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.title.text = this.setting.title;
                this.title.x = this.bg.x + (this.bg.width - this.title.width) / 2;
                this.title.y = this.bg.y + this.setting.titlePaddingToTop;
            };
            BetStatisticsUI.prototype.drawPlayer1TF = function () {
                this.player1TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play1Name, this.setting);
                this.addChild(this.player1TF);
                this.player1TF.y = this.setting.play1NameTop + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            BetStatisticsUI.prototype.drawPlayer2TF = function () {
                this.player2TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play2Name, this.setting);
                this.addChild(this.player2TF);
                this.player2TF.y = this.setting.play1NameTop + this.setting.betNumTFTopPadding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            BetStatisticsUI.prototype.drawPlayer3TF = function () {
                this.player3TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play3Name, this.setting);
                this.addChild(this.player3TF);
                this.player3TF.y = this.setting.play1NameTop + 2 * this.setting.betNumTFTopPadding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            BetStatisticsUI.prototype.drawPlayer4TF = function () {
                this.player4TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play4Name, this.setting);
                this.addChild(this.player4TF);
                this.player4TF.y = this.setting.play1NameTop + 3 * this.setting.betNumTFTopPadding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            BetStatisticsUI.prototype.drawPlayer5TF = function () {
                this.player5TF = new GameScenes.PlayTable.BetStatisticsPlayerUI(this.setting.play5Name, this.setting);
                this.addChild(this.player5TF);
                this.player5TF.y = this.setting.play1NameTop + 4 * this.setting.betNumTFTopPadding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            return BetStatisticsUI;
        }(egret.DisplayObjectContainer));
        PlayTable.BetStatisticsUI = BetStatisticsUI;
        __reflect(BetStatisticsUI.prototype, "GameScenes.PlayTable.BetStatisticsUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=BetStatisticsUI.js.map