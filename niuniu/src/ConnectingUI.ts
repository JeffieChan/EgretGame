class ConnectingUI extends egret.DisplayObjectContainer {

    private textField: egret.TextField;
    private bg: egret.Bitmap;
    private paddingToBottom: number = 594;
    private timer: egret.Timer;

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.timer = new egret.Timer(3000, 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.removeAlert, this);
    }
    
    private onAddToStage(evt: egret.Event) {
        this.bg = CommonUtils.BitmapUtils.createBitmapByName("系统弹出框_png");
        this.textField = new egret.TextField;
        this.textField.size = 30;
        this.textField.bold = true;
        this.addChild(this.bg);
        this.addChild(this.textField);
        this.bg.x = (this.stage.stageWidth - this.bg.width) / 2;
        this.visible = false;
    }

    public setConnectText(msg?: any,type?:number) {
        this.visible = true;
        
        if (typeof msg === 'number') {
            if (type == 1){
            this.textField.textFlow = <Array<egret.ITextElement>>[{ text: "余额不足，至少需", style: { "textColor": 0xffffff } }
                , { text: CommonUtils.NumberUtils.formatNumber(msg), style: { "textColor": 0xffd801 } }
                , { text: "猜豆哦~", style: { "textColor": 0xffffff } }];
            }
            if (type == 2){
                 this.textField.textFlow = <Array<egret.ITextElement>>[{ text: "本轮最多还可投", style: { "textColor": 0xffffff } }
                , { text: CommonUtils.NumberUtils.formatNumber(msg), style: { "textColor": 0xffd801 } }
                , { text: "猜豆哦~", style: { "textColor": 0xffffff } }];
            }
           
            this.bg.width = this.textField.width + 50;
            this.bg.x = (this.stage.stageWidth - this.bg.width) / 2;

        } else {
            this.textField.text = msg;
        }

        this.textField.x = (this.stage.stageWidth - this.textField.width) / 2;
        this.textField.y = this.bg.y + (this.bg.height - this.textField.height) / 2

        this.timer.reset();
        this.timer.start();
    }

    private removeAlert() {
        this.timer.stop();
        this.visible = false;
    }
}