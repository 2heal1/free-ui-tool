module.exports = {
  dir: ["src"],
  script: {
    //需要匹配的文件扩展名
    extension: ["vue", "js"],
    //需要进行匹配的目录
    //yarn 删除的安装包
    removePackage: [],
    //yarn 需要安装的安装包
    installPackage: [],
    //npm 扩展参数
    npmOption: [],
    //npm 源
    registry: "https://registry.npmjs.org/",
  },
  style: {
    //需要匹配的文件扩展名
    extension: ["css", "less", "scss"],
  },
  // 可选 normal detail 两种模式，普通模式只适用于修改tag前缀，detail模式用于替换组件内属性、slot、events
  mode: "normal",
  // mode:normal 下启用
  tag: {
    old: "i-",
    replece: "q-",
  },
  // 组件替换规则，mode:detail 下启用
  components: [
    //   {
    //       name:'i-cascader',
    //       patternRule:cascader
    //   }
  ],
};
