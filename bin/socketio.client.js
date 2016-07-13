var _ = require("lodash");
var io = require("socket.io-client");
var fs = require("fs");

var socketEvents = require('../module/socketEvent');
var serverUrl = "http://zhaopeng:3300";
// var serverUrl = "http://192.168.100.14:3300";

var option = {
    reconnection: true,                 // 是否重连
    reconnectionAttempts: Infinity,     // 停止重连前的尝试时间
    reconnectionDelay: 2 * 1000,        // 重连前的延迟
    reconnectionDelayMax: 60 * 1000,    // 重连的最大间隔时间
    randomizationFactor: 0.5,           // 随机范围
    timeout: 3 * 1000,                  // 超时时间,超时之后会触发 connect_timeout or connect_error
    autoConnect: true                   // 自动重连
};

fs.writeFileSync("./socketClient.log", "");     // 清空log文件

var socket = io(serverUrl, option);

var clientEvents = socketEvents.clientEvents;
var events = _.keys(clientEvents);
_.each(events, function (item) {
    socket.on(item, function (data) {
        clientEvents[item](data);
    });
});

