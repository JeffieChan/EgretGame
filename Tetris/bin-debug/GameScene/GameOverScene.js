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
    var GameOverScene = (function (_super) {
        __extends(GameOverScene, _super);
        function GameOverScene(mainScene) {
            var _this = _super.call(this) || this;
            _this.mainScene = mainScene;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameOverScene.prototype.onAddToStage = function () {
            this.drawBg();
            this.drawLogo();
            this.drawScoreText();
        };
        GameOverScene.prototype.drawBg = function () {
            this.bg = new egret.Sprite();
            this.bg.graphics.beginFill(0, 0.8);
            this.bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.drawBtn();
            this.registEvents();
        };
        GameOverScene.prototype.drawLogo = function () {
            this.logo = CommonUtils.BitmapUtils.createBitmapByName("图标ico_png");
            this.logo.x = 219;
            this.logo.y = 48;
            this.addChild(this.logo);
        };
        GameOverScene.prototype.drawScoreText = function () {
            var textBg = CommonUtils.BitmapUtils.createBitmapByName("得分底_png");
            textBg.x = (this.stage.stageWidth - textBg.width) / 2;
            textBg.y = 390;
            this.addChild(textBg);
            this.scoreText = new egret.TextField();
            this.scoreText.fontFamily = "AdobeHeitiStd-Regular";
            this.scoreText.size = 45;
            this.scoreText.textColor = 0xffffff;
            this.scoreText.textAlign = "center";
            this.scoreText.text = "";
            this.scoreText.y = 393;
            this.addChild(this.scoreText);
            this.betScoreText = new egret.TextField();
            this.betScoreText.fontFamily = "AdobeHeitiStd-Regular";
            this.betScoreText.size = 30;
            this.betScoreText.textColor = 0xffcb3e;
            this.betScoreText.textAlign = "center";
            this.betScoreText.text = "";
            this.betScoreText.y = 460;
            this.addChild(this.betScoreText);
        };
        GameOverScene.prototype.drawBtn = function () {
            this.shareBtn = CommonUtils.BitmapUtils.createBitmapByName("分享好友b_png");
            this.shareBtn.x = 179;
            this.shareBtn.y = 555;
            this.addChild(this.shareBtn);
            this.resurgenceBtn = CommonUtils.BitmapUtils.createBitmapByName("猜豆复活b_png");
            this.resurgenceBtn.x = 179;
            this.resurgenceBtn.y = 696;
            this.addChild(this.resurgenceBtn);
            this.overBtn = CommonUtils.BitmapUtils.createBitmapByName("结束游戏b_png");
            this.overBtn.x = 179;
            this.overBtn.y = 852;
            this.addChild(this.overBtn);
            this.tryAgainBtn = CommonUtils.BitmapUtils.createBitmapByName("再来一次b_png");
            this.tryAgainBtn.x = 179;
            this.tryAgainBtn.y = 993;
            this.addChild(this.tryAgainBtn);
        };
        GameOverScene.prototype.registEvents = function () {
            var _this = this;
            this.shareBtn.touchEnabled = true;
            this.resurgenceBtn.touchEnabled = true;
            this.overBtn.touchEnabled = true;
            this.tryAgainBtn.touchEnabled = true;
            this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                console.log("点击分享");
                platform.showShareMenu();
                platform.shareAppMessage();
            }, this);
            this.resurgenceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                console.log("复活");
                _this.mainScene.resurgence();
            }, this);
            this.overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.mainScene.visible = false;
                _this.visible = false;
                _this.mainScene.loadScene.visible = true;
            }, this);
            this.tryAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.visible = false;
                _this.mainScene.tryAgainGame();
            }, this);
        };
        GameOverScene.prototype.setScore = function (score, bestScore) {
            this.scoreText.text = "得分" + CommonUtils.NumberUtils.formatNumber(score);
            this.scoreText.x = (this.stage.stageWidth - this.scoreText.width) / 2;
            this.betScoreText.text = "最佳" + CommonUtils.NumberUtils.formatNumber(bestScore);
            this.betScoreText.x = (this.stage.stageWidth - this.betScoreText.width) / 2;
        };
        return GameOverScene;
    }(RootScene));
    GameScene.GameOverScene = GameOverScene;
    __reflect(GameOverScene.prototype, "GameScene.GameOverScene");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=GameOverScene.js.map