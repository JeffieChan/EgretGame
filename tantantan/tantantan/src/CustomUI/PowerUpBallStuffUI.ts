module CustomUI {
	export class PowerUpBallStuffUI extends StuffUI {
		protected buildShapeAndDisplay():void{
			let stageRadius = CommonUtils.CoordinateUtils.worldLengthToStage(this.radius);
			this.shape = new p2.Circle({radius:this.radius});
			this.addShape(this.shape);
			this.baseDisplay = new egret.Sprite();
			let bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_power_up_png");
			bitmap.width = stageRadius * 2;
			bitmap.height = stageRadius * 2;
			bitmap.anchorOffsetX = stageRadius;
			bitmap.anchorOffsetY = stageRadius;
			this.baseDisplay.addChild(bitmap);
		}
		public hittedByBall(ball:BallUI,cannon:CannonUI,container:egret.DisplayObjectContainer):void{
			CommonUtils.GameUtils.increaseFireDamage(this.clientId,ball.getPower());
			if(ball.getPower() == 2){
				let newBall:BallUI = new BallUI(1,Model.BallState.Fired);
				newBall.position = [ball.position[0] + (Math.random() - 0.5) * this.radius,ball.position[1] + (Math.random() - 0.5) * this.radius];
				newBall.velocity = [(Math.random() - 0.5) * 2,(Math.random() - 0.5) * 2];
				cannon.increaseBall(newBall,container,<GamePhysics.GameWorld>this.world);			
			}else{
				ball.setPowerful();
			}
			this.destory(container);
		}
		public hittedByLaser(ball:LaserBallUI,cannon:CannonUI,container:egret.DisplayObjectContainer):void{
			CommonUtils.GameUtils.increaseFireDamage(this.clientId,1);
			this.destory(container);
		}
	}
}