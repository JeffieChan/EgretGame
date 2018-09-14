module GameScene {
	export class PlayField extends egret.DisplayObjectContainer {

		private world: GamePhysics.GameWorld;

		private txtScore: egret.TextField;
		private txtBallCount: egret.TextField;
		private btnPause: egret.Sprite;
		private btnSpeedUp: egret.Sprite;
		private btnBenefit: CustomUI.ButtonBenefit;

		public paused: boolean = false;
		public speedUp: boolean = false;
		public showPanel: boolean = false;
		public isPoping: boolean = false;
		public fpShowed: boolean = false;
		private gameSpeed: number = 1;
		private fastSpeed: number = 1;
		private speedRate: number = 1.5;
		private worldStepSpeed: number;

		private pausePanel: PausePanel;
		private doubleToolPanel: ToolPanel;
		private laserToolPanel: ToolPanel;
		private messagePanel: MessagePanel;
		private nextPlayerPanel: NextPlayerPanel;
		private linkShareWXPanel: LinkShareWxPanel;
		private iphonexScale: number = 0.47;
		private confirmTerminalPanel: GameScene.TerminalPanel;
		public backToMenuHandle: Function;
		public static self: PlayField;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.worldStepSpeed = CommonUtils.StageUtils.getFramInterval() * this.speedRate / this.gameSpeed;
			PlayField.self = this;
		}
		public startNewGame(): void {
			this.nextPlayerPanel.visible = false;
			this.showPanel = false;
			this.paused = false;
			this.speedUp = false;
			this.pausePanel.visible = false;
			CommonUtils.LoggerUtil.log("开始检查用户是不是第一次启动");
			platform.isFirstRun().then((isFirstRun) => {
				CommonUtils.LoggerUtil.log("isFirstRun:");
				CommonUtils.LoggerUtil.log(isFirstRun);
				if (isFirstRun) {
					let fp = CommonUtils.BitmapUtils.createBitmapByName("frist_run_pic_png");
					this.addChild(fp);
					this.setChildIndex(fp, -1);
					fp.scaleX = CommonUtils.StageUtils.getStageScale();
					fp.scaleY = CommonUtils.StageUtils.getStageScale();
					fp.touchEnabled = true;
					this.paused = true;
					this.showPanel = true;
					this.fpShowed = true;
					fp.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
						this.removeChild(fp);
						this.paused = false;
						this.showPanel = false;
						this.fpShowed = false;
					}, this);
					platform.setNotFirstRun();
				}
			});
			this.world.startNewGame();
			this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}
		public refreshNextPlayer(forceRefresh: boolean): void {
			this.nextPlayerPanel.refreshCurrentScore(forceRefresh);
		}
		public pauseGame() {

			this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			this.pausePanel.visible = true;
			this.pausePanel.alpha = 1;
			this.setChildIndex(this.pausePanel, -1);
			this.paused = true;
			this.showPanel = true;
			CommonUtils.LoggerUtil.log(`this.pausePanel.x = ${this.pausePanel.x}`);
			CommonUtils.LoggerUtil.log(`this.pausePanel.y = ${this.pausePanel.y}`);

		}
		public resumeGame(onSuccess?: Function) {
			this.paused = false;
			this.showPanel = false
			egret.Tween.get(this.pausePanel)
				.call(() => {
					this.pausePanel.visible = false;
					this.pausePanel.alpha = 1;
					this.setChildIndex(this.pausePanel, -1);
				})
				.to({ alpha: 1 }, 50)
				.call(() => {
					this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
					this.pausePanel.visible = false;
					if (onSuccess) {
						onSuccess();
					}
				});
		}
		private createDeadPanel(): void {
			let self = this;
			this.confirmTerminalPanel = new TerminalPanel();
			this.confirmTerminalPanel.onBuyReviveHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				Server.Connector.getGameClient().revive(this, (data) => {
					this.paused = false;
					this.showPanel = false;
					CommonUtils.LoggerUtil.log(data);
					this.world.revive(data);
					this.removeChild(this.confirmTerminalPanel);
					platform.destroyUserInfoButton();
					this.confirmTerminalPanel.shareBtnCreated = false;
					setTimeout(
						() => {
							let msg = CommonUtils.BitmapUtils.createBitmapByName("revive_msg_png");
							this.addChild(msg);
							this.setChildIndex(msg, -1);
							msg.scaleX = CommonUtils.StageUtils.getStageScale();
							msg.scaleY = CommonUtils.StageUtils.getStageScale();
							msg.x = (this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
							msg.y = (this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
							msg.alpha = 1;
							egret.Tween.get(msg)
								.wait(1000)
								.to({ alpha: 0 }, 500)
								.call(() => { this.removeChild(msg); });
						}, 500
					);
				});
			};

			this.confirmTerminalPanel.onFinishHandle = () => {
				platform.destroyUserInfoButton();
				Server.Connector.getGameClient().confirmTerminal(this);
				platform.updateUserScore(CommonUtils.GameUtils.currentScore.toString());
				this.removeChild(this.confirmTerminalPanel);
				this.confirmTerminalPanel.shareBtnCreated = false;
				this.world.stopGame();
				if (this.backToMenuHandle) {
					this.backToMenuHandle();
				}
			};

			this.confirmTerminalPanel.onShareHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl
					, (res) => {
						CommonUtils.LoggerUtil.log("分享成功 : " + res);
						CommonUtils.LoggerUtil.log(res);
						if (!res.shareTickets) {
							self.popMessage("分享到微信群才可以", true);
							return;
						}
						platform.getShareInfo(
							res.shareTickets[0],
							(data) => {
								CommonUtils.LoggerUtil.log("分享到群")
								CommonUtils.LoggerUtil.log(data);
								Server.Connector.getGameClient().getShareInfo(data, "Revive", self, (sd) => {
									platform.destroyUserInfoButton();
									self.paused = false;
									self.showPanel = false;
									CommonUtils.LoggerUtil.log("分享复活返回数据：");
									CommonUtils.LoggerUtil.log(sd);
									this.world.revive(sd);
									this.removeChild(this.confirmTerminalPanel);
									this.confirmTerminalPanel.shareBtnCreated = false;
									setTimeout(
										() => {
											let msg = CommonUtils.BitmapUtils.createBitmapByName("revive_msg_png");
											this.addChild(msg);
											this.setChildIndex(msg, -1);
											msg.scaleX = CommonUtils.StageUtils.getStageScale();
											msg.scaleY = CommonUtils.StageUtils.getStageScale();
											msg.x = (this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
											msg.y = (this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
											msg.alpha = 1;
											egret.Tween.get(msg)
												.wait(1000)
												.to({ alpha: 0 }, 500)
												.call(() => { this.removeChild(msg); });
										}, 500
									);
								});
							},
							(failedData) => {
								CommonUtils.LoggerUtil.log("分享复活失败")
								setTimeout(() => { self.popMessage("分享复活失败", true) }, 1000);
							}
						);

					}, (res) => {
						CommonUtils.LoggerUtil.log("分享失败 : " + res);
					}, (res) => {
						CommonUtils.LoggerUtil.log("分享结束 : ");
						CommonUtils.LoggerUtil.log(res);
					});

			};
			this.confirmTerminalPanel.onRestartHandle = () => {
				platform.updateUserScore(CommonUtils.GameUtils.currentScore.toString());
				Server.Connector.getGameClient().confirmTerminal(this, () => {
					platform.destroyUserInfoButton();
					this.confirmTerminalPanel.shareBtnCreated = false;
					this.startNewGame();
				});
			};
		}
		public showDeadPanel(revive): void {
			let self = this;
			this.paused = true;
			this.showPanel = true;
			if (!this.contains(this.confirmTerminalPanel)) {
				this.addChild(this.confirmTerminalPanel);
			}
			this.confirmTerminalPanel.setScore(revive.CurrentRoundScore, revive.HighestScore);
			this.confirmTerminalPanel.setPrice(revive.Bonus, revive.CurrentBonus, revive.LeftBuyCount);
		}
		private onAddToStage(evt: egret.Event): void {
			this.createGameWorld();
			this.world.createPlayField();
			this.world.createGround();
			this.world.createTopBow();
			this.world.createCannon();
			this.world.createBrickContainer();
			this.createScoreDisplay();
			this.createballCountDisplay();
			this.createGameTools();
			this.createButtons();
			this.createPausePanel();
			this.createDoubleToolPanel();
			this.createLaserToolPanel();
			this.createNotGroupPanel();
			this.createNextPlayerPanel();
			this.createGetMoreBonusPanel();
			this.createDeadPanel();
		}
		private createNextPlayerPanel(): void {

			this.nextPlayerPanel = new NextPlayerPanel();
			this.addChild(this.nextPlayerPanel);
			this.nextPlayerPanel.scaleX = CommonUtils.StageUtils.getStageScale();
			this.nextPlayerPanel.scaleY = CommonUtils.StageUtils.getStageScale();
			this.nextPlayerPanel.x = (750 - 118) * CommonUtils.StageUtils.getStageScale();
			this.nextPlayerPanel.y = CommonUtils.CoordinateUtils.worldLengthToStage(this.world.paddingTop + 1);
			this.nextPlayerPanel.visible = false;
			this.setChildIndex(this.nextPlayerPanel, 256);
		}
		private createNotGroupPanel(): void {

			this.messagePanel = new MessagePanel();
			this.addChild(this.messagePanel);
			this.messagePanel.scaleX = CommonUtils.StageUtils.getStageScale();
			this.messagePanel.scaleY = CommonUtils.StageUtils.getStageScale();
			this.messagePanel.x = (this.stage.stageWidth - this.messagePanel.width * CommonUtils.StageUtils.getStageScale()) / 2;
			this.messagePanel.y = (this.stage.stageHeight - this.messagePanel.height * CommonUtils.StageUtils.getStageScale()) / 2;
			this.messagePanel.alpha = 0;
		}
		private createLaserToolPanel(): void {
			this.laserToolPanel = new ToolPanel("laser", "panel_icon_laser_png", "激光炮", "您可选择以下方式获得激光炮");
			this.addChild(this.laserToolPanel);
			this.laserToolPanel.visible = false;
			this.laserToolPanel.onClosedHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				egret.ticker.resume();
				this.paused = false;
				this.showPanel = false;
				this.hideToolPanel(this.laserToolPanel);
			};
			this.laserToolPanel.onConfirmHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				Server.Connector.getGameClient().BuyTool("laser", this);
			};
			this.laserToolPanel.onShareHandle = (canshare) => {

				if (!Server.Connector.getGameClient().isConnected())
					return;

				platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl
					, (res) => {
						CommonUtils.LoggerUtil.log("分享成功 : " + res);
						CommonUtils.LoggerUtil.log(res);
						if (!res.shareTickets) {
							CommonUtils.LoggerUtil.log("没有分享到群");
							this.paused = false;
							this.showPanel = false;
							this.laserToolPanel.visible = false;
							CommonUtils.LoggerUtil.log("开始显示错误提示框");
							this.popMessage("免费道具获取失败,分享到微信群才可以", true);
							return;
						}
						if (!canshare) {
							this.popMessage("本局分享获取激光炮次数已经用完", true);
							return;
						}
						platform.getShareInfo(
							res.shareTickets[0],
							(data) => {
								Server.Connector.getGameClient().getShareInfo(data, "GetLaser", this, (sd) => {
									CommonUtils.LoggerUtil.log("Get Laser :");
									CommonUtils.LoggerUtil.log(sd);
									if (sd.ToolCode && sd.ToolCode == "laser") {
										this.hideToolPanel(this.laserToolPanel);
										this.world.laserNextRound();
										this.paused = false;
										this.showPanel = false;
									} else {
										this.popMessage("分享获取激光炮失败", true);
									}
								});
							},
							(failedData) => {
								this.popMessage("分享获取激光炮失败", true);
							}
						);

					}, (res) => {
						CommonUtils.LoggerUtil.log("分享失败 : " + res);
					}, (res) => {
						CommonUtils.LoggerUtil.log("分享结束 : " + res);
					});

			}
		}
		private createDoubleToolPanel(): void {
			this.doubleToolPanel = new ToolPanel("double", "panel_icon_double_png", "双倍球数", "您可选择以下方式获得双倍球");
			this.addChild(this.doubleToolPanel);
			this.doubleToolPanel.visible = false;
			this.doubleToolPanel.onClosedHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				this.paused = false;
				this.showPanel = false;
				this.hideToolPanel(this.doubleToolPanel);
			};
			this.doubleToolPanel.onConfirmHandle = () => {
				if (!this.paused)
					return;
				if (!Server.Connector.getGameClient().isConnected())
					return;
				Server.Connector.getGameClient().BuyTool("double", this);
			};
			this.doubleToolPanel.onShareHandle = (canshare) => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl
					, (res) => {
						CommonUtils.LoggerUtil.log("分享成功 : " + res);
						CommonUtils.LoggerUtil.log(res);
						if (!res.shareTickets) {
							CommonUtils.LoggerUtil.log("没有分享到群");
							this.paused = false;
							this.showPanel = false;
							this.doubleToolPanel.visible = false;
							CommonUtils.LoggerUtil.log("开始显示错误提示框");
							this.popMessage("免费道具获取失败,分享到微信群才可以", true);
							return;
						}
						if (!canshare) {
							this.popMessage("本局分享获取双倍球次数已经用完", true);
							return;
						}
						platform.getShareInfo(
							res.shareTickets[0],
							(data) => {
								Server.Connector.getGameClient().getShareInfo(data, "GetDouble", this, (sd) => {
									CommonUtils.LoggerUtil.log("Get double :");
									CommonUtils.LoggerUtil.log(sd);
									if (sd.ToolCode && sd.ToolCode == "double") {
										this.hideToolPanel(this.doubleToolPanel);
										this.world.doubleNextRound();
										this.paused = false;
										this.showPanel = false;
									} else {
										this.popMessage("分享获取双倍球失败", true);
									}
								});
							},
							(failedData) => {
								this.popMessage("分享获取双倍球失败", true);
							}
						);

					}, (res) => {
						CommonUtils.LoggerUtil.log("分享失败 : " + res);
					}, (res) => {
						CommonUtils.LoggerUtil.log("分享结束 : " + res);
					});

			}
		}
		private showPausePanel() {
			this.pausePanel.visible = true;
		}
		private hidePausePanel() {
			this.pausePanel.visible = false;
		}
		private createPausePanel(): void {
			this.pausePanel = new PausePanel();
			this.addChild(this.pausePanel);
			this.pausePanel.visible = false;
			this.pausePanel.restartHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				this.startNewGame();
			};
			this.pausePanel.continueGameHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				this.resumeGame();
			};
			this.pausePanel.backToMainHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				this.resumeGame();
				this.world.stopGame();
				if (this.backToMenuHandle) {
					this.backToMenuHandle();
				}
			}
			this.pausePanel.shareHandle = () => {
				if (!this.paused)
					return;
				if (!Server.Connector.getGameClient().isConnected())
					return;
				platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl
					, (res) => {
						CommonUtils.LoggerUtil.log(res);
					}, (res) => {
						CommonUtils.LoggerUtil.log("分享失败 : " + res);
					}, (res) => {
						CommonUtils.LoggerUtil.log("分享结束 : " + res);
					});
			}
		}
		private onEnterFrame(event: egret.Event) {
			let self = this;
			if (this.paused)
				return;
			if (this.showPanel)
				return;
			if (!Server.Connector.getGameClient().isConnected())
				return;
			if (this.isPoping)
				return;
			for (let i = 0; i < this.gameSpeed; i++) {
				this.world.step(this.worldStepSpeed);
			}
			if (this.speedUp) {
				for (let i = 0; i < this.fastSpeed; i++) {
					this.world.step(this.worldStepSpeed);
				}
			}

			this.world.redrawBalls();
			this.world.bodies.forEach((item, index) => {
				if (item.type == p2.Body.STATIC)
					return;
				if (item.sleepState == p2.Body.SLEEPING) {
					return;
				}
				if (item instanceof CustomUI.LaserBallUI) {
					(<CustomUI.LaserBallUI>item).showDisplay(self);
					return;
				}
			});
		}
		private createGameWorld(): void {
			let self = this;
			this.world = new GamePhysics.GameWorld(this);
		}
		private createButtons() {
			this.createBtnPause();
			this.createBtnSpeedUp();
			this.createBtnBenefit();
		}
		private createBtnBenefit() {
			let whRate = this.stage.stageWidth / this.stage.stageHeight;
			let offset = 30;
			if (whRate <= this.iphonexScale) {
				offset = 55;
			}
			this.btnBenefit = new CustomUI.ButtonBenefit();
			this.addChild(this.btnBenefit);
			this.btnBenefit.x = 22 * CommonUtils.StageUtils.getStageScale();
			this.btnBenefit.y = this.stage.stageHeight - ((this.btnBenefit.height + offset) * CommonUtils.StageUtils.getStageScale());
			this.btnBenefit.scaleX = CommonUtils.StageUtils.getStageScale();
			this.btnBenefit.scaleY = CommonUtils.StageUtils.getStageScale();
			this.btnBenefit.touchEnabled = true;
			this.btnBenefit.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
				if (this.showPanel)
					return;
				if (!Server.Connector.getGameClient().isConnected())
					return;
				this.btnBenefit.touchEnabled = false;
				Server.Connector.getGameClient().getUserWallet(this);
			}, this);
			this.setChildIndex(this.btnBenefit, 5);
		}
		private createBtnPause() {
			this.btnPause = new egret.Sprite();
			let btnImg = CommonUtils.BitmapUtils.createBitmapByName("btn_pause_png");
			this.btnPause.addChild(btnImg);
			this.btnPause.x = 22 * CommonUtils.StageUtils.getStageScale();
			this.btnPause.y = 30 * CommonUtils.StageUtils.getStageScale();
			this.btnPause.scaleX = CommonUtils.StageUtils.getStageScale();
			this.btnPause.scaleY = CommonUtils.StageUtils.getStageScale();
			this.addChild(this.btnPause);
			this.btnPause.touchEnabled = true;
			this.btnPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPauseTap, this);
			this.setChildIndex(this.btnPause, 5);
		}
		private createBtnSpeedUp() {
			let whRate = this.stage.stageWidth / this.stage.stageHeight;
			let offset = 45;
			if (whRate <= this.iphonexScale) {
				offset = 55;
			}

			this.btnSpeedUp = new egret.Sprite();
			let btnImg = CommonUtils.BitmapUtils.createBitmapByName("btn_speedup_png");
			this.btnSpeedUp.addChild(btnImg);
			this.btnSpeedUp.x = 660 * CommonUtils.StageUtils.getStageScale();
			this.btnSpeedUp.y = this.stage.stageHeight - ((this.btnSpeedUp.height + offset) * CommonUtils.StageUtils.getStageScale());
			this.btnSpeedUp.scaleX = CommonUtils.StageUtils.getStageScale();
			this.btnSpeedUp.scaleY = CommonUtils.StageUtils.getStageScale();
			this.addChild(this.btnSpeedUp);
			this.setChildIndex(this.btnSpeedUp, 5);
			this.btnSpeedUp.visible = false;
		}
		public showBtnSpeedUp() {
			this.btnSpeedUp.visible = true;
		}
		public hideBtnSpeedUp() {
			this.btnSpeedUp.visible = false;
		}
		private onPauseTap(event: egret.TouchEvent): void {
			if (!Server.Connector.getGameClient().isConnected())
				return;
			if(this.paused){
				return;
			}
			if(this.showPanel){
				return;
			}
			this.pauseGame();
		}

		private createScoreDisplay() {
			let top = CommonUtils.CoordinateUtils.worldLengthToStage(this.world.paddingTop + 0.6);
			let lblScore = new egret.TextField();
			lblScore.textColor = 0x6c6edb;
			lblScore.size = 30 * CommonUtils.StageUtils.getStageScale();
			this.addChild(lblScore);
			lblScore.text = "得分";
			lblScore.y = top;
			lblScore.x = 110 * CommonUtils.StageUtils.getStageScale();
			lblScore.fontFamily = "苹方";
			this.setChildIndex(lblScore, 2);

			this.txtScore = new egret.TextField();
			this.txtScore.textColor = 0x6c6edb;
			this.txtScore.size = 30 * CommonUtils.StageUtils.getStageScale();
			this.addChild(this.txtScore);
			this.txtScore.text = "0";
			this.txtScore.y = (top + 2 * CommonUtils.StageUtils.getStageScale());
			this.txtScore.x = lblScore.x + lblScore.width + 10 * CommonUtils.StageUtils.getStageScale();
			this.txtScore.fontFamily = "苹方";
			this.setChildIndex(this.txtScore, 2);
		}
		private createballCountDisplay() {
			let top = CommonUtils.CoordinateUtils.worldLengthToStage(this.world.paddingTop + 0.6);
			let lblBallCount = new egret.TextField();
			lblBallCount.textColor = 0x6c6edb;
			lblBallCount.size = 30 * CommonUtils.StageUtils.getStageScale();
			this.addChild(lblBallCount);
			lblBallCount.text = "球";
			lblBallCount.y = top;
			lblBallCount.x = 545 * CommonUtils.StageUtils.getStageScale();
			lblBallCount.fontFamily = "苹方";
			this.setChildIndex(lblBallCount, 2);

			this.txtBallCount = new egret.TextField();
			this.txtBallCount.textColor = 0x6c6edb;
			this.txtBallCount.size = 30 * CommonUtils.StageUtils.getStageScale();
			this.addChild(this.txtBallCount);
			this.txtBallCount.y = top;
			this.txtBallCount.x = lblBallCount.x + lblBallCount.width + 10 * CommonUtils.StageUtils.getStageScale();
			this.txtBallCount.fontFamily = "苹方";
			this.showBallCount(1, 1);
			this.setChildIndex(this.txtBallCount, 2);
		}
		private createGameTools(): void {
			// 双倍道具
			let whRate = this.stage.stageWidth / this.stage.stageHeight;
			let offset = 30;
			if (whRate <= this.iphonexScale) {
				offset = 60;
			}
			let doubleTool: GameTool.DoubleBalls = new GameTool.DoubleBalls(this.world);
			this.addChild(doubleTool);
			doubleTool.x = 250 * CommonUtils.StageUtils.getStageScale();
			doubleTool.y = this.stage.stageHeight - ((doubleTool.height + offset) * CommonUtils.StageUtils.getStageScale());
			doubleTool.scaleX = CommonUtils.StageUtils.getStageScale();
			doubleTool.scaleY = CommonUtils.StageUtils.getStageScale();
			this.setChildIndex(doubleTool, 2);
			doubleTool.onTapHandler = () => {
				if (this.paused)
					return;
				if (this.showPanel)
					return;
				if (!Server.Connector.getGameClient().isConnected())
					return;
				if (!this.world.isReadyToFire())
					return;
				if (this.world.isToolInUse()) {
					this.popMessage("已经有道具正在使用中", true);
					return;
				}
				this.paused = true;
				this.showPanel = true;
				Server.Connector.getGameClient().getToolInfo("double", this);
			};

			// 激光炮道具
			let laserCannonTool: GameTool.LaserCannon = new GameTool.LaserCannon(this.world);
			this.addChild(laserCannonTool);
			laserCannonTool.x = 405 * CommonUtils.StageUtils.getStageScale();
			laserCannonTool.y = this.stage.stageHeight - ((laserCannonTool.height + offset) * CommonUtils.StageUtils.getStageScale());
			laserCannonTool.scaleX = CommonUtils.StageUtils.getStageScale();
			laserCannonTool.scaleY = CommonUtils.StageUtils.getStageScale();
			this.setChildIndex(laserCannonTool, 2);
			laserCannonTool.onTapHandler = () => {
				if (this.paused)
					return;
				if (this.showPanel)
					return;
				if (!Server.Connector.getGameClient().isConnected())
					return;
				if (!this.world.isReadyToFire())
					return;
				if (this.world.isToolInUse()) {
					this.popMessage("已经有道具正在使用中", true);
					return;
				}
				Server.Connector.getGameClient().getToolInfo("laser", this);
			};
		}
		private showToolPanel(toolPanel: ToolPanel) {
			this.showPanel = true;
			this.paused = true;
			egret.Tween.get(toolPanel)
				.call(() => {
					toolPanel.show();
					this.setChildIndex(toolPanel, this.$children.length - 1);
					toolPanel.alpha = 0;
				})
				.to({ alpha: 1 });
		}
		public refreshScore() {
			this.txtScore.text = CommonUtils.GameUtils.currentScore.toString();
		}
		public showBallCount(validBall: number, totalBall: number) {
			this.txtBallCount.text = `${validBall} / ${totalBall}`;
		}
		private hideToolPanel(toolPanel: ToolPanel) {
			egret.Tween.get(toolPanel)
				.call(() => {
					toolPanel.visible = true;
					this.setChildIndex(toolPanel, this.$children.length - 1);
					toolPanel.alpha = 1;
				})
				.to({ alpha: 0 }, 50)
				.call(() => {
					toolPanel.visible = false;
				});
		}
		// Start:服务器数据处理方法
		public onGetToolInfoSuccess(data: any) {
			if (data.Code == "double") {
				this.doubleToolPanel.setPrice(data.Bonus, data.CurrentBonus, data.LeftBuyCount);
				this.doubleToolPanel.setRemainCount(data.LeftBuyCount, data.LeftShareCount);
				this.showToolPanel(this.doubleToolPanel);
				return;
			}
			if (data.Code == "laser") {
				this.laserToolPanel.setPrice(data.Bonus, data.CurrentBonus, data.LeftBuyCount);
				this.laserToolPanel.setRemainCount(data.LeftBuyCount, data.LeftShareCount);
				this.showToolPanel(this.laserToolPanel);
				return;
			}
		}
		public onGetToolInfoFailed(errorMessage: string) {
			CommonUtils.LoggerUtil.log("获取道具信息失败");
		}
		public onBuyToolSuccess(data: any) {
			this.paused = false;
			this.showPanel = false;
			if (data.Code == "double") {
				this.world.doubleNextRound();
				this.hideToolPanel(this.doubleToolPanel);
			} else if (data.Code == "laser") {
				this.world.laserNextRound();
				this.hideToolPanel(this.laserToolPanel);
			}
		}
		public onBuyToolFailed(errorMessage: any) {
			CommonUtils.LoggerUtil.log("购买道具失败");
			this.popMessage(errorMessage.Message, true);
		}
		public onGetShareInfoSuccess(data: any): void {
			CommonUtils.LoggerUtil.log("分享到群的目标信息");
			CommonUtils.LoggerUtil.log(data);
		}
		public onGetShareInfoFailed(errmsg: string): void {
			CommonUtils.LoggerUtil.log(errmsg);
			this.popMessage(errmsg, true);
		}
		public onReviveFailed(errmsg: any): void {
			CommonUtils.LoggerUtil.log(errmsg);
			CommonUtils.LoggerUtil.log("购买复活失败");
			this.popMessage(errmsg.Message, true);
		}
		public onReviveSuccess(data: any): void {
			CommonUtils.LoggerUtil.log("购买复活成功");
			CommonUtils.LoggerUtil.log(data);
		}
		public onConfirmTerminalFailed(errmsg: string): void {
			CommonUtils.LoggerUtil.log(errmsg);
		}
		public onConfirmTerminalSuccess(data: any): void {
			CommonUtils.LoggerUtil.log("确认结束");
			CommonUtils.LoggerUtil.log(data);
			if (this.contains(this.confirmTerminalPanel))
				this.removeChild(this.confirmTerminalPanel);
			platform.destroyUserInfoButton();
			this.confirmTerminalPanel.shareBtnCreated = false;
		}
		public openBenefitBox(clientId: number, benefit: CustomUI.BenefitUI) {
			if (benefit.hitted) { return; }
			benefit.hitted = true;
			CommonUtils.LoggerUtil.log("福利箱被打开");
			CommonUtils.GameUtils.increaseFireDamage(benefit.clientId, 1);
			CommonUtils.LoggerUtil.log(benefit)
			let self = this;
			egret.Tween.get(benefit.displays[0])
				.to({ x: self.btnBenefit.x, y: self.btnBenefit.y, alpha: 0.6 }, 300)
				.call(
				() => {
					benefit.destory(self);
				}
				);
			Server.Connector.getGameClient().openBenefitBox(benefit.clientId, self);
		}
		public onOpenBenefitBoxSuccess(data) {
			CommonUtils.LoggerUtil.log("打开奖励箱");
			CommonUtils.LoggerUtil.log(data);
			this.btnBenefit.popBenefit(data.Bonus, data.Gold);
		}
		public onOpenBenefitBoxFailed(errmsg) {
			CommonUtils.LoggerUtil.log("打开奖励箱失败");
			CommonUtils.LoggerUtil.log(errmsg);
		}
		public onGetMyWalletSuccess(data) {
			this.btnBenefit.touchEnabled = true;
			if (data.Bonus < 0 || data.Gold < 0 || data.CashValue < 0) {

				CommonUtils.LoggerUtil.log("用户授权页面");
				CommonUtils.LoggerUtil.log(data);
				let verifyPanel = new WxVerifyPanel("授权后可以查看您的礼包");
				let self = this;
				verifyPanel.onVerifiedHandler = (data) => {
					platform.destroyUserInfoButton();
					self.removeChild(verifyPanel);
					self.showPanel = false;
					self.paused = false;
					Server.Connector.getGameClient().getUserWallet(self);
				}
				verifyPanel.onCloseHandler = (data) => {
					console.log("关闭自定义授权面板");
					platform.destroyUserInfoButton();
					self.removeChild(verifyPanel);
					self.showPanel = false;
					self.paused = false;
				}
				self.addChild(verifyPanel);
				self.showPanel = true;
				self.paused = true;
				return;

			}
			CommonUtils.LoggerUtil.log("打开用户钱包");
			CommonUtils.LoggerUtil.log(data);
			this.btnBenefit.setRead();
			let walletPanel = new UserWalletPanel();
			this.addChild(walletPanel);
			this.paused = true;
			this.showPanel = true;
			walletPanel.onClosedHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				this.removeChild(walletPanel);
				this.paused = false;
				this.showPanel = false;
			}
			walletPanel.onUseHandle = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				const platform: any = window.platform;
				platform.navigateToMiniProgram("wx979b36ad38e28b6e", "/pages/index/main", null, "release", null)
			}
			walletPanel.onLinkShareWx = () => {
				if (!Server.Connector.getGameClient().isConnected())
					return;
				walletPanel.visible = false;
				this.showLinkShareWxPanel(() => {
					this.linkShareWXPanel.visible = false;
					walletPanel.visible = true;
				});
			}
			let popBonus = this.btnBenefit.popBonus();
			let popGold = this.btnBenefit.popGold();
			walletPanel.setWalletData(data.Bonus, data.Gold, data.CashValue, popBonus, popGold, data.GotoMall, data.FollowMP);
		}
		public onGetMyWalletFailed(errmsg) {
			this.btnBenefit.touchEnabled = true;
			CommonUtils.LoggerUtil.log("获取用户钱包失败");
			CommonUtils.LoggerUtil.log(errmsg);
		}
		public resetBricks(data): void {
			if (this.world.isReadyToFire() || this.world.isAllMovingToTop()) {
				this.hidePopMessage();
				this.world.resetBricks(data);
			}
		}

		public popMessage(message: string, autoHide: boolean): void {
			setTimeout(
				() => {
					this.messagePanel.pop(message, autoHide, () => {
						this.isPoping = false;
					});
					if (!autoHide) {
						this.isPoping = true;
					}
				}, 500);
		}
		public hidePopMessage(): void {
			CommonUtils.LoggerUtil.log("开始隐藏弹出框");
			this.messagePanel.visible = false;
			this.isPoping = false;
		}
		private createGetMoreBonusPanel(): void {
			this.linkShareWXPanel = new LinkShareWxPanel();
			let self = this;
			this.addChild(this.linkShareWXPanel);
			this.linkShareWXPanel.visible = false;
		}
		private showLinkShareWxPanel(onCloseHandle): void {
			this.linkShareWXPanel.visible = true;
			this.linkShareWXPanel.onClosedHandle = onCloseHandle;
		}
	}
}
