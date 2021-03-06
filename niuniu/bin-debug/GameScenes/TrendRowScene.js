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
    var TrendRowScene = (function (_super) {
        __extends(TrendRowScene, _super);
        function TrendRowScene() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        TrendRowScene.prototype.onAddToStage = function () {
            var bg = new egret.Shape();
            this.addChild(bg);
            bg.width = 627;
            bg.height = 141;
            bg.graphics.beginFill(0xfff8e3);
            bg.graphics.drawRoundRect(0, 0, 627, 141, 20, 20);
            bg.graphics.endFill();
            this.winRateBg = new egret.Shape();
            this.addChild(this.winRateBg);
            this.winRateBg.width = 96;
            this.winRateBg.height = 41;
            this.winRateBg.graphics.beginFill(0xbda281);
            this.winRateBg.graphics.drawRoundRect(0, 0, 96, 41, 12);
            this.winRateBg.graphics.endFill();
            this.winRateBg.x = 109;
            this.winRateBg.y = 43;
            this.winRateBitmap = CommonUtils.BitmapUtils.createBitmapByName("胜率进度条_png");
            this.winRateBitmap.scale9Grid = new egret.Rectangle(15, 15, this.winRateBitmap.width - 30, this.winRateBitmap.height - 30);
            this.addChild(this.winRateBitmap);
            this.winRateBitmap.x = 113;
            this.winRateBitmap.y = 46;
            this.winRateTF = new egret.TextField();
            this.addChild(this.winRateTF);
            this.winRateTF.textColor = 0xffffff;
            this.winRateTF.size = 28;
            this.winRateTF.textAlign = egret.HorizontalAlign.CENTER;
            this.winRateTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.winRateTF.fontFamily = "PingFang-SC-Medium";
            this.winRateTF.text = "";
            this.winRateTF.x = this.winRateBg.x + (this.winRateBg.width - this.winRateTF.width) / 2;
            this.winRateTF.y = this.winRateBg.y + (this.winRateBg.height - this.winRateTF.height) / 2;
            this.resultBg = new egret.Shape();
            this.addChild(this.resultBg);
            this.resultBg.width = 378;
            this.resultBg.height = 43;
            this.resultBg.graphics.beginFill(0xf4ebce);
            this.resultBg.graphics.drawRoundRect(0, 0, 378, 43, 12, 12);
            this.resultBg.graphics.endFill();
            this.resultBg.x = 222;
            this.resultBg.y = 46;
        };
        TrendRowScene.prototype.setTrendRow = function (model) {
            var logo;
            switch (model.OptionId) {
                case 1:
                    logo = CommonUtils.BitmapUtils.createBitmapByName("青龙小图标_png");
                    this.addChild(logo);
                    logo.x = 31;
                    logo.y = 36;
                    break;
                case 2:
                    logo = CommonUtils.BitmapUtils.createBitmapByName("白虎小图标_png");
                    this.addChild(logo);
                    logo.x = 31;
                    logo.y = 36;
                    break;
                case 3:
                    logo = CommonUtils.BitmapUtils.createBitmapByName("玄武小图标_png");
                    this.addChild(logo);
                    logo.x = 31;
                    logo.y = 36;
                    break;
                case 4:
                    logo = CommonUtils.BitmapUtils.createBitmapByName("桥小图标_png");
                    this.addChild(logo);
                    logo.x = 31;
                    logo.y = 36;
                    break;
                case 5:
                    logo = CommonUtils.BitmapUtils.createBitmapByName("闲小图标_png");
                    this.addChild(logo);
                    logo.x = 31;
                    logo.y = 36;
                    break;
                default:
                    break;
            }
            this.winRateBitmap.width = this.winRateBitmap.width * model.WinRate / 100;
            this.winRateTF.text = model.WinRate.toString() + "%";
            this.winRateTF.x = this.winRateBg.x + (this.winRateBg.width - this.winRateTF.width) / 2;
            this.winRateTF.y = this.winRateBg.y + (this.winRateBg.height - this.winRateTF.height) / 2;
            for (var i = 0; i < 10; i++) {
                this.resultBitmap = CommonUtils.BitmapUtils.createBitmapByName(model.WinStatusResult[i] + "2_png");
                this.addChild(this.resultBitmap);
                this.resultBitmap.x = this.resultBg.x + 6 + i * (13 + this.resultBitmap.width);
                this.resultBitmap.y = 57;
            }
        };
        return TrendRowScene;
    }(egret.DisplayObjectContainer));
    GameScenes.TrendRowScene = TrendRowScene;
    __reflect(TrendRowScene.prototype, "GameScenes.TrendRowScene");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=TrendRowScene.js.map