/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var aqiData = {};

/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
 */
function addAqiData() {
    var cityname=document.getElementById("aqi-city-input").value;
    var cityaqi=document.getElementById("aqi-value-input").value;
    cityname=cityname.trim();                //�����ո�
    cityaqi=cityaqi.trim();
    if(!(/^[\u4e00-\u9fa5\a-zA-Z]+$/g.test(cityname))){
        alert("����������Ϊ��Ӣ���ַ�");
    }else if(!(/^(100|[1-9]\d|\d)$/g.test(cityaqi))){
        alert("��������ָ������Ϊ����");
    }else                                  //��������������
    {
        aqiData[cityname]=cityaqi;
    }
}

/**
 * ��Ⱦaqi-table���
 */
function renderAqiList() {
    var aqi_table=document.getElementById("aqi-table");
    var content ="<tr><td>����</td><td>��������</td><td>����</td></tr>";
    for(var i in aqiData)
    {
        content += "<tr><td>"+i+"</td><td>"+aqiData[i]+"</td><td><button onclick=\"delBtnHandle(\'"+i+"\')\">ɾ��</button></td></tr>";
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
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
 */
function delBtnHandle(cityname) {     //��ɾ���ĳ������Ӵ���
    // do sth.
    delete aqiData[cityname];        //JS����deleteɾ������������
    console.log(aqiData);
    renderAqiList();    //������ʾ
}

function init() {
    // ���������add-btn��һ������¼������ʱ����addBtnHandle����
    var add_btn=document.getElementById("add-btn");
    add_btn.onclick=function(){
        addBtnHandle();
    };
    // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����
}

init();

