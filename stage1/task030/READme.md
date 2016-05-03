
###闭包和匿名函数

本次任务在验证表单时，有5个input输入框，每个输入框验证的内容不同，所以需要对表单进行遍历验证。

C语言中遍历数组只需要进行for循环就好，并将每次的索引值i记录就可以知道遍历哪个。

但是JS中因为作用域与C语言是不同的，所以每次遍历的时候其传入的索引值i都为最后一个，为此我用匿名函数的形式强制创建了一个索引值i的副本index，
利用该副本进行遍历即可。

代码如下：

```javascript
     for(var i = 0, len = input.length; i < len; i++){
             //定义匿名函数，将索引值i传入函数中，从而创造了一个副本index
             //如果不定义匿名函数，//当前函数包含for里面的所有活动对象，每个活动对象访问的都是同一个i,所以只是最后一个值

             /*
              * 获取焦点时触发的事件   focus
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
              * 失去焦点时触发的事件  blur
              */
             var blurevent = function(index){
                 EventUtil.addHandler(input[index],'blur',function(event){
                     //失去焦点后，先检查输入内容是否正确
                     validate(index);
                 })
             };

             focusevent(i);
             blurevent(i);
         }
```

### HTML5 对表单有一些约束验证API

1.required: 用于验证表单是否为空，提交表单时不能为空。适用于<input>,<textarea>,<select>字段

2. 新的输入类型：input框的输入类型有email,url。不过需要给input框设置required属性，否则空的文本框也会验证通过。

3.数值范围：min,max,step

4.pattern属性：新增了pattern属性，这是个正则表达式，用于匹配文本框的值。

5.检测有效性：checkValidity()方法检测表单的某个字段是否有效，检测的标准就是根据前面的约束条件。validity属性可以告诉你为什么有效或者无效

6.禁用验证：通过设置novalidate属性，可以设置表单不需要进行验证。

