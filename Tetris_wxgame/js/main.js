var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var RootScene = (function (_super) {
    __extends(RootScene, _super);
    function RootScene(setting) {
        var _this = _super.call(this) || this;
        _this.setting = setting;
        return _this;
    }
    RootScene.prototype.initStyle = function () {
        // this.drawBg();
    };
    // private drawBg() {
    //     let bg = new egret.Shape();
    //     bg.graphics.beginFill(this.setting.bgColor,this.setting.alpha);
    //     bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, Settings.GameSettingUtils.gameSetting.globalHeight);
    //     bg.graphics.endFill();
    //     this.addFixedChild(bg);
    // }
    RootScene.prototype.addFixedChild = function (child) {
        this.addChild(child);
        child.scaleX = Settings.GameSettingUtils.globalScale;
        child.scaleY = Settings.GameSettingUtils.globalScale;
        child.x = child.x * Settings.GameSettingUtils.globalScale;
        child.y = child.y * Settings.GameSettingUtils.globalScale;
    };
    RootScene.prototype.addFixedToBottomChild = function (child) {
        child.scaleX = Settings.GameSettingUtils.globalScale;
        child.scaleY = Settings.GameSettingUtils.globalScale;
        child.x = child.x * Settings.GameSettingUtils.globalScale;
        child.y = this.height - child.y * Settings.GameSettingUtils.globalScale;
    };
    return RootScene;
}(egret.DisplayObjectContainer));
__reflect(RootScene.prototype, "RootScene");
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //注入自定义的素材解析器
        this.runGame().catch(function (e) {
            CommonUtils.LoggerUtil.log(e);
        });
        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var scale, jsCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadLoadingResource()];
                    case 1:
                        _a.sent();
                        this.loadingView = new LoadingUI();
                        this.stage.addChild(this.loadingView);
                        this.loadingView.setLoadingText("正在加载资源..");
                        scale = this.stage.stageWidth / 750;
                        this.loadingView.scaleX = scale;
                        this.loadingView.scaleY = scale;
                        this.loadingView.x = 0;
                        this.loadingView.y = 0;
                        return [4 /*yield*/, this.loadResource()];
                    case 2:
                        _a.sent();
                        this.loadingView.setLoadingText("资源加载完毕");
                        Settings.GameSettingUtils.globalScale = this.stage.stageWidth / 750;
                        this.createGameScene();
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        jsCode = _a.sent();
                        // const userInfo = await platform.getUserInfo();
                        //  console.log(userInfo);
                        return [4 /*yield*/, platform.showShareMenu()];
                    case 4:
                        // const userInfo = await platform.getUserInfo();
                        //  console.log(userInfo);
                        _a.sent();
                        platform.getUserInfo(function (res) {
                            console.log("platform.getUserInfo success");
                            console.log(res);
                            var userInfo = res;
                            if (userInfo.encryptedData) {
                                _this.wxLoginInfo = { code: jsCode.code, encryptedData: userInfo.encryptedData, iv: userInfo.iv, rawData: userInfo.rawData, signature: userInfo.signature };
                            }
                            else {
                                _this.wxLoginInfo = { code: jsCode.code };
                            }
                            // this.connectToGameServerAfterWxLogin();
                        }, function (res) {
                            _this.wxLoginInfo = { code: jsCode.code };
                            // this.connectToGameServerAfterWxLogin();
                        }, function (res) {
                            console.log("platform.getUserInfo complete");
                            console.log(res);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadLoadingResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("load", 1)];
                    case 2:
                        _a.sent();
                        Settings.GameSettingUtils.gameSetting = RES.getRes("game_setting_json");
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, RES.loadGroup("preload", 0, this.loadingView)];
                    case 1:
                        _a.sent();
                        Settings.BrickSettings.initBrickSetting();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        this.loadingView.visible = false;
        this.loadScene = new GameScene.LoadScene();
        this.stage.addChild(this.loadScene);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function (onSuccessed, onFailed, onCompleted) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.fixUserInfoButton = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // async shareAppMessage(title, imageUrl, onSuccess, onFailed, onComplete) { }
    DebugPlatform.prototype.shareAppMessage = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.showShareMenu = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.updateUserScore = function (score) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.getShareInfo = function (object, onSuccess, onFailed) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.isFirstRun = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.setNotFirstRun = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.createUserInfoButton = function (onSuccess, buttonX, buttonY, buttonWidth, buttonHeight, buttonImage) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    DebugPlatform.prototype.destroyUserInfoButton = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var CommonUtils;
(function (CommonUtils) {
    var AccountUtils = (function () {
        function AccountUtils() {
        }
        AccountUtils.getAccountData = function () {
            return this.accountData;
        };
        AccountUtils.updateWxJsCode = function (jsCode) {
            this.wxUserData.code = jsCode;
        };
        AccountUtils.setAccountData = function (accountData) {
            this.accountData = accountData;
        };
        AccountUtils.getwxUserData = function () {
            return this.wxUserData;
        };
        AccountUtils.setwxUserData = function (wxUserData) {
            this.wxUserData = wxUserData;
        };
        return AccountUtils;
    }());
    CommonUtils.AccountUtils = AccountUtils;
    __reflect(AccountUtils.prototype, "CommonUtils.AccountUtils");
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var BitmapUtils = (function () {
        function BitmapUtils() {
        }
        BitmapUtils.createBitmapByName = function (name) {
            var bitmap = new egret.Bitmap();
            var texture = RES.getRes(name);
            bitmap.texture = texture;
            return bitmap;
        };
        return BitmapUtils;
    }());
    CommonUtils.BitmapUtils = BitmapUtils;
    __reflect(BitmapUtils.prototype, "CommonUtils.BitmapUtils");
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var LoggerUtil = (function () {
        function LoggerUtil() {
        }
        LoggerUtil.log = function (data) {
            if (this.showLog) {
                console.log(data);
            }
        };
        LoggerUtil.showLog = false;
        return LoggerUtil;
    }());
    CommonUtils.LoggerUtil = LoggerUtil;
    __reflect(LoggerUtil.prototype, "CommonUtils.LoggerUtil");
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var NumberUtils = (function () {
        function NumberUtils() {
        }
        NumberUtils.toStringWithPrefixNumber = function (value, preFixChar, totalLength) {
            var output = value.toString();
            if (output.length >= totalLength)
                return output;
            return ("0000000000" + output).substr(-totalLength);
        };
        NumberUtils.formatNumber = function (num) {
            if (num < 1000)
                return num.toString();
            var result = "";
            var temp = num;
            var c = 0;
            while (temp > 0) {
                if (c > 0 && c % 3 == 0)
                    result = "," + result;
                result = temp % 10 + result;
                temp = Math.floor(temp / 10);
                c++;
            }
            return result;
        };
        NumberUtils.shortNumber = function (num) {
            if (num < 10000) {
                return num.toString();
            }
            if ((Number((num / 10000).toFixed(2).toString().split(".")[1])) >= 10 && (Number((num / 10000).toFixed(2).toString().split(".")[1])) < 100 && ((num / 10000).toFixed(2).toString().split(".")[1]).substr(1, 2) == "0") {
                return (num / 10000).toFixed(1) + "w";
            }
            else if ((Number((num / 10000).toFixed(2).toString().split(".")[1])) >= 1 && (Number((num / 10000).toFixed(2).toString().split(".")[1])) < 10 || (((Number((num / 10000).toFixed(2).toString().split(".")[1])) >= 10 && (Number((num / 10000).toFixed(2).toString().split(".")[1])) < 100) && (((num / 10000).toFixed(2).toString().split(".")[1]).substr(1, 2) != "0"))) {
                return (num / 10000).toFixed(2) + "w";
            }
            else {
                return Math.floor(num / 10000) + "w";
            }
        };
        return NumberUtils;
    }());
    CommonUtils.NumberUtils = NumberUtils;
    __reflect(NumberUtils.prototype, "CommonUtils.NumberUtils");
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var StageUtils = (function () {
        function StageUtils() {
        }
        StageUtils.loadAndStoreStageInfo = function (stage) {
            this._stageWidth = stage.stageWidth;
            this._stageHeight = stage.stageHeight;
            this._frameInterval = 1 / 60;
            this._stageScale = this._stageWidth / this._orgStageWidth;
            this._factor = (this._orgStageWidth / this._orgWorldWidth) * (this._stageWidth / this._orgStageWidth);
            this._worldWidth = this._orgWorldWidth;
            this._worldHeight = this._stageHeight / this._factor;
        };
        StageUtils.getFramInterval = function () {
            return this._frameInterval;
        };
        StageUtils.getFactory = function () {
            return this._factor;
        };
        StageUtils.getStageScale = function () {
            return this._stageScale;
        };
        StageUtils.getWorldWidth = function () {
            return this._worldWidth;
        };
        StageUtils.getWorldHeight = function () {
            return this._worldHeight;
        };
        StageUtils.getStageWidth = function () {
            return this._stageWidth;
        };
        StageUtils._orgWorldWidth = 3;
        StageUtils._orgStageWidth = 750;
        return StageUtils;
    }());
    CommonUtils.StageUtils = StageUtils;
    __reflect(StageUtils.prototype, "CommonUtils.StageUtils");
})(CommonUtils || (CommonUtils = {}));
var GameScene;
(function (GameScene) {
    var AddLine = (function (_super) {
        __extends(AddLine, _super);
        function AddLine(brickContainer) {
            var _this = _super.call(this) || this;
            _this.brickContainer = brickContainer;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        AddLine.prototype.onAddToStage = function () {
            this.buildBricks();
            this.resetShapePosition();
            this.addBricksIntoContainer();
        };
        AddLine.prototype.resetShapePosition = function () {
            this.x = Settings.BrickSettings.brickWidth;
            this.y = (Settings.BrickSettings.rows - 1) * Settings.BrickSettings.brickWidth;
        };
        AddLine.prototype.addBricksIntoContainer = function () {
            for (var i = 1; i < this.bricks.length + 1; i++) {
                this.brickContainer.addLineBrick(i, this.bricks[i - 1]);
            }
            ;
            this.brickContainer.removeChild(this);
        };
        AddLine.prototype.buildBricks = function () {
            var _this = this;
            this.bricks = [];
            for (var i = 0; i < Settings.BrickSettings.cols - 2; i++) {
                var shp = CommonUtils.BitmapUtils.createBitmapByName("方块1_png");
                this.bricks.push(shp);
            }
            this.bricks.forEach(function (val, col) {
                val.x = col * Settings.BrickSettings.brickWidth;
                _this.addChild(val);
            });
        };
        return AddLine;
    }(RootScene));
    GameScene.AddLine = AddLine;
    __reflect(AddLine.prototype, "GameScene.AddLine");
})(GameScene || (GameScene = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    LoadingUI.prototype.onAddToStage = function (event) {
        this.createView();
    };
    LoadingUI.prototype.createView = function () {
        var pscale = 750 / this.stage.stageWidth;
        var midY = this.stage.stageHeight * pscale * 0.5;
        var bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
        this.addChild(bg);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.fontFamily = "黑体";
        this.textField.size = 28;
        this.textField.y = midY + 80;
        this.textField.width = 750;
        this.textField.textAlign = "center";
        var progressBarBg = new egret.Sprite();
        this.addChild(progressBarBg);
        progressBarBg.graphics.beginFill(0x33565e);
        progressBarBg.graphics.drawRoundRect(0, 0, 530, 68, 70, 70);
        progressBarBg.graphics.endFill();
        progressBarBg.y = midY + 116;
        progressBarBg.x = 110;
        var logo = CommonUtils.BitmapUtils.createBitmapByName("图标_png");
        this.addChild(logo);
        logo.x = 42;
        logo.y = 172;
        var mcTexture = RES.getRes("加载动画22_png");
        var mcData = RES.getRes("加载动画22_json");
        var loadingDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        var progressBarFront = new egret.MovieClip(loadingDataFactory.generateMovieClipData(""));
        this.addChild(progressBarFront);
        progressBarFront.gotoAndPlay(1, -1);
        progressBarFront.y = midY + 120;
        progressBarFront.x = 117;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
    };
    LoadingUI.prototype.setLoadingText = function (txt) {
        this.textField.text = txt;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
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
var GameScene;
(function (GameScene) {
    var GameOverScene = (function (_super) {
        __extends(GameOverScene, _super);
        function GameOverScene(mainScene) {
            var _this = _super.call(this) || this;
            _this.mainScene = mainScene;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameOverScene.prototype.onAddToStage = function () {
            this.drawBg();
            this.drawLogo();
            this.drawScoreText();
        };
        GameOverScene.prototype.drawBg = function () {
            this.bg = new egret.Sprite();
            this.bg.graphics.beginFill(0, 0.8);
            this.bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.drawBtn();
            this.registEvents();
        };
        GameOverScene.prototype.drawLogo = function () {
            this.logo = CommonUtils.BitmapUtils.createBitmapByName("图标ico_png");
            this.logo.x = 219;
            this.logo.y = 48;
            this.addChild(this.logo);
        };
        GameOverScene.prototype.drawScoreText = function () {
            var textBg = CommonUtils.BitmapUtils.createBitmapByName("得分底_png");
            textBg.x = (this.stage.stageWidth - textBg.width) / 2;
            textBg.y = 390;
            this.addChild(textBg);
            this.scoreText = new egret.TextField();
            this.scoreText.fontFamily = "AdobeHeitiStd-Regular";
            this.scoreText.size = 45;
            this.scoreText.textColor = 0xffffff;
            this.scoreText.textAlign = "center";
            this.scoreText.text = "";
            this.scoreText.y = 393;
            this.addChild(this.scoreText);
            this.betScoreText = new egret.TextField();
            this.betScoreText.fontFamily = "AdobeHeitiStd-Regular";
            this.betScoreText.size = 30;
            this.betScoreText.textColor = 0xffcb3e;
            this.betScoreText.textAlign = "center";
            this.betScoreText.text = "";
            this.betScoreText.y = 460;
            this.addChild(this.betScoreText);
        };
        GameOverScene.prototype.drawBtn = function () {
            this.shareBtn = CommonUtils.BitmapUtils.createBitmapByName("分享好友b_png");
            this.shareBtn.x = 179;
            this.shareBtn.y = 555;
            this.addChild(this.shareBtn);
            this.resurgenceBtn = CommonUtils.BitmapUtils.createBitmapByName("猜豆复活b_png");
            this.resurgenceBtn.x = 179;
            this.resurgenceBtn.y = 696;
            this.addChild(this.resurgenceBtn);
            this.overBtn = CommonUtils.BitmapUtils.createBitmapByName("结束游戏b_png");
            this.overBtn.x = 179;
            this.overBtn.y = 852;
            this.addChild(this.overBtn);
            this.tryAgainBtn = CommonUtils.BitmapUtils.createBitmapByName("再来一次b_png");
            this.tryAgainBtn.x = 179;
            this.tryAgainBtn.y = 993;
            this.addChild(this.tryAgainBtn);
        };
        GameOverScene.prototype.registEvents = function () {
            var _this = this;
            this.shareBtn.touchEnabled = true;
            this.resurgenceBtn.touchEnabled = true;
            this.overBtn.touchEnabled = true;
            this.tryAgainBtn.touchEnabled = true;
            this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                console.log("点击分享");
                platform.shareAppMessage();
            }, this);
            this.resurgenceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                console.log("复活");
                _this.mainScene.resurgence();
            }, this);
            this.overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.mainScene.visible = false;
                _this.visible = false;
                _this.mainScene.loadScene.visible = true;
            }, this);
            this.tryAgainBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.visible = false;
                _this.mainScene.tryAgainGame();
            }, this);
        };
        GameOverScene.prototype.setScore = function (score, bestScore) {
            this.scoreText.text = "得分" + CommonUtils.NumberUtils.formatNumber(score);
            this.scoreText.x = (this.stage.stageWidth - this.scoreText.width) / 2;
            this.betScoreText.text = "最佳" + CommonUtils.NumberUtils.formatNumber(bestScore);
            this.betScoreText.x = (this.stage.stageWidth - this.betScoreText.width) / 2;
        };
        return GameOverScene;
    }(RootScene));
    GameScene.GameOverScene = GameOverScene;
    __reflect(GameOverScene.prototype, "GameScene.GameOverScene");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var GamePauseScene = (function (_super) {
        __extends(GamePauseScene, _super);
        function GamePauseScene(mainScene) {
            var _this = _super.call(this) || this;
            _this.mainScene = mainScene;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GamePauseScene.prototype.onAddToStage = function () {
            this.drawBg();
        };
        GamePauseScene.prototype.drawBg = function () {
            this.bg = new egret.Sprite();
            this.bg.graphics.beginFill(0, 0.8);
            this.bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.drawBtn();
            this.registEvents();
        };
        GamePauseScene.prototype.drawBtn = function () {
            this.overBtn = CommonUtils.BitmapUtils.createBitmapByName("结束游戏b_png");
            this.overBtn.x = 179;
            this.overBtn.y = 448;
            this.addChild(this.overBtn);
            this.reStartBtn = CommonUtils.BitmapUtils.createBitmapByName("重新开始b_png");
            this.reStartBtn.x = 179;
            this.reStartBtn.y = 611;
            this.addChild(this.reStartBtn);
            this.resumeBtn = CommonUtils.BitmapUtils.createBitmapByName("继续游戏b_png");
            this.resumeBtn.x = 179;
            this.resumeBtn.y = 772;
            this.addChild(this.resumeBtn);
        };
        GamePauseScene.prototype.registEvents = function () {
            var _this = this;
            this.overBtn.touchEnabled = true;
            this.reStartBtn.touchEnabled = true;
            this.resumeBtn.touchEnabled = true;
            this.overBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.mainScene.visible = false;
                _this.visible = false;
                _this.mainScene.loadScene.visible = true;
            }, this);
            this.reStartBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.visible = false;
                _this.mainScene.reStartGame();
            }, this);
            this.resumeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.visible = false;
                _this.mainScene.resume();
            }, this);
        };
        return GamePauseScene;
    }(RootScene));
    GameScene.GamePauseScene = GamePauseScene;
    __reflect(GamePauseScene.prototype, "GameScene.GamePauseScene");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var IconUI = (function (_super) {
        __extends(IconUI, _super);
        function IconUI(setting) {
            var _this = _super.call(this) || this;
            _this.setting = setting;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        IconUI.prototype.onAddToStage = function () {
            this.cacheAsBitmap = true;
            this.icon = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
            this.addChild(this.icon);
            this.icon.x = this.setting.left;
            this.icon.y = this.setting.top;
        };
        return IconUI;
    }(egret.DisplayObjectContainer));
    GameScene.IconUI = IconUI;
    __reflect(IconUI.prototype, "GameScene.IconUI");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var LoadScene = (function (_super) {
        __extends(LoadScene, _super);
        function LoadScene() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        LoadScene.prototype.onAddToStage = function () {
            console.log(Settings.GameSettingUtils.gameSetting.startBtn);
            this.drawBg();
            this.drawLogo();
            this.drawStartBtn();
            this.drawRankingListBtn();
            this.drawScoreBtn();
            this.drawGiftBtn();
            this.registEvents();
        };
        LoadScene.prototype.drawBg = function () {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
            this.addFixedChild(this.bg);
        };
        LoadScene.prototype.drawLogo = function () {
            var logo = CommonUtils.BitmapUtils.createBitmapByName("图标_png");
            logo.x = 42;
            logo.y = 172;
            this.addFixedChild(logo);
        };
        LoadScene.prototype.drawStartBtn = function () {
            this.startBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.startBtn);
            this.addFixedChild(this.startBtn);
        };
        LoadScene.prototype.drawRankingListBtn = function () {
            this.rankingListBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.rankingListBtn);
            this.addFixedChild(this.rankingListBtn);
        };
        LoadScene.prototype.drawScoreBtn = function () {
            this.scoreBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.scoreBtn);
            this.addFixedChild(this.scoreBtn);
        };
        LoadScene.prototype.drawGiftBtn = function () {
            this.giftBtn = new GameScene.IconUI(Settings.GameSettingUtils.gameSetting.giftBtn);
            this.addFixedChild(this.giftBtn);
        };
        LoadScene.prototype.registEvents = function () {
            var _this = this;
            this.startBtn.touchEnabled = true;
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:点击开始跳转主游戏页面
                console.log("点击开始");
                _this.visible = false;
                var mainGameScene = new GameScene.MainGameScene(_this);
                _this.stage.addChild(mainGameScene);
            }, this);
            this.rankingListBtn.touchEnabled = true;
            this.rankingListBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:跳转排行榜页面
                console.log("排行榜");
            }, this);
            this.scoreBtn.touchEnabled = true;
            this.scoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:跳转成绩页面
                console.log("成绩");
            }, this);
            this.giftBtn.touchEnabled = true;
            this.giftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //TODU:跳转礼包页面
                console.log("礼包");
            }, this);
        };
        return LoadScene;
    }(RootScene));
    GameScene.LoadScene = LoadScene;
    __reflect(LoadScene.prototype, "GameScene.LoadScene");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var MainGameScene = (function (_super) {
        __extends(MainGameScene, _super);
        function MainGameScene(loadScene) {
            var _this = _super.call(this) || this;
            _this.progressViewLength = 0;
            _this.score = 0;
            _this.loadScene = loadScene;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        MainGameScene.prototype.onAddToStage = function () {
            this.dataArr = new Array();
            this.createData();
            this.drawBg();
            this.drawScore();
            this.drawProgressView();
            this.drawPlayView();
            this.drawBrickContainer();
            this.drawPrevueArea();
            this.drawSurpassView();
            this.addNewBrickShape();
            this.drawLeftBtn();
            this.drawRightBtn();
            this.drawDownBtn();
            this.drawTurnBtn();
            this.drawDownBottomBtn();
            this.drawPauseBtn();
            this.drawGiftBtn();
            this.drawGameOverScene();
            this.drawGamePasueScene();
            this.gameTimer = new egret.Timer(200, 300);
            this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onUpdatProgressView, this);
            this.gameTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.insertLine, this);
            this.gameTimer.start();
        };
        MainGameScene.prototype.drawBg = function () {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("bg2_png");
            this.addFixedChild(this.bg);
        };
        MainGameScene.prototype.drawScore = function () {
            this.scoreBg = CommonUtils.BitmapUtils.createBitmapByName("进度条1_png");
            this.scoreBg.x = 54;
            this.scoreBg.y = 49;
            this.scoreBg.width = 165;
            this.addFixedChild(this.scoreBg);
            this.scoreIcon = CommonUtils.BitmapUtils.createBitmapByName("积分_png");
            this.scoreIcon.x = 39;
            this.scoreIcon.y = 31;
            this.addFixedChild(this.scoreIcon);
            this.scoreText = new egret.TextField();
            this.scoreText.fontFamily = "AdobeHeitiStd-Regular";
            this.scoreText.size = 20;
            this.scoreText.textColor = 0xffffff;
            this.scoreText.textAlign = "center";
            this.scoreText.text = "0";
            this.scoreText.x = this.scoreBg.x + (this.scoreBg.x - this.scoreIcon.x) + (this.scoreBg.width - this.scoreText.width) / 2;
            this.scoreText.y = this.scoreBg.y + (this.scoreBg.height - this.scoreText.height) / 2;
            this.addFixedChild(this.scoreText);
        };
        MainGameScene.prototype.drawProgressView = function () {
            this.progressView = new GameScene.ProgressView();
            this.progressView.x = 238;
            this.progressView.y = 49;
            this.addChild(this.progressView);
        };
        MainGameScene.prototype.drawPlayView = function () {
            var playBg = CommonUtils.BitmapUtils.createBitmapByName("主面板_png");
            playBg.x = 25;
            playBg.y = 103;
            this.addFixedChild(playBg);
        };
        MainGameScene.prototype.drawBrickContainer = function () {
            this.brickContainer = new GameScene.BrickContainer(Settings.BrickSettings.rows, Settings.BrickSettings.cols, Settings.BrickSettings.cols * Settings.BrickSettings.brickWidth, Settings.BrickSettings.rows * Settings.BrickSettings.brickWidth, this);
            this.brickContainer.x = 72;
            this.brickContainer.y = 168;
            this.addFixedChild(this.brickContainer);
        };
        MainGameScene.prototype.addNewBrickShape = function () {
            var _this = this;
            var style = this.dataArr.shift();
            var newBrickShape = new GameScene.BrickShape(style, 0, MainGameScene.rows[style], MainGameScene.cols[style], this.brickContainer);
            newBrickShape.onFreezeHandle = function () {
                var deleted = _this.brickContainer.clearFilledLine();
                if (deleted > 0) {
                    _this.brickContainer.fixLinePosition();
                    _this.setScoreTextWithLines(deleted); //分数
                }
                _this.addNewBrickShape();
            };
            this.brickContainer.addNewBrickShape(newBrickShape);
            this.prevueArea.createNextShape(this.dataArr);
        };
        MainGameScene.prototype.createData = function () {
            this.dataArr = [
                [Math.floor(Math.random() * 7)],
                [Math.floor(Math.random() * 7)],
                [Math.floor(Math.random() * 7)]
            ];
        };
        MainGameScene.prototype.insertLine = function () {
            this.brickContainer.insertLine();
            this.resetProgressView();
        };
        MainGameScene.prototype.resetProgressView = function () {
            this.progressViewLength = 0;
            this.progressView.setProgress(0);
            this.gameTimer.reset();
            this.gameTimer.start();
        };
        MainGameScene.prototype.onUpdatProgressView = function (evt) {
            this.progressViewLength += this.progressView.getViewLength() / 300;
            this.progressView.setProgress(this.progressViewLength);
        };
        MainGameScene.prototype.drawPrevueArea = function () {
            this.prevueArea = new GameScene.PrevueArea();
            this.prevueArea.x = 577;
            this.prevueArea.y = 127;
            this.addFixedChild(this.prevueArea);
        };
        MainGameScene.prototype.drawSurpassView = function () {
            this.surpassView = new GameScene.SurpassView();
            this.surpassView.x = 608;
            this.surpassView.y = 423;
            this.addFixedChild(this.surpassView);
        };
        MainGameScene.prototype.drawLeftBtn = function () {
            this.leftBtn = CommonUtils.BitmapUtils.createBitmapByName("左_png");
            this.leftBtn.x = 34;
            this.leftBtn.y = 1077;
            this.addFixedChild(this.leftBtn);
            this.leftBtn.touchEnabled = true;
            // this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.startMoveLeft, this.brickContainer);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startMoveLeft, this.brickContainer);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopMoveLeft, this.brickContainer);
        };
        MainGameScene.prototype.drawRightBtn = function () {
            this.rightBtn = CommonUtils.BitmapUtils.createBitmapByName("右_png");
            this.rightBtn.x = 193;
            this.rightBtn.y = 1077;
            this.addFixedChild(this.rightBtn);
            this.rightBtn.touchEnabled = true;
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startMoveRight, this.brickContainer);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopMoveRight, this.brickContainer);
        };
        MainGameScene.prototype.drawDownBtn = function () {
            this.downBtn = CommonUtils.BitmapUtils.createBitmapByName("下_png");
            this.downBtn.x = 351;
            this.downBtn.y = 1077;
            this.addFixedChild(this.downBtn);
            this.downBtn.touchEnabled = true;
            this.downBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.brickContainer.startFastDown, this.brickContainer);
            this.downBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.brickContainer.stopFastDown, this.brickContainer);
        };
        MainGameScene.prototype.drawTurnBtn = function () {
            this.turnBtn = CommonUtils.BitmapUtils.createBitmapByName("旋转_png");
            this.turnBtn.x = 589;
            this.turnBtn.y = 1155;
            this.addFixedChild(this.turnBtn);
            this.turnBtn.touchEnabled = true;
            this.turnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.turn, this.brickContainer);
        };
        MainGameScene.prototype.drawDownBottomBtn = function () {
            this.downBottomBtn = CommonUtils.BitmapUtils.createBitmapByName("加速下_png");
            this.downBottomBtn.x = 589;
            this.downBottomBtn.y = 992;
            this.addFixedChild(this.downBottomBtn);
            this.downBottomBtn.touchEnabled = true;
            this.downBottomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.brickContainer.moveToBottom, this.brickContainer);
        };
        MainGameScene.prototype.drawPauseBtn = function () {
            this.pauseBtn = CommonUtils.BitmapUtils.createBitmapByName("暂停_png");
            this.pauseBtn.x = 616;
            this.pauseBtn.y = 631;
            this.addFixedChild(this.pauseBtn);
            this.pauseBtn.touchEnabled = true;
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGamePauseScene, this);
        };
        MainGameScene.prototype.drawGiftBtn = function () {
            this.giftBtn = CommonUtils.BitmapUtils.createBitmapByName("礼包_png");
            this.giftBtn.x = 592;
            this.giftBtn.y = 767;
            this.addFixedChild(this.giftBtn);
            this.pauseBtn.touchEnabled = true;
            this.pauseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { }, this);
        };
        MainGameScene.prototype.drawGameOverScene = function () {
            this.gameOverScene = new GameScene.GameOverScene(this);
            this.addFixedChild(this.gameOverScene);
            this.setChildIndex(this.gameOverScene, 100);
            this.gameOverScene.visible = false;
        };
        MainGameScene.prototype.drawGamePasueScene = function () {
            this.gamePasueScene = new GameScene.GamePauseScene(this);
            this.addFixedChild(this.gamePasueScene);
            this.setChildIndex(this.gamePasueScene, 101);
            this.gamePasueScene.visible = false;
        };
        MainGameScene.prototype.setScoreTextWithLines = function (num) {
            this.score += MainGameScene.scoreSettings[num - 1];
            this.scoreText.text = CommonUtils.NumberUtils.formatNumber(this.score);
            this.scoreText.x = this.scoreBg.x + (this.scoreBg.x - this.scoreIcon.x) + (this.scoreBg.width - this.scoreText.width) / 2;
            this.scoreText.y = this.scoreBg.y + (this.scoreBg.height - this.scoreText.height) / 2;
        };
        MainGameScene.prototype.showGameOverScene = function () {
            this.gameOverScene.setScore(this.score, 2000);
            this.gameOverScene.visible = true;
        };
        MainGameScene.prototype.showGamePauseScene = function () {
            this.gamePasueScene.visible = true;
            this.brickContainer.pause();
            this.gameTimer.stop();
        };
        MainGameScene.prototype.resume = function () {
            this.brickContainer.resume();
            this.gameTimer.start();
        };
        MainGameScene.prototype.reStartGame = function () {
            this.brickContainer.reStartGame();
            this.resetProgressView();
        };
        MainGameScene.prototype.tryAgainGame = function () {
            this.brickContainer.tryAgainGame();
            this.resetProgressView();
        };
        MainGameScene.prototype.resurgence = function () {
            this.brickContainer.resurgence();
            this.resetProgressView();
            this.gameOverScene.visible = false;
        };
        MainGameScene.scoreSettings = [100, 300, 700, 1000];
        MainGameScene.rows = [-5, -3, -3, -3, -4, -4, -3];
        MainGameScene.cols = [3, 3, 3, 3, 4, 3, 4];
        return MainGameScene;
    }(RootScene));
    GameScene.MainGameScene = MainGameScene;
    __reflect(MainGameScene.prototype, "GameScene.MainGameScene");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var PrevueArea = (function (_super) {
        __extends(PrevueArea, _super);
        function PrevueArea() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        PrevueArea.prototype.onAddToStage = function () {
            this.prevueShapes = new Array();
            this.createPrevueArea();
            this.drawText();
        };
        PrevueArea.prototype.createPrevueArea = function () {
            this.prevueArea = CommonUtils.BitmapUtils.createBitmapByName("下一个_png");
            this.addChild(this.prevueArea);
        };
        PrevueArea.prototype.drawText = function () {
            var text = new egret.TextField();
            text.fontFamily = "AdobeHeitiStd-Regular";
            text.size = 24;
            text.textColor = 0xffffff;
            text.textAlign = "center";
            text.text = "下一个";
            text.x = 23;
            text.y = 30;
            this.addFixedChild(text);
        };
        PrevueArea.prototype.createNextShape = function (dataArr) {
            var _this = this;
            while (this.prevueShapes.length > 0) {
                var shp = this.prevueShapes.pop();
                this.removeChild(shp);
            }
            dataArr.forEach(function (data, index) {
                var shape = new GameScene.BrickShape(data[0], 1);
                _this.addChild(shape);
                if (index == 0) {
                    shape.scaleX = shape.scaleY = 26 / 38;
                    shape.x = (_this.prevueArea.width - shape.width) / 2;
                    shape.y = 75;
                }
                else {
                    shape.scaleX = shape.scaleY = 17 / 38;
                    shape.x = 58;
                    shape.y = 202;
                }
                _this.prevueShapes.push(shape);
            });
            // //添加下一个随机形状数据
            dataArr.push([Math.floor(Math.random() * 7)]);
        };
        return PrevueArea;
    }(RootScene));
    GameScene.PrevueArea = PrevueArea;
    __reflect(PrevueArea.prototype, "GameScene.PrevueArea");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var ProgressView = (function (_super) {
        __extends(ProgressView, _super);
        function ProgressView() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        ProgressView.prototype.onAddToStage = function () {
            this.drawBg();
            this.drawProgressView();
            this.drawProgressLogo();
        };
        ProgressView.prototype.drawBg = function () {
            this.progressViewBg = CommonUtils.BitmapUtils.createBitmapByName("进度条1_png");
            this.addChild(this.progressViewBg);
        };
        ProgressView.prototype.drawProgressView = function () {
            this.progressBitmap = CommonUtils.BitmapUtils.createBitmapByName("进度条2_png");
            this.renderTexture = new egret.RenderTexture();
            this.renderTexture.drawToTexture(this.progressBitmap, new egret.Rectangle(0, 0, 0, this.progressBitmap.height));
            this.progressView = new egret.Bitmap(this.renderTexture);
            this.addChild(this.progressView);
            this.progressView.x = 5;
            this.progressView.y = 4;
        };
        ProgressView.prototype.drawProgressLogo = function () {
            this.progressLogo = CommonUtils.BitmapUtils.createBitmapByName("搞怪方块_png");
            this.progressLogo.x = -this.progressLogo.width / 4;
            this.progressLogo.y = (this.progressViewBg.height - this.progressLogo.height) / 2;
            this.addChild(this.progressLogo);
        };
        ProgressView.prototype.getViewLength = function () {
            return this.progressBitmap.width;
        };
        ProgressView.prototype.setProgress = function (progress) {
            this.renderTexture.drawToTexture(this.progressBitmap, new egret.Rectangle(0, 0, progress, this.progressBitmap.height));
            this.progressView = new egret.Bitmap(this.renderTexture);
            this.progressLogo.x = this.progressView.x + this.progressView.width - this.progressLogo.width / 4;
        };
        return ProgressView;
    }(RootScene));
    GameScene.ProgressView = ProgressView;
    __reflect(ProgressView.prototype, "GameScene.ProgressView");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var SurpassView = (function (_super) {
        __extends(SurpassView, _super);
        function SurpassView() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        SurpassView.prototype.onAddToStage = function () {
            this.drawBg();
        };
        SurpassView.prototype.drawBg = function () {
            this.bg = CommonUtils.BitmapUtils.createBitmapByName("即将超越_png");
            this.addChild(this.bg);
            var text = new egret.TextField;
            text.fontFamily = "PingFang-SC-Medium";
            text.size = 20;
            text.textColor = 0xffffff;
            text.textAlign = "center";
            text.text = "即将超越";
            text.x = 20;
            text.y = 17;
            this.addFixedChild(text);
        };
        return SurpassView;
    }(RootScene));
    GameScene.SurpassView = SurpassView;
    __reflect(SurpassView.prototype, "GameScene.SurpassView");
})(GameScene || (GameScene = {}));
var Settings;
(function (Settings) {
    var BrickSettings = (function () {
        function BrickSettings() {
        }
        BrickSettings.initBrickSetting = function () {
            var res = RES.getRes(BrickSettings.settingName);
            BrickSettings.brickWidth = res.brickWidth;
            BrickSettings.rows = res.rows;
            BrickSettings.cols = res.cols;
        };
        BrickSettings.settingName = "brick_setting_json";
        BrickSettings.brickWidth = 0;
        BrickSettings.rows = 0;
        BrickSettings.cols = 0;
        return BrickSettings;
    }());
    Settings.BrickSettings = BrickSettings;
    __reflect(BrickSettings.prototype, "Settings.BrickSettings");
})(Settings || (Settings = {}));
var Settings;
(function (Settings) {
    var GameSettingUtils = (function () {
        function GameSettingUtils() {
        }
        return GameSettingUtils;
    }());
    Settings.GameSettingUtils = GameSettingUtils;
    __reflect(GameSettingUtils.prototype, "Settings.GameSettingUtils");
    var GameSetting = (function () {
        function GameSetting() {
        }
        return GameSetting;
    }());
    Settings.GameSetting = GameSetting;
    __reflect(GameSetting.prototype, "Settings.GameSetting");
})(Settings || (Settings = {}));
;window.Main = Main;