
###判断字符串的长度

对于一个input表单，当输入值后，需要计算输入值的长度。

每个英文字母、数字、英文符号长度为1，每个汉字，中文符号长度为2。

因此需要检测字符串中的每个字符是不是中文符号以及汉字，通过其字符编码可以知道。


代码如下：

```javascript
     function getLength(str){
             var realLength = 0;
             var charCode = -1;
             for(var i = 0, len = str.length; i< len; i++){
                 charCode = str.charCodeAt(i);    //取得当前的字符
                 if(charCode >=0 && charCode <= 128){
                     realLength += 1;
                 }else{
                     //如果是UTF-8编码的话，并且是中文的话，长度为3
                     realLength += 3;
                 }
             }
             return realLength;
         }
```