module CustomUI {
	export class ButtonBenefit extends egret.Sprite {
		private iconWidth: number = 30;
		private iconBonus: string = "panel_icon_bonus_png";
		private iconGold: string = "panel_icon_gold_png";
		private hasUnreaded: boolean = false;
		private shakeTimer: egret.Timer;
		private iconUnread: egret.Bitmap;
		private unPopBonus: number;
		private unPopGold: number;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.unPopBonus = 0;
			this.unPopGold = 0;
		}
		private onAddToStage(evt: egret.Event): void {

			let btn = new egret.Sprite();
			this.addChild(btn);
			let btnImg = CommonUtils.BitmapUtils.createBitmapByName("btn_benefit_png");
			btn.addChild(btnImg);

			this.iconUnread = CommonUtils.BitmapUtils.createBitmapByName("icon_unread_png");
			btn.addChild(this.iconUnread);
			this.iconUnread.x = btnImg.width - this.iconUnread.width / 1.5;
			this.iconUnread.visible = false;

			let shake = 0.3;
			let orgX = btnImg.x;
			let orgY = btnImg.y;
			let shakeInterval = 25;

			this.shakeTimer = new egret.Timer(3000, 5);
			this.shakeTimer.addEventListener(egret.TimerEvent.TIMER
				, (evt) => {

					if (!this.hasUnreaded) {
						return;
					}
					egret.Tween.get(btn)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
						.to({ x: orgX, y: orgY }, shakeInterval)
				}
				, this);
			if(this.unPopBonus > 0 || this.unPopGold > 0){
				this.shakeTimer.start();
			}

		}
		public popBenefit(bonus: number, gold: number) {
			this.shakeTimer.stop();
			let bonusInterval = 300;
			let goldInterval = bonusInterval;
			this.unPopBonus += bonus;
			this.unPopGold += gold;
			this.setUnread();
			if (bonus > 0) {
				goldInterval = bonusInterval + 300;
			}
			let startY = -46;
			if (bonus > 0) {
				setTimeout(() => {
					let pop = this.buildPopContainer(this.iconBonus, bonus);
					this.addChild(pop);
					pop.y = startY;
					egret.Tween.get(pop)
						.to({ y: startY - 180, alpha: 0 }, 1000)
						.call(() => {
							this.removeChild(pop);
						});
				}, bonusInterval);
			}
			if (gold > 0) {
				setTimeout(() => {
					let pop = this.buildPopContainer(this.iconGold, gold);
					this.addChild(pop);
					pop.y = startY;
					egret.Tween.get(pop)
						.to({ y: startY - 180, alpha: 0 }, 1000)
						.call(() => {
							this.removeChild(pop);
						});
				}, goldInterval);
			}
		}

		public popBonus() {
			let pop = this.unPopBonus;
			this.unPopBonus = 0;
			return pop;
		}
		public popGold() {
			let pop = this.unPopGold;
			this.unPopGold = 0;
			return pop;
		}

		public setUnread(): void {
			this.hasUnreaded = true;
			this.iconUnread.visible = true;
			this.shakeTimer.reset();
			this.shakeTimer.start();
		}
		public setRead(): void {
			this.hasUnreaded = false;
			this.iconUnread.visible = false;
			this.shakeTimer.stop();
		}

		private buildPopContainer(iconName: string, value: number): egret.DisplayObjectContainer {
			let pop = new egret.DisplayObjectContainer();
			let icon = CommonUtils.BitmapUtils.createBitmapByName(iconName);
			pop.addChild(icon);
			icon.width = this.iconWidth;
			icon.height = this.iconWidth;

			let text = new egret.TextField;
			pop.addChild(text);
			text.text = `+ ${value}`;
			text.x = this.iconWidth + 10;
			text.y = (this.iconWidth - text.height) / 2;

			return pop;
		}
	}
}