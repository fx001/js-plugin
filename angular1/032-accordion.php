<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular accordion 容器折叠范例</title>
<style>
.hide{display:none}
</style>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

<div ng-controller="List1">
	<div ng-repeat="d in Data">
		<toggle></toggle>
	</div>
</div>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', []);

UserInfoModule.factory('Data',function(){
	return [
		{
		id:1,
		name:'no1',
		content:'no1-content',
		isShow:false
		},
		{
		id:2,
		name:'no2',
		content:'no2-content',
		isShow:false
		},
		{
		id:3,
		name:'no3',
		content:'no3-content',
		isShow:false
		},
	];
});

//使用指令可以使每个容器的 controller - $scope 独立

UserInfoModule.directive('toggle',function(){
	return {
		restrct:'E',
		replace:true,
		template:'<div><h4 ng-click="toggle(d.id)">{{d.name}}</h4><p ng-class="{hide:!d.isShow}">{{d.content}}</p></div>',
		controller:['$scope','Data',function($scope,Data){
			$scope.toggle = function(nowId){
				angular.forEach(Data,function(item){
					if(item.id == nowId){
						item.isShow = !item.isShow;
					}else{
						item.isShow = false;
					}
				});
			};
		}]
	};
});

UserInfoModule.controller('List1',['$scope','Data',function($scope,Data){
	$scope.Data = Data;
}]);

</script>
</html>