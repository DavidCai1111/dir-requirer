var fs = require('fs');
var path = require('path');
var dirParser = require('./dirParser');

var modulesParser = function(obj , modules){
	for (key in obj){
		if(key !== 'fileName' && key !== 'filePath'){
			modules[key] = {};
			modulesParser(obj[key],modules[key]);
		}else{
			if(key === 'fileName'){
				modules[obj.fileName] = require(obj.filePath);
			}
		}
	}
};

module.exports = function(__dir){
	var pathWhenRequired = __dir;
	var _modules = {};
	return function(dir){
		var _dirPath = path.join(pathWhenRequired,dir);
		var _modules = {};

		//请求的路径不存在
		if(!fs.existsSync(_dirPath)){
			console.error('[dirRequier]:请求的路径不存在！');
			return undefined;
		}

		//require路径下所有模块
		var AllFilesInfo = {};
		dirParser('',_dirPath,AllFilesInfo);
		modulesParser(AllFilesInfo,_modules);

		return _modules.rootPath;

	}
};

