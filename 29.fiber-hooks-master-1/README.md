## 1.知识点

基础 刷新 rAF requestAnimationFrame requestIdleCallback MessageChannel 链表 fiber fiber是如何遍历的 如何渲染的

## 2.屏幕刷新率
- 现在大部分的屏幕刷新率是60次/秒，每一帧的预算时间是16.66毫秒，如果每一帧的执行时间大于16.66毫秒，那么页面会延迟paint绘制，会出现卡顿（详情见图片）
- 动画或者 绘制 要求频率和设备刷新率保持一致。原因：低于这个刷新率，人肉眼看到的会卡顿，- 高于不会这个会掉帧。。为什么低于会卡顿，因为每一帧的时间是固定的16.66ms，大于这个时间会延迟绘制

- requestAnimationFrame回调函数会在绘制之前执行，详情看图片，每一帧所要执行的任务都是固定的，执行顺序也是固定的

## 3.浏览器刷新频率是怎么和屏幕的刷新频率保持一致的？
- 通过vSync标识符，，显卡会在每一帧开始的时候给浏览器发送一个vSync标识符

## 4.react fiber之前使用的是栈，fiber hooks使用的是链表
- 因为链表可以中断
- 为啥没使用generate? generate性能较差，而且generate的polyfill的代码也比较冗余