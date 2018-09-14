module GameScenes {
    export class TrendScene extends GameScenes.OtherScene {
        public constructor(setting?: any) {
            super(setting);
            this.presenter = new TrendPresenter(this);
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        private onAddToStage(evt: egret.Event) {
            this.initStyle();
            this.presenter.getTrend();
            this.drawHeader();
            this.drawContent();
        }
        private drawHeader() {
            var headerTitle = new egret.TextField();
            this.addFixedChild(headerTitle);
            headerTitle.size = this.setting.header.textSize;
            headerTitle.textColor = this.setting.header.textColor;
            headerTitle.text = this.setting.header.title;
            headerTitle.x = this.setting.header.left*Settings.GameSettingUtils.globalScale;
            headerTitle.y = this.setting.header.top*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            headerTitle.fontFamily = this.setting.header.font;

            var winTF = new egret.TextField();
            this.addFixedChild(winTF);
            winTF.size = this.setting.header.textSize;
            winTF.textColor = this.setting.header.textColor;
            winTF.text = this.setting.header.text1;
            winTF.x = this.setting.header.text1X*Settings.GameSettingUtils.globalScale;
            winTF.y = (this.setting.header.top + 2)*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            winTF.fontFamily = this.setting.header.font;

            var winLogo = CommonUtils.BitmapUtils.createBitmapByName(this.setting.header.winIcon);
            this.addFixedChild(winLogo);
            winLogo.x = this.setting.header.winIconX*Settings.GameSettingUtils.globalScale;
            winLogo.y = this.setting.header.iconTop*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;

            var tieTF = new egret.TextField();
            this.addFixedChild(tieTF);
            tieTF.size = this.setting.header.textSize;
            tieTF.textColor = this.setting.header.textColor;
            tieTF.text = this.setting.header.text2;
            tieTF.x = winTF.x + (winTF.width + this.setting.header.padding1 + this.setting.header.padding2 + winLogo.width)*Settings.GameSettingUtils.globalScale;
            tieTF.y = (this.setting.header.top + 2)*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            tieTF.fontFamily = this.setting.header.font;


            var tieLogo = CommonUtils.BitmapUtils.createBitmapByName(this.setting.header.tieIcon);
            this.addFixedChild(tieLogo);
            tieLogo.x = tieTF.x + (tieTF.width + this.setting.header.padding1)*Settings.GameSettingUtils.globalScale;
            tieLogo.y = this.setting.header.iconTop*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;

            var loseTF = new egret.TextField();
            this.addFixedChild(loseTF);
            loseTF.size = this.setting.header.textSize;
            loseTF.textColor = this.setting.header.textColor;
            loseTF.text = this.setting.header.text3;
            loseTF.x = tieTF.x + (tieTF.width + this.setting.header.padding1 + this.setting.header.padding2 + tieLogo.width)*Settings.GameSettingUtils.globalScale;
            loseTF.y = (this.setting.header.top + 2)*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            loseTF.fontFamily = this.setting.header.font;


            var loseLogo = CommonUtils.BitmapUtils.createBitmapByName(this.setting.header.loseIcon);
            this.addFixedChild(loseLogo);
            loseLogo.x = loseTF.x + (loseTF.width + this.setting.header.padding1)*Settings.GameSettingUtils.globalScale;
            loseLogo.y = this.setting.header.iconTop*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;

        }
        public setTrendRowData(data:any) {
            for (var i = 0; i < 5; i++) {
                var trendRow = new TrendRowScene();
                this.addFixedChild(trendRow);
                trendRow.x = 62*Settings.GameSettingUtils.globalScale;
                trendRow.y = (332 + (trendRow.height + 4)*i)*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
                var rowData = data[i]
                trendRow.setTrendRow(rowData);

            }

        }
        private drawContent() {
            var scrollView = new egret.ScrollView();
            this.addFixedChild(scrollView);
            // scrollView.setContent();
            scrollView.y = 333*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            scrollView.x = 87*Settings.GameSettingUtils.globalScale;
            scrollView.width = 603;
            scrollView.horizontalScrollPolicy = "off";
            scrollView.verticalScrollPolicy = "on";
            scrollView.height = 695;
        }
    }
}