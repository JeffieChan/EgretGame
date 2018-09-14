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
        var BetCoin = (function (_super) {
            __extends(BetCoin, _super);
            function BetCoin(betNum, index) {
                var _this = _super.call(this) || this;
                _this.betNum = betNum;
                _this.index = index;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
                return _this;
            }
            BetCoin.prototype.onAddToStage = function () {
                this.drawCoin();
                this.drawBetNum();
            };
            BetCoin.prototype.drawCoin = function () {
                switch (this.index) {
                    case 0:
                        this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小100_png");
                        break;
                    case 1:
                        this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小500_png");
                        break;
                    case 2:
                        this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小1000_png");
                        break;
                    case 3:
                        this.betBitmap = CommonUtils.BitmapUtils.createBitmapByName("小5000_png");
                        break;
                    default:
                        break;
                }
                this.addChild(this.betBitmap);
            };
            BetCoin.prototype.drawBetNum = function () {
                this.text = new egret.TextField();
                this.text.size = 14;
                this.text.textColor = 0xffffff;
                this.text.text = this.betNum.toString();
                this.text.textAlign = egret.HorizontalAlign.CENTER;
                this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.text.x = (this.betBitmap.width - this.text.width) / 2;
                this.text.y = (this.betBitmap.height - this.text.height) / 2;
                switch (this.index) {
                    case 0:
                        this.text.stroke = 2;
                        this.text.strokeColor = 0x1f6b48;
                        break;
                    case 1:
                        this.text.stroke = 2;
                        this.text.strokeColor = 0x166478;
                        break;
                    case 2:
                        this.text.stroke = 2;
                        this.text.strokeColor = 0x8f312c;
                        break;
                    case 3:
                        this.text.stroke = 2;
                        this.text.strokeColor = 0x944725;
                        break;
                    default:
                        break;
                }
                this.addChild(this.text);
            };
            return BetCoin;
        }(egret.DisplayObjectContainer));
        PlayTable.BetCoin = BetCoin;
        __reflect(BetCoin.prototype, "GameScenes.PlayTable.BetCoin");
    })(PlayTable = GameScenes.PlayTable || (GameScenes.PlayTable = {}));
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=BetCoin.js.map