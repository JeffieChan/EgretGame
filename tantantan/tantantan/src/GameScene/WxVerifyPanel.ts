module GameScene {
	export class WxVerifyPanel extends MaskPanel {
		public onVerifiedHandler: Function;
		public onCloseHandler: Function;
		private verifyText: string;
		private bg: egret.Shape;
		public constructor(verifyText: string) {
			super();
			this.maskAlpha = 0.6;
			this.verifyText = verifyText;
		}
		public drawPanel() {

			this.bg = new egret.Shape();
			this.bg.graphics.beginFill(0xFFFFFF);
			this.bg.graphics.drawRoundRect(0, 0, 578, 628, 20, 20);
			this.bg.graphics.endFill();
			this.bg.scaleX = CommonUtils.StageUtils.getStageScale();
			this.bg.scaleY = CommonUtils.StageUtils.getStageScale();
			this.addChild(this.bg);
			this.bg.x = (CommonUtils.StageUtils.getStageWidth() - this.bg.width * CommonUtils.StageUtils.getStageScale()) / 2;
			this.bg.y = (this.stage.stageHeight - this.bg.height * CommonUtils.StageUtils.getStageScale()) / 2;

			let icon = CommonUtils.BitmapUtils.createBitmapByName("wx_verify_icon_png");
			this.addChild(icon);
			icon.scaleX = CommonUtils.StageUtils.getStageScale();
			icon.scaleY = CommonUtils.StageUtils.getStageScale();
			icon.x = this.bg.x + 215 * CommonUtils.StageUtils.getStageScale();
			icon.y = this.bg.y + 65 * CommonUtils.StageUtils.getStageScale();

			let btnClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png");
			this.addChild(btnClose);
			btnClose.x = this.bg.x + (this.bg.width - btnClose.width + 15) * CommonUtils.StageUtils.getStageScale();
			btnClose.y = this.bg.y - 20 * CommonUtils.StageUtils.getStageScale();
			btnClose.scaleX = CommonUtils.StageUtils.getStageScale();
			btnClose.scaleY = CommonUtils.StageUtils.getStageScale();
			btnClose.touchEnabled = true;
			btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
				if (this.onCloseHandler) {
					this.onCloseHandler();
				}
			}, this);

			let txtTitle = new egret.TextField();
			this.addChild(txtTitle);
			txtTitle.y = this.bg.y + 280 * CommonUtils.StageUtils.getStageScale();
			txtTitle.width = this.stage.stageWidth;
			txtTitle.textAlign = egret.HorizontalAlign.CENTER;
			txtTitle.size = 36 * CommonUtils.StageUtils.getStageScale();
			txtTitle.textColor = 0x333333;
			txtTitle.text = this.verifyText;

			this.doVerify(this.bg.y);

		}

		private doVerify(y) {
			let buttonWidth = 412 * CommonUtils.StageUtils.getStageScale();
			let buttonHeight = 120 * CommonUtils.StageUtils.getStageScale();
			let buttonX = (this.stage.stageWidth - buttonWidth) / 2;
			let buttonY = y + 420 * CommonUtils.StageUtils.getStageScale();

			console.log("wxVerifyPanel 创建授权按钮");
			platform.createUserInfoButton((res, buttonId) => {
				console.log("授权按钮被点击 res = ");
				console.log(res);
				if (res.errMsg.indexOf("getUserInfo:fail") >= 0) {
					console.log("用户点击取消按钮");
					return;
				}

				if (res.errMsg.indexOf("getUserInfo:ok") >= 0) {
					console.log("用户点击确认按钮");
					platform.login().then((jsCode) => {
						if (jsCode.errMsg.indexOf("login:ok") >= 0) {
							console.log("重新登录成功 jsCode = ");
							console.log(jsCode);
							console.log("res = ");
							console.log(res);
							let wxLoginInfo = { code: jsCode.code, encryptedData: res.encryptedData, iv: res.iv, rawData: res.rawData, signature: res.signature };
							CommonUtils.AccountUtils.setwxUserData(wxLoginInfo);
							Server.Connector.getGameClient().userLogin(CommonUtils.AccountUtils.getwxUserData(), this);
							return;
						}
						GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
						//this.doVerify(this.bg.y);
					});
					return;
				}

				GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
			}, buttonX, buttonY, buttonWidth, buttonHeight, "resource/assets/wx_verify_common.png");
			setTimeout(() => { this.fixVerifyButton(); }, 1000);

		}

		private fixVerifyButton() {
			platform.fixUserInfoButton().then((res) => {
				if (!res) {
					setTimeout(() => { this.fixVerifyButton(); }, 1000);
				}
			});
		}

		public onUserEnterSuccess(data): void {

			if (!data.UserToken || data.UserToken == "") {
				GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
				//this.doVerify(this.bg.y);
				return;
			}
			if (this.onVerifiedHandler)
				this.onVerifiedHandler(data);

		}
	}
}