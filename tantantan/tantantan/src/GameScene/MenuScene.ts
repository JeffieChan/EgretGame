module GameScene {
	export class MenuScene extends egret.DisplayObjectContainer {
		private btnStartGame: egret.Sprite;
		private btnRate: egret.Sprite;
		private btnHistory: egret.Sprite;
		private btnInvite: egret.Sprite;
		public gameStartHandle: Function;
		public openRateHandle: Function;
		public openHistoryHandle: Function;
		public openInviteHandle: Function;
		public panelOpened: boolean;
		private midY: number;
		private logoOffset: number;
		private startButtonOffset: number;
		private listOffset: number;
		public constructor() {
			super();
			this.panelOpened = false;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
		private onAddToStage(event: egret.Event): void {
			this.midY = this.stage.stageHeight / 2;
			this.logoOffset = 50;
			this.startButtonOffset = 30;
			this.listOffset = 260;
			this.drawBg();
			this.drawButtons();
		}
		private drawBg(): void {
			let bg = CommonUtils.BitmapUtils.createBitmapByName("menu_bg_png");
			bg.scaleX = CommonUtils.StageUtils.getStageScale();
			bg.scaleY = CommonUtils.StageUtils.getStageScale();
			this.addChild(bg);
			let logo = CommonUtils.BitmapUtils.createBitmapByName("game_logo_png");
			logo.scaleX = CommonUtils.StageUtils.getStageScale();
			logo.scaleY = CommonUtils.StageUtils.getStageScale();
			logo.y = this.midY - logo.height * CommonUtils.StageUtils.getStageScale() - this.logoOffset * CommonUtils.StageUtils.getStageScale();
			logo.x = (this.stage.stageWidth - logo.width * CommonUtils.StageUtils.getStageScale()) / 2;
			this.addChild(logo);
		}
		private drawButtons(): void {
			this.drawBtnStart();
			this.drawBtnRate();
			this.drawBtnHistory();
			this.drawBtnInvite();
		}
		private drawBtnStart(): void {
			this.btnStartGame = new egret.Sprite();
			let img = CommonUtils.BitmapUtils.createBitmapByName("btn_start_game_png");
			img.scaleX = CommonUtils.StageUtils.getStageScale();
			img.scaleY = CommonUtils.StageUtils.getStageScale();
			this.btnStartGame.addChild(img);
			this.btnStartGame.y = this.midY + this.startButtonOffset * CommonUtils.StageUtils.getStageScale();
			this.btnStartGame.x = (this.stage.stageWidth - this.btnStartGame.width) / 2;
			this.addChild(this.btnStartGame);
			this.btnStartGame.touchEnabled = true;
			this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
				if (this.panelOpened)
					return;
				if (this.gameStartHandle)
					this.gameStartHandle();
			}, this);
			this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (event: egret.TouchEvent) => {
				if (this.panelOpened)
					return;
			}, this);
		}
		private drawBtnRate(): void {
			this.btnRate = new egret.Sprite();
			let img = CommonUtils.BitmapUtils.createBitmapByName("btn_rate_png");
			img.scaleX = CommonUtils.StageUtils.getStageScale();
			img.scaleY = CommonUtils.StageUtils.getStageScale();
			this.btnRate.addChild(img);
			this.btnRate.y = this.midY + this.listOffset * CommonUtils.StageUtils.getStageScale();
			this.btnRate.x = 76 * CommonUtils.StageUtils.getStageScale();
			this.addChild(this.btnRate);
			this.btnRate.touchEnabled = true;
			this.btnRate.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
				if (this.panelOpened)
					return;
				if (this.openRateHandle)
					this.openRateHandle();
			}, this);
		}
		private drawBtnHistory(): void {
			this.btnHistory = new egret.Sprite();
			let img = CommonUtils.BitmapUtils.createBitmapByName("btn_history_png");
			img.scaleX = CommonUtils.StageUtils.getStageScale();
			img.scaleY = CommonUtils.StageUtils.getStageScale();
			this.btnHistory.addChild(img);
			this.btnHistory.y = this.midY + this.listOffset * CommonUtils.StageUtils.getStageScale();
			this.btnHistory.x = 310 * CommonUtils.StageUtils.getStageScale();
			this.addChild(this.btnHistory);
			this.btnHistory.touchEnabled = true;
			this.btnHistory.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
				if (this.panelOpened)
					return;
				if (this.openHistoryHandle)
					this.openHistoryHandle();
			}, this);
		}
		private drawBtnInvite(): void {
			this.btnInvite = new egret.Sprite();
			let img = CommonUtils.BitmapUtils.createBitmapByName("btn_invite_png");
			img.scaleX = CommonUtils.StageUtils.getStageScale();
			img.scaleY = CommonUtils.StageUtils.getStageScale();
			this.btnInvite.addChild(img);
			this.btnInvite.y = this.midY + this.listOffset * CommonUtils.StageUtils.getStageScale();
			this.btnInvite.x = 547 * CommonUtils.StageUtils.getStageScale();
			this.addChild(this.btnInvite);
			this.btnInvite.touchEnabled = true;
			this.btnInvite.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
				if (this.panelOpened)
					return;
				if (this.openInviteHandle)
					this.openInviteHandle();
			}, this);
		}
	}
}