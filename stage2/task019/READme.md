
###排序算法

* sort重排序方法可以很简单地实现数组的排序

* 冒泡法

冒泡法实现的原理：相邻的两个数比较，将较小的数调至前面，一轮下来，最大的数将会沉底，因此只剩下
n-1次循环。

代码如下：

```javascript
     for(var i = 0, n = data.length; i < n - 1; i ++){  //剩下两个数值进行比较
                for(var j = 0; j < n -1-i; j++){
                    if( data[j] > data[j+1]) {
                        var t = data[j];
                        data[j] = data[j+1];
                        data[j+1] = t;
              }
        }
     }
```

* 快速排序

快速排序实现的原理：

（1）在数据集之中，选择一个元素作为"基准"（pivot）。

（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。

（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

可以参考的资料是：[快速排序](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)


```javascript
   var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};
```

当然，快速排序的写法不止这一种，这种方法是创建了一个新的数组，而也可以对原来的数组进行排序。
主要的区别就是在如何将数组以基准划分小于它的值和大于它的值。

