<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular表单相关</title>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

form表单
<form ng-controller="UserInfoCtrl">
	<div ng-controller="page"></div>
	<div>帐号：<input type="text" ng-model="username" required/><span ng-model="name"></span></div>
	<div>邮箱：<input type="email" required/><span></span></div>
	<input type="submit"/>
</form>
<br/><br/><br/><br/>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);

//自定义服务
UserInfoModule.factory('UserService',['$scope',function($scope){
	return {u:$scope.userInfo.email};
}]);

UserInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
	$scope.userInfo={
		email:'aaa@163.com',
		autoLogin:true
	};
}]);

UserInfoModule.controller('page',['$scope','$http',function($scope,$http){
	$http({
		method:'GET',
		url:'data/data0.php'
	}).success(function(data,status,headers,config){
		console.log(data);
	}).error(function(data,status,headers,config){
		console.log('error');
	});
}]);

</script>
</html>