var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Settings;
(function (Settings) {
    var BrickSettings = (function () {
        function BrickSettings() {
        }
        BrickSettings.initBrickSetting = function () {
            var res = RES.getRes(BrickSettings.settingName);
            BrickSettings.brickWidth = res.brickWidth;
            BrickSettings.rows = res.rows;
            BrickSettings.cols = res.cols;
        };
        BrickSettings.settingName = "brick_setting_json";
        BrickSettings.brickWidth = 0;
        BrickSettings.rows = 0;
        BrickSettings.cols = 0;
        return BrickSettings;
    }());
    Settings.BrickSettings = BrickSettings;
    __reflect(BrickSettings.prototype, "Settings.BrickSettings");
})(Settings || (Settings = {}));
//# sourceMappingURL=BrickSetting.js.map