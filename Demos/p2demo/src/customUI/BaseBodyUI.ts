module CustomUI {
	export class BaseBodyUI extends p2.Body {
		protected baseDisplay:egret.Sprite;
		public showDisplay(container:egret.DisplayObjectContainer){
			if(!container.contains(this.baseDisplay)){
				container.addChild(this.baseDisplay);
				container.setChildIndex(this.baseDisplay,1);
			}
			let stagePos = Tool.CoordinateTool.worldPositionToStage({X:this.position[0],Y:this.position[1]})
			this.baseDisplay.x = stagePos.X;
			this.baseDisplay.y = stagePos.Y;
			this.baseDisplay.rotation = 180 * (-this.angle / Math.PI);
		}
	}
}