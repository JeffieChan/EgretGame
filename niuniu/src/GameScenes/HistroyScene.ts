module GameScenes {
    export class HistroyScene extends GameScenes.OtherScene {
        private scrollView: egret.ScrollView;
        private rowBgView: egret.DisplayObjectContainer;
        private loadingText: egret.TextField;
        private orgLoadtingTextTop: number;
        private lastScheduleId: number;
        private offsetY: number;
        private loading: boolean;
        private currentTop: number;
        private scrollTimer: egret.Timer;
        private scrollCount: number = 0;
        public constructor(setting?: any) {
            super(setting);
            this.presenter = new HistoryPresenter(this);
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.loading = false;
            this.currentTop = 33;
            this.scrollTimer = new egret.Timer(30, 0);
            this.scrollTimer.addEventListener(egret.TimerEvent.TIMER, this.autoScroll, this);
        }
        private onAddToStage(evt: egret.Event) {
            this.initStyle();
            this.presenter.getHistoryRecord();

            this.drawContent();
            this.drawRowBgView();
        }

        private drawContent() {
            this.scrollView = new egret.ScrollView();
            this.addFixedChild(this.scrollView);

            this.scrollView.y = 265*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            this.scrollView.x = 56*Settings.GameSettingUtils.globalScale;
            this.scrollView.width = 671;
            this.scrollView.horizontalScrollPolicy = "off";
            this.scrollView.verticalScrollPolicy = "on";
            this.scrollView.height = 766+33;

        }
        private drawRowBgView() {
            this.rowBgView = new egret.DisplayObjectContainer();
            this.addChild(this.rowBgView);

            this.scrollView.setContent(this.rowBgView);

            this.loadingText = new egret.TextField;
            this.loadingText.text = "正在加载数据...";
            this.loadingText.width = Settings.GameSettingUtils.gameSetting.globalWidth;
            this.loadingText.textAlign = egret.HorizontalAlign.CENTER;
            this.loadingText.textColor = 0x666666;
            // this.addFixedChild(this.loadingText);
            // this.setChildIndex(this.loadingText, -1);
            this.orgLoadtingTextTop = 298 + 766+15+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            this.loadingText.y =298 + 766+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            this.addFixedChild(this.loadingText);
            this.setChildIndex(this.loadingText,-1);
            // this.loadingText.visible = false;

            this.scrollView.addEventListener(egret.Event.COMPLETE, this.onComplete, this);

        }
        private onComplete(event: egret.Event) {
            var scrollView = event.currentTarget;
            this.offsetY = scrollView.getMaxScrollTop();
            if (scrollView.scrollTop>= scrollView.getMaxScrollTop()) {
                if (this.loading)
                    return;
                this.loading = true;
                this.onLoadMore();
            }
        }

        private onLoadMore() {
            this.loadingText.visible = true;
            egret.Tween.get(this.loadingText)
                .to({ y: this.orgLoadtingTextTop*Settings.GameSettingUtils.globalScale }, 0, egret.Ease.sineIn);
            this.presenter.getMoreHistoryRecord(this.lastScheduleId);
            this.scrollView.touchEnabled = false;
        }

        public setHistoryRowData(data: any) {
            
            this.scrollView.touchEnabled = true;
            if (data&&data.length>0){
            for (var i = 0; i < data.length; i++) {
                var historyRow = new HistoryRowScene();
                this.rowBgView.addChild(historyRow);
                historyRow.x = 0;
                historyRow.y = this.currentTop;
                var model = data[i];
                historyRow.setHistoryData(model);
                var lastModel = data[data.length - 1];
                this.lastScheduleId = lastModel.ScheduleId;
                this.currentTop += historyRow.height + 14;
            }
            this.loading = false;
            egret.Tween.get(this.loadingText)
                .wait(300)
                .to({ y: (298 + 766+50)*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2 }, 500, egret.Ease.sineIn).call(() => {
                    this.loadingText.visible = false;

                });
            if (this.presenter.historyData.length > 10) {
                this.scrollTimer.start();
                this.scrollCount = 0;
            }
            }else{
                this.loading = false;
                this.loadingText.text = "没有更多了哦~";
                egret.Tween.get(this.loadingText)
                .wait(300)
                .to({ y: (298 + 766+50 )*Settings.GameSettingUtils.globalScale+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2}, 500, egret.Ease.sineIn).call(() => {
                    this.loadingText.visible = false;

                });
            }

        }
        private autoScroll() {
            if (this.scrollCount > 30) {
                this.scrollTimer.stop();
            }
            this.scrollView.scrollTop+=2;
            this.scrollCount++;
        }

    }
}


