
###�ж��ַ����ĳ���

����һ��input����������ֵ����Ҫ��������ֵ�ĳ��ȡ�

ÿ��Ӣ����ĸ�����֡�Ӣ�ķ��ų���Ϊ1��ÿ�����֣����ķ��ų���Ϊ2��

�����Ҫ����ַ����е�ÿ���ַ��ǲ������ķ����Լ����֣�ͨ�����ַ��������֪����


�������£�

```javascript
     function getLength(str){
             var realLength = 0;
             var charCode = -1;
             for(var i = 0, len = str.length; i< len; i++){
                 charCode = str.charCodeAt(i);    //ȡ�õ�ǰ���ַ�
                 if(charCode >=0 && charCode <= 128){
                     realLength += 1;
                 }else{
                     //�����UTF-8����Ļ������������ĵĻ�������Ϊ3
                     realLength += 3;
                 }
             }
             return realLength;
         }
```