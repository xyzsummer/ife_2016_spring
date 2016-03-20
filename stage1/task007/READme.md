
##实现一个关于新世界的网页布局

以下内容为实现网页布局所遇见的各种问题

###1.background-size的作用。
当引入图片的大小超出容器div的大小时，使用background-size可以将图片调整到符合容器大小的宽高度。

###2.引入的图片设置vertical-align值，可以使得后面的文字基准高度线一致。

###3.设置* 通配选择器的padding,margin值为0为后面的操作带来方便

###4.select标签实现的功能也可以用ul li标签+input标签实现相应的内容

###5.CSS中多类选择器和后代选择器的不同  类名之间的空格很重要

###6.当设置多个并列的容器margin值时，有时可能需要设置最后一个margin值为0，否则会跳至下一行。

###7.HTML中可以用&nbsp代替空格

###8.利用CSS和HTML实现轮播图的原理
实现轮播图是使用ul li  a 标签，并将a标签中的href指向下一个将要出现的内容。并将所有li的内容
均向左浮动，设置ul的overflow属性为hidden即可实现简单的轮播图。

###9.CSS3的transition属性，可以实现简单的动画，可是浏览器的兼容性较差。

###10.CSS的hack技术
CSS hack是通过在CSS样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别
什么样的符号是有标准的，CSS hack就是让你记住这个标准），以达到应用不同的CSS样式的目的。

CSS Hack大致有3种表现形式，CSS类内部Hack、选择器Hack以及HTML头部引用(if IE)Hack
，CSS Hack主要针对类内部Hack：比如 IE6能识别下划线"_"和星号" * "，IE7能识别星号" * "，但
不能识别下划线"_"，而firefox两个都不能认识。等等

选择器Hack：比如 IE6能识别*html .class{}，IE7能识别*+html .class{}或者*:first-child+html .class{}。等等

HTML头部引用(if IE)Hack：针对所有IE：<!--[if IE]><!--您的代码--><![endif]-->，针对IE6及以下版本：
<!--[if lt IE 7]><!--您的代码--><![endif]-->，这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。


书写顺序，一般是将识别能力强的浏览器的CSS写在后面。