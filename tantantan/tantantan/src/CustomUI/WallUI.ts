module CustomUI {
	export class WallUI extends BaseBodyUI {
		public constructor(width:number,height:number) {
			super();
			this.mass = 1;
			let wallShape:p2.Shape = new p2.Plane();
			this.addShape(wallShape);
			wallShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
			wallShape.material = new p2.Material(Model.MaterialType.Wall);
			this.baseDisplay = new egret.Sprite();
			this.baseDisplay.graphics.beginFill(0x4b5277);
			this.baseDisplay.graphics.drawRect(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage( width ), CommonUtils.CoordinateUtils.worldLengthToStage( height ));
			this.baseDisplay.graphics.endFill();
			this.displays = [this.baseDisplay];	
		}
		public hittedByBall(ball:BallUI,container:egret.DisplayObjectContainer):void{
			ball.addRandomSpeed();
		}
	}
}