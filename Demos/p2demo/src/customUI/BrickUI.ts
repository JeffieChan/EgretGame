module CustomUI {
	export abstract class BrickUI extends BaseBodyUI{
		protected life:number;
		protected displayBg:egret.Shape;
		protected shape:p2.Shape;
		protected edgeCount:number;
		private txtLife:egret.TextField;
		public constructor(life:number,edgeCount:number) {
			super();
			this.mass = 0;
			this.type = p2.Body.STATIC;
			this.life = life;
			this.edgeCount = edgeCount;
			this.buildShapeAndDisplay();
			this.angle = Math.random() * Math.PI;
			this.shape.collisionGroup = GameSetting.CollisionGroupSetting.GROUND;
			this.txtLife = new egret.TextField();
			this.txtLife.textColor = 0x000000;
			this.txtLife.width = Tool.CoordinateTool.worldLengthToStage(GameSetting.BrickSetting.Radius * 2);
			this.txtLife.height = Tool.CoordinateTool.worldLengthToStage(GameSetting.BrickSetting.Radius * 2);
			this.txtLife.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.txtLife.textAlign = egret.HorizontalAlign.CENTER;
			this.txtLife.size = 18;
			this.txtLife.textColor = 0xffffff;
			this.txtLife.anchorOffsetX = Tool.CoordinateTool.worldLengthToStage(GameSetting.BrickSetting.Radius);
			this.txtLife.anchorOffsetY = Tool.CoordinateTool.worldLengthToStage(GameSetting.BrickSetting.Radius);
			this.baseDisplay.addChild(this.txtLife);
			this.txtLife.rotation = 180 *(this.angle / Math.PI);
			this.showLife();
		}
		private destory(container:egret.DisplayObjectContainer):void{
			let x = this.baseDisplay.x;
			let y = this.baseDisplay.y;
            if(container.contains(this.baseDisplay)){
				container.removeChild(this.baseDisplay);
			}
			if(this.world)
				this.world.removeBody(this);
			for(let i = 0; i < 10 ; i++){
				let ds = new egret.Shape();
				ds.graphics.beginFill(0xFFA000);
				ds.graphics.drawRect(0,0,10,10);
				ds.x = x;
				ds.y = y;				
				container.addChild(ds);
				egret.Tween.get(ds).to({x: ds.x + (Math.random() - 0.5) * 150,y: ds.y + (Math.random() - 0.5) * 150,scaleX:0,scaleY:0,alpha:0,rotation:Math.random() * 360},300).call(()=>{if(container.contains(ds)){container.removeChild(ds);}});

			}
		}
		public hittedByBall(ball:BallUI,container:egret.DisplayObjectContainer):void{
			this.life -= ball.getPower();
			if(this.life <= 0)
				this.destory(container);
			ball.addRandomSpeed();			
			this.redrawBg();
			this.showLife();
		}
		protected abstract buildShapeAndDisplay():void;
		protected abstract redrawBg():void;
		protected buildColorForLife():number{
			return GameSetting.BrickSetting.getColorForLife(this.life);
		}
		private showLife():void{
			this.txtLife.text = this.life.toString();
		}
	}
}