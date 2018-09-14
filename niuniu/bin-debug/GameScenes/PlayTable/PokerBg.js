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
        var PokerBg = (function (_super) {
            __extends(PokerBg, _super);
            function PokerBg(setting, cardCound) {
                var _this = _super.call(this) || this;
                _this.pokerPadding = 30;
                _this.setting = setting;
                _this.cardCount = cardCound;
                _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            PokerBg.prototype.onAddToStage = function () {
                this.createPoker();
                this.sendCards0 = new Array();
                this.sendCards1 = new Array();
                this.sendCards2 = new Array();
                this.sendCards3 = new Array();
            };
            PokerBg.prototype.dealCard = function (cardIndex, loc) {
                var _this = this;
                if (this.cardCount == 52) {
                    var cards = Math.floor(cardIndex / 4);
                    egret.Tween.get(this.pokerArr[51 - cardIndex])
                        .to({ x: loc.x + cards * this.pokerPadding, y: loc.y }, 300)
                        .call(function () { _this.setChildIndex(_this.pokerArr[51 - cardIndex], cardIndex); });
                    switch (loc.x) {
                        case 34.5:
                            this.sendCards0.push(this.pokerArr[51 - cardIndex]);
                            break;
                        case 279.5:
                            this.sendCards1.push(this.pokerArr[51 - cardIndex]);
                            break;
                        case 520.5:
                            this.sendCards2.push(this.pokerArr[51 - cardIndex]);
                            break;
                        case 392:
                            this.sendCards3.push(this.pokerArr[51 - cardIndex]);
                            break;
                        default:
                            break;
                    }
                }
            };
            PokerBg.prototype.refreshCards = function () {
                for (var i = 0; i < this.cardCount - 1; i++) {
                    this.setChildIndex(this.pokerArr[i], i);
                }
            };
            PokerBg.prototype.createPoker = function () {
                // this.cacheAsBitmap = true;
                this.pokerArr = new Array();
                for (var i = 0; i < this.cardCount; i++) {
                    var poker = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
                    poker.x = this.setting.left;
                    poker.y = this.setting.top - Math.floor(i / 13) * this.setting.padding + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
                    this.addChild(poker);
                    this.pokerArr.push(poker);
                }
            };
            return PokerBg;
        }(egret.DisplayObjectContainer));
        PlayTable.PokerBg = PokerBg;
        __reflect(PokerBg.prototype, "GameScenes.PlayTable.PokerBg");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=PokerBg.js.map