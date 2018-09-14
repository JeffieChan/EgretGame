module GameScene {
	export class BrickContainer extends RootScene {
		public rowCount: number;
		public columnCount: number;
		private containerWidth: number;
		private containerHeight: number;
		private brickMatrix: number[][];
		private brickDisplays: egret.Bitmap[][];
		public currentBrickShape: BrickShape;
		private startX: number;
		private startY: number;
		private preX: number;
		private perY: number;
		private mainScene: MainGameScene;
		private brickArr: Array<any>
		private shapeArr: Array<any>;
		public constructor(rowCount: number, columnCount: number, containerWidth: number, containerHeight: number, mainScene: MainGameScene) {
			super();
			this.rowCount = rowCount;
			this.columnCount = columnCount;
			this.containerWidth = containerWidth;
			this.containerHeight = containerHeight;
			this.mainScene = mainScene;
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.brickArr = new Array();
			this.shapeArr = new Array();
		}

		// 删除被填满的行
		public clearFilledLine(): number {
			let rowToDelete = this.findAllFilledLines();
			rowToDelete.forEach((val) => {
				this.deleteRow(val);
			});
			return rowToDelete.length;
		}

		// 将删除填满行之后，中间空出的行进行删除，并将上部分砖块行下坠
		public fixLinePosition() {
			let rowState: boolean[] = this.getRowStateList();
			if (!this.needToMove(rowState)) {
				return;
			}
			let movingStep: number[][] = this.findLinesToMove(rowState);
			movingStep.forEach((val) => {
				this.moveLine(val[0], val[1]);
			});
		}

		// 将一个形状放入容器开始下坠
		public addNewBrickShape(newbrickShape: BrickShape) {
			if (!this.checkGameState())
				return;
			this.currentBrickShape = newbrickShape;
			this.addChild(this.currentBrickShape);
			this.currentBrickShape.startDown();
			while (this.shapeArr.length > 0) {
				this.shapeArr.pop();
			}
			this.shapeArr.push(newbrickShape);
		}
		// 获取某个坐标点的砖块值，如果是 -1 则代表此坐标点是空的
		// 如果是 >= 0，则代表的是对应砖块样式的index
		public getBrickValue(row, column): number {
			return this.brickMatrix[row][column];
		}
		// 将一个砖块加入到容器指定的坐标点，在一个形状被冻结时候，应该调用这个方法，把形状内的所有砖块加入到容器
		public addBrick(row: number, column: number, style: number, brick: egret.Bitmap) {
			this.brickMatrix[row][column] = style;
			this.brickDisplays[row][column] = brick;
			this.addChild(brick);
			this.brickDisplays[row][column].x = column * Settings.BrickSettings.brickWidth;
			this.brickDisplays[row][column].y = row * Settings.BrickSettings.brickWidth;
			this.brickArr.push(brick);

		}
		public findTopBrickIndexOfColumn(column: number): number {
			for (let i = 0; i < this.rowCount; i++) {
				if (this.brickMatrix[i][column] >= 0)
					return i;
			}
			return this.rowCount;
		}
		public turn() {
			this.currentBrickShape.turn();
		}
		public startMoveLeft() {
			this.currentBrickShape.isMoved = true;
			// this.currentBrickShape.moveLR(-1);
			this.currentBrickShape.startMoveLeft();
		}
		public stopMoveLeft() {
			this.currentBrickShape.isMoved = true;
			this.currentBrickShape.stopMoveLeft();
		}
		public startMoveRight() {
			this.currentBrickShape.isMoved = true;
			// this.currentBrickShape.moveLR(1);
			this.currentBrickShape.startMoveRight();
		}
		public stopMoveRight() {
			this.currentBrickShape.isMoved = false;
			this.currentBrickShape.stopMoveRight();
		}
		public startFastDown() {
			this.currentBrickShape.isMoved = true;
			this.currentBrickShape.startFastDown();
		}
		public stopFastDown() {
			this.currentBrickShape.isMoved = true;
			this.currentBrickShape.stopFastDown();
		}
		public moveToBottom() {
			this.currentBrickShape.isMoved = true;
			this.currentBrickShape.moveToBottom();
		}
		public pause() {
			this.currentBrickShape.isMoved = true;
			this.currentBrickShape.pause();

		}
		public resume() {
			this.currentBrickShape.isMoved = true;
			this.currentBrickShape.resume();
		}
		public insertLine() {
			this.currentBrickShape.stopDown();
			var line = new AddLine(this);
			this.resetPosition();
			this.addFixedChild(line);
			this.currentBrickShape.startDown();
		}

		public addLineBrick(column: number, brick: egret.Bitmap) {
			this.brickMatrix[this.rowCount - 1][column] = 8;
			this.brickDisplays[this.rowCount - 1][column] = brick;
			this.brickDisplays[this.rowCount - 1][column].x = column * Settings.BrickSettings.brickWidth;
			this.brickDisplays[this.rowCount - 1][column].y = (this.rowCount - 1) * Settings.BrickSettings.brickWidth;
			this.addChild(brick);
			this.brickArr.push(brick);

		}
		public reStartGame(){
			while (this.shapeArr.length > 0) {
				var shape = this.shapeArr.pop();
				this.removeChild(shape);
			}
			this.tryAgainGame();
		}
		public resurgence(){
			for (let r = -4; r < this.rowCount/2; r++) {
				for (let c = 0; c < this.columnCount; c++) {
					this.brickMatrix[r][c] = -1;
					if (this.brickDisplays[r][c]!=null)
					
					this.removeChild(this.brickDisplays[r][c]);
					this.brickArr.splice(1,1,this.brickDisplays[r][c]);
					this.brickDisplays[r][c] = null;
				}
			}
			this.mainScene.createData();
			this.mainScene.addNewBrickShape();
		}
		public tryAgainGame() {
			
			while (this.brickArr.length > 0) {
				var brick = this.brickArr.pop();
				if (this.contains(brick))
					this.removeChild(brick);
			}
			for (let r = -4; r < this.rowCount; r++) {
				for (let c = 0; c < this.columnCount; c++) {
					this.brickMatrix[r][c] = -1;
					this.brickDisplays[r][c] = null;
				}
			}
			this.mainScene.createData();
			this.mainScene.addNewBrickShape();




		}
		private resetPosition() {
			let rowState: boolean[] = this.getAddRowStateList();
			rowState.forEach((val, index) => {
				if (val)
					this.moveLine(index, index - 1);
			});
		}

		private getAddRowStateList() {
			let rowState: boolean[] = [];
			let hasBricks: boolean;
			for (let r = 0; r < this.rowCount; r++) {
				hasBricks = false;
				for (let c = 0; c < this.columnCount; c++) {
					if (this.brickMatrix[r][c] >= 0) {
						hasBricks = true;
						break;
					}
				}
				rowState.push(hasBricks);
			}
			return rowState;
		}


		private checkGameState(): boolean {
			for (let i = 0; i < Settings.BrickSettings.cols; i++) {
				if (this.brickMatrix[0][i] >= 0) {
					this.mainScene.gameTimer.stop();
					this.mainScene.showGameOverScene();
					return false;
				}
			}
			return true;

		}

		private findAllFilledLines(): number[] {
			let rowToDelete = [];
			let foundEmpty: boolean;
			for (let r = 0; r < this.rowCount; r++) {
				foundEmpty = false;
				for (let c = 0; c < this.columnCount; c++) {
					if (this.brickMatrix[r][c] < 0) {
						foundEmpty = true;
						break;
					}
				}
				if (!foundEmpty) {
					rowToDelete.push(r);
				}
			}
			return rowToDelete;
		}
		private findLinesToMove(rowState): number[][] {
			let movingStep: number[][] = [];
			let br = rowState.length - 1;
			let tr = rowState.length - 1;
			while (tr >= 0 && br >= 0) {
				if (!rowState[br]) {
					br--;
					continue;
				}
				if (tr >= br) {
					tr = br - 1;
				}
				while (tr >= 0) {
					if (rowState[tr]) {
						tr--;
						continue;
					}
					movingStep.push([tr, br]);
					rowState[br] = false;
					rowState[tr] = true;
					break;
				}
				br--;
			}
			return movingStep;
		}

		private deleteRow(rowIndex: number): void {
			for (let c = 0; c < this.columnCount; c++) {
				this.brickMatrix[rowIndex][c] = -1;
				// 删除显示的砖块
				if (this.brickDisplays[rowIndex][c] != null) {
					this.removeChild(this.brickDisplays[rowIndex][c]);
					this.brickDisplays[rowIndex][c] = null;
					this.brickArr.splice(1, 1, this.brickDisplays[rowIndex][c]);
				}
			}

		}

		private getRowStateList(): boolean[] {
			let rowState: boolean[] = [];
			let isEmpty: boolean;
			for (let r = 0; r < this.rowCount; r++) {
				isEmpty = true;
				for (let c = 0; c < this.columnCount; c++) {
					if (this.brickMatrix[r][c] >= 0) {
						isEmpty = false;
						break;
					}
				}
				rowState.push(isEmpty);
			}
			return rowState;
		}
		private moveLine(org: number, dst: number) {
			for (let i = 0; i < this.columnCount; i++) {
				this.brickMatrix[dst][i] = this.brickMatrix[org][i];
				this.brickMatrix[org][i] = -1;
				this.brickDisplays[dst][i] = this.brickDisplays[org][i];
				this.brickDisplays[org][i] = null;
				if (this.brickDisplays[dst][i]) {
					this.brickDisplays[dst][i].y = dst * Settings.BrickSettings.brickWidth;
				}
			}
		}

		private needToMove(lines: boolean[]): boolean {
			let foundEmpty = false;
			for (let i = lines.length - 1; i >= 0; i--) {
				if (lines[i] == true) {
					foundEmpty = true;
				}
				if (foundEmpty && !lines[i])
					return true;
			}
			return false;
		}


		private onAddToStage() {
			this.buildMatrix();
			this.drawContainer();
			this.registEvents();
		}

		private registEvents() {
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
			// 	this.startX = evt.localX;
			// 	this.startY = evt.localY;
			// 	this.preX = evt.localX;
			// 	this.perY = evt.localY;
			// 	this.currentBrickShape.isMoved = false;
			// }, this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, (evt: egret.TouchEvent) => {
			// 	let deltaX = Math.floor((evt.localX - this.startX) / Settings.BrickSettings.brickWidth);
			// 	let stepX = Math.floor((evt.localX - this.preX) / Settings.BrickSettings.brickWidth);
			// 	if (stepX < 0) {
			// 		stepX++;
			// 	}
			// 	if (stepX != null && stepX != 0) {
			// 		this.currentBrickShape.moveLR(stepX);
			// 		this.preX = evt.localX;
			// 		this.currentBrickShape.isMoved = true;
			// 	}


			// }, this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_END, (evt) => {
			// 	let stepY = Math.floor((evt.localY - this.perY) / Settings.BrickSettings.brickWidth);
			// 	if (stepY > 0) {
			// 		// this.currentBrickShape.moveToBottom();
			// 		this.currentBrickShape.isMoved = true;
			// 	}

			// }, this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt) => {
			// 	if (this.currentBrickShape && !this.currentBrickShape.isMoved) {
			// 		this.currentBrickShape.turn();
			// 	}
			// }, this);
		}



		private drawContainer() {
			let bg = new egret.Shape();
			this.addChild(bg);
			bg.graphics.beginFill(0x0d0b41);
			bg.graphics.drawRoundRect(0, 0, this.containerWidth, this.containerHeight, 10, 10);
			bg.graphics.endFill();
			let rowHeight = this.containerHeight / this.rowCount;
			let columnWidth = this.containerWidth / this.columnCount;
			bg.graphics.lineStyle(1, 0x322d99);
			for (let i = 1; i < this.rowCount; i++) {
				bg.graphics.moveTo(0, i * rowHeight);
				bg.graphics.lineTo(this.containerWidth, i * rowHeight);
			}
			for (let i = 1; i < this.columnCount; i++) {
				bg.graphics.moveTo(i * columnWidth, 0);
				bg.graphics.lineTo(i * columnWidth, this.containerHeight);
			}
		}

		private buildMatrix() {
			this.brickMatrix = [];
			this.brickDisplays = [];
			for (let i = -4; i < this.rowCount; i++) {
				this.brickMatrix[i] = [];
				this.brickDisplays[i] = [];
				for (let j = 0; j < this.rowCount; j++) {
					this.brickMatrix[i][j] = -1;
					this.brickDisplays[i][j] = null;
				}
			}
		}
	}



}