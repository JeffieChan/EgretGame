var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=StageUtils.js.map