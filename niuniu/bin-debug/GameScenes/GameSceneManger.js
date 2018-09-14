var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameScenes;
(function (GameScenes) {
    var GameSceneManger = (function () {
        function GameSceneManger() {
        }
        GameSceneManger.setRootStage = function (rootStage) {
            this.rootStage = rootStage;
        };
        GameSceneManger.pushScene = function (sceneType, setting, width, extraData) {
            if (GameSceneManger.SupportScene.indexOf(sceneType) < 0)
                throw new Error("UnSupportScene");
            if (this.rootStage == null)
                throw new Error("rootStage hasn't setted");
            var scene = new sceneType(setting);
            scene.touchEnabled = true;
            scene.setUserToken(CommonUtils.AccountUtils.getAccountToken());
            scene.extraData = extraData;
            this.rootStage.addChild(scene);
            return scene;
        };
        GameSceneManger.destoryScene = function (scene) {
            this.removeObject(scene, this.rootStage);
            var playTableScene = this.rootStage.$children[1];
            playTableScene.canPutBet = true;
            playTableScene.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, playTableScene.putBet, playTableScene);
        };
        GameSceneManger.removeObject = function (obj, parent) {
            var _this = this;
            if (obj == null) {
                return;
            }
            if (parent.$children.indexOf(obj) < 0) {
                return;
            }
            if (!(obj instanceof egret.DisplayObjectContainer)) {
                parent.removeChild(obj);
                return;
            }
            if (obj.$children != null && obj.$children.length > 0) {
                obj.$children.forEach(function (val) {
                    _this.removeObject(val, obj);
                });
            }
            parent.removeChild(obj);
        };
        GameSceneManger.SupportScene = [GameScenes.PlayTableScene,
            GameScenes.HelpScene,
            GameScenes.HistroyScene,
            GameScenes.TrendScene];
        return GameSceneManger;
    }());
    GameScenes.GameSceneManger = GameSceneManger;
    __reflect(GameSceneManger.prototype, "GameScenes.GameSceneManger");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=GameSceneManger.js.map