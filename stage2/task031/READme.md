
###选择框表单的事件

select选择框在选项改变时可以会触发change事件，从而修改别的选择框中的内容。

有一些属性值得注意，方便操作选择框：

* 1.selectedIndex
  当前选中项的索引值
* 2.options
  所有选项值的集合
* 3.new Option
  新增选项值，之后可以使用appendChild()或者add()方法添加到原来的选择框中。

###display:none和visibility:hidden的区别

visibility:hidden，会使对象不可见，但是该对象所占的空间没有改变。

display:none，会将该对象彻底消失，该对象所占有的空间也是不可见的。

代码如下：

```javascript

```