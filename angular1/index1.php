<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular指令测试</title>
<script src="angular.1.5.5.min.js"></script>
<style>
div{margin:20px}
</style>
</head>

<body>

<div ng-controller="load">
	<hello>
		通常标签
	</hello>

	<loader ng-bind="loadObj.val" howToLoad="loadData()"></loader>
	<div>watch监听loader {{loadValCount}}</div>

	<div>
		<at fav2="fav1"></at>
		<input ng-model="fav1"/>
	</div>
</div>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);
	
UserInfoModule.directive("hello",function(){
	return {
		restrict:'E',		//AECM
		transclude:true,	//替换内容
		template:'<p>111</p><div ng-transclude></div>',
		//replace:false
	};
});

UserInfoModule.directive("loader",function(){
	return {
		restrict:'E',
		/*controller:function(scope){
			
		},*/
		link:function(scope,element,attrs){
			element.bind("mouseenter",function(event){
				// $apply 触发脏检查，同步数据
				scope.$apply(attrs.howtoload);	//scope.loadData
			});
		}
	};
});

/*
scope绑定策略
@ 仅字符串
= 双向属性绑定
& 
*/
UserInfoModule.directive("at",function(){
	return {
		restrict:'E',
		scope:{
			fav2:'='
		},
		template:'<input ng-model="fav2"/>'
	};
});

UserInfoModule.controller("load",["$scope",function($scope){
	$scope.loadObj={
		val:'调用loadData()方法',
		val2:'222'
	};
	$scope.loadValCount=0;
	// $watch 监控对象是否变化
	//如果loadObj是对象，需要加第3个参数 true，否则仅检查类型不检查属性值
	$scope.$watch('loadObj',function(newValue,oldValue){
		++$scope.loadValCount;
	},true);

	$scope.loadData=function(){
		$scope.loadObj.val += '1';
	};

	$scope.fav1='input绑定';
}]);
</script>
</html>