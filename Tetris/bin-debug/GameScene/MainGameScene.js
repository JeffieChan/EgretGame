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
    var MainGameScene = (function (_super) {
        __extends(MainGameScene, _super);
        function MainGameScene(loadScene) {
            var _this = _super.call(this) || this;
            _this.progressViewLength = 0;
            _this.score = 0;
            _this.loadScene = loadScene;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        MainGameScene.prototype.onAddToStage = function () {
            this.dataArr = new Array();
            this.createData();
            this.drawBg();
            this.drawScore();
            this.drawProgressView();
            this.drawPlayView();
            this.drawBrickContainer();
            this.drawPrevueArea();
            this.drawSurpassView();
            this.addNewBrickShape();
            this.drawLeftBtn();
            this.drawRightBtn();
            this.drawDownBtn();
            this.drawTurnBtn();
            this.drawDownBottomBtn();
            this.drawPauseBtn();
            this.drawGiftBtn();
            this.drawGameOverScene();
            this.drawGamePasueScene();
            this.gameTimer = new egret.Timer(200, 300);
            this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdatProgressView, this);
            this.gameTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.insertLine, this);
            this.gameTimer.start();
        };
        MainGameScene.prototype.drawBg = function () {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
            this.addFixedChild(this.bg);
        };
        MainGameScene.prototype.drawScore = function () {
            this.scoreBg = CommonUtils.BitmapUtils.createBitmapByName("进度条1_png");
            this.scoreBg.x = 54;
            this.scoreBg.y = 49;
            this.scoreBg.width = 165;
            this.addFixedChild(this.scoreBg);
            this.scoreIcon = CommonUtils.BitmapUtils.createBitmapByName("积分_png");
            this.scoreIcon.x = 39;
            this.scoreIcon.y = 31;
            this.addFixedChild(this.scoreIcon);
            this.scoreText = new egret.TextField();
            this.scoreText.fontFamily = "AdobeHeitiStd-Regular";
            this.scoreText.size = 20;
            this.scoreText.textColor = 0xffffff;
            this.scoreText.textAlign = "center";
            this.scoreText.text = "0";
            this.scoreText.x = this.scoreBg.x + (this.scoreBg.x - this.scoreIcon.x) + (this.scoreBg.width - this.scoreText.width) / 2;
            this.scoreText.y = this.scoreBg.y + (this.scoreBg.height - this.scoreText.height) / 2;
            this.addFixedChild(this.scoreText);
        };
        MainGameScene.prototype.drawProgressView = function () {
            this.progressView = new GameScene.ProgressView();
            this.progressView.x = 238;
            this.progressView.y = 49;
            this.addChild(this.progressView);
        };
        MainGameScene.prototype.drawPlayView = function () {
            var playBg = CommonUtils.BitmapUtils.createBitmapByName("主面板_png");
            playBg.x = 25;
            playBg.y = 103;
            this.addFixedChild(playBg);
        };
        MainGameScene.prototype.drawBrickContainer = function () {
            this.brickContainer = new GameScene.BrickContainer(Settings.BrickSettings.rows, Settings.BrickSettings.cols, Settings.BrickSettings.cols * Settings.BrickSettings.brickWidth, Settings.BrickSettings.rows * Settings.BrickSettings.brickWidth, this);
            this.brickContainer.x = 72;
            this.brickContainer.y = 168;
            this.addFixedChild(this.brickContainer);
        };
        MainGameScene.prototype.addNewBrickShape = function () {
            var _this = this;
            var style = this.dataArr.shift();
            var newBrickShape = new GameScene.BrickShape(style, 0, MainGameScene.rows[style], MainGameScene.cols[style], this.brickContainer);
            newBrickShape.onFreezeHandle = function () {
                var deleted = _this.brickContainer.clearFilledLine();
                if (deleted > 0) {
                    _this.brickContainer.fixLinePosition();
                    _this.setScoreTextWithLines(deleted); //分数
                }
                _this.addNewBrickShape();
            };
            this.brickContainer.addNewBrickShape(newBrickShape);
            this.prevueArea.createNextShape(this.dataArr);
        };
        MainGameScene.prototype.createData = function () {
            this.dataArr = [
                [Math.floor(Math.random() * 7)],
                [Math.floor(Math.random() * 7)],
                [Math.floor(Math.random() * 7)]
            ];
        };
        MainGameScene.prototype.insertLine = function () {
            this.brickContainer.insertLine();
            this.resetProgressView();
        };
        MainGameScene.prototype.resetProgressView = function () {
            this.progressViewLength = 0;
            this.progressView.setProgress(0);
            this.gameTimer.reset();
            this.gameTimer.start();
        };
        MainGameScene.prototype.onUpdatProgressView = function (evt) {
            this.progressViewLength += this.progressView.getViewLength() / 300;
            this.progressView.setProgress(this.progressViewLength);
        };
        MainGameScene.prototype.drawPrevueArea = function () {
            this.prevueArea = new GameScene.PrevueArea();
            this.prevueArea.x = 577;
            this.prevueArea.y = 127;
            this.addFixedChild(this.prevueArea);
        };
        MainGameScene.prototype.drawSurpassView = function () {
            this.surpassView = new GameScene.SurpassView();
            this.surpassView.x = 608;
            this.surpassView.y = 423;
            this.addFixedChild(this.surpassView);
        };
        MainGameScene.prototype.drawLeftBtn = function () {
            this.leftBtn = CommonUtils.BitmapUtils.createBitmapByName("左_png");
            this.leftBtn.x = 34;
            this.leftBtn.y = 1077;
            this.addFixedChild(this.leftBtn);
            this.leftBtn.touchEnabled = true;
            // this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.startMoveLeft, this.brickContainer);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startMoveLeft, this.brickContainer);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopMoveLeft, this.brickContainer);
        };
        MainGameScene.prototype.drawRightBtn = function () {
            this.rightBtn = CommonUtils.BitmapUtils.createBitmapByName("右_png");
            this.rightBtn.x = 193;
            this.rightBtn.y = 1077;
            this.addFixedChild(this.rightBtn);
            this.rightBtn.touchEnabled = true;
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startMoveRight, this.brickContainer);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopMoveRight, this.brickContainer);
        };
        MainGameScene.prototype.drawDownBtn = function () {
            this.downBtn = CommonUtils.BitmapUtils.createBitmapByName("下_png");
            this.downBtn.x = 351;
            this.downBtn.y = 1077;
            this.addFixedChild(this.downBtn);
            this.downBtn.touchEnabled = true;
            this.downBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startFastDown, this.brickContainer);
            this.downBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopFastDown, this.brickContainer);
        };
        MainGameScene.prototype.drawTurnBtn = function () {
            this.turnBtn = CommonUtils.BitmapUtils.createBitmapByName("旋转_png");
            this.turnBtn.x = 589;
            this.turnBtn.y = 1155;
            this.addFixedChild(this.turnBtn);
            this.turnBtn.touchEnabled = true;
            this.turnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.turn, this.brickContainer);
        };
        MainGameScene.prototype.drawDownBottomBtn = function () {
            this.downBottomBtn = CommonUtils.BitmapUtils.createBitmapByName("加速下_png");
            this.downBottomBtn.x = 589;
            this.downBottomBtn.y = 992;
            this.addFixedChild(this.downBottomBtn);
            this.downBottomBtn.touchEnabled = true;
            this.downBottomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.moveToBottom, this.brickContainer);
        };
        MainGameScene.prototype.drawPauseBtn = function () {
            this.pauseBtn = CommonUtils.BitmapUtils.createBitmapByName("暂停_png");
            this.pauseBtn.x = 616;
            this.pauseBtn.y = 631;
            this.addFixedChild(this.pauseBtn);
            this.pauseBtn.touchEnabled = true;
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGamePauseScene, this);
        };
        MainGameScene.prototype.drawGiftBtn = function () {
            this.giftBtn = CommonUtils.BitmapUtils.createBitmapByName("礼包_png");
            this.giftBtn.x = 592;
            this.giftBtn.y = 767;
            this.addFixedChild(this.giftBtn);
            this.pauseBtn.touchEnabled = true;
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, this);
        };
        MainGameScene.prototype.drawGameOverScene = function () {
            this.gameOverScene = new GameScene.GameOverScene(this);
            this.addFixedChild(this.gameOverScene);
            this.setChildIndex(this.gameOverScene, 100);
            this.gameOverScene.visible = false;
        };
        MainGameScene.prototype.drawGamePasueScene = function () {
            this.gamePasueScene = new GameScene.GamePauseScene(this);
            this.addFixedChild(this.gamePasueScene);
            this.setChildIndex(this.gamePasueScene, 101);
            this.gamePasueScene.visible = false;
        };
        MainGameScene.prototype.setScoreTextWithLines = function (num) {
            this.score += MainGameScene.scoreSettings[num - 1];
            this.scoreText.text = CommonUtils.NumberUtils.formatNumber(this.score);
            this.scoreText.x = this.scoreBg.x + (this.scoreBg.x - this.scoreIcon.x) + (this.scoreBg.width - this.scoreText.width) / 2;
            this.scoreText.y = this.scoreBg.y + (this.scoreBg.height - this.scoreText.height) / 2;
        };
        MainGameScene.prototype.showGameOverScene = function () {
            this.gameOverScene.setScore(this.score, 2000);
            this.gameOverScene.visible = true;
        };
        MainGameScene.prototype.showGamePauseScene = function () {
            this.gamePasueScene.visible = true;
            this.brickContainer.pause();
            this.gameTimer.stop();
        };
        MainGameScene.prototype.resume = function () {
            this.brickContainer.resume();
            this.gameTimer.start();
        };
        MainGameScene.prototype.reStartGame = function () {
            this.brickContainer.reStartGame();
            this.resetProgressView();
        };
        MainGameScene.prototype.tryAgainGame = function () {
            this.brickContainer.tryAgainGame();
            this.resetProgressView();
        };
        MainGameScene.prototype.resurgence = function () {
            this.brickContainer.resurgence();
            this.resetProgressView();
            this.gameOverScene.visible = false;
        };
        MainGameScene.scoreSettings = [100, 300, 700, 1000];
        MainGameScene.rows = [-5, -3, -3, -3, -4, -4, -3];
        MainGameScene.cols = [3, 3, 3, 3, 4, 3, 4];
        return MainGameScene;
    }(RootScene));
    GameScene.MainGameScene = MainGameScene;
    __reflect(MainGameScene.prototype, "GameScene.MainGameScene");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=MainGameScene.js.map