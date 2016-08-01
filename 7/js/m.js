var Miracle={
	creatNew:function(c){
		var o = {};
		//html
		o.blockSuffix = '<div class="cle"></div>';
		o.cssClear = 'blockClear';	//被清除时的样式
		o.cssClick = 'blockClick';	//被点击时的样式
		//类属性
		o.row =	4;	//行数
		o.col =	8;	//列数
		o.count = o.row*o.col
		o.colorLen = 4;	//元素样式数量
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
			if(!_t.hasClass(o.cssClick)){
				_t.attr('class',o.cssClick+' '+_t.attr('class'));
			}
			if(o.blockActive >= 0){
				//判断是否为相邻值
				if(arrIndex.indexOf(o.blockActive) >= 0){
					preBlock = o.mainB.eq(o.blockActive);
					o.changeClass(_t,preBlock);
					//判断是否有消除标记
					isClear = o.series();
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

		//交换2个容器的class值
		o.changeClass = function(t1,t2){
			var tp;
			tp = t1.attr('class');
			t1.attr('class',t2.attr('class'));
			t2.attr('class',tp);
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
		//返回：lastIndex 最后一个标记索引值
		o.series = function(){
			var start,c,r,step;
			var tClass = '';	//当前class值
			var preClass = '';	//上一个class值
			var tCount = 1;
			var lastIndex = 0;	//最后一个标记索引值
			//=============================================go to 特殊元素消除
			//横向检索
			for(r = 0;r < o.row;r++){
				start = r * o.col;
				for(c = start;c < (start + o.col);c++){
					tClass = o.getLastClass(o.mainB.eq(c).attr('class'));
					if(preClass == tClass){
						tCount ++;
					}else{
						lastIndex = o.seriesIn((c-1),tCount,lastIndex,1);
						tCount = 1;
						preClass = tClass;
					}
				}
				lastIndex = o.seriesIn((c-1),tCount,lastIndex,1);
				tCount = 1;
				preClass = '';
			}
			//纵向检索
			step = o.col;
			for(c = 0;c < o.col;c++){
				for(r = c;r <= (c + o.count - o.col);(r += step)){
					tClass = o.getLastClass(o.mainB.eq(r).attr('class'));
					if(preClass == tClass){
						tCount ++;
					}else{
						lastIndex = o.seriesIn((r-step),tCount,lastIndex,2);
						tCount = 1;
						preClass = tClass;
					}
				}
				lastIndex = o.seriesIn((r-step),tCount,lastIndex,2);
				tCount = 1;
				preClass = '';
			}
			return lastIndex;
		};
		/*
		说明：写入标记
		参数：s - 索引值(该值为最后一个元素)，count - 数量，last - 传递最后标记值，mode - 标记方式(1 横向，2 纵向)
		返回：最后标记的索引值
		*/
		o.seriesIn = function(s,count,last,mode){
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
					o.mainB.eq(j).addClass(o.cssClear);
					//o.mainB.eq(j).children('p').html(count);	//=======html x
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
		//====================过程方法 END====================


		//==================初始化==================
		o.init = function(){
			o.main = c.main ? $("#"+c.main) : $("#miracle");	//主容器
			//o.initBlock();
			o.mainB = o.main.children('.block');	//单元格
			o.bListenClear(o.series());	//标记+清除

			o.mainB.on('click',o.bClick);
		};
		//生成单元格
		o.initBlock = function(){
			//html
			var html = '';
			var cid;
			for(var i = 0;i < o.count;i++){
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