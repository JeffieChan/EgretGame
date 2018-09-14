module GameScene {
	export class LoadScene extends RootScene {
		private bg: egret.Bitmap;
		private startBtn: GameScene.IconUI;
		private rankingListBtn: GameScene.IconUI;
		private scoreBtn: GameScene.IconUI;
		private giftBtn: GameScene.IconUI;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}


		private onAddToStage() {
			console.log(Settings.GameSettingUtils.gameSetting.startBtn);
			this.drawBg();
			this.drawLogo();
			this.drawStartBtn();
			this.drawRankingListBtn();
			this.drawScoreBtn();
			this.drawGiftBtn();
			this.registEvents();

		}

		private drawBg() {
			this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
			this.addFixedChild(this.bg);
		}
		private drawLogo() {
			var logo: egret.Bitmap = CommonUtils.BitmapUtils.createBitmapByName("图标_png");
			logo.x = 42;
			logo.y = 172;
			this.addFixedChild(logo);


		}
		private drawStartBtn() {
			this.startBtn = new IconUI(Settings.GameSettingUtils.gameSetting.startBtn);
			this.addFixedChild(this.startBtn);
		

		}
		private drawRankingListBtn() {
			this.rankingListBtn = new IconUI(Settings.GameSettingUtils.gameSetting.rankingListBtn);
			this.addFixedChild(this.rankingListBtn);
		}
		private drawScoreBtn() {
			this.scoreBtn = new IconUI(Settings.GameSettingUtils.gameSetting.scoreBtn);
			this.addFixedChild(this.scoreBtn);
		}
		private drawGiftBtn() {
			this.giftBtn = new IconUI(Settings.GameSettingUtils.gameSetting.giftBtn);
			this.addFixedChild(this.giftBtn);
		}


		private registEvents() {

			this.startBtn.touchEnabled = true;
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				//TODU:点击开始跳转主游戏页面
				console.log("点击开始");
				this.visible = false;
				var mainGameScene = new MainGameScene(this);
				this.stage.addChild(mainGameScene);

			}, this);
			this.rankingListBtn.touchEnabled = true;
			this.rankingListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				//TODU:跳转排行榜页面
				console.log("排行榜");

			}, this);
			this.scoreBtn.touchEnabled = true;
			this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				//TODU:跳转成绩页面
				console.log("成绩");

			}, this);
			this.giftBtn.touchEnabled = true;
			this.giftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				//TODU:跳转礼包页面
				console.log("礼包");

			}, this);
		}

	}
}