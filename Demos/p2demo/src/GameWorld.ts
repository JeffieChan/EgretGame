class GameWorld extends p2.World {
	private gameView:egret.DisplayObjectContainer;
    private cannon:CustomUI.CannonUI;
	public constructor(gameView:egret.DisplayObjectContainer) {
		super({gravity:[0,-GameSetting.PhysicalSetting.Gravity]});
		this.gameView = gameView;
        this.defaultContactMaterial.restitution = GameSetting.PhysicalSetting.Restitution;
        this.on("beginContact",(evt)=>{
            if(!(evt.bodyA instanceof CustomUI.BallUI || evt.bodyB instanceof CustomUI.BallUI))
                return;
            let ball:CustomUI.BallUI;
            if(evt.bodyA instanceof CustomUI.BallUI){
                ball = evt.bodyA;
            }else{
                ball = evt.bodyB;
            }
            if(ball)
                ball.mass = GameSetting.BallSetting.BallMass;
        },this); 
        this.on("beginContact",(evt)=>{
            if(!this.isBallAndBrick(evt)) return;
            let ball:CustomUI.BallUI;
            let brick:CustomUI.BrickUI;
            if(evt.bodyA instanceof CustomUI.BallUI){
                ball = evt.bodyA;
                brick = evt.bodyB;
            }else{
                ball = evt.bodyB;
                brick = evt.bodyA;
            }
            brick.hittedByBall(ball,this.gameView);
        },this); 
        this.on("beginContact",(evt)=>{
            if(!this.isBallAndGround(evt)) return;
            let ball:CustomUI.BallUI;
            if(evt.bodyA instanceof CustomUI.BallUI){
                ball = evt.bodyA;
            }else{
                ball = evt.bodyB;
            }
            ball.moveToTop(this.gameView,this);
        },this);
        this.on("beginContact",(evt)=>{
            if(!this.isBallAndWall(evt)) return;
            let ball:CustomUI.BallUI;
            let wall:CustomUI.WallUI;
            if(evt.bodyA instanceof CustomUI.BallUI){
                ball = evt.bodyA;
                wall = evt.bodyB;
            }else{
                ball = evt.bodyB;
                wall = evt.bodyA;
            }
            wall.hittedByBall(ball,this.gameView);
        },this);
	}
    public readyToFire():void{
        this.cannon.readyToFire();
    }
    public createPlayField(){
        let bg = new egret.Shape();
        bg.graphics.beginFill(0x333333);
        bg.graphics.drawRect(0,0,this.gameView.stage.stageWidth,this.gameView.stage.stageHeight);
        bg.graphics.endFill();
        this.gameView.addChild(bg);
        
        let wall:CustomUI.WallUI = new CustomUI.WallUI(GameSetting.WallSetting.WallWidth,GameSetting.WallSetting.WallHeight);
        wall.position = [GameSetting.WallSetting.WallPadding, GameSetting.WallSetting.WallWidth + GameSetting.WallSetting.WallBottom];
        wall.angle = - Math.PI / 2;
        this.addBody(wall);
        wall.showDisplay(this.gameView);

        let wall2:CustomUI.WallUI = new CustomUI.WallUI(GameSetting.WallSetting.WallWidth,GameSetting.WallSetting.WallHeight);
        wall2.position = [GameSetting.PhysicalSetting.WorldWidth - GameSetting.WallSetting.WallPadding, GameSetting.WallSetting.WallBottom];
        wall2.angle = Math.PI / 2;
        this.addBody(wall2);
        wall2.showDisplay(this.gameView);

        this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
        this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.gameView.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
    }

    public createGround():void{
        var ground:CustomUI.GroundUI = new CustomUI.GroundUI();
        this.addBody(ground);
        ground.showDisplay(this.gameView);
    }
    public createTopBow():void{
        let topLeft:CustomUI.TopBowUI = new CustomUI.TopBowUI();
        topLeft.position = [(GameSetting.PhysicalSetting.WorldWidth + 2 * GameSetting.WallSetting.WallPadding) / 4, GameSetting.PhysicalSetting.WorldHeight - 2 ];
        this.addBody(topLeft);
        topLeft.angle = - Math.PI / 20;
        topLeft.showDisplay(this.gameView);
        let topRight:CustomUI.TopBowUI = new CustomUI.TopBowUI();
        topRight.position = [(3 * GameSetting.PhysicalSetting.WorldWidth - 2 * GameSetting.WallSetting.WallPadding) / 4, GameSetting.PhysicalSetting.WorldHeight - 2 ];
        this.addBody(topRight);
        topRight.angle = Math.PI / 20;
        topRight.showDisplay(this.gameView);
    }
    public createCannon():void{
        this.cannon = new CustomUI.CannonUI();
        this.gameView.addChild(this.cannon);
        this.cannon.x = this.gameView.stage.stageWidth / 2;
        this.cannon.y = 140;
        this.gameView.setChildIndex(this.cannon,10);
        for(let i = 0 ; i < 20; i++){
            this.cannon.increaseBall(100 + Math.random() * 450 ,200,this.gameView,this, 2);
        }
    }
    private isBallAndGround(evt:any):boolean{
        if(!evt.bodyA)
            return false;
        if(!evt.bodyB)
            return false;
        return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.GroundUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.GroundUI)
    
    }
    private isBallAndBrick(evt:any):boolean{
        if(!evt.bodyA)
            return false;
        if(!evt.bodyB)
            return false;
        return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.BrickUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.BrickUI)
    }
    private isBallAndWall(evt:any):boolean{
        if(!evt.bodyA)
            return false;
        if(!evt.bodyB)
            return false;
        return (evt.bodyA instanceof CustomUI.BallUI && evt.bodyB instanceof CustomUI.WallUI) || (evt.bodyB instanceof CustomUI.BallUI && evt.bodyA instanceof CustomUI.WallUI)
    }
    private onBeginTouch(event:egret.TouchEvent):void{
        this.cannon.startAim();
    }
    private onTouchMove(event:egret.TouchEvent):void{
        this.cannon.aim(event.stageX,event.stageY);
    }
    private onEndTouch(event:egret.TouchEvent):void{
        this.cannon.fire();
        this.cannon.stopAim();
    }
}