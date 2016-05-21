/**
 * Created by XYZ on 2016/5/16.
 */


/*
* 2048游戏的思想应该是先将所有数据进行合并，然后将空格消除
* */

function leftCode(a){
    var i, j, k;

    for ( i = 0; i < 4; i++){
        //先进行合并
        for ( j = 0; j < 3; j++){
            if (a[i][j] != 0 && a[i][j] == a[i][j + 1]){
                a[i][j] += a[i][j + 1];
                a[i][j + 1] = 0;
            }
        }

        //合并完成后清除空格
        for ( j = 0; j < 4; j++){
            k = j;
            if (a[i][k] == 0){
                while ( k<4 && a[i][k] == 0)
                {
                    k++;
                }
                if (k != 4){
                    a[i][j] = a[i][k];
                    a[i][k] = 0;
                }
            }
        }
    }
}




function rightCode(a){
    var i,  j, k;
    for ( i = 0; i < 4; i++){
        //先进行合并
        for ( j = 3; j >= 1; j--){
            if (a[i][j] != 0 && a[i][j] == a[i][j - 1]){
                a[i][j] += a[i][j - 1];
                a[i][j - 1] = 0;
            }
        }

        //合并完成后清除空格
        for ( j = 3; j >=0 ; j--){
            k = j;
            if (a[i][k] == 0){
                while ( k>=0 && a[i][k] == 0)
                {
                    k--;
                }
                if (k != -1){
                    a[i][j] = a[i][k];
                    a[i][k] = 0;
                }
            }
        }
    }
}

function upCode(a){
    var i, j, k;
    for ( i = 0; i < 4; i++){
        for ( j = 0; j < 3; j++){
            if (a[j][i] != 0 && a[j][i] == a[j + 1][i]){
                a[j][i] += a[j + 1][i];
                a[j + 1][i] = 0;
            }
        }

        for ( j = 0; j < 4; j++){
            k = j;
            if (a[k][i] == 0){
                while ( k < 4  && a[k][i] == 0){
                    k++;
                }
                if (k != 4){
                    a[j][i] = a[k][i];
                    a[k][i] = 0;
                }
            }
        }
    }
}


function downCode(a){
    var i, j, k;
    for ( i = 0; i < 4; i++){
        for ( j = 3; j >= 1; j--){
            if (a[j][i] != 0 && a[j][i] == a[j - 1][i]){
                a[j][i] += a[j - 1][i];
                a[j - 1][i] = 0;
            }
        }

        for ( j = 3; j >= 0; j--){
            k = j;
            if (a[k][i] == 0){
                while ( k >= 0 && a[k][i] == 0){
                    k--;
                }
                if (k != -1){
                    a[j][i] = a[k][i];
                    a[k][i] = 0;
                }
            }
        }
    }
}



var data = [];                  //data是二维数组，用于添加各个栅格中的内容，初始化各个栅格中的数值为0
var  color = ['lightcyan','#c1e2b3','#c9e2b3','#b2dba1','#c1e2b3','#ecc850','#eea236','#f59563','#d58512','#ce8483','#c12e2a'];


//初始化数据结果，显示正确地结果
function initData(){
    for(var i = 0;i<4;i++){
        data[i] = data[i] || [];
        for(var j=0;j<4;j++){
            data[i][j] = 0;
        }
    }
}

//渲染输出的结果
function renderResult(div){
    var p;
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            if(data[i][j] !== 0){
                p = i * 4 + j;        //返回其的位置
                if(!div.eq(p).hasClass("active")){   //如果已经含有这个类的话就不需要添加
                    div.eq(p).addClass("active");
                }
                div.eq(p).html(data[i][j]);         //初始化生成的数据

                //根据当前数值的不同，栅格显示的背景颜色也不同
                var index = Math.log2(data[i][j]);
                div.eq(p).css({
                    backgroundColor:color[index - 1],
                });

            } else{
                //如果值为0的话，就只需要将结果变空
                p = i * 4 + j;
                div.eq(p).css({
                    backgroundColor:""
                });
                if(div.eq(p).hasClass("active")){         //如果一开始有数值的话需要变化清空,如果没有值的话就不需要变化
                    div.eq(p).removeClass("active");
                    div.eq(p).html("");
                }
            }
        }
    }
}

function renderTishi(tishi,div,str){

    tishi.html(str);
    start = false;
    tishi.css({
        display : 'block',
    });
    for(var i = 0; i < 16; i ++){
        div.eq(i).removeClass("active");     //去除标志
        div.eq(i).html("");                   //将内容清空
    }

}



var start = false;

//等待DOM加载完成后才能够处理
$(function(){

    var con = document.getElementsByClassName("con");
    var container = $(".container");
    var div = $(".col-lg-3");

    var tishi = $(".tishi");    //提示框



//添加点击开始事件
    tishi.on('click',function(){
        if(start==false)
        {
            initData();
            tishi.css({
                display:"none"
            });
            start=true;
            //随机在两个不同的容器中初始化生成2，一共16个容器，利用随机数在任意两个中初始化值
            var p1=0;
            var p2=0;
            while(p1===p2){
                p1=Math.floor(Math.random()*16);
                p2=Math.floor(Math.random()*16);
            }
            var i = parseInt(p1 / 4);
            var j = p1 % 4;            //第一个随机数的值
            data[i][j] = 2;

            i = parseInt(p2 / 4);
            j = p2 % 4;              //第二个随机数\
            data[i][j] = 4;

            renderResult(div);
        }
    });




    $(window).on('keydown',function(event){

        event = event?event:window.event;
        var code = event.keyCode;

        if(start)
        {
            if(code <= 40 && code >= 37)     //如果按键是上下左右这四个键的话，才可以运行程序
            {
                switch(code){
                    case 37: leftCode(data); break;      //左箭头的程序
                    case 38: upCode(data); break;     //上箭头的程序
                    case 39: rightCode(data); break;     //右箭头的程序
                    case 40: downCode(data); break;     //下箭头的程序
                }
                //每按下一个键后需要判断是否是已经到达2048，如果已经达到的话，就可以退出

                if(data[0].indexOf(2048) !== -1|| data[1].indexOf(2048) !== -1|| data[2].indexOf(2048) !== -1|| data[3].indexOf(2048) !== -1){
                    renderTishi(tishi,div,'You Win!点击重新开始');
                }
                else if(data[0].indexOf(0) === -1 && data[1].indexOf(0) === -1 && data[2].indexOf(0) === -1 && data[3].indexOf(0) === -1)
                {
                    renderTishi(tishi,div,'挑战失败!点击重新开始');
                }
                else{
                    var p = Math.floor(Math.random()*16);    //生成一个数据
                    var i = parseInt(p / 4);
                    var j = p % 4;            //第一个随机数的值
                    while( data[i][j] !== 0){        //当前没有生成数据
                        p = Math.floor(Math.random()*16);    //生成一个数据
                        i = parseInt(p / 4);
                        j = p % 4;
                    }
                    data[i][j] = 2;
                    renderResult(div);
                }
            }
        }

    });

});
