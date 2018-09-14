module CustomUI {
	export class PolygonBrickUI extends BrickUI {
		private points:number[][];
		private mc:egret.MovieClip;
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

			this.shape = new p2.Convex({ vertices: this.points });
			this.addShape(this.shape);

			// this.displayBg = new egret.Sprite();
			// this.displayBg.graphics.clear();
			// this.displayBg.graphics.beginFill(0x000000);
			// this.displayBg.graphics.moveTo(0,0);
			// for(let i = 0; i <= this.edgeCount ; i++){
			// 	let point = this.points[i % this.edgeCount];
			// 	let stagePos = {X:CommonUtils.CoordinateUtils.worldLengthToStage(point[0]),Y:CommonUtils.CoordinateUtils.worldLengthToStage(point[1])};
			// 	this.displayBg.graphics.lineTo(stagePos.X,stagePos.Y);
			// }
			// this.displayBg.graphics.endFill();

			let mcTexture = RES.getRes("polygon_"+this.edgeCount.toString()+"_png");
			let mcData = RES.getRes("polygon_"+this.edgeCount.toString()+"_json");
			let loadingDataFactory = new egret.MovieClipDataFactory(mcData,mcTexture);
			this.mc = new egret.MovieClip(loadingDataFactory.generateMovieClipData("polygon"));
			let scale = 1;
			let offsetRotation = 0;
			if(this.edgeCount == 4){
				scale = 0.7071;
				offsetRotation = -45;
				this.mc.anchorOffsetX = this.mc.width / 2;
				this.mc.anchorOffsetY = this.mc.height / 2;
			}else if(this.edgeCount == 3){
				scale = 0.866;
				offsetRotation = -30;
				this.mc.anchorOffsetX = this.mc.width / 2;
				this.mc.anchorOffsetY = this.mc.height / 1.5;
			}else if(this.edgeCount == 5){
				scale = 0.951;
				offsetRotation = 18;
				this.mc.anchorOffsetX = this.mc.width / 2;
				this.mc.anchorOffsetY = this.mc.height / 1.809;
			}			
			this.mc.scaleX =  CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * scale * 2) / this.mc.width ;
			this.mc.scaleY =  CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * scale * 2) / this.mc.width ;
			this.baseDisplay = new egret.Sprite();
			this.baseDisplay.addChild(this.mc);
			this.mc.rotation = offsetRotation;
			this.mc.gotoAndStop(this.life);
			this.displays = [this.baseDisplay];
		}
		protected redrawBg():void{
			this.mc.gotoAndStop(this.life);
		}
	}
}