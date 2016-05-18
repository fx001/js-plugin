<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular controller复用，directive 指令相关</title>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

<div ng-controller="List1" ng-click="change($event)">
	<p><input type="text" ng-model="Data.name"/></p>
	{{Data.name}}
</div>

<div ng-controller="List2">
	List2: {{d2.name}}

	<div ng-init="arr = ['a','b','c']">
		<p>指令测试</p>
		<div ng-repeat="a in arr" ng-class-even="'red'">
			<p ng-bind="a"></p>
		</div>
		
		<p>ng-switch:</p>
		<div ng-switch on="status">
			<p ng-switch-when="10">status=10</p>
			<p ng-switch-when="100">status=100</p>
		</div>

		<c-a b="b2">c-a</c-a>
	</div>
</div>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);

//自定义服务可在所有 controller 中共享使用
// factory 可以返回所有类型值，service 仅可返回对象
UserInfoModule.factory('Data',function(){
	return {
		name:'共享数据'
	};
});

//隐示依赖注入
UserInfoModule.controller('List1',function($scope,Data){
	// $scope.Data 需要一致
	$scope.Data = Data;
});

//推荐使用
// controller 第2个参数使用数组形式，为显示依赖注入，可以避免上线后的压缩JS导致变量错误
UserInfoModule.controller('List2',['$scope','Data',function(s,d){
	s.d2 = d;

	s.status = 10;

	// view 中传入 event ，当前对象
	s.change = function(event){
		// angular.element(event.target) 转为可以使用简易 jquery 方法的对象
		console.log(angular.element(event.target).html());
	};

	s.clickT1 = function(){
		console.log(11);
	};
}]);

//==============directive 指令相关=================

//自定义指令
// View 中为 - 分隔写法， Module 中需要驼峰式写法
UserInfoModule.directive('cA',function(){
	return {
		restrict:'ECAM',	//E - 元素，C - class，A - 属性，M - 注释
		replace:true,	//是否替换指令标签
		transclude:true,	//是否保留原始数据
		template:'<div><div><span ng-transclude></span> 替换为：自定义指令</div><c-add></c-add></div>',
		//templateUrl:'a.html',	//加载一个url
		scope:true,	//创建自身的 scope，仍然可以继承父级 scope

		// compile 在编译时执行的方法，参数可以省略
		// tElement - 当前 angular 的 jquery 对象，tAttrs - 自定义指令的属性，transclude
		compile:function(tElement,tAttrs,transclude){
			console.log(tElement.html());
			console.log(tAttrs.b);
			//console.log(transclude);
			return {
				//preLink 表示在编译阶段之后，指令连接到子元素之前运行
				pre:function preLink(scope,iElement,iAttrs,controller){
					console.log('preLink');
				},
				//postLink 等同于 link方法
				post:function postLink(scope,iElement,iAttrs,controller){
					iElement.on('click',function(){
						scope.clickT1();
					});
					console.log('postLink');
				}
			};
		},
		link:function(){
			console.log('link');
		},
		//与外部定义 controller 作用相同，可以在各 controller 复用
		controller:function($scope){
			$scope.clickT1 = function(){
				console.log(22);
			};
			this.add = function(e){
				e.stopPropagation();
				console.log(33);
			};
		},
		// 当前 controller 的别名，可以在其他指令中依赖注入
		controllerAs:'userCa'
	};

	/*
	直接返回 function 等同于使用 link 或 compile 中的 postLink
	return function(){
		console.log('return link');
	};
	*/
});

UserInfoModule.directive('cAdd',function(){
	return {
		restrict:'E',
		require:'^cA',	//引入其他指令：无前缀 - 同一个元素上的指令，^ - 向父级查询，? - 容错，找不到时不会抛出异常
		replace:true,
		template:'<button type="button">ADD</button>',
		link:function(scope,iElement,iAttrs,userCa){
			iElement.on('click',userCa.add);
		}
	};
});

</script>
</html>