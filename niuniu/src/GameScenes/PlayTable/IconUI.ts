module GameScenes.PlayTable {
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
            if (this.setting.iconName == "系统庄_png") {
                this.icon.y = this.setting.top + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            } else {
                this.icon.y = this.setting.top+24;
            }
        }
    }
}