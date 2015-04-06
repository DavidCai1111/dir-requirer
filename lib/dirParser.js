var fs = require('fs');
var path = require('path');

/**
 * 将路径层次映射为对象结构
 *
 * @param dirName 当前路径名，若为根路径则输入‘’（空字符串）
 * @param dirPath 当前路径
 * @param obj 需要被映射的对象
 */
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

module.exports = dirParser;
