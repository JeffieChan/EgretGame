module GameScenes {
	export class RootScene extends egret.DisplayObjectContainer{
		protected setting:any;
		public constructor(setting?:any) {
			super();
			this.setting = setting;
		}
		protected initStyle(){
			this.drawBg();
		}
		private drawBg(){
			let bg = new egret.Shape;
			bg.graphics.beginFill(this.setting.bgColor);
			bg.graphics.drawRect(0,0,Settings.GameSettingUtils.gameSetting.globalWidth,Settings.GameSettingUtils.gameSetting.globalHeight);
			bg.graphics.endFill();
			this.addFixedChild(bg);
		}

        protected addFixedChild(child: egret.DisplayObject){
            this.addChild(child);
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = child.y * Settings.GameSettingUtils.globalScale;
        }

        protected addFixedToBottomChild(child: egret.DisplayObject){
            this.addChild(child);
            child.scaleX = Settings.GameSettingUtils.globalScale;
            child.scaleY = Settings.GameSettingUtils.globalScale;
            child.x = child.x * Settings.GameSettingUtils.globalScale;
            child.y = this.height - child.y * Settings.GameSettingUtils.globalScale;
        }
	}
}