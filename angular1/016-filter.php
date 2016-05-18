<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular filter</title>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

<div ng-controller="List1">
	<p>{{date | filter:'a'}}</p>
	<p>在键值 n 中模糊查询 p {{date | filter:{n:'p'} }}</p>
	<p>{{num}}</p>
</div>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);

UserInfoModule.controller('List1',function($scope,$filter){
	$scope.date = [
		{
		name:'angular',
		n:'a'
		},
		{
		name:'angularjs',
		n:'j'
		},
		{
		name:'php',
		n:'p'
		}
	];

	$scope.num = 100;
	$scope.num = $filter('number')($scope.num);
});

</script>
</html>