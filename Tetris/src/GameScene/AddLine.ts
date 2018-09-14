module GameScene {
	export class AddLine extends RootScene {

		private bricks: egret.Bitmap[];
		private brickContainer: BrickContainer;
		public constructor(brickContainer: BrickContainer) {
			super();
			this.brickContainer = brickContainer;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		private onAddToStage() {
			this.buildBricks();
			this.resetShapePosition();
			this.addBricksIntoContainer();
		}
		private resetShapePosition(): void {
			this.x = Settings.BrickSettings.brickWidth;
			this.y = (Settings.BrickSettings.rows - 1) * Settings.BrickSettings.brickWidth;
		}

		private addBricksIntoContainer(): void {
			for (let i = 1; i < this.bricks.length+1; i++) {
				this.brickContainer.addLineBrick(i,this.bricks[i-1]);
			};
			this.brickContainer.removeChild(this);
		}

		private buildBricks(): void {
			this.bricks = [];
			for (var i = 0; i < Settings.BrickSettings.cols - 2; i++) {
				let shp = CommonUtils.BitmapUtils.createBitmapByName("方块1_png");

				this.bricks.push(shp);
			}
			this.bricks.forEach((val, col) => {
				val.x = col * Settings.BrickSettings.brickWidth;
				this.addChild(val);
			});
		}

	}
}