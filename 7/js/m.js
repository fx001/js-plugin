var Miracle={
	creatNew:function(c){
		var o = {};
		//html
		o.blockSuffix = '<div class="cle"></div>';
		o.cssClear = 'blockClear';	//被清除时的样式
		o.cssClick = 'blockClick';	//被点击时的样式
		//类属性
		o.row =	12;	//行数
		o.col =	8;	//列数
		o.count = o.row*o.col
		o.colorLen = 5;	//元素样式数量
		o.blockActive = -1;	//当前活动元素索引值


		//====================事件====================
		//单元格点击事件
		o.bClick = function(){
			var preBlock,isClear;
			var _t = $(this);
			var index = _t.index();
			var	arrIndex = [];	//相邻值
			arrIndex = [
				(index+1),
				(index-1),
				(index+o.col),
				(index-o.col),
			];
			_t.addClass(o.cssClick);
			if(o.blockActive >= 0){
				//判断是否为相邻值
				if(arrIndex.indexOf(o.blockActive) >= 0){
					preBlock = o.mainB.eq(o.blockActive);
					o.changeClass(_t,preBlock);
					//判断是否有消除标记
					isClear = o.series(_t,preBlock);
					if(isClear > 0){
						o.bListenClear(isClear);
						o.cancle();
					}else{
						setTimeout(function(){
							o.changeClass(_t,preBlock);
							o.cancle();
						},500);
					}
				}else{
					o.cancle();
				}
			}else{
				o.blockActive = index;
			}
		};

		//还原样式
		o.cancle = function(){
			o.mainB.removeClass(o.cssClick);
			o.blockActive = -1;
		};

		//监听动画结束事件
		o.bListenClear = function(index){
			if(index > 0){
				/*eListener(o.mainB.eq(index)[0],'webkitAnimationEnd',fun = function(){
					o.clear();
					if(index > 0){
						o.bListenClear(o.series());
					}
					eListener(o.mainB.eq(index)[0],'webkitAnimationEnd',fun,1);
				},0);*/
				//监听事件可能无效，暂时使用 setTimeout
				setTimeout(function(){
					o.clear();
					//加短暂延迟，否则填充无视觉效果
					setTimeout(function(){
						o.bListenClear(o.series());
					},10);
				},1000);
			}
		};

		//====================过程方法====================
		//检测连续值并标记
		//参数：t1,t2 - 当前2个活动元素
		//返回：lastIndex 最后一个标记索引值
		o.series = function(t1,t2){
			var start,c,r,step;
			var tClass = '';	//当前class值
			var preClass = '';	//上一个class值
			var tCount = 1;
			var lastIndex = 0;	//最后一个标记索引值
			lastIndex = o.seriesSpecial(t1,t2);
			//横向检索
			for(r = 0;r < o.row;r++){
				start = r * o.col;
				for(c = start;c < (start + o.col);c++){
					tClass = o.getFirstClass(o.mainB.eq(c).attr('class'));
					if(preClass == tClass){
						tCount ++;
					}else{
						lastIndex = o.markIn((c-1),tCount,lastIndex,1);
						tCount = 1;
						preClass = tClass;
					}
				}
				lastIndex = o.markIn((c-1),tCount,lastIndex,1);
				tCount = 1;
				preClass = '';
			}
			//纵向检索
			step = o.col;
			for(c = 0;c < o.col;c++){
				for(r = c;r <= (c + o.count - o.col);(r += step)){
					tClass = o.getFirstClass(o.mainB.eq(r).attr('class'));
					if(preClass == tClass){
						tCount ++;
					}else{
						lastIndex = o.markIn((r-step),tCount,lastIndex,2);
						tCount = 1;
						preClass = tClass;
					}
				}
				lastIndex = o.markIn((r-step),tCount,lastIndex,2);
				tCount = 1;
				preClass = '';
			}
			return lastIndex;
		};

		//检测特殊消除方式
		//参数，返回：与series方法一致
		o.seriesSpecial = function(t1,t2){
			if(t1 == undefined){
				return 0;
			}else{
				var cl,lastIndex = 0;
				var count = arguments.length;
				for(var i = 0;i < count;i++){
					cl = o.getFirstClass(arguments[i].attr('class'));
					switch(cl){
						//整行消除
						case 'b10':
							//计算所在行的结尾索引值
							lastIndex = Math.floor(arguments[i].index()/o.col) * o.col + o.col - 1;
							o.markIn(lastIndex,o.col,lastIndex,1);
							break;
					}
				}
				return lastIndex;
			}
		};

		/*
		说明：写入标记
		参数：s - 索引值(该值为最后一个元素)，count - 数量，last - 传递最后标记值，mode - 标记方式(1 横向，2 纵向)
		返回：最后标记的索引值
		*/
		o.markIn = function(s,count,last,mode){
			if(count >= 3){
				var max,step;
				if(mode == 1){
					max = s-count;
					step = -1;
				}else if(mode == 2){
					max = s-o.col*count;
					step = -o.col;
				}else{
					return false;
				}
				for(var j = s;j > max;j += step){
					//标记特殊元素
					if(count == 4 && j == (max - step)){
						o.mainB.eq(j).attr('class',o.setNewClass(10));
					}else{
						o.mainB.eq(j).addClass(o.cssClear);
						//o.mainB.eq(j).children('p').html(count);	//=======html x
					}
				}
				last = s;
			}
			return last;
		};

		//消除标记并填充
		o.clear = function(){
			for(var i = o.count;i >= 0;i--){
				if(o.mainB.eq(i).hasClass(o.cssClear)){
					o.clearFill(o.mainB.eq(i));
				}
			}
			return true;
		};
		//递归填充
		o.clearFill = function(t){
			var id = t.index() - o.col;
			var className;
			if(id < 0){
				//顶部随机值
				className = o.setNewClass();
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
		//====================过程方法 END====================


		//==================初始化==================
		o.init = function(){
			o.main = c.main ? $("#"+c.main) : $("#miracle");	//主容器
			o.initBlock();
			o.mainB = o.main.children('.block');	//单元格
			o.bListenClear(o.series());	//标记+清除

			o.mainB.on('click',o.bClick);
		};
		//生成单元格
		o.initBlock = function(){
			//html
			var html = '';
			for(var i = 0;i < o.count;i++){
				html += '<div class="'+o.setNewClass()+'"><p></p></div>';
			}
			o.main.html(html);
			o.main.append(o.blockSuffix);
			//样式
			var d = o.main.find('.block p');
			d.height(d.width());
		};
		//==================初始化 END==================

		//====================辅助函数====================
		//交换2个容器的class值
		o.changeClass = function(t1,t2){
			var tp;
			tp = t1.attr('class');
			t1.attr('class',t2.attr('class'));
			t2.attr('class',tp);
		};

		//返回一个元素的初始class值
		//参数：n - 数字:样式编号,null:随机值
		o.setNewClass = function(n){
			var className;
			if(n >= 0){
				className = 'b'+n+' block';
			}else{
				className = 'b'+o.rd(o.colorLen-1)+' block';
			}
			return className;
		};

		//====================系统函数====================
		//生成随机数
		//n 上限
		o.rd = function(n){
			m = 0;	//下限
			return parseInt(Math.random() * (n - m + 1) + m);
		};

		//返回字符串以 ‘ ’ 分隔的第一个值
		o.getFirstClass = function(classes){
			var arrClass = classes.split(' ');
			return arrClass[0];
		};

		return o;
	}
};

//el - js dom
function eListener(el,event,fun,remove){
	if(remove == "1"){
		el.removeEventListener(event,fun);
	}else{
		el.addEventListener(event,fun);
	}
}