var Model;
(function (Model) {
    var RoundState;
    (function (RoundState) {
        RoundState[RoundState["Unstarted"] = 0] = "Unstarted";
        RoundState[RoundState["Started"] = 1] = "Started";
        RoundState[RoundState["Frozen"] = 2] = "Frozen";
        RoundState[RoundState["Settled"] = 3] = "Settled";
        RoundState[RoundState["Open"] = 4] = "Open";
    })(RoundState = Model.RoundState || (Model.RoundState = {}));
})(Model || (Model = {}));
//# sourceMappingURL=RoundState.js.map