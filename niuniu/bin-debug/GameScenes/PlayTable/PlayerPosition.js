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
        var PlayerPosition = (function (_super) {
            __extends(PlayerPosition, _super);
            function PlayerPosition(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            PlayerPosition.prototype.onAddToStage = function () {
                this.drawPositionView();
                this.drawBetTF();
            };
            PlayerPosition.prototype.drawPositionView = function () {
                this.bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.bitmap);
                this.bitmap.x = this.setting.left;
                this.bitmap.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.coverView = CommonUtils.BitmapUtils.createBitmapByName(this.setting.coverIconName);
                this.addChild(this.coverView);
                this.coverView.visible = false;
                this.coverView.x = this.setting.left;
                this.coverView.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                this.cover = CommonUtils.BitmapUtils.createBitmapByName("发牌方遮罩_png");
                this.addChild(this.cover);
                this.cover.x = this.bitmap.x - 30;
                this.cover.y = this.bitmap.y - 30;
                this.cover.width = this.bitmap.width + 60;
                this.cover.height = this.bitmap.height + 60;
                this.cover.visible = false;
            };
            PlayerPosition.prototype.showCover = function () {
                var _this = this;
                egret.Tween.get(this.coverView)
                    .call(function () {
                    _this.coverView.alpha = 0;
                    _this.coverView.visible = true;
                }).to({ alpha: 1 }, 500);
            };
            PlayerPosition.prototype.hideCover = function () {
                var _this = this;
                egret.Tween.get(this.coverView).to({ alpha: 0 }, 500).call(function () { _this.coverView.visible = false; });
            };
            PlayerPosition.prototype.drawBetTF = function () {
                this.betTF = new egret.TextField();
                this.addChild(this.betTF);
                this.betTF.size = this.setting.textSize;
                this.betTF.textColor = this.setting.textColor;
                this.betTF.textAlign = egret.HorizontalAlign.LEFT;
                this.betTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.betTF.text = "0";
                this.betTF.fontFamily = this.setting.font;
                this.betTF.x = this.setting.left + this.setting.textX;
                this.betTF.y = this.setting.top + (this.setting.titleHeight - this.betTF.height) / 2 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            PlayerPosition.prototype.setTotleBet = function (num) {
                // this.betTF.text = CommonUtils.NumberUtils.formatNumber(num);
                if (num.toString().length >= 7) {
                    this.betTF.text = CommonUtils.NumberUtils.shortNumber(num);
                }
                else {
                    this.betTF.text = CommonUtils.NumberUtils.formatNumber(num);
                }
            };
            return PlayerPosition;
        }(egret.DisplayObjectContainer));
        PlayTable.PlayerPosition = PlayerPosition;
        __reflect(PlayerPosition.prototype, "GameScenes.PlayTable.PlayerPosition");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=PlayerPosition.js.map