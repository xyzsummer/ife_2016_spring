#DIV+CSS布局方式

#####在制作网页时，都是按照垂直方向进行整体布局，所以三栏的布局方式是需要熟练掌握的。

 
##三栏式布局        

##### 三栏式布局的主要形式如下图所示

![Aaron Swartz](http://7xrp04.com1.z0.glb.clouddn.com/task_1_3_1.png)  

>三栏式布局的基本包括header、footer、leftbar、mainbody和rightbar五块内容。
主要的思路是将leftbar设置为向左浮动，将rightbar设置为向右浮动，并为设置mainbody的
外边距即可。

页面的代码如下：
 
    <div id="Wrap"><!--页面层容器-->
    <div id="Header"> 页面头部</div>
    <div id="PageBody"><!--页面主体-->
        <div id="leftbar">
           <img src="http://dummyimage.com/80/80/ffffff&text=队logo" alt="Logo">
           <span>团队名称</span>
        </div>
        <div id="rightbar">
            <div class="pic"><img src="http://dummyimage.com/80/80/ffffff&text=队logo" alt="Logo"></div>
            <div class="pic"><img src="http://dummyimage.com/80/80/ffffff&text=队logo" alt="Logo"></div>
            <div class="pic"><img src="http://dummyimage.com/80/80/ffffff&text=队logo" alt="Logo"></div>
            <div class="pic"><img src="http://dummyimage.com/80/80/ffffff&text=队logo" alt="Logo"></div>
        </div>
        <div id="mainbody">

            <p>
                我们团队的简介：
                <br/>
                <br/>
                这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。
                这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。这是团队的介绍。
                <br/>
                <br/>
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
                这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。这是个人的介绍。
            </p>
        </div>
    </div>
    <div id="Footer"> 页面底部</div>
    </div>
     
     
CSS样式设置如下：
    <style type="text/css">
        *{
            padding:0;
            margin:0;
        }
        body{
            padding:20px;
        }
        #Wrap{
            clear:both;
            background-color: #eee;
            border:1px solid #999;
            overflow: auto;
        }
        #Header{
            height:50px;
            margin:20px;
            border:1px solid #999;
            background-color: white;
            text-align: center;
            line-height: 50px;
        }
        #Footer{
            height:50px;
            margin:20px;
            border:1px solid #999;
            background-color: white;
            text-align: center;
            line-height: 50px;
            clear:both;
        }
        #PageBody{
            clear:both;
        }
        #leftbar{
            width:200px;
            border:1px solid #999;
            float:left;
            margin-left:20px;
            background-color: white;
        }
        #leftbar img{
            padding:20px;
        }
        #leftbar span{
            position:relative;
            bottom:90px;
        }
        #rightbar{
            width:120px;
            border:1px solid #999;
            float:right;
            margin-right:20px;
            margin-bottom: 20px;
            text-align: center;
            background-color: white;
        }
        #rightbar .pic{
            margin:20px 0;
        }
        #mainbody{
            border:1px solid #999;
            margin-left:240px;
            margin-right:160px;
            margin-top:20px;
            background-color: white;
        }
        #mainbody p{
            padding:20px;
        }
    </style>

###问题
####1.给四个图片设置了margin值，可是并没有合并外边距？
应该将img图片放置在div中后再设置margin值才会合并，因为img标签是行内标签。

####2.给rightbar设置为float：right后会浮动到另外一层？
应该先写入rightbar容器，再写入mainbody容器，因为并没有给mainbody设置浮动

####3.怎么让wrap容器的高度始终为子元素中最高的高度？
只要设置父元素wrap的overflow属性，设置为overflow:auto;

####4.给页面添加了底部，可是浮动到右侧的容器会遮盖底部的内容，怎么解决？
设置页面底部的清除浮动的属性，就会清楚右侧的浮动影响。

####5:清楚浮动的几种方式
* 在并排的元素中添加空标签，然后设置空标签的clear属性
* 设置父元素的overflow属性为auto ，overflow:auto 
* 使用clearfix技巧

####6:回顾双飞翼布局
双飞翼布局也为三栏布局，不过其优先渲染中间的主要内容，再加载两边的内容。实现这种样式需要将主、
子和附加内容都设置为向左浮动，并将主内容的div写在前面，主内容的宽度设置为100%。

这样会导致子内容和附加内容浮动到下面。此时需要设置margin-left值，设置左边的子列margin-left：-100%
，左子列会浮动到上一层的最左边。设置右边的子列margin-left：-200px。具体的值与其宽度值有关。
只有负边距大于其自身的宽度才能够浮动到上一层。 

最后设置中间主内容的外边距分别为负子内容的宽度。

####7.回顾圣杯布局
圣杯布局是三栏布局，要求左右宽度固定，中间栏的宽度是自适应。圣杯布局和双飞翼布局的实现原理相近。

不同之处是中间的内容不是用margin实现，而是用padding 实现的。在三栏的外部wrap容器中设置padding-left,
和padding-right。此时左右的float会受到影响，此时再使用relative相对定位实现。
