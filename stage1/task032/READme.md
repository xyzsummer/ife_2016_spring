
###ʹ�ù��캯��+ԭ�͵ķ�ʽ����������ģ��

����ÿһ�������������Ӧ�Ķ��󣬿�������Ϊ�ö������ò�ͬ�ı���֤������


�������£�

```javascript
function form(name,type,fun,rules,success,fail){
    this.label = name;
    this.type = type;
    this.validator = fun;
    this.rules = rules;
    this.success = success;
    this.fail = fail;
    this.result = true;
    this.content = "";    //������������Ĭ��Ϊ��
}
form.prototype.err = "���벻��Ϊ��";
form.prototype.flag = true;                  //ȫ����֤��ʱ�ı�־λ
form.prototype.validate = function(content){
    if(content.length == 0){
        return false;
    }else{
        return true;
    }
};
```

###����һ����дԭ�͵����Ժ�ͻḲ��ԭ�͵����ԣ������Ǹı�ԭ�͵����ԡ����ԣ�ֻ�ж�ԭ�͵����Խ����޸Ĳ��ܹ�ʹ������ʵ�����ʸ�����ʱ���޸ġ�