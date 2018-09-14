module GameScene {
	export class TerminalPanel extends MaskPanel {
		public onFinishHandle: Function;
		public onShareHandle: Function;
		public onRestartHandle: Function;
		public onBuyReviveHandle: Function;
		private panelDisplay: egret.DisplayObjectContainer;
		private txtCurrentScore: egret.TextField;
		private txtHighestScore: egret.TextField;
		private btnShare: egret.Sprite;
		private btnRestart: any;
		private btnBuyRevive: CustomUI.PanelButtonUI;
		private price: number;
		public shareBtnCreated:boolean = false;
		public constructor() {
			super();
			this.maskAlpha = 0.7;
		}
		public setScore(currentScore: number, highestScore: number) {
			this.txtCurrentScore.text = `总分 ${currentScore}`;
			this.txtCurrentScore.x = (this.panelDisplay.width - this.txtCurrentScore.width) / 2;
			this.txtHighestScore.text = `最佳 ${highestScore}`;
			this.txtHighestScore.x = (this.panelDisplay.width - this.txtHighestScore.width) / 2;
		}
		public onUserEnterSuccess(data: any): void {
			CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
			platform.destroyUserInfoButton();
			this.shareBtnCreated = false;
			Server.Connector.getGameClient().sendDamageData(CommonUtils.GameUtils.roundId, "", this);
		}

		private fixVerifyButton() {
			platform.fixUserInfoButton().then((res) => {
				if (!res) {
					setTimeout(() => { this.fixVerifyButton(); }, 1000);
				}
			});
		}

		public setPrice(price: number, currentBonus: number, leftBuyCount: number) {
			this.price = price;
			console.log("left buy count = " + leftBuyCount)
			this.btnBuyRevive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
			if (leftBuyCount < 0) {
				if(this.shareBtnCreated){
					return;
				}
				this.shareBtnCreated = true;
				console.log("terminal panel 创建授权按钮");
				platform.createUserInfoButton((res) => {
					console.log("授权按钮被点击 res = ");
					console.log(res);
					if (res.errMsg.indexOf("getUserInfo:fail") >= 0) {
						console.log("用户点击取消按钮");
						return;
					}
					if (res.errMsg.indexOf("getUserInfo:ok") >= 0) {
						platform.login().then((jsCode) => {
							setTimeout(() => {
								console.log("重新登录成功 jsCode = " + jsCode.code);
								let wxLoginInfo = { code: jsCode.code, encryptedData: res.encryptedData, iv: res.iv, rawData: res.rawData, signature: res.signature };
								CommonUtils.AccountUtils.setwxUserData(wxLoginInfo);
								Server.Connector.getGameClient().userLogin(CommonUtils.AccountUtils.getwxUserData(), this);
							}, 200);
						});
						return;
					}
					GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
				}
					, this.btnBuyRevive.x * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.x
					, this.btnBuyRevive.y * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.y
					, this.btnBuyRevive.width * CommonUtils.StageUtils.getStageScale()
					, this.btnBuyRevive.height * CommonUtils.StageUtils.getStageScale(), "resource/assets/wx_verify_revive.png");
				this.btnBuyRevive.visible = false;
				setTimeout(() => { this.fixVerifyButton(); }, 1000);

			} else if (leftBuyCount == 0) {

				this.btnBuyRevive.visible = true;
				this.btnBuyRevive.setText(`购买次数已用完`);
				this.btnBuyRevive.setStyle(CustomUI.ButtonStyle.Gray);
				this.btnBuyRevive.touchEnabled = false;

			} else {

				this.btnBuyRevive.visible = true;
				this.btnBuyRevive.setText(`x ${price} 复活`);
				this.btnBuyRevive.setStyle(CustomUI.ButtonStyle.Blue);
				this.btnBuyRevive.touchEnabled = true;
				this.btnBuyRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);

			}
		}
		protected drawPanel(): void {

			console.log("dead panel 被加到舞台一次");

			this.panelDisplay = new egret.DisplayObjectContainer();
			this.addChild(this.panelDisplay);

			this.txtCurrentScore = new egret.TextField();
			this.panelDisplay.addChild(this.txtCurrentScore);
			this.txtCurrentScore.text = "本次得分"
			this.txtCurrentScore.size = 58;
			this.txtCurrentScore.y = 340;
			this.txtCurrentScore.textColor = 0xFFFFFF;

			this.txtHighestScore = new egret.TextField();
			this.panelDisplay.addChild(this.txtHighestScore);
			this.txtHighestScore.text = "最佳"
			this.txtHighestScore.size = 38;
			this.txtHighestScore.y = 420;
			this.txtHighestScore.textColor = 0xFCB861;

			let btnReviveFree = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue,"分享给好友");
			this.panelDisplay.addChild(btnReviveFree);
			btnReviveFree.touchEnabled = true;
			btnReviveFree.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
				if (!this.enabled)
					return;
				if (this.onShareHandle)
					this.onShareHandle();
			}, this);
			btnReviveFree.x = (this.panelDisplay.width - btnReviveFree.width) / 2;
			btnReviveFree.y = 470;

			this.btnBuyRevive = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, " ");
			this.panelDisplay.addChild(this.btnBuyRevive);
			this.btnBuyRevive.visible = false;
			this.btnBuyRevive.touchEnabled = true;
			this.btnBuyRevive.x = (this.panelDisplay.width - this.btnBuyRevive.width) / 2;
			this.btnBuyRevive.y = btnReviveFree.y + btnReviveFree.height + 20;

			let btnFinish = CommonUtils.BitmapUtils.createBitmapByName("btn_finish_game_png");
			this.panelDisplay.addChild(btnFinish);
			btnFinish.touchEnabled = true;
			btnFinish.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
				if (!this.enabled)
					return;
			this.shareBtnCreated = false;
				if (this.onFinishHandle)
					this.onFinishHandle();
			}, this);
			btnFinish.x = (this.panelDisplay.width - btnFinish.width) / 2;
			btnFinish.y = this.btnBuyRevive.y + this.btnBuyRevive.height + 40;

			let btnRestart: egret.Bitmap = CommonUtils.BitmapUtils.createBitmapByName("btn_terminal_restart_png");
			this.panelDisplay.addChild(btnRestart);
			btnRestart.x = (this.panelDisplay.width - btnRestart.width) / 2;
			btnRestart.y = btnFinish.y + btnFinish.height + 20;
			btnRestart.touchEnabled = true;
			btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
				if (!this.enabled)
					return;
				if (this.onRestartHandle)
					this.onRestartHandle();
			}, this);

			let hiddenArea = new egret.Shape();
			this.panelDisplay.addChild(hiddenArea);
			hiddenArea.graphics.beginFill(0x000000, 0);
			hiddenArea.graphics.drawRect(0, 0, this.stage.stageWidth, 100 * CommonUtils.StageUtils.getStageScale());
			hiddenArea.graphics.endFill();
			hiddenArea.y = btnFinish.y + btnFinish.height;

			let toolIcon: egret.Bitmap = CommonUtils.BitmapUtils.createBitmapByName("panel_icon_terminal_png");
			this.panelDisplay.addChild(toolIcon);
			toolIcon.y = 10;
			toolIcon.x = (this.panelDisplay.width - toolIcon.width) / 2;

			this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.x = 178 * CommonUtils.StageUtils.getStageScale();
			CommonUtils.LoggerUtil.log(`current Stage Height = ${this.stage.stageHeight}`);
			this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;

			this.txtCurrentScore.x = (this.panelDisplay.width - this.txtCurrentScore.width) / 2;
			this.txtHighestScore.x = (this.panelDisplay.width - this.txtHighestScore.width) / 2;

		}
		private onBuy(evt: egret.TouchEvent) {
			if (!this.enabled)
				return;
			if (this.onBuyReviveHandle)
				this.onBuyReviveHandle();
		}
		public onDamageRequestSuccess(data: any): void {
			this.setPrice(data.Revive.Bonus, data.Revive.CurrentBonus, data.Revive.LeftBuyCount);
		}
	}
}