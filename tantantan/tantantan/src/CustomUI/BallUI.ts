module CustomUI {
	export class BallUI extends BaseBodyUI {
		private radius: number;
		private power: number;
		private roundShape: p2.Shape;
		public ballIndex = 0;
		public state: Model.BallState;
		private lastSpeed: number;
		private isTemp: boolean;
		private ballColor: number;
		private movingTopColor:number;
		private ballNormal:egret.Shape;
		private ballMovingTop:egret.Shape;
		public constructor(power: number, state?: Model.BallState, isTemp?: boolean) {
			super();
			this.isTemp = false;
			if (isTemp) {
				this.isTemp = isTemp;
			}
			this.ballColor = this.isTemp ? 0xEE6666 : 0xFFFFFF;
			this.movingTopColor = 0xFFA000;
			this.power = power;
			this.mass = GameSetting.BallSetting.BallMass;
			this.type = p2.Body.DYNAMIC;
			this.radius = GameSetting.BallSetting.Radius[power];
			this.roundShape = new p2.Circle({ radius: this.radius });
			this.addShape(this.roundShape);
			this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
			this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
				| GameSetting.CollisionGroupSetting.WALL
				| GameSetting.CollisionGroupSetting.STUFF;
			if (state == Model.BallState.ReadyToFire) {
				this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
					| GameSetting.CollisionGroupSetting.WALL
					| GameSetting.CollisionGroupSetting.STUFF
			}
			this.setMaterial(Model.MaterialType.Ball);

			this.baseDisplay = new egret.Sprite();
			this.ballNormal = new egret.Shape()
			this.ballNormal.graphics.beginFill(this.ballColor);
			this.ballNormal.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.radius));
			this.ballNormal.graphics.endFill();
			this.baseDisplay.addChild(this.ballNormal);
			this.ballMovingTop = new egret.Shape()
			this.ballMovingTop.graphics.beginFill(this.movingTopColor);
			this.ballMovingTop.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.radius));
			this.ballMovingTop.graphics.endFill();
			this.baseDisplay.addChild(this.ballMovingTop);
			this.ballMovingTop.visible = false;
			this.damping = 0;
			this.displays = [this.baseDisplay];
			if (state)
				this.state = state;
			else
				this.state = Model.BallState.ReadyToFire;
			this.lastSpeed = 100;

		}
		public fire(startX: number, startY: number, xSpeed: number, ySpeed: number) {

			this.position = [startX, startY];
			this.mass = 0;
			this.velocity = [xSpeed, ySpeed];
			this.state = Model.BallState.Fired;
			this.setMaterial(Model.MaterialType.Ball);

		}
		public setMaterial(material: Model.MaterialType): void {
			this.roundShape.material = new p2.Material(material);
		}
		public showDisplay(container: egret.DisplayObjectContainer) {			
			if (!container.contains(this.baseDisplay)) {
				console.log("球体显示添加到舞台");
				console.log(container);
				container.addChild(this.baseDisplay);
				container.setChildIndex(this.baseDisplay, 2);
				this.baseDisplay.touchEnabled = false;
			}
			if (this.type == p2.Body.DYNAMIC) {
				let stagePosition = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
				this.baseDisplay.x = stagePosition.X;
				this.baseDisplay.y = stagePosition.Y;
			}
		}
		public setPowerful() {
			this.removeShape(this.roundShape);
			this.power = 2;
			this.radius = GameSetting.BallSetting.Radius[this.power];
			this.roundShape = new p2.Circle({ radius: this.radius });
			this.setMaterial(Model.MaterialType.Ball);
			this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
			this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
				| GameSetting.CollisionGroupSetting.WALL
				| GameSetting.CollisionGroupSetting.STUFF;
			this.addShape(this.roundShape);
			this.ballNormal.graphics.clear();
			this.ballNormal.graphics.beginFill(this.ballColor);
			this.ballNormal.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.radius));
			this.ballNormal.graphics.endFill();
			this.ballMovingTop.graphics.clear();
			this.ballMovingTop.graphics.beginFill(this.movingTopColor);
			this.ballMovingTop.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.radius));
			this.ballMovingTop.graphics.endFill();
		}
		public getPower() {
			return this.power;
		}
		public readyToFire(): void {
			this.state = Model.BallState.ReadyToFire;
			this.ballNormal.visible = true;
			this.ballMovingTop.visible = false;
			this.damping = 0;
		}
		public moveToTop(container: egret.DisplayObjectContainer, gameWorld: GamePhysics.GameWorld, cannon: CannonUI) {
			let self = this;
			if (self.type == p2.Body.KINEMATIC)
				return;
			this.ballIndex = CannonUI.currBallIndex;
			CannonUI.currBallIndex++;
			self.type = p2.Body.KINEMATIC;
			self.ballMovingTop.visible = true;
			self.ballNormal.visible
			let backWay: number = 0;
			if (self.position[0] <= CommonUtils.StageUtils.getWorldWidth() / 2) {
				backWay = 1;
			} else {
				backWay = -1;
			}
			let pathX = (CommonUtils.StageUtils.getWorldWidth() / 2) + backWay * (CommonUtils.StageUtils.getWorldWidth() / 2) - backWay * GameSetting.BallSetting.BallBackEdge;
			let stagePos0 = CommonUtils.CoordinateUtils.worldPositionToStage({ X: pathX, Y: self.position[1] + GameSetting.BallSetting.Radius[self.power] });
			let stagePos1 = CommonUtils.CoordinateUtils.worldPositionToStage({ X: pathX, Y: CommonUtils.StageUtils.getWorldHeight() - GameSetting.BallSetting.Radius[self.power] });
			let stagePos2 = CommonUtils.CoordinateUtils.worldPositionToStage({ X: pathX - backWay * GameSetting.BallSetting.Radius[self.power], Y: CommonUtils.StageUtils.getWorldHeight() - GameSetting.BallSetting.Radius[self.power] });
			self.velocity = [0, 0];
			self.force = [0, 0];
			egret.Tween.get(self.baseDisplay)
				.call(() => {
					self.state = Model.BallState.MovingToTop;
					gameWorld.loadNextLine();
				})
				.to({ x: stagePos0.X, y: stagePos0.Y }, 300)
				.to({ x: stagePos1.X, y: stagePos1.Y }, 600)
				.to({ x: stagePos2.X, y: stagePos2.Y }, 50)
				.call(() => {
					if (this.isTemp) {
						self.state = Model.BallState.ReadyToFire;
						console.log("摧毁临时球");
						console.log(container);
						this.destory(container);
						cannon.decreaseTempBallCount();
						gameWorld.readyToFire(true);
						return;
					}
					let worldPos = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: self.baseDisplay.x, Y: self.baseDisplay.y });
					self.setMaterial(Model.MaterialType.None);
					self.type = p2.Body.DYNAMIC;
					self.position = [worldPos.X, worldPos.Y];
					self.velocity = [0, 0.5];
					self.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
					self.state = Model.BallState.ReadyToFire;
					gameWorld.readyToFire(true);
				});
		}
		public addRandomSpeed(): void {
			if (this.state != Model.BallState.Fired)
				return;
			let speedAddX = 0.5 + Math.random() * 1;
			let speedAddY = 0.5 + Math.random() * 1.5;
			if (Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]) < 1.3 && this.velocity[1] < 0) {
				if (this.velocity[0] > 0) {
					this.velocity[0] += speedAddX;
				} else {
					this.velocity[0] -= speedAddX;
				}
				if (this.velocity[1] > 0) {
					this.velocity[1] += speedAddY;
				} else {
					this.velocity[1] -= speedAddY;
				}
			}
			this.unlockStuck();
		}
		public unlockStuck(): void {
			if (this.state != Model.BallState.Fired)
				return;
			let speed = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]);
			if (speed < 0.1 && Math.abs(speed - this.lastSpeed) < 0.01) {
				this.velocity[0] = (Math.random() - 0.5) * 2;
				this.velocity[1] = (Math.random()) * 2;
			}
			this.lastSpeed = speed;
		}
		public destory(container: egret.DisplayObjectContainer): void {
			let x = this.baseDisplay.x;
			let y = this.baseDisplay.y;
			console.log("摧毁球体的实现方法");
			console.log(container);
			console.log(this.baseDisplay.parent);
			if (container.contains(this.baseDisplay)) {
				this.baseDisplay.removeChild(this.ballNormal);
				this.baseDisplay.removeChild(this.ballMovingTop);
				container.removeChild(this.baseDisplay);
				console.log("删除球体显示");
			}
			if (this.world)
				this.world.removeBody(this);
		}

	}
}