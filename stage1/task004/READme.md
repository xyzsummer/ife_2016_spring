##��λ�;���

�ܶ�ʱ������Ҫ���Ƹ���Ԫ�ص�λ�ã������ø��������ܹ���ȫʵ�֣���ʱ����Ҫ�á�position�� ����
���п��ơ�

��position������������ֵ���ֱ�Ϊ��relative��absolute �� fixed��


###relative
��������Զ�λԪ�أ�������ҳ������Ȼ�������ġ���̬�ġ�û�������ĵ���������������£�
����Ԫ�ز���ռ�ø�Ԫ�ص�����λ�ã���˿��ܻ�����ص��������

��relative�����Ը�Ԫ������λ�ƣ�offset����top��right��bottom��left�����ԡ�
ͨ����Щλ���������ÿ��Ը�Ԫ�ؽ��о�ȷ�Ķ�λ��


###absolute
���Զ�λԪ��Ҳ���к���λ�����ԣ�Ȼ�������Զ�λԪ�ػ������ĵ��������Զ�λԪ��ֱ�Ӵ��ĵ������Ƴ���
���Զ�λԪ�ص�λ��ֱ�Ӻ͸������Ƿ���������Զ�λ�����Զ�λ����ֱ�ӹ�ϵ�����Զ�λԪ��
��Ҫ����һ������Ԫ����������Զ�λ�����Զ�λ������ȻԪ�ض�λ�������ҳ���������ж�λ��


��һ�����Զ�λ��Ԫ��û����ȷָ���߶ȺͿ�ȣ�ͬʱʹ�ú���λ�Ƶġ�top���͡�bottom������ʱ��
��ʹ����Ԫ�صĸ߶ȿ�Խ����������ͬ���ģ������Ԫ��ͬʱʹ��λ�ơ�left���͡�right������ֵ��
��ʹ����Ԫ�صĿ�ȿ�Խ�������������ͬʱʹ��λ���ĸ����ԣ�����ָ��һ����Ⱥ͸߶���ʾ
Ԫ�ء������ʱ����Զ�λԪ�صĿ�Ⱥ͸߶ȶ���100%����

###fixed
�̶���λ�;��Զ�λ�����ƣ���������λ���������������ڣ����������Ź��������й�����Ҳ����
˵�������û�ͣ������ҳ����Ǹ��ط����̶�Ԫ�ؽ�ʼ��ͣ����ҳ���һ���ط���

###z-index����
�ı�Ԫ�صĲ��˳����ͨ���ı䡰z-index�����������Ƶġ�ֵԽ�߽��������Խ���档


###ʵ������

![Aaron Swartz](http://7xrp04.com1.z0.glb.clouddn.com/task_1_4_1.png) 

��Ҫʵ����ͼ��ʾ��Ч��ͼ������Ĵ������£�

    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>��λ�;���</title>
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

###���⣺

####1.��ô��div��������д�ֱˮƽ���У�
ͨ�������䶨λΪabsolute���ԣ�left:50%,right:50%,��������߾�Ĳ�����

####2.�����div�Ŀ�Ⱥ͸߶�������Ԫ�ؾ������أ�
��ʱ��Ҫ���õ�CSS3�������ԣ�����transform���ԣ���Ԫ�ؽ���ƽ�ơ�ͬʱ����overflow:hidden�����ԡ�

���������Լ�[xyzsummer github](https://github.com/xyzsummer/ife_2016_spring)