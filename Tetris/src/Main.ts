

class Main extends eui.UILayer {
    public wxLoginInfo: any;

    private loadingView: LoadingUI;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //注入自定义的素材解析器
        this.runGame().catch(e => {
            CommonUtils.LoggerUtil.log(e);
        });

        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.loadConfig("resource/default.res.json", "resource/");

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
        Settings.GameSettingUtils.globalScale = this.stage.stageWidth / 750;

        this.createGameScene();
        let jsCode = await platform.login();
        // const userInfo = await platform.getUserInfo();
        //  console.log(userInfo);
        await platform.showShareMenu();
        await platform.shareAppMessage();
        platform.getUserInfo((res) => {
            console.log("platform.getUserInfo success");
            console.log(res);
            let userInfo = res;
            if (userInfo.encryptedData) {
                this.wxLoginInfo = { code: jsCode.code, encryptedData: userInfo.encryptedData, iv: userInfo.iv, rawData: userInfo.rawData, signature: userInfo.signature };
            } else {
                this.wxLoginInfo = { code: jsCode.code };
            }
            // this.connectToGameServerAfterWxLogin();
        }, (res) => {

            this.wxLoginInfo = { code: jsCode.code };
            // this.connectToGameServerAfterWxLogin();
        }, (res) => {
            console.log("platform.getUserInfo complete");
            console.log(res);
        });
    }


    private async loadLoadingResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource");
            await RES.loadGroup("load", 1);
            Settings.GameSettingUtils.gameSetting = RES.getRes("game_setting_json");
        } catch (e) {
            console.error(e);
        }
    }

    private async loadResource() {
        try {
            await RES.loadGroup("preload", 0, this.loadingView);
            Settings.BrickSettings.initBrickSetting();
        }
        catch (e) {
            console.error(e);
        }
    }




    private loadScene: GameScene.LoadScene;
    private createGameScene() {
        this.loadingView.visible = false;
        this.loadScene = new GameScene.LoadScene();
        this.stage.addChild(this.loadScene);
    }






}
