//购物车
    var headerShopping = document.getElementById("headerShopping");
    var headerShoppingShow = document.getElementById("headerShopping-show");
//function animate(headerShoppingShow,attr,target,duration){
//    var begin=utils.getCss(headerShoppingShow,attr);//起点就是当前元素的坐标（CSS规定的静态坐标）
//    var change=target-begin;
//    var times=0;
//    var interval=15;
//
//    function step(){
//        times+=interval;
//        if(times<duration){
//            headerShoppingShow.style[attr]=times/duration*change+begin+"px";
//        }else{
//            headerShoppingShow.style[attr]=target+"px";
//            window.clearInterval(timer);
//        }
//    }
//    timer=window.setInterval(step,interval);
//}
  //显示隐藏
    document.body.onmouseover = function(e){
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if(tar.id === "headerShopping" || tar.id === "headerShopping-show" || tar.id ==="x_i" || tar.id ==="x_span" || tar.id ==="x_img"){
            //animate(this,"height",100,1000);
            headerShoppingShow.style.display = "block";
        }else{
            headerShoppingShow.style.display = "none";
        }
    };

//选项卡
var frameTab = document.getElementById("frame-tab");
var tabLi = frameTab.getElementsByTagName("li");
var frameTabDiv = document.getElementById("frameTabDiv");
var frameTabUl = frameTabDiv.getElementsByTagName("ul");
//让所有的li和div都清空选中的样式
function tabChange(n) {
    for (var i = 0; i < tabLi.length; i++) {
        tabLi[i].className = null;
        frameTabUl[i].className = null;
    }
    //让当前滑过的li和div有选中样式
    tabLi[n].className = "frame-select";
    frameTabUl[n].className = "frameRight-select";
}
for(var i =0; i< tabLi.length;i++){
    tabLi[i].tab = i;
    tabLi[i].onmouseover = function(){
        tabChange(this.tab);
    }
}

//for (var i = 0; i < oBtn.length; i++) {
//    oBtn[i].onclick = (function (i) {
//        return function () {
//            document.body.style.backgroundColor = ary[i];
//        }
//    })(i);
//}
