module GameScenes.PlayTable{
    export class AccountGoldContainer extends egret.DisplayObjectContainer{
        private txtVal:string;
        private txtField:egret.TextField;
        private bg:egret.Shape;
        private icon:egret.Bitmap;
        private settings:Settings.GoldContainerSetting;
        public constructor(goldContainerSetting:Settings.GoldContainerSetting){
            super();
            this.settings = goldContainerSetting;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(evt:egret.Event){
            this.init();
        }
        private init(){
            var scale = this.parent.width / Settings.GameSettingUtils.gameSetting.globalWidth;
            var radius = this.settings.containerHeight * scale / 2;
            var padding = 10 * scale;
            var iconwidth = 15 * scale;

            // 创建文本框
            this.txtField = new egret.TextField;
            this.addChild(this.txtField);
            this.txtField.fontFamily = this.settings.font;
            this.txtField.textColor = this.settings.textColor;
            this.txtField.size = this.settings.textSize * scale;
            this.txtField.text = " ";
            this.txtField.x = radius + iconwidth + padding;
            this.txtField.y = radius - this.txtField.height / 2;
            

            // 绘制底纹
            this.bg = new egret.Shape;
            this.bg.graphics.beginFill(this.settings.bgColor,this.settings.bgAlpha);
            this.bg.graphics.drawArc(radius,radius,radius, - Math.PI / 2, Math.PI / 2, true);
            this.bg.graphics.drawRect(radius,0,iconwidth + this.txtField.width, radius * 2);
            this.bg.graphics.drawArc(radius + iconwidth + this.txtField.width,radius,radius, Math.PI / 2, - Math.PI / 2,true);
            this.addChild(this.bg);
            this.x = this.settings.left * scale;
            this.y = this.settings.top * scale;
            // 绘制图标
            this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.settings.iconName);
            this.addChild(this.icon);
            this.icon.width = this.icon.width * scale;
            this.icon.height = this.icon.height * scale;
            this.icon.x = radius / 2;
            this.icon.y = radius - this.icon.height / 2;

        }
        public setText(txt:string):void{
            var scale = this.parent.width / Settings.GameSettingUtils.gameSetting.globalWidth;
            var radius = this.settings.containerHeight * scale / 2;
            var padding = 10 * scale;
            var iconwidth = 15 * scale;
            this.txtVal = txt;
            this.txtField.text = this.txtVal;
            this.removeChild(this.bg);
            this.bg = new egret.Shape;
            this.bg.graphics.beginFill(this.settings.bgColor,this.settings.bgAlpha);
            this.bg.graphics.drawArc(radius,radius,radius, - Math.PI / 2, Math.PI / 2, true);
            this.bg.graphics.drawRect(radius,0,iconwidth + this.txtField.width, radius * 2);
            this.bg.graphics.drawArc(radius + iconwidth + this.txtField.width,radius,radius, Math.PI / 2, - Math.PI / 2,true);
            this.addChild(this.bg);
            this.x = this.settings.left * scale;
            this.y = this.settings.top * scale;
        }
    }
}