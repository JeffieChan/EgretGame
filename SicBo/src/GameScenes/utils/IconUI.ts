module GameScenes.utils{
    export class IconUI extends egret.DisplayObjectContainer{
        private setting: Settings.SingleIconSetting;
        public constructor(iconSetting:Settings.SingleIconSetting){
            super();
            this.setting = iconSetting;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage(evt:egret.Event){
            let icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(icon);
            this.x = this.setting.left;
            this.y = this.setting.top;

        }
    }
}