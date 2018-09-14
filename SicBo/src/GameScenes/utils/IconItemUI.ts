module GameScenes.utils {
	export class IconItemUI extends egret.DisplayObjectContainer{
		private iconData:Models.IconItem;
		private iconImage:egret.Bitmap;
		private iconMask:egret.Shape;
		private setting:Settings.IconItemSetting;
		private index:number;
		public constructor(iconData:Models.IconItem,setting:Settings.IconItemSetting){
			super();
			this.iconData = iconData;
			this.setting = setting;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage,this);
		}
		private onAddToStage(evt:egret.Event){
			if(this.iconData.UserHeadImageUrl){
				let imageLoader:egret.ImageLoader = new egret.ImageLoader();
				imageLoader.crossOrigin = "anonymous";
				imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadCompleted,this);
				imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onImageLoadError,this);
				imageLoader.load(this.iconData.UserHeadImageUrl);
			}else{
				this.drawDefaultIcon();
			}
			this.showAccountData();
		}
		private drawDefaultIcon(){
			let defaultIcon = CommonUtils.BitmapUtils.createBitmapByName("icon_default_account_png");
			this.drawIcon(defaultIcon);
		}
		private onImageLoadError(error:egret.IOErrorEvent){
			this.drawDefaultIcon();
		}
		private onLoadCompleted(evt:egret.Event):void{
			let imageLoader = <egret.ImageLoader>(evt.currentTarget);
			let texture = new egret.Texture();
			texture._setBitmapData(imageLoader.data);
			this.drawIcon(new egret.Bitmap(texture));
		}
		private setIconBitmap(bitmap:egret.Bitmap){
			
			this.iconImage = bitmap;
			this.iconImage.width = this.setting.iconWidth;
			this.iconImage.height = this.setting.iconWidth;

			let radius = this.setting.iconWidth / 2;
			this.iconMask = new egret.Shape;
			this.iconMask.graphics.beginFill(0x000000);
			this.iconMask.graphics.drawCircle(radius,radius,radius);
			this.iconMask.graphics.endFill();
			this.iconImage.mask = this.iconMask;
		}

		private showAccountData(){
			let txtNickname = new egret.TextField;
			txtNickname.size = this.setting.textSize;
			txtNickname.textColor = this.setting.textColor;
			txtNickname.fontFamily = this.setting.font;
			txtNickname.width = this.setting.iconWidth;
			txtNickname.textAlign = egret.HorizontalAlign.CENTER;
			txtNickname.y = this.setting.iconWidth + 10;
			txtNickname.text = this.iconData.UserName;
			this.addChild(txtNickname);
		}
		private drawIcon(bitmap:egret.Bitmap){
			this.setIconBitmap(bitmap);
			this.addChild(this.iconMask);
			this.addChild(this.iconImage);
		}
		public getIconData():Models.IconItem{
			return this.iconData;
		}
	}
}