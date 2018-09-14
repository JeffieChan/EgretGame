module CustomUI {
	export class TopBowUI extends BaseBodyUI {
		public constructor() {
			super();
			let length = (GameSetting.PhysicalSetting.WorldWidth - GameSetting.WallSetting.WallPadding * 2) / 2;
			let stageLength = Tool.CoordinateTool.worldLengthToStage(length);
			let bodyShape = new p2.Line(length);
			this.addShape(bodyShape);
			bodyShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;

			this.baseDisplay = new egret.Sprite();
			let shp = new egret.Shape();
			shp.graphics.lineStyle(5,0x000000);
			shp.graphics.moveTo(- stageLength / 2,0);
			shp.graphics.lineTo(stageLength / 2,0);
			this.baseDisplay.addChild(shp);
		}
	}
}