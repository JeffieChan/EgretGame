module GameScene {
	export class BrickShape extends RootScene {
		private static shapesTypes: string[] = ["方块2_png", "方块5_png", "方块4_png", "方块3_png", "方块6_png", "方块8_png", "方块7_png"];

		private static shapesSetting: any = [
			// Line
			[
				[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
				, [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
				, [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
				, [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
			]
			// Z 
			, [
				[[1, 1, 0], [0, 1, 1], [0, 0, 0]]
				, [[0, 0, 1], [0, 1, 1], [0, 1, 0]]
				, [[1, 1, 0], [0, 1, 1], [0, 0, 0]]
				, [[0, 0, 1], [0, 1, 1], [0, 1, 0]]
			]
			// RZ
			, [
				[[0, 1, 1], [1, 1, 0], [0, 0, 0]]
				, [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
				, [[0, 1, 1], [1, 1, 0], [0, 0, 0]]
				, [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
			]
			// T
			, [
				[[0, 1, 0], [1, 1, 1], [0, 0, 0]]
				, [[0, 1, 0], [0, 1, 1], [0, 1, 0]]
				, [[0, 0, 0], [1, 1, 1], [0, 1, 0]]
				, [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
			]
			// 7
			, [
				[[1, 1, 0], [0, 1, 0], [0, 1, 0]]
				, [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
				, [[0, 1, 0], [0, 1, 0], [0, 1, 1]]
				, [[1, 1, 1], [1, 0, 0], [0, 0, 0]]
			]
			// R7
			, [
				[[0, 1, 1], [0, 1, 0], [0, 1, 0]]
				, [[1, 1, 1], [0, 0, 1], [0, 0, 0]]
				, [[0, 1, 0], [0, 1, 0], [1, 1,]]
				, [[1, 0, 0], [1, 1, 1], [0, 0, 0]]
			]
			// Rect
			, [
				[[1, 1], [1, 1]]
				, [[1, 1], [1, 1]]
				, [[1, 1], [1, 1]]
				, [[1, 1], [1, 1]]
			]
		];

		private bricks: egret.Bitmap[];
		private shadowBricks: egret.Bitmap[];
		private direction: number;
		private style: number;
		private rowIndex: number;
		private columnIndex: number;
		private brickContainer: BrickContainer;
		public isMoved: boolean = false;
		private step: number = 0;
		private shadowPositionList: number[][];
		private downInterval = 1000;
		private fastDownInterval = 200;
		private downDis: number;
		private downTimeout: number;
		private fastDownTimeout: number;
		private moveLeftTimeout: number;
		private moveRightTimeout: number;
		private freezed: boolean = false;
		private areaType: number;//0代表游戏区域 1预测区域

		public onFreezeHandle: Function;

		public constructor(style: number, areaType: number, row?: number, column?: number, brickContainer?: BrickContainer) {
			super();
			this.areaType = areaType;
			this.direction = 0;
			this.style = style;
			this.rowIndex = row;
			this.columnIndex = column;
			this.brickContainer = brickContainer;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		public turn(): void {

			if (!this.canTurn((this.direction + 1) % 4)) {
				return;
			}
			this.direction = (this.direction + 1) % 4;


			for (let i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
				let row = BrickShape.shapesSetting[this.style][this.direction][i];
				for (let j = 0; j < row.length; j++) {
					let cell = row[j];
					if (cell == 0) {
						continue;
					}
					while (this.columnIndex + j < 0) {
						CommonUtils.LoggerUtil.log('旋转后向右一格');
						this.columnIndex++;
					}
					while (this.columnIndex + j > this.brickContainer.columnCount - 1) {
						CommonUtils.LoggerUtil.log('旋转后向左一格');
						this.columnIndex--;
					}
				}
			};

			this.resetBricksPosition();
			this.resetShapePosition();
			this.showShadow();


		}
		public moveLR(step: number): void {
			let totalStep = step;
			while (totalStep != 0) {
				if (!this.canMoveLR(totalStep > 0 ? 1 : -1)) {
					break;
				}
				this.columnIndex += totalStep > 0 ? 1 : -1;
				this.fixPosition();
				CommonUtils.LoggerUtil.log(`after check : this.column = ${this.columnIndex} , step = ${step}`);
				this.resetShapePosition();
				totalStep += totalStep > 0 ? -1 : 1;
			}
			this.showShadow();
		}

		public startDown(): void {
			this.showShadow();
			this.down();
			this.downTimeout = egret.setTimeout(() => { this.startDown() }, this, this.downInterval);
		}

		public stopDown(): void {
			egret.clearTimeout(this.downTimeout);
		}

		public moveToBottom() {//直接到最终位置
			this.rowIndex += this.downDis;
			this.resetShapePosition();
			this.freeze();
		}
		private down(): void {
			if (!this.canDown()) {
				this.freeze();
				return;
			}
			this.rowIndex++;
			this.resetShapePosition();
			this.showShadow();
		}

		public startFastDown() {
			this.down();
			this.fastDownTimeout = egret.setTimeout(() => { this.startFastDown(); }, this, this.fastDownInterval);
		}
		public stopFastDown() {
			egret.clearTimeout(this.fastDownTimeout);
		}
		public pause() {
			egret.clearTimeout(this.downTimeout);
		}
		public resume() {
			this.downTimeout = egret.setTimeout(() => { this.startDown() }, this, this.downInterval);

		}
		public startMoveLeft() {
			this.moveLR(-1);
			this.moveLeftTimeout = egret.setTimeout(() => { this.startMoveLeft(); }, this, this.fastDownInterval);

		}
		public stopMoveLeft() {
			egret.clearTimeout(this.moveLeftTimeout);
		}
		public startMoveRight() {
			this.moveLR(1);
			this.moveRightTimeout = egret.setTimeout(() => { this.startMoveRight(); }, this, this.fastDownInterval);

		}
		public stopMoveRight() {
			egret.clearTimeout(this.moveRightTimeout);
		}

		private canDown(): boolean {

			for (let i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
				let row = BrickShape.shapesSetting[this.style][this.direction][i];
				for (let j = 0; j < row.length; j++) {
					let cell = row[j];
					if (cell == 0) {
						continue;
					}
					CommonUtils.LoggerUtil.log(`this.rowIndex + row + 1 = ${this.rowIndex + i + 1}`);
					let nr = this.rowIndex + i + 1;
					if (nr >= this.brickContainer.rowCount) {
						CommonUtils.LoggerUtil.log("到底啦");
						return false;
					}
					let downBrickValue = this.brickContainer.getBrickValue(nr, j + this.columnIndex);
					CommonUtils.LoggerUtil.log(`down brick value is ${nr}, ${j}, ${downBrickValue}`);
					if (downBrickValue >= 0) {
						CommonUtils.LoggerUtil.log("下面是个砖块");
						return false;
					}

				}
			};

			return true;
		}


		private canMoveLR(step: number): boolean {
			for (let i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
				let row = BrickShape.shapesSetting[this.style][this.direction][i];
				for (let j = 0; j < row.length; j++) {
					let cell = row[j];
					if (cell == 0) {
						continue;
					}
					let nc = this.columnIndex + j + step;

					let nextBrickValue = this.brickContainer.getBrickValue(this.rowIndex + i, nc);
					CommonUtils.LoggerUtil.log(`next brick value is ${nc}, ${i}, ${nextBrickValue}`);
					if (nextBrickValue >= 0) {
						CommonUtils.LoggerUtil.log("左右面是个砖块");
						return false;
					}

				}
			};
			return true;
		}
		private fixPosition() {
			let offset = 0;
			for (let i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
				let row = BrickShape.shapesSetting[this.style][this.direction][i];
				for (let j = 0; j < row.length; j++) {
					let cell = row[j];
					if (cell == 0) {
						continue;
					}
					if (this.columnIndex + j < 0) {
						offset = Math.min(offset, this.columnIndex + j);
					}
					if (this.columnIndex + j >= this.brickContainer.columnCount - 1) {
						offset = Math.max(offset, (this.columnIndex + j) - this.brickContainer.columnCount + 1);
					}
				}
			};
			this.columnIndex -= offset;
		}

		private canTurn(direction: number): boolean {
			for (let i = 0; i < BrickShape.shapesSetting[this.style][direction].length; i++) {
				let row = BrickShape.shapesSetting[this.style][direction][i];
				for (let j = 0; j < row.length; j++) {
					let cell = row[j];
					if (cell == 0) {
						continue;
					}

					let nr = this.rowIndex + i;
					if (nr >= this.brickContainer.rowCount - 1) {//旋转后超过底部不能旋转
						return false;
					}

					while (this.columnIndex + j < 0) {
						CommonUtils.LoggerUtil.log('旋转后向右一格');
						this.columnIndex++;
					}
					while (this.columnIndex + j > this.brickContainer.columnCount - 1) {
						CommonUtils.LoggerUtil.log('旋转后向左一格');
						this.columnIndex--;
					}

					let downBrickValue = this.brickContainer.getBrickValue(nr, j + this.columnIndex);
					if (downBrickValue >= 0) {//这个位置已经有方块
						return false;
					}
					let nc = this.columnIndex + j;

					let nextBrickValue = this.brickContainer.getBrickValue(this.rowIndex + i, nc);
					if (nextBrickValue >= 0) {//这个位置已经有方块
						return false;
					}

				}
			};
			return true;
		}

		private freeze(): void {
			if (this.freezed) {
				return;
			}
			this.freezed = true;
			CommonUtils.LoggerUtil.log("冻结砖块");
			CommonUtils.LoggerUtil.log("将内部砖块加入到container");
			this.addBricksIntoContainer();
			this.stopFastDown();
			this.stopDown();
			if (this.onFreezeHandle)
				this.onFreezeHandle();
		}
		private addBricksIntoContainer(): void {

			let brickIndex = 0;
			for (let i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
				let row = BrickShape.shapesSetting[this.style][this.direction][i];
				for (let j = 0; j < row.length; j++) {
					let cell = row[j];
					if (cell == 0) {
						continue;
					}
					let bcRow = this.rowIndex + i;
					let bcColumn = this.columnIndex + j;

					this.brickContainer.addBrick(bcRow, bcColumn, this.style, this.bricks[brickIndex]);
					brickIndex++;
				}
			};
			this.brickContainer.removeChild(this);
		}

		private showShadow(): void {
			this.findShadow();
			this.shadowPositionList.forEach((pos, index) => {
				this.shadowBricks[index].x = pos[0] * Settings.BrickSettings.brickWidth;
				this.shadowBricks[index].y = pos[1] * Settings.BrickSettings.brickWidth;
			});
		}
		private findShadow() {
			let brickMatrix: number[][] = BrickShape.shapesSetting[this.style][this.direction];
			let lastRow: number = -1;
			let downDis: number = this.brickContainer.rowCount;
			// console.log(`direction = ${this.direction}`);
			for (let column = 0; column < brickMatrix.length; column++) {
				lastRow = -1;
				for (let row = 0; row < brickMatrix[column].length; row++) {
					if (brickMatrix[row][column] == 0)
						continue;
					lastRow = row;
				}
				if (lastRow == -1)
					continue;
				let dis = this.calculateShadowDistance(column + this.columnIndex, lastRow + this.rowIndex);
				downDis = Math.min(downDis, dis);
			}
			this.downDis = downDis;
			// console.log(`shadow down dis = ${downDis}`);
			let shadowPositionList: number[][] = [];
			for (let column = 0; column < brickMatrix.length; column++) {
				for (let row = 0; row < brickMatrix[column].length; row++) {
					if (brickMatrix[row][column] == 0)
						continue;
					let xIndex: number = column;
					let yIndex: number = row + downDis;
					shadowPositionList.push([xIndex, yIndex]);
				}
			}
			this.shadowPositionList = shadowPositionList;

		}
		private calculateShadowDistance(column, row) {
			let bottomPos = this.brickContainer.findTopBrickIndexOfColumn(column);
			return bottomPos - row - 1;

		}

		private onAddToStage() {
			this.buildBricks();
			this.resetShapePosition();
			this.resetBricksPosition();
		}

		private resetShapePosition(): void {
			this.x = (this.columnIndex) * Settings.BrickSettings.brickWidth;
			this.y = (this.rowIndex) * Settings.BrickSettings.brickWidth;
		}

		private resetBricksPosition() {
			let i = 0;
			BrickShape.shapesSetting[this.style][this.direction].forEach((row, ri) => {
				row.forEach((cell, ci) => {
					if (cell == 0)
						return;
					this.bricks[i].x = ci * Settings.BrickSettings.brickWidth;
					this.bricks[i].y = ri * Settings.BrickSettings.brickWidth;
					i++;
				})
			});

		}

		private buildBricks(): void {
			this.bricks = [];

			BrickShape.shapesSetting[this.style][this.direction].forEach((row) => {
				row.forEach((cell) => {
					if (cell == 0)
						return;
					let shp = CommonUtils.BitmapUtils.createBitmapByName(BrickShape.shapesTypes[this.style]);
					this.bricks.push(shp)
				})
			});
			this.bricks.forEach((val) => {
				this.addChild(val);
			});

			this.shadowBricks = [];
			if (this.areaType == 0) {
				BrickShape.shapesSetting[this.style][this.direction].forEach((row) => {
					row.forEach((cell) => {
						if (cell == 0)
							return;
						let shp = CommonUtils.BitmapUtils.createBitmapByName(BrickShape.shapesTypes[this.style]);
						shp.alpha = 0.3;
						this.shadowBricks.push(shp)
					})
				});
				this.shadowBricks.forEach((val) => {
					this.addChild(val);
				});
			}
		}
	}
}