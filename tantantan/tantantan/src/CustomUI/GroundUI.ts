module CustomUI {
	export class GroundUI extends BaseBodyUI{
		public constructor() {
			super();
			this.mass = 0;
			let groundShape:p2.Shape = new p2.Plane();
			this.addShape(groundShape);
			groundShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
			groundShape.material = new p2.Material(Model.MaterialType.Wall);
			this.baseDisplay = new egret.Sprite();
			let groundImg = CommonUtils.BitmapUtils.createBitmapByName("ground_front_png");
			this.baseDisplay.addChild(groundImg);
			groundImg.scaleX = CommonUtils.StageUtils.getStageScale();
			groundImg.scaleY = CommonUtils.StageUtils.getStageScale();
			groundImg.y = - 10 * CommonUtils.StageUtils.getStageScale();
			this.displays = [this.baseDisplay];	

		}
	}
}