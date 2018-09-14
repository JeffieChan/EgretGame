module GameScene {
	export class NextPlayerPanel extends egret.Sprite {
		private bitmap: egret.Bitmap;
		private currentPlayer: egret.Bitmap;
		private renderTexture: egret.RenderTexture;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		private onAddToStage(event: egret.Event): void {

			const platform: any = window.platform;
			this.bitmap = platform.openDataContext.createDisplayObject();
			this.currentPlayer = new egret.Bitmap();
			this.renderTexture = new egret.RenderTexture();
			this.currentPlayer.texture = this.renderTexture;
			this.addChild(this.currentPlayer);

		}
		public refreshCurrentScore(forceRefresh: boolean) {
			const platform: any = window.platform;
			if(CommonUtils.GameUtils.wxDataProgress != Model.WxDataProgress.endLoadSelf && CommonUtils.GameUtils.wxDataProgress != Model.WxDataProgress.unStart){
				return;
			}
			egret.Tween.get(this)
				.call(() => {
					platform.openDataContext.getNextPlayer(CommonUtils.GameUtils.currentScore);
				})
				.wait(2000)
				.call(() => {
					this.renderTexture.drawToTexture(this.bitmap);
					this.visible = true;
				});
		}
	}
}