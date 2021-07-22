function computedTotal(arr, cb) {
  // 耗时计算任务
  console.log('拿到数据，开始处理数据', arr);
  // 模拟耗时任务
  const time = new Date().getTime();
  console.log(time);
  setTimeout(() => {
    cb(`告诉主进程我完成任务了${time - new Date().getTime()}`);
  }, 2000);
}

// 与主进程通信
// 监听主进程信号
process.on('message', (msg) => {
  computedTotal(msg, (flag) => {
    // 向主进程发送完成信号
    process.send(flag);
  });
});
