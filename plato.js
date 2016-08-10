var plato = require('plato');

var files = [
    'module'
];

var outputDir = './report/';

var options = {
    title: 'ZHAO PENG REPORT',
    // q: true,
    exclude: /(node_modules)|(apps\/docWorkStation\/controller)/,
    // eslint: {},
    data: (new Date()).getTime(),
    recurse: true,
    noempty: true
};

var callback = function (report){
    console.log('完成report');
    console.log(report);
};

plato.inspect(files, outputDir, options, callback);