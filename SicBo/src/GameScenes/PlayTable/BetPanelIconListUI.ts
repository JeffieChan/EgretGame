module GameScenes.PlayTable{
    export class BetPanelIconListUI extends egret.DisplayObjectContainer{
        private setting:Settings.BetPanelIconSetting;
        private icons:BetPanelIconUI[];
        private iconCount:number;
        private activatedIndex:number;
        public constructor(setting:Settings.BetPanelIconSetting,iconCount:number){
            super();
            this.setting = setting;
            this.iconCount = iconCount
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);        
        }
        private onAddToStage(evt:egret.Event){
            this.icons = [];
            for(let i = 0; i < this.iconCount; i++){
                this.icons[i] = new BetPanelIconUI(this.setting);
                this.addChild(this.icons[i]);
                this.icons[i].y = 0;
                this.icons[i].x = (this.setting.size + this.setting.iconPadding) * i;
            }
            this.y = this.setting.bottom;
            this.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.width) / 2;
            this.activatedIndex = 0;
            this.activateIcon();
        }
        private normalAllIcons(){
            this.icons.forEach((val)=>{
                val.unactivateIcon();
            });
        }
        private activateIcon(){
            this.normalAllIcons();
            if(this.activatedIndex < 0 || this.activatedIndex >= this.iconCount)
                return;
            this.icons[this.activatedIndex].activateIcon();
        }
        public activateLeft(){
            this.activatedIndex = (this.activatedIndex + this.iconCount + 1) % this.iconCount;
            this.activateIcon();
        }
        public activateRight(){
            this.activatedIndex = (this.activatedIndex + this.iconCount - 1) % this.iconCount;
            this.activateIcon();
        }
    }
    class BetPanelIconUI extends egret.DisplayObjectContainer{
        private setting:Settings.BetPanelIconSetting;
        private icon:egret.Shape;
        private state:number;
        public constructor(setting:Settings.BetPanelIconSetting){
            super();
            this.setting = setting;
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);        
        }
        private onAddToStage(evt:egret.Event){
            this.state == 0;
            this.drawIcon();
        }    
        private drawIcon(){
            this.icon = new egret.Shape;
            let alpha = this.state == 0?0.5:1;
            this.icon.graphics.beginFill(this.setting.color,alpha);
            if(this.setting.style == 0){
                let radius = this.setting.size / 2;
                this.icon.graphics.drawCircle(radius,radius,radius);
            }else{
                this.icon.graphics.drawRect(0,0,this.setting.size,this.setting.size);
            }
            this.icon.graphics.endFill();
            this.addChild(this.icon);
        }
        public activateIcon(){
            if(this.state == 1)
                return;
            this.state = 1;
            this.removeChild(this.icon);
            this.drawIcon();
        }
        public unactivateIcon(){
            if(this.state == 0)
                return;
            this.state = 0;
            this.removeChild(this.icon);
            this.drawIcon();
        }
    }
}