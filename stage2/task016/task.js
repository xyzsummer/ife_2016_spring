/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityname=document.getElementById("aqi-city-input").value;
    var cityaqi=document.getElementById("aqi-value-input").value;
    cityname=cityname.trim();                //消除空格
    cityaqi=cityaqi.trim();
    if(!(/^[\u4e00-\u9fa5\a-zA-Z]+$/g.test(cityname))){
        alert("城市名必须为中英文字符");
    }else if(!(/^(100|[1-9]\d|\d)$/g.test(cityaqi))){
        alert("空气质量指数必须为整数");
    }else                                  //表明都满足条件
    {
        aqiData[cityname]=cityaqi;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqi_table=document.getElementById("aqi-table");
    var content ="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var i in aqiData)
    {
        content += "<tr><td>"+i+"</td><td>"+aqiData[i]+"</td><td><button onclick=\"delBtnHandle(\'"+i+"\')\">删除</button></td></tr>";
    }
    if(i)
    {
        aqi_table.innerHTML=content;
    }else
    {
        aqi_table.innerHTML="";
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(cityname) {     //将删除的城市名子传入
    // do sth.
    delete aqiData[cityname];        //JS中用delete删除变量的属性
    console.log(aqiData);
    renderAqiList();    //更新显示
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var add_btn=document.getElementById("add-btn");
    add_btn.onclick=function(){
        addBtnHandle();
    };
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();

