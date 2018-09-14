var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CommonUtils;
(function (CommonUtils) {
    var NumberUtils = (function () {
        function NumberUtils() {
        }
        NumberUtils.toStringWithPrefixNumber = function (value, preFixChar, totalLength) {
            var output = value.toString();
            if (output.length >= totalLength)
                return output;
            return ("0000000000" + output).substr(-totalLength);
        };
        NumberUtils.formatNumber = function (num) {
            if (num < 1000)
                return num.toString();
            var result = "";
            var temp = num;
            var c = 0;
            while (temp > 0) {
                if (c > 0 && c % 3 == 0)
                    result = "," + result;
                result = temp % 10 + result;
                temp = Math.floor(temp / 10);
                c++;
            }
            return result;
        };
        NumberUtils.shortNumber = function (num) {
            if (num < 10000) {
                return num.toString();
            }
            if ((Number((num / 10000).toFixed(2).toString().split(".")[1])) >= 10 && (Number((num / 10000).toFixed(2).toString().split(".")[1])) < 100 && ((num / 10000).toFixed(2).toString().split(".")[1]).substr(1, 2) == "0") {
                return (num / 10000).toFixed(1) + "w";
            }
            else if ((Number((num / 10000).toFixed(2).toString().split(".")[1])) >= 1 && (Number((num / 10000).toFixed(2).toString().split(".")[1])) < 10 || (((Number((num / 10000).toFixed(2).toString().split(".")[1])) >= 10 && (Number((num / 10000).toFixed(2).toString().split(".")[1])) < 100) && (((num / 10000).toFixed(2).toString().split(".")[1]).substr(1, 2) != "0"))) {
                return (num / 10000).toFixed(2) + "w";
            }
            else {
                return Math.floor(num / 10000) + "w";
            }
        };
        return NumberUtils;
    }());
    CommonUtils.NumberUtils = NumberUtils;
    __reflect(NumberUtils.prototype, "CommonUtils.NumberUtils");
})(CommonUtils || (CommonUtils = {}));
//# sourceMappingURL=NumberUtils.js.map