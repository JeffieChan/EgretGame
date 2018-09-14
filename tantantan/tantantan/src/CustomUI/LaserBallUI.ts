module CustomUI {
	export class LaserBallUI extends BaseBodyUI {
		private radius: number;
		private power: number;
		private roundShape: p2.Shape;
		public onDestroy: Function;
		private dotTexture: egret.Texture;
		private dotConfig: any;
		private sys: particle.GravityParticleSystem;
		private laserLine: egret.Bitmap;
		private laserMask: egret.Shape;
		private startPosition: any;
		private drawLaser: boolean;
		private stop: boolean;
		public constructor(radius: number, power: number) {
			super();
			this.radius = radius;
			this.power = power;
			this.type = p2.Body.DYNAMIC;

			this.roundShape = new p2.Circle({ radius: this.radius });
			this.addShape(this.roundShape);
			this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
			this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
				| GameSetting.CollisionGroupSetting.WALL
				| GameSetting.CollisionGroupSetting.STUFF;
			this.setMaterial(Model.MaterialType.Ball);

			this.baseDisplay = new egret.Sprite();
			this.dotTexture = RES.getRes("laser_dot_png");
			this.dotConfig = RES.getRes("laser_json");
			this.sys = new particle.GravityParticleSystem(this.dotTexture, this.dotConfig);
			this.laserLine = CommonUtils.BitmapUtils.createBitmapByName("laser_line_png");
			this.laserMask = new egret.Shape;
			this.laserMask.graphics.lineStyle(10, 0x000000);
			this.laserLine.mask = this.laserMask;
			this.baseDisplay.addChild(this.laserMask);
			this.baseDisplay.addChild(this.laserLine);
			this.baseDisplay.addChild(this.sys);
			this.sys.start();
			this.damping = 0;
			this.displays = [this.baseDisplay];
			this.drawLaser = false;
			this.stop = false;
		}
		public setMaterial(material: Model.MaterialType): void {
			this.roundShape.material = new p2.Material(material);
		}
		public hide(): void {
			this.baseDisplay.visible = false;
		}
		public show(): void {
			this.baseDisplay.visible = true;
		}
		public fire(startX: number, startY: number, xSpeed: number, ySpeed: number) {

			this.position = [startX, startY];
			this.mass = 0;
			this.shapes[0].collisionGroup = GameSetting.CollisionGroupSetting.BALL;
			this.shapes[0].collisionMask = GameSetting.CollisionGroupSetting.BRICK
				| GameSetting.CollisionGroupSetting.WALL
				| GameSetting.CollisionGroupSetting.STUFF;
			this.velocity = [xSpeed, ySpeed];
			this.roundShape.material = new p2.Material(Model.MaterialType.Ball);
			this.startPosition = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
			this.laserMask.graphics.moveTo(0, 0);
			this.laserLine.anchorOffsetY = this.laserLine.height / 2;
			this.laserLine.anchorOffsetX = this.laserLine.width - 20;
			this.laserLine.scaleY = CommonUtils.StageUtils.getStageScale();
			this.laserMask.graphics.lineStyle(this.laserLine.height * this.laserLine.scaleY);
			this.drawLaser = true;

		}
		public showDisplay(container: egret.DisplayObjectContainer) {
			if (this.stop)
				return;
			if (!container.contains(this.baseDisplay))
				container.addChild(this.baseDisplay);
			container.setChildIndex(this.baseDisplay, 2);
			let stagePosition = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
			if (this.drawLaser) {
				this.laserMask.graphics.lineTo(-stagePosition.X + this.startPosition.X, -stagePosition.Y + this.startPosition.Y);
				let angle = Math.atan((stagePosition.Y - this.startPosition.Y) / (stagePosition.X - this.startPosition.X));
				if (angle < 0) {
					angle += Math.PI;
				}
				this.laserLine.rotation = 180 * angle / Math.PI;
			}
			this.baseDisplay.x = stagePosition.X;
			this.baseDisplay.y = stagePosition.Y;
			let paddingDis = 0.8;
			if (this.position[1] < -this.radius - paddingDis
				|| this.position[0] < -this.radius - paddingDis
				|| this.position[0] > CommonUtils.StageUtils.getWorldWidth() + paddingDis + this.radius) {
				this.destory(container);
			}
		}
		public getPower() {
			return this.power;
		}
		public destory(container: egret.DisplayObjectContainer): void {
			this.stop = true;
			let self = this;
			egret.Tween.get(this.laserLine).to({ alpha: 0 }, 2000).call(
				function () {
					if (self.onDestroy)
						self.onDestroy();
					let x = self.baseDisplay.x;
					let y = self.baseDisplay.y;
					if (container.contains(self.baseDisplay)) {
						container.removeChild(self.baseDisplay);
					}
					if (self.world)
						self.world.removeBody(self);
				}
			);
		}
	}
}