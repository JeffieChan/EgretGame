/**
 * 游戏主启动类
 */
class Main extends eui.UILayer {
    public static mainObject:Main;
    private loadingView: LoadingUI;
    private serverConnectView:ConnectingUI;
    private failedInitRoomView:ConnectingUI;
    private playScene:GameScenes.BaseScene;
    public constructor(){
        super();
    }
    /**
     * 加载进度界面
     * loading process interface
     */
    protected createChildren(): void {
        super.createChildren();
        Main.mainObject = this;
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        this.serverConnectView = new ConnectingUI("");
        this.stage.addChild(this.serverConnectView);
        this.loadingView.width = (this.stage.width / Settings.InitSetting.DEFAULT_SATGE_WIDTH) * this.loadingView.width;
        this.loadingView.x = (this.stage.width - this.loadingView.width) / 2;
        this.loadingView.y = (this.stage.height - this.loadingView.height) / 2;
        GameScenes.GameSceneManager.setRootStage(this);

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigLoadComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    // Start: 加载本地静态资源事件
    private onConfigLoadComplete(evt:RES.ResourceEvent){
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigLoadComplete, this);
        // 注册加载事件
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        // 加载成功后，开始读取相关配置信息
        if (event.groupName == "preload") {
            Main.mainObject.stage.removeChild(Main.mainObject.loadingView);
            Settings.GameSettingUtils.apiSetting = RES.getRes("api_setting_json");
            Settings.GameSettingUtils.trendSetting = RES.getRes("trend_setting_json");
            Settings.GameSettingUtils.historySetting = RES.getRes("history_setting_json");
            Settings.GameSettingUtils.gameSetting = RES.getRes("play_table_setting_json");
            Settings.GameSettingUtils.helpSetting = RES.getRes("help_setting_json");
            Settings.GameSettingUtils.errorMessageSetting = RES.getRes("errormessage_setting_json");
            Settings.GameSettingUtils.myBetSetting = RES.getRes("mybet_setting_json");
            Settings.GameSettingUtils.myBetDetailSetting = RES.getRes("mybet_detail_setting_json");
            Settings.GameSettingUtils.accountListSetting = RES.getRes("account_list_setting_json");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, Main.mainObject.onResourceLoadComplete, Main.mainObject);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, Main.mainObject.onResourceLoadError, Main.mainObject);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, Main.mainObject.onResourceProgress, Main.mainObject);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, Main.mainObject.onItemLoadError, Main.mainObject);
            
            // 开始连接GlobalServer，读取游戏服务器列表列表
            Server.Connector.initConnector(RES.getRes("server_gate_setting_json"));
            Server.Connector.startConnectToGateServer(Main.mainObject);
        }
    }
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO 处理资源组加载出错
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        Main.mainObject.onResourceLoadComplete(event);
    }
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            Main.mainObject.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private onItemLoadError(event: RES.ResourceEvent): void {
        // TODO 处理资源组加载出错
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    // End:加载本地静态资源事件
    
    // Start:Gate Server相关前端事件
    private onGateServerConnectFailed(msg:string){
        Main.mainObject.serverConnectView.setConnectingText(msg);
    }
    private onBeforeGateServerConnected(){
        Main.mainObject.serverConnectView.setConnectingText("开始连接到全局服务器获取游戏服务器列表");
    }
    private onGateServerConnected(){
        Main.mainObject.serverConnectView.setConnectingText("成功连接到全局服务器");
    }
    private onGetGameServerSuccess(){
        Main.mainObject.serverConnectView.setConnectingText("成功读取到服务器列表，开始连接游戏服务器");
    }
    private onGetGameServerFailed(errormsg:string){
        Main.mainObject.serverConnectView.setConnectingText(errormsg);
    }
    // End:Gate Server相关前端事件
    
    // Start:Game Server相关前端事件
    private onConnectToGameServerFailed(errormsg:string){
        Main.mainObject.serverConnectView.setConnectingText(errormsg);
    }
    private onGameServerConnected(){
        Main.mainObject.serverConnectView.setConnectingText("成功连接到游戏服务器");
        this.stage.removeChild(this.serverConnectView);
        this.playScene = GameScenes.GameSceneManager.pushScene(GameScenes.PlayTableScene,Settings.GameSettingUtils.gameSetting,Main.mainObject.stage.stageWidth);
    }
    // End:Game Server相关前端事件
}
