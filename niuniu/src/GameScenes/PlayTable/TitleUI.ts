declare function NativeClose();
declare function ocClick();
module GameScenes.PlayTable {
    export class TitleUI extends egret.DisplayObjectContainer {
        private setting: Settings.TitleSetting;
        private issueTF: egret.TextField;
        private title: egret.TextField;
        private backBtn: egret.Bitmap;
        private TITLEPADDING: number;
        public constructor(setting: Settings.TitleSetting) {
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        }
        private onAddToStage() {
            if (this.stage.stageHeight ==1624) {//iphoneX的特殊处理
                this.TITLEPADDING = 24;
            } else {
                this.TITLEPADDING = 0;
            }
            this.drawBg();
            this.drawTitle();
            this.drawIssueTF();
            this.drawBackBtn();

        }

        private drawBg() {
            let bg = new egret.Shape();
            bg.graphics.beginFill(this.setting.titleBgColor, this.setting.titleBgAlpha);
            bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.setting.titleHeight+this.TITLEPADDING);
            bg.graphics.endFill();
            this.addChild(bg);
        }
        private drawTitle() {
            this.title = new egret.TextField();
            this.title.size = this.setting.textSize;
            this.title.textColor = this.setting.textColor;
            this.title.textAlign = egret.HorizontalAlign.CENTER;
            this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.title.fontFamily = this.setting.font;
            this.title.text = this.setting.titleText;
            this.title.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.title.width) / 2;
            this.title.y = this.setting.top+this.TITLEPADDING;

            this.addChild(this.title);
        }
        private drawIssueTF() {
            this.issueTF = new egret.TextField();
            this.addChild(this.issueTF);
            this.issueTF.size = this.setting.text1Size;
            this.issueTF.textColor = this.setting.text1Color;
            this.issueTF.textAlign = egret.HorizontalAlign.CENTER;
            this.issueTF.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.issueTF.fontFamily = this.setting.font;
            this.issueTF.text = " ";
            this.issueTF.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.issueTF.width) / 2
            this.issueTF.y = this.setting.top + this.title.height + this.setting.padding+this.TITLEPADDING;
        }
        private drawBackBtn() {
            this.cacheAsBitmap = true;
            this.backBtn = CommonUtils.BitmapUtils.createBitmapByName("nav-arrow_png");
            this.addChild(this.backBtn);
            this.backBtn.touchEnabled = true;
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                console.log(`back btn tapped.`)
                NativeClose();
                ocClick();
                Server.Connector.getGameClient().close();
            }, this);
            this.backBtn.x = 0;
            this.backBtn.y = 0+this.TITLEPADDING;
        }
        public setTssue(text: string) {
            this.issueTF.text = "";
            this.issueTF.text = "第" + text + "期";
            this.issueTF.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.issueTF.width) / 2
            this.issueTF.y = this.setting.top + this.title.height + this.setting.padding+this.TITLEPADDING;
        }
    }
}