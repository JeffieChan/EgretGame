module CustomUI {
    export class CannonUI extends egret.Sprite {
        private static self: CannonUI;
        private angle: number;
        private power: number;
        private aimLine: egret.Shape[];
        private laserLine: egret.Bitmap[];
        private static aimPointRadius = 2.5;
        private static aimPointColor = 0xFFFFFF;
        private static defaultPower = 3;
        private static maxLength = 1000;
        private static aimPointCount = 10;
        private static scaleStep = 0.5 / CannonUI.aimPointCount;
        public aiming: boolean;
        private firing: boolean;
        private fireIndex: number;
        private fireTempIndex: number;
        private balls: CustomUI.BallUI[];
        private tempBalls: CustomUI.BallUI[];
        public static currBallIndex: number = 0;
        private totalBallCount: number;
        private validBallCount: number;
        public speedUp: boolean;
        public onBallCountChanged: Function;
        private doubleBalls: boolean;
        private useLaser: boolean;
        private tempBallCount: number = 0;
        private firePosition: any;
        private xspeed: number;
        private yspeed: number;
        private ballcount: number;
        private gameWorld: GamePhysics.GameWorld;
        private container: any;
        private laserCannon: egret.Bitmap;
        private fireDelay: number;
        public cannonIsReady:boolean;
        public constructor(gameWorld: GamePhysics.GameWorld, container: egret.DisplayObjectContainer) {
            super();
            this.balls = [];
            this.aiming = false;
            this.power = CannonUI.defaultPower;
            this.totalBallCount = 0;
            this.validBallCount = 0;
            this.speedUp = false;
            this.doubleBalls = false;
            this.useLaser = false;
            this.tempBalls = [];
            this.gameWorld = gameWorld;
            this.container = container;
            CannonUI.self = this;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
		public clearTools():void{
			this.useLaser = false;
            this.doubleBalls = false;
		}
        public redrawBalls(): void {
            this.balls.forEach((item) => {
                item.showDisplay(this.container);
            });
            this.tempBalls.forEach((item) => {
                item.showDisplay(this.container);
            });
        }
        public isToolInUse(): boolean {
            return (this.doubleBalls || this.useLaser);
        }
        public checkBallSpeed() {
            this.balls.forEach((val) => {
                if (!val)
                    return;
                if (val.velocity[1] <= -GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = -GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                if (val.velocity[1] >= GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                val.unlockStuck();
            });
            this.tempBalls.forEach((val) => {
                if (!val)
                    return;
                if (val.velocity[1] <= -GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = -GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                if (val.velocity[1] >= GameSetting.PhysicalSetting.BallFallenSpeedLimited)
                    val.velocity[1] = GameSetting.PhysicalSetting.BallFallenSpeedLimited;
                val.unlockStuck();
            });
        }
        private onAddToStage(evt: egret.Event): void {
            this.aimLine = [];
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i] = new egret.Shape();
                this.aimLine[i].graphics.beginFill(CannonUI.aimPointColor);
                this.aimLine[i].graphics.drawCircle(0, 0, CannonUI.aimPointRadius);
                this.aimLine[i].graphics.endFill();
                this.aimLine[i].visible = false;
                this.addChild(this.aimLine[i]);
            }
            this.laserLine = [];
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i] = CommonUtils.BitmapUtils.createBitmapByName("laser_aiming_ling_png");
                this.laserLine[i].visible = false;
                this.addChild(this.laserLine[i]);
            }
            this.laserCannon = CommonUtils.BitmapUtils.createBitmapByName("laser_cannon_png");
            this.laserCannon.anchorOffsetX = this.laserCannon.width / 2;
            this.laserCannon.anchorOffsetY = this.laserCannon.height / 2;
            this.laserCannon.scaleX = CommonUtils.StageUtils.getStageScale();
            this.laserCannon.scaleY = CommonUtils.StageUtils.getStageScale();
            this.addChild(this.laserCannon);
            this.laserCannon.visible = false;
            setInterval(
                () => {
                    egret.Tween.get(this.laserCannon)
                        .to({ scaleX: CommonUtils.StageUtils.getStageScale() * 0.7, scaleY: CommonUtils.StageUtils.getStageScale() * 0.7 }, 1500)
                        .to({ scaleX: CommonUtils.StageUtils.getStageScale(), scaleY: CommonUtils.StageUtils.getStageScale() }, 1500);
                },
                3000
            );
        }
        public doubleNextRound(): void {
            this.doubleBalls = true;
            this.cannonIsReady = false;

            setTimeout(
                () => {
                    let msg = CommonUtils.BitmapUtils.createBitmapByName("double_ready_msg_png");
                    this.container.addChild(msg);
                    this.container.setChildIndex(msg, -1);
                    msg.scaleX = CommonUtils.StageUtils.getStageScale();
                    msg.scaleY = CommonUtils.StageUtils.getStageScale();
                    msg.x = (this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
                    msg.y = (this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
                    msg.alpha = 1;
                    egret.Tween.get(msg)
                        .wait(1000)
                        .to({ alpha: 0 }, 500)
                        .call(() => { this.container.removeChild(msg); });
                }, 500
            );

            if (this.isAllBallReadyToFire() && this.doubleBalls) {
                this.buildTempBalls();
            }

        }
        private buildTempBalls() {
            this.tempBalls = [];
            let timer = new egret.Timer(50, this.balls.length)
            let count = 0;
            this.cannonIsReady = false;
            timer.addEventListener(egret.TimerEvent.TIMER, (evt: egret.TimerEvent) => {

                console.log(`新增临时球 this.cannonIsReady = ${this.cannonIsReady}`);
                let newBall = new CustomUI.BallUI(this.balls[count].getPower(), Model.BallState.ReadyToFire, true);
                this.tempBalls.push(newBall);
                newBall.position = [CommonUtils.StageUtils.getWorldWidth() * 0.3 + Math.random() * 0.4, CommonUtils.StageUtils.getWorldHeight()];
                newBall.showDisplay(this.container);
                this.gameWorld.addBody(newBall);
                count++;

            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,(evt)=>{
                this.cannonIsReady = true;
            },this)
            timer.start();
        }
        public laserNextRound(): void {
            this.useLaser = true;

            setTimeout(
                () => {
                    let msg = CommonUtils.BitmapUtils.createBitmapByName("laser_ready_msg_png");
                    this.container.addChild(msg);
                    this.container.setChildIndex(msg, -1);
                    msg.scaleX = CommonUtils.StageUtils.getStageScale();
                    msg.scaleY = CommonUtils.StageUtils.getStageScale();
                    msg.x = (this.stage.stageWidth - msg.width * CommonUtils.StageUtils.getStageScale()) / 2;
                    msg.y = (this.stage.stageHeight - msg.height * CommonUtils.StageUtils.getStageScale()) / 2;
                    msg.alpha = 1;
                    egret.Tween.get(msg)
                        .wait(1000)
                        .to({ alpha: 0 }, 500)
                        .call(() => { this.container.removeChild(msg); });
                }, 500);

            if (this.isReadyToFire() && this.useLaser) {
                this.showLaserCannon();
            }
        }
        private showLaserCannon(): void {
            this.laserCannon.visible = true;
        }
        private hideLaserCannon(): void {
            this.laserCannon.visible = false;
        }
        public startAim() {
            CommonUtils.LoggerUtil.log(` this.isReadyToFire() = ${this.isReadyToFire()}`);
            CommonUtils.LoggerUtil.log(` CannonUI.self.firing= ${CannonUI.self.firing}`);
            CommonUtils.LoggerUtil.log(` this.aiming = ${this.aiming}`);
            if (!this.isAllBallReadyToFire()) {
                this.aiming = false;
                console.log("没有准备好瞄准");
                return;
            }
            if (CannonUI.self.firing){
                console.log("正在瞄准");
                return;
            }
            this.aiming = true;
            if (!this.useLaser) {
                this.showBallLine();
                return;
            }
            this.showLaserLine();
        }
        public stopAim() {
            this.aiming = false;
            this.hideBallLine();
            this.hideLaserLine();
        }

        public aim(stageX: number, stageY: number) {
            let aimingLimit = 0.1;
            if (!this.aiming) {
                return;
            }
            if (CannonUI.self.firing)
                return;
            if (stageX != this.x) {
                this.angle = Math.atan((stageY - this.y) / (stageX - this.x));
                if (this.angle < 0) {
                    this.angle += Math.PI;
                }
            }
            else {
                this.angle = Math.PI / 2;
            }
            if (this.angle >= Math.PI * (1 - aimingLimit)) {
                this.angle = Math.PI * (1 - aimingLimit);
            }
            if (this.angle <= Math.PI * aimingLimit) {
                this.angle = Math.PI * aimingLimit;
            }
            if (!this.useLaser) {
                this.ballLineAiming(stageX, stageY);
                return;
            }
            this.laserLineAiming(stageX, stageY);
        }
        public fire() {
            if (!this.aiming)
                return;
            if (CannonUI.self.firing)
                return;
            this.destoryAllTempBalls(this.container,this.gameWorld);
            if (!this.useLaser) {
                this.fireBalls();
                return;
            }
            this.fireLaser();
        }
        public readyToFire(): boolean {
            if (!this.isAllBallReadyToFire())
                return false;
            if (this.useLaser) {
                this.showLaserCannon();
            }
            if (this.doubleBalls) {
                this.buildTempBalls();
            }
            for (let i = 0; i < this.balls.length; i++) {
                this.balls[i].readyToFire();
            }
            this.validBallCount = this.totalBallCount;
            if (this.onBallCountChanged)
                this.onBallCountChanged(this.validBallCount, this.totalBallCount);
            this.cannonIsReady = true;
            console.log("cannon 准备就绪")
            return true;
        }
        public destoryAllBalls(container: egret.DisplayObjectContainer, gameWorld: GamePhysics.GameWorld) {
            this.destoryAllTempBalls(container,gameWorld)
            let ball = this.balls.pop();
            while (ball) {
                ball.destory(container);
                ball = this.balls.pop();
            }
        }
        public destoryAllTempBalls(container: egret.DisplayObjectContainer, gameWorld: GamePhysics.GameWorld) {
            let ball = this.tempBalls.pop();
            while (ball) {
                ball.destory(container);
                ball = this.tempBalls.pop();
            }
        }
        public initGenisBall(ballCount: number, container: egret.DisplayObjectContainer, gameWorld: GamePhysics.GameWorld) {
            let self = this;
            let worldPos = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: this.x, Y: this.y });
            for (let i = 0; i < ballCount; i++) {
                let newBall = new CustomUI.BallUI(1, Model.BallState.ReadyToFire);
                newBall.position = [worldPos.X, CommonUtils.CoordinateUtils.stageLengthToWorld(this.stage.stageHeight - this.y + 30)];
                gameWorld.addBody(newBall);
                newBall.showDisplay(container);
                this.balls.push(newBall);
            }
            this.totalBallCount = ballCount;
            this.validBallCount = ballCount;
            if (this.onBallCountChanged)
                this.onBallCountChanged(this.validBallCount, this.totalBallCount);
            this.cannonIsReady = true;

        }
        public increaseBall(ball: BallUI, container: egret.DisplayObjectContainer, gameWorld: GamePhysics.GameWorld) {
            let self = this;
            gameWorld.addBody(ball);
            ball.showDisplay(container);
            this.balls.push(ball);
            this.totalBallCount += 1;
            if (this.onBallCountChanged)
                this.onBallCountChanged(this.validBallCount, this.totalBallCount);
        }
        public decreaseTempBallCount(): void {
            this.tempBallCount--;
        }
        public isAllBallHitFloor(): boolean {
            for (let i = 0; i < this.tempBalls.length; i++) {
                if (this.tempBalls[i].state == Model.BallState.Fired)
                    return false;
                if (this.tempBalls[i].state == Model.BallState.Unknown)
                    return false;
            };

            for (let i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state == Model.BallState.Fired)
                    return false;
                if (this.balls[i].state == Model.BallState.Unknown)
                    return false;
            };

            return true;
        }
        public isAllMovingToTop(): boolean {

            for (let i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state == Model.BallState.ReadyToFire || this.balls[i].state != Model.BallState.MovingToTop)
                    return false;
            };
            for (let i = 0; i < this.tempBalls.length; i++) {
                if (this.tempBalls[i].state == Model.BallState.ReadyToFire || this.balls[i].state != Model.BallState.MovingToTop)
                    return false;
            };

            return true;
        }
        public isReadyToFire(): boolean {
            return this.cannonIsReady;
        }
        public isAllBallReadyToFire():boolean{
            
            if (this.tempBallCount > 0)
                return false;

            for (let i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state != Model.BallState.ReadyToFire)
                    return false;
            };

            return true;
        }
        private showBallLine(): void {
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i].visible = true;
            }
        }
        private hideBallLine(): void {
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i].visible = false;
            }
        }
        private ballLineAiming(stageX: number, stageY: number) {
            if (stageX != this.x) {
                this.angle = Math.atan((stageY - this.y) / (stageX - this.x));
                if (this.angle < 0) {
                    this.angle += Math.PI;
                }
            }
            else {
                this.angle = Math.PI / 2;
            }
            let p = ((stageY - this.y) / CannonUI.maxLength) * CannonUI.defaultPower;
            p = Math.max(p, CannonUI.defaultPower / 4);
            let length = (p / CannonUI.defaultPower) * CannonUI.maxLength;
            let stepX = (length / CannonUI.aimPointCount) * Math.cos(this.angle);
            let stepY = (length / CannonUI.aimPointCount) * Math.sin(this.angle);
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.aimLine[i].x = i * stepX;
                this.aimLine[i].y = i * stepY;
            }
            p = null;
        }
        private showLaserLine(): void {
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i].visible = true;
            }
        }
        private hideLaserLine(): void {
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i].visible = false;
            }
        }
        private laserLineAiming(stageX: number, stageY: number) {
            let p = ((stageY - this.y) / CannonUI.maxLength) * CannonUI.defaultPower;
            p = Math.max(p, CannonUI.defaultPower / 4);
            let length = (p / CannonUI.defaultPower) * CannonUI.maxLength;
            let stepX = (length / CannonUI.aimPointCount) * Math.cos(this.angle);
            let stepY = (length / CannonUI.aimPointCount) * Math.sin(this.angle);
            for (let i = 0; i < CannonUI.aimPointCount; i++) {
                this.laserLine[i].x = i * stepX;
                this.laserLine[i].y = i * stepY;
                this.laserLine[i].rotation = 180 * (this.angle / Math.PI);
            }
        }
        private fireLaser(): void {
            this.cannonIsReady = false;
            let worldPosition = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: this.x, Y: this.y });
            let xspeed = this.power * Math.cos(this.angle);
            let yspeed = - this.power * Math.abs(Math.sin(this.angle));
            CannonUI.self.firing = true;
            this.hideLaserCannon();
            let laserBall: LaserBallUI = new LaserBallUI(0.2, 5000);
            laserBall.onDestroy = () => {
                CannonUI.self.firing = false;
                this.cannonIsReady = true;
                this.useLaser = false;
                this.gameWorld.sendDamageData(true);
                this.gameWorld.readyToFire(true);
            };
            this.gameWorld.addBody(laserBall);
            laserBall.showDisplay(this.container);
            laserBall.fire(worldPosition.X, worldPosition.Y, xspeed, yspeed);
        }
        private fireBall(): void {
            if (GameScene.PlayField.self.paused) {
                setTimeout(() => { CannonUI.self.fireBall() }, 200);
                return;
            }
            console.log(`current fire index  ${CannonUI.self.fireIndex}`);
            if (CannonUI.self.speedUp) {
                CannonUI.self.fireDelay = 100;
            }
            let tmpDouble = CannonUI.self.doubleBalls;
            if (CannonUI.self.fireIndex >= CannonUI.self.ballcount) {
                CannonUI.self.firing = false;
                return;
            }
            CannonUI.self.balls[CannonUI.self.fireIndex].fire(CannonUI.self.firePosition.X, CannonUI.self.firePosition.Y, CannonUI.self.xspeed, CannonUI.self.yspeed);
            CannonUI.self.fireIndex++;
            console.log(`current fire index after add ${CannonUI.self.fireIndex}`);
            CannonUI.self.validBallCount--;
            if (CannonUI.self.onBallCountChanged) {
                CannonUI.self.onBallCountChanged(CannonUI.self.validBallCount, CannonUI.self.totalBallCount);
            }
            setTimeout(() => {
                 CannonUI.self.fireBall();
                // 如果所有的球打完，判断是否有双倍球要打
                if (CannonUI.self.fireIndex >= CannonUI.self.ballcount) {
                    if (tmpDouble) {
                        CannonUI.self.firing = true;
                        CannonUI.self.fireTempIndex = 0;
                        CannonUI.self.tempBallCount = CannonUI.self.tempBalls.length;
                        setTimeout(()=>{CannonUI.self.fireTempBall()}, CannonUI.self.fireDelay);
                    }
                    CannonUI.self.firing = false;
                    return;
                }
             }, 200);

        }
        private fireTempBall(): void {
            if (GameScene.PlayField.self.paused) {
                setTimeout(() => { CannonUI.self.fireTempBall() }, 200);
                return;
            }
            if (CannonUI.self.fireTempIndex >=  CannonUI.self.tempBallCount) {
                CannonUI.self.firing = false;
                CannonUI.self.doubleBalls = false;
                return;
            }
            CannonUI.self.tempBalls[CannonUI.self.fireTempIndex].fire(CannonUI.self.firePosition.X, CannonUI.self.firePosition.Y, CannonUI.self.xspeed, CannonUI.self.yspeed);
            CannonUI.self.fireTempIndex++;
            setTimeout(CannonUI.self.fireTempBall, CannonUI.self.fireDelay);
        }
        private fireBalls(): void {
            for (let i = 0; i < this.balls.length; i++) {
                if (this.balls[i].state != Model.BallState.ReadyToFire)
                    return;
            }
            this.cannonIsReady = false;
            CannonUI.currBallIndex = 0;
            let self = this;
            CannonUI.self.firing = true;
            this.fireIndex = 0;
            this.ballcount = this.balls.length;
            this.firePosition = CommonUtils.CoordinateUtils.stagePositionToWorld({ X: this.x, Y: this.y });
            this.balls = this.balls.sort((a: BallUI, b: BallUI) => {
                if (a.ballIndex > b.ballIndex)
                    return 1;
                if (a.ballIndex == b.ballIndex)
                    return 0;
                return -1;
            });
            this.fireDelay = 200;
            this.xspeed = this.power * Math.cos(this.angle);
            this.yspeed = - this.power * Math.abs(Math.sin(this.angle));
            setTimeout(() => { CannonUI.self.fireBall() }, this.fireDelay);
        }
    }
}