var fs = require('fs');
var path = require('path');

/**
 * 将根据路径映射对象，相应得进行require，同时保持原有结构
 *
 * @param obj 已经根据路径映射完毕的对象（已经过dirParser处理）
 * @param modules 需要根据路径映射进行相应require的对象
 */
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

module.exports = modulesParser;
