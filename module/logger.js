// log level:
var TRACE = 1;
var DEBUG = 2;
var INFO = 3;
var WARN = 4;
var ERROR = 5;
var FATAL = 6;
var POSITION = 1;

//log color:
var NOCOLOR = '';
var DEFAULTCOLOR = '\033[0m';
var RED = '\033[31m';
var GREEN = '\033[32m';
var ORANGE = '\033[33m';
var BLUE = '\033[34m';
var PURPLE = '\033[35m';
var CYAN = '\033[36m';
var WHITE = '\033[37m';


var ColorController = {
  TRACE: GREEN,
  DEBUG: GREEN,
  INFO: CYAN,
  WARN: ORANGE,
  ERROR: RED,
  FATAL: RED,
  JSON: BLUE,
  POSITION: PURPLE
};

//modules:
var stackTracer = require('stack-trace');

function Logger(logLevel, isColorizedLog) {
  this._logLevel = logLevel || 0;
  this._isColorizedLog = isColorizedLog || false;
}

var _timeStamp = function () {
  var now = new Date();
  return now.getFullYear() + '-' +
    ("0" + (now.getMonth() + 1)).slice(-2) + '-' +
    ("0" + (now.getDate() + 1)).slice(-2) + ' ' +
    ("0" + now.getHours()).slice(-2) + ':' +
    ("0" + now.getMinutes()).slice(-2) + ':' +
    ("0" + now.getSeconds()).slice(-2) + '.' +
    ("000" + now.getMilliseconds()).slice(-3);
};

var _printMsg = function (highLightColor, type, msg, isColorized) {
  var defaultColor = DEFAULTCOLOR;
  var stack = stackTracer.get();
  var caller = stack[2];
  msg = msg || '.';
  if (!isColorized) {
    defaultColor = NOCOLOR;
    highLightColor = NOCOLOR;
  }
  console.log(
    "[" , highLightColor , type , defaultColor , "] " ,
    "[" , highLightColor , _timeStamp() , defaultColor , "] " ,
    "[" , highLightColor , caller.getFileName().replace(__dirname, '') ,
    " #" , caller.getLineNumber() ,
    ":" , caller.getColumnNumber() ,
    " @" , caller.getFunctionName() , defaultColor , "] " ,
    "" , highLightColor , type , ': ' , msg , defaultColor);
};

var _printPosition = function (highLightColor, type, msg, isColorized) {
  var defaultColor = DEFAULTCOLOR;
  var stack = stackTracer.get();
  var caller = stack[2];
  msg = msg || '.';
  if (!isColorized) {
    defaultColor = NOCOLOR;
    highLightColor = NOCOLOR;
  }
  console.log(
    "[" + highLightColor + type + defaultColor + "] " +
    "[" + _timeStamp() + "] " +
    "[" + highLightColor + caller.getFileName().replace(__dirname, '') +
    " #" + caller.getLineNumber() +
    ":" + caller.getColumnNumber() +
    " @" + caller.getFunctionName() + defaultColor + "] " +
    "" + highLightColor + type +
    ": " + caller.getFunctionName() +
    " msg: " + msg + defaultColor);
};

Logger.prototype.getLevel = function () {
  return this._logLevel;
};
Logger.prototype.setLevel = function (logLevel) {
  this._logLevel = logLevel;
};
Logger.prototype.getIsColorizedLog = function () {
  return this._isColorizedLog;
};
Logger.prototype.setIsColorizedLog = function (isColorizedLog) {
  this._isColorizedLog = isColorizedLog;
  return this._isColorizedLog;
};

//next function to print msg with different color:
Logger.prototype.trace = function (msg) {
  if (this.getLevel() < TRACE) {
    _printMsg(ColorController.TRACE, 'TRACE', msg, this._isColorizedLog);
  }
};

Logger.prototype.debug = function (msg) {
  if (this.getLevel() < DEBUG) {
    _printMsg(ColorController.DEBUG, "DEBUG", msg, this._isColorizedLog);
  }
};

Logger.prototype.info = function (msg) {
  if (this.getLevel() < INFO) {
    _printMsg(ColorController.INFO, "INFO", msg, this._isColorizedLog);
  }
};

Logger.prototype.warn = function (msg) {
  if (this.getLevel() < WARN) {
    _printMsg(ColorController.WARN, "WARN", msg, this._isColorizedLog);
  }
};

Logger.prototype.error = function (msg) {
  if (this.getLevel() < ERROR) {
    _printMsg(ColorController.ERROR, "ERROR", msg, this._isColorizedLog);
  }
};

Logger.prototype.fatal = function (msg) {
  if (this.getLevel() < FATAL) {
    _printMsg(ColorController.FATAL, "FATAL", msg, this._isColorizedLog);
  }
};

Logger.prototype.json = function () {
  if (arguments.length === 1) {
    if (typeof arguments[0] !== "string" && typeof arguments[0] !== "number") {
      arguments[0] = JSON.stringify(arguments[0]);
    }
    _printMsg(ColorController.JSON, "JSON", arguments[0], this._isColorizedLog);
    return;
  }

  if (typeof arguments[1] !== "string" && typeof arguments[1] !== "number") {
    arguments[1] = JSON.stringify(arguments[1]);
  }
  _printMsg(ColorController.JSON, "JSON", "KEY: " + arguments[0] + ", VALUE: " + arguments[1], this._isColorizedLog);
};

//next function to print status with call:
Logger.prototype.enter = function (msg) {
  if (this.getLevel() < POSITION) {
    _printPosition(ColorController.POSITION, "ENTER", msg, this._isColorizedLog)
  }
};

Logger.prototype.leave = function (msg) {
  if (this.getLevel() < POSITION) {
    _printPosition(ColorController.POSITION, "LEAVE", msg, this._isColorizedLog)
  }
};

Logger.prototype.footPrint = function (msg) {
  if (this.getLevel() < POSITION) {
    _printPosition(ColorController.POSITION, "FOOTPRINT", msg, this._isColorizedLog)
  }
};

module.exports = Logger;
