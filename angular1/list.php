<!doctype html>
<html ng-app="UserInfoModule">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>angular简易购物车</title>
<script src="angular.1.5.5.min.js"></script>
</head>

<body>

列表
<table border="1" ng-controller="List">
<tr>
	<td>ID</td>
	<td>名称</td>
	<td>数量</td>
	<td>单价</td>
	<td>总价</td>
	<td>操作</td>
</tr>
<tr ng-repeat="item in data" ng-show="data.length">
	<td ng-bind="item.id"></td>
	<td ng-bind="item.name"></td>
	<td ng-bind="item.quantity"></td>
	<td ng-bind="item.price"></td>
	<td ng-bind="item.price*item.quantity"></td>
	<td>
		<input type="button" value="-" ng-click="add(item.id,-1)"/>
		<input type="button" value="+" ng-click="add(item.id,1)"/>
		<input type="button" value="移除" ng-click="remove(item.id)"/>
	</td>
</tr>
<tr ng-show="!data.length">
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
var UserInfoModule = angular.module('UserInfoModule', []);	// [] 需要依赖的模块

UserInfoModule.controller('List',['$scope',function($scope){
	$scope.data=[
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

	//返回总价
	$scope.totalPrice = function(){
		var total = 0;
		angular.forEach($scope.data,function(item){
			total += item.quantity*item.price;
		});
		return total;
	};

	//返回总数
	$scope.totalQuantity = function(){
		var total = 0;
		angular.forEach($scope.data,function(item){
			total += item.quantity;
		});
		return total;
	};

	//移除
	//通过 ng- 触发的方法，都会进行脏检查，自动更新所有绑定数据
	$scope.remove = function(id){
		//清空
		if(id == -1){
			$scope.data = {};
			return ;
		}
		var index = $scope.findIndex(id);
		if(index !== false){
			$scope.data.splice(index,1);
		}
	};

	//修改单项数量
	$scope.add = function(id,step){
		var index = $scope.findIndex(id);
		if(index !== false){
			$scope.data[index].quantity += step;
			// 0 即为删除该项
			if($scope.data[index].quantity <= 0){
				$scope.remove(id);
			}
		}
	};

	//=====================================

	//通过 id 找一个元素的索引
	$scope.findIndex = function(id){
		var index = false;
		angular.forEach($scope.data,function(item,key){
			if(item.id == id){
				index = key;
			}
		});
		return index;
	};
}]);

</script>
</html>