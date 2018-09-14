module GameScene {
	export class MainGameScene extends RootScene {
		private static scoreSettings: number[] = [100, 300, 700, 1000];
		private static rows: number[] = [-5, -3, -3, -3, -4, -4, -3];
		public static cols:number[] = [3,3,3,3,4,3,4]
		private bg: egret.Bitmap;
		private scoreText: egret.TextField;
		private scoreBg: egret.Bitmap;
		private scoreIcon: egret.Bitmap;
		private progressView: GameScene.ProgressView;

		private brickContainer: BrickContainer;
		public gameTimer: egret.Timer;
		private progressViewLength: number = 0;
		private leftBtn: egret.Bitmap;
		private rightBtn: egret.Bitmap;
		private downBtn: egret.Bitmap;
		private turnBtn: egret.Bitmap;
		private downBottomBtn: egret.Bitmap;
		private pauseBtn: egret.Bitmap;
		private giftBtn: egret.Bitmap;
		private prevueArea: PrevueArea;
		private surpassView: SurpassView;
		private gameOverScene: GameOverScene;
		private gamePasueScene: GamePauseScene;
		private score: number = 0;
		public loadScene: LoadScene;

		private dataArr: Array<any>;
		public constructor(loadScene: LoadScene) {
			super();
			this.loadScene = loadScene
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		private onAddToStage() {
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
		}
		private drawBg() {
			this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
			this.addFixedChild(this.bg);
		}
		private drawScore() {

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
		}

		private drawProgressView() {
			this.progressView = new ProgressView();
			this.progressView.x = 238;
			this.progressView.y = 49;
			this.addChild(this.progressView);
		}

		private drawPlayView() {
			var playBg = CommonUtils.BitmapUtils.createBitmapByName("主面板_png");
			playBg.x = 25;
			playBg.y = 103;
			this.addFixedChild(playBg);
		}

		private drawBrickContainer() {
			this.brickContainer = new BrickContainer(Settings.BrickSettings.rows, Settings.BrickSettings.cols, Settings.BrickSettings.cols * Settings.BrickSettings.brickWidth, Settings.BrickSettings.rows * Settings.BrickSettings.brickWidth, this)
			this.brickContainer.x = 72;
			this.brickContainer.y = 168;
			this.addFixedChild(this.brickContainer);
		}

		public addNewBrickShape() {
			let style = this.dataArr.shift();
			let newBrickShape = new BrickShape(style, 0, MainGameScene.rows[style], MainGameScene.cols[style], this.brickContainer);
			newBrickShape.onFreezeHandle = () => {
				let deleted = this.brickContainer.clearFilledLine();
				if (deleted > 0) {
					this.brickContainer.fixLinePosition();
					this.setScoreTextWithLines(deleted);//分数
				}
				this.addNewBrickShape();
			}
			this.brickContainer.addNewBrickShape(newBrickShape);
			this.prevueArea.createNextShape(this.dataArr);
		}

		public createData() {//创建形状数据
			this.dataArr = [
				[Math.floor(Math.random() * 7)]
				, [Math.floor(Math.random() * 7)]
				, [Math.floor(Math.random() * 7)]
			]

		}

		private insertLine() {
			this.brickContainer.insertLine();
			this.resetProgressView();
		}
		private resetProgressView() {

			this.progressViewLength = 0;
			this.progressView.setProgress(0);
			this.gameTimer.reset();
			this.gameTimer.start();
		}
		private onUpdatProgressView(evt: egret.TimerEvent) {
			this.progressViewLength += this.progressView.getViewLength() / 300;
			this.progressView.setProgress(this.progressViewLength);
		}

		private drawPrevueArea() {
			this.prevueArea = new PrevueArea();
			this.prevueArea.x = 577;
			this.prevueArea.y = 127;
			this.addFixedChild(this.prevueArea);

		}
		private drawSurpassView() {
			this.surpassView = new SurpassView();
			this.surpassView.x = 608;
			this.surpassView.y = 423;
			this.addFixedChild(this.surpassView);
		}

		private drawLeftBtn() {
			this.leftBtn = CommonUtils.BitmapUtils.createBitmapByName("左_png");
			this.leftBtn.x = 34;
			this.leftBtn.y = 1077;
			this.addFixedChild(this.leftBtn);
			this.leftBtn.touchEnabled = true;
			// this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.startMoveLeft, this.brickContainer);

			this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startMoveLeft, this.brickContainer);
			this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopMoveLeft, this.brickContainer);

		}
		private drawRightBtn() {
			this.rightBtn = CommonUtils.BitmapUtils.createBitmapByName("右_png");
			this.rightBtn.x = 193;
			this.rightBtn.y = 1077;
			this.addFixedChild(this.rightBtn);
			this.rightBtn.touchEnabled = true;
			this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startMoveRight, this.brickContainer);
			this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopMoveRight, this.brickContainer);

		}
		private drawDownBtn() {
			this.downBtn = CommonUtils.BitmapUtils.createBitmapByName("下_png");
			this.downBtn.x = 351;
			this.downBtn.y = 1077;
			this.addFixedChild(this.downBtn);
			this.downBtn.touchEnabled = true;
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startFastDown, this.brickContainer);
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopFastDown, this.brickContainer);
		}
		private drawTurnBtn() {
			this.turnBtn = CommonUtils.BitmapUtils.createBitmapByName("旋转_png");
			this.turnBtn.x = 589;
			this.turnBtn.y = 1155;
			this.addFixedChild(this.turnBtn);
			this.turnBtn.touchEnabled = true;
			this.turnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.turn, this.brickContainer);

		}
		private drawDownBottomBtn() {
			this.downBottomBtn = CommonUtils.BitmapUtils.createBitmapByName("加速下_png");
			this.downBottomBtn.x = 589;
			this.downBottomBtn.y = 992;
			this.addFixedChild(this.downBottomBtn);
			this.downBottomBtn.touchEnabled = true;
			this.downBottomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.moveToBottom, this.brickContainer);
		}

		private drawPauseBtn() {
			this.pauseBtn = CommonUtils.BitmapUtils.createBitmapByName("暂停_png");
			this.pauseBtn.x = 616;
			this.pauseBtn.y = 631;
			this.addFixedChild(this.pauseBtn);
			this.pauseBtn.touchEnabled = true;
			this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showGamePauseScene,this);

		}
		private drawGiftBtn() {
			this.giftBtn = CommonUtils.BitmapUtils.createBitmapByName("礼包_png");
			this.giftBtn.x = 592;
			this.giftBtn.y = 767;
			this.addFixedChild(this.giftBtn);
			this.pauseBtn.touchEnabled = true;
			this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { }, this);

		}
		private drawGameOverScene() {
			this.gameOverScene = new GameOverScene(this);
			this.addFixedChild(this.gameOverScene);
			this.setChildIndex(this.gameOverScene, 100);
			this.gameOverScene.visible = false;
		}
		private drawGamePasueScene() {
			this.gamePasueScene = new GamePauseScene(this);
			this.addFixedChild(this.gamePasueScene);
			this.setChildIndex(this.gamePasueScene, 101);
			this.gamePasueScene.visible = false;
		}

		private setScoreTextWithLines(num: number) {
			this.score += MainGameScene.scoreSettings[num - 1];
			this.scoreText.text = CommonUtils.NumberUtils.formatNumber(this.score);
			this.scoreText.x = this.scoreBg.x + (this.scoreBg.x - this.scoreIcon.x) + (this.scoreBg.width - this.scoreText.width) / 2;
			this.scoreText.y = this.scoreBg.y + (this.scoreBg.height - this.scoreText.height) / 2;

		}

		public showGameOverScene() {

			this.gameOverScene.setScore(this.score, 2000);
			this.gameOverScene.visible = true;
		}
		public showGamePauseScene() {
			this.gamePasueScene.visible = true;
			this.brickContainer.pause();
			this.gameTimer.stop();
		}
		public resume(){
			this.brickContainer.resume();
			this.gameTimer.start();
		}
		public reStartGame(){
			this.brickContainer.reStartGame();
			this.resetProgressView();
		}

		public tryAgainGame() {
			this.brickContainer.tryAgainGame();
			this.resetProgressView();

		}

		public resurgence(){//复活
			this.brickContainer.resurgence();
			this.resetProgressView();
			this.gameOverScene.visible = false;
		}


	}

}