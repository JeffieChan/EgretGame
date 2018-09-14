module GameScene {
	export class ToolPanel extends MaskPanel {
		public onConfirmHandle: Function;
		public onClosedHandle: Function;
		public onShareHandle: Function;
		private txtBonus: egret.TextField;
		private txtTitle: egret.TextField;
		private price: number;
		private currentBonus: number;
		private btnConfirm: CustomUI.PanelButtonUI;
		private btnShare: CustomUI.PanelButtonUI;
		private panelDisplay: egret.DisplayObjectContainer;
		private iconName: string;
		private iconTitle: string;
		private iconDesc: string;
		private canShare: boolean;
		private toolName: string;
		public constructor(toolName, iconName: string, iconTitle: string, iconDesc: string) {
			super();
			this.maskAlpha = 0.7;
			this.iconName = iconName;
			this.iconTitle = iconTitle;
			this.iconDesc = iconDesc;
			this.canShare = true;
			this.toolName = toolName;
		}
		public show() {
			this.visible = true;
		}
		public setPrice(price: number, currentBonus: number, buyCount: number) {
			if (buyCount < 0) {
				this.price = price;
				this.btnConfirm.setText(`授权后可购买`);
				this.txtBonus.text = "";
				this.txtBonus.x = (this.panelDisplay.width - this.txtBonus.width) / 2;
				this.btnConfirm.setStyle(CustomUI.ButtonStyle.Yellow);
				return;
			}
			this.price = price;
			this.btnConfirm.setText(`X ${price}`);
			this.btnConfirm.setStyle(CustomUI.ButtonStyle.Blue);
			this.txtBonus.text = `(当前猜豆 ${currentBonus})`;
			this.txtBonus.x = (this.panelDisplay.width - this.txtBonus.width) / 2;
		}
		public onUserEnterSuccess(data: any): void {
			if (!data.UserToken || data.UserToken == "") {
				GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
				return;
			}
			CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
			platform.destroyUserInfoButton();
			Server.Connector.getGameClient().getToolInfo(this.toolName, this);
		}
		public setRemainCount(buyCount: number, shareCount: number) {
			this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
			if (buyCount < 0) {
				console.log("tool panel 创建授权按钮");
				platform.createUserInfoButton((res) => {
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
						});
						return;
					}
					GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
				}
					, this.btnConfirm.x * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.x
					, this.btnConfirm.y * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.y
					, this.btnConfirm.width * CommonUtils.StageUtils.getStageScale()
					, this.btnConfirm.height * CommonUtils.StageUtils.getStageScale(), "resource/assets/wx_verify_tool.png");
				this.btnConfirm.visible = false;
				setTimeout(() => { this.fixVerifyButton(); }, 1000);
			} else if (buyCount == 0) {
				this.btnConfirm.visible = true;
				this.btnConfirm.setText("本局次数用完");
				this.btnConfirm.setStyle(CustomUI.ButtonStyle.Gray);
				this.btnConfirm.touchEnabled = false;
			} else {
				this.btnConfirm.visible = true;
				this.btnConfirm.setStyle(CustomUI.ButtonStyle.Blue);
				this.btnConfirm.touchEnabled = true;
				this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
			}
			if (shareCount <= 0) {
				this.canShare = false;
			} else {
				this.canShare = true;
			}
		}

		private fixVerifyButton() {
			platform.fixUserInfoButton().then((res) => {
				if (!res) {
					setTimeout(() => { this.fixVerifyButton(); }, 1000);
				}
			});
		}
		private setTitle(title: string) {
			this.txtTitle.text = title;
			this.txtTitle.x = (this.panelDisplay.width - this.txtTitle.width) / 2;
		}
		protected drawPanel(): void {
			this.panelDisplay = new egret.DisplayObjectContainer();
			this.addChild(this.panelDisplay);

			let bg = CommonUtils.BitmapUtils.createBitmapByName("panel_bg_png");
			this.panelDisplay.addChild(bg);

			this.txtTitle = new egret.TextField();
			this.panelDisplay.addChild(this.txtTitle);
			this.txtTitle.y = 25;
			this.txtTitle.size = 50;
			this.txtTitle.fontFamily = "苹方";

			let icoClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png")
			this.panelDisplay.addChild(icoClose);
			icoClose.touchEnabled = true;
			icoClose.y = -30;
			icoClose.x = this.panelDisplay.width - icoClose.width + 20;
			icoClose.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt: egret.TouchEvent) => {
				if (!this.enabled)
					return;
				platform.destroyUserInfoButton();
				if (this.onClosedHandle)
					this.onClosedHandle();
			}, this);

			this.btnShare = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, "免费使用");
			this.panelDisplay.addChild(this.btnShare);
			this.btnShare.x = (this.panelDisplay.width - this.btnShare.width) / 2;
			this.btnShare.y = 600;
			this.btnShare.touchEnabled = true;
			this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
				if (!this.enabled)
					return;
				if (this.onShareHandle) {
					this.onShareHandle(this.canShare);
				}
			}, this);

			this.txtBonus = new egret.TextField();
			this.panelDisplay.addChild(this.txtBonus);
			this.txtBonus.x = (this.panelDisplay.width - this.txtBonus.width) / 2;
			this.txtBonus.y = 430;
			this.txtBonus.textColor = 0xFFFFFF;

			this.btnConfirm = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, "");
			this.panelDisplay.addChild(this.btnConfirm);
			this.btnConfirm.visible = false;
			this.btnConfirm.touchEnabled = true;
			this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
			this.btnConfirm.x = (this.panelDisplay.width - this.btnConfirm.width) / 2;
			this.btnConfirm.y = 480;


			let toolIcon: egret.Bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.iconName);
			this.panelDisplay.addChild(toolIcon);
			toolIcon.y = 50;
			toolIcon.x = (this.panelDisplay.width - toolIcon.width) / 2;

			this.addCenteredText(this.iconTitle, 0xFFFFFF, 35, 270);

			this.addCenteredText(this.iconDesc, 0xFFFFFF, 45, 340);

			this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.x = (this.getMaskWidth() - this.panelDisplay.width * CommonUtils.StageUtils.getStageScale()) / 2;
			this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;
			CommonUtils.LoggerUtil.log(`tool panel stage height = ${this.stage.stageHeight}`);

		}
		private onBuy(evt: egret.TouchEvent) {
			if (!this.enabled)
				return;
			if (this.onConfirmHandle)
				this.onConfirmHandle();
		}
		private addCenteredText(text: string, color: number, size: number, y: number) {
			let txtField: egret.TextField = new egret.TextField();
			this.panelDisplay.addChild(txtField);
			txtField.text = text;
			txtField.textColor = color;
			txtField.size = size;
			txtField.y = y;
			txtField.x = (this.panelDisplay.width - txtField.width) / 2;
		}
		public onGetToolInfoSuccess(data: any) {
			this.setPrice(data.Bonus, data.CurrentBonus, data.LeftBuyCount);
			this.setRemainCount(data.LeftBuyCount, data.LeftShareCount);
		}
	}
}