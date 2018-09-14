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
    var BrickShape = (function (_super) {
        __extends(BrickShape, _super);
        function BrickShape(style, areaType, row, column, brickContainer) {
            var _this = _super.call(this) || this;
            _this.isMoved = false;
            _this.step = 0;
            _this.downInterval = 1000;
            _this.fastDownInterval = 200;
            _this.freezed = false;
            _this.areaType = areaType;
            _this.direction = 0;
            _this.style = style;
            _this.rowIndex = row;
            _this.columnIndex = column;
            _this.brickContainer = brickContainer;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BrickShape.prototype.turn = function () {
            if (!this.canTurn((this.direction + 1) % 4)) {
                return;
            }
            this.direction = (this.direction + 1) % 4;
            for (var i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
                var row = BrickShape.shapesSetting[this.style][this.direction][i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
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
            }
            ;
            this.resetBricksPosition();
            this.resetShapePosition();
            this.showShadow();
        };
        BrickShape.prototype.moveLR = function (step) {
            var totalStep = step;
            while (totalStep != 0) {
                if (!this.canMoveLR(totalStep > 0 ? 1 : -1)) {
                    break;
                }
                this.columnIndex += totalStep > 0 ? 1 : -1;
                this.fixPosition();
                CommonUtils.LoggerUtil.log("after check : this.column = " + this.columnIndex + " , step = " + step);
                this.resetShapePosition();
                totalStep += totalStep > 0 ? -1 : 1;
            }
            this.showShadow();
        };
        BrickShape.prototype.startDown = function () {
            var _this = this;
            this.showShadow();
            this.down();
            this.downTimeout = egret.setTimeout(function () { _this.startDown(); }, this, this.downInterval);
        };
        BrickShape.prototype.stopDown = function () {
            egret.clearTimeout(this.downTimeout);
        };
        BrickShape.prototype.moveToBottom = function () {
            this.rowIndex += this.downDis;
            this.resetShapePosition();
            this.freeze();
        };
        BrickShape.prototype.down = function () {
            if (!this.canDown()) {
                this.freeze();
                return;
            }
            this.rowIndex++;
            this.resetShapePosition();
            this.showShadow();
        };
        BrickShape.prototype.startFastDown = function () {
            var _this = this;
            this.down();
            this.fastDownTimeout = egret.setTimeout(function () { _this.startFastDown(); }, this, this.fastDownInterval);
        };
        BrickShape.prototype.stopFastDown = function () {
            egret.clearTimeout(this.fastDownTimeout);
        };
        BrickShape.prototype.pause = function () {
            egret.clearTimeout(this.downTimeout);
        };
        BrickShape.prototype.resume = function () {
            var _this = this;
            this.downTimeout = egret.setTimeout(function () { _this.startDown(); }, this, this.downInterval);
        };
        BrickShape.prototype.startMoveLeft = function () {
            var _this = this;
            this.moveLR(-1);
            this.moveLeftTimeout = egret.setTimeout(function () { _this.startMoveLeft(); }, this, this.fastDownInterval);
        };
        BrickShape.prototype.stopMoveLeft = function () {
            egret.clearTimeout(this.moveLeftTimeout);
        };
        BrickShape.prototype.startMoveRight = function () {
            var _this = this;
            this.moveLR(1);
            this.moveRightTimeout = egret.setTimeout(function () { _this.startMoveRight(); }, this, this.fastDownInterval);
        };
        BrickShape.prototype.stopMoveRight = function () {
            egret.clearTimeout(this.moveRightTimeout);
        };
        BrickShape.prototype.canDown = function () {
            for (var i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
                var row = BrickShape.shapesSetting[this.style][this.direction][i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    if (cell == 0) {
                        continue;
                    }
                    CommonUtils.LoggerUtil.log("this.rowIndex + row + 1 = " + (this.rowIndex + i + 1));
                    var nr = this.rowIndex + i + 1;
                    if (nr >= this.brickContainer.rowCount) {
                        CommonUtils.LoggerUtil.log("到底啦");
                        return false;
                    }
                    var downBrickValue = this.brickContainer.getBrickValue(nr, j + this.columnIndex);
                    CommonUtils.LoggerUtil.log("down brick value is " + nr + ", " + j + ", " + downBrickValue);
                    if (downBrickValue >= 0) {
                        CommonUtils.LoggerUtil.log("下面是个砖块");
                        return false;
                    }
                }
            }
            ;
            return true;
        };
        BrickShape.prototype.canMoveLR = function (step) {
            for (var i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
                var row = BrickShape.shapesSetting[this.style][this.direction][i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    if (cell == 0) {
                        continue;
                    }
                    var nc = this.columnIndex + j + step;
                    var nextBrickValue = this.brickContainer.getBrickValue(this.rowIndex + i, nc);
                    CommonUtils.LoggerUtil.log("next brick value is " + nc + ", " + i + ", " + nextBrickValue);
                    if (nextBrickValue >= 0) {
                        CommonUtils.LoggerUtil.log("左右面是个砖块");
                        return false;
                    }
                }
            }
            ;
            return true;
        };
        BrickShape.prototype.fixPosition = function () {
            var offset = 0;
            for (var i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
                var row = BrickShape.shapesSetting[this.style][this.direction][i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
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
            }
            ;
            this.columnIndex -= offset;
        };
        BrickShape.prototype.canTurn = function (direction) {
            for (var i = 0; i < BrickShape.shapesSetting[this.style][direction].length; i++) {
                var row = BrickShape.shapesSetting[this.style][direction][i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    if (cell == 0) {
                        continue;
                    }
                    var nr = this.rowIndex + i;
                    if (nr >= this.brickContainer.rowCount - 1) {
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
                    var downBrickValue = this.brickContainer.getBrickValue(nr, j + this.columnIndex);
                    if (downBrickValue >= 0) {
                        return false;
                    }
                    var nc = this.columnIndex + j;
                    var nextBrickValue = this.brickContainer.getBrickValue(this.rowIndex + i, nc);
                    if (nextBrickValue >= 0) {
                        return false;
                    }
                }
            }
            ;
            return true;
        };
        BrickShape.prototype.freeze = function () {
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
        };
        BrickShape.prototype.addBricksIntoContainer = function () {
            var brickIndex = 0;
            for (var i = 0; i < BrickShape.shapesSetting[this.style][this.direction].length; i++) {
                var row = BrickShape.shapesSetting[this.style][this.direction][i];
                for (var j = 0; j < row.length; j++) {
                    var cell = row[j];
                    if (cell == 0) {
                        continue;
                    }
                    var bcRow = this.rowIndex + i;
                    var bcColumn = this.columnIndex + j;
                    this.brickContainer.addBrick(bcRow, bcColumn, this.style, this.bricks[brickIndex]);
                    brickIndex++;
                }
            }
            ;
            this.brickContainer.removeChild(this);
        };
        BrickShape.prototype.showShadow = function () {
            var _this = this;
            this.findShadow();
            this.shadowPositionList.forEach(function (pos, index) {
                _this.shadowBricks[index].x = pos[0] * Settings.BrickSettings.brickWidth;
                _this.shadowBricks[index].y = pos[1] * Settings.BrickSettings.brickWidth;
            });
        };
        BrickShape.prototype.findShadow = function () {
            var brickMatrix = BrickShape.shapesSetting[this.style][this.direction];
            var lastRow = -1;
            var downDis = this.brickContainer.rowCount;
            // console.log(`direction = ${this.direction}`);
            for (var column = 0; column < brickMatrix.length; column++) {
                lastRow = -1;
                for (var row = 0; row < brickMatrix[column].length; row++) {
                    if (brickMatrix[row][column] == 0)
                        continue;
                    lastRow = row;
                }
                if (lastRow == -1)
                    continue;
                var dis = this.calculateShadowDistance(column + this.columnIndex, lastRow + this.rowIndex);
                downDis = Math.min(downDis, dis);
            }
            this.downDis = downDis;
            // console.log(`shadow down dis = ${downDis}`);
            var shadowPositionList = [];
            for (var column = 0; column < brickMatrix.length; column++) {
                for (var row = 0; row < brickMatrix[column].length; row++) {
                    if (brickMatrix[row][column] == 0)
                        continue;
                    var xIndex = column;
                    var yIndex = row + downDis;
                    shadowPositionList.push([xIndex, yIndex]);
                }
            }
            this.shadowPositionList = shadowPositionList;
        };
        BrickShape.prototype.calculateShadowDistance = function (column, row) {
            var bottomPos = this.brickContainer.findTopBrickIndexOfColumn(column);
            return bottomPos - row - 1;
        };
        BrickShape.prototype.onAddToStage = function () {
            this.buildBricks();
            this.resetShapePosition();
            this.resetBricksPosition();
        };
        BrickShape.prototype.resetShapePosition = function () {
            this.x = (this.columnIndex) * Settings.BrickSettings.brickWidth;
            this.y = (this.rowIndex) * Settings.BrickSettings.brickWidth;
        };
        BrickShape.prototype.resetBricksPosition = function () {
            var _this = this;
            var i = 0;
            BrickShape.shapesSetting[this.style][this.direction].forEach(function (row, ri) {
                row.forEach(function (cell, ci) {
                    if (cell == 0)
                        return;
                    _this.bricks[i].x = ci * Settings.BrickSettings.brickWidth;
                    _this.bricks[i].y = ri * Settings.BrickSettings.brickWidth;
                    i++;
                });
            });
        };
        BrickShape.prototype.buildBricks = function () {
            var _this = this;
            this.bricks = [];
            BrickShape.shapesSetting[this.style][this.direction].forEach(function (row) {
                row.forEach(function (cell) {
                    if (cell == 0)
                        return;
                    var shp = CommonUtils.BitmapUtils.createBitmapByName(BrickShape.shapesTypes[_this.style]);
                    _this.bricks.push(shp);
                });
            });
            this.bricks.forEach(function (val) {
                _this.addChild(val);
            });
            this.shadowBricks = [];
            if (this.areaType == 0) {
                BrickShape.shapesSetting[this.style][this.direction].forEach(function (row) {
                    row.forEach(function (cell) {
                        if (cell == 0)
                            return;
                        var shp = CommonUtils.BitmapUtils.createBitmapByName(BrickShape.shapesTypes[_this.style]);
                        shp.alpha = 0.3;
                        _this.shadowBricks.push(shp);
                    });
                });
                this.shadowBricks.forEach(function (val) {
                    _this.addChild(val);
                });
            }
        };
        BrickShape.shapesTypes = ["方块2_png", "方块5_png", "方块4_png", "方块3_png", "方块6_png", "方块8_png", "方块7_png"];
        BrickShape.shapesSetting = [
            // Line
            [
                [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
                [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
                [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
                [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]]
            ]
            // Z 
            ,
            [
                [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
                [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
                [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
                [[0, 0, 1], [0, 1, 1], [0, 1, 0]]
            ]
            // RZ
            ,
            [
                [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
                [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
                [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
                [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
            ]
            // T
            ,
            [
                [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
                [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
                [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
                [[0, 1, 0], [1, 1, 0], [0, 1, 0]]
            ]
            // 7
            ,
            [
                [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
                [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
                [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
                [[1, 1, 1], [1, 0, 0], [0, 0, 0]]
            ]
            // R7
            ,
            [
                [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
                [[1, 1, 1], [0, 0, 1], [0, 0, 0]],
                [[0, 1, 0], [0, 1, 0], [1, 1,]],
                [[1, 0, 0], [1, 1, 1], [0, 0, 0]]
            ]
            // Rect
            ,
            [
                [[1, 1], [1, 1]],
                [[1, 1], [1, 1]],
                [[1, 1], [1, 1]],
                [[1, 1], [1, 1]]
            ]
        ];
        return BrickShape;
    }(RootScene));
    GameScene.BrickShape = BrickShape;
    __reflect(BrickShape.prototype, "GameScene.BrickShape");
})(GameScene || (GameScene = {}));
//# sourceMappingURL=BrickShape.js.map