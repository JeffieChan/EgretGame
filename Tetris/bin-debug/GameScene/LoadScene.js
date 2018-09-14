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
    var LoadScene = (function (_super) {
        __extends(LoadScene, _super);
        function LoadScene() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        LoadScene.prototype.onAddToStage = function () {
            console.log(Settings.GameSettingUtils.gameSetting.startBtn);
            this.drawBg();
            this.drawLogo();
            this.drawStartBtn();
            this.drawRankingListBtn();
            this.drawScoreBtn();
            this.drawGiftBtn();
            this.registEvents();
        };
        LoadScene.prototype.drawBg = function () {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
            this.addFixedChild(this.bg);
        };
        LoadScene.prototype.drawLogo = function () {
            var logo = CommonUtils.BitmapUtils.createBitmapByName("图标_png");
            logo.x = 42;
            logo.y = 172;
            this.addFixedChild(logo);
        };
        LoadScene.prototype.drawStartBtn = function () {
            this.startBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.startBtn);
            this.addFixedChild(this.startBtn);
        };
        LoadScene.prototype.drawRankingListBtn = function () {
            this.rankingListBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.rankingListBtn);
            this.addFixedChild(this.rankingListBtn);
        };
        LoadScene.prototype.drawScoreBtn = function () {
            this.scoreBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.scoreBtn);
            this.addFixedChild(this.scoreBtn);
        };
        LoadScene.prototype.drawGiftBtn = function () {
            this.giftBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.giftBtn);
            this.addFixedChild(this.giftBtn);
        };
        LoadScene.prototype.registEvents = function () {
            var _this = this;
            this.startBtn.touchEnabled = true;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:点击开始跳转主游戏页面
                console.log("点击开始");
                _this.visible = false;
                var mainGameScene = new GameScene.MainGameScene(_this);
                _this.stage.addChild(mainGameScene);
            }, this);
            this.rankingListBtn.touchEnabled = true;
            this.rankingListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:跳转排行榜页面
                console.log("排行榜");
            }, this);
            this.scoreBtn.touchEnabled = true;
            this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:跳转成绩页面
                console.log("成绩");
            }, this);
            this.giftBtn.touchEnabled = true;
            this.giftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:跳转礼包页面
                console.log("礼包");
            }, this);
        };
        return LoadScene;
    }(RootScene));
    GameScene.LoadScene = LoadScene;
    __reflect(LoadScene.prototype, "GameScene.LoadScene");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=LoadScene.js.map