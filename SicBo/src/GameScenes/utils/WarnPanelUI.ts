module GameScenes.utils {
	export class MessagePanelUI extends egret.DisplayObjectContainer{
        private PanelWidth:number = 486;
        private PanelHeight:number = 280;
        private PanelRadius:number = 30;
        private TextSize:number = 20;
        private TextColor:number = 0xFFFFFF;
        private ShowSeconds:number = 1;
        private OffsetY:number = 0;
        private inited:boolean;
        private bg:egret.Shape;
        private txtMsg:egret.TextField;
        private container:egret.DisplayObjectContainer;
        public constructor(container:egret.DisplayObjectContainer,panelWidth?:number,panelHeight?:number,panelRadius?:number,textSize?:number,showSeconds?:number,offsetY?:number){
            super();
            this.inited = false;
            this.container = container;
            if(panelWidth) this.PanelWidth = panelWidth;
            if(panelHeight) this.PanelHeight = panelHeight;
            if(panelRadius) this.PanelRadius = panelRadius;
            if(textSize) this.TextSize = textSize;
            if(showSeconds) this.ShowSeconds = showSeconds;
            if(offsetY) this.OffsetY = offsetY;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage,this);
        }
        public show(message:any,isTextFlow?:boolean,delaySeconds?:number){
            if(this.container.contains(this))
                return;
            this.container.addChild(this);
            this.alpha = 0;
            if(!isTextFlow)
                this.txtMsg.text = message;
            else
                this.txtMsg.textFlow = message;
            let self = this;
            let delay = this.ShowSeconds;
            if(delaySeconds)
                delay = delaySeconds;
            egret.Tween.get(this).to({alpha:1},200).wait(delay * 1000).to({alpha:0},200).call(function(){self.hide()},self);
        }
        public hide(){
            if(this.container.contains(this)){
                this.container.removeChild(this);
            }
        }
        private onAddToStage(){
            this.createControls();
        }
        private createControls(){
            if(this.inited)
                return;
            this.bg = new egret.Shape();
            this.bg.graphics.beginFill(0x222020,0.8);
            this.bg.graphics.drawRoundRect(0,0,this.PanelWidth,this.PanelHeight,this.PanelRadius,this.PanelRadius);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            
            this.txtMsg = new egret.TextField;
            this.txtMsg.textColor = this.TextColor;
            this.txtMsg.size = this.TextSize;
            this.txtMsg.width = this.PanelWidth;
            this.txtMsg.height = this.PanelHeight;
            this.txtMsg.textAlign = egret.HorizontalAlign.CENTER;
            this.txtMsg.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.x = (this.container.width - this.PanelWidth) / 2;
            this.y = (this.container.height - this.PanelHeight) / 2 + this.OffsetY;
            this.addChild(this.txtMsg);

            this.inited = true;
        }
    }
}