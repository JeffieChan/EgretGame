module GameScenes.PlayTable {
    export class Alert extends egret.DisplayObjectContainer {
        private setting: Settings.AlertSetting;
        private bg: egret.Bitmap;
        public bitmapText: egret.BitmapText;
        private startBitmap: egret.Bitmap;
        private stopBitmap: egret.Bitmap;
        public constructor(setting: Settings.AlertSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {
            this.drawBg();
            this.initFont();
       
        }
        private drawBg() {
            this.cacheAsBitmap = true;
            this.bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.bg);
            this.bg.x = this.setting.left;
            this.bg.y = (Settings.GameSettingUtils.gameSetting.globalHeight - this.bg.height) / 2+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private initFont() {
            this.bitmapText = new egret.BitmapText();
            this.addChild(this.bitmapText);
            this.bitmapText.font = CommonUtils.BitmapFontUtils.createBitmapFontByName(this.setting.fontName);
            this.bitmapText.text = ""
            this.bitmapText.x = (this.bg.width - this.bitmapText.width) / 2;
            this.bitmapText.y = this.bg.y + (this.bg.height - this.bitmapText.height) / 2;

            this.startBitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.startIconName);
            this.addChild(this.startBitmap);
            this.startBitmap.visible = false;
            this.stopBitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.stopIconName);
            this.addChild(this.stopBitmap);
            this.stopBitmap.visible = false;
        }

        public showBitmapTextContent(text: string, second?: number) {
            this.startBitmap.visible = false;
            this.stopBitmap.visible = false;
            this.bitmapText.text = "";
            if (second) {
                this.bitmapText.text = text + second.toString() ;

            } else {
                this.bitmapText.text = text ;

            }
            this.bitmapText.x = (this.bg.width - this.bitmapText.width) / 2;
            this.bitmapText.y = this.bg.y + (this.bg.height - this.bitmapText.height) / 2;
        }
        public showStartBet() {
            this.startBitmap.visible = true;
            this.stopBitmap.visible = false;
            this.bitmapText.text = "";
           
            this.startBitmap.x = (this.bg.width - this.startBitmap.width) / 2;
            this.startBitmap.y = this.bg.y + (this.bg.height - this.startBitmap.height) / 2;
        }
        public showStopBet() {
            this.startBitmap.visible = false;
            this.stopBitmap.visible = true;
            this.bitmapText.text = "";


            this.stopBitmap.x = (this.bg.width - this.stopBitmap.width) / 2;
            this.stopBitmap.y = this.bg.y + (this.bg.height - this.stopBitmap.height) / 2;
        }
    }
}