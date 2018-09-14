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
    var ProgressView = (function (_super) {
        __extends(ProgressView, _super);
        function ProgressView() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        ProgressView.prototype.onAddToStage = function () {
            this.drawBg();
            this.drawProgressView();
            this.drawProgressLogo();
        };
        ProgressView.prototype.drawBg = function () {
            this.progressViewBg = CommonUtils.BitmapUtils.createBitmapByName("进度条1_png");
            this.addChild(this.progressViewBg);
        };
        ProgressView.prototype.drawProgressView = function () {
            this.progressBitmap = CommonUtils.BitmapUtils.createBitmapByName("进度条2_png");
            this.renderTexture = new egret.RenderTexture();
            this.renderTexture.drawToTexture(this.progressBitmap, new egret.Rectangle(0, 0, 0, this.progressBitmap.height));
            this.progressView = new egret.Bitmap(this.renderTexture);
            this.addChild(this.progressView);
            this.progressView.x = 5;
            this.progressView.y = 4;
        };
        ProgressView.prototype.drawProgressLogo = function () {
            this.progressLogo = CommonUtils.BitmapUtils.createBitmapByName("搞怪方块_png");
            this.progressLogo.x = -this.progressLogo.width / 4;
            this.progressLogo.y = (this.progressViewBg.height - this.progressLogo.height) / 2;
            this.addChild(this.progressLogo);
        };
        ProgressView.prototype.getViewLength = function () {
            return this.progressBitmap.width;
        };
        ProgressView.prototype.setProgress = function (progress) {
            this.renderTexture.drawToTexture(this.progressBitmap, new egret.Rectangle(0, 0, progress, this.progressBitmap.height));
            this.progressView = new egret.Bitmap(this.renderTexture);
            this.progressLogo.x = this.progressView.x + this.progressView.width - this.progressLogo.width / 4;
        };
        return ProgressView;
    }(RootScene));
    GameScene.ProgressView = ProgressView;
    __reflect(ProgressView.prototype, "GameScene.ProgressView");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=ProgressView.js.map