module GameScene {
	export class MessagePanel extends egret.DisplayObjectContainer {
		private txt:egret.TextField;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE , this.onAddToStage, this);	
		}
		private onAddToStage(evt:egret.Event){
			let bg = new egret.Shape;
			bg.graphics.beginFill(0x6157ff);
			bg.graphics.drawRoundRect(0,0,610,92,15);
			bg.graphics.beginFill(0x000000);
			bg.graphics.drawRoundRect(5,5,600,82,15);
			bg.graphics.endFill();
			this.addChild(bg);
			this.txt = new egret.TextField();
			this.txt.width = bg.width;
			this.txt.height = bg.height;
			this.txt.x = bg.x;
			this.txt.y = bg.y;
			this.txt.textAlign = egret.HorizontalAlign.CENTER;
			this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.addChild(this.txt);
			this.txt.textColor = 0xFFFFFF;
			this.txt.size = 32;
		}
		public pop(msg:string,autoHide:boolean,onAutoHide:Function):void{	
			this.visible = true;
			this.parent.setChildIndex(this,-1);
			this.txt.text = msg;
			this.alpha = 1;
			if(autoHide){
				setTimeout(()=>{
					this.visible = false;
					if(onAutoHide)
						onAutoHide();
				},3000);
			}
		}
	}
}