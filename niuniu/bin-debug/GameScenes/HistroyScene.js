var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScenes;
(function (GameScenes) {
    var HistroyScene = (function (_super) {
        __extends(HistroyScene, _super);
        function HistroyScene(setting) {
            var _this = _super.call(this, setting) || this;
            _this.scrollCount = 0;
            _this.presenter = new GameScenes.HistoryPresenter(_this);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.loading = false;
            _this.currentTop = 33;
            _this.scrollTimer = new egret.Timer(30, 0);
            _this.scrollTimer.addEventListener(egret.TimerEvent.TIMER, _this.autoScroll, _this);
            return _this;
        }
        HistroyScene.prototype.onAddToStage = function (evt) {
            this.initStyle();
            this.presenter.getHistoryRecord();
            this.drawContent();
            this.drawRowBgView();
        };
        HistroyScene.prototype.drawContent = function () {
            this.scrollView = new egret.ScrollView();
            this.addFixedChild(this.scrollView);
            this.scrollView.y = 265 * Settings.GameSettingUtils.globalScale + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            this.scrollView.x = 56 * Settings.GameSettingUtils.globalScale;
            this.scrollView.width = 671;
            this.scrollView.horizontalScrollPolicy = "off";
            this.scrollView.verticalScrollPolicy = "on";
            this.scrollView.height = 766 + 33;
        };
        HistroyScene.prototype.drawRowBgView = function () {
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
            this.orgLoadtingTextTop = 298 + 766 + 15 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            this.loadingText.y = 298 + 766 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            this.addFixedChild(this.loadingText);
            this.setChildIndex(this.loadingText, -1);
            // this.loadingText.visible = false;
            this.scrollView.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        };
        HistroyScene.prototype.onComplete = function (event) {
            var scrollView = event.currentTarget;
            this.offsetY = scrollView.getMaxScrollTop();
            if (scrollView.scrollTop >= scrollView.getMaxScrollTop()) {
                if (this.loading)
                    return;
                this.loading = true;
                this.onLoadMore();
            }
        };
        HistroyScene.prototype.onLoadMore = function () {
            this.loadingText.visible = true;
            egret.Tween.get(this.loadingText)
                .to({ y: this.orgLoadtingTextTop * Settings.GameSettingUtils.globalScale }, 0, egret.Ease.sineIn);
            this.presenter.getMoreHistoryRecord(this.lastScheduleId);
            this.scrollView.touchEnabled = false;
        };
        HistroyScene.prototype.setHistoryRowData = function (data) {
            var _this = this;
            this.scrollView.touchEnabled = true;
            if (data && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var historyRow = new GameScenes.HistoryRowScene();
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
                    .to({ y: (298 + 766 + 50) * Settings.GameSettingUtils.globalScale + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, 500, egret.Ease.sineIn).call(function () {
                    _this.loadingText.visible = false;
                });
                if (this.presenter.historyData.length > 10) {
                    this.scrollTimer.start();
                    this.scrollCount = 0;
                }
            }
            else {
                this.loading = false;
                this.loadingText.text = "没有更多了哦~";
                egret.Tween.get(this.loadingText)
                    .wait(300)
                    .to({ y: (298 + 766 + 50) * Settings.GameSettingUtils.globalScale + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2 }, 500, egret.Ease.sineIn).call(function () {
                    _this.loadingText.visible = false;
                });
            }
        };
        HistroyScene.prototype.autoScroll = function () {
            if (this.scrollCount > 30) {
                this.scrollTimer.stop();
            }
            this.scrollView.scrollTop += 2;
            this.scrollCount++;
        };
        return HistroyScene;
    }(GameScenes.OtherScene));
    GameScenes.HistroyScene = HistroyScene;
    __reflect(HistroyScene.prototype, "GameScenes.HistroyScene");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=HistroyScene.js.map