var Miracle={
	creatNew:function(c){
		var o = {};
		//html
		o.blockSuffix = '<div class="cle"></div>';
		o.cssClear = 'blockClear';	//被清除时的样式
		//类属性
		o.row =	4;	//行数
		o.col =	8;	//列数
		o.colorLen = 4;	//元素样式数量
		o.blockActive = -1;	//当前活动元素索引值


		//====================事件====================
		//单元格点击事件
		o.bClick = function(){
			var _t = $(this);
			var index = _t.index();
			o.clear(_t);
			//_t.addClass('blockClick');
			//o.cancle(index);
		};

		//还原样式
		o.cancle = function(index){
			if(o.blockActive >= 0){
				o.mainB.removeClass('blockClick');
				o.blockActive = -1;
			}else{
				o.blockActive = index;
			}
		};

		//消除事件
		o.clear = function(t){
			var id = t.index() - o.col;
			if(id < 0){
				//顶部随机值
				t.attr('class','block b'+o.rd(o.colorLen-1));
			}else{
				//循环填空
				t.addClass(o.cssClear);
				var c = o.mainB.eq(id).attr('class');
				o.mainB.eq(id).attr('class','block');
				t.attr('class',c);
				o.clear(o.mainB.eq(id));
			}
		};
		//====================事件 END====================


		//==================初始化==================
		o.initVariable = function(){
			o.main = c.main ? $("#"+c.main) : $("#miracle");	//主容器
			o.initBlock();
			o.mainB = o.main.children('.block');	//单元格

			o.mainB.on('click',o.bClick);

			//console.log();
		};
		//生成单元格
		o.initBlock = function(){
			//html
			var html = '';
			for(var i = 0;i < (o.col * o.row);i++){
				html += '<div class="block b'+o.rd(o.colorLen-1)+'"><p></p></div>';
			}
			o.main.html(html);
			o.main.append(o.blockSuffix);
			//样式
			var d = o.main.find('.block p');
			d.height(d.width());
		};
		//==================初始化 END==================


		//====================函数====================
		//生成随机数
		//n 上限
		o.rd = function(n){
			m = 0;	//下限
			return parseInt(Math.random() * (n - m + 1) + m);
		};

		o.initVariable();
		return o;
	}
};
