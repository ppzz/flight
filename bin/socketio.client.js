var io = require("socket.io-client");
var fs = require("fs");

var serverUrl = "http://192.168.100.220:8886";
var connNumber = 0;                     // 链接尝试次数
var lastConnectTime = new Date();

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
printLog("程序: serverUrl: " + serverUrl);
printLog("程序: 尝试链接服务器: " + now());

var socket = io(serverUrl, option);

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);
socket.on("connect_error", connect_error);
socket.on("connect_timeout", connect_timeout);
socket.on("reconnect", reconnect);
socket.on("reconnect_attempt", reconnect_attempt);
socket.on("reconnecting", reconnecting);
socket.on("reconnect_error", reconnect_error);
socket.on("reconnect_failed", reconnect_failed);
socket.on("ping", ping);
socket.on("pong", pong);


function onConnect() {
    printLog("事件: 成功链接到服务器: " + now());
}

function onDisconnect() {
    printLog("事件: 与服务器断开链接: " + now());
}

function connect_error(error) {
    printLog("事件: 链接错误: " + now());
    printLog("\t" + error);
}

function connect_timeout() {
    printLog("事件: 连接超时: " + now());
}

function reconnect(attemptNumber) {
    printLog("事件: 重新连接成功: " + now() + ' 第n次尝试:' + attemptNumber);
}

function reconnect_attempt() {
    printLog();
    printLog();
    printLog("事件: 尝试重新连接: " + now());
    var n = new Date();
    printLog("\t" + "目前是第 " + connNumber++ + " 次, 距离上次的间隔:" + Math.floor((n - lastConnectTime)/1000));
    lastConnectTime = n;
}

function reconnecting() {
    printLog("事件: 正在重新连接: " + now());
}

function reconnect_error(error) {
    printLog("事件: 重连出错: " + now());
    printLog("\t" + error);
}

function reconnect_failed() {
    printLog("事件: 重连失败: " + now());
}

function ping() {
    printLog("事件: ping: " + now());
}

function pong(number) {
    printLog("事件: pong: " + now() + " 毫秒数:" + number);
}


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
