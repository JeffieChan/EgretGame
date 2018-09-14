
class LoadingUI extends egret.Sprite {

    private defaultText:string;
    public constructor(defaultText?:string) {
        super();
        this.defaultText = defaultText;
        this.createView();
    }

    protected textField:egret.TextField;

    private createView():void {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.width = 640;
        this.textField.height = 100;
        this.textField.y = 500;
        this.textField.textAlign = "center";
        this.textField.text = this.defaultText;
    }

    public setProgress(current:number, total:number):void {
        this.textField.text = `Loading...${current}/${total}`;
        this.textField.width = this.stage.stageWidth;
    }
}
