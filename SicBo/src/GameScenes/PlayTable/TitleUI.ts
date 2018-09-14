module GameScenes.PlayTable{
    export class TitleUI extends egret.DisplayObjectContainer{
        private setting:Settings.TitleSetting;
        private rightIconTapEvent:()=>void;
        private icon:egret.Bitmap;
        public constructor(titleSetting:Settings.TitleSetting){
            super();
            this.setting = titleSetting;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage(evt:egret.Event):void{
            var fullWidth = Settings.GameSettingUtils.gameSetting.globalWidth;
            let bg = new egret.Shape;
            bg.graphics.beginFill(this.setting.titleBgColor,this.setting.titleBgAlpha);
            bg.graphics.drawRect(0,0,fullWidth,this.setting.titleHeight);
            bg.graphics.endFill();
            this.addChild(bg);

            let txtTitle = new egret.TextField;
            txtTitle.text = this.setting.titleText;
            txtTitle.textColor = this.setting.textColor;
            txtTitle.size = this.setting.textSize;
            txtTitle.textAlign = egret.HorizontalAlign.CENTER;
            txtTitle.x = (fullWidth - txtTitle.width) / 2;
            txtTitle.y = (this.setting.titleHeight - txtTitle.height) / 2;
            txtTitle.fontFamily = this.setting.font;
            this.addChild(txtTitle);

            this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.rightIconName);
            this.icon.y = (this.setting.titleHeight - this.icon.height)  / 2;
            this.icon.x = (fullWidth - this.icon.width - this.setting.rightPadding);
            this.addChild(this.icon);
            this.icon.touchEnabled = true;
        }
        public setRightIconTapEvent(handle:()=>void){
            if(this.rightIconTapEvent){
                this.icon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.rightIconTapEvent, this);
            }
            this.rightIconTapEvent = handle;
            this.icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightIconTapEvent, this);
        }
    }
}