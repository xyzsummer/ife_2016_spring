
###�հ�����������

������������֤��ʱ����5��input�����ÿ���������֤�����ݲ�ͬ��������Ҫ�Ա����б�����֤��

C�����б�������ֻ��Ҫ����forѭ���ͺã�����ÿ�ε�����ֵi��¼�Ϳ���֪�������ĸ���

����JS����Ϊ��������C�����ǲ�ͬ�ģ�����ÿ�α�����ʱ���䴫�������ֵi��Ϊ���һ����Ϊ������������������ʽǿ�ƴ�����һ������ֵi�ĸ���index��
���øø������б������ɡ�

�������£�

```javascript
     for(var i = 0, len = input.length; i < len; i++){
             //��������������������ֵi���뺯���У��Ӷ�������һ������index
             //�������������������//��ǰ��������for��������л����ÿ���������ʵĶ���ͬһ��i,����ֻ�����һ��ֵ

             /*
              * ��ȡ����ʱ�������¼�   focus
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
              * ʧȥ����ʱ�������¼�  blur
              */
             var blurevent = function(index){
                 EventUtil.addHandler(input[index],'blur',function(event){
                     //ʧȥ������ȼ�����������Ƿ���ȷ
                     validate(index);
                 })
             };

             focusevent(i);
             blurevent(i);
         }
```

### HTML5 �Ա���һЩԼ����֤API

1.required: ������֤���Ƿ�Ϊ�գ��ύ��ʱ����Ϊ�ա�������<input>,<textarea>,<select>�ֶ�

2. �µ��������ͣ�input�������������email,url��������Ҫ��input������required���ԣ�����յ��ı���Ҳ����֤ͨ����

3.��ֵ��Χ��min,max,step

4.pattern���ԣ�������pattern���ԣ����Ǹ�������ʽ������ƥ���ı����ֵ��

5.�����Ч�ԣ�checkValidity()����������ĳ���ֶ��Ƿ���Ч�����ı�׼���Ǹ���ǰ���Լ��������validity���Կ��Ը�����Ϊʲô��Ч������Ч

6.������֤��ͨ������novalidate���ԣ��������ñ�����Ҫ������֤��

