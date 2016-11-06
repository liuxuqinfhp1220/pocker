$(function(){
  //开始
  $('#st').on('mousedown',false);
  $('#st').on('click',function(){
        $('.bg').animate({opacity:1},function(){
         $('.bg').css('display','block');
      })
  })
  //生成纸牌
  function makepoker(){
    //声明一个poker空数组用于存放纸牌poker[{},{},{}]
     var poker=[];
     //colors用来存放纸牌的花色
     var colors=['h','c','d','s'];
     //tab用来判断纸牌是否存在
     var tab={};
     while(poker.length!==52){
       var c=colors[Math.floor(Math.random()*4)];
       var n=Math.ceil(Math.random()*13);
       var v={color:c,number:n};
       if(!tab[c+n]){
            tab[c+n]=true;
            poker.push(v);
       }
    }
    return poker;
  }
  //发放纸牌
  function setpoker(poker){
    //dict用来查找
     var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'};
     var index=0;
     for(var i=0;i<7;i++){
        for(var j=0;j<i+1;j++){
            var poke=poker[index];
            index++;
            $('<div>').addClass('pai').attr('data-number',poke.number).attr('id',i+'_'+j).appendTo('.scene').css('backgroundImage','url(./image/'+dict[poke.number]+poke.color+'.png)').delay(index*20).animate({top:i*40,left:j*140+(6-i)*70,opacity:1});
       }
     }
     for(;index<poker.length;index++){
         var fv=poker[index];
         $('<div>').addClass('pai left').attr('data-number',fv.number).appendTo('.scene').css('backgroundImage','url(./image/'+dict[fv.number]+fv.color+'.png)').delay(index*20).animate({top:430,left:140,opacity:1});
   }
  }
  //开始游戏
  var time=$('#time span').text();
  var grade=$('#score span').text();
  var fl=true;
  $('#start').on('mousedown',false);
  $('#start').on('click',function(){
   if(fl){
       setpoker(makepoker());
       var t=setInterval(function(){
        time++;
        if(time<10){
          $('#time span').text('0'+time);
        }else{
          $('#time span').text(time);
        }
       },1000)
       fl=false;
   }
   //结束游戏
    $('#end').on('click',function(){
     $('#time span').text('0');
     $('#score span').text('0');
     clearInterval(t);
     time=0;
     grade=0;
     $('.pai').each(function(i,v){
        $(this).animate({left:425,top:0}).queue(function(){
             $(this).detach();
        });
     });
     fl=true;
  })
  })
  $('#end').on('mousedown',false);
  //退出
  $('#exit').on('mousedown',false);
  $('#exit').on('click',function(){
     $('#time span').text('0');
     $('#score span').text('0');
     time=0;
     grade=0;
      $('.bg').animate({opacity:0},function(){
        $('.bg').css('display','none');
      });
  })
   var rr=$('.btn .bright');
   var ind=1;
   var ll=$('.btn .bleft');
   rr.on('mousedown',false);
   ll.on('mousedown',false);
   //右击按钮
   var flag=true;
   rr.on('click',rbtn)
   function rbtn(){
   	if($('.left').length){
      $('.left').last().css('marginTop',0);
      flag=false;
   		$('.left').last().css('zIndex',ind++).queue(function(){
   			$(this).removeClass('left').addClass('right');
   			$(this).dequeue();
   		}).animate({left:700})
   	}   
   }
//左击按钮
   ll.on('click',lbtn)
   function lbtn(){
   	  if($('.left').length)  
   	  	{
   	  		return;
   	  	}
   	  $('.right').css('zIndex',1);
   	  $('.right').each(function(i){
   	  	  $('.right').last().queue(function(){
   	  	  	     $(this).removeClass('right').addClass('left').delay(i*150);
   	  	  	     $(this).dequeue();
   	  	  }).animate({left:140})
   	  })

   }
//判断纸牌是否能点击
function  isable(el){
    var x=parseInt(el.attr('id').split("_")[0]);
    var y=parseInt(el.attr('id').split("_")[1]);
    if($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length){
    	return false;
    }else{
    	return true;
    }
  }
  //点击纸牌
   var prev=null;
   $('.scene').on('click','.pai',function(){
   	 if($(this).attr('id')&&!isable($(this))){
   	 	   return;
   	 }
     //一次取到13
     if($(this).attr('data-number')==13){

      $(this).animate({marginTop:-20},function(){
     	$(this).animate({left:800,top:0}).queue(function(){
     		$(this).detach().dequeue();
        grade++;
        if(grade<10){
          $('#score span').text('0'+grade);
        }else{
          $('#score span').text(grade);
        }
     	})
      });
     	return;
     }     	  
     	//二次取到非13
      $(this).animate({marginTop:-20},function(){
     	if(prev&&flag){
     	   var dn=parseInt($(this).attr('data-number'));
     	   var pn=parseInt(prev.attr('data-number'));
     	   if(dn+pn==13){
     	   	   prev.add(this).stop().animate({left:800,top:0}).queue(function(){
     		              $(this).detach().dequeue();
     	       })
             grade++;
        if(grade<10){
          $('#score span').text('0'+grade);
        }else{
          $('#score span').text(grade);
        }
           }else{
                prev.add(this).delay(400).animate({marginTop:0})
             }
            prev=null;  
     	}else{
     		//一次取到非13
     		prev=$(this);
        flag=true;
     	}
    })
    })
    $('.total').on('mouseenter mouseleave',function(){
        $('.checkbox').stop();
        $('.checkbox').slideToggle();
    })  
})