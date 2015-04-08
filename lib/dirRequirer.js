var fs = require('fs');
var path = require('path');
var util = require('util');
var dirParser = require('./dirParser');
var modulesParser = require('./modulesParser');

module.exports = function(__dir){
	var pathWhenRequired = __dir;

	return function(dir,options){
		var _dirPath = path.join(pathWhenRequired,dir);
		var _modules = {};

		//配置对象默认值
		var _options = {
			ext:['.js','.json','.node']
		};

		if(options !== undefined && options.ext !== undefined && util.isArray(options.ext)){
			_options.ext = options.ext;
		}

		//请求的路径不存在
		if(!fs.existsSync(_dirPath)){
			console.error('[dirRequier]:请求的路径: ' + _dirPath+ ' 不存在！');
			return undefined;
		}

		//require路径下所有模块
		var AllFilesInfo = {};
		dirParser('',_dirPath,AllFilesInfo,_options);
		modulesParser(AllFilesInfo,_modules);

		return _modules.rootPath;
	}
};

