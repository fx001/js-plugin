var Room={
	creatNew:function(c){
		var o = {};

		//�����ʼ��
		o.childrenInit = function(){
			//o.children = o.main.children('.room');
			o.children = $('.room');
			var c = o.children.length;
			var t;
			for(var i=0;i<c;i++){
				t = o.children.eq(i);
				//���ÿ��
				t.width(t.data('w')*o.proportion);
				t.height(t.data('h')*o.proportion);
				//��������
				t.children('.ruler_w').children('.num').html(t.data('w'));
				t.children('.ruler_h').children('.num').html(t.data('h'));
			}
		};

		//���㴹ֱ��߸߶�
		o.rulerSize = function(){
			var rulerH = $('.ruler_h');
			var c = rulerH.length;
			var h,t;
			for(var i=0;i<c;i++){
				h = rulerH.eq(i).parent().height();
				t = parseInt(h*0.48);
				rulerH.eq(i).height(h-t);
				rulerH.eq(i).css('padding-top',t);
			}
		};

		//o.

		o.initVariable = function(){
			o.main = c.main ? $("#"+c.main) : $("#room");	//������ main
			//�������
			o.proportion = o.main.width()/o.main.data('w');
			//o.main.height(o.main.data('h')*o.proportion);
			
			o.childrenInit();
			o.rulerSize();

			//console.log(o.children.height());
		};
		o.initVariable();
		return o;
	}
};
