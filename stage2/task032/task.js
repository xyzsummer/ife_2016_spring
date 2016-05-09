
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

//以构造函数的模式创建表单对象，并赋给表单一些规则方法
function form(name,type,fun,rules,success,fail){
    this.label = name;
    this.type = type;
    this.validator = fun;
    this.rules = rules;
    this.success = success;
    this.fail = fail;
    this.result = true;
    this.content = "";    //输入框的内容先默认为空
}
form.prototype.err = "输入不能为空";
form.prototype.flag = true;                  //全局验证表单时的标志位
form.prototype.validate = function(content){
    if(content.length == 0){
        return false;
    }else{
        return true;
    }
};
/*
var nameRules = ["名称不能为空","请检查名称字符数"];
var passwordRules = ["密码不能为空","请输入6到16位字符且只能为数字和字母"];
var againRules = ["再次输入密码不能为空","两次密码输入要相同"];
var emailRules = ["邮箱不能为空","邮箱格式错误"];
var phoneRules = ["shu"];
*/

var check = {
    checkName: function(){
        var len = this.content.replace(/[^\x00-\xff]/g, 'aa').length;  //将所有中文字符用aa代替，然后计算字符串的长度
        if(len >=4 && len <= 16){      //如果字符串长度满足要求
            this.result = true;
        } else{
            this.result = false;
        }
    },
    checkPassword : function(){
        if (this.content.match(/^[a-zA-Z0-9]{6,16}$/)) {
            this.result = true;
        } else {
            this.result = false;
        }
    },
    checkAgain : function(){
        if (this.content === passwordInput.content) {                  //再次验证密码
            this.result = true;
        } else {
            this.result = false;
        }
    },
    checkEmail : function(){
        if(this.content.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/i)){
            this.result = true;
        } else{
            this.result = false;
        }
    },
    checkPhone : function(){
        if(this.content.match(/^1\d{10}$/)){
            this.result = true;
        } else{
            this.result = false;
        }
    }
};


var nameInput=new form("name","text",check.checkName,"必填，长度为4~16个字符","名称可用","请检查名称字符数");
var passwordInput=new form("password","password",check.checkPassword,"6到16位数字和字母，只允许输入英文字母和数字","密码可用","请输入6到16位字符且只能为数字和字母");
var againInput=new form("passwordAgain","password",check.checkAgain,"再次输入相同密码","密码可用","两次密码输入要相同");
var emailInput=new form("email","text",check.checkEmail,"example@test.com","邮箱可用","邮箱格式错误");
var phoneInput=new form("phone","text",check.checkPhone,"请输入11位手机号码","手机可用","手机格式错误");

var convertobj = {
  "名称":  nameInput,
    "密码":  passwordInput,
    "密码确认":  againInput,
    "邮箱":  emailInput,
    "手机":  phoneInput,
};

//给所有的表单添加焦点，失焦事件
function validateAll(resultAll){
    for(var index = 0, len = resultAll.length; index < len; index++){

        var addEvent = function(i){
            var nameContent = resultAll[i].name;
            var obj = convertobj[nameContent];     //获取当前文本框对应的对象
            var nextnode = resultAll[i].nextSibling;

            EventUtil.addHandler(resultAll[i],'focus',function(event){
                nextnode.innerHTML = obj.rules;
                nextnode.style.visibility = "visible";
                nextnode.style.color = "#9d9d9d";
                resultAll[i].style.borderColor = "#46b8da"
            });

            EventUtil.addHandler(resultAll[i],'blur',function(event){
                //失焦后再验证内容是否符合要求
                var content = resultAll[i].value;
                obj.content = content;
                //先进行全局验证
                if(obj.validate(content) == false){
                    obj.fail = obj.err;
                    obj.result = false;
                }
                else{
                    //再详细验证
                    obj.validator( );
                }
                if(obj.result == true){   //如果验证通过
                    nextnode.style.borderColor = "lightgreen";
                    nextnode.innerHTML = obj.success;
                    nextnode.style.color = "lightgreen";
                }else{
                    resultAll[i].style.borderColor = "red";
                    nextnode.style.color = "red";
                    nextnode.innerHTML = obj.fail;
                }
            });
        };

        addEvent(index);
    }
}


/*
*等待DOM元素加载完成后开始运行下列函数
 */

window.onload = function(){

    var choose = document.getElementsByClassName("choose");    //获取不同的选择按钮

    var result = document.getElementById("result");     //获得输出结果
    var selectAll = document.querySelectorAll("#select input");
    var button = document.getElementById("button");

    /*
     * 不同的选择框的按钮代表不同的样式输出
     * */
    for(var i = 0, len = choose.length; i < len; i++){
        var styleOutput = function(index){
            EventUtil.addHandler(choose[index],'click',function(event){

                //检查当前需要生成多少的表单
                result.innerHTML = null;
                var str = "";
                //在生成表单文本的时候创建表单对象
                var fromList = [];
                for(var i = 0, len = selectAll.length, j = 0; i < len; i++){
                    if(selectAll[i].checked == true){
                        str += '<section><label>' + selectAll[i].value + '</label><input class="message "  type="' + selectAll[i].name
                            + '" name="'+ selectAll[i].value+'" /><p class="information">' + '</p></section>';    //填入内容
                    }
                }
                result.innerHTML = str;

                var resultAll = document.querySelectorAll("#result input");

                //不同的样式，表单渲染显示的结果不同，可通过增加移出类名
                if(index == 0){
                    choose[1].checked = false;    //另一个按钮处于没有选中的状态
                    for( i = 0, len = resultAll.length; i < len; i++){
                        resultAll[i].className = resultAll[i].className.replace(new RegExp( "(\\s|^)style(\\s|$)" )," " );  //移除样式
                    }
                } else if(index == 1){
                    choose[0].checked = false;
                    for( i = 0, len = resultAll.length; i < len; i++){
                        resultAll[i].className = resultAll[i].className + " style";  //增加样式
                    }
                }

                //为各个表单增加验证样式
                validateAll(resultAll);

            });
        }
        styleOutput(i);
    }


    EventUtil.addHandler(button,'click',function(event){
        var resultAll = document.querySelectorAll("#result input");

        for(var index = 0, len = resultAll.length; index < len; index++){
            var validateAll = function(i){
                var nameContent = resultAll[i].name;
                var obj = convertobj[nameContent];     //获取当前文本框对应的对象
                var nextnode = resultAll[i].nextSibling;

                var content = resultAll[i].value;
                obj.content = content;
                //先进行全局验证
                if(obj.validate(content) == false){
                    obj.fail = obj.err;
                    obj.result = false;
                }
                else{
                    //再详细验证
                    obj.validator( );
                }
                if(obj.result == true){   //如果验证通过
                    nextnode.style.borderColor = "lightgreen";
                    nextnode.innerHTML = obj.success;
                    nextnode.style.color = "lightgreen";
                }else{
                    resultAll[i].style.borderColor = "red";
                    nextnode.style.color = "red";
                    nextnode.innerHTML = obj.fail;
                    form.prototype.flag = false;                    //如果验证不通过，就将全局的标志位置为false
                }
                nextnode.style.visibility = "visible";
            }
            validateAll(index);
        }
        if(form.prototype.flag == true){
            alert("验证通过！");
        }else{
            alert("输入错误！");
        }
    });

};