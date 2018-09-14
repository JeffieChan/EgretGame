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
    var GamePauseScene = (function (_super) {
        __extends(GamePauseScene, _super);
        function GamePauseScene(mainScene) {
            var _this = _super.call(this) || this;
            _this.mainScene = mainScene;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GamePauseScene.prototype.onAddToStage = function () {
            this.drawBg();
        };
        GamePauseScene.prototype.drawBg = function () {
            this.bg = new egret.Sprite();
            this.bg.graphics.beginFill(0, 0.8);
            this.bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.drawBtn();
            this.registEvents();
        };
        GamePauseScene.prototype.drawBtn = function () {
            this.overBtn = CommonUtils.BitmapUtils.createBitmapByName("结束游戏b_png");
            this.overBtn.x = 179;
            this.overBtn.y = 448;
            this.addChild(this.overBtn);
            this.reStartBtn = CommonUtils.BitmapUtils.createBitmapByName("重新开始b_png");
            this.reStartBtn.x = 179;
            this.reStartBtn.y = 611;
            this.addChild(this.reStartBtn);
            this.resumeBtn = CommonUtils.BitmapUtils.createBitmapByName("继续游戏b_png");
            this.resumeBtn.x = 179;
            this.resumeBtn.y = 772;
            this.addChild(this.resumeBtn);
        };
        GamePauseScene.prototype.registEvents = function () {
            var _this = this;
            this.overBtn.touchEnabled = true;
            this.reStartBtn.touchEnabled = true;
            this.resumeBtn.touchEnabled = true;
            this.overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.mainScene.visible = false;
                _this.visible = false;
                _this.mainScene.loadScene.visible = true;
            }, this);
            this.reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.visible = false;
                _this.mainScene.reStartGame();
            }, this);
            this.resumeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.visible = false;
                _this.mainScene.resume();
            }, this);
        };
        return GamePauseScene;
    }(RootScene));
    GameScene.GamePauseScene = GamePauseScene;
    __reflect(GamePauseScene.prototype, "GameScene.GamePauseScene");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=GamePauseScene.js.map