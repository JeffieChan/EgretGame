
class Main extends egret.DisplayObjectContainer{
    private _isDebug:boolean = false;
    private _createType:number = 0;
    private _stageHeight:number = 0;
    private world:GameWorld;
    private timeStep:number;
    public constructor() { 
        super();
        this.timeStep = 1 / 30;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        this._stageHeight = this.stage.stageHeight;
        this.createWorld();
        this.world.createPlayField();
        this.world.createGround();
        this.world.createTopBow();
        this.world.createCannon();
        this.stage.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.createTestBrick();
    }
    private createTestBrick(){
        for(let i = 0 ; i < 10; i++){
            var roundBrick:CustomUI.BrickUI = new CustomUI.PolygonBrickUI(Math.floor(Math.random() * 200),3 + Math.floor(Math.random() * 4));
            roundBrick.position = [ GameSetting.PhysicalSetting.WorldWidth / 2 + (Math.random() - 0.5)  * 10 , 2 + Math.random() * 15];
            this.world.addBody(roundBrick);
            roundBrick.showDisplay(this);
        }
        for(let i = 0 ; i < 10; i++){
            var roundBrick:CustomUI.BrickUI = new CustomUI.RoundBrickUI(Math.floor(Math.random() * 200));
            roundBrick.position = [ GameSetting.PhysicalSetting.WorldWidth / 2 + (Math.random() - 0.5)  * 10 ,  2 + Math.random() * 15];
            this.world.addBody(roundBrick);
            roundBrick.showDisplay(this);
        }
    }
    private createWorld():void{
        let self = this;
        this.world = new GameWorld(this);
    }
    private onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    private onEnterFrame(event:egret.Event){
        let self = this;
        this.world.step(this.timeStep);
        this.world.bodies.forEach((item,index)=>{
            if(item.type == p2.Body.STATIC)
                return;
            if(item.sleepState == p2.Body.SLEEPING){
                return;
            }
            if(item instanceof CustomUI.BallUI){
                (<CustomUI.BallUI>item).showDisplay(self);
            }
        });
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }
}