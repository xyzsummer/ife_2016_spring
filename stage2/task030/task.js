
/*
*等待DOM元素加载完成后开始运行下列函数
 */


window.onload = function(){

    var tag = document.getElementById("button");
    var input = document.getElementsByClassName("message");    //获取所有输入框的内容
    var information = document.getElementsByClassName("information");    //获取信息栏的内容
    var button = document.getElementById("button");
    var inputdata = ['必填，长度为4-16个字符', '6到16位数字和字母', '再次输入相同密码', 'example@test.com', '请输入11位手机号码'];
    var flag = true;

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
     * 验证表单的函数
     */
    function validate(index){
        var content = input[index].value.trim();

        if(content.length == 0){
            input[index].style.borderColor = "red";
            information[index].style.innerHTML = "输入不能为空";
            information[index].style.color = "red";
        }

        if(index == 0){
            var len = content.replace(/[^\x00-\xff]/g, 'aa').length;  //将所有中文字符用aa代替，然后计算字符串的长度
            console.log(len)
            if(len >=4 && len <= 16){      //如果字符串长度满足要求
                input[index].style.borderColor = "lightgreen";
                information[index].innerHTML = "名称可用";
                information[index].style.color = "lightgreen";
            } else{
                input[index].style.borderColor = "red";
                information[index].innerHTML = "请检查名称字符数";
                information[index].style.color = "red";
                flag = false;
            }
        }
        if(index == 1){
            if (content.match(/^[a-zA-Z0-9]{6,16}$/)) {
                input[index].style.borderColor = "lightgreen";
                information[index].innerHTML = "密码可用";
                information[index].style.color = "lightgreen";
            } else {
                input[index].style.borderColor = "red";
                information[index].style.color = "red";
                information[index].innerHTML = '请输入6到16位字符且只能为数字和字母';
                flag = false;
            }
        }
        if(index == 2){
            if (content === input[1].value.trim()) {
                input[index].style.borderColor = "lightgreen";
                information[index].innerHTML = "密码可用";
                information[index].style.color = "lightgreen";
            } else {
                input[index].style.borderColor = "red";
                information[index].style.color = "red";
                information[index].innerHTML = '两次密码输入要相同';
                flag = false;
            }
        }
        if(index == 3){
            if(content.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/i)){
                input[index].style.borderColor = "lightgreen";
                information[index].innerHTML = "邮箱可用";
                information[index].style.color = "lightgreen";
            } else{
                input[index].style.borderColor = "red";
                information[index].style.color = "red";
                information[index].innerHTML = '邮箱格式错误';
                flag = false;
            }
        }
        if(index == 4){
            if(content.match(/^1\d{10}$/)){
                input[index].style.borderColor = "lightgreen";
                information[index].innerHTML = "手机可用";
                information[index].style.color = "lightgreen";
            } else{
                input[index].style.borderColor = "red";
                information[index].style.color = "red";
                information[index].innerHTML = '手机格式错误';
                flag = false;
            }
        }
    };


    for(var i = 0, len = input.length; i < len; i++){
        //定义匿名函数，将索引值i传入函数中，从而创造了一个副本index
        //如果不定义匿名函数，//当前函数包含for里面的所有活动对象，每个活动对象访问的都是同一个i,所以只是最后一个值

        /*
         * 获取焦点时触发的事件   focus
         */
        var focusevent = function(index){
            EventUtil.addHandler(input[index],'focus',function(event){
                console.log(index);
                information[index].innerHTML = inputdata[index];
                information[index].style.visibility = "visible";
                information[index].style.color = "#9d9d9d";
                input[index].style.borderColor = "#46b8da"
            })
        };

        /*
         * 失去焦点时触发的事件  blur
         */
        var blurevent = function(index){
            EventUtil.addHandler(input[index],'blur',function(event){
                //失去焦点后，先检查输入内容是否正确
                validate(index);
            })
        };

        focusevent(i);
        blurevent(i);
    }

    /*
     * 验证按钮验证所有表单后提交
     */
    EventUtil.addHandler(button,'click',function(event){
        for(i = 0, len = input.length; i < len; i++){
            validate(i);
        }
        if(flag){
            alert("校验成功！");
        } else{
            alert("输入有误！");
        }
    });
};