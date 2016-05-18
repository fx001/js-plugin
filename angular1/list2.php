<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular产品列表</title>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

列表
<table border="1" ng-controller="List">
<tr>
	<td colspan="10"><input type="text" value="" ng-model="search"/></td>
</tr>
<tr>
	<td>ID</td>
	<td>名称</td>
	<td>数量</td>
	<td>单价</td>
	<td>总价</td>
	<td>操作</td>
</tr>
<!-- filter:{id:search} 搜索 id 字段 -->
<tr ng-repeat="item in ListData | filter:{id:search}" ng-show="ListData.length">
	<td ng-bind="item.id | filterNum"></td>
	<td ng-bind="item.name"></td>
	<td ng-bind="item.quantity"></td>
	<td ng-bind="item.price"></td>
	<td ng-bind="item.price*item.quantity"></td>
	<td>
	</td>
</tr>
<tr ng-show="!ListData.length">
	<td colspan="10">没有记录</td>
</tr>
<tr>
	<td>
		合计总价：{{totalPrice()}}
	</td>
	<td>
		合计数量：{{totalQuantity()}}
	</td>
	<td>
		<input type="button" value="清空" ng-click="remove(-1)"/>
	</td>
</tr>
</table>

</body>
<script>
var UserInfoModule = angular.module('UserInfoModule', [],function($filterProvider){
	//用注册的方法自定义过滤器
	$filterProvider.register('filterList',function(){
		return function(obj){
			var newObj = [];
			angular.forEach(obj,function(o){
				//o.name += '已过滤';
				if(o.name == '名称002'){
					newObj.push(o);
				}
			console.log(o);
			});
			return newObj;
		};
	});
});

UserInfoModule.factory('ListData',function(){
	return [
		{
			id:100,
			name:'名称001',
			quantity:3,
			price:3000
		},
		{
			id:101,
			name:'名称002',
			quantity:4,
			price:3100
		},
		{
			id:102,
			name:'名称003',
			quantity:5,
			price:3020
		},
		{
			id:103,
			name:'名称004',
			quantity:6,
			price:3500
		}
	];
});

//自定义过滤器
UserInfoModule.filter('filterList2',function(){
	return function(obj){
		var newObj = [];
		angular.forEach(obj,function(o){
			if(o.name == '名称002'){
				newObj.push(o);
			}
		console.log(o);
		});
		return newObj;
	};
});
//自定义过滤器
UserInfoModule.filter('filterNum',function(){
	return function(obj){
		obj++;
		return obj;
	};
});

UserInfoModule.controller('List',function($scope,ListData){
	$scope.ListData = ListData;

});

</script>
</html>