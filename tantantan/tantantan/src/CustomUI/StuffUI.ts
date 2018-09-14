module CustomUI {
	export abstract class StuffUI extends BaseBodyUI {
		protected shape:p2.Shape;
		protected radius:number;
		public lineIndex:number;
		public rowIndex:number;
		public constructor(radius:number) {
			super();
			this.lineIndex = 0;
			this.radius = radius;
			this.buildShapeAndDisplay();
			this.mass = 0;
			this.shape.collisionGroup = GameSetting.CollisionGroupSetting.STUFF;
			this.shape.collisionResponse = false;
		}
		public onDestoried:Function;
		protected abstract buildShapeAndDisplay():void;
		public abstract hittedByBall(ball:BallUI,cannon:CannonUI,container:egret.DisplayObjectContainer):void;
		public abstract hittedByLaser(ball:LaserBallUI,cannon:CannonUI,container:egret.DisplayObjectContainer):void;
		public destory(container:egret.DisplayObjectContainer):void{
			console.log("stuff destory container is");
			console.log(container);
			if(this.onDestoried)
				this.onDestoried(this.id);
			let x = this.baseDisplay.x;
			let y = this.baseDisplay.y;
            if(container.contains(this.baseDisplay)){
				container.removeChild(this.baseDisplay);
			}
			if(this.world)
				this.world.removeBody(this);
		}
	}
}