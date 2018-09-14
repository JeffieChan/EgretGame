module CustomUI {
	export class WallUI extends BaseBodyUI {
		public constructor(width:number,height:number) {
			super();
			this.mass = 1;
			let wallShape:p2.Shape = new p2.Plane();
			this.addShape(wallShape);
			wallShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;

			this.baseDisplay = new egret.Sprite();
			this.baseDisplay.graphics.beginFill(0x000000);
			this.baseDisplay.graphics.drawRect(0, 0, Tool.CoordinateTool.worldLengthToStage( width ), Tool.CoordinateTool.worldLengthToStage( height ));
			this.baseDisplay.graphics.endFill();
			this.displays = [this.baseDisplay];	
		}
		public hittedByBall(ball:BallUI,container:egret.DisplayObjectContainer):void{
			ball.addRandomSpeed();
		}
	}
}