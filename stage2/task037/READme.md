
###使用构造函数+原型的方式创建表单对象模型

对于每一个表单，都有其对应的对象，可以利用为该对象设置不同的表单验证方法。


代码如下：

```javascript
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
```

###对象一旦重写原型的属性后就会覆盖原型的属性，而不是改变原型的属性。所以，只有对原型的属性进行修改才能够使得所有实例访问该属性时都修改。