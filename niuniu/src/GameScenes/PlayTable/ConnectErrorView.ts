declare function NativeClose();
declare function ocClick();
module GameScenes.PlayTable {
    export class ConnectErrorView extends egret.DisplayObjectContainer {
        public bg: egret.Shape;
        private bitmap: egret.Bitmap;
         private exitBtn: egret.Bitmap;
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            this.drawBg();
            this.drawBgView();
            this.drawTitle();
            this.drawAlertText();
            this.drawBtn();
        }

        private drawBg() {
            let bg = new egret.Shape();
            bg.graphics.beginFill(0x000000, 0.5);
            bg.graphics.drawRect(0, 0, Settings.GameSettingUtils.gameSetting.globalWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.addChild(bg);

        }

        private drawBgView() {
            this.bitmap = CommonUtils.BitmapUtils.createBitmapByName("网络错误框_png");

            this.addChild(this.bitmap);
            this.bitmap.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.bitmap.width) / 2;
            this.bitmap.y = (Settings.GameSettingUtils.gameSetting.globalHeight - this.bitmap.height) / 2+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
        }
        private drawTitle() {
            let txtTitle = new egret.TextField();
            txtTitle.textColor = 0xffffff;
            txtTitle.size = 35;
            txtTitle.width = Settings.GameSettingUtils.gameSetting.globalWidth;
            txtTitle.textAlign = egret.HorizontalAlign.CENTER;
            txtTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
            txtTitle.text = "提示";
            this.addChild(txtTitle);
            txtTitle.y = 503+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;

        }
        private drawAlertText() {
              var textField = new egret.TextField;
            this.addChild(textField);
            textField.size = 24;
            textField.textColor = 0xa86d3d;
            textField.textAlign = egret.HorizontalAlign.LEFT;
            textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            textField.fontFamily = "苹方";
            textField.text = "断线重连中,请耐心等待...";

            textField.y = 619+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            textField.x = (Settings.GameSettingUtils.gameSetting.globalWidth - textField.width) / 2;
            
        }
         private drawBtn() {
            this.exitBtn = CommonUtils.BitmapUtils.createBitmapByName("按钮_png");
            this.exitBtn.touchEnabled = true;
            this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGame, this);
            this.addChild(this.exitBtn);
            this.exitBtn.y = 715+(this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight)/2;
            this.exitBtn.x = (Settings.GameSettingUtils.gameSetting.globalWidth - this.exitBtn.width) / 2;

            var textField = new egret.TextField;
            this.addChild(textField);
            textField.size = 22;
            textField.textColor = 0xffffff;
            textField.textAlign = egret.HorizontalAlign.LEFT;
            textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            textField.fontFamily = "苹方";
            textField.text = "退出游戏";

            textField.y = this.exitBtn.y + (this.exitBtn.height - textField.height) / 2;
            textField.x = this.exitBtn.x + (this.exitBtn.width - textField.width) / 2;
            
        }
        private closeGame() {
            GameSceneManger.destoryScene(this);
            NativeClose();
            ocClick();
            Server.Connector.getGameClient().close();
        }
    }


}