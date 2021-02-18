module.exports = (component, type, logTiming, log, file) => {
  const { fileName, fileDir } = file;
  logTiming.forEach((logTimingKey) => {
    if (component.indexOf(logTimingKey) !== -1) {
      log[type].push(
        `文件路径：${fileDir}\n 文件名：${fileName}\n 需要手动替换：${logTimingKey}\n`
      );
    }
  });
};
