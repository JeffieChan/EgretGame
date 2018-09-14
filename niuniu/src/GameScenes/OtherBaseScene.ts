module GameScenes {
    export class OtherBaseScene extends egret.DisplayObjectContainer {
        protected setting: any;
        public constructor(setting?: any) {
            super();
            this.setting = setting;
        }

        protected initStyle() {
            this.drawBg();

        }
        private drawBg() {
            let bg = new egret.Shape();
            bg.graphics.beginFill(this.setting.bgColor, this.setting.alpha);
            bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.addFixedChild(bg);
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName(this.setting.icon);
            
            this.addFixedChild(bitmap);
            bitmap.x = ((Settings.GameSettingUtils.gameSetting.globalWidth - bitmap.width) / 2)*Settings.GameSettingUtils.globalScale;
            bitmap.y = ((this.stage.stageHeight - bitmap.height) / 2)*Settings.GameSettingUtils.globalScale;
        }
        protected addFixedChild(child: egret.DisplayObject) {
            this.addChild(child);
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = child.y * Settings.GameSettingUtils.globalScale;
        }
        protected addFixedToBottomChild(child: egret.DisplayObject) {
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = this.height - child.y * Settings.GameSettingUtils.globalScale;

        }
    }
}