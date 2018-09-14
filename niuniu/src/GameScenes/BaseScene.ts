module GameScenes {
    export class BaseScene extends GameScenes.RootScene {
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
        protected drawTitle(titleSetting: Settings.TitleSetting) {
            this.title = new SceneTitle(titleSetting, this.extraData);
            this.addFixedChild(this.title);
        }

    }

    class SceneTitle extends egret.DisplayObjectContainer {
        private setting: Settings.TitleSetting;
        private extraData: any;
        public constructor(setting: Settings.TitleSetting, extraData?: any) {
            super();
            this.setting = setting;
            this.extraData = extraData;
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage() {

            let bg = new egret.Shape();
            bg.graphics.beginFill(this.setting.titleBgColor, this.setting.titleBgAlpha);
            bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.setting.titleHeight);
            this.addChild(bg);

            let txtTitle = new egret.TextField();
            txtTitle.textColor = this.setting.textColor;
            txtTitle.size = this.setting.textSize;
            txtTitle.width = Settings.GameSettingUtils.gameSetting.globalWidth;
            txtTitle.height = this.setting.titleHeight;
            txtTitle.textAlign = egret.HorizontalAlign.CENTER;
            txtTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
            txtTitle.text = this.getTitleText();
            this.addChild(txtTitle);

            let backBtn = CommonUtils.BitmapUtils.createBitmapByName("");
            this.addChild(backBtn);
            backBtn.x = 30;
            backBtn.y = (this.height - backBtn.height) / 2;
            backBtn.touchEnabled = true;
            backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                //TODO: 返回上页
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
}