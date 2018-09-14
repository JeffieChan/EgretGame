module GameScenes{
    export class GameSceneManager{
        private static readonly SupportedScene = [GameScenes.PlayTableScene
                                                 ,GameScenes.TrendScene
                                                 ,GameScenes.HistoryScenes
                                                 ,GameScenes.HelpScene
                                                 ,GameScenes.MyBetRecordScene
                                                 ,GameScenes.MyBetDetailRecordScene
                                                 ,GameScenes.AccountListScene];
        private constructor(){}
        private static rootStage:egret.DisplayObjectContainer;
        public static setRootStage(rootStage:egret.DisplayObjectContainer){
            this.rootStage = rootStage;
        }
        public static pushScene(sceneType:any,setting?:any,width?:number,extraData?:any):BaseScene{
            if(GameSceneManager.SupportedScene.indexOf(sceneType) < 0)
                throw new Error("Unsupported scene");
            if(this.rootStage == null)
                throw new Error("Root stage hasn't setted");
            let scene = new sceneType(setting);
            scene.setUserToken(CommonUtils.AccountUtils.getAccountToken());
            scene.extraData = extraData;
            this.rootStage.addChild(scene);
            return scene;
        }
        public static destoryScene(scene:egret.DisplayObject){
            this.removeObject(scene,this.rootStage);
        }
        private static removeObject(obj:egret.DisplayObject,parent:egret.DisplayObjectContainer){
            if(obj == null){
                return;
            }
            if(parent.$children.indexOf(obj) < 0){
                return;
            }
            if(!(obj instanceof egret.DisplayObjectContainer)){
                parent.removeChild(obj);
                return;
            }
            if(obj.$children != null && obj.$children.length > 0){
                obj.$children.forEach((val)=>{
                    this.removeObject(val,obj);
                });
            }
            parent.removeChild(obj);
        }
    }
}