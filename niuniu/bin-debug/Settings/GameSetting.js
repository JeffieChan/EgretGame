var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Settings;
(function (Settings) {
    var GameSettingUtils = (function () {
        function GameSettingUtils() {
        }
        return GameSettingUtils;
    }());
    Settings.GameSettingUtils = GameSettingUtils;
    __reflect(GameSettingUtils.prototype, "Settings.GameSettingUtils");
    var GameSetting = (function () {
        function GameSetting() {
        }
        return GameSetting;
    }());
    Settings.GameSetting = GameSetting;
    __reflect(GameSetting.prototype, "Settings.GameSetting");
})(Settings || (Settings = {}));
//# sourceMappingURL=GameSetting.js.map