module GameScenes.utils {
	export class AccountItemUI extends egret.DisplayObjectContainer{
		private account:Models.IconItem;
		private iconImage:egret.Bitmap;
		private iconMask:egret.Shape;
		private setting:Settings.AccountListSetting;
		private index:number;
		private static DEFAULT_ACCOUNT_ICON:string = "icon_default_account_png";
		public constructor(account:any,setting:Settings.AccountListSetting){
			super();
			this.account = account;
			this.setting = setting;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			if(this.account.UserHeadImageUrl){
				let imageLoader:egret.ImageLoader = new egret.ImageLoader();
				imageLoader.crossOrigin = "anonymous";
				imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadCompleted,this);
				imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onImageLoadError,this);
				imageLoader.load(this.account.UserHeadImageUrl);
			}else{
				this.drawAccountIcon(CommonUtils.BitmapUtils.createBitmapByName(AccountItemUI.DEFAULT_ACCOUNT_ICON));
			}
			this.showAccountData();
		}
		private onImageLoadError(error:egret.IOErrorEvent){
			let defaultIcon = CommonUtils.BitmapUtils.createBitmapByName("icon_default_account_png");
			this.drawAccountIcon(defaultIcon);
		}
		private onLoadCompleted(evt:egret.Event):void{
			let imageLoader = <egret.ImageLoader>(evt.currentTarget);
			let texture = new egret.Texture();
			texture._setBitmapData(imageLoader.data);
			this.drawAccountIcon(new egret.Bitmap(texture));
		}
		private setIconBitmap(bitmap:egret.Bitmap){
			this.iconImage = bitmap;
			this.iconImage.width = this.setting.iconRadius * 2;
			this.iconImage.height = this.setting.iconRadius * 2;

			this.iconMask = new egret.Shape;
			this.iconMask.graphics.beginFill(0x000000);
			this.iconMask.graphics.drawCircle(this.setting.iconRadius,this.setting.iconRadius,this.setting.iconRadius);
			this.iconMask.graphics.endFill();
			this.iconImage.mask = this.iconMask;
		}

		private showAccountData(){
			let txtNickname = new egret.TextField;
			txtNickname.size = this.setting.textSize;
			txtNickname.textColor = this.setting.textColor;
			txtNickname.fontFamily = this.setting.font;
			txtNickname.width = this.setting.iconRadius * 2;
			txtNickname.textAlign = egret.HorizontalAlign.CENTER;
			txtNickname.y = this.setting.iconRadius * 2 + 10;
			txtNickname.text = this.account.UserName;
			this.y = 0;
			this.addChild(txtNickname);
		}
		private drawAccountIcon(bitmap:egret.Bitmap){
			this.setIconBitmap(bitmap);
			this.addChild(this.iconMask);
			this.addChild(this.iconImage);
		}
		public getAccount():Models.IconItem{
			return this.account;
		}
	}
}