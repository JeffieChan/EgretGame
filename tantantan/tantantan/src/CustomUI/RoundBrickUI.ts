module CustomUI {
	export class RoundBrickUI extends BrickUI {
		private static readonly radiusScale:number = 0.9;
		private mc:egret.MovieClip;
		public constructor(life:number) {
			super(life,0);
		}
		protected buildShapeAndDisplay():void{
			this.shape = new p2.Circle({radius:(GameSetting.BrickSetting.Radius * RoundBrickUI.radiusScale)});
			this.addShape(this.shape);
			let mcTexture = RES.getRes("roundbrick_png");
			let mcData = RES.getRes("roundbrick_json");
			let loadingDataFactory = new egret.MovieClipDataFactory(mcData,mcTexture);
			this.mc = new egret.MovieClip(loadingDataFactory.generateMovieClipData("roundbrick"));
			this.mc.scaleX =  CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * RoundBrickUI.radiusScale * 2) / this.mc.width ;
			this.mc.scaleY =  CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * RoundBrickUI.radiusScale * 2) / this.mc.width ;
			this.mc.anchorOffsetX = this.mc.width / 2;
			this.mc.anchorOffsetY = this.mc.width / 2;
			this.baseDisplay = new egret.Sprite();
			this.baseDisplay.addChild(this.mc);
			this.mc.gotoAndStop(this.life);
			this.displays = [this.baseDisplay];
		}
		protected redrawBg():void{
			this.mc.gotoAndStop(this.life);
		}
		
	}
}