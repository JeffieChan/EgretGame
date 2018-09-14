module GameScene {
	export class SurpassView extends RootScene{
		private bg:egret.Bitmap;
		private headImg:egret.Bitmap;
		private userName:egret.TextField;
		private scoreTxt:egret.TextField;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
		}
		private onAddToStage() {
			this.drawBg();
		}
		private drawBg() {
			this.bg = CommonUtils.BitmapUtils.createBitmapByName("即将超越_png");
			this.addChild(this.bg);

			var text = new egret.TextField;
			text.fontFamily = "PingFang-SC-Medium";
			text.size = 20;
			text.textColor = 0xffffff;
			text.textAlign = "center";
			text.text = "即将超越";
			text.x = 20;
			text.y = 17;
			this.addFixedChild(text);
		}
		
	}
}