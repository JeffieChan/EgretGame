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
var GameScene;
(function (GameScene) {
    var PrevueArea = (function (_super) {
        __extends(PrevueArea, _super);
        function PrevueArea() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        PrevueArea.prototype.onAddToStage = function () {
            this.prevueShapes = new Array();
            this.createPrevueArea();
            this.drawText();
        };
        PrevueArea.prototype.createPrevueArea = function () {
            this.prevueArea = CommonUtils.BitmapUtils.createBitmapByName("下一个_png");
            this.addChild(this.prevueArea);
        };
        PrevueArea.prototype.drawText = function () {
            var text = new egret.TextField();
            text.fontFamily = "AdobeHeitiStd-Regular";
            text.size = 24;
            text.textColor = 0xffffff;
            text.textAlign = "center";
            text.text = "下一个";
            text.x = 23;
            text.y = 30;
            this.addFixedChild(text);
        };
        PrevueArea.prototype.createNextShape = function (dataArr) {
            var _this = this;
            while (this.prevueShapes.length > 0) {
                var shp = this.prevueShapes.pop();
                this.removeChild(shp);
            }
            dataArr.forEach(function (data, index) {
                var shape = new GameScene.BrickShape(data[0], 1);
                _this.addChild(shape);
                if (index == 0) {
                    shape.scaleX = shape.scaleY = 26 / 38;
                    shape.x = (_this.prevueArea.width - shape.width) / 2;
                    shape.y = 75;
                }
                else {
                    shape.scaleX = shape.scaleY = 17 / 38;
                    shape.x = 58;
                    shape.y = 202;
                }
                _this.prevueShapes.push(shape);
            });
            // //添加下一个随机形状数据
            dataArr.push([Math.floor(Math.random() * 7)]);
        };
        return PrevueArea;
    }(RootScene));
    GameScene.PrevueArea = PrevueArea;
    __reflect(PrevueArea.prototype, "GameScene.PrevueArea");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=PrevueArea.js.map