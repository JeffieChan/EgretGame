module GameScene {
	export class RatePanel extends MaskPanel {
		public closeHandle: Function;
		private rateClose: any;
		private rateBitmap: egret.Bitmap;
		private bmpFriends: egret.Bitmap;
		private bmpSelf: egret.Bitmap;
		private friendCount: number = 15;
		private refreshing:boolean = false;
		private scrollView: egret.ScrollView;
		public constructor() {
			super();
			this.maskAlpha = 0;
		}

		protected drawPanel(): void {
			this.rateClose = CommonUtils.BitmapUtils.createBitmapByName("btn_back_png");
			this.addChild(this.rateClose);
			this.rateClose.scaleX = CommonUtils.StageUtils.getStageScale();
			this.rateClose.scaleY = CommonUtils.StageUtils.getStageScale();
			this.rateClose.x = 30 * CommonUtils.StageUtils.getStageScale();
			this.rateClose.y = 30 * CommonUtils.StageUtils.getStageScale();
			this.rateClose.touchEnabled = true;
			let self = this;
			this.rateClose.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
				if (this.closeHandle)
					this.closeHandle();
			}, this);

			let title = CommonUtils.BitmapUtils.createBitmapByName("panel_title_rate_png");
			title.scaleX = CommonUtils.StageUtils.getStageScale();
			title.scaleY = CommonUtils.StageUtils.getStageScale();
			title.x = (this.stage.stageWidth - title.width * CommonUtils.StageUtils.getStageScale()) / 2;
			title.y = 140 * CommonUtils.StageUtils.getStageScale();
			this.addChild(title);


			let listBg = new egret.Shape();
			this.addChild(listBg);
			listBg.y = title.y + (title.height + 180) * CommonUtils.StageUtils.getStageScale();
			listBg.graphics.beginFill(0x2c2c40);
			listBg.graphics.drawRoundRect(0,0,650 * CommonUtils.StageUtils.getStageScale(), (this.stage.stageHeight - listBg.y - 72 * CommonUtils.StageUtils.getStageScale()), 28 * CommonUtils.StageUtils.getStageScale(), 28 * CommonUtils.StageUtils.getStageScale());
			listBg.graphics.endFill();
			listBg.x = (this.stage.stageWidth - listBg.width) / 2;

			this.bmpSelf = new egret.Bitmap();
			this.addChild(this.bmpSelf);
			this.bmpSelf.x = 55 * CommonUtils.StageUtils.getStageScale();
			this.bmpSelf.y = title.y + title.height * CommonUtils.StageUtils.getStageScale() + 3 * CommonUtils.StageUtils.getStageScale();
			this.bmpSelf.width = 750 * CommonUtils.StageUtils.getStageScale();
			this.bmpSelf.height = 140 * this.friendCount * CommonUtils.StageUtils.getStageScale();
			
			this.bmpFriends = new egret.Bitmap();
			this.addChild(this.bmpFriends);
			this.scrollView = new egret.ScrollView();
			this.addChild(this.scrollView);
			this.scrollView.setContent(this.bmpFriends);
			this.scrollView.x = 58 * CommonUtils.StageUtils.getStageScale();
			this.scrollView.y = title.y + (title.height + 190) * CommonUtils.StageUtils.getStageScale();
			this.scrollView.width = this.stage.stageWidth;
			this.scrollView.height = this.stage.stageHeight - this.scrollView.y - 100 * CommonUtils.StageUtils.getStageScale();
			this.scrollView.scrollTop = 0;
			this.scrollView.horizontalScrollPolicy = "off";
			this.bmpFriends.width = 750 * CommonUtils.StageUtils.getStageScale();
			this.bmpFriends.height = 140 * this.friendCount * CommonUtils.StageUtils.getStageScale();
		}
		public refreshRate(): void {
			if(this.refreshing){
				return;
			}
			this.refreshing = true;
			const platform: any = window.platform;
			egret.Tween.get(this)
				.call(()=>{platform.openDataContext.clearBitmap();})
				.wait(100)
				.call(() => {
					this.rateBitmap = platform.openDataContext.createDisplayObject();
					platform.openDataContext.getFriendsRate();
				})
				.wait(2000)
				.call(() => {
					var renderTexture: egret.RenderTexture = new egret.RenderTexture();
					renderTexture.drawToTexture(this.rateBitmap);
					this.bmpFriends.texture = renderTexture;
				})
				.call(() => {
					platform.openDataContext.getSelfRate();
				})
				.wait(1000)
				.call(() => {
					var renderTexture: egret.RenderTexture = new egret.RenderTexture();
					renderTexture.drawToTexture(this.rateBitmap);
					this.bmpSelf.texture = renderTexture;
					this.scrollView.scrollTop = 0;
					this.refreshing = false;
				});
		}
	}
}