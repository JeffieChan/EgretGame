module GameScenes {
    export class GameSceneManger {
        private static readonly SupportScene = [GameScenes.PlayTableScene
            , GameScenes.HelpScene
            , GameScenes.HistroyScene
            , GameScenes.TrendScene];
        private constructor() { }
        private static rootStage: egret.DisplayObjectContainer;
        public static setRootStage(rootStage: egret.DisplayObjectContainer) {
            this.rootStage = rootStage;
        }

        public static pushScene(sceneType: any, setting?: any, width?: number, extraData?: any): BaseScene {
            if (GameSceneManger.SupportScene.indexOf(sceneType) < 0)
                throw new Error("UnSupportScene");
            if (this.rootStage == null)
                throw new Error("rootStage hasn't setted");
            let scene = new sceneType(setting);
            scene.touchEnabled = true;
            scene.setUserToken(CommonUtils.AccountUtils.getAccountToken());
            scene.extraData = extraData;
            this.rootStage.addChild(scene);

            return scene;
        }
         
      
        public static destoryScene(scene: egret.DisplayObject) {
            this.removeObject(scene, this.rootStage);
            var playTableScene = <PlayTableScene> this.rootStage.$children[1];
            playTableScene.canPutBet = true;
            playTableScene.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, playTableScene.putBet, playTableScene);

        }
        private static removeObject(obj: egret.DisplayObject, parent: egret.DisplayObjectContainer) {
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
                obj.$children.forEach((val) => {
                    this.removeObject(val, obj);
                });
            }
            parent.removeChild(obj);
        }

    }
}