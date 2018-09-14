 module GameScenes{
    export class  ErrorMessageScene extends RootScene{
        public constructor(setting?:any){
            super(setting);
            this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,self);
        }
        private onAddToStage(event:egret.Event){
            this.initStyle();
        }
    }
 }