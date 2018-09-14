var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameScenes;
(function (GameScenes) {
    var BasePresenter = (function () {
        function BasePresenter() {
        }
        BasePresenter.prototype.setUserToken = function (userToken) {
            this.userToken = userToken;
        };
        BasePresenter.prototype.getUserToken = function () {
            return this.userToken;
        };
        return BasePresenter;
    }());
    GameScenes.BasePresenter = BasePresenter;
    __reflect(BasePresenter.prototype, "GameScenes.BasePresenter");
})(GameScenes || (GameScenes = {}));
//# sourceMappingURL=BasePresenter.js.map