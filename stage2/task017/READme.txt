
### 添加事件处理程序，实现浏览器的兼容
DOM2级添加事件处理程序是通过addEventListener()函数，IE是通过attachEvent()函数实现的，DOM0级是
通过on+type=function(){}来实现的。因此在跨浏览器实现事件处理程序时需要考虑浏览器的兼容性。

### change事件
当域中的内容发生改变时会触发该事件，支持该事件的有fileUpload,select, text, textarea

### Math.ceil, Math.floor, Math.round
这三种方法是对小数三种不同的处理方式。Math.ceil是向上取整， Math.floor是向下取整， Math.round
是四舍五入。

### flex布局
柱状图显示时采用的是flex的布局方式，自动填充多余的空间。

### title属性
title 属性规定关于元素的额外信息。这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）