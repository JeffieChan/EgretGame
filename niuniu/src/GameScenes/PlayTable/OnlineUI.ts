module GameScenes.PlayTable {
    export class OnlineUI extends egret.DisplayObjectContainer {
        private setting: Settings.OnlineIconSetting;
        public icon: egret.Bitmap;
        protected txt: egret.TextField;
        public constructor(setting: Settings.OnlineIconSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            this.cacheAsBitmap = true;
            this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.icon);
            this.icon.x = this.setting.left;
            this.icon.y = this.setting.top+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;

            this.txt = new egret.TextField();
            this.addChild(this.txt);
            this.txt.textAlign = egret.HorizontalAlign.CENTER;
            this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.txt.size = this.setting.textSize;
            this.txt.fontFamily =  this.setting.font;
            this.txt.textColor = this.setting.textColor;
            this.txt.text = "在线" + "\n" + "0";
            this.txt.width = this.icon.width;
            this.txt.x = this.icon.x + (this.icon.width - this.txt.width) / 2;
            this.txt.y = this.icon.y + (this.icon.height - this.txt.height) / 2;
            // this.visible = false;

        }
        public setOnlinePeoples(count: number) {
            this.txt.text = "";
            this.txt.text = "在线" + "\n" + count.toString();
            this.txt.x = this.icon.x + (this.icon.width - this.txt.width) / 2;
            this.txt.y = this.icon.y + (this.icon.height - this.txt.height) / 2;
        }
    }
}