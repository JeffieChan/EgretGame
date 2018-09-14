module CustomUI {
	export class RoundBrickUI extends BrickUI {
		private radius:number = 1;
		public constructor(life:number) {
			super(life,0);
		}
		protected buildShapeAndDisplay():void{
			this.shape = new p2.Circle(GameSetting.BrickSetting.Radius);
			this.addShape(this.shape);
			this.baseDisplay = new egret.Sprite();
			this.displayBg = new egret.Shape();
			this.displayBg.graphics.beginFill(this.buildColorForLife());
			this.displayBg.graphics.drawCircle(0,0,Tool.CoordinateTool.worldLengthToStage( GameSetting.BrickSetting.Radius ));
			this.displayBg.graphics.endFill();
			this.baseDisplay.addChild(this.displayBg);
			this.displays = [this.baseDisplay];
		}
		protected redrawBg():void{
			this.displayBg.graphics.clear();
			this.displayBg.graphics.beginFill(this.buildColorForLife());
			this.displayBg.graphics.drawCircle(0,0,Tool.CoordinateTool.worldLengthToStage( GameSetting.BrickSetting.Radius ));
			this.displayBg.graphics.endFill();
		}
		
	}
}