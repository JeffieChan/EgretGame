module CustomUI {
	export class PolygonBrickUI extends BrickUI {
		private points:number[][];
		public constructor(life:number, edgeCount:number) {
			super(life,edgeCount);
			this.edgeCount = Math.floor(edgeCount);
			if(this.edgeCount < 3 || this.edgeCount > 6){
				console.error("多边形砖块的边数量必须在 3 - 6 之间");
				return;
			}
		}
		protected buildShapeAndDisplay():void{
			let ratio:number = ( Math.PI * 2 ) / this.edgeCount;
			this.points = [];
			for(let i = 0; i < this.edgeCount; i ++){
				let sin = Math.sin(ratio * i);
				let cos = Math.cos(ratio * i);
				this.points[i] = [cos * GameSetting.BrickSetting.Radius,sin * GameSetting.BrickSetting.Radius];
			}

			this.shape = new p2.Convex(this.points,[0,0]);
			this.addShape(this.shape);
			this.baseDisplay = new egret.Sprite();
			this.displayBg = new egret.Shape();
			this.redrawBg();
			this.baseDisplay.addChild(this.displayBg);
			this.displays = [this.baseDisplay];
		}
		protected redrawBg():void{
			this.displayBg.graphics.clear();
			this.displayBg.graphics.beginFill(this.buildColorForLife());
			this.displayBg.graphics.moveTo(0,0);
			for(let i = 0; i <= this.edgeCount ; i++){
				let point = this.points[i % this.edgeCount];
				let stagePos = {X:Tool.CoordinateTool.worldLengthToStage(point[0]),Y:Tool.CoordinateTool.worldLengthToStage(point[1])};
				this.displayBg.graphics.lineTo(stagePos.X,stagePos.Y);
			}
			this.displayBg.graphics.endFill();
		}
	}
}