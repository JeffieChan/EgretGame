module CustomUI {
	export class GroundUI extends BaseBodyUI{
		public constructor() {
			super();
			this.mass = 0;
			let height:number = 1;
			let groundShape:p2.Shape = new p2.Plane();
			this.addShape(groundShape);
			groundShape.collisionGroup = GameSetting.CollisionGroupSetting.GROUND;
			this.baseDisplay = new egret.Sprite();
			let shp:egret.Shape = new egret.Shape();
			shp.graphics.beginFill(0x000000);
			shp.graphics.drawRect(0, 0,Tool.CoordinateTool.worldLengthToStage(GameSetting.PhysicalSetting.WorldWidth), Tool.CoordinateTool.worldLengthToStage(height));
			shp.graphics.endFill();
			this.baseDisplay.addChild(shp);
			this.displays = [this.baseDisplay];	
		}
	}
}