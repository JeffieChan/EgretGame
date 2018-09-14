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
var CustomUI;
(function (CustomUI) {
    var BaseBodyUI = (function (_super) {
        __extends(BaseBodyUI, _super);
        function BaseBodyUI() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.offsetRotation = 0;
            return _this;
        }
        BaseBodyUI.prototype.showDisplay = function (container, anmit, childIndex) {
            if (!container.contains(this.baseDisplay)) {
                container.addChild(this.baseDisplay);
            }
            if (childIndex) {
                container.setChildIndex(this.baseDisplay, childIndex);
            }
            else {
                container.setChildIndex(this.baseDisplay, 2);
            }
            var stagePos = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
            if (!anmit) {
                this.baseDisplay.alpha = 1;
            }
            else {
                this.baseDisplay.alpha = 0;
                egret.Tween.get(this.baseDisplay).to({ alpha: 1 }, 300);
            }
            this.baseDisplay.x = stagePos.X;
            this.baseDisplay.y = stagePos.Y;
            this.baseDisplay.rotation = 180 * (-this.angle / Math.PI) + this.offsetRotation;
            this.displays = [this.baseDisplay];
        };
        BaseBodyUI.prototype.resetDisplayPosition = function (anmit) {
            var stagePos = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
            if (anmit) {
                egret.Tween.get(this.baseDisplay).to({ x: stagePos.X, y: stagePos.Y, rotation: 180 * (-this.angle / Math.PI) }, 300);
                return;
            }
            else {
                this.baseDisplay.x = stagePos.X;
                this.baseDisplay.y = stagePos.Y;
                this.baseDisplay.rotation = 180 * (-this.angle / Math.PI);
                return;
            }
        };
        return BaseBodyUI;
    }(p2.Body));
    CustomUI.BaseBodyUI = BaseBodyUI;
    __reflect(BaseBodyUI.prototype, "CustomUI.BaseBodyUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var BrickUI = (function (_super) {
        __extends(BrickUI, _super);
        function BrickUI(life, edgeCount) {
            var _this = _super.call(this) || this;
            BrickUI.currentID++;
            _this.lineIndex = 0;
            _this.mass = 0;
            _this.type = p2.Body.STATIC;
            _this.life = life;
            _this.edgeCount = edgeCount;
            _this.shaking = false;
            _this.laserBiring = false;
            _this.buildShapeAndDisplay();
            _this.angle = 0; //Math.random() * Math.PI;
            _this.shape.collisionGroup = GameSetting.CollisionGroupSetting.BRICK;
            _this.txtLife = new egret.TextField();
            _this.txtLife.textColor = 0x000000;
            _this.txtLife.width = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * 2);
            _this.txtLife.height = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * 2);
            _this.txtLife.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.txtLife.textAlign = egret.HorizontalAlign.CENTER;
            _this.txtLife.size = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * 0.6);
            _this.txtLife.anchorOffsetX = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius);
            _this.txtLife.anchorOffsetY = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius);
            _this.txtLife.fontFamily = "苹方";
            _this.baseDisplay.addChild(_this.txtLife);
            _this.txtLife.rotation = 180 * (_this.angle / Math.PI);
            _this.showLife();
            return _this;
        }
        BrickUI.prototype.dispose = function () {
            this.displayBg = null;
            this.displays = null;
            this.txtLife = null;
        };
        BrickUI.prototype.destory = function (animate, container) {
            var _this = this;
            if (this.onDestoried)
                this.onDestoried(this.id);
            if (!BrickUI.chips) {
                BrickUI.chips = [];
                for (var i = 0; i < 10; i++) {
                    BrickUI.chips[i] = new egret.Shape();
                    container.addChild(BrickUI.chips[i]);
                    BrickUI.chips[i].graphics.beginFill(0xFFA000);
                    BrickUI.chips[i].graphics.drawRect(0, 0, 15, 15);
                    BrickUI.chips[i].visible = false;
                }
            }
            var x = this.baseDisplay.x;
            var y = this.baseDisplay.y;
            if (container.contains(this.baseDisplay)) {
                container.removeChild(this.baseDisplay);
            }
            if (this.world)
                this.world.removeBody(this);
            if (!animate)
                return;
            var _loop_1 = function (i) {
                egret.Tween.get(BrickUI.chips[i])
                    .call(function () {
                    BrickUI.chips[i].visible = true;
                    BrickUI.chips[i].x = x;
                    BrickUI.chips[i].y = y;
                    BrickUI.chips[i].scaleX = 1;
                    BrickUI.chips[i].scaleY = 1;
                })
                    .to({ x: x, y: y, scaleX: 1, scaleY: 1 })
                    .to({ x: x + (Math.random() - 0.5) * 150, y: y + (Math.random() - 0.5) * 150, scaleX: 0, scaleY: 0, rotation: Math.random() * 360 }, 200)
                    .call(function () {
                    BrickUI.chips[i].visible = false;
                    _this.dispose();
                });
            };
            for (var i = 0; i < BrickUI.chips.length; i++) {
                _loop_1(i);
            }
        };
        BrickUI.prototype.getLife = function () {
            return this.life;
        };
        BrickUI.prototype.hittedByBall = function (ball, container) {
            this.shake();
            var damage = Math.min(this.life, ball.getPower());
            CommonUtils.GameUtils.currentScore += damage;
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, damage);
            this.life -= damage;
            if (this.life <= 0) {
                this.destory(true, container);
                return;
            }
            ball.addRandomSpeed();
            this.redrawBg();
            this.showLife();
        };
        BrickUI.prototype.hittedByLaser = function (laser, container) {
            var decreaseLife = Math.min(laser.getPower(), this.life);
            if (decreaseLife == 0) {
                return;
            }
            this.life -= decreaseLife;
            CommonUtils.GameUtils.currentScore += decreaseLife;
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, decreaseLife);
            container.refreshScore();
            if (this.life <= 0) {
                this.destory(true, container);
                return;
            }
            this.redrawBg();
            this.showLife();
            this.shake();
        };
        BrickUI.prototype.buildColorForLife = function () {
            return GameSetting.BrickSetting.getColorForLife(this.life);
        };
        BrickUI.prototype.shake = function () {
            var _this = this;
            if (this.shaking)
                return;
            this.shaking = true;
            var orgX = this.baseDisplay.x;
            var orgY = this.baseDisplay.y;
            var shakeInterval = 50;
            egret.Tween.get(this.baseDisplay)
                .to({ x: orgX + this.getShakeNumber(), y: orgY + this.getShakeNumber() }, shakeInterval)
                .to({ x: orgX + this.getShakeNumber(), y: orgY + this.getShakeNumber() }, shakeInterval)
                .to({ x: orgX + this.getShakeNumber(), y: orgY + this.getShakeNumber() }, shakeInterval)
                .to({ x: orgX, y: orgY }, shakeInterval)
                .call(function () {
                _this.shaking = false;
            });
        };
        BrickUI.prototype.getShakeNumber = function () {
            return CommonUtils.CoordinateUtils.worldLengthToStage((Math.random() - 0.5) * GameSetting.BrickSetting.Radius * 0.15);
        };
        BrickUI.prototype.showLife = function () {
            this.txtLife.text = this.life.toString();
        };
        BrickUI.prototype.setLife = function (life) {
            this.life = life;
            this.showLife();
        };
        BrickUI.currentID = 0;
        return BrickUI;
    }(CustomUI.BaseBodyUI));
    CustomUI.BrickUI = BrickUI;
    __reflect(BrickUI.prototype, "CustomUI.BrickUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var StuffUI = (function (_super) {
        __extends(StuffUI, _super);
        function StuffUI(radius) {
            var _this = _super.call(this) || this;
            _this.lineIndex = 0;
            _this.radius = radius;
            _this.buildShapeAndDisplay();
            _this.mass = 0;
            _this.shape.collisionGroup = GameSetting.CollisionGroupSetting.STUFF;
            _this.shape.collisionResponse = false;
            return _this;
        }
        StuffUI.prototype.destory = function (container) {
            console.log("stuff destory container is");
            console.log(container);
            if (this.onDestoried)
                this.onDestoried(this.id);
            var x = this.baseDisplay.x;
            var y = this.baseDisplay.y;
            if (container.contains(this.baseDisplay)) {
                container.removeChild(this.baseDisplay);
            }
            if (this.world)
                this.world.removeBody(this);
        };
        return StuffUI;
    }(CustomUI.BaseBodyUI));
    CustomUI.StuffUI = StuffUI;
    __reflect(StuffUI.prototype, "CustomUI.StuffUI");
})(CustomUI || (CustomUI = {}));
var GameScene;
(function (GameScene) {
    var MaskPanel = (function (_super) {
        __extends(MaskPanel, _super);
        function MaskPanel() {
            var _this = _super.call(this) || this;
            _this.enabled = true;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        MaskPanel.prototype.getMaskWidth = function () {
            return this.maskWidth;
        };
        MaskPanel.prototype.getMaskHeight = function () {
            return this.maskHeight;
        };
        MaskPanel.prototype.onAddToStage = function (event) {
            var mask = new egret.Shape();
            this.addChild(mask);
            this.maskWidth = this.stage.stageWidth;
            this.maskHeight = this.stage.stageHeight;
            mask.graphics.beginFill(0x000000, this.maskAlpha);
            mask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.drawPanel();
        };
        return MaskPanel;
    }(egret.DisplayObjectContainer));
    GameScene.MaskPanel = MaskPanel;
    __reflect(MaskPanel.prototype, "GameScene.MaskPanel");
})(GameScene || (GameScene = {}));
/**
 * 游戏道具基类
 */
var GameTool;
(function (GameTool) {
    var BaseTool = (function (_super) {
        __extends(BaseTool, _super);
        function BaseTool(gameWorld) {
            var _this = _super.call(this) || this;
            _this.gameWorld = gameWorld;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BaseTool.prototype.onAddToStage = function (event) {
            this.drawTool();
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        };
        return BaseTool;
    }(egret.Sprite));
    GameTool.BaseTool = BaseTool;
    __reflect(BaseTool.prototype, "GameTool.BaseTool");
})(GameTool || (GameTool = {}));
var Model;
(function (Model) {
    var WxDataProgress;
    (function (WxDataProgress) {
        WxDataProgress[WxDataProgress["startLoadFriends"] = 0] = "startLoadFriends";
        WxDataProgress[WxDataProgress["endLoadFriends"] = 1] = "endLoadFriends";
        WxDataProgress[WxDataProgress["startLoadSelf"] = 2] = "startLoadSelf";
        WxDataProgress[WxDataProgress["endLoadSelf"] = 3] = "endLoadSelf";
        WxDataProgress[WxDataProgress["startLoadNextPlayer"] = 4] = "startLoadNextPlayer";
        WxDataProgress[WxDataProgress["endLoadNextPlayer"] = 5] = "endLoadNextPlayer";
        WxDataProgress[WxDataProgress["unStart"] = -1] = "unStart";
    })(WxDataProgress = Model.WxDataProgress || (Model.WxDataProgress = {}));
})(Model || (Model = {}));
var Server;
(function (Server) {
    var ClientState;
    (function (ClientState) {
        ClientState[ClientState["Disconnected"] = 0] = "Disconnected";
        ClientState[ClientState["Connecting"] = 1] = "Connecting";
        ClientState[ClientState["Connected"] = 2] = "Connected";
    })(ClientState = Server.ClientState || (Server.ClientState = {}));
    var BaseClient = (function () {
        function BaseClient() {
            this.initCallback = null;
            this.socket = null;
            this.callbacks = {};
            this.eventCallbacks = {};
            this.useWss = false;
            this.reqId = 1;
            this.State = ClientState.Disconnected;
        }
        BaseClient.prototype.on = function (event, fn) {
            (this.eventCallbacks[event] = this.eventCallbacks[event] || []).push(fn);
        };
        BaseClient.prototype.init = function (params, initCb) {
            this.State = ClientState.Connecting;
            this.initCallback = initCb;
            var host = params.host;
            var port = params.port;
            this.initWebSocket(host, port);
        };
        BaseClient.prototype.close = function () {
            this.socket.flush();
            this.socket.close();
        };
        BaseClient.prototype.isConnected = function () {
            return this.State == ClientState.Connected;
        };
        BaseClient.prototype.reConnect = function (host, port, callback) {
            this.init({ host: host, port: port }, callback);
        };
        BaseClient.prototype.initWebSocket = function (host, port) {
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_STRING;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onMessage, this);
            if (this.useWss) {
                this.logMsg("\u5F00\u59CB\u8FDE\u63A5\u670D\u52A1\u5668\uFF1Awss://" + host + ":" + port);
                this.socket.connectByUrl("wss://" + host + ":" + port);
            }
            else {
                this.logMsg("\u5F00\u59CB\u8FDE\u63A5\u670D\u52A1\u5668\uFF1Aws://" + host + ":" + port);
                this.socket.connectByUrl("ws://" + host + ":" + port);
            }
        };
        BaseClient.prototype.onConnect = function (e) {
            this.State = ClientState.Connected;
            this.logMsg("[Base client] connect success");
            this.logMsg(e);
            this.initCallback();
            this.emit(BaseClient.EVENT_CONNECTED, e);
        };
        BaseClient.prototype.onClose = function (e) {
            console.error("[Base client] connect close:", e);
            this.emit(BaseClient.EVENT_CLOSE, e);
        };
        BaseClient.prototype.onIOError = function (e) {
            console.error('socket error: ');
            for (var prop in e) {
                this.logMsg(prop + " : " + e[prop]);
            }
            this.emit(BaseClient.EVENT_IO_ERROR, e);
        };
        BaseClient.prototype.onMessage = function (event) {
            var message = this.socket.readUTF();
            this.logMsg(new Date().toString() + " Response ：" + message);
            var msgPackage = JSON.parse(message);
            this.processMessage(msgPackage);
        };
        BaseClient.prototype.processMessage = function (msg) {
            if (!msg.ReqId || msg.ReqId == 0) {
                // server push message
                if (BaseClient.DEBUG) {
                    console.group("EVENT:");
                    console.info("Route:", msg.ReqId);
                    console.info("Msg:", msg.Data);
                    console.groupEnd();
                }
                this.emit(msg.Route, msg.Data);
                return;
            }
            if (BaseClient.DEBUG) {
                console.group("RESPONSE:");
                console.info("Id:", msg.ReqId);
                console.info("Msg:", msg.Data);
                console.groupEnd();
            }
            //if have a id then find the callback function with the request
            var cb = this.callbacks[msg.ReqId];
            delete this.callbacks[msg.ReqId];
            if (typeof cb !== 'function') {
                return;
            }
            cb(msg);
            return;
        };
        BaseClient.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var params = [].slice.call(arguments, 1);
            var callbacks = this.eventCallbacks[event];
            if (callbacks) {
                callbacks = callbacks.slice(0);
                for (var i = 0, len = callbacks.length; i < len; ++i) {
                    callbacks[i].apply(this, params);
                }
            }
            return this;
        };
        BaseClient.prototype.request = function (msg, cb) {
            this.reqId++;
            if (this.reqId > BaseClient.MAX_REQ_COUNT) {
                this.reqId = 1;
            }
            var reqId = this.reqId;
            msg.reqId = reqId;
            if (BaseClient.DEBUG) {
                console.group("REQUEST:");
                console.info("Id: " + reqId);
                console.info("Param: ");
                console.info(msg);
                console.groupEnd();
            }
            if (this.socket && this.socket.connected) {
                this.State = ClientState.Connected;
                this.socket.writeUTF(JSON.stringify(msg));
                this.socket.flush();
            }
            this.callbacks[reqId] = cb;
        };
        BaseClient.prototype.logMsg = function (msg) {
            if (BaseClient.DEBUG) {
                CommonUtils.LoggerUtil.log(msg);
            }
        };
        BaseClient.EVENT_IO_ERROR = "io-error";
        BaseClient.EVENT_CLOSE = "close";
        BaseClient.EVENT_KICK = "onKick";
        BaseClient.EVENT_CONNECTED = "connected";
        BaseClient.EVENT_HEART_BEAT_TIMEOUT = 'heartbeat timeout';
        BaseClient.DEBUG = true;
        BaseClient.MAX_REQ_COUNT = 255;
        return BaseClient;
    }());
    Server.BaseClient = BaseClient;
    __reflect(BaseClient.prototype, "Server.BaseClient");
})(Server || (Server = {}));
var GameScene;
(function (GameScene) {
    var MenuScene = (function (_super) {
        __extends(MenuScene, _super);
        function MenuScene() {
            var _this = _super.call(this) || this;
            _this.panelOpened = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        MenuScene.prototype.onAddToStage = function (event) {
            this.midY = this.stage.stageHeight / 2;
            this.logoOffset = 50;
            this.startButtonOffset = 30;
            this.listOffset = 260;
            this.drawBg();
            this.drawButtons();
        };
        MenuScene.prototype.drawBg = function () {
            var bg = CommonUtils.BitmapUtils.createBitmapByName("menu_bg_png");
            bg.scaleX = CommonUtils.StageUtils.getStageScale();
            bg.scaleY = CommonUtils.StageUtils.getStageScale();
            this.addChild(bg);
            var logo = CommonUtils.BitmapUtils.createBitmapByName("game_logo_png");
            logo.scaleX = CommonUtils.StageUtils.getStageScale();
            logo.scaleY = CommonUtils.StageUtils.getStageScale();
            logo.y = this.midY - logo.height * CommonUtils.StageUtils.getStageScale() - this.logoOffset * CommonUtils.StageUtils.getStageScale();
            logo.x = (this.stage.stageWidth - logo.width * CommonUtils.StageUtils.getStageScale()) / 2;
            this.addChild(logo);
        };
        MenuScene.prototype.drawButtons = function () {
            this.drawBtnStart();
            this.drawBtnRate();
            this.drawBtnHistory();
            this.drawBtnInvite();
        };
        MenuScene.prototype.drawBtnStart = function () {
            var _this = this;
            this.btnStartGame = new egret.Sprite();
            var img = CommonUtils.BitmapUtils.createBitmapByName("btn_start_game_png");
            img.scaleX = CommonUtils.StageUtils.getStageScale();
            img.scaleY = CommonUtils.StageUtils.getStageScale();
            this.btnStartGame.addChild(img);
            this.btnStartGame.y = this.midY + this.startButtonOffset * CommonUtils.StageUtils.getStageScale();
            this.btnStartGame.x = (this.stage.stageWidth - this.btnStartGame.width) / 2;
            this.addChild(this.btnStartGame);
            this.btnStartGame.touchEnabled = true;
            this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (_this.panelOpened)
                    return;
                if (_this.gameStartHandle)
                    _this.gameStartHandle();
            }, this);
            this.btnStartGame.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (event) {
                if (_this.panelOpened)
                    return;
            }, this);
        };
        MenuScene.prototype.drawBtnRate = function () {
            var _this = this;
            this.btnRate = new egret.Sprite();
            var img = CommonUtils.BitmapUtils.createBitmapByName("btn_rate_png");
            img.scaleX = CommonUtils.StageUtils.getStageScale();
            img.scaleY = CommonUtils.StageUtils.getStageScale();
            this.btnRate.addChild(img);
            this.btnRate.y = this.midY + this.listOffset * CommonUtils.StageUtils.getStageScale();
            this.btnRate.x = 76 * CommonUtils.StageUtils.getStageScale();
            this.addChild(this.btnRate);
            this.btnRate.touchEnabled = true;
            this.btnRate.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (_this.panelOpened)
                    return;
                if (_this.openRateHandle)
                    _this.openRateHandle();
            }, this);
        };
        MenuScene.prototype.drawBtnHistory = function () {
            var _this = this;
            this.btnHistory = new egret.Sprite();
            var img = CommonUtils.BitmapUtils.createBitmapByName("btn_history_png");
            img.scaleX = CommonUtils.StageUtils.getStageScale();
            img.scaleY = CommonUtils.StageUtils.getStageScale();
            this.btnHistory.addChild(img);
            this.btnHistory.y = this.midY + this.listOffset * CommonUtils.StageUtils.getStageScale();
            this.btnHistory.x = 310 * CommonUtils.StageUtils.getStageScale();
            this.addChild(this.btnHistory);
            this.btnHistory.touchEnabled = true;
            this.btnHistory.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (_this.panelOpened)
                    return;
                if (_this.openHistoryHandle)
                    _this.openHistoryHandle();
            }, this);
        };
        MenuScene.prototype.drawBtnInvite = function () {
            var _this = this;
            this.btnInvite = new egret.Sprite();
            var img = CommonUtils.BitmapUtils.createBitmapByName("btn_invite_png");
            img.scaleX = CommonUtils.StageUtils.getStageScale();
            img.scaleY = CommonUtils.StageUtils.getStageScale();
            this.btnInvite.addChild(img);
            this.btnInvite.y = this.midY + this.listOffset * CommonUtils.StageUtils.getStageScale();
            this.btnInvite.x = 547 * CommonUtils.StageUtils.getStageScale();
            this.addChild(this.btnInvite);
            this.btnInvite.touchEnabled = true;
            this.btnInvite.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                if (_this.panelOpened)
                    return;
                if (_this.openInviteHandle)
                    _this.openInviteHandle();
            }, this);
        };
        return MenuScene;
    }(egret.DisplayObjectContainer));
    GameScene.MenuScene = MenuScene;
    __reflect(MenuScene.prototype, "GameScene.MenuScene");
})(GameScene || (GameScene = {}));
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
            return Math.floor(num / 10000) + "万";
        };
        return NumberUtils;
    }());
    CommonUtils.NumberUtils = NumberUtils;
    __reflect(NumberUtils.prototype, "CommonUtils.NumberUtils");
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var ObjectUtils = (function () {
        function ObjectUtils() {
        }
        ObjectUtils.toJsonString = function (obj) {
            if (obj instanceof Array) {
                var json_1 = "";
                json_1 += "[";
                obj.forEach(function (val, index) {
                    if (index > 0)
                        json_1 += ",";
                    json_1 += ObjectUtils.toJsonString(val);
                });
                json_1 += "]";
                return json_1;
            }
            if (typeof (obj) == "string") {
                return "\"" + obj + "\"";
            }
            if (!isNaN(obj)) {
                return obj.toString();
            }
            if (obj instanceof Object) {
                var json_2 = "{";
                var propertyName = "";
                var propertyNames = Object.getOwnPropertyNames(obj);
                propertyNames.forEach(function (name, index) {
                    if (index > 0)
                        json_2 += ",";
                    json_2 += "\"" + name + "\":" + ObjectUtils.toJsonString(obj[name]);
                });
                json_2 += "}";
                return json_2;
            }
            return obj.toString();
        };
        return ObjectUtils;
    }());
    CommonUtils.ObjectUtils = ObjectUtils;
    __reflect(ObjectUtils.prototype, "CommonUtils.ObjectUtils");
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
var CommonUtils;
(function (CommonUtils) {
    var WxAuthorUtils = (function () {
        function WxAuthorUtils() {
        }
        WxAuthorUtils.getWxUserSessionKey = function (appid, secret, jsCode, grantType) {
            return "";
        };
        return WxAuthorUtils;
    }());
    CommonUtils.WxAuthorUtils = WxAuthorUtils;
    __reflect(WxAuthorUtils.prototype, "CommonUtils.WxAuthorUtils");
})(CommonUtils || (CommonUtils = {}));
var CustomUI;
(function (CustomUI) {
    var BallUI = (function (_super) {
        __extends(BallUI, _super);
        function BallUI(power, state, isTemp) {
            var _this = _super.call(this) || this;
            _this.ballIndex = 0;
            _this.isTemp = false;
            if (isTemp) {
                _this.isTemp = isTemp;
            }
            _this.ballColor = _this.isTemp ? 0xEE6666 : 0xFFFFFF;
            _this.movingTopColor = 0xFFA000;
            _this.power = power;
            _this.mass = GameSetting.BallSetting.BallMass;
            _this.type = p2.Body.DYNAMIC;
            _this.radius = GameSetting.BallSetting.Radius[power];
            _this.roundShape = new p2.Circle({ radius: _this.radius });
            _this.addShape(_this.roundShape);
            _this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
            _this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
                | GameSetting.CollisionGroupSetting.WALL
                | GameSetting.CollisionGroupSetting.STUFF;
            if (state == Model.BallState.ReadyToFire) {
                _this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
                    | GameSetting.CollisionGroupSetting.WALL
                    | GameSetting.CollisionGroupSetting.STUFF;
            }
            _this.setMaterial(Model.MaterialType.Ball);
            _this.baseDisplay = new egret.Sprite();
            _this.ballNormal = new egret.Shape();
            _this.ballNormal.graphics.beginFill(_this.ballColor);
            _this.ballNormal.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(_this.radius));
            _this.ballNormal.graphics.endFill();
            _this.baseDisplay.addChild(_this.ballNormal);
            _this.ballMovingTop = new egret.Shape();
            _this.ballMovingTop.graphics.beginFill(_this.movingTopColor);
            _this.ballMovingTop.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(_this.radius));
            _this.ballMovingTop.graphics.endFill();
            _this.baseDisplay.addChild(_this.ballMovingTop);
            _this.ballMovingTop.visible = false;
            _this.damping = 0;
            _this.displays = [_this.baseDisplay];
            if (state)
                _this.state = state;
            else
                _this.state = Model.BallState.ReadyToFire;
            _this.lastSpeed = 100;
            return _this;
        }
        BallUI.prototype.fire = function (startX, startY, xSpeed, ySpeed) {
            this.position = [startX, startY];
            this.mass = 0;
            this.velocity = [xSpeed, ySpeed];
            this.state = Model.BallState.Fired;
            this.setMaterial(Model.MaterialType.Ball);
        };
        BallUI.prototype.setMaterial = function (material) {
            this.roundShape.material = new p2.Material(material);
        };
        BallUI.prototype.showDisplay = function (container) {
            if (!container.contains(this.baseDisplay)) {
                console.log("球体显示添加到舞台");
                console.log(container);
                container.addChild(this.baseDisplay);
                container.setChildIndex(this.baseDisplay, 2);
                this.baseDisplay.touchEnabled = false;
            }
            if (this.type == p2.Body.DYNAMIC) {
                var stagePosition = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
                this.baseDisplay.x = stagePosition.X;
                this.baseDisplay.y = stagePosition.Y;
            }
        };
        BallUI.prototype.setPowerful = function () {
            this.removeShape(this.roundShape);
            this.power = 2;
            this.radius = GameSetting.BallSetting.Radius[this.power];
            this.roundShape = new p2.Circle({ radius: this.radius });
            this.setMaterial(Model.MaterialType.Ball);
            this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
            this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
                | GameSetting.CollisionGroupSetting.WALL
                | GameSetting.CollisionGroupSetting.STUFF;
            this.addShape(this.roundShape);
            this.ballNormal.graphics.clear();
            this.ballNormal.graphics.beginFill(this.ballColor);
            this.ballNormal.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.radius));
            this.ballNormal.graphics.endFill();
            this.ballMovingTop.graphics.clear();
            this.ballMovingTop.graphics.beginFill(this.movingTopColor);
            this.ballMovingTop.graphics.drawCircle(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.radius));
            this.ballMovingTop.graphics.endFill();
        };
        BallUI.prototype.getPower = function () {
            return this.power;
        };
        BallUI.prototype.readyToFire = function () {
            this.state = Model.BallState.ReadyToFire;
            this.ballNormal.visible = true;
            this.ballMovingTop.visible = false;
            this.damping = 0;
        };
        BallUI.prototype.moveToTop = function (container, gameWorld, cannon) {
            var _this = this;
            var self = this;
            if (self.type == p2.Body.KINEMATIC)
                return;
            this.ballIndex = CustomUI.CannonUI.currBallIndex;
            CustomUI.CannonUI.currBallIndex++;
            self.type = p2.Body.KINEMATIC;
            self.ballMovingTop.visible = true;
            self.ballNormal.visible;
            var backWay = 0;
            if (self.position[0] <= CommonUtils.StageUtils.getWorldWidth() / 2) {
                backWay = 1;
            }
            else {
                backWay = -1;
            }
            var pathX = (CommonUtils.StageUtils.getWorldWidth() / 2) + backWay * (CommonUtils.StageUtils.getWorldWidth() / 2) - backWay * GameSetting.BallSetting.BallBackEdge;
            var stagePos0 = CommonUtils.CoordinateUtils.worldPositionToStage({ X: pathX, Y: self.position[1] + GameSetting.BallSetting.Radius[self.power] });
            var stagePos1 = CommonUtils.CoordinateUtils.worldPositionToStage({ X: pathX, Y: CommonUtils.StageUtils.getWorldHeight() - GameSetting.BallSetting.Radius[self.power] });
            var stagePos2 = CommonUtils.CoordinateUtils.worldPositionToStage({ X: pathX - backWay * GameSetting.BallSetting.Radius[self.power], Y: CommonUtils.StageUtils.getWorldHeight() - GameSetting.BallSetting.Radius[self.power] });
            self.velocity = [0, 0];
            self.force = [0, 0];
            egret.Tween.get(self.baseDisplay)
                .call(function () {
                self.state = Model.BallState.MovingToTop;
                gameWorld.loadNextLine();
            })
                .to({ x: stagePos0.X, y: stagePos0.Y }, 300)
                .to({ x: stagePos1.X, y: stagePos1.Y }, 600)
                .to({ x: stagePos2.X, y: stagePos2.Y }, 50)
                .call(function () {
                if (_this.isTemp) {
                    self.state = Model.BallState.ReadyToFire;
                    console.log("摧毁临时球");
                    console.log(container);
                    _this.destory(container);
                    cannon.decreaseTempBallCount();
                    gameWorld.readyToFire(true);
                    return;
                }
                var worldPos = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: self.baseDisplay.x, Y: self.baseDisplay.y });
                self.setMaterial(Model.MaterialType.None);
                self.type = p2.Body.DYNAMIC;
                self.position = [worldPos.X, worldPos.Y];
                self.velocity = [0, 0.5];
                self.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
                self.state = Model.BallState.ReadyToFire;
                gameWorld.readyToFire(true);
            });
        };
        BallUI.prototype.addRandomSpeed = function () {
            if (this.state != Model.BallState.Fired)
                return;
            var speedAddX = 0.5 + Math.random() * 1;
            var speedAddY = 0.5 + Math.random() * 1.5;
            if (Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]) < 1.3 && this.velocity[1] < 0) {
                if (this.velocity[0] > 0) {
                    this.velocity[0] += speedAddX;
                }
                else {
                    this.velocity[0] -= speedAddX;
                }
                if (this.velocity[1] > 0) {
                    this.velocity[1] += speedAddY;
                }
                else {
                    this.velocity[1] -= speedAddY;
                }
            }
            this.unlockStuck();
        };
        BallUI.prototype.unlockStuck = function () {
            if (this.state != Model.BallState.Fired)
                return;
            var speed = Math.sqrt(this.velocity[0] * this.velocity[0] + this.velocity[1] * this.velocity[1]);
            if (speed < 0.1 && Math.abs(speed - this.lastSpeed) < 0.01) {
                this.velocity[0] = (Math.random() - 0.5) * 2;
                this.velocity[1] = (Math.random()) * 2;
            }
            this.lastSpeed = speed;
        };
        BallUI.prototype.destory = function (container) {
            var x = this.baseDisplay.x;
            var y = this.baseDisplay.y;
            console.log("摧毁球体的实现方法");
            console.log(container);
            console.log(this.baseDisplay.parent);
            if (container.contains(this.baseDisplay)) {
                this.baseDisplay.removeChild(this.ballNormal);
                this.baseDisplay.removeChild(this.ballMovingTop);
                container.removeChild(this.baseDisplay);
                console.log("删除球体显示");
            }
            if (this.world)
                this.world.removeBody(this);
        };
        return BallUI;
    }(CustomUI.BaseBodyUI));
    CustomUI.BallUI = BallUI;
    __reflect(BallUI.prototype, "CustomUI.BallUI");
})(CustomUI || (CustomUI = {}));
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
        var bg = CommonUtils.BitmapUtils.createBitmapByName("loading_bg_jpg");
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
        var logo = CommonUtils.BitmapUtils.createBitmapByName("game_logo_png");
        this.addChild(logo);
        logo.x = (750 - logo.width) / 2;
        logo.y = midY - logo.height - 50;
        var mcTexture = RES.getRes("loadingAnimate_png");
        var mcData = RES.getRes("loadingAnimate_json");
        var loadingDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        var progressBarFront = new egret.MovieClip(loadingDataFactory.generateMovieClipData("loading"));
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
var CustomUI;
(function (CustomUI) {
    var BenefitUI = (function (_super) {
        __extends(BenefitUI, _super);
        function BenefitUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BenefitUI.prototype.buildShapeAndDisplay = function () {
            var stageRadius = CommonUtils.CoordinateUtils.worldLengthToStage(this.radius);
            this.shape = new p2.Circle({ radius: this.radius });
            this.addShape(this.shape);
            this.baseDisplay = new egret.Sprite();
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_benefit_png");
            bitmap.width = stageRadius * 2;
            bitmap.height = stageRadius * 2;
            bitmap.anchorOffsetX = stageRadius;
            bitmap.anchorOffsetY = stageRadius;
            this.baseDisplay.addChild(bitmap);
            this.hitted = false;
        };
        BenefitUI.prototype.hittedByBall = function (ball, cannon, container) {
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, 1);
            container.openBenefitBox(this.clientId, this);
        };
        BenefitUI.prototype.hittedByLaser = function (ball, cannon, container) {
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, 1);
            container.openBenefitBox(this.clientId, this);
        };
        return BenefitUI;
    }(CustomUI.StuffUI));
    CustomUI.BenefitUI = BenefitUI;
    __reflect(BenefitUI.prototype, "CustomUI.BenefitUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var BrickContainerUI = (function (_super) {
        __extends(BrickContainerUI, _super);
        function BrickContainerUI(top, containerHeight, lineCount, gameWorld, container) {
            var _this = _super.call(this) || this;
            _this.bottom = CommonUtils.StageUtils.getWorldHeight() - containerHeight - top;
            _this.lineCount = lineCount;
            _this.containerHeight = containerHeight;
            _this.lineHeight = (containerHeight) / lineCount;
            _this.containerWidth = (CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding * 2);
            _this.gameWorld = gameWorld;
            _this.container = container;
            _this.brickWidth = _this.containerWidth / 6;
            _this.bricks = [];
            _this.stuffs = [];
            _this.benefits = [];
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BrickContainerUI.prototype.resetBricks = function (lineDataArray, currRowIndex, animate, container) {
            var _this = this;
            CommonUtils.LoggerUtil.log("开始重新设置砖块");
            CommonUtils.LoggerUtil.log(lineDataArray);
            CommonUtils.LoggerUtil.log("container is");
            CommonUtils.LoggerUtil.log(container);
            CommonUtils.LoggerUtil.log("this.container is");
            CommonUtils.LoggerUtil.log(this.container);
            CommonUtils.LoggerUtil.log("currRowIndex ");
            CommonUtils.LoggerUtil.log(currRowIndex);
            var positionCount = 5;
            var self = this;
            var newBricksArray = [];
            var newBricksDic = {};
            lineDataArray.forEach(function (lineData) {
                for (var i = 0; i < lineData.Bricks.length; i++) {
                    var itemData = lineData.Bricks[i];
                    if (!itemData) {
                        continue;
                    }
                    newBricksArray.push({ data: itemData, row: lineData.RowIndex, PositionCount: i });
                    newBricksDic[itemData.Id] = { data: itemData, row: lineData.RowIndex, PositionCount: i };
                }
            });
            var selfBricksDic = {};
            this.bricks.forEach(function (brick) {
                selfBricksDic[brick.clientId] = brick;
            });
            var selfBenefitDic = {};
            this.benefits.forEach(function (benefit) {
                selfBenefitDic[benefit.clientId] = benefit;
            });
            var selfStuffDic = {};
            this.stuffs.forEach(function (stuff) {
                selfStuffDic[stuff.clientId] = stuff;
            });
            // 筛选出需要新加的砖块
            var bricksToAdd = newBricksArray.filter(function (val, index, newBricksArray) {
                if (selfBricksDic[val.data.Id] == null && selfStuffDic[val.data.Id] == null && selfBenefitDic[val.data.Id] == null) {
                    return val;
                }
                return null;
            });
            // 筛选出需要更新的砖块
            var bricksToModify = newBricksArray.filter(function (val, index, newBricksArray) {
                if (selfBricksDic[val.data.Id] == null && selfStuffDic[val.data.Id] == null && selfBenefitDic[val.data.Id] == null) {
                    return null;
                }
                return val;
            });
            // 筛选出需要销毁的砖块
            var bricksToDestory = this.bricks.filter(function (val, index, newBricksArray) {
                if (newBricksDic[val.clientId] == null)
                    return val;
                return null;
            });
            // 筛选出需要销毁的奖励箱
            var benefitsToDestory = this.benefits.filter(function (val, index, newBricksArray) {
                if (newBricksDic[val.clientId] == null)
                    return val;
                return null;
            });
            // 筛选出需要销毁的道具
            var stuffToDestory = this.stuffs.filter(function (val, index, newBricksArray) {
                if (newBricksDic[val.clientId] == null)
                    return val;
                return null;
            });
            // 创建新砖块
            bricksToAdd.forEach(function (val) {
                var itemData = val.data;
                if (itemData.BrickType == 0) {
                    CommonUtils.LoggerUtil.log("创建新增的砖块");
                    var brick_1;
                    var startX = val.row % 2 == 1 ? _this.brickWidth / 2 : _this.brickWidth;
                    if (itemData.BrickData.Shape == 0) {
                        brick_1 = new CustomUI.RoundBrickUI(itemData.BrickData.Life);
                    }
                    else {
                        brick_1 = new CustomUI.PolygonBrickUI(itemData.BrickData.Life, itemData.BrickData.Shape);
                    }
                    brick_1.clientId = itemData.Id;
                    brick_1.position = [GameSetting.WallSetting.WallPadding + startX + (_this.brickWidth * val.PositionCount), _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (currRowIndex - val.row)];
                    CommonUtils.LoggerUtil.log("new brick position");
                    CommonUtils.LoggerUtil.log(brick_1.position);
                    brick_1.rowIndex = val.row;
                    _this.gameWorld.addBody(brick_1);
                    brick_1.showDisplay(container, false);
                    brick_1.onDestoried = function (id) {
                        for (var i = 0; i < self.bricks.length; i++) {
                            if (self.bricks[i].id != id)
                                continue;
                            self.bricks.splice(i, 1);
                            brick_1 = null;
                            return;
                        }
                    };
                    self.bricks.push(brick_1);
                    return;
                }
                else if (itemData.BrickType == 1) {
                    CommonUtils.LoggerUtil.log("创建新增的道具");
                    var stuff = void 0;
                    var startX = val.row % 2 == 1 ? _this.brickWidth / 2 : _this.brickWidth;
                    if (itemData.BrickData.Code == "double") {
                        stuff = new CustomUI.PowerUpBallStuffUI(GameSetting.BrickSetting.Radius * GameSetting.BrickSetting.StuffScale);
                    }
                    else if (itemData.BrickData.Code == "split") {
                        stuff = new CustomUI.SplitBallStuffUI(GameSetting.BrickSetting.Radius * GameSetting.BrickSetting.StuffScale);
                    }
                    stuff.clientId = itemData.Id;
                    stuff.position = [GameSetting.WallSetting.WallPadding + startX + (_this.brickWidth * val.PositionCount), _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (currRowIndex - val.row)];
                    CommonUtils.LoggerUtil.log("new stuff position");
                    CommonUtils.LoggerUtil.log(stuff.position);
                    stuff.rowIndex = val.RowIndex;
                    _this.gameWorld.addBody(stuff);
                    stuff.showDisplay(container, false);
                    stuff.onDestoried = function (id) {
                        for (var i = 0; i < self.stuffs.length; i++) {
                            if (self.stuffs[i].id != id)
                                continue;
                            self.stuffs.splice(i, 1);
                            return;
                        }
                    };
                    self.stuffs.push(stuff);
                }
                else if (itemData.BrickType == 2) {
                    CommonUtils.LoggerUtil.log("创建新增的奖励箱");
                    var benefit = new CustomUI.BenefitUI(GameSetting.BrickSetting.Radius * GameSetting.BrickSetting.StuffScale);
                    var startX = val.row % 2 == 1 ? _this.brickWidth / 2 : _this.brickWidth;
                    benefit.clientId = itemData.Id;
                    benefit.position = [GameSetting.WallSetting.WallPadding + startX + (_this.brickWidth * val.PositionCount), _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (currRowIndex - val.row)];
                    CommonUtils.LoggerUtil.log("new stuff position");
                    CommonUtils.LoggerUtil.log(benefit.position);
                    benefit.rowIndex = val.RowIndex;
                    _this.gameWorld.addBody(benefit);
                    CommonUtils.LoggerUtil.log(_this.container);
                    benefit.showDisplay(container, false);
                    benefit.onDestoried = function (id) {
                        for (var i = 0; i < self.benefits.length; i++) {
                            if (self.benefits[i].id != id)
                                continue;
                            self.benefits.splice(i, 1);
                            return;
                        }
                    };
                    self.benefits.push(benefit);
                }
            });
            // 更新砖块、奖励箱和道具
            bricksToModify.forEach(function (val) {
                var brick = selfBricksDic[val.data.Id];
                if (brick) {
                    CommonUtils.LoggerUtil.log("更新一个砖块");
                    brick.position[1] = _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (currRowIndex - val.row);
                    CommonUtils.LoggerUtil.log("update brick position");
                    CommonUtils.LoggerUtil.log(brick.position);
                    brick.showLife(val.data.Life);
                    brick.showDisplay(container, false);
                    return;
                }
                var stuff = selfStuffDic[val.data.Id];
                if (stuff) {
                    CommonUtils.LoggerUtil.log("更新一个道具");
                    stuff.position[1] = _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (currRowIndex - val.row);
                    CommonUtils.LoggerUtil.log("update stuff position");
                    CommonUtils.LoggerUtil.log(stuff.position);
                    stuff.showDisplay(container, false);
                    return;
                }
                var benefit = selfBenefitDic[val.data.Id];
                if (benefit) {
                    CommonUtils.LoggerUtil.log("更新一个奖励箱");
                    benefit.position[1] = _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (currRowIndex - val.row);
                    CommonUtils.LoggerUtil.log("update benefit position");
                    CommonUtils.LoggerUtil.log(benefit.position);
                    benefit.showDisplay(container, false);
                    return;
                }
            });
            bricksToDestory.forEach(function (val) { val.destory(false, _this.container); });
            benefitsToDestory.forEach(function (val) { val.destory(_this.container); });
            stuffToDestory.forEach(function (val) { val.destory(_this.container); });
        };
        BrickContainerUI.prototype.onAddToStage = function (event) {
            this.x = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.WallSetting.WallPadding);
        };
        BrickContainerUI.prototype.drawBg = function () {
            var bg = new egret.Shape();
            bg.graphics.beginFill(0xFF0000, 0.5);
            bg.graphics.drawRect(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(this.containerWidth), CommonUtils.CoordinateUtils.worldLengthToStage(this.containerHeight));
            bg.graphics.endFill();
            this.addChild(bg);
        };
        BrickContainerUI.prototype.lineupBricks = function (anmit, nextRowIndex) {
            var _this = this;
            var hasOld = false;
            this.bricks.forEach(function (val) {
                if (val.rowIndex == nextRowIndex)
                    hasOld = true;
                val.lineIndex++;
                val.position[1] = _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (nextRowIndex - val.rowIndex);
                val.resetDisplayPosition(anmit);
            });
            return hasOld;
        };
        BrickContainerUI.prototype.lineupStuffs = function (anmit, nextRowIndex) {
            var _this = this;
            var hasOld = false;
            this.stuffs.forEach(function (val) {
                if (val.rowIndex == nextRowIndex)
                    hasOld = true;
                val.lineIndex++;
                val.position[1] = _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (nextRowIndex - val.rowIndex);
                val.resetDisplayPosition(anmit);
            });
            return hasOld;
        };
        BrickContainerUI.prototype.lineupBenefits = function (anmit, nextRowIndex) {
            var _this = this;
            var hasOld = false;
            this.benefits.forEach(function (val) {
                if (val.rowIndex == nextRowIndex)
                    hasOld = true;
                val.lineIndex++;
                val.position[1] = _this.bottom + GameSetting.BrickSetting.Radius + _this.lineHeight * (nextRowIndex - val.rowIndex);
                val.resetDisplayPosition(anmit);
            });
            return hasOld;
        };
        BrickContainerUI.prototype.revive = function (container, data, gameWorld) {
            var self = this;
            // 开始复活
            console.log("开始复活，复活后的数据为：");
            console.log(data);
            var lines = CommonUtils.GameUtils.parseBrickLineData(data.Lines);
            var currRowIndex = data.RowIndex;
            this.resetBricks(lines, currRowIndex, true, container);
        };
        BrickContainerUI.prototype.destoryAllBricks = function (animate, container, gameWorld) {
            var brick = this.bricks.pop();
            while (brick) {
                brick.destory(animate, container);
                brick = this.bricks.pop();
            }
            var stuff = this.stuffs.pop();
            while (stuff) {
                stuff.destory(container);
                stuff = this.stuffs.pop();
            }
            var benefit = this.benefits.pop();
            while (benefit) {
                benefit.destory(container);
                benefit = this.benefits.pop();
            }
        };
        BrickContainerUI.prototype.deleteBrickLine = function (anmit) {
            var self = this;
            var maxLineIndex = 0;
            this.bricks.forEach(function (val) {
                if (val.lineIndex > maxLineIndex)
                    maxLineIndex = val.lineIndex;
            });
            this.stuffs.forEach(function (val) {
                if (val.lineIndex > maxLineIndex)
                    maxLineIndex = val.lineIndex;
            });
            var random = Math.floor(Math.random() * (maxLineIndex + 1));
            for (var i = this.bricks.length - 1; i >= 0; i--) {
                var val = this.bricks[i];
                if (val.lineIndex < random)
                    continue;
                if (val.lineIndex == random) {
                    val.destory(true, this.container);
                    continue;
                }
                val.lineIndex--;
                val.position[1] -= this.lineHeight;
                val.resetDisplayPosition(anmit);
            }
            for (var i = this.stuffs.length - 1; i >= 0; i--) {
                var val = this.stuffs[i];
                if (val.lineIndex < random)
                    continue;
                if (val.lineIndex == random) {
                    val.destory(this.container);
                    continue;
                }
                val.lineIndex--;
                val.position[1] -= this.lineHeight;
                val.resetDisplayPosition(anmit);
            }
        };
        return BrickContainerUI;
    }(egret.Sprite));
    CustomUI.BrickContainerUI = BrickContainerUI;
    __reflect(BrickContainerUI.prototype, "CustomUI.BrickContainerUI");
})(CustomUI || (CustomUI = {}));
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
    DebugPlatform.prototype.shareAppMessage = function (title, imageUrl, onSuccess, onFailed, onComplete) {
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
var CustomUI;
(function (CustomUI) {
    var ButtonBenefit = (function (_super) {
        __extends(ButtonBenefit, _super);
        function ButtonBenefit() {
            var _this = _super.call(this) || this;
            _this.iconWidth = 30;
            _this.iconBonus = "panel_icon_bonus_png";
            _this.iconGold = "panel_icon_gold_png";
            _this.hasUnreaded = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.unPopBonus = 0;
            _this.unPopGold = 0;
            return _this;
        }
        ButtonBenefit.prototype.onAddToStage = function (evt) {
            var _this = this;
            var btn = new egret.Sprite();
            this.addChild(btn);
            var btnImg = CommonUtils.BitmapUtils.createBitmapByName("btn_benefit_png");
            btn.addChild(btnImg);
            this.iconUnread = CommonUtils.BitmapUtils.createBitmapByName("icon_unread_png");
            btn.addChild(this.iconUnread);
            this.iconUnread.x = btnImg.width - this.iconUnread.width / 1.5;
            this.iconUnread.visible = false;
            var shake = 0.3;
            var orgX = btnImg.x;
            var orgY = btnImg.y;
            var shakeInterval = 25;
            this.shakeTimer = new egret.Timer(3000, 5);
            this.shakeTimer.addEventListener(egret.TimerEvent.TIMER, function (evt) {
                if (!_this.hasUnreaded) {
                    return;
                }
                egret.Tween.get(btn)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX + btn.width * shake * Math.random(), y: orgY + btn.height * shake * Math.random() }, shakeInterval)
                    .to({ x: orgX, y: orgY }, shakeInterval);
            }, this);
            if (this.unPopBonus > 0 || this.unPopGold > 0) {
                this.shakeTimer.start();
            }
        };
        ButtonBenefit.prototype.popBenefit = function (bonus, gold) {
            var _this = this;
            this.shakeTimer.stop();
            var bonusInterval = 300;
            var goldInterval = bonusInterval;
            this.unPopBonus += bonus;
            this.unPopGold += gold;
            this.setUnread();
            if (bonus > 0) {
                goldInterval = bonusInterval + 300;
            }
            var startY = -46;
            if (bonus > 0) {
                setTimeout(function () {
                    var pop = _this.buildPopContainer(_this.iconBonus, bonus);
                    _this.addChild(pop);
                    pop.y = startY;
                    egret.Tween.get(pop)
                        .to({ y: startY - 180, alpha: 0 }, 1000)
                        .call(function () {
                        _this.removeChild(pop);
                    });
                }, bonusInterval);
            }
            if (gold > 0) {
                setTimeout(function () {
                    var pop = _this.buildPopContainer(_this.iconGold, gold);
                    _this.addChild(pop);
                    pop.y = startY;
                    egret.Tween.get(pop)
                        .to({ y: startY - 180, alpha: 0 }, 1000)
                        .call(function () {
                        _this.removeChild(pop);
                    });
                }, goldInterval);
            }
        };
        ButtonBenefit.prototype.popBonus = function () {
            var pop = this.unPopBonus;
            this.unPopBonus = 0;
            return pop;
        };
        ButtonBenefit.prototype.popGold = function () {
            var pop = this.unPopGold;
            this.unPopGold = 0;
            return pop;
        };
        ButtonBenefit.prototype.setUnread = function () {
            this.hasUnreaded = true;
            this.iconUnread.visible = true;
            this.shakeTimer.reset();
            this.shakeTimer.start();
        };
        ButtonBenefit.prototype.setRead = function () {
            this.hasUnreaded = false;
            this.iconUnread.visible = false;
            this.shakeTimer.stop();
        };
        ButtonBenefit.prototype.buildPopContainer = function (iconName, value) {
            var pop = new egret.DisplayObjectContainer();
            var icon = CommonUtils.BitmapUtils.createBitmapByName(iconName);
            pop.addChild(icon);
            icon.width = this.iconWidth;
            icon.height = this.iconWidth;
            var text = new egret.TextField;
            pop.addChild(text);
            text.text = "+ " + value;
            text.x = this.iconWidth + 10;
            text.y = (this.iconWidth - text.height) / 2;
            return pop;
        };
        return ButtonBenefit;
    }(egret.Sprite));
    CustomUI.ButtonBenefit = ButtonBenefit;
    __reflect(ButtonBenefit.prototype, "CustomUI.ButtonBenefit");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var CannonUI = (function (_super) {
        __extends(CannonUI, _super);
        function CannonUI(gameWorld, container) {
            var _this = _super.call(this) || this;
            _this.tempBallCount = 0;
            _this.balls = [];
            _this.aiming = false;
            _this.power = CannonUI.defaultPower;
            _this.totalBallCount = 0;
            _this.validBallCount = 0;
            _this.speedUp = false;
            _this.doubleBalls = false;
            _this.useLaser = false;
            _this.tempBalls = [];
            _this.gameWorld = gameWorld;
            _this.container = container;
            CannonUI.self = _this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        CannonUI.prototype.clearTools = function () {
            this.useLaser = false;
            this.doubleBalls = false;
        };
        CannonUI.prototype.redrawBalls = function () {
            var _this = this;
            this.balls.forEach(function (item) {
                item.showDisplay(_this.container);
            });
            this.tempBalls.forEach(function (item) {
                item.showDisplay(_this.container);
            });
        };
        CannonUI.prototype.isToolInUse = function () {
            return (this.doubleBalls || this.useLaser);
        };
        CannonUI.prototype.checkBallSpeed = function () {
            this.balls.forEach(function (val) {
                if (!val)
                    return;
                if (val.velocity[1] <= -GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = -GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                if (val.velocity[1] >= GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                val.unlockStuck();
            });
            this.tempBalls.forEach(function (val) {
                if (!val)
                    return;
                if (val.velocity[1] <= -GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = -GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                if (val.velocity[1] >= GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                val.unlockStuck();
            });
        };
        CannonUI.prototype.onAddToStage = function (evt) {
            var _this = this;
            this.aimLine = [];
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i] = new egret.Shape();
                this.aimLine[i].graphics.beginFill(CannonUI.aimPointColor);
                this.aimLine[i].graphics.drawCircle(0, 0, CannonUI.aimPointRadius);
                this.aimLine[i].graphics.endFill();
                this.aimLine[i].visible = false;
                this.addChild(this.aimLine[i]);
            }
            this.laserLine = [];
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i] = CommonUtils.BitmapUtils.createBitmapByName("laser_aiming_ling_png");
                this.laserLine[i].visible = false;
                this.addChild(this.laserLine[i]);
            }
            this.laserCannon = CommonUtils.BitmapUtils.createBitmapByName("laser_cannon_png");
            this.laserCannon.anchorOffsetX = this.laserCannon.width / 2;
            this.laserCannon.anchorOffsetY = this.laserCannon.height / 2;
            this.laserCannon.scaleX = CommonUtils.StageUtils.getStageScale();
            this.laserCannon.scaleY = CommonUtils.StageUtils.getStageScale();
            this.addChild(this.laserCannon);
            this.laserCannon.visible = false;
            setInterval(function () {
                egret.Tween.get(_this.laserCannon)
                    .to({ scaleX: CommonUtils.StageUtils.getStageScale() * 0.7, scaleY: CommonUtils.StageUtils.getStageScale() * 0.7 }, 1500)
                    .to({ scaleX: CommonUtils.StageUtils.getStageScale(), scaleY: CommonUtils.StageUtils.getStageScale() }, 1500);
            }, 3000);
        };
        CannonUI.prototype.doubleNextRound = function () {
            var _this = this;
            this.doubleBalls = true;
            this.cannonIsReady = false;
            setTimeout(function () {
                var msg = CommonUtils.BitmapUtils.createBitmapByName("double_ready_msg_png");
                _this.container.addChild(msg);
                _this.container.setChildIndex(msg, -1);
                msg.scaleX = CommonUtils.StageUtils.getStageScale();
                msg.scaleY = CommonUtils.StageUtils.getStageScale();
                msg.x = (_this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
                msg.y = (_this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
                msg.alpha = 1;
                egret.Tween.get(msg)
                    .wait(1000)
                    .to({ alpha: 0 }, 500)
                    .call(function () { _this.container.removeChild(msg); });
            }, 500);
            if (this.isAllBallReadyToFire() && this.doubleBalls) {
                this.buildTempBalls();
            }
        };
        CannonUI.prototype.buildTempBalls = function () {
            var _this = this;
            this.tempBalls = [];
            var timer = new egret.Timer(50, this.balls.length);
            var count = 0;
            this.cannonIsReady = false;
            timer.addEventListener(egret.TimerEvent.TIMER, function (evt) {
                console.log("\u65B0\u589E\u4E34\u65F6\u7403 this.cannonIsReady = " + _this.cannonIsReady);
                var newBall = new CustomUI.BallUI(_this.balls[count].getPower(), Model.BallState.ReadyToFire, true);
                _this.tempBalls.push(newBall);
                newBall.position = [CommonUtils.StageUtils.getWorldWidth() * 0.3 + Math.random() * 0.4, CommonUtils.StageUtils.getWorldHeight()];
                newBall.showDisplay(_this.container);
                _this.gameWorld.addBody(newBall);
                count++;
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (evt) {
                _this.cannonIsReady = true;
            }, this);
            timer.start();
        };
        CannonUI.prototype.laserNextRound = function () {
            var _this = this;
            this.useLaser = true;
            setTimeout(function () {
                var msg = CommonUtils.BitmapUtils.createBitmapByName("laser_ready_msg_png");
                _this.container.addChild(msg);
                _this.container.setChildIndex(msg, -1);
                msg.scaleX = CommonUtils.StageUtils.getStageScale();
                msg.scaleY = CommonUtils.StageUtils.getStageScale();
                msg.x = (_this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
                msg.y = (_this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
                msg.alpha = 1;
                egret.Tween.get(msg)
                    .wait(1000)
                    .to({ alpha: 0 }, 500)
                    .call(function () { _this.container.removeChild(msg); });
            }, 500);
            if (this.isReadyToFire() && this.useLaser) {
                this.showLaserCannon();
            }
        };
        CannonUI.prototype.showLaserCannon = function () {
            this.laserCannon.visible = true;
        };
        CannonUI.prototype.hideLaserCannon = function () {
            this.laserCannon.visible = false;
        };
        CannonUI.prototype.startAim = function () {
            CommonUtils.LoggerUtil.log(" this.isReadyToFire() = " + this.isReadyToFire());
            CommonUtils.LoggerUtil.log(" CannonUI.self.firing= " + CannonUI.self.firing);
            CommonUtils.LoggerUtil.log(" this.aiming = " + this.aiming);
            if (!this.isAllBallReadyToFire()) {
                this.aiming = false;
                console.log("没有准备好瞄准");
                return;
            }
            if (CannonUI.self.firing) {
                console.log("正在瞄准");
                return;
            }
            this.aiming = true;
            if (!this.useLaser) {
                this.showBallLine();
                return;
            }
            this.showLaserLine();
        };
        CannonUI.prototype.stopAim = function () {
            this.aiming = false;
            this.hideBallLine();
            this.hideLaserLine();
        };
        CannonUI.prototype.aim = function (stageX, stageY) {
            var aimingLimit = 0.1;
            if (!this.aiming) {
                return;
            }
            if (CannonUI.self.firing)
                return;
            if (stageX != this.x) {
                this.angle = Math.atan((stageY - this.y) / (stageX - this.x));
                if (this.angle < 0) {
                    this.angle += Math.PI;
                }
            }
            else {
                this.angle = Math.PI / 2;
            }
            if (this.angle >= Math.PI * (1 - aimingLimit)) {
                this.angle = Math.PI * (1 - aimingLimit);
            }
            if (this.angle <= Math.PI * aimingLimit) {
                this.angle = Math.PI * aimingLimit;
            }
            if (!this.useLaser) {
                this.ballLineAiming(stageX, stageY);
                return;
            }
            this.laserLineAiming(stageX, stageY);
        };
        CannonUI.prototype.fire = function () {
            if (!this.aiming)
                return;
            if (CannonUI.self.firing)
                return;
            this.destoryAllTempBalls(this.container, this.gameWorld);
            if (!this.useLaser) {
                this.fireBalls();
                return;
            }
            this.fireLaser();
        };
        CannonUI.prototype.readyToFire = function () {
            if (!this.isAllBallReadyToFire())
                return false;
            if (this.useLaser) {
                this.showLaserCannon();
            }
            if (this.doubleBalls) {
                this.buildTempBalls();
            }
            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].readyToFire();
            }
            this.validBallCount = this.totalBallCount;
            if (this.onBallCountChanged)
                this.onBallCountChanged(this.validBallCount, this.totalBallCount);
            this.cannonIsReady = true;
            console.log("cannon 准备就绪");
            return true;
        };
        CannonUI.prototype.destoryAllBalls = function (container, gameWorld) {
            this.destoryAllTempBalls(container, gameWorld);
            var ball = this.balls.pop();
            while (ball) {
                ball.destory(container);
                ball = this.balls.pop();
            }
        };
        CannonUI.prototype.destoryAllTempBalls = function (container, gameWorld) {
            var ball = this.tempBalls.pop();
            while (ball) {
                ball.destory(container);
                ball = this.tempBalls.pop();
            }
        };
        CannonUI.prototype.initGenisBall = function (ballCount, container, gameWorld) {
            var self = this;
            var worldPos = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: this.x, Y: this.y });
            for (var i = 0; i < ballCount; i++) {
                var newBall = new CustomUI.BallUI(1, Model.BallState.ReadyToFire);
                newBall.position = [worldPos.X, CommonUtils.CoordinateUtils.stageLengthToWorld(this.stage.stageHeight - this.y + 30)];
                gameWorld.addBody(newBall);
                newBall.showDisplay(container);
                this.balls.push(newBall);
            }
            this.totalBallCount = ballCount;
            this.validBallCount = ballCount;
            if (this.onBallCountChanged)
                this.onBallCountChanged(this.validBallCount, this.totalBallCount);
            this.cannonIsReady = true;
        };
        CannonUI.prototype.increaseBall = function (ball, container, gameWorld) {
            var self = this;
            gameWorld.addBody(ball);
            ball.showDisplay(container);
            this.balls.push(ball);
            this.totalBallCount += 1;
            if (this.onBallCountChanged)
                this.onBallCountChanged(this.validBallCount, this.totalBallCount);
        };
        CannonUI.prototype.decreaseTempBallCount = function () {
            this.tempBallCount--;
        };
        CannonUI.prototype.isAllBallHitFloor = function () {
            for (var i = 0; i < this.tempBalls.length; i++) {
                if (this.tempBalls[i].state == Model.BallState.Fired)
                    return false;
                if (this.tempBalls[i].state == Model.BallState.Unknown)
                    return false;
            }
            ;
            for (var i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state == Model.BallState.Fired)
                    return false;
                if (this.balls[i].state == Model.BallState.Unknown)
                    return false;
            }
            ;
            return true;
        };
        CannonUI.prototype.isAllMovingToTop = function () {
            for (var i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state == Model.BallState.ReadyToFire || this.balls[i].state != Model.BallState.MovingToTop)
                    return false;
            }
            ;
            for (var i = 0; i < this.tempBalls.length; i++) {
                if (this.tempBalls[i].state == Model.BallState.ReadyToFire || this.balls[i].state != Model.BallState.MovingToTop)
                    return false;
            }
            ;
            return true;
        };
        CannonUI.prototype.isReadyToFire = function () {
            return this.cannonIsReady;
        };
        CannonUI.prototype.isAllBallReadyToFire = function () {
            if (this.tempBallCount > 0)
                return false;
            for (var i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state != Model.BallState.ReadyToFire)
                    return false;
            }
            ;
            return true;
        };
        CannonUI.prototype.showBallLine = function () {
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i].visible = true;
            }
        };
        CannonUI.prototype.hideBallLine = function () {
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i].visible = false;
            }
        };
        CannonUI.prototype.ballLineAiming = function (stageX, stageY) {
            if (stageX != this.x) {
                this.angle = Math.atan((stageY - this.y) / (stageX - this.x));
                if (this.angle < 0) {
                    this.angle += Math.PI;
                }
            }
            else {
                this.angle = Math.PI / 2;
            }
            var p = ((stageY - this.y) / CannonUI.maxLength) * CannonUI.defaultPower;
            p = Math.max(p, CannonUI.defaultPower / 4);
            var length = (p / CannonUI.defaultPower) * CannonUI.maxLength;
            var stepX = (length / CannonUI.aimPointCount) * Math.cos(this.angle);
            var stepY = (length / CannonUI.aimPointCount) * Math.sin(this.angle);
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i].x = i * stepX;
                this.aimLine[i].y = i * stepY;
            }
            p = null;
        };
        CannonUI.prototype.showLaserLine = function () {
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i].visible = true;
            }
        };
        CannonUI.prototype.hideLaserLine = function () {
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i].visible = false;
            }
        };
        CannonUI.prototype.laserLineAiming = function (stageX, stageY) {
            var p = ((stageY - this.y) / CannonUI.maxLength) * CannonUI.defaultPower;
            p = Math.max(p, CannonUI.defaultPower / 4);
            var length = (p / CannonUI.defaultPower) * CannonUI.maxLength;
            var stepX = (length / CannonUI.aimPointCount) * Math.cos(this.angle);
            var stepY = (length / CannonUI.aimPointCount) * Math.sin(this.angle);
            for (var i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i].x = i * stepX;
                this.laserLine[i].y = i * stepY;
                this.laserLine[i].rotation = 180 * (this.angle / Math.PI);
            }
        };
        CannonUI.prototype.fireLaser = function () {
            var _this = this;
            this.cannonIsReady = false;
            var worldPosition = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: this.x, Y: this.y });
            var xspeed = this.power * Math.cos(this.angle);
            var yspeed = -this.power * Math.abs(Math.sin(this.angle));
            CannonUI.self.firing = true;
            this.hideLaserCannon();
            var laserBall = new CustomUI.LaserBallUI(0.2, 5000);
            laserBall.onDestroy = function () {
                CannonUI.self.firing = false;
                _this.cannonIsReady = true;
                _this.useLaser = false;
                _this.gameWorld.sendDamageData(true);
                _this.gameWorld.readyToFire(true);
            };
            this.gameWorld.addBody(laserBall);
            laserBall.showDisplay(this.container);
            laserBall.fire(worldPosition.X, worldPosition.Y, xspeed, yspeed);
        };
        CannonUI.prototype.fireBall = function () {
            if (GameScene.PlayField.self.paused) {
                setTimeout(function () { CannonUI.self.fireBall(); }, 200);
                return;
            }
            console.log("current fire index  " + CannonUI.self.fireIndex);
            if (CannonUI.self.speedUp) {
                CannonUI.self.fireDelay = 100;
            }
            var tmpDouble = CannonUI.self.doubleBalls;
            if (CannonUI.self.fireIndex >= CannonUI.self.ballcount) {
                CannonUI.self.firing = false;
                return;
            }
            CannonUI.self.balls[CannonUI.self.fireIndex].fire(CannonUI.self.firePosition.X, CannonUI.self.firePosition.Y, CannonUI.self.xspeed, CannonUI.self.yspeed);
            CannonUI.self.fireIndex++;
            console.log("current fire index after add " + CannonUI.self.fireIndex);
            CannonUI.self.validBallCount--;
            if (CannonUI.self.onBallCountChanged) {
                CannonUI.self.onBallCountChanged(CannonUI.self.validBallCount, CannonUI.self.totalBallCount);
            }
            setTimeout(function () {
                CannonUI.self.fireBall();
                // 如果所有的球打完，判断是否有双倍球要打
                if (CannonUI.self.fireIndex >= CannonUI.self.ballcount) {
                    if (tmpDouble) {
                        CannonUI.self.firing = true;
                        CannonUI.self.fireTempIndex = 0;
                        CannonUI.self.tempBallCount = CannonUI.self.tempBalls.length;
                        setTimeout(function () { CannonUI.self.fireTempBall(); }, CannonUI.self.fireDelay);
                    }
                    CannonUI.self.firing = false;
                    return;
                }
            }, 200);
        };
        CannonUI.prototype.fireTempBall = function () {
            if (GameScene.PlayField.self.paused) {
                setTimeout(function () { CannonUI.self.fireTempBall(); }, 200);
                return;
            }
            if (CannonUI.self.fireTempIndex >= CannonUI.self.tempBallCount) {
                CannonUI.self.firing = false;
                CannonUI.self.doubleBalls = false;
                return;
            }
            CannonUI.self.tempBalls[CannonUI.self.fireTempIndex].fire(CannonUI.self.firePosition.X, CannonUI.self.firePosition.Y, CannonUI.self.xspeed, CannonUI.self.yspeed);
            CannonUI.self.fireTempIndex++;
            setTimeout(CannonUI.self.fireTempBall, CannonUI.self.fireDelay);
        };
        CannonUI.prototype.fireBalls = function () {
            for (var i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state != Model.BallState.ReadyToFire)
                    return;
            }
            this.cannonIsReady = false;
            CannonUI.currBallIndex = 0;
            var self = this;
            CannonUI.self.firing = true;
            this.fireIndex = 0;
            this.ballcount = this.balls.length;
            this.firePosition = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: this.x, Y: this.y });
            this.balls = this.balls.sort(function (a, b) {
                if (a.ballIndex > b.ballIndex)
                    return 1;
                if (a.ballIndex == b.ballIndex)
                    return 0;
                return -1;
            });
            this.fireDelay = 200;
            this.xspeed = this.power * Math.cos(this.angle);
            this.yspeed = -this.power * Math.abs(Math.sin(this.angle));
            setTimeout(function () { CannonUI.self.fireBall(); }, this.fireDelay);
        };
        CannonUI.aimPointRadius = 2.5;
        CannonUI.aimPointColor = 0xFFFFFF;
        CannonUI.defaultPower = 3;
        CannonUI.maxLength = 1000;
        CannonUI.aimPointCount = 10;
        CannonUI.scaleStep = 0.5 / CannonUI.aimPointCount;
        CannonUI.currBallIndex = 0;
        return CannonUI;
    }(egret.Sprite));
    CustomUI.CannonUI = CannonUI;
    __reflect(CannonUI.prototype, "CustomUI.CannonUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var GroundUI = (function (_super) {
        __extends(GroundUI, _super);
        function GroundUI() {
            var _this = _super.call(this) || this;
            _this.mass = 0;
            var groundShape = new p2.Plane();
            _this.addShape(groundShape);
            groundShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
            groundShape.material = new p2.Material(Model.MaterialType.Wall);
            _this.baseDisplay = new egret.Sprite();
            var groundImg = CommonUtils.BitmapUtils.createBitmapByName("ground_front_png");
            _this.baseDisplay.addChild(groundImg);
            groundImg.scaleX = CommonUtils.StageUtils.getStageScale();
            groundImg.scaleY = CommonUtils.StageUtils.getStageScale();
            groundImg.y = -10 * CommonUtils.StageUtils.getStageScale();
            _this.displays = [_this.baseDisplay];
            return _this;
        }
        return GroundUI;
    }(CustomUI.BaseBodyUI));
    CustomUI.GroundUI = GroundUI;
    __reflect(GroundUI.prototype, "CustomUI.GroundUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var LaserBallUI = (function (_super) {
        __extends(LaserBallUI, _super);
        function LaserBallUI(radius, power) {
            var _this = _super.call(this) || this;
            _this.radius = radius;
            _this.power = power;
            _this.type = p2.Body.DYNAMIC;
            _this.roundShape = new p2.Circle({ radius: _this.radius });
            _this.addShape(_this.roundShape);
            _this.roundShape.collisionGroup = GameSetting.CollisionGroupSetting.BALL;
            _this.roundShape.collisionMask = GameSetting.CollisionGroupSetting.BRICK
                | GameSetting.CollisionGroupSetting.WALL
                | GameSetting.CollisionGroupSetting.STUFF;
            _this.setMaterial(Model.MaterialType.Ball);
            _this.baseDisplay = new egret.Sprite();
            _this.dotTexture = RES.getRes("laser_dot_png");
            _this.dotConfig = RES.getRes("laser_json");
            _this.sys = new particle.GravityParticleSystem(_this.dotTexture, _this.dotConfig);
            _this.laserLine = CommonUtils.BitmapUtils.createBitmapByName("laser_line_png");
            _this.laserMask = new egret.Shape;
            _this.laserMask.graphics.lineStyle(10, 0x000000);
            _this.laserLine.mask = _this.laserMask;
            _this.baseDisplay.addChild(_this.laserMask);
            _this.baseDisplay.addChild(_this.laserLine);
            _this.baseDisplay.addChild(_this.sys);
            _this.sys.start();
            _this.damping = 0;
            _this.displays = [_this.baseDisplay];
            _this.drawLaser = false;
            _this.stop = false;
            return _this;
        }
        LaserBallUI.prototype.setMaterial = function (material) {
            this.roundShape.material = new p2.Material(material);
        };
        LaserBallUI.prototype.hide = function () {
            this.baseDisplay.visible = false;
        };
        LaserBallUI.prototype.show = function () {
            this.baseDisplay.visible = true;
        };
        LaserBallUI.prototype.fire = function (startX, startY, xSpeed, ySpeed) {
            this.position = [startX, startY];
            this.mass = 0;
            this.shapes[0].collisionGroup = GameSetting.CollisionGroupSetting.BALL;
            this.shapes[0].collisionMask = GameSetting.CollisionGroupSetting.BRICK
                | GameSetting.CollisionGroupSetting.WALL
                | GameSetting.CollisionGroupSetting.STUFF;
            this.velocity = [xSpeed, ySpeed];
            this.roundShape.material = new p2.Material(Model.MaterialType.Ball);
            this.startPosition = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
            this.laserMask.graphics.moveTo(0, 0);
            this.laserLine.anchorOffsetY = this.laserLine.height / 2;
            this.laserLine.anchorOffsetX = this.laserLine.width - 20;
            this.laserLine.scaleY = CommonUtils.StageUtils.getStageScale();
            this.laserMask.graphics.lineStyle(this.laserLine.height * this.laserLine.scaleY);
            this.drawLaser = true;
        };
        LaserBallUI.prototype.showDisplay = function (container) {
            if (this.stop)
                return;
            if (!container.contains(this.baseDisplay))
                container.addChild(this.baseDisplay);
            container.setChildIndex(this.baseDisplay, 2);
            var stagePosition = CommonUtils.CoordinateUtils.worldPositionToStage({ X: this.position[0], Y: this.position[1] });
            if (this.drawLaser) {
                this.laserMask.graphics.lineTo(-stagePosition.X + this.startPosition.X, -stagePosition.Y + this.startPosition.Y);
                var angle = Math.atan((stagePosition.Y - this.startPosition.Y) / (stagePosition.X - this.startPosition.X));
                if (angle < 0) {
                    angle += Math.PI;
                }
                this.laserLine.rotation = 180 * angle / Math.PI;
            }
            this.baseDisplay.x = stagePosition.X;
            this.baseDisplay.y = stagePosition.Y;
            var paddingDis = 0.8;
            if (this.position[1] < -this.radius - paddingDis
                || this.position[0] < -this.radius - paddingDis
                || this.position[0] > CommonUtils.StageUtils.getWorldWidth() + paddingDis + this.radius) {
                this.destory(container);
            }
        };
        LaserBallUI.prototype.getPower = function () {
            return this.power;
        };
        LaserBallUI.prototype.destory = function (container) {
            this.stop = true;
            var self = this;
            egret.Tween.get(this.laserLine).to({ alpha: 0 }, 2000).call(function () {
                if (self.onDestroy)
                    self.onDestroy();
                var x = self.baseDisplay.x;
                var y = self.baseDisplay.y;
                if (container.contains(self.baseDisplay)) {
                    container.removeChild(self.baseDisplay);
                }
                if (self.world)
                    self.world.removeBody(self);
            });
        };
        return LaserBallUI;
    }(CustomUI.BaseBodyUI));
    CustomUI.LaserBallUI = LaserBallUI;
    __reflect(LaserBallUI.prototype, "CustomUI.LaserBallUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var ButtonStyle;
    (function (ButtonStyle) {
        ButtonStyle[ButtonStyle["Gray"] = 0] = "Gray";
        ButtonStyle[ButtonStyle["Blue"] = 1] = "Blue";
        ButtonStyle[ButtonStyle["Yellow"] = 2] = "Yellow";
    })(ButtonStyle = CustomUI.ButtonStyle || (CustomUI.ButtonStyle = {}));
    var PanelButtonUI = (function (_super) {
        __extends(PanelButtonUI, _super);
        function PanelButtonUI(style, text) {
            var _this = _super.call(this) || this;
            _this.style = style;
            _this.text = text;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        PanelButtonUI.prototype.setStyle = function (style) {
            this.style = style;
            this.bg.texture = this.getTexture();
        };
        PanelButtonUI.prototype.setText = function (text) {
            this.text = text;
            this.buttonText.text = this.text;
        };
        PanelButtonUI.prototype.onAddToStage = function (evt) {
            this.styleGray = RES.getRes("btn_confirm_disabled_bg_png");
            this.styleBlue = RES.getRes("btn_blue_bg_png");
            this.styleYellow = RES.getRes("btn_yellow_bg_png");
            this.bg = new egret.Bitmap();
            this.bg.texture = this.getTexture();
            this.addChild(this.bg);
            this.buttonText = new egret.TextField();
            this.addChild(this.buttonText);
            this.buttonText.width = this.bg.width;
            this.buttonText.text = " ";
            this.buttonText.y = (this.bg.height - this.buttonText.height) / 2;
            this.buttonText.stroke = 2;
            this.buttonText.strokeColor = 0x0780d4;
            this.buttonText.size = 36;
            this.buttonText.textAlign = egret.HorizontalAlign.CENTER;
            this.buttonText.text = this.text;
        };
        PanelButtonUI.prototype.getTexture = function () {
            switch (this.style) {
                case ButtonStyle.Gray:
                    return this.styleGray;
                case ButtonStyle.Blue:
                    return this.styleBlue;
                case ButtonStyle.Yellow:
                    return this.styleYellow;
                default:
                    return null;
            }
        };
        return PanelButtonUI;
    }(egret.Sprite));
    CustomUI.PanelButtonUI = PanelButtonUI;
    __reflect(PanelButtonUI.prototype, "CustomUI.PanelButtonUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var PolygonBrickUI = (function (_super) {
        __extends(PolygonBrickUI, _super);
        function PolygonBrickUI(life, edgeCount) {
            var _this = _super.call(this, life, edgeCount) || this;
            _this.edgeCount = Math.floor(edgeCount);
            if (_this.edgeCount < 3 || _this.edgeCount > 6) {
                console.error("多边形砖块的边数量必须在 3 - 6 之间");
                return _this;
            }
            return _this;
        }
        PolygonBrickUI.prototype.buildShapeAndDisplay = function () {
            var ratio = (Math.PI * 2) / this.edgeCount;
            this.points = [];
            for (var i = 0; i < this.edgeCount; i++) {
                var sin = Math.sin(ratio * i);
                var cos = Math.cos(ratio * i);
                this.points[i] = [cos * GameSetting.BrickSetting.Radius, sin * GameSetting.BrickSetting.Radius];
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
            var mcTexture = RES.getRes("polygon_" + this.edgeCount.toString() + "_png");
            var mcData = RES.getRes("polygon_" + this.edgeCount.toString() + "_json");
            var loadingDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            this.mc = new egret.MovieClip(loadingDataFactory.generateMovieClipData("polygon"));
            var scale = 1;
            var offsetRotation = 0;
            if (this.edgeCount == 4) {
                scale = 0.7071;
                offsetRotation = -45;
                this.mc.anchorOffsetX = this.mc.width / 2;
                this.mc.anchorOffsetY = this.mc.height / 2;
            }
            else if (this.edgeCount == 3) {
                scale = 0.866;
                offsetRotation = -30;
                this.mc.anchorOffsetX = this.mc.width / 2;
                this.mc.anchorOffsetY = this.mc.height / 1.5;
            }
            else if (this.edgeCount == 5) {
                scale = 0.951;
                offsetRotation = 18;
                this.mc.anchorOffsetX = this.mc.width / 2;
                this.mc.anchorOffsetY = this.mc.height / 1.809;
            }
            this.mc.scaleX = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * scale * 2) / this.mc.width;
            this.mc.scaleY = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * scale * 2) / this.mc.width;
            this.baseDisplay = new egret.Sprite();
            this.baseDisplay.addChild(this.mc);
            this.mc.rotation = offsetRotation;
            this.mc.gotoAndStop(this.life);
            this.displays = [this.baseDisplay];
        };
        PolygonBrickUI.prototype.redrawBg = function () {
            this.mc.gotoAndStop(this.life);
        };
        return PolygonBrickUI;
    }(CustomUI.BrickUI));
    CustomUI.PolygonBrickUI = PolygonBrickUI;
    __reflect(PolygonBrickUI.prototype, "CustomUI.PolygonBrickUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var PowerUpBallStuffUI = (function (_super) {
        __extends(PowerUpBallStuffUI, _super);
        function PowerUpBallStuffUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PowerUpBallStuffUI.prototype.buildShapeAndDisplay = function () {
            var stageRadius = CommonUtils.CoordinateUtils.worldLengthToStage(this.radius);
            this.shape = new p2.Circle({ radius: this.radius });
            this.addShape(this.shape);
            this.baseDisplay = new egret.Sprite();
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_power_up_png");
            bitmap.width = stageRadius * 2;
            bitmap.height = stageRadius * 2;
            bitmap.anchorOffsetX = stageRadius;
            bitmap.anchorOffsetY = stageRadius;
            this.baseDisplay.addChild(bitmap);
        };
        PowerUpBallStuffUI.prototype.hittedByBall = function (ball, cannon, container) {
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, ball.getPower());
            if (ball.getPower() == 2) {
                var newBall = new CustomUI.BallUI(1, Model.BallState.Fired);
                newBall.position = [ball.position[0] + (Math.random() - 0.5) * this.radius, ball.position[1] + (Math.random() - 0.5) * this.radius];
                newBall.velocity = [(Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2];
                cannon.increaseBall(newBall, container, this.world);
            }
            else {
                ball.setPowerful();
            }
            this.destory(container);
        };
        PowerUpBallStuffUI.prototype.hittedByLaser = function (ball, cannon, container) {
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, 1);
            this.destory(container);
        };
        return PowerUpBallStuffUI;
    }(CustomUI.StuffUI));
    CustomUI.PowerUpBallStuffUI = PowerUpBallStuffUI;
    __reflect(PowerUpBallStuffUI.prototype, "CustomUI.PowerUpBallStuffUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var RoundBrickUI = (function (_super) {
        __extends(RoundBrickUI, _super);
        function RoundBrickUI(life) {
            return _super.call(this, life, 0) || this;
        }
        RoundBrickUI.prototype.buildShapeAndDisplay = function () {
            this.shape = new p2.Circle({ radius: (GameSetting.BrickSetting.Radius * RoundBrickUI.radiusScale) });
            this.addShape(this.shape);
            var mcTexture = RES.getRes("roundbrick_png");
            var mcData = RES.getRes("roundbrick_json");
            var loadingDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
            this.mc = new egret.MovieClip(loadingDataFactory.generateMovieClipData("roundbrick"));
            this.mc.scaleX = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * RoundBrickUI.radiusScale * 2) / this.mc.width;
            this.mc.scaleY = CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.BrickSetting.Radius * RoundBrickUI.radiusScale * 2) / this.mc.width;
            this.mc.anchorOffsetX = this.mc.width / 2;
            this.mc.anchorOffsetY = this.mc.width / 2;
            this.baseDisplay = new egret.Sprite();
            this.baseDisplay.addChild(this.mc);
            this.mc.gotoAndStop(this.life);
            this.displays = [this.baseDisplay];
        };
        RoundBrickUI.prototype.redrawBg = function () {
            this.mc.gotoAndStop(this.life);
        };
        RoundBrickUI.radiusScale = 0.9;
        return RoundBrickUI;
    }(CustomUI.BrickUI));
    CustomUI.RoundBrickUI = RoundBrickUI;
    __reflect(RoundBrickUI.prototype, "CustomUI.RoundBrickUI");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var SplitBallStuffUI = (function (_super) {
        __extends(SplitBallStuffUI, _super);
        function SplitBallStuffUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplitBallStuffUI.prototype.buildShapeAndDisplay = function () {
            var stageRadius = CommonUtils.CoordinateUtils.worldLengthToStage(this.radius);
            this.shape = new p2.Circle({ radius: this.radius });
            this.addShape(this.shape);
            this.baseDisplay = new egret.Sprite();
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_split_png");
            bitmap.width = stageRadius * 2;
            bitmap.height = stageRadius * 2;
            bitmap.anchorOffsetX = stageRadius;
            bitmap.anchorOffsetY = stageRadius;
            this.baseDisplay.addChild(bitmap);
        };
        SplitBallStuffUI.prototype.hittedByBall = function (ball, cannon, container) {
            var position = [ball.position[0] + (Math.random() - 0.5) * this.radius, ball.position[1] + (Math.random() - 0.5) * this.radius];
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, ball.getPower());
            this.increaseBall(position, cannon, container);
        };
        SplitBallStuffUI.prototype.hittedByLaser = function (ball, cannon, container) {
            CommonUtils.GameUtils.increaseFireDamage(this.clientId, 1);
            this.destory(container);
        };
        SplitBallStuffUI.prototype.increaseBall = function (position, cannon, container) {
            var newBall = new CustomUI.BallUI(1, Model.BallState.Fired);
            newBall.position = position;
            newBall.velocity = [(Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3];
            cannon.increaseBall(newBall, container, this.world);
            this.destory(container);
        };
        return SplitBallStuffUI;
    }(CustomUI.StuffUI));
    CustomUI.SplitBallStuffUI = SplitBallStuffUI;
    __reflect(SplitBallStuffUI.prototype, "CustomUI.SplitBallStuffUI");
})(CustomUI || (CustomUI = {}));
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
var CustomUI;
(function (CustomUI) {
    var TopBowUILeft = (function (_super) {
        __extends(TopBowUILeft, _super);
        function TopBowUILeft() {
            var _this = _super.call(this) || this;
            var selfAngle = Math.PI / 13;
            var length = (CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding * 2) / 2;
            var stageLength = CommonUtils.CoordinateUtils.worldLengthToStage(length);
            var bodyShape = new p2.Line({ length: length });
            _this.addShape(bodyShape);
            bodyShape.angle = -selfAngle;
            bodyShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
            bodyShape.material = new p2.Material(Model.MaterialType.Wall);
            _this.baseDisplay = new egret.Sprite();
            var shp = CommonUtils.BitmapUtils.createBitmapByName("topbow_left_png");
            shp.width *= CommonUtils.StageUtils.getStageScale();
            shp.height *= CommonUtils.StageUtils.getStageScale();
            shp.x = -stageLength / 2 - CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.WallSetting.WallWeight);
            shp.y = -CommonUtils.CoordinateUtils.worldLengthToStage(length * Math.sin(selfAngle)) / 2;
            _this.baseDisplay.addChild(shp);
            return _this;
        }
        return TopBowUILeft;
    }(CustomUI.BaseBodyUI));
    CustomUI.TopBowUILeft = TopBowUILeft;
    __reflect(TopBowUILeft.prototype, "CustomUI.TopBowUILeft");
    var TopBowUIRight = (function (_super) {
        __extends(TopBowUIRight, _super);
        function TopBowUIRight() {
            var _this = _super.call(this) || this;
            var selfAngle = Math.PI / 13;
            var length = (CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding * 2) / 2;
            var stageLength = CommonUtils.CoordinateUtils.worldLengthToStage(length);
            var bodyShape = new p2.Line({ length: length });
            _this.addShape(bodyShape);
            bodyShape.angle = selfAngle;
            bodyShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
            bodyShape.material = new p2.Material(Model.MaterialType.Wall);
            _this.baseDisplay = new egret.Sprite();
            var shp = CommonUtils.BitmapUtils.createBitmapByName("topbow_right_png");
            shp.width *= CommonUtils.StageUtils.getStageScale();
            shp.height *= CommonUtils.StageUtils.getStageScale();
            shp.x = -stageLength / 2 + CommonUtils.CoordinateUtils.worldLengthToStage(GameSetting.WallSetting.WallWeight) * 2.5;
            shp.y = -CommonUtils.CoordinateUtils.worldLengthToStage(length * Math.sin(selfAngle)) / 2;
            _this.baseDisplay.addChild(shp);
            return _this;
        }
        return TopBowUIRight;
    }(CustomUI.BaseBodyUI));
    CustomUI.TopBowUIRight = TopBowUIRight;
    __reflect(TopBowUIRight.prototype, "CustomUI.TopBowUIRight");
})(CustomUI || (CustomUI = {}));
var CustomUI;
(function (CustomUI) {
    var WallUI = (function (_super) {
        __extends(WallUI, _super);
        function WallUI(width, height) {
            var _this = _super.call(this) || this;
            _this.mass = 1;
            var wallShape = new p2.Plane();
            _this.addShape(wallShape);
            wallShape.collisionGroup = GameSetting.CollisionGroupSetting.WALL;
            wallShape.material = new p2.Material(Model.MaterialType.Wall);
            _this.baseDisplay = new egret.Sprite();
            _this.baseDisplay.graphics.beginFill(0x4b5277);
            _this.baseDisplay.graphics.drawRect(0, 0, CommonUtils.CoordinateUtils.worldLengthToStage(width), CommonUtils.CoordinateUtils.worldLengthToStage(height));
            _this.baseDisplay.graphics.endFill();
            _this.displays = [_this.baseDisplay];
            return _this;
        }
        WallUI.prototype.hittedByBall = function (ball, container) {
            ball.addRandomSpeed();
        };
        return WallUI;
    }(CustomUI.BaseBodyUI));
    CustomUI.WallUI = WallUI;
    __reflect(WallUI.prototype, "CustomUI.WallUI");
})(CustomUI || (CustomUI = {}));
var GamePhysics;
(function (GamePhysics) {
    var GameWorld = (function (_super) {
        __extends(GameWorld, _super);
        function GameWorld(gameView) {
            var _this = _super.call(this, { gravity: [0, -GameSetting.PhysicalSetting.Gravity] }) || this;
            _this.newLineIsReady = false;
            _this.newLineData = null;
            _this.groundY = 0;
            _this.playfieldY = 0;
            _this.paddingTop = 0;
            _this.calculatePosition();
            _this.sleepMode = p2.World.BODY_SLEEPING;
            _this.gameView = gameView;
            _this.defaultContactMaterial.restitution = GameSetting.PhysicalSetting.Restitution;
            var noneMtl = new p2.Material(Model.MaterialType.None);
            var wallMtl = new p2.Material(Model.MaterialType.Wall);
            var ballMtl = new p2.Material(Model.MaterialType.Ball);
            var cmtlBallBall = new p2.ContactMaterial(ballMtl, ballMtl, { restitution: 0, friction: 0 });
            _this.addContactMaterial(cmtlBallBall);
            var cmtlNoneNone = new p2.ContactMaterial(noneMtl, noneMtl, { restitution: 0, friction: 0 });
            _this.addContactMaterial(cmtlNoneNone);
            var cmtlNoneWall = new p2.ContactMaterial(noneMtl, wallMtl, { restitution: 0, friction: 0 });
            _this.addContactMaterial(cmtlNoneWall);
            _this.on("beginContact", function (evt) {
                if (!(evt.bodyA instanceof CustomUI.BallUI || evt.bodyB instanceof CustomUI.BallUI))
                    return;
                var ball;
                if (evt.bodyA instanceof CustomUI.BallUI) {
                    ball = evt.bodyA;
                }
                else {
                    ball = evt.bodyB;
                }
                if (ball)
                    ball.mass = GameSetting.BallSetting.BallMass;
            }, _this);
            _this.on("beginContact", function (evt) {
                if (!_this.isBallAndBrick(evt))
                    return;
                var ball;
                var brick;
                if (evt.bodyA instanceof CustomUI.BallUI) {
                    ball = evt.bodyA;
                    brick = evt.bodyB;
                }
                else {
                    ball = evt.bodyB;
                    brick = evt.bodyA;
                }
                brick.hittedByBall(ball, _this.gameView);
                ball.damping = GameSetting.BallSetting.BallDamping;
                ball.addRandomSpeed();
                _this.gameView.refreshScore();
            }, _this);
            _this.on("beginContact", function (evt) {
                if (!_this.isBallAndGround(evt))
                    return;
                var ball;
                if (evt.bodyA instanceof CustomUI.BallUI) {
                    ball = evt.bodyA;
                }
                else {
                    ball = evt.bodyB;
                }
                ball.moveToTop(_this.gameView, _this, _this.cannon);
                _this.gameView.showBtnSpeedUp();
                _this.gameView.speedUp = true;
                _this.speedUp();
            }, _this);
            _this.on("beginContact", function (evt) {
                if (!_this.isBallAndWall(evt))
                    return;
                var ball;
                var wall;
                if (evt.bodyA instanceof CustomUI.BallUI) {
                    ball = evt.bodyA;
                    wall = evt.bodyB;
                }
                else {
                    ball = evt.bodyB;
                    wall = evt.bodyA;
                }
                wall.hittedByBall(ball, _this.gameView);
                ball.addRandomSpeed();
                ball.damping = GameSetting.BallSetting.BallDamping;
            }, _this);
            _this.on("beginContact", function (evt) {
                if (!_this.isBallAndStuff(evt))
                    return;
                var ball;
                var stuff;
                if (evt.bodyA instanceof CustomUI.BallUI) {
                    ball = evt.bodyA;
                    stuff = evt.bodyB;
                }
                else {
                    ball = evt.bodyB;
                    stuff = evt.bodyA;
                }
                stuff.hittedByBall(ball, _this.cannon, _this.gameView);
            }, _this);
            _this.on("beginContact", function (evt) {
                if (!_this.isLaserAndBrick(evt))
                    return;
                var ball;
                var brick;
                if (evt.bodyA instanceof CustomUI.LaserBallUI) {
                    ball = evt.bodyA;
                    brick = evt.bodyB;
                }
                else {
                    ball = evt.bodyB;
                    brick = evt.bodyA;
                }
                brick.hittedByLaser(ball, _this.gameView);
            }, _this);
            _this.on("beginContact", function (evt) {
                if (!_this.isLaserAndStuff(evt))
                    return;
                var ball;
                var stuff;
                if (evt.bodyA instanceof CustomUI.LaserBallUI) {
                    ball = evt.bodyA;
                    stuff = evt.bodyB;
                }
                else {
                    ball = evt.bodyB;
                    stuff = evt.bodyA;
                }
                stuff.hittedByLaser(ball, _this.cannon, _this.gameView);
            }, _this);
            return _this;
        }
        GameWorld.prototype.calculatePosition = function () {
            this.groundY = (CommonUtils.StageUtils.getWorldHeight() - GameSetting.PhysicalSetting.StageWorldPlayFieldHeight - GameSetting.PhysicalSetting.GroundThickness) * GameSetting.PhysicalSetting.BottomPaddingScale + GameSetting.PhysicalSetting.GroundThickness;
            this.playfieldY = this.groundY + GameSetting.PhysicalSetting.StageWorldPlayFieldHeight;
            this.paddingTop = (CommonUtils.StageUtils.getWorldHeight() - GameSetting.PhysicalSetting.StageWorldPlayFieldHeight - GameSetting.PhysicalSetting.GroundThickness) * GameSetting.PhysicalSetting.TopPaddingScale;
        };
        GameWorld.prototype.redrawBalls = function () {
            this.cannon.redrawBalls();
        };
        GameWorld.prototype.revive = function (data) {
            this.brickContainer.revive(this.gameView, data, this);
            this.cannon.readyToFire();
        };
        GameWorld.prototype.loadNextLine = function () {
            if (this.cannon.isAllBallHitFloor()) {
                CommonUtils.LoggerUtil.log("开始从服务器读取下一行数据");
                this.sendDamageData(true);
            }
        };
        GameWorld.prototype.isAllMovingToTop = function () {
            return this.cannon.isAllMovingToTop();
        };
        GameWorld.prototype.isReadyToFire = function () {
            return this.cannon.isReadyToFire();
        };
        GameWorld.prototype.readyToFire = function (drawNewLine) {
            console.log("this.cannon.isReadyToFire() = " + this.cannon.isReadyToFire());
            if (this.cannon.isAllBallReadyToFire()) {
                if (drawNewLine) {
                    CommonUtils.LoggerUtil.log("ready to fire 开始尝试绘制下一行数据");
                    this.drawNewLine();
                }
            }
        };
        GameWorld.prototype.createPlayField = function () {
            var bg = CommonUtils.BitmapUtils.createBitmapByName("bg_png");
            bg.width = 750 * CommonUtils.StageUtils.getStageScale();
            bg.height = 1620 * CommonUtils.StageUtils.getStageScale();
            this.gameView.addChild(bg);
            this.gameView.setChildIndex(bg, 2);
            // left
            var wall = new CustomUI.WallUI(GameSetting.WallSetting.WallHeight, GameSetting.WallSetting.WallWeight);
            wall.position = [GameSetting.WallSetting.WallPadding, this.playfieldY - GameSetting.WallSetting.WallTop];
            wall.angle = -Math.PI / 2;
            this.addBody(wall);
            wall.showDisplay(this.gameView, false);
            // right
            var wall2 = new CustomUI.WallUI(GameSetting.WallSetting.WallHeight, GameSetting.WallSetting.WallWeight);
            wall2.position = [CommonUtils.StageUtils.getWorldWidth() - GameSetting.WallSetting.WallPadding, this.playfieldY - GameSetting.WallSetting.WallTop - GameSetting.WallSetting.WallHeight];
            wall2.angle = Math.PI / 2;
            this.addBody(wall2);
            wall2.showDisplay(this.gameView, false);
        };
        GameWorld.prototype.createGround = function () {
            var ground = new CustomUI.GroundUI();
            ground.position = [0, this.groundY];
            this.addBody(ground);
            ground.showDisplay(this.gameView, false, 1);
        };
        GameWorld.prototype.createTopBow = function () {
            var topLeft = new CustomUI.TopBowUILeft();
            topLeft.position = [(CommonUtils.StageUtils.getWorldWidth() + 2 * GameSetting.WallSetting.WallPadding) / 4, this.playfieldY - GameSetting.WallSetting.BowTop];
            this.addBody(topLeft);
            topLeft.showDisplay(this.gameView, false);
            var topRight = new CustomUI.TopBowUIRight();
            topRight.position = [(3 * CommonUtils.StageUtils.getWorldWidth() - 2 * GameSetting.WallSetting.WallPadding) / 4, this.playfieldY - GameSetting.WallSetting.BowTop];
            this.addBody(topRight);
            topRight.showDisplay(this.gameView, false);
        };
        GameWorld.prototype.createCannon = function () {
            var _this = this;
            this.cannon = new CustomUI.CannonUI(this, this.gameView);
            this.gameView.addChild(this.cannon);
            this.cannon.x = CommonUtils.CoordinateUtils.worldLengthToStage(CommonUtils.StageUtils.getWorldWidth() / 2);
            this.cannon.y = CommonUtils.CoordinateUtils.worldLengthToStage(this.paddingTop + GameSetting.WallSetting.BowTop + 0.3);
            this.gameView.setChildIndex(this.cannon, 10);
            this.cannon.initGenisBall(1, this.gameView, this);
            this.cannon.onBallCountChanged = function (validCount, totalCount) {
                _this.gameView.showBallCount(validCount, totalCount);
            };
        };
        GameWorld.prototype.createBrickContainer = function () {
            this.brickContainer = new CustomUI.BrickContainerUI(this.paddingTop, 4.5, 10, this, this.gameView);
            this.gameView.addChild(this.brickContainer);
        };
        GameWorld.prototype.resetBricks = function (data) {
            CommonUtils.LoggerUtil.log("砖块全量数据");
            CommonUtils.LoggerUtil.log(data);
            var lines = CommonUtils.GameUtils.parseBrickLineData(data.Lines);
            var currRowIndex = data.RowIndex;
            this.brickContainer.resetBricks(lines, currRowIndex, true, this.gameView);
            this.readyToFire(false);
        };
        GameWorld.prototype.speedUp = function () {
            this.cannon.speedUp = true;
        };
        GameWorld.prototype.doubleNextRound = function () {
            this.cannon.doubleNextRound();
        };
        GameWorld.prototype.laserNextRound = function () {
            this.cannon.laserNextRound();
        };
        GameWorld.prototype.isToolInUse = function () {
            return this.cannon.isToolInUse();
        };
        GameWorld.prototype.stopGame = function () {
            this.cannon.destoryAllBalls(this.gameView, this);
            this.brickContainer.destoryAllBricks(false, this.gameView, this);
            CommonUtils.GameUtils.roundId = 0;
            this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
        };
        // Start:游戏服务器交互事件
        // 开始新一局
        GameWorld.prototype.onCreateNewRoundSuccess = function (data) {
            var _this = this;
            this.cannon.destoryAllBalls(this.gameView, this);
            this.brickContainer.destoryAllBricks(false, this.gameView, this);
            CommonUtils.GameUtils.roundId = data.RoundId;
            CommonUtils.GameUtils.currentScore = 0;
            this.gameView.refreshScore();
            this.cannon.initGenisBall(1, this.gameView, this);
            var lines = CommonUtils.GameUtils.parseBrickLineData(data.Lines);
            CommonUtils.LoggerUtil.log("lines");
            CommonUtils.LoggerUtil.log(lines);
            this.brickContainer.resetBricks(lines, lines.length - 1, true, this.gameView);
            this.newLineIsReady = true;
            this.gameView.paused = false;
            this.gameView.showPanel = false;
            CommonUtils.GameUtils.initFireDamage();
            this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.gameView.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            setTimeout(function () { _this.doVerify(); }, 200);
        };
        GameWorld.prototype.doVerify = function () {
            var wxLoginInfo;
            platform.getUserInfo(function (res) {
            }, function (res) {
                console.log("读取用户授权信息失败 res = ");
                console.log(res);
                var verifyPanel = new GameScene.WxVerifyPanel("授权后玩游戏可以获取礼包");
                GameScene.PlayField.self.showPanel = true;
                GameScene.PlayField.self.paused = true;
                verifyPanel.onVerifiedHandler = function (data) {
                    platform.destroyUserInfoButton();
                    GameScene.PlayField.self.removeChild(verifyPanel);
                    if (!GameScene.PlayField.self.fpShowed) {
                        GameScene.PlayField.self.showPanel = false;
                        GameScene.PlayField.self.paused = false;
                    }
                };
                verifyPanel.onCloseHandler = function (data) {
                    platform.destroyUserInfoButton();
                    GameScene.PlayField.self.removeChild(verifyPanel);
                    if (!GameScene.PlayField.self.fpShowed) {
                        GameScene.PlayField.self.showPanel = false;
                        GameScene.PlayField.self.paused = false;
                    }
                };
                GameScene.PlayField.self.addChild(verifyPanel);
                return;
            }, function (res) {
                console.log("platform.getUserInfo complete");
                console.log(res);
            });
        };
        GameWorld.prototype.drawNewLine = function () {
            if (this.newLineData == null) {
                console.log("新一行数据还没有到达");
                this.newLineIsReady = true;
                return;
            }
            CommonUtils.GameUtils.initFireDamage();
            this.gameView.refreshNextPlayer(false);
            console.log("this.newLineIsReady = " + this.newLineIsReady);
            if (!this.newLineIsReady) {
                this.newLineIsReady = true;
                return;
            }
            if (this.newLineData.GameOver == 0) {
                this.gameView.speedUp = false;
                this.cannon.speedUp = false;
                this.gameView.hideBtnSpeedUp();
                CommonUtils.LoggerUtil.log("new line data:");
                CommonUtils.LoggerUtil.log(this.newLineData);
                this.brickContainer.resetBricks(this.newLineData.Lines, this.newLineData.RowIndex, true, this.gameView);
                this.cannon.readyToFire();
            }
            else if (this.newLineData.GameOver == 1) {
                this.gameView.speedUp = false;
                this.cannon.speedUp = false;
                this.gameView.hideBtnSpeedUp();
                this.showGameOverPanel(this.newLineData.Revive);
            }
        };
        GameWorld.prototype.onDamageRequestSuccess = function (data) {
            var newLineData;
            if (data.GameOver == 0) {
                newLineData = {
                    RoundId: data.RoundId,
                    GameOver: data.GameOver,
                    Lines: CommonUtils.GameUtils.parseBrickLineData(data.Lines),
                    RowIndex: data.RowIndex
                };
            }
            else if (data.GameOver == 1) {
                newLineData = data;
            }
            this.newLineData = newLineData;
            CommonUtils.LoggerUtil.log("onDamageRequestSuccess 开始尝试绘制下一行数据");
            this.drawNewLine();
        };
        GameWorld.prototype.showGameOverPanel = function (revive) {
            this.gameView.showDeadPanel(revive);
        };
        GameWorld.prototype.onDamageRequestFailed = function (errorMessage) {
            CommonUtils.LoggerUtil.log("获取新的一行数据失败:" + errorMessage);
        };
        GameWorld.prototype.sendDamageData = function (anmit) {
            this.newLineIsReady = false;
            Server.Connector.getGameClient().sendDamageData(CommonUtils.GameUtils.roundId, CommonUtils.GameUtils.getFireDamage(), this);
        };
        GameWorld.prototype.startNewGame = function () {
            this.cannon.clearTools();
            Server.Connector.getGameClient().createNewRound(this);
        };
        // End
        GameWorld.prototype.isBallAndGround = function (evt) {
            if (!evt.bodyA)
                return false;
            if (!evt.bodyB)
                return false;
            return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.GroundUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.GroundUI);
        };
        GameWorld.prototype.isBallAndBrick = function (evt) {
            if (!evt.bodyA)
                return false;
            if (!evt.bodyB)
                return false;
            return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.BrickUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.BrickUI);
        };
        GameWorld.prototype.isBallAndStuff = function (evt) {
            if (!evt.bodyA)
                return false;
            if (!evt.bodyB)
                return false;
            return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.StuffUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.StuffUI);
        };
        GameWorld.prototype.isLaserAndBrick = function (evt) {
            if (!evt.bodyA)
                return false;
            if (!evt.bodyB)
                return false;
            return (evt.bodyA instanceof CustomUI.LaserBallUI && evt.bodyB instanceof CustomUI.BrickUI) || (evt.bodyB instanceof CustomUI.LaserBallUI && evt.bodyA instanceof CustomUI.BrickUI);
        };
        GameWorld.prototype.isLaserAndStuff = function (evt) {
            if (!evt.bodyA)
                return false;
            if (!evt.bodyB)
                return false;
            return (evt.bodyA instanceof CustomUI.LaserBallUI && evt.bodyB instanceof CustomUI.StuffUI) || (evt.bodyB instanceof CustomUI.LaserBallUI && evt.bodyA instanceof CustomUI.StuffUI);
        };
        GameWorld.prototype.isBallAndWall = function (evt) {
            if (!evt.bodyA)
                return false;
            if (!evt.bodyB)
                return false;
            return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.WallUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.WallUI);
        };
        GameWorld.prototype.isInAimPosition = function (x, y) {
            return y >= 175 * CommonUtils.StageUtils.getStageScale() && y <= (this.gameView.stage.stageHeight - 180 * CommonUtils.StageUtils.getStageScale());
        };
        GameWorld.prototype.canFire = function (x, y) {
            return this.isInAimPosition(x, y) && !this.gameView.paused && !this.gameView.showPanel;
        };
        GameWorld.prototype.onBeginTouch = function (event) {
            if (!this.newLineIsReady)
                return;
            if (!this.canOption()) {
                return;
            }
            if (!this.canFire(event.stageX, event.stageY)) {
                return;
            }
            this.cannon.startAim();
            this.cannon.aim(event.stageX, event.stageY);
        };
        GameWorld.prototype.onTouchMove = function (event) {
            if (!this.newLineIsReady)
                return;
            if (!this.canOption()) {
                return;
            }
            this.cannon.aim(event.stageX, event.stageY);
        };
        GameWorld.prototype.onEndTouch = function (event) {
            if (!this.newLineIsReady)
                return;
            if (!this.cannon.aiming) {
                return;
            }
            if (!this.canOption()) {
                return;
            }
            this.newLineData = null;
            this.cannon.fire();
            this.cannon.stopAim();
        };
        GameWorld.prototype.canOption = function () {
            if (this.gameView.paused)
                return false;
            if (this.gameView.showPanel)
                return false;
            if (!Server.Connector.getGameClient().isConnected())
                return false;
            if (this.gameView.isPoping)
                return false;
            return true;
        };
        return GameWorld;
    }(p2.World));
    GamePhysics.GameWorld = GameWorld;
    __reflect(GameWorld.prototype, "GamePhysics.GameWorld");
})(GamePhysics || (GamePhysics = {}));
var GameScene;
(function (GameScene) {
    var HistoryPanel = (function (_super) {
        __extends(HistoryPanel, _super);
        function HistoryPanel() {
            var _this = _super.call(this) || this;
            _this.maskAlpha = 0;
            return _this;
        }
        HistoryPanel.prototype.drawPanel = function () {
            var _this = this;
            this.rateClose = CommonUtils.BitmapUtils.createBitmapByName("btn_back_png");
            this.addChild(this.rateClose);
            this.rateClose.scaleX = CommonUtils.StageUtils.getStageScale();
            this.rateClose.scaleY = CommonUtils.StageUtils.getStageScale();
            this.rateClose.x = 30 * CommonUtils.StageUtils.getStageScale();
            this.rateClose.y = 30 * CommonUtils.StageUtils.getStageScale();
            this.rateClose.touchEnabled = true;
            var self = this;
            this.rateClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (_this.closeHandle)
                    _this.closeHandle();
            }, this);
            var title = CommonUtils.BitmapUtils.createBitmapByName("panel_title_history_png");
            title.scaleX = CommonUtils.StageUtils.getStageScale();
            title.scaleY = CommonUtils.StageUtils.getStageScale();
            title.x = (this.stage.stageWidth - title.width * CommonUtils.StageUtils.getStageScale()) / 2;
            title.y = 140 * CommonUtils.StageUtils.getStageScale();
            this.addChild(title);
            var listBg = new egret.Shape();
            this.addChild(listBg);
            listBg.y = title.y + title.height * CommonUtils.StageUtils.getStageScale();
            listBg.graphics.beginFill(0x2c2c40);
            listBg.graphics.drawRoundRect(0, 0, 650 * CommonUtils.StageUtils.getStageScale(), (this.stage.stageHeight - listBg.y - 72 * CommonUtils.StageUtils.getStageScale()), 28 * CommonUtils.StageUtils.getStageScale(), 28 * CommonUtils.StageUtils.getStageScale());
            listBg.graphics.endFill();
            listBg.x = (this.stage.stageWidth - listBg.width) / 2;
            this.historyList = new egret.Sprite();
            this.historyList.graphics.beginFill(0x000000, 0);
            this.historyList.graphics.drawRect(0, 0, this.stage.width, 500);
            this.historyList.graphics.endFill();
            this.addChild(this.historyList);
            var scrollView = new egret.ScrollView();
            this.addChild(scrollView);
            scrollView.setContent(this.historyList);
            scrollView.x = 0;
            scrollView.y = listBg.y + 14 * CommonUtils.StageUtils.getStageScale();
            scrollView.height = listBg.height - 28 * CommonUtils.StageUtils.getStageScale();
            scrollView.horizontalScrollPolicy = "off";
        };
        HistoryPanel.prototype.loadHistory = function (count) {
            Server.Connector.getGameClient().getHistory(count, this);
        };
        HistoryPanel.prototype.onGetHistoryFailed = function (errmsg) {
            CommonUtils.LoggerUtil.log(errmsg);
        };
        HistoryPanel.prototype.onGetHistorySuccess = function (data) {
            var _this = this;
            this.historyList.removeChildren();
            var tempY = 0;
            data.forEach(function (val, index) {
                var item = _this.createScoreItem(val, index);
                _this.historyList.addChild(item);
                item.y = tempY;
                item.x = (_this.stage.stageWidth - item.width) / 2;
                tempY += item.height + 1;
            });
        };
        HistoryPanel.prototype.createScoreItem = function (item, rowIndex) {
            var txtTop = 52 * CommonUtils.StageUtils.getStageScale();
            var disp = new egret.Sprite();
            if (rowIndex % 2 == 0) {
                disp.graphics.beginFill(0x5a5a8f);
            }
            else {
                disp.graphics.beginFill(0x454565);
            }
            disp.graphics.drawRoundRect(0, 0, 640 * CommonUtils.StageUtils.getStageScale(), 132 * CommonUtils.StageUtils.getStageScale(), 20 * CommonUtils.StageUtils.getStageScale(), 20 * CommonUtils.StageUtils.getStageScale());
            disp.graphics.endFill();
            var txtIndex = new egret.TextField();
            txtIndex.textColor = 0xffc749;
            txtIndex.size = 36 * CommonUtils.StageUtils.getStageScale();
            txtIndex.text = item.Index;
            txtIndex.y = txtTop;
            txtIndex.x = 40 * CommonUtils.StageUtils.getStageScale();
            disp.addChild(txtIndex);
            var txtScore = new egret.TextField();
            txtScore.textColor = 0xffffff;
            txtScore.size = 36 * CommonUtils.StageUtils.getStageScale();
            txtScore.text = item.Score;
            txtScore.y = txtTop;
            txtScore.x = 121 * CommonUtils.StageUtils.getStageScale();
            disp.addChild(txtScore);
            var txtTime = new egret.TextField();
            txtTime.textColor = 0xffffff;
            txtTime.size = 36 * CommonUtils.StageUtils.getStageScale();
            txtTime.text = item.Time;
            txtTime.y = txtTop;
            txtTime.x = 370 * CommonUtils.StageUtils.getStageScale();
            disp.addChild(txtTime);
            return disp;
        };
        return HistoryPanel;
    }(GameScene.MaskPanel));
    GameScene.HistoryPanel = HistoryPanel;
    __reflect(HistoryPanel.prototype, "GameScene.HistoryPanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var LinkShareWxPanel = (function (_super) {
        __extends(LinkShareWxPanel, _super);
        function LinkShareWxPanel() {
            var _this = _super.call(this) || this;
            _this.maskAlpha = 0.7;
            return _this;
        }
        LinkShareWxPanel.prototype.drawPanel = function () {
            var _this = this;
            console.log("开始创建关注公众号页面");
            this.panelDisplay = new egret.DisplayObjectContainer();
            this.addChild(this.panelDisplay);
            var bg = CommonUtils.BitmapUtils.createBitmapByName("panel_bg_png");
            this.panelDisplay.addChild(bg);
            this.txtTitle = new egret.TextField();
            this.panelDisplay.addChild(this.txtTitle);
            this.txtTitle.y = 25;
            this.txtTitle.size = 50;
            this.txtTitle.fontFamily = "苹方";
            this.txtTitle.textColor = 0x7276a3;
            this.txtTitle.x = 0;
            this.txtTitle.width = bg.width;
            this.txtTitle.textAlign = egret.HorizontalAlign.CENTER;
            var icoClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png");
            this.panelDisplay.addChild(icoClose);
            icoClose.touchEnabled = true;
            icoClose.y = -30;
            icoClose.x = this.panelDisplay.width - icoClose.width + 20;
            icoClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (_this.onClosedHandle)
                    _this.onClosedHandle();
            }, this);
            this.txtDetail = new egret.TextField;
            this.txtDetail.x = 52;
            this.txtDetail.y = 200;
            this.txtDetail.lineSpacing = 18;
            this.txtDetail.size = 36;
            this.panelDisplay.addChild(this.txtDetail);
            this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.x = 34 * CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;
            this.startLoadData();
        };
        LinkShareWxPanel.prototype.startLoadData = function () {
            console.log("开始读取页面数据");
            Server.Connector.getGameClient().getPageData("About", this);
        };
        LinkShareWxPanel.prototype.getPageDataFailed = function (data) {
            console.log("读取页面信息失败");
            console.log(data);
        };
        LinkShareWxPanel.prototype.getPageDataSuccess = function (data) {
            console.log("读取页面信息成功");
            console.log(data);
            this.txtTitle.text = data.Title;
            var content = data.Content.toString().split("|");
            var txtFlow = [];
            content.forEach(function (line) {
                txtFlow.push({ text: line + "\n" });
            });
            this.txtDetail.textFlow = txtFlow;
            console.log(this.txtDetail.textFlow);
        };
        return LinkShareWxPanel;
    }(GameScene.MaskPanel));
    GameScene.LinkShareWxPanel = LinkShareWxPanel;
    __reflect(LinkShareWxPanel.prototype, "GameScene.LinkShareWxPanel");
})(GameScene || (GameScene = {}));
var CommonUtils;
(function (CommonUtils) {
    var BitmapUtils = (function () {
        function BitmapUtils() {
        }
        BitmapUtils.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        return BitmapUtils;
    }());
    CommonUtils.BitmapUtils = BitmapUtils;
    __reflect(BitmapUtils.prototype, "CommonUtils.BitmapUtils");
})(CommonUtils || (CommonUtils = {}));
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        Main.self = this;
        var platform = window.platform;
        platform.openDataContext.clearBitmap();
        CommonUtils.LoggerUtil.log("Stage width " + this.stage.stageWidth + " stage height " + this.stage.stageHeight);
        this.stayCurrentPage = false;
        this.currentScene = Model.SceneValue.Main;
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            //this.playField.pauseGame();
        };
        egret.lifecycle.onResume = function () {
            if (_this.currentScene == Model.SceneValue.PlayField) {
                //this.playField.pauseGame();
            }
        };
        //注入自定义的素材解析器
        this.runGame().catch(function (e) {
            CommonUtils.LoggerUtil.log(e);
        });
    };
    Main.prototype.onShareAppMessage = function (res) {
        CommonUtils.LoggerUtil.log(res);
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
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        jsCode = _a.sent();
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
                            _this.connectToGameServerAfterWxLogin();
                        }, function (res) {
                            _this.wxLoginInfo = { code: jsCode.code };
                            _this.connectToGameServerAfterWxLogin();
                        }, function (res) {
                            console.log("platform.getUserInfo complete");
                            console.log(res);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.connectToGameServerAfterWxLogin = function () {
        CommonUtils.AccountUtils.setwxUserData(this.wxLoginInfo);
        // 开始连接GlobalServer，读取游戏服务器列表列表
        this.loadingView.setLoadingText("开始连接服务器...");
        Server.Connector.initConnector(RES.getRes("server_gate_setting_json"));
        // 心跳超时
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_HEART_BEAT_TIMEOUT, function (event) {
            CommonUtils.LoggerUtil.log("Gate client Heart beat timeout");
            CommonUtils.LoggerUtil.log(event);
        });
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_CLOSE, function (event) {
            CommonUtils.LoggerUtil.log("Gate client close");
            CommonUtils.LoggerUtil.log(event);
        });
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_IO_ERROR, function (event) {
            CommonUtils.LoggerUtil.log("Gate client io error");
            CommonUtils.LoggerUtil.log(event.target);
        });
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_CONNECTED, function (event) {
            CommonUtils.LoggerUtil.log("Gate client connected");
            CommonUtils.LoggerUtil.log(event);
        });
        Server.Connector.startConnectToGateServer(this);
    };
    // Start：游戏服务器连接事件
    Main.prototype.onGateServerConnectFailed = function (errorMessage) {
        CommonUtils.LoggerUtil.log("\u6E38\u620F\u7F51\u5173\u670D\u52A1\u5668\u8FDE\u63A5\u5931\u8D25:" + errorMessage);
    };
    Main.prototype.onBeforeGateServerConnected = function () {
        CommonUtils.LoggerUtil.log("开始连接游戏网关服务器");
    };
    Main.prototype.onGateServerConnected = function () {
        CommonUtils.LoggerUtil.log("游戏网关服务器连接成功");
    };
    Main.prototype.onGetGameServerSuccess = function (data) {
        CommonUtils.LoggerUtil.log("成功获取游戏服务器:" + data);
    };
    Main.prototype.onGameServerConnected = function () {
        CommonUtils.LoggerUtil.log("成功连接到游戏服务器");
        this.loadingView.setLoadingText("成功连接到服务器");
        this.loadingView.setLoadingText("开始登录游戏...");
        GameSetting.ShareSetting.initShareInfoList();
        var shareInfo = GameSetting.ShareSetting.getShareInfo();
        platform.showShareMenu(shareInfo.title, shareInfo.imageUrl);
        Server.Connector.getGameClient().userLogin(this.wxLoginInfo, this);
        this.registGameClientReceiveMsgCallback();
    };
    Main.prototype.onGetGameServerFailed = function (errorMessage) {
        CommonUtils.LoggerUtil.log("获取游戏服务器失败：" + errorMessage);
    };
    Main.prototype.onConnectToGameServerFailed = function (errorMessage) {
        CommonUtils.LoggerUtil.log("连接到游戏服务器失败：" + errorMessage);
    };
    Main.prototype.onUserEnterSuccess = function (data) {
        this.loadingView.setLoadingText("登录成功");
        CommonUtils.LoggerUtil.log("用户登录成功：" + data);
        CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
        CommonUtils.LoggerUtil.log("用户微信Session Key：" + CommonUtils.AccountUtils.getAccountData());
        if (this.stage.contains(this.loadingView)) {
            this.stage.removeChild(this.loadingView);
        }
        this.createGameScene();
    };
    Main.prototype.onUserEnterFailed = function (message) {
        CommonUtils.LoggerUtil.log("用户登录失败");
    };
    Main.prototype.onUserReEnterSuccess = function (data) {
        CommonUtils.LoggerUtil.log("用户重连成功");
        CommonUtils.LoggerUtil.log("用户重连登录成功：" + data);
        CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
        if (CommonUtils.GameUtils.roundId <= 0) {
            if (this.stage.contains(this.loadingView)) {
                this.stage.removeChild(this.loadingView);
            }
            this.playField.hidePopMessage();
            return;
        }
        Server.Connector.getGameClient().getRoundData(CommonUtils.GameUtils.roundId, this);
        if (this.stage.contains(this.loadingView)) {
            this.stage.removeChild(this.loadingView);
        }
    };
    Main.prototype.onGetRoundDataSuccess = function (data) {
        this.playField.hidePopMessage();
        this.playField.resetBricks(data);
    };
    Main.prototype.onGetRoundDataFailed = function (data) {
        CommonUtils.LoggerUtil.log("读取本局全量数据失败");
    };
    Main.prototype.onUserReEnterFailed = function (message) {
        CommonUtils.LoggerUtil.log("用户重连失败");
    };
    Main.prototype.onReloadGameDataSuccess = function (data) {
        CommonUtils.LoggerUtil.log("重新加载游戏数据成功：" + data);
    };
    Main.prototype.onGetShareInfoSuccess = function (data) {
        CommonUtils.LoggerUtil.log("分享到群的目标信息");
        CommonUtils.LoggerUtil.log(data);
    };
    Main.prototype.onGetShareInfoFailed = function (errmsg) {
        CommonUtils.LoggerUtil.log(errmsg);
    };
    // End：游戏服务器连接事件
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
                        return [4 /*yield*/, RES.loadGroup("loading", 1)];
                    case 2:
                        _a.sent();
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
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        if (this.stayCurrentPage)
            return;
        CommonUtils.StageUtils.loadAndStoreStageInfo(this.stage);
        this.createMenuScene();
        var platform = window.platform;
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });
        this.createPlayFieldScene();
        this.showMenuScene();
    };
    Main.prototype.showMenuScene = function () {
        this.menuScene.visible = true;
        this.currentScene = Model.SceneValue.Main;
    };
    Main.prototype.hideMenuScene = function () {
        this.menuScene.visible = false;
    };
    Main.prototype.showPlayFieldScene = function () {
        this.playField.visible = true;
        this.currentScene = Model.SceneValue.PlayField;
    };
    Main.prototype.hidePlayFieldScene = function () {
        this.playField.visible = false;
    };
    Main.prototype.createMenuScene = function () {
        var _this = this;
        var self = this;
        this.menuScene = new GameScene.MenuScene();
        this.addChild(this.menuScene);
        this.menuScene.gameStartHandle = function () {
            if (self.menuScene.panelOpened)
                return;
            if (self.currentScene != Model.SceneValue.Main)
                return;
            _this.showPlayFieldScene();
            _this.playField.startNewGame();
            _this.hideMenuScene();
            self.menuScene.panelOpened = true;
        };
        this.menuScene.openRateHandle = function () {
            if (self.menuScene.panelOpened)
                return;
            _this.ratePanel.visible = true;
            _this.ratePanel.refreshRate();
            self.menuScene.panelOpened = true;
        };
        this.menuScene.openHistoryHandle = function () {
            if (self.menuScene.panelOpened)
                return;
            _this.historyPanel.visible = true;
            _this.historyPanel.loadHistory(30);
            self.menuScene.panelOpened = true;
        };
        this.menuScene.openInviteHandle = function () {
            if (self.menuScene.panelOpened)
                return;
            platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl, function (res) {
                CommonUtils.LoggerUtil.log("分享成功 : " + res);
                CommonUtils.LoggerUtil.log(res);
                if (!res.shareTickets) {
                    CommonUtils.LoggerUtil.log("没有分享到群");
                    return;
                }
                platform.getShareInfo(res.shareTickets[0], function (data) {
                    CommonUtils.LoggerUtil.log("分享目标信息");
                    Server.Connector.getGameClient().getShareInfo(data, "", self);
                }, function (failedData) { });
            }, function (res) {
                CommonUtils.LoggerUtil.log("分享失败 : " + res);
            }, function (res) {
                CommonUtils.LoggerUtil.log("分享结束 : " + res);
            });
        };
        this.menuScene.visible = false;
        this.ratePanel = new GameScene.RatePanel();
        this.ratePanel.closeHandle = function () {
            CommonUtils.LoggerUtil.log("关闭排行榜响应事件");
            self.ratePanel.visible = false;
            self.menuScene.panelOpened = false;
        };
        this.addChild(this.ratePanel);
        this.ratePanel.visible = false;
        this.historyPanel = new GameScene.HistoryPanel();
        this.historyPanel.closeHandle = function () {
            CommonUtils.LoggerUtil.log("关闭排行榜响应事件");
            self.historyPanel.visible = false;
            self.menuScene.panelOpened = false;
        };
        this.addChild(this.historyPanel);
        this.historyPanel.visible = false;
        this.stayCurrentPage = true;
    };
    Main.prototype.createPlayFieldScene = function () {
        var _this = this;
        this.playField = new GameScene.PlayField();
        this.addChild(this.playField);
        this.playField.visible = false;
        this.playField.backToMenuHandle = function () {
            _this.hidePlayFieldScene();
            _this.showMenuScene();
            _this.menuScene.panelOpened = false;
        };
    };
    Main.prototype.registGameClientReceiveMsgCallback = function () {
        var self = this;
        // 心跳超时
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_HEART_BEAT_TIMEOUT, function (event) {
            self.playField.popMessage("断线重连中，请耐心等待...", false);
            CommonUtils.LoggerUtil.log(new Date().toString() + " : 客户端连接心跳检测失败");
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(self);
        });
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_CLOSE, function (event) {
            self.playField.popMessage("断线重连中，请耐心等待...", false);
            CommonUtils.LoggerUtil.log(new Date().toString() + " : 客户端连接关闭");
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(self);
        });
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_IO_ERROR, function (event) {
            self.playField.popMessage("断线重连中，请耐心等待...", false);
            CommonUtils.LoggerUtil.log(new Date().toString() + " : 客户端连接错误");
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(self);
        });
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_CONNECTED, function (event) {
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main", ["Server.IServerConnectorSender"]);
var GameScene;
(function (GameScene) {
    var NextPlayerPanel = (function (_super) {
        __extends(NextPlayerPanel, _super);
        function NextPlayerPanel() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        NextPlayerPanel.prototype.onAddToStage = function (event) {
            var platform = window.platform;
            this.bitmap = platform.openDataContext.createDisplayObject();
            this.currentPlayer = new egret.Bitmap();
            this.renderTexture = new egret.RenderTexture();
            this.currentPlayer.texture = this.renderTexture;
            this.addChild(this.currentPlayer);
        };
        NextPlayerPanel.prototype.refreshCurrentScore = function (forceRefresh) {
            var _this = this;
            var platform = window.platform;
            if (CommonUtils.GameUtils.wxDataProgress != Model.WxDataProgress.endLoadSelf && CommonUtils.GameUtils.wxDataProgress != Model.WxDataProgress.unStart) {
                return;
            }
            egret.Tween.get(this)
                .call(function () {
                platform.openDataContext.getNextPlayer(CommonUtils.GameUtils.currentScore);
            })
                .wait(2000)
                .call(function () {
                _this.renderTexture.drawToTexture(_this.bitmap);
                _this.visible = true;
            });
        };
        return NextPlayerPanel;
    }(egret.Sprite));
    GameScene.NextPlayerPanel = NextPlayerPanel;
    __reflect(NextPlayerPanel.prototype, "GameScene.NextPlayerPanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var MessagePanel = (function (_super) {
        __extends(MessagePanel, _super);
        function MessagePanel() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        MessagePanel.prototype.onAddToStage = function (evt) {
            var bg = new egret.Shape;
            bg.graphics.beginFill(0x6157ff);
            bg.graphics.drawRoundRect(0, 0, 610, 92, 15);
            bg.graphics.beginFill(0x000000);
            bg.graphics.drawRoundRect(5, 5, 600, 82, 15);
            bg.graphics.endFill();
            this.addChild(bg);
            this.txt = new egret.TextField();
            this.txt.width = bg.width;
            this.txt.height = bg.height;
            this.txt.x = bg.x;
            this.txt.y = bg.y;
            this.txt.textAlign = egret.HorizontalAlign.CENTER;
            this.txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.addChild(this.txt);
            this.txt.textColor = 0xFFFFFF;
            this.txt.size = 32;
        };
        MessagePanel.prototype.pop = function (msg, autoHide, onAutoHide) {
            var _this = this;
            this.visible = true;
            this.parent.setChildIndex(this, -1);
            this.txt.text = msg;
            this.alpha = 1;
            if (autoHide) {
                setTimeout(function () {
                    _this.visible = false;
                    if (onAutoHide)
                        onAutoHide();
                }, 3000);
            }
        };
        return MessagePanel;
    }(egret.DisplayObjectContainer));
    GameScene.MessagePanel = MessagePanel;
    __reflect(MessagePanel.prototype, "GameScene.MessagePanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var PausePanel = (function (_super) {
        __extends(PausePanel, _super);
        function PausePanel() {
            var _this = _super.call(this) || this;
            _this.maskAlpha = 0.7;
            return _this;
        }
        PausePanel.prototype.drawPanel = function () {
            var _this = this;
            var padding = 36;
            this.panelDisplay = new egret.DisplayObjectContainer();
            this.addChild(this.panelDisplay);
            var btnToMain = CommonUtils.BitmapUtils.createBitmapByName("btn_tomain_png");
            btnToMain.scaleX = CommonUtils.StageUtils.getStageScale();
            btnToMain.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.addChild(btnToMain);
            btnToMain.touchEnabled = true;
            btnToMain.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.backToMainHandle)
                    _this.backToMainHandle();
            }, this);
            btnToMain.y = 0 * CommonUtils.StageUtils.getStageScale();
            btnToMain.x = (this.stage.stageWidth - btnToMain.width * CommonUtils.StageUtils.getStageScale()) / 2;
            var btnRestart = CommonUtils.BitmapUtils.createBitmapByName("btn_pause_restart_png");
            btnRestart.scaleX = CommonUtils.StageUtils.getStageScale();
            btnRestart.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.addChild(btnRestart);
            btnRestart.touchEnabled = true;
            btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.restartHandle)
                    _this.restartHandle();
            }, this);
            btnRestart.y = btnToMain.y + btnToMain.height * CommonUtils.StageUtils.getStageScale() + padding * CommonUtils.StageUtils.getStageScale();
            btnRestart.x = (this.stage.stageWidth - btnRestart.width * CommonUtils.StageUtils.getStageScale()) / 2;
            var btnContinue = CommonUtils.BitmapUtils.createBitmapByName("btn_continue_png");
            btnContinue.scaleX = CommonUtils.StageUtils.getStageScale();
            btnContinue.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.addChild(btnContinue);
            btnContinue.touchEnabled = true;
            btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.continueGameHandle)
                    _this.continueGameHandle();
            }, this);
            btnContinue.y = btnRestart.y + btnRestart.height * CommonUtils.StageUtils.getStageScale() + padding * CommonUtils.StageUtils.getStageScale();
            btnContinue.x = (this.stage.stageWidth - btnContinue.width * CommonUtils.StageUtils.getStageScale()) / 2;
            this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height) / 2;
            this.panelDisplay.alpha = 1;
            this.panelDisplay.visible = true;
        };
        return PausePanel;
    }(GameScene.MaskPanel));
    GameScene.PausePanel = PausePanel;
    __reflect(PausePanel.prototype, "GameScene.PausePanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var PlayField = (function (_super) {
        __extends(PlayField, _super);
        function PlayField() {
            var _this = _super.call(this) || this;
            _this.paused = false;
            _this.speedUp = false;
            _this.showPanel = false;
            _this.isPoping = false;
            _this.fpShowed = false;
            _this.gameSpeed = 1;
            _this.fastSpeed = 1;
            _this.speedRate = 1.5;
            _this.iphonexScale = 0.47;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.worldStepSpeed = CommonUtils.StageUtils.getFramInterval() * _this.speedRate / _this.gameSpeed;
            PlayField.self = _this;
            return _this;
        }
        PlayField.prototype.startNewGame = function () {
            var _this = this;
            this.nextPlayerPanel.visible = false;
            this.showPanel = false;
            this.paused = false;
            this.speedUp = false;
            this.pausePanel.visible = false;
            CommonUtils.LoggerUtil.log("开始检查用户是不是第一次启动");
            platform.isFirstRun().then(function (isFirstRun) {
                CommonUtils.LoggerUtil.log("isFirstRun:");
                CommonUtils.LoggerUtil.log(isFirstRun);
                if (isFirstRun) {
                    var fp_1 = CommonUtils.BitmapUtils.createBitmapByName("frist_run_pic_png");
                    _this.addChild(fp_1);
                    _this.setChildIndex(fp_1, -1);
                    fp_1.scaleX = CommonUtils.StageUtils.getStageScale();
                    fp_1.scaleY = CommonUtils.StageUtils.getStageScale();
                    fp_1.touchEnabled = true;
                    _this.paused = true;
                    _this.showPanel = true;
                    _this.fpShowed = true;
                    fp_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                        _this.removeChild(fp_1);
                        _this.paused = false;
                        _this.showPanel = false;
                        _this.fpShowed = false;
                    }, _this);
                    platform.setNotFirstRun();
                }
            });
            this.world.startNewGame();
            this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        PlayField.prototype.refreshNextPlayer = function (forceRefresh) {
            this.nextPlayerPanel.refreshCurrentScore(forceRefresh);
        };
        PlayField.prototype.pauseGame = function () {
            this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.pausePanel.visible = true;
            this.pausePanel.alpha = 1;
            this.setChildIndex(this.pausePanel, -1);
            this.paused = true;
            this.showPanel = true;
            CommonUtils.LoggerUtil.log("this.pausePanel.x = " + this.pausePanel.x);
            CommonUtils.LoggerUtil.log("this.pausePanel.y = " + this.pausePanel.y);
        };
        PlayField.prototype.resumeGame = function (onSuccess) {
            var _this = this;
            this.paused = false;
            this.showPanel = false;
            egret.Tween.get(this.pausePanel)
                .call(function () {
                _this.pausePanel.visible = false;
                _this.pausePanel.alpha = 1;
                _this.setChildIndex(_this.pausePanel, -1);
            })
                .to({ alpha: 1 }, 50)
                .call(function () {
                _this.stage.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
                _this.pausePanel.visible = false;
                if (onSuccess) {
                    onSuccess();
                }
            });
        };
        PlayField.prototype.createDeadPanel = function () {
            var _this = this;
            var self = this;
            this.confirmTerminalPanel = new GameScene.TerminalPanel();
            this.confirmTerminalPanel.onBuyReviveHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                Server.Connector.getGameClient().revive(_this, function (data) {
                    _this.paused = false;
                    _this.showPanel = false;
                    CommonUtils.LoggerUtil.log(data);
                    _this.world.revive(data);
                    _this.removeChild(_this.confirmTerminalPanel);
                    platform.destroyUserInfoButton();
                    _this.confirmTerminalPanel.shareBtnCreated = false;
                    setTimeout(function () {
                        var msg = CommonUtils.BitmapUtils.createBitmapByName("revive_msg_png");
                        _this.addChild(msg);
                        _this.setChildIndex(msg, -1);
                        msg.scaleX = CommonUtils.StageUtils.getStageScale();
                        msg.scaleY = CommonUtils.StageUtils.getStageScale();
                        msg.x = (_this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
                        msg.y = (_this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
                        msg.alpha = 1;
                        egret.Tween.get(msg)
                            .wait(1000)
                            .to({ alpha: 0 }, 500)
                            .call(function () { _this.removeChild(msg); });
                    }, 500);
                });
            };
            this.confirmTerminalPanel.onFinishHandle = function () {
                platform.destroyUserInfoButton();
                Server.Connector.getGameClient().confirmTerminal(_this);
                platform.updateUserScore(CommonUtils.GameUtils.currentScore.toString());
                _this.removeChild(_this.confirmTerminalPanel);
                _this.confirmTerminalPanel.shareBtnCreated = false;
                _this.world.stopGame();
                if (_this.backToMenuHandle) {
                    _this.backToMenuHandle();
                }
            };
            this.confirmTerminalPanel.onShareHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl, function (res) {
                    CommonUtils.LoggerUtil.log("分享成功 : " + res);
                    CommonUtils.LoggerUtil.log(res);
                    if (!res.shareTickets) {
                        self.popMessage("分享到微信群才可以", true);
                        return;
                    }
                    platform.getShareInfo(res.shareTickets[0], function (data) {
                        CommonUtils.LoggerUtil.log("分享到群");
                        CommonUtils.LoggerUtil.log(data);
                        Server.Connector.getGameClient().getShareInfo(data, "Revive", self, function (sd) {
                            platform.destroyUserInfoButton();
                            self.paused = false;
                            self.showPanel = false;
                            CommonUtils.LoggerUtil.log("分享复活返回数据：");
                            CommonUtils.LoggerUtil.log(sd);
                            _this.world.revive(sd);
                            _this.removeChild(_this.confirmTerminalPanel);
                            _this.confirmTerminalPanel.shareBtnCreated = false;
                            setTimeout(function () {
                                var msg = CommonUtils.BitmapUtils.createBitmapByName("revive_msg_png");
                                _this.addChild(msg);
                                _this.setChildIndex(msg, -1);
                                msg.scaleX = CommonUtils.StageUtils.getStageScale();
                                msg.scaleY = CommonUtils.StageUtils.getStageScale();
                                msg.x = (_this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
                                msg.y = (_this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
                                msg.alpha = 1;
                                egret.Tween.get(msg)
                                    .wait(1000)
                                    .to({ alpha: 0 }, 500)
                                    .call(function () { _this.removeChild(msg); });
                            }, 500);
                        });
                    }, function (failedData) {
                        CommonUtils.LoggerUtil.log("分享复活失败");
                        setTimeout(function () { self.popMessage("分享复活失败", true); }, 1000);
                    });
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享失败 : " + res);
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享结束 : ");
                    CommonUtils.LoggerUtil.log(res);
                });
            };
            this.confirmTerminalPanel.onRestartHandle = function () {
                platform.updateUserScore(CommonUtils.GameUtils.currentScore.toString());
                Server.Connector.getGameClient().confirmTerminal(_this, function () {
                    platform.destroyUserInfoButton();
                    _this.confirmTerminalPanel.shareBtnCreated = false;
                    _this.startNewGame();
                });
            };
        };
        PlayField.prototype.showDeadPanel = function (revive) {
            var self = this;
            this.paused = true;
            this.showPanel = true;
            if (!this.contains(this.confirmTerminalPanel)) {
                this.addChild(this.confirmTerminalPanel);
            }
            this.confirmTerminalPanel.setScore(revive.CurrentRoundScore, revive.HighestScore);
            this.confirmTerminalPanel.setPrice(revive.Bonus, revive.CurrentBonus, revive.LeftBuyCount);
        };
        PlayField.prototype.onAddToStage = function (evt) {
            this.createGameWorld();
            this.world.createPlayField();
            this.world.createGround();
            this.world.createTopBow();
            this.world.createCannon();
            this.world.createBrickContainer();
            this.createScoreDisplay();
            this.createballCountDisplay();
            this.createGameTools();
            this.createButtons();
            this.createPausePanel();
            this.createDoubleToolPanel();
            this.createLaserToolPanel();
            this.createNotGroupPanel();
            this.createNextPlayerPanel();
            this.createGetMoreBonusPanel();
            this.createDeadPanel();
        };
        PlayField.prototype.createNextPlayerPanel = function () {
            this.nextPlayerPanel = new GameScene.NextPlayerPanel();
            this.addChild(this.nextPlayerPanel);
            this.nextPlayerPanel.scaleX = CommonUtils.StageUtils.getStageScale();
            this.nextPlayerPanel.scaleY = CommonUtils.StageUtils.getStageScale();
            this.nextPlayerPanel.x = (750 - 118) * CommonUtils.StageUtils.getStageScale();
            this.nextPlayerPanel.y = CommonUtils.CoordinateUtils.worldLengthToStage(this.world.paddingTop + 1);
            this.nextPlayerPanel.visible = false;
            this.setChildIndex(this.nextPlayerPanel, 256);
        };
        PlayField.prototype.createNotGroupPanel = function () {
            this.messagePanel = new GameScene.MessagePanel();
            this.addChild(this.messagePanel);
            this.messagePanel.scaleX = CommonUtils.StageUtils.getStageScale();
            this.messagePanel.scaleY = CommonUtils.StageUtils.getStageScale();
            this.messagePanel.x = (this.stage.stageWidth - this.messagePanel.width * CommonUtils.StageUtils.getStageScale()) / 2;
            this.messagePanel.y = (this.stage.stageHeight - this.messagePanel.height * CommonUtils.StageUtils.getStageScale()) / 2;
            this.messagePanel.alpha = 0;
        };
        PlayField.prototype.createLaserToolPanel = function () {
            var _this = this;
            this.laserToolPanel = new GameScene.ToolPanel("laser", "panel_icon_laser_png", "激光炮", "您可选择以下方式获得激光炮");
            this.addChild(this.laserToolPanel);
            this.laserToolPanel.visible = false;
            this.laserToolPanel.onClosedHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                egret.ticker.resume();
                _this.paused = false;
                _this.showPanel = false;
                _this.hideToolPanel(_this.laserToolPanel);
            };
            this.laserToolPanel.onConfirmHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                Server.Connector.getGameClient().BuyTool("laser", _this);
            };
            this.laserToolPanel.onShareHandle = function (canshare) {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl, function (res) {
                    CommonUtils.LoggerUtil.log("分享成功 : " + res);
                    CommonUtils.LoggerUtil.log(res);
                    if (!res.shareTickets) {
                        CommonUtils.LoggerUtil.log("没有分享到群");
                        _this.paused = false;
                        _this.showPanel = false;
                        _this.laserToolPanel.visible = false;
                        CommonUtils.LoggerUtil.log("开始显示错误提示框");
                        _this.popMessage("免费道具获取失败,分享到微信群才可以", true);
                        return;
                    }
                    if (!canshare) {
                        _this.popMessage("本局分享获取激光炮次数已经用完", true);
                        return;
                    }
                    platform.getShareInfo(res.shareTickets[0], function (data) {
                        Server.Connector.getGameClient().getShareInfo(data, "GetLaser", _this, function (sd) {
                            CommonUtils.LoggerUtil.log("Get Laser :");
                            CommonUtils.LoggerUtil.log(sd);
                            if (sd.ToolCode && sd.ToolCode == "laser") {
                                _this.hideToolPanel(_this.laserToolPanel);
                                _this.world.laserNextRound();
                                _this.paused = false;
                                _this.showPanel = false;
                            }
                            else {
                                _this.popMessage("分享获取激光炮失败", true);
                            }
                        });
                    }, function (failedData) {
                        _this.popMessage("分享获取激光炮失败", true);
                    });
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享失败 : " + res);
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享结束 : " + res);
                });
            };
        };
        PlayField.prototype.createDoubleToolPanel = function () {
            var _this = this;
            this.doubleToolPanel = new GameScene.ToolPanel("double", "panel_icon_double_png", "双倍球数", "您可选择以下方式获得双倍球");
            this.addChild(this.doubleToolPanel);
            this.doubleToolPanel.visible = false;
            this.doubleToolPanel.onClosedHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                _this.paused = false;
                _this.showPanel = false;
                _this.hideToolPanel(_this.doubleToolPanel);
            };
            this.doubleToolPanel.onConfirmHandle = function () {
                if (!_this.paused)
                    return;
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                Server.Connector.getGameClient().BuyTool("double", _this);
            };
            this.doubleToolPanel.onShareHandle = function (canshare) {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl, function (res) {
                    CommonUtils.LoggerUtil.log("分享成功 : " + res);
                    CommonUtils.LoggerUtil.log(res);
                    if (!res.shareTickets) {
                        CommonUtils.LoggerUtil.log("没有分享到群");
                        _this.paused = false;
                        _this.showPanel = false;
                        _this.doubleToolPanel.visible = false;
                        CommonUtils.LoggerUtil.log("开始显示错误提示框");
                        _this.popMessage("免费道具获取失败,分享到微信群才可以", true);
                        return;
                    }
                    if (!canshare) {
                        _this.popMessage("本局分享获取双倍球次数已经用完", true);
                        return;
                    }
                    platform.getShareInfo(res.shareTickets[0], function (data) {
                        Server.Connector.getGameClient().getShareInfo(data, "GetDouble", _this, function (sd) {
                            CommonUtils.LoggerUtil.log("Get double :");
                            CommonUtils.LoggerUtil.log(sd);
                            if (sd.ToolCode && sd.ToolCode == "double") {
                                _this.hideToolPanel(_this.doubleToolPanel);
                                _this.world.doubleNextRound();
                                _this.paused = false;
                                _this.showPanel = false;
                            }
                            else {
                                _this.popMessage("分享获取双倍球失败", true);
                            }
                        });
                    }, function (failedData) {
                        _this.popMessage("分享获取双倍球失败", true);
                    });
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享失败 : " + res);
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享结束 : " + res);
                });
            };
        };
        PlayField.prototype.showPausePanel = function () {
            this.pausePanel.visible = true;
        };
        PlayField.prototype.hidePausePanel = function () {
            this.pausePanel.visible = false;
        };
        PlayField.prototype.createPausePanel = function () {
            var _this = this;
            this.pausePanel = new GameScene.PausePanel();
            this.addChild(this.pausePanel);
            this.pausePanel.visible = false;
            this.pausePanel.restartHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                _this.startNewGame();
            };
            this.pausePanel.continueGameHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                _this.resumeGame();
            };
            this.pausePanel.backToMainHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                _this.resumeGame();
                _this.world.stopGame();
                if (_this.backToMenuHandle) {
                    _this.backToMenuHandle();
                }
            };
            this.pausePanel.shareHandle = function () {
                if (!_this.paused)
                    return;
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl, function (res) {
                    CommonUtils.LoggerUtil.log(res);
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享失败 : " + res);
                }, function (res) {
                    CommonUtils.LoggerUtil.log("分享结束 : " + res);
                });
            };
        };
        PlayField.prototype.onEnterFrame = function (event) {
            var self = this;
            if (this.paused)
                return;
            if (this.showPanel)
                return;
            if (!Server.Connector.getGameClient().isConnected())
                return;
            if (this.isPoping)
                return;
            for (var i = 0; i < this.gameSpeed; i++) {
                this.world.step(this.worldStepSpeed);
            }
            if (this.speedUp) {
                for (var i = 0; i < this.fastSpeed; i++) {
                    this.world.step(this.worldStepSpeed);
                }
            }
            this.world.redrawBalls();
            this.world.bodies.forEach(function (item, index) {
                if (item.type == p2.Body.STATIC)
                    return;
                if (item.sleepState == p2.Body.SLEEPING) {
                    return;
                }
                if (item instanceof CustomUI.LaserBallUI) {
                    item.showDisplay(self);
                    return;
                }
            });
        };
        PlayField.prototype.createGameWorld = function () {
            var self = this;
            this.world = new GamePhysics.GameWorld(this);
        };
        PlayField.prototype.createButtons = function () {
            this.createBtnPause();
            this.createBtnSpeedUp();
            this.createBtnBenefit();
        };
        PlayField.prototype.createBtnBenefit = function () {
            var _this = this;
            var whRate = this.stage.stageWidth / this.stage.stageHeight;
            var offset = 30;
            if (whRate <= this.iphonexScale) {
                offset = 55;
            }
            this.btnBenefit = new CustomUI.ButtonBenefit();
            this.addChild(this.btnBenefit);
            this.btnBenefit.x = 22 * CommonUtils.StageUtils.getStageScale();
            this.btnBenefit.y = this.stage.stageHeight - ((this.btnBenefit.height + offset) * CommonUtils.StageUtils.getStageScale());
            this.btnBenefit.scaleX = CommonUtils.StageUtils.getStageScale();
            this.btnBenefit.scaleY = CommonUtils.StageUtils.getStageScale();
            this.btnBenefit.touchEnabled = true;
            this.btnBenefit.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (_this.showPanel)
                    return;
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                _this.btnBenefit.touchEnabled = false;
                Server.Connector.getGameClient().getUserWallet(_this);
            }, this);
            this.setChildIndex(this.btnBenefit, 5);
        };
        PlayField.prototype.createBtnPause = function () {
            this.btnPause = new egret.Sprite();
            var btnImg = CommonUtils.BitmapUtils.createBitmapByName("btn_pause_png");
            this.btnPause.addChild(btnImg);
            this.btnPause.x = 22 * CommonUtils.StageUtils.getStageScale();
            this.btnPause.y = 30 * CommonUtils.StageUtils.getStageScale();
            this.btnPause.scaleX = CommonUtils.StageUtils.getStageScale();
            this.btnPause.scaleY = CommonUtils.StageUtils.getStageScale();
            this.addChild(this.btnPause);
            this.btnPause.touchEnabled = true;
            this.btnPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPauseTap, this);
            this.setChildIndex(this.btnPause, 5);
        };
        PlayField.prototype.createBtnSpeedUp = function () {
            var whRate = this.stage.stageWidth / this.stage.stageHeight;
            var offset = 45;
            if (whRate <= this.iphonexScale) {
                offset = 55;
            }
            this.btnSpeedUp = new egret.Sprite();
            var btnImg = CommonUtils.BitmapUtils.createBitmapByName("btn_speedup_png");
            this.btnSpeedUp.addChild(btnImg);
            this.btnSpeedUp.x = 660 * CommonUtils.StageUtils.getStageScale();
            this.btnSpeedUp.y = this.stage.stageHeight - ((this.btnSpeedUp.height + offset) * CommonUtils.StageUtils.getStageScale());
            this.btnSpeedUp.scaleX = CommonUtils.StageUtils.getStageScale();
            this.btnSpeedUp.scaleY = CommonUtils.StageUtils.getStageScale();
            this.addChild(this.btnSpeedUp);
            this.setChildIndex(this.btnSpeedUp, 5);
            this.btnSpeedUp.visible = false;
        };
        PlayField.prototype.showBtnSpeedUp = function () {
            this.btnSpeedUp.visible = true;
        };
        PlayField.prototype.hideBtnSpeedUp = function () {
            this.btnSpeedUp.visible = false;
        };
        PlayField.prototype.onPauseTap = function (event) {
            if (!Server.Connector.getGameClient().isConnected())
                return;
            if (this.paused) {
                return;
            }
            if (this.showPanel) {
                return;
            }
            this.pauseGame();
        };
        PlayField.prototype.createScoreDisplay = function () {
            var top = CommonUtils.CoordinateUtils.worldLengthToStage(this.world.paddingTop + 0.6);
            var lblScore = new egret.TextField();
            lblScore.textColor = 0x6c6edb;
            lblScore.size = 30 * CommonUtils.StageUtils.getStageScale();
            this.addChild(lblScore);
            lblScore.text = "得分";
            lblScore.y = top;
            lblScore.x = 110 * CommonUtils.StageUtils.getStageScale();
            lblScore.fontFamily = "苹方";
            this.setChildIndex(lblScore, 2);
            this.txtScore = new egret.TextField();
            this.txtScore.textColor = 0x6c6edb;
            this.txtScore.size = 30 * CommonUtils.StageUtils.getStageScale();
            this.addChild(this.txtScore);
            this.txtScore.text = "0";
            this.txtScore.y = (top + 2 * CommonUtils.StageUtils.getStageScale());
            this.txtScore.x = lblScore.x + lblScore.width + 10 * CommonUtils.StageUtils.getStageScale();
            this.txtScore.fontFamily = "苹方";
            this.setChildIndex(this.txtScore, 2);
        };
        PlayField.prototype.createballCountDisplay = function () {
            var top = CommonUtils.CoordinateUtils.worldLengthToStage(this.world.paddingTop + 0.6);
            var lblBallCount = new egret.TextField();
            lblBallCount.textColor = 0x6c6edb;
            lblBallCount.size = 30 * CommonUtils.StageUtils.getStageScale();
            this.addChild(lblBallCount);
            lblBallCount.text = "球";
            lblBallCount.y = top;
            lblBallCount.x = 545 * CommonUtils.StageUtils.getStageScale();
            lblBallCount.fontFamily = "苹方";
            this.setChildIndex(lblBallCount, 2);
            this.txtBallCount = new egret.TextField();
            this.txtBallCount.textColor = 0x6c6edb;
            this.txtBallCount.size = 30 * CommonUtils.StageUtils.getStageScale();
            this.addChild(this.txtBallCount);
            this.txtBallCount.y = top;
            this.txtBallCount.x = lblBallCount.x + lblBallCount.width + 10 * CommonUtils.StageUtils.getStageScale();
            this.txtBallCount.fontFamily = "苹方";
            this.showBallCount(1, 1);
            this.setChildIndex(this.txtBallCount, 2);
        };
        PlayField.prototype.createGameTools = function () {
            var _this = this;
            // 双倍道具
            var whRate = this.stage.stageWidth / this.stage.stageHeight;
            var offset = 30;
            if (whRate <= this.iphonexScale) {
                offset = 60;
            }
            var doubleTool = new GameTool.DoubleBalls(this.world);
            this.addChild(doubleTool);
            doubleTool.x = 250 * CommonUtils.StageUtils.getStageScale();
            doubleTool.y = this.stage.stageHeight - ((doubleTool.height + offset) * CommonUtils.StageUtils.getStageScale());
            doubleTool.scaleX = CommonUtils.StageUtils.getStageScale();
            doubleTool.scaleY = CommonUtils.StageUtils.getStageScale();
            this.setChildIndex(doubleTool, 2);
            doubleTool.onTapHandler = function () {
                if (_this.paused)
                    return;
                if (_this.showPanel)
                    return;
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                if (!_this.world.isReadyToFire())
                    return;
                if (_this.world.isToolInUse()) {
                    _this.popMessage("已经有道具正在使用中", true);
                    return;
                }
                _this.paused = true;
                _this.showPanel = true;
                Server.Connector.getGameClient().getToolInfo("double", _this);
            };
            // 激光炮道具
            var laserCannonTool = new GameTool.LaserCannon(this.world);
            this.addChild(laserCannonTool);
            laserCannonTool.x = 405 * CommonUtils.StageUtils.getStageScale();
            laserCannonTool.y = this.stage.stageHeight - ((laserCannonTool.height + offset) * CommonUtils.StageUtils.getStageScale());
            laserCannonTool.scaleX = CommonUtils.StageUtils.getStageScale();
            laserCannonTool.scaleY = CommonUtils.StageUtils.getStageScale();
            this.setChildIndex(laserCannonTool, 2);
            laserCannonTool.onTapHandler = function () {
                if (_this.paused)
                    return;
                if (_this.showPanel)
                    return;
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                if (!_this.world.isReadyToFire())
                    return;
                if (_this.world.isToolInUse()) {
                    _this.popMessage("已经有道具正在使用中", true);
                    return;
                }
                Server.Connector.getGameClient().getToolInfo("laser", _this);
            };
        };
        PlayField.prototype.showToolPanel = function (toolPanel) {
            var _this = this;
            this.showPanel = true;
            this.paused = true;
            egret.Tween.get(toolPanel)
                .call(function () {
                toolPanel.show();
                _this.setChildIndex(toolPanel, _this.$children.length - 1);
                toolPanel.alpha = 0;
            })
                .to({ alpha: 1 });
        };
        PlayField.prototype.refreshScore = function () {
            this.txtScore.text = CommonUtils.GameUtils.currentScore.toString();
        };
        PlayField.prototype.showBallCount = function (validBall, totalBall) {
            this.txtBallCount.text = validBall + " / " + totalBall;
        };
        PlayField.prototype.hideToolPanel = function (toolPanel) {
            var _this = this;
            egret.Tween.get(toolPanel)
                .call(function () {
                toolPanel.visible = true;
                _this.setChildIndex(toolPanel, _this.$children.length - 1);
                toolPanel.alpha = 1;
            })
                .to({ alpha: 0 }, 50)
                .call(function () {
                toolPanel.visible = false;
            });
        };
        // Start:服务器数据处理方法
        PlayField.prototype.onGetToolInfoSuccess = function (data) {
            if (data.Code == "double") {
                this.doubleToolPanel.setPrice(data.Bonus, data.CurrentBonus, data.LeftBuyCount);
                this.doubleToolPanel.setRemainCount(data.LeftBuyCount, data.LeftShareCount);
                this.showToolPanel(this.doubleToolPanel);
                return;
            }
            if (data.Code == "laser") {
                this.laserToolPanel.setPrice(data.Bonus, data.CurrentBonus, data.LeftBuyCount);
                this.laserToolPanel.setRemainCount(data.LeftBuyCount, data.LeftShareCount);
                this.showToolPanel(this.laserToolPanel);
                return;
            }
        };
        PlayField.prototype.onGetToolInfoFailed = function (errorMessage) {
            CommonUtils.LoggerUtil.log("获取道具信息失败");
        };
        PlayField.prototype.onBuyToolSuccess = function (data) {
            this.paused = false;
            this.showPanel = false;
            if (data.Code == "double") {
                this.world.doubleNextRound();
                this.hideToolPanel(this.doubleToolPanel);
            }
            else if (data.Code == "laser") {
                this.world.laserNextRound();
                this.hideToolPanel(this.laserToolPanel);
            }
        };
        PlayField.prototype.onBuyToolFailed = function (errorMessage) {
            CommonUtils.LoggerUtil.log("购买道具失败");
            this.popMessage(errorMessage.Message, true);
        };
        PlayField.prototype.onGetShareInfoSuccess = function (data) {
            CommonUtils.LoggerUtil.log("分享到群的目标信息");
            CommonUtils.LoggerUtil.log(data);
        };
        PlayField.prototype.onGetShareInfoFailed = function (errmsg) {
            CommonUtils.LoggerUtil.log(errmsg);
            this.popMessage(errmsg, true);
        };
        PlayField.prototype.onReviveFailed = function (errmsg) {
            CommonUtils.LoggerUtil.log(errmsg);
            CommonUtils.LoggerUtil.log("购买复活失败");
            this.popMessage(errmsg.Message, true);
        };
        PlayField.prototype.onReviveSuccess = function (data) {
            CommonUtils.LoggerUtil.log("购买复活成功");
            CommonUtils.LoggerUtil.log(data);
        };
        PlayField.prototype.onConfirmTerminalFailed = function (errmsg) {
            CommonUtils.LoggerUtil.log(errmsg);
        };
        PlayField.prototype.onConfirmTerminalSuccess = function (data) {
            CommonUtils.LoggerUtil.log("确认结束");
            CommonUtils.LoggerUtil.log(data);
            if (this.contains(this.confirmTerminalPanel))
                this.removeChild(this.confirmTerminalPanel);
            platform.destroyUserInfoButton();
            this.confirmTerminalPanel.shareBtnCreated = false;
        };
        PlayField.prototype.openBenefitBox = function (clientId, benefit) {
            if (benefit.hitted) {
                return;
            }
            benefit.hitted = true;
            CommonUtils.LoggerUtil.log("福利箱被打开");
            CommonUtils.GameUtils.increaseFireDamage(benefit.clientId, 1);
            CommonUtils.LoggerUtil.log(benefit);
            var self = this;
            egret.Tween.get(benefit.displays[0])
                .to({ x: self.btnBenefit.x, y: self.btnBenefit.y, alpha: 0.6 }, 300)
                .call(function () {
                benefit.destory(self);
            });
            Server.Connector.getGameClient().openBenefitBox(benefit.clientId, self);
        };
        PlayField.prototype.onOpenBenefitBoxSuccess = function (data) {
            CommonUtils.LoggerUtil.log("打开奖励箱");
            CommonUtils.LoggerUtil.log(data);
            this.btnBenefit.popBenefit(data.Bonus, data.Gold);
        };
        PlayField.prototype.onOpenBenefitBoxFailed = function (errmsg) {
            CommonUtils.LoggerUtil.log("打开奖励箱失败");
            CommonUtils.LoggerUtil.log(errmsg);
        };
        PlayField.prototype.onGetMyWalletSuccess = function (data) {
            var _this = this;
            this.btnBenefit.touchEnabled = true;
            if (data.Bonus < 0 || data.Gold < 0 || data.CashValue < 0) {
                CommonUtils.LoggerUtil.log("用户授权页面");
                CommonUtils.LoggerUtil.log(data);
                var verifyPanel_1 = new GameScene.WxVerifyPanel("授权后可以查看您的礼包");
                var self_1 = this;
                verifyPanel_1.onVerifiedHandler = function (data) {
                    platform.destroyUserInfoButton();
                    self_1.removeChild(verifyPanel_1);
                    self_1.showPanel = false;
                    self_1.paused = false;
                    Server.Connector.getGameClient().getUserWallet(self_1);
                };
                verifyPanel_1.onCloseHandler = function (data) {
                    console.log("关闭自定义授权面板");
                    platform.destroyUserInfoButton();
                    self_1.removeChild(verifyPanel_1);
                    self_1.showPanel = false;
                    self_1.paused = false;
                };
                self_1.addChild(verifyPanel_1);
                self_1.showPanel = true;
                self_1.paused = true;
                return;
            }
            CommonUtils.LoggerUtil.log("打开用户钱包");
            CommonUtils.LoggerUtil.log(data);
            this.btnBenefit.setRead();
            var walletPanel = new GameScene.UserWalletPanel();
            this.addChild(walletPanel);
            this.paused = true;
            this.showPanel = true;
            walletPanel.onClosedHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                _this.removeChild(walletPanel);
                _this.paused = false;
                _this.showPanel = false;
            };
            walletPanel.onUseHandle = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                var platform = window.platform;
                platform.navigateToMiniProgram("wx979b36ad38e28b6e", "/pages/index/main", null, "release", null);
            };
            walletPanel.onLinkShareWx = function () {
                if (!Server.Connector.getGameClient().isConnected())
                    return;
                walletPanel.visible = false;
                _this.showLinkShareWxPanel(function () {
                    _this.linkShareWXPanel.visible = false;
                    walletPanel.visible = true;
                });
            };
            var popBonus = this.btnBenefit.popBonus();
            var popGold = this.btnBenefit.popGold();
            walletPanel.setWalletData(data.Bonus, data.Gold, data.CashValue, popBonus, popGold, data.GotoMall, data.FollowMP);
        };
        PlayField.prototype.onGetMyWalletFailed = function (errmsg) {
            this.btnBenefit.touchEnabled = true;
            CommonUtils.LoggerUtil.log("获取用户钱包失败");
            CommonUtils.LoggerUtil.log(errmsg);
        };
        PlayField.prototype.resetBricks = function (data) {
            if (this.world.isReadyToFire() || this.world.isAllMovingToTop()) {
                this.hidePopMessage();
                this.world.resetBricks(data);
            }
        };
        PlayField.prototype.popMessage = function (message, autoHide) {
            var _this = this;
            setTimeout(function () {
                _this.messagePanel.pop(message, autoHide, function () {
                    _this.isPoping = false;
                });
                if (!autoHide) {
                    _this.isPoping = true;
                }
            }, 500);
        };
        PlayField.prototype.hidePopMessage = function () {
            CommonUtils.LoggerUtil.log("开始隐藏弹出框");
            this.messagePanel.visible = false;
            this.isPoping = false;
        };
        PlayField.prototype.createGetMoreBonusPanel = function () {
            this.linkShareWXPanel = new GameScene.LinkShareWxPanel();
            var self = this;
            this.addChild(this.linkShareWXPanel);
            this.linkShareWXPanel.visible = false;
        };
        PlayField.prototype.showLinkShareWxPanel = function (onCloseHandle) {
            this.linkShareWXPanel.visible = true;
            this.linkShareWXPanel.onClosedHandle = onCloseHandle;
        };
        return PlayField;
    }(egret.DisplayObjectContainer));
    GameScene.PlayField = PlayField;
    __reflect(PlayField.prototype, "GameScene.PlayField");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var RatePanel = (function (_super) {
        __extends(RatePanel, _super);
        function RatePanel() {
            var _this = _super.call(this) || this;
            _this.friendCount = 15;
            _this.refreshing = false;
            _this.maskAlpha = 0;
            return _this;
        }
        RatePanel.prototype.drawPanel = function () {
            var _this = this;
            this.rateClose = CommonUtils.BitmapUtils.createBitmapByName("btn_back_png");
            this.addChild(this.rateClose);
            this.rateClose.scaleX = CommonUtils.StageUtils.getStageScale();
            this.rateClose.scaleY = CommonUtils.StageUtils.getStageScale();
            this.rateClose.x = 30 * CommonUtils.StageUtils.getStageScale();
            this.rateClose.y = 30 * CommonUtils.StageUtils.getStageScale();
            this.rateClose.touchEnabled = true;
            var self = this;
            this.rateClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (_this.closeHandle)
                    _this.closeHandle();
            }, this);
            var title = CommonUtils.BitmapUtils.createBitmapByName("panel_title_rate_png");
            title.scaleX = CommonUtils.StageUtils.getStageScale();
            title.scaleY = CommonUtils.StageUtils.getStageScale();
            title.x = (this.stage.stageWidth - title.width * CommonUtils.StageUtils.getStageScale()) / 2;
            title.y = 140 * CommonUtils.StageUtils.getStageScale();
            this.addChild(title);
            var listBg = new egret.Shape();
            this.addChild(listBg);
            listBg.y = title.y + (title.height + 180) * CommonUtils.StageUtils.getStageScale();
            listBg.graphics.beginFill(0x2c2c40);
            listBg.graphics.drawRoundRect(0, 0, 650 * CommonUtils.StageUtils.getStageScale(), (this.stage.stageHeight - listBg.y - 72 * CommonUtils.StageUtils.getStageScale()), 28 * CommonUtils.StageUtils.getStageScale(), 28 * CommonUtils.StageUtils.getStageScale());
            listBg.graphics.endFill();
            listBg.x = (this.stage.stageWidth - listBg.width) / 2;
            this.bmpSelf = new egret.Bitmap();
            this.addChild(this.bmpSelf);
            this.bmpSelf.x = 55 * CommonUtils.StageUtils.getStageScale();
            this.bmpSelf.y = title.y + title.height * CommonUtils.StageUtils.getStageScale() + 3 * CommonUtils.StageUtils.getStageScale();
            this.bmpSelf.width = 750 * CommonUtils.StageUtils.getStageScale();
            this.bmpSelf.height = 140 * this.friendCount * CommonUtils.StageUtils.getStageScale();
            this.bmpFriends = new egret.Bitmap();
            this.addChild(this.bmpFriends);
            this.scrollView = new egret.ScrollView();
            this.addChild(this.scrollView);
            this.scrollView.setContent(this.bmpFriends);
            this.scrollView.x = 58 * CommonUtils.StageUtils.getStageScale();
            this.scrollView.y = title.y + (title.height + 190) * CommonUtils.StageUtils.getStageScale();
            this.scrollView.width = this.stage.stageWidth;
            this.scrollView.height = this.stage.stageHeight - this.scrollView.y - 100 * CommonUtils.StageUtils.getStageScale();
            this.scrollView.scrollTop = 0;
            this.scrollView.horizontalScrollPolicy = "off";
            this.bmpFriends.width = 750 * CommonUtils.StageUtils.getStageScale();
            this.bmpFriends.height = 140 * this.friendCount * CommonUtils.StageUtils.getStageScale();
        };
        RatePanel.prototype.refreshRate = function () {
            var _this = this;
            if (this.refreshing) {
                return;
            }
            this.refreshing = true;
            var platform = window.platform;
            egret.Tween.get(this)
                .call(function () { platform.openDataContext.clearBitmap(); })
                .wait(100)
                .call(function () {
                _this.rateBitmap = platform.openDataContext.createDisplayObject();
                platform.openDataContext.getFriendsRate();
            })
                .wait(2000)
                .call(function () {
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(_this.rateBitmap);
                _this.bmpFriends.texture = renderTexture;
            })
                .call(function () {
                platform.openDataContext.getSelfRate();
            })
                .wait(1000)
                .call(function () {
                var renderTexture = new egret.RenderTexture();
                renderTexture.drawToTexture(_this.rateBitmap);
                _this.bmpSelf.texture = renderTexture;
                _this.scrollView.scrollTop = 0;
                _this.refreshing = false;
            });
        };
        return RatePanel;
    }(GameScene.MaskPanel));
    GameScene.RatePanel = RatePanel;
    __reflect(RatePanel.prototype, "GameScene.RatePanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var TerminalPanel = (function (_super) {
        __extends(TerminalPanel, _super);
        function TerminalPanel() {
            var _this = _super.call(this) || this;
            _this.shareBtnCreated = false;
            _this.maskAlpha = 0.7;
            return _this;
        }
        TerminalPanel.prototype.setScore = function (currentScore, highestScore) {
            this.txtCurrentScore.text = "\u603B\u5206 " + currentScore;
            this.txtCurrentScore.x = (this.panelDisplay.width - this.txtCurrentScore.width) / 2;
            this.txtHighestScore.text = "\u6700\u4F73 " + highestScore;
            this.txtHighestScore.x = (this.panelDisplay.width - this.txtHighestScore.width) / 2;
        };
        TerminalPanel.prototype.onUserEnterSuccess = function (data) {
            CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
            platform.destroyUserInfoButton();
            this.shareBtnCreated = false;
            Server.Connector.getGameClient().sendDamageData(CommonUtils.GameUtils.roundId, "", this);
        };
        TerminalPanel.prototype.fixVerifyButton = function () {
            var _this = this;
            platform.fixUserInfoButton().then(function (res) {
                if (!res) {
                    setTimeout(function () { _this.fixVerifyButton(); }, 1000);
                }
            });
        };
        TerminalPanel.prototype.setPrice = function (price, currentBonus, leftBuyCount) {
            var _this = this;
            this.price = price;
            console.log("left buy count = " + leftBuyCount);
            this.btnBuyRevive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
            if (leftBuyCount < 0) {
                if (this.shareBtnCreated) {
                    return;
                }
                this.shareBtnCreated = true;
                console.log("terminal panel 创建授权按钮");
                platform.createUserInfoButton(function (res) {
                    console.log("授权按钮被点击 res = ");
                    console.log(res);
                    if (res.errMsg.indexOf("getUserInfo:fail") >= 0) {
                        console.log("用户点击取消按钮");
                        return;
                    }
                    if (res.errMsg.indexOf("getUserInfo:ok") >= 0) {
                        platform.login().then(function (jsCode) {
                            setTimeout(function () {
                                console.log("重新登录成功 jsCode = " + jsCode.code);
                                var wxLoginInfo = { code: jsCode.code, encryptedData: res.encryptedData, iv: res.iv, rawData: res.rawData, signature: res.signature };
                                CommonUtils.AccountUtils.setwxUserData(wxLoginInfo);
                                Server.Connector.getGameClient().userLogin(CommonUtils.AccountUtils.getwxUserData(), _this);
                            }, 200);
                        });
                        return;
                    }
                    GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
                }, this.btnBuyRevive.x * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.x, this.btnBuyRevive.y * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.y, this.btnBuyRevive.width * CommonUtils.StageUtils.getStageScale(), this.btnBuyRevive.height * CommonUtils.StageUtils.getStageScale(), "resource/assets/wx_verify_revive.png");
                this.btnBuyRevive.visible = false;
                setTimeout(function () { _this.fixVerifyButton(); }, 1000);
            }
            else if (leftBuyCount == 0) {
                this.btnBuyRevive.visible = true;
                this.btnBuyRevive.setText("\u8D2D\u4E70\u6B21\u6570\u5DF2\u7528\u5B8C");
                this.btnBuyRevive.setStyle(CustomUI.ButtonStyle.Gray);
                this.btnBuyRevive.touchEnabled = false;
            }
            else {
                this.btnBuyRevive.visible = true;
                this.btnBuyRevive.setText("x " + price + " \u590D\u6D3B");
                this.btnBuyRevive.setStyle(CustomUI.ButtonStyle.Blue);
                this.btnBuyRevive.touchEnabled = true;
                this.btnBuyRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
            }
        };
        TerminalPanel.prototype.drawPanel = function () {
            var _this = this;
            console.log("dead panel 被加到舞台一次");
            this.panelDisplay = new egret.DisplayObjectContainer();
            this.addChild(this.panelDisplay);
            this.txtCurrentScore = new egret.TextField();
            this.panelDisplay.addChild(this.txtCurrentScore);
            this.txtCurrentScore.text = "本次得分";
            this.txtCurrentScore.size = 58;
            this.txtCurrentScore.y = 340;
            this.txtCurrentScore.textColor = 0xFFFFFF;
            this.txtHighestScore = new egret.TextField();
            this.panelDisplay.addChild(this.txtHighestScore);
            this.txtHighestScore.text = "最佳";
            this.txtHighestScore.size = 38;
            this.txtHighestScore.y = 420;
            this.txtHighestScore.textColor = 0xFCB861;
            var btnReviveFree = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, "分享给好友");
            this.panelDisplay.addChild(btnReviveFree);
            btnReviveFree.touchEnabled = true;
            btnReviveFree.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (!_this.enabled)
                    return;
                if (_this.onShareHandle)
                    _this.onShareHandle();
            }, this);
            btnReviveFree.x = (this.panelDisplay.width - btnReviveFree.width) / 2;
            btnReviveFree.y = 470;
            this.btnBuyRevive = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, " ");
            this.panelDisplay.addChild(this.btnBuyRevive);
            this.btnBuyRevive.visible = false;
            this.btnBuyRevive.touchEnabled = true;
            this.btnBuyRevive.x = (this.panelDisplay.width - this.btnBuyRevive.width) / 2;
            this.btnBuyRevive.y = btnReviveFree.y + btnReviveFree.height + 20;
            var btnFinish = CommonUtils.BitmapUtils.createBitmapByName("btn_finish_game_png");
            this.panelDisplay.addChild(btnFinish);
            btnFinish.touchEnabled = true;
            btnFinish.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (!_this.enabled)
                    return;
                _this.shareBtnCreated = false;
                if (_this.onFinishHandle)
                    _this.onFinishHandle();
            }, this);
            btnFinish.x = (this.panelDisplay.width - btnFinish.width) / 2;
            btnFinish.y = this.btnBuyRevive.y + this.btnBuyRevive.height + 40;
            var btnRestart = CommonUtils.BitmapUtils.createBitmapByName("btn_terminal_restart_png");
            this.panelDisplay.addChild(btnRestart);
            btnRestart.x = (this.panelDisplay.width - btnRestart.width) / 2;
            btnRestart.y = btnFinish.y + btnFinish.height + 20;
            btnRestart.touchEnabled = true;
            btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (!_this.enabled)
                    return;
                if (_this.onRestartHandle)
                    _this.onRestartHandle();
            }, this);
            var hiddenArea = new egret.Shape();
            this.panelDisplay.addChild(hiddenArea);
            hiddenArea.graphics.beginFill(0x000000, 0);
            hiddenArea.graphics.drawRect(0, 0, this.stage.stageWidth, 100 * CommonUtils.StageUtils.getStageScale());
            hiddenArea.graphics.endFill();
            hiddenArea.y = btnFinish.y + btnFinish.height;
            var toolIcon = CommonUtils.BitmapUtils.createBitmapByName("panel_icon_terminal_png");
            this.panelDisplay.addChild(toolIcon);
            toolIcon.y = 10;
            toolIcon.x = (this.panelDisplay.width - toolIcon.width) / 2;
            this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.x = 178 * CommonUtils.StageUtils.getStageScale();
            CommonUtils.LoggerUtil.log("current Stage Height = " + this.stage.stageHeight);
            this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;
            this.txtCurrentScore.x = (this.panelDisplay.width - this.txtCurrentScore.width) / 2;
            this.txtHighestScore.x = (this.panelDisplay.width - this.txtHighestScore.width) / 2;
        };
        TerminalPanel.prototype.onBuy = function (evt) {
            if (!this.enabled)
                return;
            if (this.onBuyReviveHandle)
                this.onBuyReviveHandle();
        };
        TerminalPanel.prototype.onDamageRequestSuccess = function (data) {
            this.setPrice(data.Revive.Bonus, data.Revive.CurrentBonus, data.Revive.LeftBuyCount);
        };
        return TerminalPanel;
    }(GameScene.MaskPanel));
    GameScene.TerminalPanel = TerminalPanel;
    __reflect(TerminalPanel.prototype, "GameScene.TerminalPanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var ToolPanel = (function (_super) {
        __extends(ToolPanel, _super);
        function ToolPanel(toolName, iconName, iconTitle, iconDesc) {
            var _this = _super.call(this) || this;
            _this.maskAlpha = 0.7;
            _this.iconName = iconName;
            _this.iconTitle = iconTitle;
            _this.iconDesc = iconDesc;
            _this.canShare = true;
            _this.toolName = toolName;
            return _this;
        }
        ToolPanel.prototype.show = function () {
            this.visible = true;
        };
        ToolPanel.prototype.setPrice = function (price, currentBonus, buyCount) {
            if (buyCount < 0) {
                this.price = price;
                this.btnConfirm.setText("\u6388\u6743\u540E\u53EF\u8D2D\u4E70");
                this.txtBonus.text = "";
                this.txtBonus.x = (this.panelDisplay.width - this.txtBonus.width) / 2;
                this.btnConfirm.setStyle(CustomUI.ButtonStyle.Yellow);
                return;
            }
            this.price = price;
            this.btnConfirm.setText("X " + price);
            this.btnConfirm.setStyle(CustomUI.ButtonStyle.Blue);
            this.txtBonus.text = "(\u5F53\u524D\u731C\u8C46 " + currentBonus + ")";
            this.txtBonus.x = (this.panelDisplay.width - this.txtBonus.width) / 2;
        };
        ToolPanel.prototype.onUserEnterSuccess = function (data) {
            if (!data.UserToken || data.UserToken == "") {
                GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
                return;
            }
            CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
            platform.destroyUserInfoButton();
            Server.Connector.getGameClient().getToolInfo(this.toolName, this);
        };
        ToolPanel.prototype.setRemainCount = function (buyCount, shareCount) {
            var _this = this;
            this.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
            if (buyCount < 0) {
                console.log("tool panel 创建授权按钮");
                platform.createUserInfoButton(function (res) {
                    console.log("授权按钮被点击 res = ");
                    console.log(res);
                    if (res.errMsg.indexOf("getUserInfo:fail") >= 0) {
                        console.log("用户点击取消按钮");
                        return;
                    }
                    if (res.errMsg.indexOf("getUserInfo:ok") >= 0) {
                        console.log("用户点击确认按钮");
                        platform.login().then(function (jsCode) {
                            if (jsCode.errMsg.indexOf("login:ok") >= 0) {
                                console.log("重新登录成功 jsCode = ");
                                console.log(jsCode);
                                console.log("res = ");
                                console.log(res);
                                var wxLoginInfo = { code: jsCode.code, encryptedData: res.encryptedData, iv: res.iv, rawData: res.rawData, signature: res.signature };
                                CommonUtils.AccountUtils.setwxUserData(wxLoginInfo);
                                Server.Connector.getGameClient().userLogin(CommonUtils.AccountUtils.getwxUserData(), _this);
                                return;
                            }
                            GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
                        });
                        return;
                    }
                    GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
                }, this.btnConfirm.x * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.x, this.btnConfirm.y * CommonUtils.StageUtils.getStageScale() + this.panelDisplay.y, this.btnConfirm.width * CommonUtils.StageUtils.getStageScale(), this.btnConfirm.height * CommonUtils.StageUtils.getStageScale(), "resource/assets/wx_verify_tool.png");
                this.btnConfirm.visible = false;
                setTimeout(function () { _this.fixVerifyButton(); }, 1000);
            }
            else if (buyCount == 0) {
                this.btnConfirm.visible = true;
                this.btnConfirm.setText("本局次数用完");
                this.btnConfirm.setStyle(CustomUI.ButtonStyle.Gray);
                this.btnConfirm.touchEnabled = false;
            }
            else {
                this.btnConfirm.visible = true;
                this.btnConfirm.setStyle(CustomUI.ButtonStyle.Blue);
                this.btnConfirm.touchEnabled = true;
                this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
            }
            if (shareCount <= 0) {
                this.canShare = false;
            }
            else {
                this.canShare = true;
            }
        };
        ToolPanel.prototype.fixVerifyButton = function () {
            var _this = this;
            platform.fixUserInfoButton().then(function (res) {
                if (!res) {
                    setTimeout(function () { _this.fixVerifyButton(); }, 1000);
                }
            });
        };
        ToolPanel.prototype.setTitle = function (title) {
            this.txtTitle.text = title;
            this.txtTitle.x = (this.panelDisplay.width - this.txtTitle.width) / 2;
        };
        ToolPanel.prototype.drawPanel = function () {
            var _this = this;
            this.panelDisplay = new egret.DisplayObjectContainer();
            this.addChild(this.panelDisplay);
            var bg = CommonUtils.BitmapUtils.createBitmapByName("panel_bg_png");
            this.panelDisplay.addChild(bg);
            this.txtTitle = new egret.TextField();
            this.panelDisplay.addChild(this.txtTitle);
            this.txtTitle.y = 25;
            this.txtTitle.size = 50;
            this.txtTitle.fontFamily = "苹方";
            var icoClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png");
            this.panelDisplay.addChild(icoClose);
            icoClose.touchEnabled = true;
            icoClose.y = -30;
            icoClose.x = this.panelDisplay.width - icoClose.width + 20;
            icoClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (!_this.enabled)
                    return;
                platform.destroyUserInfoButton();
                if (_this.onClosedHandle)
                    _this.onClosedHandle();
            }, this);
            this.btnShare = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, "免费使用");
            this.panelDisplay.addChild(this.btnShare);
            this.btnShare.x = (this.panelDisplay.width - this.btnShare.width) / 2;
            this.btnShare.y = 600;
            this.btnShare.touchEnabled = true;
            this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (!_this.enabled)
                    return;
                if (_this.onShareHandle) {
                    _this.onShareHandle(_this.canShare);
                }
            }, this);
            this.txtBonus = new egret.TextField();
            this.panelDisplay.addChild(this.txtBonus);
            this.txtBonus.x = (this.panelDisplay.width - this.txtBonus.width) / 2;
            this.txtBonus.y = 430;
            this.txtBonus.textColor = 0xFFFFFF;
            this.btnConfirm = new CustomUI.PanelButtonUI(CustomUI.ButtonStyle.Blue, "");
            this.panelDisplay.addChild(this.btnConfirm);
            this.btnConfirm.visible = false;
            this.btnConfirm.touchEnabled = true;
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
            this.btnConfirm.x = (this.panelDisplay.width - this.btnConfirm.width) / 2;
            this.btnConfirm.y = 480;
            var toolIcon = CommonUtils.BitmapUtils.createBitmapByName(this.iconName);
            this.panelDisplay.addChild(toolIcon);
            toolIcon.y = 50;
            toolIcon.x = (this.panelDisplay.width - toolIcon.width) / 2;
            this.addCenteredText(this.iconTitle, 0xFFFFFF, 35, 270);
            this.addCenteredText(this.iconDesc, 0xFFFFFF, 45, 340);
            this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.x = (this.getMaskWidth() - this.panelDisplay.width * CommonUtils.StageUtils.getStageScale()) / 2;
            this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;
            CommonUtils.LoggerUtil.log("tool panel stage height = " + this.stage.stageHeight);
        };
        ToolPanel.prototype.onBuy = function (evt) {
            if (!this.enabled)
                return;
            if (this.onConfirmHandle)
                this.onConfirmHandle();
        };
        ToolPanel.prototype.addCenteredText = function (text, color, size, y) {
            var txtField = new egret.TextField();
            this.panelDisplay.addChild(txtField);
            txtField.text = text;
            txtField.textColor = color;
            txtField.size = size;
            txtField.y = y;
            txtField.x = (this.panelDisplay.width - txtField.width) / 2;
        };
        ToolPanel.prototype.onGetToolInfoSuccess = function (data) {
            this.setPrice(data.Bonus, data.CurrentBonus, data.LeftBuyCount);
            this.setRemainCount(data.LeftBuyCount, data.LeftShareCount);
        };
        return ToolPanel;
    }(GameScene.MaskPanel));
    GameScene.ToolPanel = ToolPanel;
    __reflect(ToolPanel.prototype, "GameScene.ToolPanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var UserWalletPanel = (function (_super) {
        __extends(UserWalletPanel, _super);
        function UserWalletPanel() {
            var _this = _super.call(this) || this;
            _this.maskAlpha = 0.7;
            UserWalletPanel.popInterval = UserWalletPanel.popDelay / UserWalletPanel.popSteps;
            return _this;
        }
        UserWalletPanel.prototype.setWalletData = function (bonus, gold, cashValue, popBonus, popGold, showMall, showMP) {
            var _this = this;
            if (showMall > 0) {
                this.btnUse.visible = true;
            }
            if (showMP > 0) {
                this.btnLinkShareWx.visible = true;
            }
            if (bonus >= 0 || gold >= 0 || cashValue >= 0) {
                this.bonus = bonus;
                this.gold = gold;
                this.cashValue = cashValue;
                this.txtCacheValue.text = cashValue + "\u5143";
                if (popBonus == 0 && popGold == 0) {
                    this.txtBonus.text = this.bonus.toString();
                    this.txtGold.text = this.gold.toString();
                    return;
                }
                var bonusStep_1 = Math.floor(popBonus / UserWalletPanel.popSteps);
                var goldStep_1 = Math.floor(popGold / UserWalletPanel.popSteps);
                var startBonus_1 = bonus - popBonus;
                var startGold_1 = gold - popGold;
                var timer = new egret.Timer(UserWalletPanel.popInterval, UserWalletPanel.popSteps);
                timer.addEventListener(egret.TimerEvent.TIMER, function (evt) {
                    _this.txtBonus.text = startBonus_1.toString();
                    _this.txtGold.text = startGold_1.toString();
                    startBonus_1 += bonusStep_1;
                    startGold_1 += goldStep_1;
                }, this);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (evt) {
                    _this.txtBonus.text = _this.bonus.toString();
                    _this.txtGold.text = _this.gold.toString();
                }, this);
                timer.start();
                return;
            }
        };
        UserWalletPanel.prototype.btnLinkShareWxTap = function (evt) {
            if (this.onLinkShareWx)
                this.onLinkShareWx();
        };
        UserWalletPanel.prototype.onBtnUseTap = function (evt) {
            if (this.onUseHandle)
                this.onUseHandle();
        };
        UserWalletPanel.prototype.onGetMyWalletSuccess = function (data) {
            this.setWalletData(data.Bonus, data.Gold, data.CashValue, 0, 0, data.GotoMall, data.FollowMP);
        };
        UserWalletPanel.prototype.drawPanel = function () {
            var _this = this;
            this.panelDisplay = new egret.DisplayObjectContainer();
            this.addChild(this.panelDisplay);
            var bg = CommonUtils.BitmapUtils.createBitmapByName("panel_bg_png");
            this.panelDisplay.addChild(bg);
            this.txtTitle = new egret.TextField();
            this.panelDisplay.addChild(this.txtTitle);
            this.txtTitle.y = 25;
            this.txtTitle.size = 50;
            this.txtTitle.fontFamily = "苹方";
            this.txtTitle.text = "礼包";
            this.txtTitle.textColor = 0x7276a3;
            this.txtTitle.x = (this.panelDisplay.width - this.txtTitle.width) / 2;
            var icoClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png");
            this.panelDisplay.addChild(icoClose);
            icoClose.touchEnabled = true;
            icoClose.y = -30;
            icoClose.x = this.panelDisplay.width - icoClose.width + 20;
            icoClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (!_this.enabled)
                    return;
                platform.destroyUserInfoButton();
                if (_this.onClosedHandle)
                    _this.onClosedHandle();
            }, this);
            var liney = 140;
            var icoBonus = CommonUtils.BitmapUtils.createBitmapByName("panel_icon_bonus_png");
            this.panelDisplay.addChild(icoBonus);
            icoBonus.y = liney;
            icoBonus.x = 50;
            this.txtBonus = new egret.TextField();
            this.panelDisplay.addChild(this.txtBonus);
            this.txtBonus.x = 210;
            this.txtBonus.y = liney + 40;
            this.txtBonus.size = 42;
            this.txtBonus.width = 245;
            this.txtBonus.textAlign = egret.HorizontalAlign.CENTER;
            this.txtBonus.textColor = 0xFFFFFF;
            this.btnLinkShareWx = CommonUtils.BitmapUtils.createBitmapByName("panel_btn_getmore_png");
            this.panelDisplay.addChild(this.btnLinkShareWx);
            this.btnLinkShareWx.visible = false;
            this.btnLinkShareWx.touchEnabled = true;
            this.btnLinkShareWx.x = 450;
            this.btnLinkShareWx.y = liney + 20;
            this.btnLinkShareWx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnLinkShareWxTap, this);
            liney = 320;
            var icoGold = CommonUtils.BitmapUtils.createBitmapByName("panel_icon_gold_png");
            this.panelDisplay.addChild(icoGold);
            icoGold.y = liney;
            icoGold.x = 50;
            this.txtGold = new egret.TextField();
            this.panelDisplay.addChild(this.txtGold);
            this.txtGold.x = 210;
            this.txtGold.y = liney + 40;
            this.txtGold.size = 42;
            this.txtGold.width = 245;
            this.txtGold.textAlign = egret.HorizontalAlign.CENTER;
            this.txtGold.textColor = 0xFFFFFF;
            this.btnUse = CommonUtils.BitmapUtils.createBitmapByName("panel_btn_use_png");
            this.panelDisplay.addChild(this.btnUse);
            this.btnUse.visible = false;
            this.btnUse.touchEnabled = true;
            this.btnUse.x = 450;
            this.btnUse.y = liney + 20;
            this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUseTap, this);
            liney = 500;
            var lblCashValue = new egret.TextField();
            this.panelDisplay.addChild(lblCashValue);
            lblCashValue.x = 50;
            lblCashValue.y = liney;
            lblCashValue.size = 46;
            lblCashValue.textColor = 0x7276a3;
            lblCashValue.text = "礼包总价值";
            this.txtCacheValue = new egret.TextField();
            this.panelDisplay.addChild(this.txtCacheValue);
            this.txtCacheValue.x = lblCashValue.x + lblCashValue.width + 5;
            this.txtCacheValue.y = liney;
            this.txtCacheValue.size = 46;
            this.txtCacheValue.textColor = 0xef9105;
            liney = 580;
            var lbldesc = new egret.TextField();
            this.panelDisplay.addChild(lbldesc);
            lbldesc.x = 50;
            lbldesc.y = liney;
            lbldesc.width = 600;
            lbldesc.size = 32;
            lbldesc.textColor = 0x7276a3;
            lbldesc.lineSpacing = 10;
            lbldesc.text = "1、猜豆用于购买游戏道具或进入【微猜服务号】兑换礼包。 \n2、 抵扣劵用于商城购物/话费充值/视频会员抵扣现金。";
            this.panelDisplay.scaleX = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.scaleY = CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.x = 34 * CommonUtils.StageUtils.getStageScale();
            this.panelDisplay.y = (this.stage.stageHeight - this.panelDisplay.height * CommonUtils.StageUtils.getStageScale()) / 2;
        };
        UserWalletPanel.prototype.addCenteredText = function (text, color, size, y) {
            var txtField = new egret.TextField();
            this.panelDisplay.addChild(txtField);
            txtField.text = text;
            txtField.textColor = color;
            txtField.size = size;
            txtField.y = y;
            txtField.x = (this.panelDisplay.width - txtField.width) / 2;
        };
        UserWalletPanel.popDelay = 1000;
        UserWalletPanel.popSteps = 20;
        return UserWalletPanel;
    }(GameScene.MaskPanel));
    GameScene.UserWalletPanel = UserWalletPanel;
    __reflect(UserWalletPanel.prototype, "GameScene.UserWalletPanel");
})(GameScene || (GameScene = {}));
var GameScene;
(function (GameScene) {
    var WxVerifyPanel = (function (_super) {
        __extends(WxVerifyPanel, _super);
        function WxVerifyPanel(verifyText) {
            var _this = _super.call(this) || this;
            _this.maskAlpha = 0.6;
            _this.verifyText = verifyText;
            return _this;
        }
        WxVerifyPanel.prototype.drawPanel = function () {
            var _this = this;
            this.bg = new egret.Shape();
            this.bg.graphics.beginFill(0xFFFFFF);
            this.bg.graphics.drawRoundRect(0, 0, 578, 628, 20, 20);
            this.bg.graphics.endFill();
            this.bg.scaleX = CommonUtils.StageUtils.getStageScale();
            this.bg.scaleY = CommonUtils.StageUtils.getStageScale();
            this.addChild(this.bg);
            this.bg.x = (CommonUtils.StageUtils.getStageWidth() - this.bg.width * CommonUtils.StageUtils.getStageScale()) / 2;
            this.bg.y = (this.stage.stageHeight - this.bg.height * CommonUtils.StageUtils.getStageScale()) / 2;
            var icon = CommonUtils.BitmapUtils.createBitmapByName("wx_verify_icon_png");
            this.addChild(icon);
            icon.scaleX = CommonUtils.StageUtils.getStageScale();
            icon.scaleY = CommonUtils.StageUtils.getStageScale();
            icon.x = this.bg.x + 215 * CommonUtils.StageUtils.getStageScale();
            icon.y = this.bg.y + 65 * CommonUtils.StageUtils.getStageScale();
            var btnClose = CommonUtils.BitmapUtils.createBitmapByName("panel_close_png");
            this.addChild(btnClose);
            btnClose.x = this.bg.x + (this.bg.width - btnClose.width + 15) * CommonUtils.StageUtils.getStageScale();
            btnClose.y = this.bg.y - 20 * CommonUtils.StageUtils.getStageScale();
            btnClose.scaleX = CommonUtils.StageUtils.getStageScale();
            btnClose.scaleY = CommonUtils.StageUtils.getStageScale();
            btnClose.touchEnabled = true;
            btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
                if (_this.onCloseHandler) {
                    _this.onCloseHandler();
                }
            }, this);
            var txtTitle = new egret.TextField();
            this.addChild(txtTitle);
            txtTitle.y = this.bg.y + 280 * CommonUtils.StageUtils.getStageScale();
            txtTitle.width = this.stage.stageWidth;
            txtTitle.textAlign = egret.HorizontalAlign.CENTER;
            txtTitle.size = 36 * CommonUtils.StageUtils.getStageScale();
            txtTitle.textColor = 0x333333;
            txtTitle.text = this.verifyText;
            this.doVerify(this.bg.y);
        };
        WxVerifyPanel.prototype.doVerify = function (y) {
            var _this = this;
            var buttonWidth = 412 * CommonUtils.StageUtils.getStageScale();
            var buttonHeight = 120 * CommonUtils.StageUtils.getStageScale();
            var buttonX = (this.stage.stageWidth - buttonWidth) / 2;
            var buttonY = y + 420 * CommonUtils.StageUtils.getStageScale();
            console.log("wxVerifyPanel 创建授权按钮");
            platform.createUserInfoButton(function (res, buttonId) {
                console.log("授权按钮被点击 res = ");
                console.log(res);
                if (res.errMsg.indexOf("getUserInfo:fail") >= 0) {
                    console.log("用户点击取消按钮");
                    return;
                }
                if (res.errMsg.indexOf("getUserInfo:ok") >= 0) {
                    console.log("用户点击确认按钮");
                    platform.login().then(function (jsCode) {
                        if (jsCode.errMsg.indexOf("login:ok") >= 0) {
                            console.log("重新登录成功 jsCode = ");
                            console.log(jsCode);
                            console.log("res = ");
                            console.log(res);
                            var wxLoginInfo = { code: jsCode.code, encryptedData: res.encryptedData, iv: res.iv, rawData: res.rawData, signature: res.signature };
                            CommonUtils.AccountUtils.setwxUserData(wxLoginInfo);
                            Server.Connector.getGameClient().userLogin(CommonUtils.AccountUtils.getwxUserData(), _this);
                            return;
                        }
                        GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
                        //this.doVerify(this.bg.y);
                    });
                    return;
                }
                GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
            }, buttonX, buttonY, buttonWidth, buttonHeight, "resource/assets/wx_verify_common.png");
            setTimeout(function () { _this.fixVerifyButton(); }, 1000);
        };
        WxVerifyPanel.prototype.fixVerifyButton = function () {
            var _this = this;
            platform.fixUserInfoButton().then(function (res) {
                if (!res) {
                    setTimeout(function () { _this.fixVerifyButton(); }, 1000);
                }
            });
        };
        WxVerifyPanel.prototype.onUserEnterSuccess = function (data) {
            if (!data.UserToken || data.UserToken == "") {
                GameScene.PlayField.self.popMessage("用户授权失败，请重新授权", true);
                //this.doVerify(this.bg.y);
                return;
            }
            if (this.onVerifiedHandler)
                this.onVerifiedHandler(data);
        };
        return WxVerifyPanel;
    }(GameScene.MaskPanel));
    GameScene.WxVerifyPanel = WxVerifyPanel;
    __reflect(WxVerifyPanel.prototype, "GameScene.WxVerifyPanel");
})(GameScene || (GameScene = {}));
var GameSetting;
(function (GameSetting) {
    var BallSetting = (function () {
        function BallSetting() {
        }
        BallSetting.BallBackEdge = 0.1;
        BallSetting.BallBackTop = 0.096;
        BallSetting.BallBackBottom = 1;
        BallSetting.BallDamping = 0;
        BallSetting.BallMaxSpeed = 4;
        BallSetting.BallMass = 5;
        BallSetting.Radius = [0, 0.06, 0.08];
        return BallSetting;
    }());
    GameSetting.BallSetting = BallSetting;
    __reflect(BallSetting.prototype, "GameSetting.BallSetting");
})(GameSetting || (GameSetting = {}));
var GameSetting;
(function (GameSetting) {
    var BrickSetting = (function () {
        function BrickSetting() {
        }
        BrickSetting.InitBrickLifeMatrix = function () {
            var _this = this;
            this.GlobalScoreStep.forEach(function (val, index) {
                var areaCount = index + 1;
                var minScore = index > 0 ? _this.GlobalScoreStep[index - 1] : 0;
                var maxScore = _this.GlobalScoreStep[index];
                var minIndex = Math.floor(index / 2);
                _this.BrickLifeMatrix[index] = { MinScore: minScore, MaxScore: maxScore, BrickLifes: [] };
                var percent = _this.calculatePercent(index + 1);
                var currSeed = 0;
                for (var i = 0; i < percent.length; i++) {
                    _this.BrickLifeMatrix[index].BrickLifes[i] = { MinSeed: currSeed, MaxSeed: currSeed + percent[i], MinLife: i < 1 ? 1 : _this.GlobalLifeArray[i - 1], MaxLife: _this.GlobalLifeArray[minIndex + i] };
                    currSeed += percent[i];
                }
                _this.BrickLifeMatrix[index].BrickLifes[percent.length - 1].MaxSeed = 100;
            });
            this.BrickLifeMatrix[this.GlobalScoreStep.length] = { MinScore: this.GlobalScoreStep[this.GlobalScoreStep.length - 1], MaxScore: 99999999, BrickLifes: this.BrickLifeMatrix[this.GlobalScoreStep.length - 1].BrickLifes };
        };
        BrickSetting.calculatePercent = function (num) {
            var avgPercent = 100.0 / num;
            var result = [];
            for (var i = 0; i < num; i++) {
                result[i] = avgPercent;
            }
            for (var i = 0; i < Math.floor(num / 2); i++) {
                var diff = result[i] * 0.6;
                result[i] -= diff;
                result[i + 1] += diff;
                result[num - 1 - i] -= diff;
                result[num - 2 - i] += diff;
            }
            return result;
        };
        BrickSetting.getColorForLife = function (life) {
            if (life <= 0)
                return this.brickColorToNumber(this.BrickColors[0]);
            if (life >= 900) {
                return this.brickColorToNumber(this.BrickColors[this.BrickColors.length - 1]);
            }
            var lc;
            var hc;
            for (var i = 0; i < this.BrickColors.length - 1; i++) {
                if (this.BrickColors[i].Life > life)
                    break;
                lc = this.BrickColors[i];
                hc = this.BrickColors[i + 1];
            }
            var lifeStep = life - lc.Life;
            var lifeLength = hc.Life - lc.Life;
            var r = Math.floor(lc.R + ((hc.R - lc.R) / lifeLength) * lifeStep);
            var g = Math.floor(lc.G + ((hc.G - lc.G) / lifeLength) * lifeStep);
            var b = Math.floor(lc.B + ((hc.B - lc.B) / lifeLength) * lifeStep);
            return this.brickColorToNumber({ Life: life, R: r, G: g, B: b });
        };
        BrickSetting.brickColorToNumber = function (c) {
            var cStr = "0x" + this.numberToString(c.R, 16, 2) + this.numberToString(c.G, 16, 2) + this.numberToString(c.B, 16, 2);
            return Number(cStr);
        };
        BrickSetting.numberToString = function (num, radix, length) {
            var str = num.toString(radix);
            if (!length)
                return str;
            while (str.length < length)
                str = "0" + str;
            return str;
        };
        BrickSetting.GlobalLifeArray = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
        BrickSetting.GlobalScoreStep = [5, 10, 100, 200, 500, 1000, 2000, 4000, 7000, 10000, 15000, 20000, 25000, 30000, 50000, 80000, 120000, 160000, 200000, 210000, 220000, 230000];
        BrickSetting.Radius = 0.18;
        BrickSetting.BrickLifeMatrix = [];
        BrickSetting.StuffScale = 0.6;
        BrickSetting.BrickColors = [
            { Life: 0, R: 0xFF, G: 0xA0, B: 0x00 },
            { Life: 30, R: 0xFF, G: 0xE5, B: 0x00 },
            { Life: 40, R: 0xBF, G: 0xF6, B: 0x01 },
            { Life: 50, R: 0x7F, G: 0xF2, B: 0x00 },
            { Life: 100, R: 0x05, G: 0xCE, B: 0x65 },
            { Life: 200, R: 0x00, G: 0x6b, B: 0xe1 },
            { Life: 300, R: 0x25, G: 0x40, B: 0xff },
            { Life: 400, R: 0x4d, G: 0x25, B: 0xff },
            { Life: 500, R: 0x7a, G: 0x14, B: 0xf3 },
            { Life: 700, R: 0xbe, G: 0x0d, B: 0xbe },
            { Life: 800, R: 0xf1, G: 0x0d, B: 0x58 },
            { Life: 900, R: 0xff, G: 0x33, B: 0x0e }
        ];
        return BrickSetting;
    }());
    GameSetting.BrickSetting = BrickSetting;
    __reflect(BrickSetting.prototype, "GameSetting.BrickSetting");
})(GameSetting || (GameSetting = {}));
var GameSetting;
(function (GameSetting) {
    var ButtonSetting = (function () {
        function ButtonSetting() {
        }
        ButtonSetting.pressScale = 0.75;
        return ButtonSetting;
    }());
    GameSetting.ButtonSetting = ButtonSetting;
    __reflect(ButtonSetting.prototype, "GameSetting.ButtonSetting");
})(GameSetting || (GameSetting = {}));
var GameSetting;
(function (GameSetting) {
    var CollisionGroupSetting = (function () {
        function CollisionGroupSetting() {
        }
        CollisionGroupSetting.BALL = Math.pow(2, 0);
        CollisionGroupSetting.BRICK = Math.pow(2, 2);
        CollisionGroupSetting.WALL = Math.pow(2, 3);
        CollisionGroupSetting.STUFF = Math.pow(2, 4);
        return CollisionGroupSetting;
    }());
    GameSetting.CollisionGroupSetting = CollisionGroupSetting;
    __reflect(CollisionGroupSetting.prototype, "GameSetting.CollisionGroupSetting");
})(GameSetting || (GameSetting = {}));
var GameSetting;
(function (GameSetting) {
    var PhysicalSetting = (function () {
        function PhysicalSetting() {
        }
        PhysicalSetting.Gravity = 5.5; // 重力加速度
        PhysicalSetting.Restitution = 0.95; // 弹力系数
        PhysicalSetting.StageWorldPlayFieldHeight = 4.8;
        PhysicalSetting.BallFallenSpeedLimited = 7;
        PhysicalSetting.GroundThickness = 0.6;
        PhysicalSetting.TopPaddingScale = 0.4;
        PhysicalSetting.BottomPaddingScale = 0.6;
        return PhysicalSetting;
    }());
    GameSetting.PhysicalSetting = PhysicalSetting;
    __reflect(PhysicalSetting.prototype, "GameSetting.PhysicalSetting");
})(GameSetting || (GameSetting = {}));
var GameSetting;
(function (GameSetting) {
    var ShareSetting = (function () {
        function ShareSetting() {
        }
        ShareSetting.initShareInfoList = function () {
            CommonUtils.LoggerUtil.log("init share info list");
            this.shareInfoList = [{ title: "弹指之间，弹出收益", imageUrl: "https://file.guditech.com/20180907001.png" }];
        };
        ShareSetting.getShareInfo = function () {
            CommonUtils.LoggerUtil.log(this.shareInfoList);
            var index = Math.floor(Math.random() * this.shareInfoList.length);
            if (index == this.shareInfoList.length)
                index--;
            return this.shareInfoList[index];
        };
        return ShareSetting;
    }());
    GameSetting.ShareSetting = ShareSetting;
    __reflect(ShareSetting.prototype, "GameSetting.ShareSetting");
})(GameSetting || (GameSetting = {}));
var GameSetting;
(function (GameSetting) {
    var WallSetting = (function () {
        function WallSetting() {
        }
        WallSetting.WallPadding = 0.216;
        WallSetting.WallTop = 0.48;
        WallSetting.WallHeight = 3.82;
        WallSetting.WallWeight = 0.024;
        WallSetting.BowTop = 0.55;
        WallSetting.BowBottom = 0.75;
        return WallSetting;
    }());
    GameSetting.WallSetting = WallSetting;
    __reflect(WallSetting.prototype, "GameSetting.WallSetting");
})(GameSetting || (GameSetting = {}));
var CommonUtils;
(function (CommonUtils) {
    var ButtonUtils = (function () {
        function ButtonUtils() {
        }
        ButtonUtils.popButton = function (button) {
            var orgScaleX = button.scaleX;
            var orgScaleY = button.scaleY;
            var orgX = button.x;
            var orgY = button.y;
            var diffX = (button.width / 2 - button.anchorOffsetX) * (1 - GameSetting.ButtonSetting.pressScale) / 2;
            var diffY = (button.width / 2 - button.anchorOffsetY) * (1 - GameSetting.ButtonSetting.pressScale) / 2;
            egret.Tween.get(button)
                .to({ scaleX: orgScaleX * GameSetting.ButtonSetting.pressScale, scaleY: orgScaleY * GameSetting.ButtonSetting.pressScale, x: orgX }, 100)
                .to({ scaleX: orgScaleX, scaleY: orgScaleY }, 100);
        };
        return ButtonUtils;
    }());
    CommonUtils.ButtonUtils = ButtonUtils;
    __reflect(ButtonUtils.prototype, "CommonUtils.ButtonUtils");
})(CommonUtils || (CommonUtils = {}));
/**
 * 道具：双倍球
 */
var GameTool;
(function (GameTool) {
    var DoubleBalls = (function (_super) {
        __extends(DoubleBalls, _super);
        function DoubleBalls() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DoubleBalls.prototype.drawTool = function () {
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_tool_double_png");
            this.addChild(bitmap);
        };
        DoubleBalls.prototype.onTap = function (event) {
            if (this.onTapHandler)
                this.onTapHandler(event);
        };
        return DoubleBalls;
    }(GameTool.BaseTool));
    GameTool.DoubleBalls = DoubleBalls;
    __reflect(DoubleBalls.prototype, "GameTool.DoubleBalls");
})(GameTool || (GameTool = {}));
/**
 * 道具：激光炮
 */
var GameTool;
(function (GameTool) {
    var LaserCannon = (function (_super) {
        __extends(LaserCannon, _super);
        function LaserCannon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LaserCannon.prototype.drawTool = function () {
            var bitmap = CommonUtils.BitmapUtils.createBitmapByName("icon_tool_laser_png");
            this.addChild(bitmap);
        };
        LaserCannon.prototype.onTap = function (event) {
            if (this.onTapHandler)
                this.onTapHandler(event);
        };
        return LaserCannon;
    }(GameTool.BaseTool));
    GameTool.LaserCannon = LaserCannon;
    __reflect(LaserCannon.prototype, "GameTool.LaserCannon");
})(GameTool || (GameTool = {}));
/**
 * 道具：复活
 */
var GameToool;
(function (GameToool) {
    var Resurrector = (function () {
        function Resurrector() {
        }
        Resurrector.prototype.drawTool = function () {
        };
        return Resurrector;
    }());
    GameToool.Resurrector = Resurrector;
    __reflect(Resurrector.prototype, "GameToool.Resurrector");
})(GameToool || (GameToool = {}));
var Model;
(function (Model) {
    var BallState;
    (function (BallState) {
        BallState[BallState["Unknown"] = 0] = "Unknown";
        BallState[BallState["Fired"] = 1] = "Fired";
        BallState[BallState["MovingToTop"] = 2] = "MovingToTop";
        BallState[BallState["ReadyToFire"] = 3] = "ReadyToFire";
    })(BallState = Model.BallState || (Model.BallState = {}));
})(Model || (Model = {}));
var Model;
(function (Model) {
    var MaterialType;
    (function (MaterialType) {
        MaterialType[MaterialType["Ball"] = 1000] = "Ball";
        MaterialType[MaterialType["Wall"] = 1001] = "Wall";
        MaterialType[MaterialType["Brick"] = 1002] = "Brick";
        MaterialType[MaterialType["None"] = 1003] = "None";
    })(MaterialType = Model.MaterialType || (Model.MaterialType = {}));
})(Model || (Model = {}));
var Model;
(function (Model) {
    var SceneValue;
    (function (SceneValue) {
        SceneValue[SceneValue["Main"] = 0] = "Main";
        SceneValue[SceneValue["PlayField"] = 1] = "PlayField";
    })(SceneValue = Model.SceneValue || (Model.SceneValue = {}));
})(Model || (Model = {}));
var Model;
(function (Model) {
    var StuffType;
    (function (StuffType) {
        StuffType[StuffType["Double"] = 10] = "Double";
        StuffType[StuffType["PowerUp"] = 11] = "PowerUp";
    })(StuffType = Model.StuffType || (Model.StuffType = {}));
})(Model || (Model = {}));
var CommonUtils;
(function (CommonUtils) {
    var CoordinateUtils = (function () {
        function CoordinateUtils() {
        }
        /**
         * 世界坐标转舞台坐标
         */
        CoordinateUtils.worldPositionToStage = function (worldPosition) {
            return { X: worldPosition.X * CommonUtils.StageUtils.getFactory(), Y: (CommonUtils.StageUtils.getWorldHeight() - worldPosition.Y) * CommonUtils.StageUtils.getFactory() };
        };
        /**
         * 舞台坐标转世界坐标
         */
        CoordinateUtils.stagePositionToWorld = function (stagePosition) {
            return { X: stagePosition.X / CommonUtils.StageUtils.getFactory(), Y: CommonUtils.StageUtils.getWorldHeight() - stagePosition.Y / CommonUtils.StageUtils.getFactory() };
        };
        /**
         * 世界长度转舞台长度
         */
        CoordinateUtils.worldLengthToStage = function (worldLength) {
            return worldLength * CommonUtils.StageUtils.getFactory();
        };
        /**
         * 舞台长度转世界长度
         */
        CoordinateUtils.stageLengthToWorld = function (stageLength) {
            return stageLength / CommonUtils.StageUtils.getFactory();
        };
        return CoordinateUtils;
    }());
    CommonUtils.CoordinateUtils = CoordinateUtils;
    __reflect(CoordinateUtils.prototype, "CommonUtils.CoordinateUtils");
})(CommonUtils || (CommonUtils = {}));
var CommonUtils;
(function (CommonUtils) {
    var GameUtils = (function () {
        function GameUtils() {
        }
        GameUtils.initFireDamage = function () {
            this._currentCurrentFireDamage = {};
        };
        GameUtils.increaseFireDamage = function (itemId, damage) {
            if (!this._currentCurrentFireDamage[itemId])
                this._currentCurrentFireDamage[itemId] = 0;
            this._currentCurrentFireDamage[itemId] += damage;
        };
        GameUtils.getFireDamage = function () {
            var damagePackage = "";
            for (var index in this._currentCurrentFireDamage) {
                if (damagePackage != "")
                    damagePackage += "|";
                damagePackage += index + ":" + this._currentCurrentFireDamage[index];
            }
            return damagePackage;
        };
        GameUtils.parseBrickLineData = function (linesStr) {
            if (!linesStr)
                return null;
            var lines = linesStr.split("%");
            var result = [];
            lines.forEach(function (val, index) {
                var lineItem = val.split("*");
                var rowIndex = parseInt(lineItem[0]);
                var bricksItem = lineItem[1].split("|");
                var bricks = [];
                bricksItem.forEach(function (item, ii) {
                    var brickData = item.split(",");
                    var id = parseInt(brickData[0]);
                    if (id == 0) {
                        bricks[ii] = null;
                        return;
                    }
                    var type = parseInt(brickData[1]);
                    var brickType = 0;
                    var life = parseInt(brickData[2]);
                    var data;
                    if (type >= 0) {
                        brickType = 0;
                        data = { Life: life, Shape: type };
                    }
                    else if (type == -2 || type == -3) {
                        brickType = 1;
                        data = {
                            Code: type == -2 ? "double" : "split"
                        };
                    }
                    else if (type == -1) {
                        brickType = 2;
                        data = null;
                    }
                    else {
                        brickType = -1;
                        data = null;
                    }
                    var brick = {
                        Id: id,
                        BrickType: brickType,
                        BrickData: data
                    };
                    bricks[ii] = brick;
                });
                result[index] = {
                    RowIndex: rowIndex,
                    Bricks: bricks
                };
            });
            return result;
        };
        GameUtils.currentScore = 0;
        GameUtils.roundId = 0;
        GameUtils.wxDataProgress = Model.WxDataProgress.unStart;
        return GameUtils;
    }());
    CommonUtils.GameUtils = GameUtils;
    __reflect(GameUtils.prototype, "CommonUtils.GameUtils");
})(CommonUtils || (CommonUtils = {}));
var Server;
(function (Server) {
    var RequestState = (function () {
        function RequestState() {
        }
        RequestState.Success = 200;
        RequestState.ServerError = 500;
        return RequestState;
    }());
    Server.RequestState = RequestState;
    __reflect(RequestState.prototype, "Server.RequestState");
    var Connector = (function () {
        function Connector() {
        }
        Connector.getGameClient = function () {
            return Connector.gameClient;
        };
        Connector.getGateClient = function () {
            return Connector.gateClient;
        };
        Connector.initConnector = function (gateServerSetting) {
            this.gateServerSetting = gateServerSetting;
            this.gateClient = new Server.GateClient();
        };
        Connector.startConnectToGateServer = function (sender, stayCurrentPage) {
            if (this.gateServerSetting == null) {
                sender.onGateServerConnectFailed("gate server setting is not setted.");
                return;
            }
            sender.onBeforeGateServerConnected();
            this.gateClient.init({ host: this.gateServerSetting.ip, port: this.gateServerSetting.port }, function () {
                sender.onGateServerConnected();
                Connector.onGateServerConnected(sender);
            });
        };
        // Start: Game server methods
        Connector.startConnectToGameServer = function (sender) {
            if (Connector.gameServerSettingList == null) {
                sender.onConnectToGameServerFailed("没有可用的游戏服务器");
                return;
            }
            Connector.gameClient = new Server.GameClient();
            Connector.connectedToGameServer(0, sender);
        };
        Connector.connectedToGameServer = function (serverIndex, sender) {
            Connector.currentGameServerSetting = Connector.gameServerSettingList[serverIndex];
            // 开始连接游戏服务器，连接成功后自动登录
            Connector.gameClient.init({ host: Connector.currentGameServerSetting.HostAddress, port: Connector.currentGameServerSetting.Port }, function () {
                sender.onGameServerConnected();
            });
        };
        // End: Game server methods
        // Start: Gate server 连接处理事件
        Connector.onGateServerConnected = function (sender) {
            CommonUtils.LoggerUtil.log("gate server connect success, start to get all game entry");
            this.gateClient.getAllEntry({}, function (data) {
                if (data.Code == RequestState.Success) {
                    if (!data.Data || data.Data.length == 0) {
                        sender.onGetGameServerFailed("没有可用的游戏服务器");
                        return;
                    }
                    Connector.gameServerSettingList = data.Data;
                    sender.onGetGameServerSuccess(data);
                    Connector.startConnectToGameServer(sender);
                    return;
                }
                sender.onGetGameServerFailed(data.Data);
            });
        };
        // End: Gate server 连接处理事件
        // Start: Game server 连接处理事件
        Connector.startReconnectTimer = function (sender) {
            if (!Connector.timer) {
                Connector.timer = new egret.Timer(5000);
                Connector.timer.addEventListener(egret.TimerEvent.TIMER, function () { Connector.reConnectToGameServer(null, sender); }, sender);
            }
            if (!Connector.timer.running) {
                Connector.timer.start();
            }
        };
        Connector.reConnectToGameServer = function (serverReconnected, sender, forceReconnedted) {
            if (Connector.gameClient.State == Server.ClientState.Disconnected || forceReconnedted) {
                Connector.gameClient.close();
                platform.login().then(function (jsCode) {
                    CommonUtils.LoggerUtil.log(jsCode);
                    CommonUtils.AccountUtils.updateWxJsCode(jsCode.code);
                    Connector.gameClient.reConnect(Connector.currentGameServerSetting.HostAddress, Connector.currentGameServerSetting.Port, function () {
                        CommonUtils.LoggerUtil.log("重连游戏服务器成功");
                        Connector.gameClient.reEnter(CommonUtils.AccountUtils.getwxUserData(), sender);
                    });
                });
            }
        };
        Connector.onUserEnterSuccess = function (data, sender) {
            sender.onUserEnterSuccess(data);
        };
        Connector.onUserEnterFailed = function (message, sender) {
            if (sender.onUserEnterFailed) {
                sender.onUserEnterFailed(message);
            }
        };
        Connector.onUserReEnterSuccess = function (data, sender) {
            if (Connector.timer) {
                Connector.timer.stop();
            }
            sender.onUserReEnterSuccess(data);
        };
        Connector.onUserReEnterFailed = function (message, sender) {
            if (sender.onUserReEnterFailed) {
                sender.onUserReEnterFailed(message);
            }
        };
        Connector.onReloadGameDataSuccess = function (data, sender) {
            if (Connector.timer) {
                Connector.timer.stop();
            }
            sender.onReloadGameDataSuccess(data);
        };
        return Connector;
    }());
    Server.Connector = Connector;
    __reflect(Connector.prototype, "Server.Connector");
})(Server || (Server = {}));
var Server;
(function (Server) {
    var Route = (function () {
        function Route() {
        }
        Route.UserLogin = "UserLogin";
        Route.CreateNewRound = "CreateNewRound";
        Route.RoundData = "RoundData";
        Route.GetToolInfo = "GetToolInfo";
        Route.BuyTool = "BuyTool";
        Route.MyRecord = "MyRecord";
        Route.GetShareInfo = "GetShareInfo";
        Route.GoDie = "GoDie";
        Route.Revive = "Revive";
        Route.OpenBox = "OpenBox";
        Route.MyWallet = "MyWallet";
        Route.GetRoundData = "GetRoundData";
        Route.GetPageData = "GetPageData";
        return Route;
    }());
    __reflect(Route.prototype, "Route");
    var GameClient = (function (_super) {
        __extends(GameClient, _super);
        function GameClient() {
            var _this = _super.call(this) || this;
            _this.useWss = true;
            return _this;
        }
        GameClient.prototype.getPageData = function (pageCode, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.GetPageData, Data: pageCode }, function (data) {
                    if (!data) {
                        sender.getPageDataFailed("获取页面信息失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.getPageDataFailed(data.Data);
                        return;
                    }
                    sender.getPageDataSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().getPageData(pageCode, sender); }, 1000);
        };
        GameClient.prototype.getRoundData = function (roundId, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.GetRoundData, Data: roundId }, function (data) {
                    if (!data) {
                        sender.onGetRoundDataFailed("获取本局全量信息失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onRoundDataFailed(data.Data);
                        return;
                    }
                    sender.onGetRoundDataSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().getRoundData(roundId, sender); }, 1000);
        };
        GameClient.prototype.getUserWallet = function (sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.MyWallet }, function (data) {
                    if (!data) {
                        sender.onGetMyWalletFailed("打开用户面板失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onGetMyWalletFailed(data.Data);
                        return;
                    }
                    sender.onGetMyWalletSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().getUserWallet(sender); }, 1000);
        };
        GameClient.prototype.openBenefitBox = function (clientId, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.OpenBox, Data: clientId }, function (data) {
                    if (!data) {
                        sender.onOpenBenefitBoxFailed("打开奖励箱失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onOpenBenefitBoxFailed(data.Data);
                        return;
                    }
                    sender.onOpenBenefitBoxSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().openBenefitBox(clientId, sender); }, 1000);
        };
        GameClient.prototype.revive = function (sender, successCallback) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.Revive, Data: CommonUtils.GameUtils.roundId }, function (data) {
                    if (!data) {
                        sender.onReviveFailed("复活失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onReviveFailed(data.Data);
                        return;
                    }
                    if (successCallback)
                        successCallback(data.Data);
                    sender.onReviveSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().revive(sender, successCallback); }, 1000);
        };
        GameClient.prototype.confirmTerminal = function (sender, successCallback) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.GoDie, Data: CommonUtils.GameUtils.roundId }, function (data) {
                    if (!data) {
                        sender.onConfirmTerminalFailed("确认结束失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onConfirmTerminalFailed(data.Data);
                        return;
                    }
                    sender.onConfirmTerminalSuccess(data.Data);
                    if (successCallback) {
                        successCallback();
                    }
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().confirmTerminal(sender); }, 1000);
        };
        GameClient.prototype.userLogin = function (wxUserData, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.UserLogin, Data: wxUserData }, function (data) {
                    if (!data) {
                        Server.Connector.onUserEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        Server.Connector.onUserEnterFailed(data.Data, sender);
                        return;
                    }
                    Server.Connector.onUserEnterSuccess(data.Data, sender);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().userLogin(wxUserData, sender); }, 1000);
        };
        GameClient.prototype.createNewRound = function (sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.CreateNewRound }, function (data) {
                    if (!data) {
                        sender.onCreateNewRoundFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onCreateNewRoundFailed(data.Data, sender);
                        return;
                    }
                    sender.onCreateNewRoundSuccess(data.Data, sender);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().createNewRound(sender); }, 1000);
        };
        GameClient.prototype.sendDamageData = function (roundId, damageData, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.RoundData, Data: { RoundId: roundId, Data: damageData } }, function (data) {
                    if (!data) {
                        sender.onDamageRequestFailed("获取新的一行失败", sender);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onDamageRequestFailed(data.Data, sender);
                        return;
                    }
                    sender.onDamageRequestSuccess(data.Data, sender);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().sendDamageData(roundId, damageData, sender); }, 1000);
        };
        GameClient.prototype.getToolInfo = function (code, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.GetToolInfo, Data: { RoundId: CommonUtils.GameUtils.roundId, ToolCode: code } }, function (data) {
                    if (!data) {
                        sender.onGetToolInfoFailed("获取新的一行失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onGetToolInfoFailed(data.Data);
                        return;
                    }
                    sender.onGetToolInfoSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().getToolInfo(code, sender); }, 1000);
        };
        GameClient.prototype.BuyTool = function (code, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.BuyTool, Data: { RoundId: CommonUtils.GameUtils.roundId, ToolCode: code } }, function (data) {
                    if (!data) {
                        sender.onBuyToolFailed("购买道具失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onBuyToolFailed(data.Data);
                        return;
                    }
                    sender.onBuyToolSuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().BuyTool(code, sender); }, 1000);
        };
        GameClient.prototype.getHistory = function (count, sender) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.MyRecord, Data: { StartIndex: 0, QueryCount: count } }, function (data) {
                    if (!data) {
                        sender.onGetHistoryFailed("读取用户历史记录失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onGetHistoryFailed(data.Data);
                        return;
                    }
                    sender.onGetHistorySuccess(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().getHistory(count, sender); }, 1000);
        };
        GameClient.prototype.reEnter = function (wxUserData, sender) {
            if (this.State == Server.ClientState.Connected) {
                CommonUtils.LoggerUtil.log("开始重新登录游戏服务器");
                this.request({ Route: Route.UserLogin, Data: wxUserData }, function (data) {
                    if (!data) {
                        Server.Connector.onUserReEnterFailed("登录游戏服务器失败，用户验证不通过", sender);
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        Server.Connector.onUserReEnterFailed(data.Data, sender);
                        return;
                    }
                    CommonUtils.LoggerUtil.log("重新登游戏录服务器成功");
                    Server.Connector.onUserReEnterSuccess(data.Data, sender);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().reEnter(wxUserData, sender); }, 1000);
        };
        GameClient.prototype.getShareInfo = function (wxShareInfo, actionType, sender, successCallback) {
            if (this.State == Server.ClientState.Connected) {
                this.request({ Route: Route.GetShareInfo, Data: { encryptedData: wxShareInfo.encryptedData, iv: wxShareInfo.iv, sessionKey: CommonUtils.AccountUtils.getAccountData().SessionKey, actionType: actionType, RoundId: CommonUtils.GameUtils.roundId } }, function (data) {
                    if (!data) {
                        sender.onGetShareInfoFailed("读取分享用户信息失败");
                        return;
                    }
                    if (data.Code != Server.RequestState.Success) {
                        sender.onGetShareInfoFailed(data.Data.Message);
                        return;
                    }
                    sender.onGetShareInfoSuccess(data.Data);
                    if (successCallback)
                        successCallback(data.Data);
                });
                return;
            }
            setTimeout(function () { Server.Connector.getGameClient().getShareInfo(wxShareInfo, actionType, sender, successCallback); }, 1000);
        };
        return GameClient;
    }(Server.BaseClient));
    Server.GameClient = GameClient;
    __reflect(GameClient.prototype, "Server.GameClient");
})(Server || (Server = {}));
var Server;
(function (Server) {
    var Route = (function () {
        function Route() {
        }
        Route.GetAllEntry = "GetAllEntry";
        return Route;
    }());
    __reflect(Route.prototype, "Route");
    var GateClient = (function (_super) {
        __extends(GateClient, _super);
        function GateClient() {
            var _this = _super.call(this) || this;
            _this.useWss = true;
            return _this;
        }
        GateClient.prototype.getAllEntry = function (params, cb) {
            if (this.State == Server.ClientState.Connected) {
                try {
                    this.request({ Route: Route.GetAllEntry, Data: null }, cb);
                }
                catch (err) {
                    CommonUtils.LoggerUtil.log(err);
                    setTimeout(function () { this.getAllEntry(params, cb); }, 1000);
                }
                return;
            }
            setTimeout(function () { this.getAllEntry(params, cb); }, 1000);
        };
        return GateClient;
    }(Server.BaseClient));
    Server.GateClient = GateClient;
    __reflect(GateClient.prototype, "Server.GateClient");
})(Server || (Server = {}));
;window.Main = Main;