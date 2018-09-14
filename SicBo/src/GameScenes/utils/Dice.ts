module GameScenes.utils {
	export class Dice extends egret.DisplayObjectContainer{
		private diceWidth:number;
		private style:string;
		public constructor(value:number,diceWidth?:number,style?:string){
			super();
			this.value = value;
			this.style = style;
			if(diceWidth)
				this.diceWidth = diceWidth;
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public onAddToStage(evt:egret.Event){
			let picName = "dice_"+this.value.toString();
			if(this.style)
				picName += "_" + this.style;
			picName += "_png";
			this.pic = CommonUtils.BitmapUtils.createBitmapByName(picName);
			if(this.diceWidth > 0){
				this.pic.width = this.diceWidth;
				this.pic.height = this.diceWidth;
			}
			this.addChild(this.pic);
		}
		private pic:egret.Bitmap;
		private value:number;
		public setValue(value:number){
			this.value = value;
			this.reDraw();
		}
		private reDraw(){
			this.removeChild(this.pic);
			let picName = "dice_"+this.value.toString()+"_png";
			this.pic = CommonUtils.BitmapUtils.createBitmapByName(picName);
			this.addChild(this.pic);
		}
	}
}