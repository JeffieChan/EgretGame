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
        var BetNumUI = (function (_super) {
            __extends(BetNumUI, _super);
            function BetNumUI(setting) {
                var _this = _super.call(this) || this;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BetNumUI.prototype.onAddToStage = function () {
                this.drawBitmap();
                this.drawBg();
                this.setChildIndex(this.bitmap, this.numChildren - 1);
                this.drawBetNumTF();
            };
            BetNumUI.prototype.drawBitmap = function () {
                this.cacheAsBitmap = true;
                this.bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                this.addChild(this.bitmap);
                this.bitmap.x = this.setting.left;
                this.bitmap.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            };
            BetNumUI.prototype.drawBg = function () {
                this.bg = new egret.Shape();
                this.addChild(this.bg);
                this.bg.graphics.beginFill(this.setting.textBgColor);
                this.bg.graphics.lineStyle(1, this.setting.borderColor);
                this.bg.graphics.drawRoundRect(0, 0, this.setting.width, this.setting.height, 2 * this.setting.radius);
                this.bg.graphics.endFill();
                this.bg.x = this.bitmap.x + this.bitmap.width - this.setting.padding;
                this.bg.y = this.bitmap.y + this.setting.padding;
            };
            BetNumUI.prototype.drawBetNumTF = function () {
                this.betNumTF = new egret.TextField();
                this.addChild(this.betNumTF);
                this.betNumTF.size = this.setting.textSize;
                this.betNumTF.textColor = this.setting.textColor;
                this.betNumTF.textAlign = egret.HorizontalAlign.CENTER;
                this.betNumTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.betNumTF.x = this.bg.x + (this.bg.width - this.betNumTF.width) / 2;
                this.betNumTF.y = this.bg.y + (this.bg.height - this.betNumTF.height) / 2;
            };
            BetNumUI.prototype.setTotleBetNum = function (num) {
                if (num.toString().length >= 7) {
                    this.betNumTF.text = CommonUtils.NumberUtils.shortNumber(num);
                }
                else {
                    this.betNumTF.text = CommonUtils.NumberUtils.formatNumber(num);
                }
                this.betNumTF.x = this.bg.x + (this.bg.width - this.betNumTF.width) / 2;
                this.betNumTF.y = this.bg.y + (this.bg.height - this.betNumTF.height) / 2;
            };
            return BetNumUI;
        }(egret.DisplayObjectContainer));
        PlayTable.BetNumUI = BetNumUI;
        __reflect(BetNumUI.prototype, "GameScenes.PlayTable.BetNumUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=BetNumUI.js.map