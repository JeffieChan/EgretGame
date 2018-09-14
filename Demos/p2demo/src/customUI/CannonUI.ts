module CustomUI{
    export class CannonUI extends egret.Sprite{
        private angle:number;
        private power:number;
        private aimLine:egret.Shape[];
        private static aimPointRadius = 5;
        private static aimPointColor = 0xFFFFFF;
        private static minPower = 10;
        private static maxPower = 13;
        private static maxLength = 1000;
        private static aimPointCount = 10;
        private static scaleStep = 0.5 / CannonUI.aimPointCount;
        private aiming:boolean;
        private firing:boolean;
        private fireIndex:number;
        private balls:CustomUI.BallUI[];
        public constructor(){
            super();
            this.balls = [];
            this.aiming = false;
            this.once(egret.Event.ADDED_TO_STAGE , this.onAddToStage, this);
        }
        private onAddToStage(evt:egret.Event):void{
            this.aimLine = [];
            for(let i = 0; i < CannonUI.aimPointCount; i++){
                this.aimLine[i] = new egret.Shape();
                this.aimLine[i].graphics.beginFill(CannonUI.aimPointColor);
                this.aimLine[i].graphics.drawCircle(0,0,CannonUI.aimPointRadius);
                this.aimLine[i].graphics.endFill();
                this.aimLine[i].visible = false;
                this.addChild(this.aimLine[i]);
            }
        }
        public startAim(){
            if(!this.isReadyToFire()){
                this.aiming = false;
                return;
            }
            if(this.firing)
                return;
            this.aiming = true;
            for(let i = 0; i < CannonUI.aimPointCount; i++){
                this.aimLine[i].visible = true;
            }
        }
        public stopAim(){
            this.aiming = false;
            for(let i = 0; i < CannonUI.aimPointCount; i++){
                this.aimLine[i].visible = false;
            }
        }
        public fire(){
            if(!this.aiming)
                return;
            if(this.firing)
                return;
            for(let i = 0; i < this.balls.length;i++){
                if(this.balls[i].state != Model.BallState.ReadyToFire)
                    return;
            }

            let self = this;
            this.firing = true;
            this.fireIndex = 0;
            let timer = new egret.Timer(200,this.balls.length);
            let worldPosition = Tool.CoordinateTool.stagePositionToWorld({X:this.x,Y:this.y});
            timer.addEventListener(egret.TimerEvent.TIMER,(evt:egret.TimerEvent)=>{
                let xspeed = this.power * Math.cos(this.angle);
                let yspeed = - this.power * Math.abs(Math.sin(this.angle));

                this.balls[this.fireIndex].position = [worldPosition.X,worldPosition.Y];
                this.balls[this.fireIndex].mass = 0;
				this.balls[this.fireIndex].shapes[0].collisionMask = GameSetting.CollisionGroupSetting.BRICK 
						| GameSetting.CollisionGroupSetting.GROUND 
						| GameSetting.CollisionGroupSetting.WALL;
                this.balls[this.fireIndex].velocity = [xspeed, yspeed];
                this.balls[this.fireIndex].state = Model.BallState.Fired;
                this.fireIndex ++;
                if(self.fireIndex >= this.balls.length){
                    timer.stop();
                    self.firing = false;
                    self.fireIndex = 0;
                    return;
                }
            },this);
            timer.start();
        }
        public aim(stageX:number,stageY:number){
            if(!this.aiming){
                return;
            }
            if(this.firing)
                return;
            this.angle = ((this.stage.stageWidth - stageX) / this.stage.stageWidth) * Math.PI;
            this.power = ((stageY - this.y) / CannonUI.maxLength) * CannonUI.maxPower;
            this.power = Math.min(this.power,CannonUI.maxPower);
            this.power = Math.max(this.power,CannonUI.minPower);
            let length = (this.power / CannonUI.maxPower) * CannonUI.maxLength;
            let stepX = (length / CannonUI.aimPointCount) * Math.cos(this.angle);
            let stepY = (length / CannonUI.aimPointCount) * Math.sin(this.angle);
            for(let i = 0; i < CannonUI.aimPointCount; i++){
                this.aimLine[i].x = i * stepX;
                this.aimLine[i].y = i * stepY;
                this.aimLine[i].scaleX = 1 - i * CannonUI.scaleStep;
                this.aimLine[i].scaleY = 1 - i * CannonUI.scaleStep;
            }
        }
        public readyToFire(){
            if(!this.isReadyToFire())
                return;
            for(let i = 0; i < this.balls.length; i++){
                this.balls[i].readyToFire();
            }
        }
        public increaseBall(stageX,stageY,container:egret.DisplayObjectContainer,gameWorld:GameWorld,ballPower?:number):void{

            let self = this;
            let worldPos = Tool.CoordinateTool.stagePositionToWorld({X:stageX,Y:stageY});
            let power = 1;
            if(ballPower)
                power = ballPower;
            let newBall = new CustomUI.BallUI(power,Model.BallState.Fired);
            newBall.position = [worldPos.X ,worldPos.Y];
            gameWorld.addBody(newBall);
            newBall.showDisplay(container);
            this.balls.push(newBall);

        }
        private isReadyToFire():boolean{

            for(let i = 0; i < this.balls.length; i++){
                if(this.balls[i].state != Model.BallState.ReadyToFire)
                    return false;
            };
            return true;
        }
    }
}