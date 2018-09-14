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
var Model;
(function (Model) {
    var GameModels = (function () {
        function GameModels() {
        }
        return GameModels;
    }());
    Model.GameModels = GameModels;
    __reflect(GameModels.prototype, "Model.GameModels");
    var JsonObject = (function () {
        function JsonObject() {
        }
        return JsonObject;
    }());
    Model.JsonObject = JsonObject;
    __reflect(JsonObject.prototype, "Model.JsonObject");
    var TrendModel = (function (_super) {
        __extends(TrendModel, _super);
        function TrendModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TrendModel;
    }(JsonObject));
    Model.TrendModel = TrendModel;
    __reflect(TrendModel.prototype, "Model.TrendModel");
    var HistoryModel = (function (_super) {
        __extends(HistoryModel, _super);
        function HistoryModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return HistoryModel;
    }(JsonObject));
    Model.HistoryModel = HistoryModel;
    __reflect(HistoryModel.prototype, "Model.HistoryModel");
    var OptionModel = (function (_super) {
        __extends(OptionModel, _super);
        function OptionModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return OptionModel;
    }(JsonObject));
    Model.OptionModel = OptionModel;
    __reflect(OptionModel.prototype, "Model.OptionModel");
    var BetModel = (function (_super) {
        __extends(BetModel, _super);
        function BetModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return BetModel;
    }(JsonObject));
    Model.BetModel = BetModel;
    __reflect(BetModel.prototype, "Model.BetModel");
})(Model || (Model = {}));
//# sourceMappingURL=GameModels.js.map