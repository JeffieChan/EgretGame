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
//# sourceMappingURL=AddLine.js.map