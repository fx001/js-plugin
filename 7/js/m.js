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

		//检测连续值并标记
		o.series = function(){
			var start;
			var tClass = '';	//当前class值
			var preClass = '';	//上一个class值
			var tCount = 1;
			for(var r = 0;r < o.row;r++){
				start = r * o.col;
				for(var c = start;c < (start + o.col);c++){
					tClass = o.getLastClass(o.mainB.eq(c).attr('class'));
					if(preClass == tClass){
						tCount ++;
					}else{
						if(tCount >= 3){
							o.seriesIn((c-tCount),tCount);
						}
						tCount = 1;
						preClass = tClass;
					}
				}
				if(tCount >= 3){
					o.seriesIn((c-tCount),tCount);
				}
				tCount = 1;
				preClass = '';
			}
			o.clear();
		};
		//标记
		o.seriesIn = function(s,count){
			for(var j = s;j < (s+count);j++){
				o.mainB.eq(j).addClass(o.cssClear);
				o.mainB.eq(j).children('p').html(count);	//=======html x
			}
		};

		//消除
		o.clear = function(){
			for(var i = (o.row*o.col);i >= 0;i--){
				if(o.mainB.eq(i).hasClass(o.cssClear)){
					console.log(i);
					o.clearFill(o.mainB.eq(i));
				}
			}
		};
		//递归填充
		o.clearFill = function(t){
			var id = t.index() - o.col;
			var className;
			if(id < 0){
				//顶部随机值
				className = 'block b'+o.rd(o.colorLen-1);
				t.attr('class',className);
				return className;
			}else{
				//循环填空
				var p = o.mainB.eq(id);
				if(p.hasClass(o.cssClear)){
					className = o.clearFill(p);
				}else{
					className = o.mainB.eq(id).attr('class');
				}
				o.mainB.eq(id).addClass(o.cssClear);
				t.attr('class',className);
				return className;
			}
		};
		//====================事件 END====================


		//==================初始化==================
		o.initVariable = function(){
			o.main = c.main ? $("#"+c.main) : $("#miracle");	//主容器
			//o.initBlock();
			o.mainB = o.main.children('.block');	//单元格
			o.series();

			o.mainB.on('click',o.bClick);
		};
		//生成单元格
		o.initBlock = function(){
			//html
			var html = '';
			var cid;
			for(var i = 0;i < (o.col * o.row);i++){
				cid = o.rd(o.colorLen-1);
				html += '<div class="block b'+cid+'"><p></p></div>';
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

		//返回字符串以 ‘ ’ 分隔的最后一个值
		o.getLastClass = function(classes){
			var arrClass = classes.split(' ');
			return arrClass[arrClass.length-1];
		};

		o.initVariable();
		return o;
	}
};
