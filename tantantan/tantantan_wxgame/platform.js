/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */
class WxgamePlatform {

  name = 'wxgame'

  connectSocket(object) {
    return new Promise((resolve, reject) => {
      resolve(wx.connectSocket(object));
    });
  }
  closeSocket(object) {
    return new Promise((resolve, reject) => {
      resolve(wx.closeSocket(object));
    });
  }
  onSocketOpen(callback) {
    return new Promise((resolve, reject) => {
      resolve(wx.onSocketOpen(callback));
    });
  }
  onSocketClose(callback) {
    return new Promise((resolve, reject) => {
      resolve(wx.onSocketClose(callback));
    });
  }
  onSocketError(callback) {
    return new Promise((resolve, reject) => {
      resolve(wx.onSocketError(callback));
    });
  }
  onSocketMessage(callback) {
    return new Promise((resolve, reject) => {
      resolve(wx.onSocketMessage(callback));
    });
  }


  isFirstRun() {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: "isFirstRun",
        success: (res) => {
          if (!res) {
            resolve(true);
            return;
          }
          if (res == "true") {
            resolve(true);
            return;
          }
          resolve(false);
        },
        fail: (res) => {
          resolve(true);
        }
      });
    });
  }

  setNotFirstRun() {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: 'isFirstRun',
        data: 'false',
      })
    });
  }

  login() {
    return new Promise((resolve, reject) => {
      console.log("微信：开始进行用户登录");
      wx.login({
        success: (res) => {
          console.log("微信：用户登录成功");
          resolve(res)
        }
      })
    })
  }

  getUserInfo(onSuccessed, onFailed, onCompleted) {
    return new Promise((resolve, reject) => {
      console.log("微信：开始读取用户信息");
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          if (onSuccessed) {
            onSuccessed(res);
          }
        },
        fail: function(res) {
          if (onFailed) {
            onFailed(res);
          }
        },
        complete: function(res) {
          if (onCompleted) {
            onCompleted(res);
          }
        }
      });
    })
  }
  navigateToMiniProgram(appId, path, extraData, envVersion, onSuccess) {
    return new Promise((resolve, reject) => {
      wx.navigateToMiniProgram({
        appId: appId,
        path: path,
        extraData: extraData,
        envVersion: envVersion,
        success: (res) => {
          if (onSuccess) {
            onSuccess(res);
          }
        }
      })
    });
  }
  getShareInfo(shareTicket, onSuccess, onFailed) {
    return new Promise((resolve, reject) => {
      wx.getShareInfo({
        shareTicket: shareTicket,
        success: function(res) {
          onSuccess(res);
        },
        fail:function(res){
          onFailed(res);
        }
      })
    });
  }

  shareAppMessage(title, imageUrl, onSuccess, onFailed, onComplete) {
    return new Promise((resolve, reject) => {
      wx.shareAppMessage({
        title: title,
        imageUrl: imageUrl,
        success: function(res) {
          onSuccess(res);
        },
        fail: function(res) {
          onFailed(res);
        },
        complete: function(res) {
          onComplete(res);
        }
      });
    })
  }

  showShareMenu(title, imageUrl) {
    return new Promise((resolve, reject) => {
      wx.showShareMenu({
        withShareTicket: true,
        success: function(res) {
          resolve(res);
        }
      });
      wx.onShareAppMessage(function() {
        return {
          title: title,
          imageUrl: imageUrl
        }
      });
    });
  }

  onShareAppMessage(res) {
    let self = this;
    console.log(res);
    let fromMenu = true;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      fromMenu = false;
    }
    return {
      title: "tst",
      imageUrl: "tst"
    }
  }

  updateUserScore(score) {
    return new Promise((resolve, reject) => {
      wx.getOpenDataContext().postMessage({
        command: 'updateMaxScore',
        score: score
      });
    });
  }
  button = [];
  buttonId = 0;

  destroyUserInfoButton() {    
    for (var buttonId = 0; buttonId < 20; buttonId++) {
      if (!this.button[buttonId]) continue;
      this.button[buttonId].destroy();
      this.button[buttonId] = null;
    }
    this.buttonNeedDestory = true;
  }
  fixUserInfoButton() {
    return new Promise((resolve, reject) => {
      if (this.buttonNeedDestory) {
        this.destroyUserInfoButton();
        resolve(true);
      }
      resolve(false);
    })
  }
  createUserInfoButton(onSuccess, buttonX, buttonY, buttonWidth, buttonHeight, buttonImage) {
    return new Promise((resolve, reject) => {
      this.buttonNeedDestory = false;
      let buttonId = (this.buttonId + 1) % 20;
      this.buttonId = buttonId;
      this.button[buttonId] = wx.createUserInfoButton({
        type: 'image',
        image: buttonImage,
        style: {
          left: buttonX,
          top: buttonY,
          width: buttonWidth,
          height: buttonHeight,
          lineHeight: buttonHeight
        }
      })
      console.log("buttons");
      this.button.forEach(val=>{

        console.log(val);
      })
      this.button[buttonId].onTap((res) => {
        console.log('获取用户信息成功');
        console.log(res);
        if (onSuccess) {
          onSuccess(res, buttonId);
        }
        resolve(res);
      })
    });
  }

  openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

  createDisplayObject() {
    let friendCount = 15;
    let scale = sharedCanvas.width / 750;
    sharedCanvas.height = (140 * friendCount) * scale;
    const bitmapdata = new egret.BitmapData(sharedCanvas);
    bitmapdata.$deleteSource = false;
    const texture = new egret.Texture();
    texture._setBitmapData(bitmapdata);
    const bitmap = new egret.Bitmap(texture);

    if (egret.Capabilities.renderMode == "webgl") {
      const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
      const context = renderContext.context;
      ////需要用到最新的微信版本
      ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
      ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
      if (!context.wxBindCanvasTexture) {
        egret.startTick((timeStarmp) => {
          egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
          bitmapdata.webGLTexture = null;
          return false;
        }, this);
      }
    }
    return bitmap;
  }


  postMessage(data) {
    return new Promise((resolve, reject) => {
      const openDataContext = wx.getOpenDataContext();
      openDataContext.postMessage(data);
    });
  }

  getFriendsRate() {
    return new Promise((resolve, reject) => {
      const openDataContext = wx.getOpenDataContext();
      openDataContext.postMessage({
        command: "friendsRate"
      });
    });
  }

  getSelfRate() {
    return new Promise((resolve, reject) => {
      const openDataContext = wx.getOpenDataContext();
      openDataContext.postMessage({
        command: "selfData"
      });
    });
  }

  getNextPlayer(score) {
    return new Promise((resolve, reject) => {
      wx.getOpenDataContext().postMessage({
        command: 'getNextPlayer',
        score: score
      });
    });
  }

  clearBitmap() {
    return new Promise((resolve, reject) => {
      wx.getOpenDataContext().postMessage({
        command: 'clear'
      });
    });
  }
}


window.platform = new WxgamePlatform();