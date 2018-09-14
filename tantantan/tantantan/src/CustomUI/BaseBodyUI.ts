module CustomUI {
	export class BaseBodyUI extends p2.Body {
		protected baseDisplay: egret.Sprite;
		public clientId:any;
		protected offsetRotation:number = 0
		public showDisplay(container: egret.DisplayObjectContainer,anmit:boolean,childIndex?:number) {
			if (!container.contains(this.baseDisplay)) {
				container.addChild(this.baseDisplay);
			}
			if(childIndex){
				container.setChildIndex(this.baseDisplay,childIndex);
			}else{
				container.setChildIndex(this.baseDisplay,2);
			}
			let stagePos = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
			if(!anmit)
			{
				this.baseDisplay.alpha = 1;
			}else{
				this.baseDisplay.alpha = 0;
				egret.Tween.get(this.baseDisplay).to({alpha:1},300);
			}

			this.baseDisplay.x = stagePos.X;
			this.baseDisplay.y = stagePos.Y;
			this.baseDisplay.rotation = 180 * (-this.angle / Math.PI) + this. offsetRotation;
			this.displays = [this.baseDisplay];
		}
		public resetDisplayPosition(anmit?: boolean) {
			let stagePos = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
			if (anmit) {
				egret.Tween.get(this.baseDisplay).to({x:stagePos.X,y:stagePos.Y,rotation:180 * (-this.angle / Math.PI)},300);
				return;
			} else {
				this.baseDisplay.x = stagePos.X;
				this.baseDisplay.y = stagePos.Y;
				this.baseDisplay.rotation = 180 * (-this.angle / Math.PI);
				return;
			}
		}
	}
}