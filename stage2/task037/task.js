
/*
 * 兼容浏览器
 * */
var EventUtil = {
    addHandler : function(element,type,handler){
        if(element.addEventListener) {
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent) {
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type] = handler;
        }
    },

    getEvent : function(event){
        return event ? event : window.event;    //IE和DOM在event对象的处理方式上不同
    }
};




/*
*等待DOM元素加载完成后开始运行下列函数
 */

window.onload = function(){

    var emerge = document.getElementById("emerge");      //浮出层
    var mask = document.getElementById("mask");
    var topmask = document.getElementById("topmask");
    var cancel = document.getElementById("cancel");

    //点击弹出浮出层的程序
    EventUtil.addHandler(emerge,'click',function(event){
        topmask.style.height = document.documentElement.clientHeight;   //获得当前客户区的大小
        topmask.style.display = "block";
        mask.style.display = "block";
    });

    //点击别的地方，清除浮出层的程序,浮出层别的地方点击
    EventUtil.addHandler(topmask,'click',function(event){
        topmask.style.display = "none";
        mask.style.display = "none";
    });

    //点击别的地方，清除浮出层的程序,浮出层别的地方点击
    EventUtil.addHandler(cancel,'click',function(event){
        topmask.style.display = "none";
        mask.style.display = "none";
    });
};