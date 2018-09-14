module GameScene {
    export class IconUI extends egret.DisplayObjectContainer {
        private setting: Settings.SingleIconSetting;
        public icon: egret.Bitmap;
        public constructor(setting: Settings.SingleIconSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            this.cacheAsBitmap = true;

            this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.icon);
            this.icon.x = this.setting.left;
            this.icon.y = this.setting.top;
           
        }
    }
}