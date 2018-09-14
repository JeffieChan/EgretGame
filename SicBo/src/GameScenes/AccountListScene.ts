module GameScenes{
	export class AccountListScene extends GameScenes.BaseScene{
		private static selfObject:AccountListScene;
		public constructor(setting?:any) {
			super(setting);
			this.presenter = new AccountListPresenter(this);
			AccountListScene.selfObject = this;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
        private onAddToStage(evt:egret.Event){
            this.initStyle();
			this.drawAccounts();
        }
		private drawAccounts():void{
			let accounts = this.extraData;
			let contentTop = this.getTitleHeight();
			let cellWidth = (this.stage.stageWidth - this.setting.contentPadding * 2 -(this.setting.columnCount - 1)) / this.setting.columnCount;
			accounts.forEach((val,index)=>{
				let account:Models.IconItem = val;
				let accountIcon:GameScenes.utils.IconItemUI = new GameScenes.utils.IconItemUI(account, AccountListScene.selfObject.setting.iconItemSetting);
				accountIcon.x = AccountListScene.selfObject.setting.contentPadding + cellWidth * (index % AccountListScene.selfObject.setting.columnCount) + (cellWidth - AccountListScene.selfObject.setting.iconItemSetting.iconWidth) / 2;
				accountIcon.y = AccountListScene.selfObject.setting.rowHeight * Math.floor(index / AccountListScene.selfObject.setting.columnCount) + contentTop;
				AccountListScene.selfObject.addChild(accountIcon);
			});
		}
	}
}