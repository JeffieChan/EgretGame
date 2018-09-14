class ConnectingUI extends LoadingUI{
	public constructor(defaultText:string) {
		super(defaultText);
	}
	public setConnectingText(connectingText:string){
		this.textField.text = connectingText;
        this.x = ( Main.mainObject.stage.stageWidth - this.width ) / 2;
	}
}