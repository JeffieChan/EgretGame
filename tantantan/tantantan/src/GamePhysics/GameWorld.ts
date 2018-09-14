module GamePhysics {
	export class GameWorld extends p2.World {
		private gameView: GameScene.PlayField;
		private cannon: CustomUI.CannonUI;
		private brickContainer: CustomUI.BrickContainerUI;
		private newLineIsReady: boolean = false;
		private newLineData: any = null;
		public groundY: number = 0;
		public playfieldY: number = 0;
		public paddingTop: number = 0;
		public constructor(gameView: GameScene.PlayField) {
			super({ gravity: [0, -GameSetting.PhysicalSetting.Gravity] });
			this.calculatePosition();
			this.sleepMode = p2.World.BODY_SLEEPING;
			this.gameView = gameView;
			this.defaultContactMaterial.restitution = GameSetting.PhysicalSetting.Restitution;
			let noneMtl: p2.Material = new p2.Material(Model.MaterialType.None);
			let wallMtl: p2.Material = new p2.Material(Model.MaterialType.Wall);
			let ballMtl: p2.Material = new p2.Material(Model.MaterialType.Ball);
			let cmtlBallBall = new p2.ContactMaterial(ballMtl, ballMtl, <p2.ContactMaterialOptions>{ restitution: 0, friction: 0 });
			this.addContactMaterial(cmtlBallBall);
			let cmtlNoneNone = new p2.ContactMaterial(noneMtl, noneMtl, <p2.ContactMaterialOptions>{ restitution: 0, friction: 0 });
			this.addContactMaterial(cmtlNoneNone);
			let cmtlNoneWall = new p2.ContactMaterial(noneMtl, wallMtl, <p2.ContactMaterialOptions>{ restitution: 0, friction: 0 });
			this.addContactMaterial(cmtlNoneWall);
			this.on("beginContact", (evt) => {
				if (!(evt.bodyA instanceof CustomUI.BallUI || evt.bodyB instanceof CustomUI.BallUI))
					return;
				let ball: CustomUI.BallUI;
				if (evt.bodyA instanceof CustomUI.BallUI) {
					ball = evt.bodyA;
				} else {
					ball = evt.bodyB;
				}
				if (ball)
					ball.mass = GameSetting.BallSetting.BallMass;
			}, this);
			this.on("beginContact", (evt) => {
				if (!this.isBallAndBrick(evt)) return;
				let ball: CustomUI.BallUI;
				let brick: CustomUI.BrickUI;
				if (evt.bodyA instanceof CustomUI.BallUI) {
					ball = evt.bodyA;
					brick = evt.bodyB;
				} else {
					ball = evt.bodyB;
					brick = evt.bodyA;
				}
				brick.hittedByBall(ball, this.gameView);
				ball.damping = GameSetting.BallSetting.BallDamping;
				ball.addRandomSpeed();
				this.gameView.refreshScore();
			}, this);
			this.on("beginContact", (evt) => {
				if (!this.isBallAndGround(evt)) return;
				let ball: CustomUI.BallUI;
				if (evt.bodyA instanceof CustomUI.BallUI) {
					ball = evt.bodyA;
				} else {
					ball = evt.bodyB;
				}
				ball.moveToTop(this.gameView, this, this.cannon);
				this.gameView.showBtnSpeedUp();
				this.gameView.speedUp = true;
				this.speedUp();
			}, this);
			this.on("beginContact", (evt) => {
				if (!this.isBallAndWall(evt)) return;
				let ball: CustomUI.BallUI;
				let wall: CustomUI.WallUI;
				if (evt.bodyA instanceof CustomUI.BallUI) {
					ball = evt.bodyA;
					wall = evt.bodyB;
				} else {
					ball = evt.bodyB;
					wall = evt.bodyA;
				}
				wall.hittedByBall(ball, this.gameView);
				ball.addRandomSpeed();
				ball.damping = GameSetting.BallSetting.BallDamping;
			}, this);
			this.on("beginContact", (evt) => {
				if (!this.isBallAndStuff(evt)) return;
				let ball: CustomUI.BallUI;
				let stuff: CustomUI.StuffUI;
				if (evt.bodyA instanceof CustomUI.BallUI) {
					ball = evt.bodyA;
					stuff = evt.bodyB;
				} else {
					ball = evt.bodyB;
					stuff = evt.bodyA;
				}
				stuff.hittedByBall(ball, this.cannon, this.gameView);
			}, this);

			this.on("beginContact", (evt) => {
				if (!this.isLaserAndBrick(evt)) return;
				let ball: CustomUI.LaserBallUI;
				let brick: CustomUI.BrickUI;
				if (evt.bodyA instanceof CustomUI.LaserBallUI) {
					ball = evt.bodyA;
					brick = evt.bodyB;
				} else {
					ball = evt.bodyB;
					brick = evt.bodyA;
				}
				brick.hittedByLaser(ball, this.gameView);
			}, this);
			this.on("beginContact", (evt) => {
				if (!this.isLaserAndStuff(evt)) return;
				let ball: CustomUI.LaserBallUI;
				let stuff: CustomUI.StuffUI;
				if (evt.bodyA instanceof CustomUI.LaserBallUI) {
					ball = evt.bodyA;
					stuff = evt.bodyB;
				} else {
					ball = evt.bodyB;
					stuff = evt.bodyA;
				}
				stuff.hittedByLaser(ball, this.cannon, this.gameView);
			}, this);
		}
		private calculatePosition() {
			this.groundY = (CommonUtils.StageUtils.getWorldHeight() - GameSetting.PhysicalSetting.StageWorldPlayFieldHeight - GameSetting.PhysicalSetting.GroundThickness) * GameSetting.PhysicalSetting.BottomPaddingScale + GameSetting.PhysicalSetting.GroundThickness;
			this.playfieldY = this.groundY + GameSetting.PhysicalSetting.StageWorldPlayFieldHeight;
			this.paddingTop = (CommonUtils.StageUtils.getWorldHeight() - GameSetting.PhysicalSetting.StageWorldPlayFieldHeight - GameSetting.PhysicalSetting.GroundThickness) * GameSetting.PhysicalSetting.TopPaddingScale;
		}
		public redrawBalls(): void {
			this.cannon.redrawBalls();
		}
		public revive(data: any): void {
			this.brickContainer.revive(this.gameView, data, this);
			this.cannon.readyToFire();
		}
		public loadNextLine(): void {
			if (this.cannon.isAllBallHitFloor()) {
				CommonUtils.LoggerUtil.log("开始从服务器读取下一行数据");
				this.sendDamageData(true);
			}
		}
		public isAllMovingToTop(): boolean {
			return this.cannon.isAllMovingToTop();
		}
		public isReadyToFire(): boolean {
			return this.cannon.isReadyToFire();
		}
		public readyToFire(drawNewLine: boolean): void {
			console.log(`this.cannon.isReadyToFire() = ${this.cannon.isReadyToFire()}`)
			if (this.cannon.isAllBallReadyToFire()) {
				if (drawNewLine) {
					CommonUtils.LoggerUtil.log("ready to fire 开始尝试绘制下一行数据");
					this.drawNewLine();
				}
			}
		}
		public createPlayField() {
			let bg = CommonUtils.BitmapUtils.createBitmapByName("bg_png");
			bg.width = 750 * CommonUtils.StageUtils.getStageScale();
			bg.height = 1620 * CommonUtils.StageUtils.getStageScale();
			this.gameView.addChild(bg);
			this.gameView.setChildIndex(bg, 2);

			// left
			let wall: CustomUI.WallUI = new CustomUI.WallUI(GameSetting.WallSetting.WallHeight, GameSetting.WallSetting.WallWeight);
			wall.position = [GameSetting.WallSetting.WallPadding, this.playfieldY - GameSetting.WallSetting.WallTop];
			wall.angle = - Math.PI / 2;
			this.addBody(wall);
			wall.showDisplay(this.gameView, false);

			// right
			let wall2: CustomUI.WallUI = new CustomUI.WallUI(GameSetting.WallSetting.WallHeight, GameSetting.WallSetting.WallWeight);
			wall2.position = [CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding, this.playfieldY - GameSetting.WallSetting.WallTop - GameSetting.WallSetting.WallHeight];
			wall2.angle = Math.PI / 2;
			this.addBody(wall2);
			wall2.showDisplay(this.gameView, false);
		}
		public createGround(): void {
			var ground: CustomUI.GroundUI = new CustomUI.GroundUI();
			ground.position = [0, this.groundY];
			this.addBody(ground);
			ground.showDisplay(this.gameView, false, 1);
		}
		public createTopBow(): void {
			let topLeft: CustomUI.TopBowUILeft = new CustomUI.TopBowUILeft();
			topLeft.position = [(CommonUtils.StageUtils.getWorldWidth() + 2 * GameSetting.WallSetting.WallPadding) / 4, this.playfieldY - GameSetting.WallSetting.BowTop];
			this.addBody(topLeft);
			topLeft.showDisplay(this.gameView, false);
			let topRight: CustomUI.TopBowUILeft = new CustomUI.TopBowUIRight();
			topRight.position = [(3 * CommonUtils.StageUtils.getWorldWidth() - 2 * GameSetting.WallSetting.WallPadding) / 4, this.playfieldY - GameSetting.WallSetting.BowTop];
			this.addBody(topRight);
			topRight.showDisplay(this.gameView, false);
		}
		public createCannon(): void {
			this.cannon = new CustomUI.CannonUI(this, this.gameView);
			this.gameView.addChild(this.cannon);
			this.cannon.x = CommonUtils.CoordinateUtils.worldLengthToStage(CommonUtils.StageUtils.getWorldWidth() / 2);
			this.cannon.y = CommonUtils.CoordinateUtils.worldLengthToStage(this.paddingTop + GameSetting.WallSetting.BowTop + 0.3);
			this.gameView.setChildIndex(this.cannon, 10);
			this.cannon.initGenisBall(1, this.gameView, this);
			this.cannon.onBallCountChanged = (validCount, totalCount) => {
				this.gameView.showBallCount(validCount, totalCount);
			};
		}
		public createBrickContainer(): void {
			this.brickContainer = new CustomUI.BrickContainerUI(this.paddingTop, 4.5, 10, this, this.gameView);
			this.gameView.addChild(this.brickContainer);
		}
		public resetBricks(data): void {
			CommonUtils.LoggerUtil.log("砖块全量数据");
			CommonUtils.LoggerUtil.log(data);
			let lines = CommonUtils.GameUtils.parseBrickLineData(data.Lines);
			let currRowIndex = data.RowIndex;
			this.brickContainer.resetBricks(lines, currRowIndex, true, this.gameView);
			this.readyToFire(false);
		}
		public speedUp(): void {
			this.cannon.speedUp = true;
		}
		public doubleNextRound(): void {
			this.cannon.doubleNextRound();
		}
		public laserNextRound(): void {
			this.cannon.laserNextRound();
		}
		public isToolInUse(): boolean {
			return this.cannon.isToolInUse();
		}
		public stopGame(): void {

			this.cannon.destoryAllBalls(this.gameView, this);
			this.brickContainer.destoryAllBricks(false, this.gameView, this);
			CommonUtils.GameUtils.roundId = 0;

			this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
			this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
		}
		// Start:游戏服务器交互事件
		// 开始新一局
		public onCreateNewRoundSuccess(data): void {
			this.cannon.destoryAllBalls(this.gameView, this);
			this.brickContainer.destoryAllBricks(false, this.gameView, this);
			CommonUtils.GameUtils.roundId = data.RoundId;
			CommonUtils.GameUtils.currentScore = 0;
			this.gameView.refreshScore();
			this.cannon.initGenisBall(1, this.gameView, this);
			let lines = CommonUtils.GameUtils.parseBrickLineData(data.Lines);
			CommonUtils.LoggerUtil.log("lines");
			CommonUtils.LoggerUtil.log(lines);
			this.brickContainer.resetBricks(lines, lines.length - 1, true, this.gameView);
			this.newLineIsReady = true;
			this.gameView.paused = false;
			this.gameView.showPanel = false;
			CommonUtils.GameUtils.initFireDamage();
			this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
			this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);

			this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
			this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
			setTimeout(()=>{this.doVerify();},200);
		}
		private doVerify() {
			let wxLoginInfo;
			platform.getUserInfo((res) => {
			}, (res) => {
				console.log("读取用户授权信息失败 res = ");
				console.log(res);
				let verifyPanel = new GameScene.WxVerifyPanel("授权后玩游戏可以获取礼包");
				GameScene.PlayField.self.showPanel = true;
				GameScene.PlayField.self.paused = true;
				verifyPanel.onVerifiedHandler = (data) => {
					platform.destroyUserInfoButton();
					GameScene.PlayField.self.removeChild(verifyPanel);
					if (!GameScene.PlayField.self.fpShowed) {
						GameScene.PlayField.self.showPanel = false;
						GameScene.PlayField.self.paused = false;
					}
				}
				verifyPanel.onCloseHandler = (data) => {
					platform.destroyUserInfoButton();
					GameScene.PlayField.self.removeChild(verifyPanel);
					if (!GameScene.PlayField.self.fpShowed) {
						GameScene.PlayField.self.showPanel = false;
						GameScene.PlayField.self.paused = false;
					}
				}
				GameScene.PlayField.self.addChild(verifyPanel);
				return;

			}, (res) => {
				console.log("platform.getUserInfo complete");
				console.log(res);
			});
		}
		private drawNewLine() {
			if (this.newLineData == null) {
				console.log("新一行数据还没有到达");
				this.newLineIsReady = true;
				return;
			}
			CommonUtils.GameUtils.initFireDamage();
			this.gameView.refreshNextPlayer(false);
			console.log(`this.newLineIsReady = ${this.newLineIsReady}`);
			if (!this.newLineIsReady) {
				this.newLineIsReady = true;
				return;
			}
			if (this.newLineData.GameOver == 0) {
				this.gameView.speedUp = false;
				this.cannon.speedUp = false;
				this.gameView.hideBtnSpeedUp();
				CommonUtils.LoggerUtil.log("new line data:")
				CommonUtils.LoggerUtil.log(this.newLineData);
				this.brickContainer.resetBricks(this.newLineData.Lines, this.newLineData.RowIndex, true, this.gameView);
				this.cannon.readyToFire();
			} else if (this.newLineData.GameOver == 1) {
				this.gameView.speedUp = false;
				this.cannon.speedUp = false;
				this.gameView.hideBtnSpeedUp();
				this.showGameOverPanel(this.newLineData.Revive);
			}
		}
		public onDamageRequestSuccess(data): void {
			let newLineData: any;
			if (data.GameOver == 0) {
				newLineData = {
					RoundId: data.RoundId,
					GameOver: data.GameOver,
					Lines: CommonUtils.GameUtils.parseBrickLineData(data.Lines),
					RowIndex: data.RowIndex
				};
			} else if (data.GameOver == 1) {
				newLineData = data
			}
			this.newLineData = newLineData;
			CommonUtils.LoggerUtil.log("onDamageRequestSuccess 开始尝试绘制下一行数据");
			this.drawNewLine();
		}
		public showGameOverPanel(revive): void {
			this.gameView.showDeadPanel(revive);
		}
		public onDamageRequestFailed(errorMessage): void {
			CommonUtils.LoggerUtil.log("获取新的一行数据失败:" + errorMessage);
		}
		public sendDamageData(anmit: boolean): void {
			this.newLineIsReady = false;
			Server.Connector.getGameClient().sendDamageData(CommonUtils.GameUtils.roundId, CommonUtils.GameUtils.getFireDamage(), this);
		}
		public startNewGame(): void {
			this.cannon.clearTools();
			Server.Connector.getGameClient().createNewRound(this);
		}
		// End
		private isBallAndGround(evt: any): boolean {
			if (!evt.bodyA)
				return false;
			if (!evt.bodyB)
				return false;
			return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.GroundUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.GroundUI)

		}
		private isBallAndBrick(evt: any): boolean {
			if (!evt.bodyA)
				return false;
			if (!evt.bodyB)
				return false;
			return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.BrickUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.BrickUI)
		}
		private isBallAndStuff(evt: any): boolean {
			if (!evt.bodyA)
				return false;
			if (!evt.bodyB)
				return false;
			return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.StuffUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.StuffUI)
		}
		private isLaserAndBrick(evt: any): boolean {
			if (!evt.bodyA)
				return false;
			if (!evt.bodyB)
				return false;
			return (evt.bodyA instanceof CustomUI.LaserBallUI && evt.bodyB instanceof CustomUI.BrickUI) || (evt.bodyB instanceof CustomUI.LaserBallUI && evt.bodyA instanceof CustomUI.BrickUI)
		}
		private isLaserAndStuff(evt: any): boolean {
			if (!evt.bodyA)
				return false;
			if (!evt.bodyB)
				return false;
			return (evt.bodyA instanceof CustomUI.LaserBallUI && evt.bodyB instanceof CustomUI.StuffUI) || (evt.bodyB instanceof CustomUI.LaserBallUI && evt.bodyA instanceof CustomUI.StuffUI)
		}
		private isBallAndWall(evt: any): boolean {
			if (!evt.bodyA)
				return false;
			if (!evt.bodyB)
				return false;
			return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.WallUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.WallUI)
		}
		private isInAimPosition(x, y): boolean {
			return y >= 175 * CommonUtils.StageUtils.getStageScale() && y <= (this.gameView.stage.stageHeight - 180 * CommonUtils.StageUtils.getStageScale());
		}
		private canFire(x, y): boolean {
			return this.isInAimPosition(x, y) && !this.gameView.paused && !this.gameView.showPanel;
		}
		private onBeginTouch(event: egret.TouchEvent): void {
			if (!this.newLineIsReady)
				return;
			if (!this.canOption()) {
				return;
			}
			if (!this.canFire(event.stageX, event.stageY)) {
				return;
			}
			this.cannon.startAim();
			this.cannon.aim(event.stageX, event.stageY);
		}
		private onTouchMove(event: egret.TouchEvent): void {
			if (!this.newLineIsReady)
				return;
			if (!this.canOption()) {
				return;
			}
			this.cannon.aim(event.stageX, event.stageY);
		}
		private onEndTouch(event: egret.TouchEvent): void {
			if (!this.newLineIsReady)
				return;
			if (!this.cannon.aiming) {
				return;
			}
			if (!this.canOption()) {
				return;
			}
			this.newLineData = null;
			this.cannon.fire();
			this.cannon.stopAim();
		}
		private canOption(): boolean {
			if (this.gameView.paused)
				return false;
			if (this.gameView.showPanel)
				return false;
			if (!Server.Connector.getGameClient().isConnected())
				return false;
			if (this.gameView.isPoping)
				return false;
			return true;
		}
	}
}