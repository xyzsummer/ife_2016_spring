

(function(){
    //emergeDialog作为闭包函数，只返回一些外界需要访问的函数

    //定义一个全局变量，用于缓存各种数据
    var cacheData = { };
    //uuid
    var uuid = 1,      //expando和expando是查找DOM元素对应的缓存
        expando = 'cache' + ( +new Date() + "" ).slice( -8 );  // 生成随机数
    //在日期Date前面加 + 会改变日期输出的格式，+相当于valueOf();

    var emergeDialog = function(){

        var Dialog = function(){};     //定义Dialog的构造函数

        //定义Dialog原型的一些方法
        Dialog.prototype = {
            getOptions : function(opts){
                var options = {},
                    defaults = {
                        container: null,
                        drag : false,
                        zoom : false,
                        fixed : true
                    };
                for(var i in defaults){     //遍历属性
                    options[i] = opts[i] == undefined ? defaults[i] : opts[i];    //如果没有参数就使用默认值
                }
                Dialog.data( 'options', options );
                return options;
            },
            createOverlay : function(){
                var overlay = document.createElement("div");
                overlay.id = "overlay";
                var style = " width:100%; background-color: grey; opacity:0.5;filter:Alpha(opacity=50);position:fixed;z-index:1000;top:0;"
                overlay.style.cssText = style;
                return overlay;
            },
            createMask : function(){
                var mask = document.createElement("div");
                mask.id = "mask";
                var style = " min-width:300px;min-height:100px;width:500px;border:2px solid black;background-color: white;top:50%;left:50%;z-index:2000;"
                mask.style.cssText = style;
                return mask;
            },
            createMaskWrap : function(argus){
                var header = argus.header ?
                    '<div id="header">' + argus.header + '</div>' : '';
                var content = argus.content ?
                    '<div id="content">' + argus.content + '</div>' : '';
                var yesFn = typeof argus.yesFn == 'function' ?
                    '<button id="sure">确定</button>' : '';
                var noFn = argus.noFn === true ?
                    '<button id="cancel">取消</button>' : '';

                var dialogTmpl = [header,content,noFn,yesFn].join("");

                var maskWrap = document.getElementById("maskWrap");
                if(!maskWrap){
                    maskWrap = document.createElement("div");
                    maskWrap.id = "maskWrap";
                }
                maskWrap.innerHTML = dialogTmpl;
                return maskWrap;
            }
        }

        /*
        * 设置并返回缓存的数据，可以缓存任意的字符串和数字，属性名或者属性值（DOM数据）
        * */
        Dialog.data = function(elem,val,data){
            if(typeof elem == "string"){
                if(val !== undefined){
                    cacheData[elem] = val;
                }
                return cacheData[elem];
            }
            else if(typeof elem === "object"){
                // 如果是window、document将不添加自定义属性
                // window的索引是0 document索引为1
                var index = elem === window ? 0 :
                    elem.nodeType === 9 ? 1:
                        elem[expando] ? elem[expando] :
                            (elem[expando] = ++uuid);
                var thisCache = cacheData[index] ? cacheData[index] : ( cacheData[index] = {} );

                if(data !== undefined){
                    if(thisCache[val] === undefined){     //如果没有定义的话
                        thisCache[val] = data;     //将数据保存在cacheData[index]中
                    }else if( Object.prototype.toString.call(thisCache[val]) === '[object Array]'){
                        thisCache[val].push(data);
                    }
                }
                return thisCache[val];
            }
        };

        /*
         * 事件处理机制
         * */
        Dialog.event = {

            bind : function(elem,type,handler){             //绑定事件
                //将该DOM元素绑定的事件存入缓存中,返回该DOM元素在数据缓存中的位置
                var events = Dialog.data( elem,'e'+ type ) || Dialog.data( elem,'e'+ type,[] );   //现在缓存中创建一个新的位置
                events = Dialog.data( elem,'e'+ type,handler );//将事件保存在events缓存中

                if(elem.addEventListener){
                    elem.addEventListener(type,handler,false);     //异步调用
                }
                else if(elem.attachEvent){
                    elem.attachEvent('on'+type,handler);
                }else{
                    elem["on"+type] = handler;
                }
            },
            unbind : function(elem, type, handler){     //取消事件绑定
                var events = Dialog.data( elem,'e'+ type );

                if(!events) return;

                //删除事件，解除绑定

                if(handler){      //如果有事件处理程序，就只删除其中与之匹配的一个
                    for(var i = 0; i < events.length; i ++){
                        if(events[i] === handler){
                            events.splice(i,1);    //删除一个元素
                        }
                    }
                    if(elem.removeEventListener){
                        elem.removeEventListener(type,fn,false);
                    }else if(elem.detachEvent){
                        elem.detachEvent("on" + type, fn);
                    }else{
                        elem["on" + type] = null;
                    }
                }else{
                    //如果没有传入要删除的事件处理函数则删除该事件类型的缓存
                    for(var i = 0, fn; i < events.length; i ++){
                        fn = events[i];
                        if(elem.removeEventListener){
                            elem.removeEventListener(type,fn,false);
                        }else if(elem.detachEvent){
                            elem.detachEvent("on" + type, fn);
                        }else{
                            elem["on" + type] = null;
                        }
                    }
                    events = undefined;
                    Dialog.data( elem,'e'+ type,[] );   //清空数据
                }
            }
        };


        var extend = {
            open : function(opts){
                var $ = new Dialog();     //创建该类的实例，可以访问该方法、
                var event = Dialog.event;   //添加Dialog的静态方法
                var options = $.getOptions(opts);    //返回该对话框的参数
                var self = this;

                //遍历各个属性进行设置

                // ------------------------------------------------------
                // -------------------先创建遮罩层---------------------
                // ------------------------------------------------------
                //先创建这罩层
                var overlay = document.getElementById("overlay");
                if(!overlay){
                    overlay = $.createOverlay();    //创建遮罩层
                    document.body.appendChild(overlay);    //添加到DOM中
                }
                var docWidth = document.documentElement.clientWidth,
                    docHeight = document.documentElement.clientHeight;
                overlay.style.height = docHeight;
                overlay.style.display = 'block';       //如果之前就有遮罩层，直接显示

                // ------------------------------------------------------
                // -------------------再创建浮出层---------------------
                // ------------------------------------------------------
                //如果已经有浮出层,直接显示
                var mask = document.getElementById("mask");
                if(!mask){
                    mask = $.createMask();       //创建弹出层
                    document.body.appendChild(mask);    //添加到DOM中
                }
                //如果是固定位置的话，就保持在屏幕中间不变
                if(options.fixed){
                    mask.style.position = "fixed";
                }else{
                    mask.style.position = "absolute";
                }
                mask.style.display = "block";

                // ------------------------------------------------------
                // -------------------再创建浮出层里面的内容-------------
                // ------------------------------------------------------

                var maskWrap = $.createMaskWrap(options.container);
                mask.appendChild(maskWrap);
                maskWrap.style.display = 'block' ;

                //因为居中显示，需要计算容器的宽度和高度后，计算它的宽度和高度,父元素的高度是由里面maskWrap的内容所撑开的
                //最后将使用margin抵消本身的高度和宽度
                var eWidth = mask.offsetWidth,       //计算弹出框的高度和宽度
                    eHeight = mask.offsetHeight;     //计算弹出框的高度和宽度
                var widthOverflow = eWidth > docWidth,
                    heightOverflow = eHeight >　docHeight;
                //如果弹出层的宽度和高度大于浏览器的高度和宽度时，需要减去浏览器宽度的一半
                mask.style.marginLeft = '-'+(widthOverflow?docWidth/2 : eWidth/2 ) +'px';
                mask.style.marginTop = '-' + (heightOverflow? docHeight/2 : eHeight/2) + 'px';

                // ------------------------------------------------------
                // -------------------绑定相关事件-----------------------
                // ------------------------------------------------------
                var sure = document.getElementById("sure");
                var cancel = document.getElementById("cancel");

                console.log(event);

                if(overlay){
                    //绑定遮罩层事件，遮罩层的外面任意地方点击都可以取消对话框
                    event.bind(overlay,'click',function(event){
                        self.close();     //关闭浮出层
                    })
                }

                if(sure){
                    //绑定遮罩层事件，遮罩层的外面任意地方点击都可以取消对话框
                    event.bind(sure,'click',function(event){
                        if( options.container.yesFn.call(self, event) !== false ){
                            self.close();
                        }
                    })
                }

                if(cancel){
                    //绑定遮罩层事件，遮罩层的外面任意地方点击都可以取消对话框
                    event.bind(cancel,'click',function(event){
                        self.close();     //关闭浮出层
                    })
                }

                // 缓存相关元素以便关闭弹出层的时候进行操作
                Dialog.data( 'dialogElements', {
                    overlay : overlay,
                    mask : mask,
                    sure : sure,
                    cancel : cancel
                });

            },
            close: function(){
                var options = Dialog.data( 'options' ),
                    elements = Dialog.data( 'dialogElements' ),
                    event = Dialog.event;

                //如果创建了遮罩层，则隐藏
                if(elements.overlay){
                    elements.overlay.style.display = 'none';
                }

                //如果创建了弹出层，则隐藏
                if(elements.mask){
                    elements.mask.style.display = 'none';
                }

                // ------------------------------------------------------
                // --------------------删除相关事件----------------------
                // ------------------------------------------------------
                if( elements.overlay ){
                    event.unbind( elements.overlay, 'click' );
                }

                if( elements.sure ){
                    event.unbind( elements.sure, 'click' );
                }

                if( elements.cancel ){
                    event.unbind( elements.cancel, 'click' );
                }

                //清除缓存
                cacheData = {};
            }
        }

        return extend;      //扩展的方法传送给外界
    };


    window.emergeDialog = new emergeDialog();

})();



/*

<div id="overlay"></div>
    <div id="mask">
    <div id = "maskWrap">
    <div id="header">
    这是一个浮出层
    </div>
    <div id="content">
    这是一个浮出层
    </div>
    <button id="sure">确定</button>
    <button id="cancel">取消</button>
    </div>
    </div>
*/








