const assetsUrl = {
  icon: "openDataContext/assets/icon.png",
  box: "openDataContext/assets/box.png",
  boxself: "openDataContext/assets/boxself.png",
  panel: "openDataContext/assets/panel.png",
  button: "openDataContext/assets/button.png",
  title: "openDataContext/assets/rankingtitle.png",
  num1: "openDataContext/assets/1.png",
  num2: "openDataContext/assets/2.png",
  num3: "openDataContext/assets/3.png",
  nextplayerbg: "openDataContext/assets/nextplayer_bg.png"
};

let selfData;
var asyncGetSelfData = function (callback) {
  if (selfData) {
    if (callback)
      callback(selfData);
    return;
  } else {
    wx.getUserInfo({
      openIdList: ['selfOpenId'],
      success: (res) => {
        selfData = {
          name: res.data[0].nickName,
          url: res.data[0].avatarUrl
        };
        if (callback) {
          callback(selfData);
        }
      }
    });
  }
}

var logger = {
  showLog: false,
  log: function (data) {
    if (this.showLog) {
      console.log(data);
    }
  }
}
var selfMark = 'rgba(255,255,255,1)';
var friendMark = 'rgba(200,200,200,1)';
var nextMark = 'rgba(100,100,100,1)';
let doFR = false;
let doSelf = false;
let doNP = false;
let friendCount = 15;
let assets = {};

const context = sharedCanvas.getContext("2d");
context.globalCompositeOperation = "source-over";

var getWeekCount = function () {

  let now = new Date();
  var d1 = new Date();
  var d2 = new Date();
  d2.setMonth(0);
  d2.setDate(1);
  var rq = d1 - d2;
  var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
  var s2 = Math.ceil((s1 + 1) / 7);
  return s2;
}
let friendsRateLoaded = false;
var loadFrindsRateData = function (callback, useCache, failedCallback) {
  try {
    if (useCache && totalGroup && totalGroup.length > 0) {
      console.log("使用缓存显示用户排行")
      asyncGetSelfData((data) => {
        try {
          totalGroup.forEach((val, index) => {
            logger.log(val);
            val.key = index + 1;
            if (val.name == data.name && val.url == data.url) {
              totalGroup[index].isSelf = true;
            }
          });
          callback();
          friendsRateLoaded = true;
        } catch (err) {
          failedCallback();
        }
      });
      return;
    }
    wx.getFriendCloudStorage({
      keyList: ['maxScore', 'week', 'year'],
      success: (res) => {
        try {
          logger.log(res);
          if (!res) {
            return;
          }
          var currYear = new Date().getFullYear();
          var currWeek = getWeekCount();
          totalGroup = [];
          res.data.forEach((val, index) => {
            if (val == null) {
              return;
            }
            var week = 0;
            var year = 0;
            var maxScore = 0;
            val.KVDataList.forEach((item) => {
              if (item.key == "week") {
                week = parseInt(item.value);
                return;
              }
              if (item.key == "maxScore") {
                maxScore = parseInt(item.value);
                return;
              }
              if (item.key == "year") {
                year = parseInt(item.value);
                return;
              }
            });
            if (year != currYear || week != currWeek) {
              return;
            }
            totalGroup[index] = {
              key: index,
              name: val.nickname,
              url: val.avatarUrl,
              scores: maxScore,
              isSelf: false
            };
          }); 
          totalGroup.sort(compare);
          asyncGetSelfData((data) => {
            totalGroup.forEach((val, index) => {
              logger.log(val);
              val.key = index + 1;
              if (val.name == data.name && val.url == data.url) {
                totalGroup[index].isSelf = true;
              }
            });
            callback();
            friendsRateLoaded = true;
          });

        } catch (err) {
          failedCallback();
        }
      }
    });
  } catch (err) {
    failedCallback();
  }
}
var compare = function (obj1, obj2) {
  var val1 = obj1.scores;
  var val2 = obj2.scores;
  if (val1 > val2) {
    return -1;
  } else if (val1 < val2) {
    return 1;
  } else {
    return 0;
  }
}

let totalGroup;
let selfRate;
let nextPlayer;
let lastNextPlayer;

var drawNextPlayer = function (score) {

  try {
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    context.fillStyle = nextMark;
    context.fillRect(1, 1, 1, 1);
    asyncGetSelfData(() => {
      logger.log("个人信息读取成功");
      loadFrindsRateData(function () {
        try {
          nextPlayer = null;
          if (totalGroup == null || totalGroup.length == 0) {
            doNP = false;
            return;
          }
          for (var i = totalGroup.length - 1; i >= 0; i--) {
            let player = totalGroup[i];
            if (!player) {
              continue;
            }
            if (player == null) {
              continue;
            }
            //if(player.isSelf){continue;}
            if (player.scores <= score) {
              continue;
            }
            nextPlayer = player;
            break;
          }
          if (nextPlayer == null) {
            doNP = false;
            return;
          }
          logger.log("下一个要超越的玩家是:")
          logger.log(nextPlayer);
          lastNextPlayer = nextPlayer;

          //设置字体
          context.font = 22 + "px 苹方";
          context.fillStyle = "#FFFFFF";

          //绘制名称
          context.fillText("即将超越", 20, 30, textMaxSize);
          let panelW = 118;
          let panelH = 200;
          context_drawImage(assets.nextplayerbg, 0, 0, panelW, panelH);
          avatarSize = 80;
          let headImage = wx.createImage();
          let headX = (panelW - avatarSize) / 2;
          let headY = 50;
          headImage.onload = function () {
            context_drawImage(headImage, headX, headY, avatarSize, avatarSize);
          };
          headImage.src = nextPlayer.url;
          context.font = 22 + "px 苹方";
          context.fillText(nextPlayer.name, 20, 160, textMaxSize);
          context.fillStyle = "#F1CE83";
          context.fillText(nextPlayer.scores, 20, 190, textMaxSize);
          doNP = false;
        } finally {
          doNP = false;
        }
      },true,()=>{doNP = false;});
    });
  } catch (err) {
    doNP = false;
  }
}
/**
 * 创建排行榜
 */
function drawRankPanel() {
  logger.log("开始绘制排名");
  if (totalGroup == null || totalGroup.length == 0) {
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    return;
  }
  if (totalGroup.length > 0) {
    //创建头像Bar
    drawRankByGroup(totalGroup);
  }
}
/**
 * 根据屏幕大小初始化所有绘制数据
 */
function init() {
  try {
    //排行榜绘制数据初始化,可以在此处进行修改
    let scale = stageWidth / 750;
    barWidth = 634 * scale;
    barHeight = 132 * scale;
    preOffsetY = 134 * scale;
    fontSize = Math.floor(stageWidth / 25);
    startX = 0;
    startY = 0;
    avatarSize = 94 * scale;
    intervalX = barWidth / 20;
    textOffsetY = (barHeight + fontSize) / 2;
    textMaxSize = barWidth / 3;
    indexWidth = context.measureText("99").width;
    //按钮绘制数据初始化
    let data = wx.getSystemInfoSync();
    asyncGetSelfData(() => {
      logger.log("好友排行：读取个人信息成功");
      loadFrindsRateData(function () {
        try {
          drawRankPanel();
          endTime = new Date();
          logger.log("绘制好友列表完成 ： " + (endTime - startTime));
        } finally {
          doFR = false;
        }
      },false,()=>{
        doFR = false;
      });
    });
  } catch (err) {
    doFR = false;
  }
}

function drawSelfRate() {
  asyncGetSelfData((sd) => {

    try {
      context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
      context.fillStyle = selfMark;
      context.fillRect(1, 1, 1, 1);
      if (!selfRate) {
        logger.log("self rate is null");
        let scale = stageWidth / 750;
        drawRoundRect("#6a71c3", startX, startY, 640 * scale, 178 * scale, 12 * scale);
        //context_drawImage(assets.boxself, startX, startY, 640 * scale, 188 * scale);
        let x = 40 * scale;
        //绘制序号
        context_drawImage("", x, startY + 72 * scale, 42 * scale, 42 * scale);

        //绘制头像
        let headImage = wx.createImage();
        headImage.onload = function () {
          context_drawImage(headImage, 120 * scale, 46 * scale, 92 * scale, 92 * scale);
        };
        headImage.src = selfData.url;

        //设置字体
        context.font = (35 * scale) + "px 苹方";
        context.fillStyle = "#FFFFFF";

        //绘制名称
        context.fillText(selfData.name + "", 260 * scale, 100 * scale, textMaxSize);
        //绘制分数
        context.fillText("0", 480 * scale, 100 * scale, textMaxSize);
        doSelf = false;
        return;
      }
      logger.log("self rate");
      logger.log(selfRate);
      let scale = stageWidth / 750;
      drawRoundRect("#6a71c3", startX, startY, 640 * scale, 178 * scale, 12 * scale);
      //context_drawImage(assets.boxself, startX, startY, 640 * scale, 188 * scale);
      let x = 40 * scale;
      //绘制序号
      if (selfRate.key == 1) {
        context_drawImage(assets.num1, x, startY + 72 * scale, 42 * scale, 42 * scale);
      } else if (selfRate.key == 2) {
        context_drawImage(assets.num2, x, startY + 72 * scale, 42 * scale, 42 * scale);
      } else if (selfRate.key == 3) {
        context_drawImage(assets.num3, x, startY + 72 * scale, 42 * scale, 42 * scale);
      } else {
        //设置字体
        context.font = (35 * scale) + "px Arial";
        context.fillStyle = "#ffc749";
        context.fillText(selfRate.key + "", x, startY + 100 * scale, textMaxSize);
      }

      //绘制头像
      let headImage = wx.createImage();
      headImage.onload = function () {
        context_drawImage(headImage, 120 * scale, 46 * scale, 92 * scale, 92 * scale);
      };
      headImage.src = selfRate.url;

      //设置字体
      context.font = (35 * scale) + "px 苹方";
      context.fillStyle = "#FFFFFF";

      //绘制名称
      context.fillText(selfRate.name + "", 260 * scale, 100 * scale, textMaxSize);
      //绘制分数
      context.fillText(selfRate.scores + "", 480 * scale, 100 * scale, textMaxSize);
      doSelf = false;
    } finally {
      doSelf = false;
    }
  });
}
/**
 * 根据当前绘制组绘制排行榜
 */
function drawRankByGroup(currentGroup) {
  context.fillStyle = friendMark;
  context.fillRect(1, 1, 1, 1);
  for (let i = 0; i < currentGroup.length || i < friendCount; i++) {
    drawByData(currentGroup[i], i);
  }
}

function drawByData(data, i) {
  let x = startX;
  let itemY = (startY + i * preOffsetY);
  let scale = stageWidth / 750;
  if (!data) {
    drawRoundRect("#454565", x, itemY, barWidth, barHeight, 10 * scale);
    return;
  }
  //绘制底框
  if (data.isSelf) {
    drawRoundRect("#454565", x, itemY, barWidth, barHeight, 10 * scale);
    selfRate = data;
  } else {
    drawRoundRect("#454565", x, itemY, barWidth, barHeight, 10 * scale);
  }
  x = (startX + 26) * scale;

  //设置字体
  context.font = (35 * scale) + "px Arial";
  context.fillStyle = "#ffc749";
  //绘制序号
  if (data.key == 1) {
    context_drawImage(assets.num1, x, itemY + 52 * scale, 42 * scale, 42 * scale);
  } else if (data.key == 2) {
    context_drawImage(assets.num2, x, itemY + 52 * scale, 42 * scale, 42 * scale);
  } else if (data.key == 3) {
    context_drawImage(assets.num3, x, itemY + 52 * scale, 42 * scale, 42 * scale);
  } else {
    context.fillText(data.key + "", x + 13 * scale, itemY + 80 * scale);
  }
  x = (startX + 106) * scale;

  //绘制头像
  let headImage = wx.createImage();
  let headX = x;
  let headY = startY + i * preOffsetY + (barHeight - avatarSize) / 2;
  headImage.onload = function () {
    context_drawImage(headImage, headX, headY, avatarSize, avatarSize);
  };
  headImage.src = data.url;
  x = (startX + 220) * scale;

  //设置字体
  context.font = (35 * scale) + "px 苹方";
  context.fillStyle = "#FFFFFF";

  //绘制名称
  context.fillText(data.name + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
  x = (startX + 500) * scale;
  //绘制分数
  context.fillText(data.scores + "", x, startY + i * preOffsetY + textOffsetY, textMaxSize);
}


/////////////////////////////////////////////////////////////////// 相关缓存数据

///////////////////////////////////数据相关/////////////////////////////////////

/**
 * 当前页数,默认0为第一页
 */
let page = 0;
///////////////////////////////////绘制相关///////////////////////////////
let stageWidth;
let rankWidth;
let barWidth;
let barHeight;
let offsetX_barToRank
let startX;
let startY;
let preOffsetY;
let fontSize;
let textOffsetY;
let avatarSize;
let textMaxSize;
let intervalX;
let indexWidth;

//////////////////////////////////////////////////////////

/**
 * 是否加载过资源的标记量
 */
let hasLoadRes;

/**
 * 资源加载
 */
function preloadAssets() {
  let preloaded = 0;
  let count = 0;
  for (let asset in assetsUrl) {
    count++;
    const img = wx.createImage();
    img.onload = () => {
      preloaded++;
      if (preloaded == count) {
        hasLoadRes = true;
      }

    }
    img.src = assetsUrl[asset];
    assets[asset] = img;
  }
}


/**
 * 绘制屏幕
 * 这个函数会在加载完所有资源之后被调用
 */
function createScene() {
  try {
    if (sharedCanvas.width && sharedCanvas.height) {
      stageWidth = sharedCanvas.width;
      init();
      return true;
    } else {
      doFR = false;
      return false;
    }
  } catch (err) {
    foFR = false;
    return false;
  }
}


//记录requestAnimationFrame的ID
let requestAnimationFrameID;
let hasCreateScene;

let isDoing = function () {
  logger.log(`doFR = ${doFR} , doSelf = ${doSelf} , doNP = ${doNP}`);
  return doFR || doSelf || doNP;
}

function doClean() {

  if (isDoing()) {
    logger.log("当前正有绘制任务在进行中");
    return;
  }
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);

}
let startTime;
let endTime;

function doFriendsRate() {
  if (isDoing()) {
    logger.log("当前正有绘制任务在进行中");
    setTimeout(doFriendsRate(), 5000);
    return;
  }
  if (!context) {
    logger.log("context 没有创建成功，一秒钟后重试");
    setTimeout(doFriendsRate(), 5000);
    return;
  }
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  doFR = true;
  try {
    startTime = new Date();
    createScene();
  } catch (err) {
    logger.log("绘制好友的分数和排名异常");
    logger.log(err);
    doFR = false;
  }
}

function doSelfData() {
  if (isDoing()) {
    logger.log("当前正有绘制任务在进行中");
    setTimeout(doSelfData(), 5000);
    return;
  }
  if (!context) {
    logger.log("context 没有创建成功，一秒钟后重试");
    setTimeout(doSelfData(), 5000);
    return;
  }
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  doSelf = true;
  try {
    drawSelfRate();
  } catch (err) {
    logger.log("绘制自己的分数和排名异常");
    logger.log(err);
  }
}

function doNextPlayer(score) {
  if (isDoing()) {
    logger.log("当前正有绘制任务在进行中");
    setTimeout(doNextPlayer(score), 5000);
    return;
  }
  if (!context) {
    logger.log("context 没有创建成功，一秒钟后重试");
    setTimeout(doNextPlayer(score), 5000);
    return;
  }
  context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
  doNP = true;
  try {
    drawNextPlayer(score);
  } catch (err) {
    logger.log("绘制下一个要超越的异常");
    logger.log(err);
  }
}

/**
 * 增加来自主域的监听函数
 */
function addOpenDataContextListener() {
  wx.onMessage((data) => {
    logger.log(new Date() + " - wx.onMessage:");
    logger.log(data);
    if (data.command == 'clear') {
      doClean();
    } else if (data.command == 'friendsRate') {
      doFriendsRate();
    } else if (data.command == 'loadRes' && !hasLoadRes) {
      preloadAssets();
    } else if (data.command == 'selfData') {
      doSelfData();
    } else if (data.command == 'updateMaxScore') {
      wx.getUserCloudStorage({
        keyList: ["maxScore", "week", "year"],
        success: (res) => {
          let nowWeek = getWeekCount();
          if (res.KVDataList == null || res.KVDataList.length == 0) {
            wx.setUserCloudStorage({
              KVDataList: [{
                key: "maxScore",
                value: data.score
              }, {
                key: "week",
                value: nowWeek.toString()
              }, {
                key: "year",
                value: new Date().getFullYear().toString()
              }]
            });
            return;
          }

          if (res.KVDataList.length < 3) {
            wx.setUserCloudStorage({
              KVDataList: [{
                key: "maxScore",
                value: data.score
              }, {
                key: "week",
                value: nowWeek.toString()
              }, {
                key: "year",
                value: new Date().getFullYear().toString()
              }]
            });
            return;
          }
          let week = 0;
          let year = 0;
          let preMaxScore = 0;
          res.KVDataList.forEach((val) => {
            if (val.key == "week") {
              week = parseInt(val.value);
              return;
            }
            if (val.key == "maxScore") {
              preMaxScore = parseInt(val.value);
              return;
            }
            if (val.key == "year") {
              year = parseInt(val.value);
              return;
            }
          });
          if (week != nowWeek || new Date().getFullYear() != year) {
            wx.setUserCloudStorage({
              KVDataList: [{
                key: "maxScore",
                value: data.score
              }, {
                key: "week",
                value: nowWeek.toString()
              }, {
                key: "year",
                value: new Date().getFullYear().toString()
              }]
            });
            return;
          }
          let currScore = parseInt(data.score);
          if (currScore > preMaxScore) {
            wx.setUserCloudStorage({
              KVDataList: [{
                key: "maxScore",
                value: data.score
              }, {
                key: "week",
                value: nowWeek.toString()
              }, {
                key: "year",
                value: new Date().getFullYear().toString()
              }]
            });
            return;
          }
        }
      })
    } else if (data.command == 'getNextPlayer') {
      doNextPlayer(data.score);
    }
  });
}

addOpenDataContextListener();

/**
 * 图片绘制函数
 */
function context_drawImage(image, x, y, width, height) {

  if (image.width != 0 && image.height != 0 && context) {
    if (width && height) {
      context.drawImage(image, x, y, width, height);
    } else {
      context.drawImage(image, x, y);
    }
  }
}


var drawRoundRect = function (color, x, y, w, h, r) {

  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  // this.arcTo(x+r, y);
  context.fill();
  context.closePath();
}