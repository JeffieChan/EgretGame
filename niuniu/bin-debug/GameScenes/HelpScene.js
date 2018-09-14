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
    var HelpScene = (function (_super) {
        __extends(HelpScene, _super);
        function HelpScene(setting) {
            var _this = _super.call(this, setting) || this;
            _this.presenter = new GameScenes.HelpPresenter(_this);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        HelpScene.prototype.onAddToStage = function (evt) {
            this.initStyle();
            this.drawContent();
        };
        HelpScene.prototype.drawContent = function () {
            var textField = new egret.TextField;
            textField.size = 24;
            textField.textColor = 0xa86d3d;
            textField.textAlign = egret.HorizontalAlign.LEFT;
            textField.verticalAlign = egret.VerticalAlign.MIDDLE;
            textField.fontFamily = "苹方";
            textField.text = "1.10、J、Q、K记为10，其他按牌面数字计算，无大小王。" + "\n\n\n" +
                "2.每个常规投注区和庄家将获得5张牌，若有3张牌之和为10的整数倍，则其余两张之和的个位数为该副牌的牛数。" + "\n\n\n" +
                "3.玩家可以在不同的投注区投注，庄家不可投注，投注区1/2/3按照牛牛的规则获得盈利，混合投注区1/2获胜只得到1倍盈利。" + "\n\n\n" +
                "4.混合投注区1的获胜判定为：投注区123中有两家比庄家大，则获胜；混合投注区2获胜判定为：投注区12中有一家比庄家大，若一胜一负，则返还投注的数量。" + "\n\n\n" +
                "5.若玩家的金额低于最小投注额的5倍时，则无法进行投注，投注过程中，投注金额不能超出赔付金额的5倍。" + "\n\n\n" +
                "6.庄家和投注区同牌型时，挑出最大的一张牌进行大小比较，若最大的牌也是一样大，则按照黑、红、梅、方的排列必出大小" + "\n\n\n" +
                "7.无牛~牛6为1倍，牛7为2倍，牛8为3倍，牛9为4倍，牛牛为5倍";
            textField.width = 600;
            var scrollView = new egret.ScrollView();
            this.addFixedChild(scrollView);
            scrollView.setContent(textField);
            scrollView.y = 333 + (this.stage.stageHeight - Settings.GameSettingUtils.gameSetting.globalHeight) / 2;
            scrollView.x = 87;
            scrollView.width = 603;
            scrollView.horizontalScrollPolicy = "off";
            scrollView.verticalScrollPolicy = "on";
            scrollView.height = 695;
        };
        return HelpScene;
    }(GameScenes.OtherScene));
    GameScenes.HelpScene = HelpScene;
    __reflect(HelpScene.prototype, "GameScenes.HelpScene");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=HelpScene.js.map