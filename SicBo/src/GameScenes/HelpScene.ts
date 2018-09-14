module GameScenes{
    export class HelpScene extends GameScenes.BaseScene{
        public constructor(setting?:any){
            super(setting);
			this.presenter = new HelpPresenter(this);
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage(evt:egret.Event){
            this.initStyle();
        }
    }
}