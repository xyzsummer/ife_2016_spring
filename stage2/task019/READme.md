
###�����㷨

* sort�����򷽷����Ժܼ򵥵�ʵ�����������

* ð�ݷ�

ð�ݷ�ʵ�ֵ�ԭ�����ڵ��������Ƚϣ�����С��������ǰ�棬һ��������������������ף����ֻʣ��
n-1��ѭ����

�������£�

```javascript
     for(var i = 0, n = data.length; i < n - 1; i ++){  //ʣ��������ֵ���бȽ�
                for(var j = 0; j < n -1-i; j++){
                    if( data[j] > data[j+1]) {
                        var t = data[j];
                        data[j] = data[j+1];
                        data[j+1] = t;
              }
        }
     }
```

* ��������

��������ʵ�ֵ�ԭ��

��1�������ݼ�֮�У�ѡ��һ��Ԫ����Ϊ"��׼"��pivot����

��2������С��"��׼"��Ԫ�أ����Ƶ�"��׼"����ߣ����д���"��׼"��Ԫ�أ����Ƶ�"��׼"���ұߡ�

��3����"��׼"��ߺ��ұߵ������Ӽ��������ظ���һ���͵ڶ�����ֱ�������Ӽ�ֻʣ��һ��Ԫ��Ϊֹ��

���Բο��������ǣ�[��������](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)


```javascript
   var quickSort = function(arr) {
����if (arr.length <= 1) { return arr; }
����var pivotIndex = Math.floor(arr.length / 2);
����var pivot = arr.splice(pivotIndex, 1)[0];
����var left = [];
����var right = [];
����for (var i = 0; i < arr.length; i++){
��������if (arr[i] < pivot) {
������������left.push(arr[i]);
��������} else {
������������right.push(arr[i]);
��������}
����}
����return quickSort(left).concat([pivot], quickSort(right));
};
```

��Ȼ�����������д����ֹ��һ�֣����ַ����Ǵ�����һ���µ����飬��Ҳ���Զ�ԭ���������������
��Ҫ�������������ν������Ի�׼����С������ֵ�ʹ�������ֵ��

