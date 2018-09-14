class MemberCountUI extends egret.DisplayObjectContainer{
    private setting: Settings.SingleIconSetting;
    private txtField:egret.TextField;
    public constructor(setting:Settings.SingleIconSetting){
        super();
        this.setting = setting;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage,this);
    }
    private onAddToStage(evt:egret.Event){
        let bg = CommonUtils.BitmapUtils.createBitmapByName(this.setting.iconName);
        this.addChild(bg);
        bg.width = bg.width;
        bg.height = bg.height;
        this.txtField = new egret.TextField;
        this.txtField.width = bg.width;
        this.txtField.textAlign = egret.HorizontalAlign.CENTER;
        this.txtField.wordWrap = true;
        this.txtField.text = "      ";
        this.txtField.textColor = 0xFFFFFF;
        this.txtField.size = 15;
        this.txtField.fontFamily = this.setting.font;
        this.txtField.y = bg.height - this.txtField.height - 8;
        this.addChild(this.txtField);
        this.x = this.setting.left;
        this.y = this.setting.top;
    }
    public setMemberCount(val:number){
        this.txtField.text = CommonUtils.NumberUtils.shortNumber(val);
    }
}