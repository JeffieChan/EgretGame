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
    var SurpassView = (function (_super) {
        __extends(SurpassView, _super);
        function SurpassView() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        SurpassView.prototype.onAddToStage = function () {
            this.drawBg();
        };
        SurpassView.prototype.drawBg = function () {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("即将超越_png");
            this.addChild(this.bg);
            var text = new egret.TextField;
            text.fontFamily = "PingFang-SC-Medium";
            text.size = 20;
            text.textColor = 0xffffff;
            text.textAlign = "center";
            text.text = "即将超越";
            text.x = 20;
            text.y = 17;
            this.addFixedChild(text);
        };
        return SurpassView;
    }(RootScene));
    GameScene.SurpassView = SurpassView;
    __reflect(SurpassView.prototype, "GameScene.SurpassView");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=SurpassView.js.map