/*下面是实现轮播图的具体的业务逻辑*/
~function () {
    var dataAry = ["image/T1kEd_BvDv1RXrhCrK1.jpg", "image/T1kPx_ByWv1RXrhCrK2.jpg", "image/T1IOb_BbKT1RXrhCrK3.jpg", "image/T1EmW_BCEv1RXrhCrK4.jpg", "image/T1lVh_ByJv1RXrhCrK5.jpg"];

    //获取所需要的元素
    var banner = document.getElementById("homeBanner");
    var bannerImg = document.getElementById("homeBannerImg");
    var bannerTip = document.getElementById("bannerTip");
    var bannerLeft = document.getElementById("bannerLeft");
    var bannerRight = document.getElementById("bannerRight");
    var divList = bannerImg.getElementsByTagName("div");
    var bannerTipList = bannerTip.getElementsByTagName("li");
    //计算当前bannerImg的宽度和位置
    var bannerW = banner.clientWidth, totalW = (dataAry.length + 2) * bannerW, count = dataAry.length + 2;
    utils.setGroupCss(bannerImg, {
        width: totalW,
        left: -bannerW
    });

    //初始化绑定数据
    var initData = function () {
        var str = "";
        str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'></div>";
        for (var i = 0; i < dataAry.length; i++) {
            str += "<div trueImg='" + dataAry[i] + "'></div>";
        }
        str += "<div trueImg='" + dataAry[0] + "'></div>";
        bannerImg.innerHTML = str;

        str = "";
        for (i = 0; i < dataAry.length; i++) {
            var cName = i === 0 ? "select" : "";
            str += "<li class='" + cName + "'></li>";
        }
        bannerTip.innerHTML = str;
    };
    initData();

    //图片延迟加载
    var initAsyncImg = function () {
        for (var i = 0; i < divList.length; i++) {
            ~function (i) {
                var curDiv = divList[i];
                if (!curDiv.isLoad) {
                    var oImg = new Image;
                    oImg.src = curDiv.getAttribute("trueImg");
                    oImg.onload = function () {
                        curDiv.appendChild(oImg);
                        curDiv.isLoad = true;
                    };
                }
            }(i);
        }
    };
    window.setTimeout(initAsyncImg, 500);

    //实现焦点对齐
    var setTip = function (index) {
        index < 0 ? index = bannerTipList.length - 1 : null;
        index >= bannerTipList.length ? index = 0 : null;
        for (var i = 0; i < bannerTipList.length; i++) {
            bannerTipList[i].className = i === index ? "select" : null;
        }
    };

    //实现图片的切换
    var step = 1;
    var move = function (dir) {
        if (typeof dir === "undefined" || dir === "right") {
            step++;
            if (step >= count) {
                utils.css(bannerImg, "left", -1 * bannerW);
                step = 2;
            }
        } else if (dir === "left") {
            step--;
            if (step < 0) {
                utils.css(bannerImg, "left", -(count - 2) * bannerW);
                step = 3;
            }
        } else if (dir === "tip") {
            step = this.index + 1;
        }
        animate(bannerImg, {left: -step * bannerW}, 500, 1);
        setTip(step - 1);
    };

    //实现自动轮播
    bannerImg.autoTimer = window.setInterval(move, 5000);

    //鼠标滑过显示左右切换
    banner.onmouseenter = function () {
        window.clearInterval(bannerImg.autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    };
    banner.onmouseleave = function () {
        bannerImg.autoTimer = window.setInterval(move, 5000);
        bannerLeft.style.display = bannerRight.style.display = "none";
    };

    //左右切换
    bannerLeft.onclick = function () {
        move("left");
    };
    bannerRight.onclick = function () {
        move("right");
    };

    //实现焦点点击切换
    for (var i = 0; i < bannerTipList.length; i++) {
        bannerTipList[i].index = i;
        bannerTipList[i].onclick = function () {
            move.call(this, "tip");
        };
    }
}();
