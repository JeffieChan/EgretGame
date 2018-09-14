module GameScene {
	export class UserWalletPanel extends MaskPanel {
		public onConfirmHandle: Function;
		public onClosedHandle: Function;
		public onShareHandle: Function;
		public onLinkShareWx: Function;
		public onUseHandle: Function;
		private txtGold: egret.TextField;
		private txtBonus: egret.TextField;
		private txtCacheValue: egret.TextField;
		private txtTitle: egret.TextField;
		private bonus: number;
		private gold: number;
		private cashValue: number;
		private btnConfirm: egret.Sprite;
		private btnShare: egret.Bitmap;
		private panelDisplay: egret.DisplayObjectContainer;
		private iconName: string;
		private iconTitle: string;
		private iconDesc: string;
		private static popDelay: number = 1000;
		private static popSteps: number = 20;
		private static popInterval: number;
		private btnLinkShareWx: any;
		private btnUse: any;
		public constructor() {
			super();
			this.maskAlpha = 0.7;
			UserWalletPanel.popInterval = UserWalletPanel.popDelay / UserWalletPanel.popSteps;
		}
		public setWalletData(bonus: number, gold: number, cashValue: number, popBonus: number, popGold: number, showMall: number, showMP: number) {
			if (showMall > 0) {
				this.btnUse.visible = true;
			}
			if (showMP > 0) {
				this.btnLinkShareWx.visible = true;
			}

			if (bonus >= 0 || gold >= 0 || cashValue >= 0) {

				this.bonus = bonus;
				this.gold = gold;
				this.cashValue = cashValue;
				this.txtCacheValue.text = `${cashValue}元`;
				if (popBonus == 0 && popGold == 0) {
					this.txtBonus.text = this.bonus.toString();
					this.txtGold.text = this.gold.toString();
					return;
				}

				let bonusStep = Math.floor(popBonus / UserWalletPanel.popSteps);
				let goldStep = Math.floor(popGold / UserWalletPanel.popSteps);
				let startBonus = bonus - popBonus;
				let startGold = gold - popGold;

				let timer = new egret.Timer(UserWalletPanel.popInterval, UserWalletPanel.popSteps);
				timer.addEventListener(egret.TimerEvent.TIMER, (evt) => {
					this.txtBonus.text = startBonus.toString();
					this.txtGold.text = startGold.toString();
					startBonus += bonusStep;
					startGold += goldStep;
				}, this);
				timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, (evt) => {
					this.txtBonus.text = this.bonus.toString();
					this.txtGold.text = this.gold.toString();
				}, this);
				timer.start();
				return;
			}

		}
		private btnLinkShareWxTap(evt) {
			if (this.onLinkShareWx)
				this.onLinkShareWx();
		}
		private onBtnUseTap(evt) {
			if (this.onUseHandle)
				this.onUseHandle();
		}

		public onGetMyWalletSuccess(data): void {
			this.setWalletData(data.Bonus, data.Gold, data.CashValue, 0, 0, data.GotoMall, data.FollowMP);
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
			this.txtTitle.text = "礼包";
			this.txtTitle.textColor = 0x7276a3;
			this.txtTitle.x = (this.panelDisplay.width - this.txtTitle.width) / 2;

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

			let liney = 140;
			let icoBonus = CommonUtils.BitmapUtils.createBitmapByName("panel_icon_bonus_png")
			this.panelDisplay.addChild(icoBonus);
			icoBonus.y = liney;
			icoBonus.x = 50;
			this.txtBonus = new egret.TextField();
			this.panelDisplay.addChild(this.txtBonus);
			this.txtBonus.x = 210;
			this.txtBonus.y = liney + 40;
			this.txtBonus.size = 42;
			this.txtBonus.width = 245;
			this.txtBonus.textAlign = egret.HorizontalAlign.CENTER;
			this.txtBonus.textColor = 0xFFFFFF;

			this.btnLinkShareWx = CommonUtils.BitmapUtils.createBitmapByName("panel_btn_getmore_png");
			this.panelDisplay.addChild(this.btnLinkShareWx);
			this.btnLinkShareWx.visible = false;
			this.btnLinkShareWx.touchEnabled = true;
			this.btnLinkShareWx.x = 450;
			this.btnLinkShareWx.y = liney + 20;
			this.btnLinkShareWx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLinkShareWxTap, this);

			liney = 320;
			let icoGold = CommonUtils.BitmapUtils.createBitmapByName("panel_icon_gold_png")
			this.panelDisplay.addChild(icoGold);
			icoGold.y = liney;
			icoGold.x = 50;
			this.txtGold = new egret.TextField();
			this.panelDisplay.addChild(this.txtGold);
			this.txtGold.x = 210;
			this.txtGold.y = liney + 40;
			this.txtGold.size = 42;
			this.txtGold.width = 245;
			this.txtGold.textAlign = egret.HorizontalAlign.CENTER;
			this.txtGold.textColor = 0xFFFFFF;
			this.btnUse = CommonUtils.BitmapUtils.createBitmapByName("panel_btn_use_png");
			this.panelDisplay.addChild(this.btnUse);

			this.btnUse.visible = false;
			this.btnUse.touchEnabled = true;
			this.btnUse.x = 450;
			this.btnUse.y = liney + 20;
			this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUseTap, this);

			liney = 500;
			let lblCashValue = new egret.TextField();
			this.panelDisplay.addChild(lblCashValue);
			lblCashValue.x = 50;
			lblCashValue.y = liney;
			lblCashValue.size = 46;
			lblCashValue.textColor = 0x7276a3;
			lblCashValue.text = "礼包总价值";
			this.txtCacheValue = new egret.TextField();
			this.panelDisplay.addChild(this.txtCacheValue);
			this.txtCacheValue.x = lblCashValue.x + lblCashValue.width + 5;
			this.txtCacheValue.y = liney;
			this.txtCacheValue.size = 46;
			this.txtCacheValue.textColor = 0xef9105;

			liney = 580;
			let lbldesc = new egret.TextField();
			this.panelDisplay.addChild(lbldesc);
			lbldesc.x = 50;
			lbldesc.y = liney;
			lbldesc.width = 600;
			lbldesc.size = 32;
			lbldesc.textColor = 0x7276a3;
			lbldesc.lineSpacing = 10;
			lbldesc.text = "1、猜豆用于购买游戏道具或进入【微猜服务号】兑换礼包。 \n2、 抵扣劵用于商城购物/话费充值/视频会员抵扣现金。";

			this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.x = 34 * CommonUtils.StageUtils.getStageScale();
			this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;

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
	}
}