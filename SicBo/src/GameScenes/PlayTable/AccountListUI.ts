module GameScenes.PlayTable{
	export class AccountListUI extends egret.DisplayObjectContainer{
		private setting:Settings.AccountListSetting;
		private currCount:number;
		private static readonly DISPLAY_COUNT:number = 5;
		public constructor(setting:Settings.AccountListSetting) {
			super();
			this.setting = setting;
			this.currCount = 0;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public showAccounts(accounts:Models.IconItem[]){
			this.removeAllAccounts();
			for(let i = 0; i < AccountListUI.DISPLAY_COUNT; i++){
				if(i < accounts.length){
					this.insertAccount(accounts[i]);
					continue;
				}
				this.insertAccount({ UserHeadImageUrl:"",UserName:"" })
			}
		}
		private onAddToStage(evt:egret.Event){
			this.x = this.setting.left;
			this.y = this.setting.top;
		}
		private removeDisplayAccount(accountItem:GameScenes.utils.AccountItemUI):boolean{
			for(var i = 0,j = 0; i < this.$children.length && j < AccountListUI.DISPLAY_COUNT;i++){
				var tmpObj = this.getChildAt(i);
				if(!(tmpObj instanceof GameScenes.utils.AccountItemUI)){
					continue;
				}
				var tmpAccountItem = <GameScenes.utils.AccountItemUI>(tmpObj);
				if(!(tmpAccountItem.getAccount().UserHeadImageUrl == accountItem.getAccount().UserHeadImageUrl && tmpAccountItem.getAccount().UserName == accountItem.getAccount().UserName)){
					j++;
					continue;
				}
				this.removeChild(tmpAccountItem);
				this.currCount -- ;
				return true;
			}
			return false;
		}
		private insertDisplayAccount(accountItem:GameScenes.utils.AccountItemUI){
			this.currCount++;
			this.addChild(accountItem);
		}
		public insertAccount(account:Models.IconItem){
			if(this.currCount >= AccountListUI.DISPLAY_COUNT){
				return;
			}
			let newAccountItem = new GameScenes.utils.AccountItemUI(account,this.setting);		
			newAccountItem.x = (this.setting.iconRadius * 2 + this.setting.distance) * this.currCount;
			this.insertDisplayAccount(newAccountItem);
		}
		public removeAccount(account:Models.IconItem){
			for(var i = this.$children.length - 1 ; i >= 0 ;i--){
				var tmpObj = this.getChildAt(i);
				if(!(tmpObj instanceof GameScenes.utils.AccountItemUI)){
					continue;
				}
				var accui:GameScenes.utils.AccountItemUI = tmpObj;
				if(accui.getAccount().UserName == account.UserName)
				{
					this.currCount--;
					this.removeChild(tmpObj);
					return true;
				}
			}
			return false;
		}
		private removeAllAccounts(){
			for(var i = this.$children.length - 1 ; i >= 0 ;i--){
				var tmpObj = this.getChildAt(i);
				if(!(tmpObj instanceof GameScenes.utils.AccountItemUI)){
					continue;
				}
				this.currCount--;
				this.removeChild(tmpObj);
			}
		}
	}
}