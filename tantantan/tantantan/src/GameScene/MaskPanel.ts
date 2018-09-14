module GameScene {
	export abstract class MaskPanel extends egret.DisplayObjectContainer {
		public enabled:boolean = true;
		private maskWidth:number;
		private maskHeight:number;
		protected maskAlpha:number;
		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		protected abstract drawPanel():void;
		protected getMaskWidth():number{
			return this.maskWidth;
		}
		protected getMaskHeight():number{
			return this.maskHeight;
		}
		private onAddToStage(event:egret.Event):void{
			let mask = new egret.Shape();
			this.addChild(mask);
			this.maskWidth = this.stage.stageWidth;
			this.maskHeight = this.stage.stageHeight;
			mask.graphics.beginFill(0x000000,this.maskAlpha);
			mask.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
			this.drawPanel();
		}
	}
}