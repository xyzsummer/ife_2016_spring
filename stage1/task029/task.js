
/*
*等待DOM元素加载完成后开始运行下列函数
 */


window.onload = function(){

    var tag = document.getElementById("button");

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
     * 计算数组长度
     */
    function getLength(str){
        var realLength = 0;
        var charCode = -1;
        for(var i = 0, len = str.length; i< len; i++){
            charCode = str.charCodeAt(i);    //取得当前的字符
            if(charCode >=0 && charCode <= 128){
                realLength += 1;
            }else{
                //如果是UTF-8编码的话，并且是中文的话，长度为3
                realLength += 2;
            }
        }
        return realLength;
    }

    //给输入文本框添加键盘程序，用户释放键盘时触发事件
    EventUtil.addHandler(tag , "click", function(event){
        //传入event事件
        var mesg = document.getElementById("message");   //获取输入框的数据
        var information = document.getElementById("information");
        var message = mesg.value;    //获得输入框的内容
        console.log(message);
        var length = getLength(message);   //获取当前字符串的长度
        console.log(length);
        if(length == 0){
            information.innerHTML = "姓名不能为空";
            information.style.color = "red";
            mesg.style.borderColor = "red";
        } else if( length >= 4 && length <= 16){    //如果字符数量是在4到16个之间
            information.innerHTML = "格式正确";
            information.style.color = "lightgreen";
            mesg.style.borderColor = "lightgreen";
        } else{
            information.innerHTML = "格式错误";
            information.style.color = "red";
            mesg.style.borderColor = "red";
        }
    });


};