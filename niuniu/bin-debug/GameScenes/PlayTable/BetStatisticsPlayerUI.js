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
        var BetStatisticsPlayerUI = (function (_super) {
            __extends(BetStatisticsPlayerUI, _super);
            function BetStatisticsPlayerUI(name, setting) {
                var _this = _super.call(this) || this;
                _this.playerName = name;
                _this.setting = setting;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BetStatisticsPlayerUI.prototype.onAddToStage = function () {
                var nameTF = new egret.TextField;
                this.addChild(nameTF);
                nameTF.size = this.setting.textSize;
                nameTF.textColor = this.setting.textColor;
                nameTF.textAlign = egret.HorizontalAlign.LEFT;
                nameTF.text = this.playerName;
                nameTF.x = this.setting.playerTFLeftPadding;
                nameTF.width = this.setting.playerTFWidth;
                this.betNumTF = new egret.TextField;
                this.addChild(this.betNumTF);
                this.betNumTF.size = this.setting.textSize;
                this.betNumTF.textColor = this.setting.numberColor;
                this.betNumTF.textAlign = egret.HorizontalAlign.LEFT;
                this.betNumTF.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.betNumTF.text = "0";
                this.betNumTF.x = this.setting.playerTFLeftPadding + this.setting.playerTFWidth + this.setting.betNumTFLeftPadding;
            };
            BetStatisticsPlayerUI.prototype.setBetNum = function (num) {
                if (num.toString().length >= 7) {
                    this.betNumTF.text = CommonUtils.NumberUtils.shortNumber(num);
                }
                else {
                    this.betNumTF.text = CommonUtils.NumberUtils.formatNumber(num);
                }
            };
            return BetStatisticsPlayerUI;
        }(egret.DisplayObjectContainer));
        PlayTable.BetStatisticsPlayerUI = BetStatisticsPlayerUI;
        __reflect(BetStatisticsPlayerUI.prototype, "GameScenes.PlayTable.BetStatisticsPlayerUI");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=BetStatisticsPlayerUI.js.map