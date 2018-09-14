var pomelo = window.pomelo;
var username;
var users;
var rid;
var base = 1000;
var increase = 25;
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var LOGIN_ERROR = "There is no server to log in, please wait.";
var LENGTH_ERROR = "Name/Channel is too long or too short. 20 character max.";
var NAME_ERROR = "Bad character in Name/Channel. Can only have letters, numbers, Chinese characters, and '_'";
var DUPLICATE_ERROR = "Please change your name to login.";
var host;
var port;
util = {
    urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
    //  html sanitizer
    toStaticHTML: function(inputHtml) {
        if (inputHtml == undefined) {
            return 'test1111';
        } else {
            inputHtml = inputHtml.toString();
            return inputHtml.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
    },
    //pads n with zeros on the left,
    //digits is minimum length of output
    //zeroPad(3, 5); returns "005"
    //zeroPad(2, 500); returns "500"
    zeroPad: function(digits, n) {
        n = n.toString();
        while (n.length < digits)
            n = '0' + n;
        return n;
    },
    //it is almost 8 o'clock PM here
    //timeString(new Date); returns "19:49"
    timeString: function(date) {
        var minutes = date.getMinutes().toString();
        var hours = date.getHours().toString();
        var seconds = date.getSeconds().toString();
        return this.zeroPad(2, hours) + ":" + this.zeroPad(2, minutes) + ":" + this.zeroPad(2, seconds);
    },

    //does the argument only contain whitespace?
    isBlank: function(text) {
        var blank = /^\s*$/;
        return (text.match(blank) !== null);
    }
};

//always view the most recent message when it is added
function scrollDown(base) {
    window.scrollTo(0, base);
    $("#entry").focus();
};

// add message on board
function addMessage(from, target, text, time) {
    var name = (target == '*' ? 'all' : target);
    if (text === null) return;
    if (time == null) {
        // if the time is null or undefined, use the current time.
        time = new Date();
    } else if ((time instanceof Date) === false) {
        // if it's a timestamp, interpret it
        time = new Date(time);
    }
    //every message you see is actually a table with 3 cols:
    //  the time,
    //  the person who caused the event,
    //  and the content
    var messageElement = $(document.createElement("table"));
    messageElement.addClass("message");
    // sanitize
    text = util.toStaticHTML(text);
    var content = '<tr>' + '  <td class="date">' + util.timeString(time) + '</td>' + '  <td class="nick">' + util.toStaticHTML(from) + ' says to ' + name + ': ' + '</td>' + '  <td class="msg-text">' + text + '</td>' + '</tr>';
    messageElement.html(content);
    //the log is the stream that we view
    $("#chatHistory").append(messageElement);
    base += increase;
    scrollDown(base);
};

// show tip
function tip(type, name) {
    var tip, title;
    switch (type) {
        case 'online':
            tip = name + ' is online now.';
            title = 'Online Notify';
            break;
        case 'offline':
            tip = name + ' is offline now.';
            title = 'Offline Notify';
            break;
        case 'message':
            tip = name + ' is saying now.'
            title = 'Message Notify';
            break;
    }
    // var pop = new Pop(title, tip);
    addMessage('system', 'all', tip, null);
};

// init user list
//function initUserList(data) {
function initUserList(users) {
    // users = data.users;
    for (var i = 0; i < users.length; i++) {
        var slElement = $(document.createElement("option"));
        slElement.attr("value", users[i].nickname);
        slElement.text(users[i].nickname);
        $("#usersList").append(slElement);
    }
};

// add user in user list
function addUser(user) {
    var slElement = $(document.createElement("option"));
    slElement.attr("value", user.nickname);
    slElement.text(user.nickname);
    $("#usersList").append(slElement);
};

// remove user from user list
function removeUser(user) {
    $("#usersList option").each(
        function() {
            if ($(this).val() === user.nickname) $(this).remove();
        });
};

// set your name
function setName() {
    $("#name").text(username);
};

// set your room
function setRoom() {
    $("#room").text(rid);
};

// show error
function showError(content) {
    $("#loginError").text(content);
    $("#loginError").show();
};

// show login panel
function showLogin() {
    $("#loginView").show();
    $("#chatHistory").hide();
    $("#toolbar").hide();
    $("#loginError").hide();
    $("#loginUser").focus();
};

// show chat panel
function showChat() {
    $("#loginView").hide();
    $("#loginError").hide();
    $("#toolbar").show();
    $("entry").focus();
    scrollDown(base);
};

// query connector
function queryEntry(uid, callback) {
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        host: window.location.hostname,
        //host: '123.206.174.209',
        port: 3014,
        log: true
    }, function() {
        pomelo.request(route, {
            uid: uid
        }, function(data) {
            console.log('queryEntry data:' + JSON.stringify(data));
            console.log('code:' + data.code);
            pomelo.disconnect();
            if (data.code === 500) {
                showError(LOGIN_ERROR);
                return;
            }
            console.log(data.data.host);
            host = data.data.host;
            port = data.data.port;
            callback(host, port);
        });
    });
};

$(document).ready(function() {
    //when first time into chat room.
    showLogin();
    //wait message from the server.
    pomelo.on('onChat', function(data) {
        console.log("onChat data1:" + data);
        console.log("onChat data2:" + JSON.stringify(data));
        addMessage(data.from, data.target, data.msg);
        $("#chatHistory").show();
        if (data.from !== username)
            tip('message', data.from);
    });

    //update user list
    pomelo.on('onAdd', function(data) {
        var user = data.user;
        console.log("onAdd----" + JSON.stringify(user));
        tip('online', user);
        addUser(user);
    });

    //update user list
    pomelo.on('onLeave', function(data) {
        var user = data.user;
        console.log("onLeave----" + JSON.stringify(user));
        tip('offline', user);
        removeUser(user);
    });


    //handle disconect message, occours when the client is disconnect with servers
    pomelo.on('disconnect', function(reason) {
        showLogin();
    });

    //deal with login button click.
    $("#login").click(function() {
        username = $("#loginUser").attr("value");
        //  rid = $('#channelList').val(); //频道id不从页面输入获取，由服务器返回

        //  if (username.length > 20 || username.length == 0 || rid.length > 20 || rid.length == 0) {
        if (username.length > 50 || username.length == 0) {
            showError(LENGTH_ERROR);
            return false;
        }

        //  if (!reg.test(username) || !reg.test(rid)) {
        // if (!reg.test(username)) {
        //     showError(NAME_ERROR);
        //     return false;
        // }

        //query entry of connection
        queryEntry(username, function(host, port) {
            pomelo.init({
                host: host,
                port: port,
                log: true
            }, function() {
                var route = "connector.entryHandler.enter";
                pomelo.request(route, {
                    uid: username,
                    // rid: rid
                }, function(data) {
                    if (data.error) {
                        showError(DUPLICATE_ERROR);
                        return;
                    }

                    var route2 = "connector.betHandler.get";
                    pomelo.request(route2, { scheduleId: 14293 }, function(data) {
                        console.log(data);
                    });

                    console.log('enter data:' + JSON.stringify(data));
                    setName();
                    // rid = data.rid; //added by ch，房间ID由服务端返回
                    setRoom();
                    showChat();
                    //initUserList(data);
                    initUserList(data.data.userlist); //房间里的用户列表
                });
            });
        });



    });


    // setInterval(function() {
    //     pomelo.init({
    //         host: host,
    //         port: port,
    //         log: true
    //     }, function() {
    //         var route = "connector.entryHandler.enter";
    //         pomelo.request(route, {
    //             uid: username,
    //             // rid: rid
    //         }, function(data) {
    //             console.log(data);
    //         });
    //     });
    // }, 10000);



    // setInterval(function() {
    //     var route = "chat.chatHandler.send";
    //     var target = $("#usersList").val();
    //     var data = {
    //         "type": "freeze",
    //         "data": {
    //             "scheduleId": 123456
    //         }
    //     };
    //     var content = JSON.stringify(data);
    //     pomelo.request(route, {
    //         content: content,
    //         from: username,
    //         target: target
    //     }, function(data) {
    //         console.log(data);
    //     });
    // }, 10000);

    //"ValueList":[0,0,0],"ScheduleId":207,"WinNumber":0

    // setInterval(function() {
    //     var route = "chat.chatHandler.send";
    //     var target = $("#usersList").val();
    //     var data = {
    //         "type": "result",
    //         "data": {
    //             "valueList": [1, 2, 3],
    //             "scheduleId": 123456,
    //             "bonusBalance": 800,
    //             "nextSchedule": {
    //                 "scheduleID": 123457,
    //                 "scheduleName": "下一期名称",
    //                 "secondCountDown": 60
    //             }
    //         }
    //     };
    //     var content = JSON.stringify(data);
    //     pomelo.request(route, {
    //         content: content,
    //         from: username,
    //         target: target
    //     }, function(data) {
    //         console.log(data);
    //     });
    // }, 10000);


    //deal with chat mode.
    $("#entry").keypress(function(e) {
        var route = "chat.chatHandler.send";
        var target = $("#usersList").val();
        if (e.keyCode != 13 /* Return */ ) return;
        //var msg = $("#entry").attr("value").replace("\n", "");
        var data = {
            "type": "bet",
            "data": {
                "scheduleId": 123,
                betData: [{
                        "OptionId": 2,
                        "BetNumber": 20
                    },
                    {
                        "OptionId": 4,
                        "BetNumber": 20
                    }
                ]
            }
        };
        var msg = JSON.stringify(data);
        if (!util.isBlank(msg)) {
            pomelo.request(route, {
                //rid: rid,
                content: msg,
                from: username,
                target: target
            }, function(data) {

                console.log(data);

                $("#entry").attr("value", ""); // clear the entry field.
                if (target != '*' && target != username) {
                    console.log(111);
                    console.log("username----" + username);
                    console.log("target----" + target);
                    console.log("msg----" + msg);
                    addMessage(username, target, msg);
                    $("#chatHistory").show();
                }
            });
        }
    });
});