<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular表单相关</title>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

form表单
<form name="myForm" ng-controller="UserInfoCtrl">
	<div></div>
	<div>帐号：<input type="text" name="username" ng-model="username" required ng-minLength="5"/><span ng-show="myForm.username.$invalid && myForm.username.$dirty">{{username}}</span></div>
	<div>{{myForm.username.$error}}</div>
	<div>邮箱：<input type="email" required/><span></span></div>
	<input type="submit"/>
</form>
<br/><br/><br/><br/>
myForm.username.$valid 字段是否有效<br/>
$invalid	是否无效<br/>
myForm.username.$dirty 字段是否更改<br/>
$pristine	是否未更改<br/>
myForm.username.$error 字段错误信息<br/>
<br/><br/>
ng-model 绑定的数据<br/>
required 是否必填<br/>
ng-required 是否必填<br/>
ng-minlength 最小长度<br/>
ng-maxlength 最大长度<br/>
ng-pattern 匹配模式<br/>
ng-change 值变化时的回调 

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);

//自定义服务
UserInfoModule.factory('UserService',['$scope',function($scope){
	return {u:$scope.userInfo.email};
}]);

UserInfoModule.controller('UserInfoCtrl',['$scope',function($scope){
	$scope.userInfo={
		username:'1',
		email:'aaa@163.com',
		autoLogin:true
	};

	$scope.error = {
		'username':$scope.username
	};
	
	//console.log($scope.myForm.username.$error);
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