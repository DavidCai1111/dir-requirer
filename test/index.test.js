var dr = require('../lib/')(__dirname);
var should = require('should');

describe('test dir-requirer',function(){
	it('test without options',function(done){
		var resultExpected = {
			'1': { a: 'test1', b: 'test2' },
			_InnerDir: {
				'2': { name: 'testJson', version: '0.0.1' },
				_doubleInner: {
					'3': { a: 'test3', b: 'test4' },
					'4': { name: 'testJson2', version: '0.0.2' }
				}
			}
		};
		should(dr('./_test')).be.eql(resultExpected);
		done();
	});
	it('test with option : ext',function(done){
		var resultExpected = {
			'1': { a: 'test1', b: 'test2' },
			_InnerDir: {
				_doubleInner: {
					'3': { a: 'test3', b: 'test4' }
				}
			}
		};
		should(dr('./_test',{ext:['.js']})).be.eql(resultExpected);
		done();
	});
	it('test with option : dirBlackList',function(done){
		var resultExpected = {
			'1': { a: 'test1', b: 'test2' },
			_InnerDir: {
				'2': { name: 'testJson', version: '0.0.1' }
			}
		};
		should(dr('./_test',{dirBlackList : ['_doubleInner']})).be.eql(resultExpected);
		done();
	});
	it('test with option : fileBlackList',function(done){
		var resultExpected = {
			'1': { a: 'test1', b: 'test2' },
			_InnerDir: {
				_doubleInner: {
					'4': { name: 'testJson2', version: '0.0.2' }
				}
			}
		};
		should(dr('./_test',{fileBlackList : ['3.js','2.json']})).be.eql(resultExpected);
		done();
	});
	it('test with all options',function(done){
		var resultExpected = {
			'1': { a: 'test1', b: 'test2' },
			_InnerDir: {}
		};
		should(dr('./_test',{ext: ['.js'],dirBlackList : ['_doubleInner'],fileBlackList : ['2.json']})).be.eql(resultExpected);
		done();
	});
	it('test with path which not exists', function (done) {
		should(dr('./dirWhichNotExists')).be.eql(undefined);
		done();
	});
});