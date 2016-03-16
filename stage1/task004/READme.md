##定位和居中

很多时候，你需要控制更多元素的位置，而仅用浮动并不能够完全实现，这时候需要用“position” 属性
进行控制。

“position”属性有三个值，分别为：relative、absolute 和 fixed。


###relative
设置了相对定位元素，但是在页面中仍然是正常的、静态的、没有脱离文档流。在这种情况下，
其他元素不会占用该元素当初的位置，因此可能会出现重叠的情况。

“relative”可以给元素设置位移（offset）“top、right、bottom和left”属性。
通过这些位移属性设置可以给元素进行精确的定位。


###absolute
绝对定位元素也具有盒子位移属性，然而，绝对定位元素会脱离文档流。绝对定位元素直接从文档流中移出，
绝对定位元素的位置直接和父容器是否设置了相对定位（绝对定位）有直接关系。绝对定位元素
需要至少一个祖先元素设置了相对定位（绝对定位），不然元素定位会相对于页面的主体进行定位。


当一个绝对定位的元素没有明确指定高度和宽度，同时使用盒子位移的“top”和“bottom”属性时，
会使整个元素的高度跨越整个容器。同样的，当这个元素同时使用位移“left”和“right”属性值，
会使整个元素的宽度跨越整个容器。如果同时使用位移四个属性，可以指定一个宽度和高度显示
元素。（这个时候绝对定位元素的宽度和高度都是100%。）

###fixed
固定定位和绝对定位很相似，但是它定位是相对于浏览器窗口，并不会随着滚动条进行滚动。也就是
说，不管用户停留在在页面的那个地方，固定元素将始终停留在页面的一个地方。

###z-index属性
改变元素的层叠顺序是通过改变“z-index”属性来控制的。值越高将会出现在越上面。


###实例解析

![Aaron Swartz](http://7xrp04.com1.z0.glb.clouddn.com/task_1_4_1.png) 

需要实现如图所示的效果图，具体的代码如下：

    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>定位和居中</title>
    <style>
        *{
            padding:0;
            margin:0;
        }
        .container{
            height:200px;
            width:400px;
            background-color: #ccc;
            position:absolute;
            top:50%;
            left:50%;
            margin-left:-200px;
            margin-top:-100px;
        }
        .circle{
            height:50px;
            width:50px;
            background-color: #fc0;
            position:absolute;
        }
        #con1{
            border-bottom-right-radius: 50px;
            top:0;
            left:0;
        }
        #con2{
            border-top-left-radius: 50px;
            bottom:0;
            right:0;
        }
    </style>

    </head>

    <body>

    <div class="container">
    <div class="circle" id="con1"></div>
    <div class="circle" id="con2"></div>
    </div>

    </body>
    </html>

###问题：

####1.怎么让div在浏览器中垂直水平居中？
通过设置其定位为absolute属性，left:50%,right:50%,并进行外边距的补偿。

####2.如果该div的宽度和高度是由子元素决定的呢？
此时需要利用到CSS3的新属性，就是transform属性，对元素进行平移。同时设置overflow:hidden的属性。

具体代码可以见[xyzsummer github](https://github.com/xyzsummer/ife_2016_spring)