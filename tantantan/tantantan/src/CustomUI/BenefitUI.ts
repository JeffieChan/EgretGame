module CustomUI {
	export class BenefitUI extends StuffUI {
		public hitted:boolean;
		protected buildShapeAndDisplay():void{
			let stageRadius = CommonUtils.CoordinateUtils.worldLengthToStage(this.radius);
			this.shape = new p2.Circle({radius:this.radius});
			this.addShape(this.shape);
			this.baseDisplay = new egret.Sprite();
			let bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_benefit_png");
			bitmap.width = stageRadius * 2;
			bitmap.height = stageRadius * 2;
			bitmap.anchorOffsetX = stageRadius;
			bitmap.anchorOffsetY = stageRadius;
			this.baseDisplay.addChild(bitmap);
			this.hitted = false;
		}
		public hittedByBall(ball:BallUI,cannon:CannonUI,container:any):void{
			CommonUtils.GameUtils.increaseFireDamage(this.clientId,1);
			container.openBenefitBox(this.clientId,this);
		}
		public hittedByLaser(ball:LaserBallUI,cannon:CannonUI,container:any):void{
			CommonUtils.GameUtils.increaseFireDamage(this.clientId,1);
			container.openBenefitBox(this.clientId,this);
		}
	}
}