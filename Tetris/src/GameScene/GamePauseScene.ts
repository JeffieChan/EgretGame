module GameScene {
	export class GamePauseScene extends RootScene {
		private bg: egret.Sprite;
		private mainScene: MainGameScene
		private overBtn: egret.Bitmap;
		private reStartBtn: egret.Bitmap;
		private resumeBtn: egret.Bitmap;

		public constructor(mainScene: MainGameScene) {
			super();
			this.mainScene = mainScene;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		private onAddToStage() {
			this.drawBg();
		}
		private drawBg() {
			this.bg = new egret.Sprite();
			this.bg.graphics.beginFill(0, 0.8);
			this.bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
			this.bg.graphics.endFill();
			this.addChild(this.bg);
			this.drawBtn();
			this.registEvents();
		}

		private drawBtn() {
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
		}
		private registEvents() {
			this.overBtn.touchEnabled = true;
			this.reStartBtn.touchEnabled = true;
			this.resumeBtn.touchEnabled = true;

			this.overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				this.mainScene.visible = false;
				this.visible = false;
				this.mainScene.loadScene.visible = true;
			}, this);
			this.reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				this.visible = false;
				this.mainScene.reStartGame();
			}, this);
			this.resumeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				this.visible = false;
				this.mainScene.resume();
			 }, this);


		}
	}
}