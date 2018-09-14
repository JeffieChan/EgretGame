var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene;
(function (GameScene) {
    var BrickContainer = (function (_super) {
        __extends(BrickContainer, _super);
        function BrickContainer(rowCount, columnCount, containerWidth, containerHeight, mainScene) {
            var _this = _super.call(this) || this;
            _this.rowCount = rowCount;
            _this.columnCount = columnCount;
            _this.containerWidth = containerWidth;
            _this.containerHeight = containerHeight;
            _this.mainScene = mainScene;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.brickArr = new Array();
            _this.shapeArr = new Array();
            return _this;
        }
        // 删除被填满的行
        BrickContainer.prototype.clearFilledLine = function () {
            var _this = this;
            var rowToDelete = this.findAllFilledLines();
            rowToDelete.forEach(function (val) {
                _this.deleteRow(val);
            });
            return rowToDelete.length;
        };
        // 将删除填满行之后，中间空出的行进行删除，并将上部分砖块行下坠
        BrickContainer.prototype.fixLinePosition = function () {
            var _this = this;
            var rowState = this.getRowStateList();
            if (!this.needToMove(rowState)) {
                return;
            }
            var movingStep = this.findLinesToMove(rowState);
            movingStep.forEach(function (val) {
                _this.moveLine(val[0], val[1]);
            });
        };
        // 将一个形状放入容器开始下坠
        BrickContainer.prototype.addNewBrickShape = function (newbrickShape) {
            if (!this.checkGameState())
                return;
            this.currentBrickShape = newbrickShape;
            this.addChild(this.currentBrickShape);
            this.currentBrickShape.startDown();
            while (this.shapeArr.length > 0) {
                this.shapeArr.pop();
            }
            this.shapeArr.push(newbrickShape);
        };
        // 获取某个坐标点的砖块值，如果是 -1 则代表此坐标点是空的
        // 如果是 >= 0，则代表的是对应砖块样式的index
        BrickContainer.prototype.getBrickValue = function (row, column) {
            return this.brickMatrix[row][column];
        };
        // 将一个砖块加入到容器指定的坐标点，在一个形状被冻结时候，应该调用这个方法，把形状内的所有砖块加入到容器
        BrickContainer.prototype.addBrick = function (row, column, style, brick) {
            this.brickMatrix[row][column] = style;
            this.brickDisplays[row][column] = brick;
            this.addChild(brick);
            this.brickDisplays[row][column].x = column * Settings.BrickSettings.brickWidth;
            this.brickDisplays[row][column].y = row * Settings.BrickSettings.brickWidth;
            this.brickArr.push(brick);
        };
        BrickContainer.prototype.findTopBrickIndexOfColumn = function (column) {
            for (var i = 0; i < this.rowCount; i++) {
                if (this.brickMatrix[i][column] >= 0)
                    return i;
            }
            return this.rowCount;
        };
        BrickContainer.prototype.turn = function () {
            this.currentBrickShape.turn();
        };
        BrickContainer.prototype.startMoveLeft = function () {
            this.currentBrickShape.isMoved = true;
            // this.currentBrickShape.moveLR(-1);
            this.currentBrickShape.startMoveLeft();
        };
        BrickContainer.prototype.stopMoveLeft = function () {
            this.currentBrickShape.isMoved = true;
            this.currentBrickShape.stopMoveLeft();
        };
        BrickContainer.prototype.startMoveRight = function () {
            this.currentBrickShape.isMoved = true;
            // this.currentBrickShape.moveLR(1);
            this.currentBrickShape.startMoveRight();
        };
        BrickContainer.prototype.stopMoveRight = function () {
            this.currentBrickShape.isMoved = false;
            this.currentBrickShape.stopMoveRight();
        };
        BrickContainer.prototype.startFastDown = function () {
            this.currentBrickShape.isMoved = true;
            this.currentBrickShape.startFastDown();
        };
        BrickContainer.prototype.stopFastDown = function () {
            this.currentBrickShape.isMoved = true;
            this.currentBrickShape.stopFastDown();
        };
        BrickContainer.prototype.moveToBottom = function () {
            this.currentBrickShape.isMoved = true;
            this.currentBrickShape.moveToBottom();
        };
        BrickContainer.prototype.pause = function () {
            this.currentBrickShape.isMoved = true;
            this.currentBrickShape.pause();
        };
        BrickContainer.prototype.resume = function () {
            this.currentBrickShape.isMoved = true;
            this.currentBrickShape.resume();
        };
        BrickContainer.prototype.insertLine = function () {
            this.currentBrickShape.stopDown();
            var line = new GameScene.AddLine(this);
            this.resetPosition();
            this.addFixedChild(line);
            this.currentBrickShape.startDown();
        };
        BrickContainer.prototype.addLineBrick = function (column, brick) {
            this.brickMatrix[this.rowCount - 1][column] = 8;
            this.brickDisplays[this.rowCount - 1][column] = brick;
            this.brickDisplays[this.rowCount - 1][column].x = column * Settings.BrickSettings.brickWidth;
            this.brickDisplays[this.rowCount - 1][column].y = (this.rowCount - 1) * Settings.BrickSettings.brickWidth;
            this.addChild(brick);
            this.brickArr.push(brick);
        };
        BrickContainer.prototype.reStartGame = function () {
            while (this.shapeArr.length > 0) {
                var shape = this.shapeArr.pop();
                this.removeChild(shape);
            }
            this.tryAgainGame();
        };
        BrickContainer.prototype.resurgence = function () {
            for (var r = -4; r < this.rowCount / 2; r++) {
                for (var c = 0; c < this.columnCount; c++) {
                    this.brickMatrix[r][c] = -1;
                    if (this.brickDisplays[r][c] != null)
                        this.removeChild(this.brickDisplays[r][c]);
                    this.brickArr.splice(1, 1, this.brickDisplays[r][c]);
                    this.brickDisplays[r][c] = null;
                }
            }
            this.mainScene.createData();
            this.mainScene.addNewBrickShape();
        };
        BrickContainer.prototype.tryAgainGame = function () {
            while (this.brickArr.length > 0) {
                var brick = this.brickArr.pop();
                if (this.contains(brick))
                    this.removeChild(brick);
            }
            for (var r = -4; r < this.rowCount; r++) {
                for (var c = 0; c < this.columnCount; c++) {
                    this.brickMatrix[r][c] = -1;
                    this.brickDisplays[r][c] = null;
                }
            }
            this.mainScene.createData();
            this.mainScene.addNewBrickShape();
        };
        BrickContainer.prototype.resetPosition = function () {
            var _this = this;
            var rowState = this.getAddRowStateList();
            rowState.forEach(function (val, index) {
                if (val)
                    _this.moveLine(index, index - 1);
            });
        };
        BrickContainer.prototype.getAddRowStateList = function () {
            var rowState = [];
            var hasBricks;
            for (var r = 0; r < this.rowCount; r++) {
                hasBricks = false;
                for (var c = 0; c < this.columnCount; c++) {
                    if (this.brickMatrix[r][c] >= 0) {
                        hasBricks = true;
                        break;
                    }
                }
                rowState.push(hasBricks);
            }
            return rowState;
        };
        BrickContainer.prototype.checkGameState = function () {
            for (var i = 0; i < Settings.BrickSettings.cols; i++) {
                if (this.brickMatrix[0][i] >= 0) {
                    this.mainScene.gameTimer.stop();
                    this.mainScene.showGameOverScene();
                    return false;
                }
            }
            return true;
        };
        BrickContainer.prototype.findAllFilledLines = function () {
            var rowToDelete = [];
            var foundEmpty;
            for (var r = 0; r < this.rowCount; r++) {
                foundEmpty = false;
                for (var c = 0; c < this.columnCount; c++) {
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
        };
        BrickContainer.prototype.findLinesToMove = function (rowState) {
            var movingStep = [];
            var br = rowState.length - 1;
            var tr = rowState.length - 1;
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
        };
        BrickContainer.prototype.deleteRow = function (rowIndex) {
            for (var c = 0; c < this.columnCount; c++) {
                this.brickMatrix[rowIndex][c] = -1;
                // 删除显示的砖块
                if (this.brickDisplays[rowIndex][c] != null) {
                    this.removeChild(this.brickDisplays[rowIndex][c]);
                    this.brickDisplays[rowIndex][c] = null;
                    this.brickArr.splice(1, 1, this.brickDisplays[rowIndex][c]);
                }
            }
        };
        BrickContainer.prototype.getRowStateList = function () {
            var rowState = [];
            var isEmpty;
            for (var r = 0; r < this.rowCount; r++) {
                isEmpty = true;
                for (var c = 0; c < this.columnCount; c++) {
                    if (this.brickMatrix[r][c] >= 0) {
                        isEmpty = false;
                        break;
                    }
                }
                rowState.push(isEmpty);
            }
            return rowState;
        };
        BrickContainer.prototype.moveLine = function (org, dst) {
            for (var i = 0; i < this.columnCount; i++) {
                this.brickMatrix[dst][i] = this.brickMatrix[org][i];
                this.brickMatrix[org][i] = -1;
                this.brickDisplays[dst][i] = this.brickDisplays[org][i];
                this.brickDisplays[org][i] = null;
                if (this.brickDisplays[dst][i]) {
                    this.brickDisplays[dst][i].y = dst * Settings.BrickSettings.brickWidth;
                }
            }
        };
        BrickContainer.prototype.needToMove = function (lines) {
            var foundEmpty = false;
            for (var i = lines.length - 1; i >= 0; i--) {
                if (lines[i] == true) {
                    foundEmpty = true;
                }
                if (foundEmpty && !lines[i])
                    return true;
            }
            return false;
        };
        BrickContainer.prototype.onAddToStage = function () {
            this.buildMatrix();
            this.drawContainer();
            this.registEvents();
        };
        BrickContainer.prototype.registEvents = function () {
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
        };
        BrickContainer.prototype.drawContainer = function () {
            var bg = new egret.Shape();
            this.addChild(bg);
            bg.graphics.beginFill(0x0d0b41);
            bg.graphics.drawRoundRect(0, 0, this.containerWidth, this.containerHeight, 10, 10);
            bg.graphics.endFill();
            var rowHeight = this.containerHeight / this.rowCount;
            var columnWidth = this.containerWidth / this.columnCount;
            bg.graphics.lineStyle(1, 0x322d99);
            for (var i = 1; i < this.rowCount; i++) {
                bg.graphics.moveTo(0, i * rowHeight);
                bg.graphics.lineTo(this.containerWidth, i * rowHeight);
            }
            for (var i = 1; i < this.columnCount; i++) {
                bg.graphics.moveTo(i * columnWidth, 0);
                bg.graphics.lineTo(i * columnWidth, this.containerHeight);
            }
        };
        BrickContainer.prototype.buildMatrix = function () {
            this.brickMatrix = [];
            this.brickDisplays = [];
            for (var i = -4; i < this.rowCount; i++) {
                this.brickMatrix[i] = [];
                this.brickDisplays[i] = [];
                for (var j = 0; j < this.rowCount; j++) {
                    this.brickMatrix[i][j] = -1;
                    this.brickDisplays[i][j] = null;
                }
            }
        };
        return BrickContainer;
    }(RootScene));
    GameScene.BrickContainer = BrickContainer;
    __reflect(BrickContainer.prototype, "GameScene.BrickContainer");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=BrickContainer.js.map