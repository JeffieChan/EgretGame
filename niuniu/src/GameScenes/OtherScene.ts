module GameScenes {
    export class OtherScene extends GameScenes.OtherBaseScene {
        private title: SceneTitle;
        protected extraData: any;
        protected presenter: any;
        public constructor(setting?: any) {
            super(setting);
        }

        public getPresenter() {
            return this.presenter;
        }
        public setUserToken(userToken: string) {
            this.presenter.setUserToken(userToken);
        }

        protected initStyle() {
            super.initStyle();
            this.drawTitle(this.setting.title);
        }
        protected drawTitle(titleSetting: Settings.OtherTitleSetting) {
            this.title = new SceneTitle(titleSetting, this.setting.closeIcon);
            this.addFixedChild(this.title);
        }
    }
}
class SceneTitle extends egret.DisplayObjectContainer {
    private setting: Settings.OtherTitleSetting;
    private extraData: any;
    public constructor(setting: Settings.OtherTitleSetting, extraData?: any) {
        super();
        this.setting = setting;
        this.extraData = extraData;
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage() {
        this.cacheAsBitmap = true;
        let txtTitle = new egret.TextField();
        txtTitle.textColor = this.setting.textColor;
        txtTitle.size = this.setting.textSize;
        txtTitle.width = Settings.GameSettingUtils.gameSetting.globalWidth;
        txtTitle.height = this.setting.titleHeight;
        txtTitle.textAlign = egret.HorizontalAlign.CENTER;
        txtTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        txtTitle.text = this.getTitleText();
        this.addChild(txtTitle);
        txtTitle.y = this.setting.top+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;

        let backBtn = CommonUtils.BitmapUtils.createBitmapByName("关闭按钮_png");
        this.addChild(backBtn);

        backBtn.x = 633;
        backBtn.y = 130+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        backBtn.touchEnabled = true;
        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            //TODO: 返回上页
            GameScenes.GameSceneManger.destoryScene(this.parent);
        }, this);

    }

    private getTitleText(): string {
        let title = this.setting.titleText;
        if (!this.extraData)
            return title;
        for (var p in this.extraData) {
            let pname = p.toString();
            let pStr = "#" + pname + "#";
            title = title.replace(pStr, this.extraData[p]);
        }
        return title;
    }

}