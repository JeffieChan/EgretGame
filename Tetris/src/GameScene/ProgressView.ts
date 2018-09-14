module GameScene {
	export class ProgressView extends RootScene {
		private progressViewBg: egret.Bitmap;
		private progressBitmap: egret.Bitmap;
		private progressView:egret.Bitmap;
		private progressLogo: egret.Bitmap;
		private renderTexture: egret.RenderTexture;
		private viewLength:number;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage() {
			this.drawBg();
			this.drawProgressView();
			this.drawProgressLogo();

		}
		private drawBg() {
			this.progressViewBg = CommonUtils.BitmapUtils.createBitmapByName("进度条1_png");
			this.addChild(this.progressViewBg);
		}
		private drawProgressView() {
			this.progressBitmap = CommonUtils.BitmapUtils.createBitmapByName("进度条2_png");
			this.renderTexture = new egret.RenderTexture();
			this.renderTexture.drawToTexture(this.progressBitmap, new egret.Rectangle(0, 0, 0, this.progressBitmap.height));

			this.progressView = new egret.Bitmap(this.renderTexture);
			this.addChild(this.progressView);
			this.progressView.x = 5;
			this.progressView.y = 4;
			
		}
		private drawProgressLogo(){
			this.progressLogo = CommonUtils.BitmapUtils.createBitmapByName("搞怪方块_png");
			this.progressLogo.x = -this.progressLogo.width/4;
			this.progressLogo.y = (this.progressViewBg.height - this.progressLogo.height)/2;
			this.addChild(this.progressLogo);
		}

		public getViewLength():number{
			return this.progressBitmap.width;
		}

		public setProgress(progress:number) {
			this.renderTexture.drawToTexture(this.progressBitmap, new egret.Rectangle(0, 0, progress, this.progressBitmap.height));
			this.progressView = new egret.Bitmap(this.renderTexture);
			this.progressLogo.x = this.progressView.x+this.progressView.width-this.progressLogo.width/4;
		}
	}
}