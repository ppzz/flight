var fs = require("fs");

var connNumber = 0;                     // 链接尝试次数
var lastConnectTime = new Date();


var clientEvents = {
    connect: function () {
        printLog("事件: 成功链接到服务器: " + now());
    },

    onDisconnect: function () {
        printLog("事件: 与服务器断开链接0: " + now());
    },

    disconnect: function () {
        printLog("事件: 与服务器断开链接1: " + now());
    },

    connect_error: function (error) {
        printLog("事件: 链接错误: " + now());
        printLog("\t" + error);
    },

    connect_timeout: function () {
        printLog("事件: 连接超时: " + now());
    },

    reconnect: function (attemptNumber) {
        printLog("事件: 重新连接成功: " + now() + ' 第n次尝试:' + attemptNumber);
    },

    reconnect_attempt: function () {
        printLog();
        printLog();
        printLog("事件: 尝试重新连接: " + now());
        var n = new Date();
        printLog("\t" + "目前是第 " + connNumber++ + " 次, 距离上次的间隔:" + Math.floor((n - lastConnectTime) / 1000));
        lastConnectTime = n;
    },

    reconnecting: function () {
        printLog("事件: 正在重新连接: " + now());
    },

    reconnect_error: function (error) {
        printLog("事件: 重连出错: " + now());
        printLog("\t" + error);
    },

    reconnect_failed: function () {
        printLog("事件: 重连失败: " + now());
    },

    ping: function () {
        printLog("事件: ping: " + now());
    },

    pong: function (number) {
        printLog("事件: pong: " + now() + " 毫秒数:" + number);
    },
};

var serverEvents = {};

module.exports = {
    clientEvents: clientEvents,
    serverEvents: serverEvents
};



function now() {
    var no = new Date();
    // return no.toLocaleString() + "." + no.getMilliseconds();
    return no.toLocaleString();
}

function printLog(log) {
    log = log || "";
    var filePath = "./socketClient.log";
    saveLogToFile(filePath, log);
    console.log(log);
}

function saveLogToFile(filePath, log) {
    return fs.appendFileSync(filePath, log + '\n');
}
