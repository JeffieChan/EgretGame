module CustomUI {
	export abstract class BrickUI extends BaseBodyUI {
		private static chips: egret.Shape[];
		private static currentID: number = 0;
		protected life: number;
		protected displayBg: egret.Sprite;
		protected shape: p2.Shape;
		protected edgeCount: number;
		private txtLife: egret.TextField;
		private shaking: boolean;
		public lineIndex: number;
		public rowIndex:number;
		private laserBiring: boolean;
		public constructor(life: number, edgeCount: number) {
			super();
			BrickUI.currentID++;
			this.lineIndex = 0;
			this.mass = 0;
			this.type = p2.Body.STATIC;
			this.life = life;
			this.edgeCount = edgeCount;
			this.shaking = false;
			this.laserBiring = false;
			this.buildShapeAndDisplay();
			this.angle = 0 ; //Math.random() * Math.PI;
			this.shape.collisionGroup = GameSetting.CollisionGroupSetting.BRICK;
			this.txtLife = new egret.TextField();
			this.txtLife.textColor = 0x000000;
			this.txtLife.width = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * 2);
			this.txtLife.height = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * 2);
			this.txtLife.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.txtLife.textAlign = egret.HorizontalAlign.CENTER;
			this.txtLife.size = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * 0.6);
			this.txtLife.anchorOffsetX = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius);
			this.txtLife.anchorOffsetY = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius);
			this.txtLife.fontFamily = "苹方";
			this.baseDisplay.addChild(this.txtLife);
			this.txtLife.rotation = 180 * (this.angle / Math.PI);
			this.showLife();
		}
		private dispose(){
			this.displayBg = null;
			this.displays = null;
			this.txtLife = null;
		}
		public destory(animate:boolean,container: egret.DisplayObjectContainer): void {
			if (this.onDestoried)
				this.onDestoried(this.id)
			if (!BrickUI.chips) {
				BrickUI.chips = [];
				for (let i = 0; i < 10; i++) {
					BrickUI.chips[i] = new egret.Shape();
					container.addChild(BrickUI.chips[i]);
					BrickUI.chips[i].graphics.beginFill(0xFFA000);
					BrickUI.chips[i].graphics.drawRect(0, 0, 15, 15);
					BrickUI.chips[i].visible = false;
				}
			}
			let x = this.baseDisplay.x;
			let y = this.baseDisplay.y;
			if (container.contains(this.baseDisplay)) {
				container.removeChild(this.baseDisplay);
			}
			if (this.world)
				this.world.removeBody(this);
			if(!animate)
				return;
			for (let i = 0; i < BrickUI.chips.length; i++) {
				egret.Tween.get(BrickUI.chips[i])
					.call(() => {
						BrickUI.chips[i].visible = true;
						BrickUI.chips[i].x = x;
						BrickUI.chips[i].y = y;
						BrickUI.chips[i].scaleX = 1;
						BrickUI.chips[i].scaleY = 1;
					})
					.to({ x: x, y: y, scaleX: 1, scaleY: 1 })
					.to({ x: x + (Math.random() - 0.5) * 150, y: y + (Math.random() - 0.5) * 150, scaleX: 0, scaleY: 0, rotation: Math.random() * 360 }, 200)
					.call(() => {
						BrickUI.chips[i].visible = false;
						this.dispose();
					});
			}
		}
		public getLife(): number {
			return this.life;
		}
		public hittedByBall(ball: BallUI, container: GameScene.PlayField): void {
			this.shake();
			let damage = Math.min(this.life, ball.getPower())
			CommonUtils.GameUtils.currentScore += damage;
			CommonUtils.GameUtils.increaseFireDamage(this.clientId, damage);
			this.life -= damage;
			if (this.life <= 0) {
				this.destory(true,container);
				return;
			}
			ball.addRandomSpeed();
			this.redrawBg();
			this.showLife();
		}
		public hittedByLaser(laser: LaserBallUI, container: GameScene.PlayField): void {
			let decreaseLife = Math.min(laser.getPower(), this.life);
			if (decreaseLife == 0) {
				return;
			}
			this.life -= decreaseLife;
			CommonUtils.GameUtils.currentScore += decreaseLife;
			CommonUtils.GameUtils.increaseFireDamage(this.clientId, decreaseLife);
			container.refreshScore();
			if (this.life <= 0) {
				this.destory(true,container);
				return;
			}
			this.redrawBg();
			this.showLife();
			this.shake();
		}
		protected abstract buildShapeAndDisplay(): void;
		protected abstract redrawBg(): void;
		public onDestoried: Function;
		protected buildColorForLife(): number {
			return GameSetting.BrickSetting.getColorForLife(this.life);
		}
		private shake(): void {
			if (this.shaking)
				return;
			this.shaking = true;
			let orgX = this.baseDisplay.x;
			let orgY = this.baseDisplay.y;
			let shakeInterval = 50;

			egret.Tween.get(this.baseDisplay)
				.to({ x: orgX + this.getShakeNumber(), y: orgY + this.getShakeNumber() }, shakeInterval)
				.to({ x: orgX + this.getShakeNumber(), y: orgY + this.getShakeNumber() }, shakeInterval)
				.to({ x: orgX + this.getShakeNumber(), y: orgY + this.getShakeNumber() }, shakeInterval)
				.to({ x: orgX, y: orgY }, shakeInterval)
				.call(() => {
					this.shaking = false;
				})
		}
		private getShakeNumber(): number {
			return CommonUtils.CoordinateUtils.worldLengthToStage((Math.random() - 0.5) * GameSetting.BrickSetting.Radius * 0.15);
		}
		private showLife(): void {
			this.txtLife.text = this.life.toString();
		}
		public setLife(life:number):void{
			this.life = life;
			this.showLife();
		}
	}
}