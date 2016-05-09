/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

var timeselected = document.getElementsByName("gra-time");
var cityselected = document.getElementById("city-select");      //选择好的城市
var wrap = document.getElementsByClassName("aqi-chart-wrap").item(0);
var text = document.getElementById("text");

//实现浏览器兼容
var EventUtil={
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }
        else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }
        else{
            element["on"+type]=handler;
        }
    }
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat){      //将日期以指定的形式返回
    var y=dat.getFullYear();
    var m=dat.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d=dat.getDate();
    d = d < 10 ? "0" + d : d;
    return y + "-" + m + "-" + d;
}

function randomBuildData(seed){      //生成一系列obj对象，每个日期代表一个属性值
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = "";
    for(var i = 1; i < 92; i++){      //只生成三个月的数据进行分析
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);   //setDate()设置日期月份中的天数，如果超过应有的天数，就会将月份加一
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,          //初始化为-1,第一次就会触发选项改变的值
    nowGraTime: "day"
}

/**
 * 计算每周每月的平均指数
 */
function datacount() {
    //其实应该存储12个月的数据，但是因为空间较大，所以只写了3个月，这里有点bug。每个月最多只有5周，所以只写了5周的数据
    var month = {
        "01": {day: 0, total: 0, average: 0, week:{
            "01":{day: 0, total: 0, average:0},
            "02":{day: 0, total: 0, average:0},
            "03":{day: 0, total: 0, average:0},
            "04":{day: 0, total: 0, average:0},
            "05":{day: 0, total: 0, average:0}
        }},
        "02": {day: 0, total: 0, average: 0, week:{
            "01":{day: 0, total: 0, average:0},
            "02":{day: 0, total: 0, average:0},
            "03":{day: 0, total: 0, average:0},
            "04":{day: 0, total: 0, average:0},
            "05":{day: 0, total: 0, average:0}
        }},
        "03": {day: 0, total: 0, average: 0, week:{
            "01":{day: 0, total: 0, average:0},
            "02":{day: 0, total: 0, average:0},
            "03":{day: 0, total: 0, average:0},
            "04":{day: 0, total: 0, average:0},
            "05":{day: 0, total: 0, average:0}
        }},
    };

    //计算月数以及每月平均的污染指数
    //计算周数以及每周平均的污染指数
    for(var date in chartData){
        //将date作为字符串分割成月、分、周
        if(chartData.hasOwnProperty(date)){
            time = date.split("-");
            month[time[1]].day ++;
            month[time[1]].total += chartData[date];

            var weekday ="0" + Math.ceil(month[time[1]].day / 7);   //判断此时是第几周,使用Math.ceil
            var ww=month[time[1]].week[weekday];
            ww.day ++;
            ww.total += chartData[date];
        }
    }
    //计算每个月的平均指数
    for(var attr in month){
        if(month.hasOwnProperty(attr)) {
            month[attr].average = month[attr].total / month[attr].day;
        }
    }
    //计算每周的平均指数
    for (attr in month){
        if(month.hasOwnProperty(attr)) {
            var weekdata = month[attr].week;
            for(var i in weekdata){
                weekdata[i].average = weekdata[i].total / weekdata[i].day;
            }
        }
    }
    return month;
}

function chooseColor(data)
{
    var color;
    if(data <= 100) {
        color = "#2A9B19";
    } else if(data <= 200) {
        color = "#0b0cff";
    } else if(data <= 300) {
        color = "#dd150c";
    } else if(data <= 400) {
        color = "#790996";
    } else {
        color = "black";
    }
    return color;
}



/**
 * 渲染图表
 */
function renderChart() {
    //计算每周每月的aqi数据
    var month = datacount();
    console.log(month);
    //将数据以指定的形式展现出来

    function toChinese(text) {     //为了展示数据而产生进行中文转换
        if (text === "day") {
            return "天";
        } else if (text === "week") {
            return "周";
        } else {
            return "月";
        }
    }

    text.innerHTML = "当前城市：" + cityselected.options[pageState.nowSelectCity].text + " 查询时间粒度：" + toChinese(pageState.nowGraTime);

    //先清除wrap里面的内容
    wrap.innerHTML = null;

    if(pageState.nowGraTime == "day") {
        for (var attr in chartData) {
            if(chartData.hasOwnProperty(attr)) {
                var div = document.createElement("div");
                div.style.width = "1%";
                div.style.height = (chartData[attr]/5)+"%";
                div.style.backgroundColor = chooseColor(chartData[attr]);
                div.title = "当前城市：" + cityselected.options[pageState.nowSelectCity].text + "，时间：" + attr + "，空气污染指数：" + chartData[attr];
                wrap.appendChild(div);
            }
        }
    }
    else if(pageState.nowGraTime == "week") {
        for (var attr in month) {     //将数据以周的形式展现出来
            if(month.hasOwnProperty(attr)) {
                var week = month[attr].week;
                for(var i in week) {
                    if(week.hasOwnProperty(i)) {
                        var data = week[i].average;
                        var div = document.createElement("div");
                        div.style.width = "6%";
                        div.style.height = (data/5)+"%";
                        div.style.backgroundColor = chooseColor(data);
                        div.title = "当前城市：" + cityselected.options[pageState.nowSelectCity].text + "，时间：" + attr+"月"+"第"+i+"周" + "，空气平均污染指数：" +data;
                        wrap.appendChild(div);
                    }
                }
            }
        }
    }
    else if(pageState.nowGraTime == "month") {
        for (var attr in month) {     //将数据以周的形式展现出来
            if(month.hasOwnProperty(attr)) {
                var data = month[attr].average;
                var div = document.createElement("div");
                div.style.width = "30%";
                div.style.height = (data/5)+"%";
                div.style.backgroundColor = chooseColor(data);
                div.title = "当前城市：" + cityselected.options[pageState.nowSelectCity].text + "，时间：" + attr+"月" + "，空气平均污染指数：" +data;
                wrap.appendChild(div);
            }
        }
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    for(var i = 0; i < timeselected.length; i ++){
        if(timeselected[i].checked){                //如果被选中
            if(pageState.nowGraTime != timeselected[i].value){       //如果选项发生了改变
                pageState.nowGraTime = timeselected[i].value;
                console.log(pageState);
            }
            else{                    //如果选项没有发生改变
                return;
            }
        }
    }
    // 设置对应数据   选项发生改变，重新设置数据
    //改变时间粒度，不需要重新调数据
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    if(pageState.nowSelectCity != cityselected.selectedIndex)
    {
        pageState.nowSelectCity = cityselected.selectedIndex;
        console.log(pageState);
    }else
    {
        return;
    }
    // 改变城市名称后，需要重新设置对应数据
    var city = cityselected.options[cityselected.selectedIndex].text;
    chartData = aqiSourceData[city];
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    for(var i = 0; i < timeselected.length; i ++){
        EventUtil.addHandler(timeselected[i], "click", graTimeChange);      //为每一个ratio按钮添加click事件，点击是触发
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var content = "";
    for(var city in aqiSourceData) {
        content  += "<option>" + city + "</option>";
    }
    cityselected.innerHTML = content;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    EventUtil.addHandler(cityselected,"click",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var city = cityselected.options[cityselected.selectedIndex].text;
    chartData = aqiSourceData[city];
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();             //初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
    initCitySelector();            //select发生变化时的处理函数
    initAqiChartData();            //初始化图表需要的数据格式
}

init();