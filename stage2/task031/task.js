
/*
*等待DOM元素加载完成后开始运行下列函数
 */


window.onload = function(){

    var student = document.getElementById("student");      //获取在校生按钮
    var no_student = document.getElementById("no_student");   //获取非在校生按钮
    var school = document.getElementById("school");      //获取在校生按钮
    var company = document.getElementById("company");   //获取非在校生按钮
    var city = document.getElementById("city");   //在校生选择城市的按钮
    var university = document.getElementById("university");   //在校生选择大学的按钮

    var data = {                                           //定义各个城市对应的城市
      "北京":["北京大学","清华大学","北京师范大学"],
        "上海": ["复旦大学","上海交通大学","同济大学"],
        "杭州": ["浙江大学","浙江工业大学","杭州电子科技大学"]
    };


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
     * 在校生点击按妞时填出选择框
     */
    EventUtil.addHandler(student,'click',function(event){
        no_student.checked = false;
        company.style.display = "none";
        school.style.display = "block";

        //渲染选择框的输出，先是默认输出
        renderSelectbox();
    });

    /*
     * 初始化时，渲染选择框的输出
     */
    function renderSelectbox(){
        city.innerHTML = null;
        for(var i in data){
            var newOption = new Option(i);
            city.add(newOption,undefined);
        }
        city.options[0].checked = true;    //将第一项设置为选中状态

        var name = city.options[0].text;
        var uData = data[name];  //获得该城市对应的所有大学信息
        university.innerHTML = null;
        for(var i = 0, len = uData.length; i < len; i++){
            var newOption = new Option(uData[i]);
            university.add(newOption,undefined);
        }
    }

    /*
     * 非在校生点击按妞时填出输入框
     */
    EventUtil.addHandler(no_student,'click',function(event){
        student.checked = false;
        school.style.display = "none";
        company.style.display = "block";
    });

    /*
     * 在校生选择学校时触发的事件
     */
    EventUtil.addHandler(city,'change',function(event){      //城市选择框的选项变化后需要动态地变化大学对应的选择框
        var selectOption = city.options[city.selectedIndex];     //获取当前选中想
        var cityname = selectOption.text;
        var universityData = data[cityname];  //获得该城市对应的所有大学信息

        //移出所有选项
        university.innerHTML = null;
        for(var i = 0, len = universityData.length; i < len; i++){
            var newOption = new Option(universityData[i]);
            university.add(newOption,undefined);
        }
    });

};