module CustomUI {
	export class SplitBallStuffUI extends StuffUI {
		protected buildShapeAndDisplay():void{
			let stageRadius = CommonUtils.CoordinateUtils.worldLengthToStage(this.radius);
			this.shape = new p2.Circle({radius:this.radius});
			this.addShape(this.shape);
			this.baseDisplay = new egret.Sprite();
			let bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_split_png");
			bitmap.width = stageRadius * 2;
			bitmap.height = stageRadius * 2;
			bitmap.anchorOffsetX = stageRadius;
			bitmap.anchorOffsetY = stageRadius;
			this.baseDisplay.addChild(bitmap);
		}
		public hittedByBall(ball:BallUI,cannon:CannonUI,container:egret.DisplayObjectContainer):void{
			let position = [ball.position[0] + (Math.random() - 0.5) * this.radius,ball.position[1] + (Math.random() - 0.5) * this.radius];
			CommonUtils.GameUtils.increaseFireDamage(this.clientId,ball.getPower());
			this.increaseBall(position,cannon,container);
		}
		public hittedByLaser(ball:LaserBallUI,cannon:CannonUI,container:egret.DisplayObjectContainer):void{
			CommonUtils.GameUtils.increaseFireDamage(this.clientId,1);
			this.destory(container);
		}
		private increaseBall(position:any,cannon:CannonUI,container:egret.DisplayObjectContainer):void{

			let newBall:BallUI = new BallUI(1,Model.BallState.Fired);
			newBall.position = position;
			newBall.velocity = [(Math.random() - 0.5) * 3,(Math.random() - 0.5) * 3];
			cannon.increaseBall(newBall,container,<GamePhysics.GameWorld>this.world);
			this.destory(container);

		}
	}
}