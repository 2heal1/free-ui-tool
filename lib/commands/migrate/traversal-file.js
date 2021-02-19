const path = require("path");
const fs = require("fs");
const _ = require("lodash");

const transformLog = require("./transform-log");

function traversalFile(filePath, allowedTypes, func,logger) {
  const fn = (filePath) => {
    fs.readdir(filePath, function(err, files) {
      if (err) {
        console.warn(err);
      } else {
        //遍历读取到的文件列表
        files.forEach(function(fileName) {
          //获取当前文件的绝对路径
          let fileDir = path.join(filePath, fileName);
          //根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(fileDir, function(eror, stats) {
            if (eror) {
              console.warn("获取文件stats失败");
            } else {
              let isFile = stats.isFile(); //是文件
              let isDir = stats.isDirectory(); //是文件夹
              if (isFile) {
                const fileType = _.last(fileName.split("."));
                if (allowedTypes.includes(fileType)) {
                  // 读取文件内容
                  const file = fs.readFileSync(fileDir, "utf-8");
                  const { file: newFile, log } = func({
                    content: file,
                    fileName,
                    fileDir,
                  });
                  fs.writeFileSync(fileDir, newFile);
                  _.mergeWith(logger, log, (objValue, srcValue)=> {
                    if (_.isArray(objValue)) {
                      return objValue.concat(srcValue);
                    }
                  });
                  fs.writeFileSync(
                    path.resolve("./logger.txt"),
                    transformLog(logger)
                  );
                }
              }
              if (isDir) {
                traversalFile(fileDir, allowedTypes, func,logger); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
          });
        });
      }
    });
  };
  if (_.isArray(filePath)) {
    filePath.forEach((curFilePath) => {
      fn(curFilePath);
    });
  } else {
    fn(filePath);
  }
}

module.exports = (...args) => {
  traversalFile(...args);
};
