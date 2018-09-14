module CustomUI {
	export class TopBowUILeft extends BaseBodyUI {
		public constructor() {
			super();
			let selfAngle = Math.PI / 13;
			let length = (CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding * 2) / 2;
			let stageLength = CommonUtils.CoordinateUtils.worldLengthToStage(length);
			let bodyShape = new p2.Line({length:length});
			this.addShape(bodyShape);
			bodyShape.angle = - selfAngle;
			bodyShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
			bodyShape.material = new p2.Material(Model.MaterialType.Wall);
			this.baseDisplay = new egret.Sprite();
			let shp = CommonUtils.BitmapUtils.createBitmapByName("topbow_left_png");
			shp.width *= CommonUtils.StageUtils.getStageScale();
			shp.height *= CommonUtils.StageUtils.getStageScale();
			shp.x = - stageLength / 2 - CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.WallSetting.WallWeight);
			shp.y = - CommonUtils.CoordinateUtils.worldLengthToStage(length * Math.sin(selfAngle)) / 2;
			this.baseDisplay.addChild(shp);
		}
	}
	export class TopBowUIRight extends BaseBodyUI {
		public constructor() {
			super();
			let selfAngle = Math.PI / 13;
			let length = (CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding * 2) / 2;
			let stageLength = CommonUtils.CoordinateUtils.worldLengthToStage(length);
			let bodyShape = new p2.Line({length:length});
			this.addShape(bodyShape);
			bodyShape.angle = selfAngle;
			bodyShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
			bodyShape.material = new p2.Material(Model.MaterialType.Wall);
			this.baseDisplay = new egret.Sprite();
			let shp = CommonUtils.BitmapUtils.createBitmapByName("topbow_right_png");
			shp.width *= CommonUtils.StageUtils.getStageScale();
			shp.height *= CommonUtils.StageUtils.getStageScale();
			shp.x = - stageLength / 2 + CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.WallSetting.WallWeight) * 2.5;
			shp.y = - CommonUtils.CoordinateUtils.worldLengthToStage(length * Math.sin(selfAngle)) / 2;
			this.baseDisplay.addChild(shp);
		}
	}
}