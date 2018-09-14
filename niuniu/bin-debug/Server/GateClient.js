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
var Server;
(function (Server) {
    var Route = (function () {
        function Route() {
        }
        Route.GetAllEntry = "GetAllEntry";
        return Route;
    }());
    __reflect(Route.prototype, "Route");
    var GateClient = (function (_super) {
        __extends(GateClient, _super);
        function GateClient() {
            return _super.call(this) || this;
        }
        GateClient.prototype.getAllEntry = function (params, cb) {
            this.request({ Route: Route.GetAllEntry, Data: null }, cb);
        };
        return GateClient;
    }(Server.BaseClient));
    Server.GateClient = GateClient;
    __reflect(GateClient.prototype, "Server.GateClient");
})(Server || (Server = {}));
//# sourceMappingURL=GateClient.js.map