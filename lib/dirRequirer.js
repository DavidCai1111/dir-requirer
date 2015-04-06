var fs = require('fs');
var path = require('path');
var util = require('util');

var dirParser = function(dirName,dirPath,obj){

	var _fullName =path.join(dirPath,dirName);
	var _isDir = fs.statSync(_fullName).isDirectory();

	if(dirName === ''){
		dirName = 'rootPath';
	}

	if(_isDir){
		//递归子目录
		var files = fs.readdirSync(_fullName);
		obj[dirName] = {};
		for (var i = 0 ; i < files.length ; i++){
			dirParser(files[i],_fullName,obj[dirName]);
		}
	}else{
		//存储文件信息
		var _fileName;
		if(path.extname(dirName) === '.js'){
			_fileName = path.basename(dirName,'.js');
		}else if(path.extname(dirName) === '.json'){
			_fileName = path.basename(dirName,'.json');
		}else{
			_fileName = dirName;
		}
		obj.fileName = _fileName;
		obj.filePath = _fullName;
	}
};

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

