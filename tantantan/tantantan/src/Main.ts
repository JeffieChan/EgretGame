class Main extends eui.UILayer implements Server.IServerConnectorSender {

    public static self: Main;
    private playField: GameScene.PlayField;
    private menuScene: GameScene.MenuScene;
    private currentScene: Model.SceneValue;
    public wxLoginInfo: any;
    private ratePanel: GameScene.RatePanel;
    private historyPanel: GameScene.HistoryPanel;
    private stayCurrentPage: boolean;
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        Main.self = this;
        let platform: any = window.platform;
        platform.openDataContext.clearBitmap();
        CommonUtils.LoggerUtil.log(`Stage width ${this.stage.stageWidth} stage height ${this.stage.stageHeight}`);
        this.stayCurrentPage = false;
        this.currentScene = Model.SceneValue.Main;
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            //this.playField.pauseGame();
        }

        egret.lifecycle.onResume = () => {
            if (this.currentScene == Model.SceneValue.PlayField) {
                //this.playField.pauseGame();
            }
        }
        //注入自定义的素材解析器
        this.runGame().catch(e => {
            CommonUtils.LoggerUtil.log(e);
        });
    }
    private onShareAppMessage(res) {
        CommonUtils.LoggerUtil.log(res);
    }
    private async runGame() {
        await this.loadLoadingResource();
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.loadingView.setLoadingText("正在加载资源..");
        let scale = this.stage.stageWidth / 750;
        this.loadingView.scaleX = scale;
        this.loadingView.scaleY = scale;
        this.loadingView.x = 0;
        this.loadingView.y = 0;
        await this.loadResource()
        this.loadingView.setLoadingText("资源加载完毕");
        let jsCode = await platform.login();
        platform.getUserInfo((res) => {
            console.log("platform.getUserInfo success");
            console.log(res);
            let userInfo = res;
            if (userInfo.encryptedData) {
                this.wxLoginInfo = { code: jsCode.code, encryptedData: userInfo.encryptedData, iv: userInfo.iv, rawData: userInfo.rawData, signature: userInfo.signature };
            } else {
                this.wxLoginInfo = { code: jsCode.code };
            }
            this.connectToGameServerAfterWxLogin();
        }, (res) => {

            this.wxLoginInfo = { code: jsCode.code };
            this.connectToGameServerAfterWxLogin();
        }, (res) => {
            console.log("platform.getUserInfo complete");
            console.log(res);
        });
    }

    private connectToGameServerAfterWxLogin(): void {

        CommonUtils.AccountUtils.setwxUserData(this.wxLoginInfo);
        // 开始连接GlobalServer，读取游戏服务器列表列表
        this.loadingView.setLoadingText("开始连接服务器...");
        Server.Connector.initConnector(RES.getRes("server_gate_setting_json"));
        // 心跳超时
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_HEART_BEAT_TIMEOUT, function (event) {
            CommonUtils.LoggerUtil.log("Gate client Heart beat timeout");
            CommonUtils.LoggerUtil.log(event);
        });
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_CLOSE, function (event) {
            CommonUtils.LoggerUtil.log("Gate client close");
            CommonUtils.LoggerUtil.log(event);
        });
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_IO_ERROR, function (event: egret.IOErrorEvent) {
            CommonUtils.LoggerUtil.log("Gate client io error");
            CommonUtils.LoggerUtil.log(event.target);
        });
        Server.Connector.getGateClient().on(Server.BaseClient.EVENT_CONNECTED, function (event) {
            CommonUtils.LoggerUtil.log("Gate client connected");
            CommonUtils.LoggerUtil.log(event);
        });
        Server.Connector.startConnectToGateServer(this);
    }

    // Start：游戏服务器连接事件
    public onGateServerConnectFailed(errorMessage: string): void {
        CommonUtils.LoggerUtil.log(`游戏网关服务器连接失败:${errorMessage}`);
    }
    public onBeforeGateServerConnected(): void {
        CommonUtils.LoggerUtil.log("开始连接游戏网关服务器");
    }
    public onGateServerConnected(): void {
        CommonUtils.LoggerUtil.log("游戏网关服务器连接成功");
    }
    public onGetGameServerSuccess(data): void {
        CommonUtils.LoggerUtil.log("成功获取游戏服务器:" + data);
    }
    public onGameServerConnected(): void {
        CommonUtils.LoggerUtil.log("成功连接到游戏服务器");
        this.loadingView.setLoadingText("成功连接到服务器");
        this.loadingView.setLoadingText("开始登录游戏...");
        GameSetting.ShareSetting.initShareInfoList();
        let shareInfo = GameSetting.ShareSetting.getShareInfo();
        platform.showShareMenu(shareInfo.title, shareInfo.imageUrl);
        Server.Connector.getGameClient().userLogin(this.wxLoginInfo, this);
        this.registGameClientReceiveMsgCallback();
    }
    public onGetGameServerFailed(errorMessage: string): void {
        CommonUtils.LoggerUtil.log("获取游戏服务器失败：" + errorMessage);
    }
    public onConnectToGameServerFailed(errorMessage: string): void {
        CommonUtils.LoggerUtil.log("连接到游戏服务器失败：" + errorMessage);
    }
    public onUserEnterSuccess(data: any): void {
        this.loadingView.setLoadingText("登录成功");

        CommonUtils.LoggerUtil.log("用户登录成功：" + data);
        CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
        CommonUtils.LoggerUtil.log("用户微信Session Key：" + CommonUtils.AccountUtils.getAccountData());
        if (this.stage.contains(this.loadingView)) {
            this.stage.removeChild(this.loadingView);
        }
        this.createGameScene();
    }
    public onUserEnterFailed(message: string): void {
        CommonUtils.LoggerUtil.log("用户登录失败");
    }
    public onUserReEnterSuccess(data: any): void {
        CommonUtils.LoggerUtil.log("用户重连成功");
        CommonUtils.LoggerUtil.log("用户重连登录成功：" + data);
        CommonUtils.AccountUtils.setAccountData({ HeadImageUrl: data.HeadImageUrl, NickName: data.NickName, UserToken: data.UserToken, SessionKey: data.SessionKey });
        if (CommonUtils.GameUtils.roundId <= 0) {
            if (this.stage.contains(this.loadingView)) {
                this.stage.removeChild(this.loadingView);
            }
            this.playField.hidePopMessage();
            return;
        }
        Server.Connector.getGameClient().getRoundData(CommonUtils.GameUtils.roundId, this);
        if (this.stage.contains(this.loadingView)) {
            this.stage.removeChild(this.loadingView);
        }
    }
    public onGetRoundDataSuccess(data: any): void {
        this.playField.hidePopMessage();
        this.playField.resetBricks(data);
    }
    public onGetRoundDataFailed(data: any): void {
        CommonUtils.LoggerUtil.log("读取本局全量数据失败");
    }
    public onUserReEnterFailed(message: string): void {
        CommonUtils.LoggerUtil.log("用户重连失败");
    }
    public onReloadGameDataSuccess(data: any): void {
        CommonUtils.LoggerUtil.log("重新加载游戏数据成功：" + data);
    }
    public onGetShareInfoSuccess(data: any): void {
        CommonUtils.LoggerUtil.log("分享到群的目标信息");
        CommonUtils.LoggerUtil.log(data);
    }
    public onGetShareInfoFailed(errmsg: string): void {
        CommonUtils.LoggerUtil.log(errmsg);
    }
    // End：游戏服务器连接事件

    private async loadLoadingResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource");
            await RES.loadGroup("loading", 1);
        } catch (e) {
            console.error(e);
        }
    }

    private async loadResource() {
        try {
            await RES.loadGroup("preload", 0, this.loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        if (this.stayCurrentPage)
            return;
        CommonUtils.StageUtils.loadAndStoreStageInfo(this.stage);
        this.createMenuScene();
        const platform: any = window.platform;
        platform.openDataContext.postMessage({
            command: 'loadRes'
        });
        this.createPlayFieldScene();
        this.showMenuScene();
    }
    private showMenuScene() {
        this.menuScene.visible = true;
        this.currentScene = Model.SceneValue.Main;
    }
    private hideMenuScene() {
        this.menuScene.visible = false;
    }
    private showPlayFieldScene() {
        this.playField.visible = true;
        this.currentScene = Model.SceneValue.PlayField;
    }
    private hidePlayFieldScene() {
        this.playField.visible = false;
    }
    private createMenuScene() {
        let self = this;
        this.menuScene = new GameScene.MenuScene();
        this.addChild(this.menuScene);
        this.menuScene.gameStartHandle = () => {
            if (self.menuScene.panelOpened)
                return;
            if (self.currentScene != Model.SceneValue.Main)
                return;
            this.showPlayFieldScene();
            this.playField.startNewGame();
            this.hideMenuScene();
            self.menuScene.panelOpened = true;
        }
        this.menuScene.openRateHandle = () => {
            if (self.menuScene.panelOpened)
                return;
            this.ratePanel.visible = true;
            this.ratePanel.refreshRate();
            self.menuScene.panelOpened = true;
        };
        this.menuScene.openHistoryHandle = () => {
            if (self.menuScene.panelOpened)
                return;
            this.historyPanel.visible = true;
            this.historyPanel.loadHistory(30);
            self.menuScene.panelOpened = true;
        }
        this.menuScene.openInviteHandle = () => {
            if (self.menuScene.panelOpened)
                return;
            platform.shareAppMessage(GameSetting.ShareSetting.getShareInfo().title, GameSetting.ShareSetting.getShareInfo().imageUrl
                , (res) => {
                    CommonUtils.LoggerUtil.log("分享成功 : " + res);
                    CommonUtils.LoggerUtil.log(res);
                    if (!res.shareTickets) {
                        CommonUtils.LoggerUtil.log("没有分享到群");
                        return;
                    }
                    platform.getShareInfo(
                        res.shareTickets[0],
                        (data) => {
                            CommonUtils.LoggerUtil.log("分享目标信息");
                            Server.Connector.getGameClient().getShareInfo(data, "", self);
                        },
                        (failedData) => { }
                    );

                }, (res) => {
                    CommonUtils.LoggerUtil.log("分享失败 : " + res);
                }, (res) => {
                    CommonUtils.LoggerUtil.log("分享结束 : " + res);
                });
        }
        this.menuScene.visible = false;
        this.ratePanel = new GameScene.RatePanel();
        this.ratePanel.closeHandle = () => {
            CommonUtils.LoggerUtil.log("关闭排行榜响应事件");
            self.ratePanel.visible = false;
            self.menuScene.panelOpened = false;
        };
        this.addChild(this.ratePanel);
        this.ratePanel.visible = false;

        this.historyPanel = new GameScene.HistoryPanel();
        this.historyPanel.closeHandle = () => {
            CommonUtils.LoggerUtil.log("关闭排行榜响应事件");
            self.historyPanel.visible = false;
            self.menuScene.panelOpened = false;
        };
        this.addChild(this.historyPanel);
        this.historyPanel.visible = false;
        this.stayCurrentPage = true;
    }
    private createPlayFieldScene() {
        this.playField = new GameScene.PlayField();
        this.addChild(this.playField);
        this.playField.visible = false;
        this.playField.backToMenuHandle = () => {
            this.hidePlayFieldScene();
            this.showMenuScene();
            this.menuScene.panelOpened = false;
        }
    }
    private registGameClientReceiveMsgCallback() {
        let self = this;
        // 心跳超时
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_HEART_BEAT_TIMEOUT, function (event) {
            self.playField.popMessage("断线重连中，请耐心等待...", false);
            CommonUtils.LoggerUtil.log(new Date().toString() + " : 客户端连接心跳检测失败");
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(self);
        });
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_CLOSE, function (event) {
            self.playField.popMessage("断线重连中，请耐心等待...", false);
            CommonUtils.LoggerUtil.log(new Date().toString() + " : 客户端连接关闭");
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(self);
        });
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_IO_ERROR, function (event) {
            self.playField.popMessage("断线重连中，请耐心等待...", false);
            CommonUtils.LoggerUtil.log(new Date().toString() + " : 客户端连接错误");
            Server.Connector.getGameClient().State = Server.ClientState.Disconnected;
            Server.Connector.startReconnectTimer(self);
        });
        Server.Connector.getGameClient().on(Server.BaseClient.EVENT_CONNECTED, function (event) {
        });
    }
}
