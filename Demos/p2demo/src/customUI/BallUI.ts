module CustomUI {
	export class BallUI extends BaseBodyUI {
		private radius:number;
		private power:number;
		private roundShape:p2.Shape;
		public state:Model.BallState;
		public constructor(power:number,state?:Model.BallState) {
			super();
			this.power = power;
			this.mass = GameSetting.BallSetting.BallMass;
			this.type = p2.Body.DYNAMIC;	
			this.radius = GameSetting.BallSetting.Radius[power];
			this.roundShape = new p2.Circle(this.radius);
			this.addShape(this.roundShape);
			this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
			this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK | GameSetting.CollisionGroupSetting.GROUND | GameSetting.CollisionGroupSetting.WALL;

			this.baseDisplay = new egret.Sprite();
			this.baseDisplay.graphics.beginFill(0xFFFFFF);
			this.baseDisplay.graphics.drawCircle(0,0, Tool.CoordinateTool.worldLengthToStage(this.radius));
			this.baseDisplay.graphics.endFill();
			this.displays = [this.baseDisplay];
			if(state)
				this.state = state;
			else
				this.state = Model.BallState.ReadyToFire;
		}
		public showDisplay(container:egret.DisplayObjectContainer){
            if(!container.contains(this.baseDisplay))
				container.addChild(this.baseDisplay);
			if(this.type == p2.Body.DYNAMIC){
				let stagePosition = Tool.CoordinateTool.worldPositionToStage({X:this.position[0],Y:this.position[1]});
				this.baseDisplay.x = stagePosition.X;
				this.baseDisplay.y = stagePosition.Y;
			}
		}
		public setPowerful(){
			this.power = 2;
			this.radius = GameSetting.BallSetting.Radius[this.power];
			this.roundShape = new p2.Circle(this.radius);
			this.baseDisplay.graphics.clear();
			this.baseDisplay.graphics.beginFill(0xFFFFFF);
			this.baseDisplay.graphics.drawCircle(0,0, Tool.CoordinateTool.worldLengthToStage(this.radius));
			this.baseDisplay.graphics.endFill();
		}
		public getPower(){
			return this.power;
		}
		public readyToFire():void{
			this.state = Model.BallState.ReadyToFire;
			this.baseDisplay.graphics.clear();
			this.baseDisplay.graphics.beginFill(0xFFFFFF);
			this.baseDisplay.graphics.drawCircle(0,0, Tool.CoordinateTool.worldLengthToStage(this.radius));
			this.baseDisplay.graphics.endFill();
		}
		public moveToTop(container:egret.DisplayObjectContainer,gameWorld:GameWorld){
			let self = this;
			if(self.type == p2.Body.KINEMATIC)
				return;
			self.state = Model.BallState.MovingToTop;
			self.type = p2.Body.KINEMATIC;
			self.baseDisplay.graphics.clear();
			this.baseDisplay.graphics.beginFill(0xFFA000);
			this.baseDisplay.graphics.drawCircle(0,0, Tool.CoordinateTool.worldLengthToStage(this.radius));
			this.baseDisplay.graphics.endFill();
			let backWay:Model.Position[] = [];
			if(self.position[0] <= GameSetting.PhysicalSetting.WorldWidth / 2){
				backWay = GameSetting.BallSetting.LeftBackWay;
			}else{
				backWay = GameSetting.BallSetting.RightBackWay;
			}

			let stagePos0 = Tool.CoordinateTool.worldPositionToStage({X:backWay[0].X,Y:backWay[0].Y});
			let stagePos1 = Tool.CoordinateTool.worldPositionToStage({X:backWay[1].X,Y:backWay[1].Y});
			let stagePos2 = Tool.CoordinateTool.worldPositionToStage({X:backWay[2].X,Y:backWay[2].Y});
			self.velocity = [0,0];
			self.force = [0,0];
			self.velocity = [0,0];
			egret.Tween.get(self.baseDisplay)
				.to({x:stagePos0.X,y:stagePos0.Y},300)
				.to({x:stagePos1.X,y:stagePos1.Y},600)
				.to({x:stagePos2.X,y:stagePos2.Y},50)
				.wait(100)
				.call(()=>{
					let worldPos = Tool.CoordinateTool.stagePositionToWorld({X:self.baseDisplay.x,Y:self.baseDisplay.y});
					self.type = p2.Body.DYNAMIC;
					self.position =[worldPos.X,worldPos.Y];
					self.velocity = [0,0.5];
					self.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK 
						| GameSetting.CollisionGroupSetting.GROUND 
						| GameSetting.CollisionGroupSetting.WALL
						| GameSetting.CollisionGroupSetting.BALL;
					self.state = Model.BallState.ReadyToFire;
					gameWorld.readyToFire();
				});
		}
		public addRandomSpeed():void{
			if(this.state != Model.BallState.Fired)
				return;
			if(Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]) < 3){
				if(this.velocity[0] > 0){
					this.velocity[0] += Math.random() * GameSetting.PhysicalSetting.CollisionSeed;
				}else{
					this.velocity[0] -= Math.random() * GameSetting.PhysicalSetting.CollisionSeed;
				}
				if(this.velocity[1] > 0){
					this.velocity[1] += Math.random() * GameSetting.PhysicalSetting.CollisionSeed;
				}else{
					this.velocity[1] -= Math.random() * GameSetting.PhysicalSetting.CollisionSeed;
				}
			}			
		}

	}
}