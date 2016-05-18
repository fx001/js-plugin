<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular测试</title>
<script src="angular.1.5.5.min.js"></script>
<script src="form.js"></script>
</head>

<body>

form表单测试
<form ng-controller="UserInfoCtrl">
	<div>邮箱：<input type="email" ng-model="userInfo.email"/></div>
	<div>密码：<input type="password"/></div>
	<div><input type="checkbox" ng-model="userInfo.autoLogin"/>登录</div>
	<input type="button" value="获取表单值" ng-click="getFormData()"/>
	<input type="button" value="设置表单值" ng-click="setFormData()"/>
</form>
<br/><br/><br/><br/>


<div ng-controller="ToggleMenu">
	<div ng-show="menu.show">111</div>
	<input type="button" value="显示/隐藏" ng-click="toggleMenu()" ng-bind="buttonVal"/>
</div>
<br/><br/><br/><br/>


<div>
	<p>{{g.text}}</p>
	<input ng-model="g.text"/>
</div>

<div>
	<div ng-repeat="i in [2,3]" ng-controller="helloAg">
		<p ng-bind="greeting.text +' '+ i"></p>
	</div>
</div>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);

UserInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
	$scope.userInfo={
		email:'aaa@163.com',
		autoLogin:true
	};
	$scope.getFormData=function(){
		console.log($scope.userInfo);
	};
	$scope.setFormData=function(){
		$scope.userInfo={
			email:'zzz@163.com',
			autoLogin:false
		};
	};
}]);

UserInfoModule.controller('ToggleMenu',['$scope',function($scope){
	$scope.menu={show:true};
	$scope.buttonVal="隐藏";
	$scope.toggleMenu=function(){
		$scope.menu.show = !$scope.menu.show;
	};
}]);

UserInfoModule.controller("helloAg", ['$scope',
    function ($scope) {
        $scope.greeting = {
            text: 'Hello'
        };
    }
]);
</script>
</html>