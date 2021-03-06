# FREE-UI-TOOL

组件迁移替换工具

## 功能简介

可以快速对 ui 库进行替换，替换存在两种模式：

- normal（前缀替换）
- detail（属性、事件替换）

## 安装

```js
yarn add global free-ui-tool
npm i free-ui-tool -g
```

## 快速使用

- `free-ui migrate` 迁移替换 UI
- `free-ui config [option]` 获取配置

### 简单替换
如果只想替换ui前缀，可先通过`free-ui config`获取配置，然后直接在terminal 输入`free-ui-migrate`
选择`normal（前缀替换）`，并输入想要替换的ui前缀 例如`haha`
![normal-demo](http://dbp-resource.cdn.bcebos.com/87f4e572-c500-24b1-afac-66c31dd53dee/WechatIMG521.jpeg)

会有以下效果：
![normal-result](http://dbp-resource.cdn.bcebos.com/87f4e572-c500-24b1-afac-66c31dd53dee/normal-result.jpg)


### 复杂替换
如果需要进行前缀、属性、事件等替换，可使用`detail`模式
先通过`free-ui config`获取配置，并还可以通过`free-ui config -c`获取组件配置数据结构，`free-ui config -c`获取具体组件配置

配置完成后，在terminal上输入`free-ui migrate`
设置相应参数，便可完成替换。
![detail-demo](http://dbp-resource.cdn.bcebos.com/87f4e572-c500-24b1-afac-66c31dd53dee/WechatIMG522.jpeg)

效果如下：
![detail-result](http://dbp-resource.cdn.bcebos.com/87f4e572-c500-24b1-afac-66c31dd53dee/1615038210842.jpg)


以下是一个简单的配置文件：

```js
{
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
    registry: "https://registry.npmjs.org/"
  },
  style: {
    //需要匹配的文件扩展名
    extension: ["css", "less", "scss"]
  },
  // 可选 normal detail 两种模式，普通模式只适用于修改tag前缀，detail模式用于替换组件内属性、slot、events
  mode: "normal",
  // mode:normal 下启用
  tag: {
    old: "i-",
    replece: "q-"
  },
  // 组件替换规则，mode:detail 下启用
  components: [
    {
      name: "i-cascader",
      patternRule: {
        // 目标tag
        tag: "el-cascader",
        logTiming: ["render-format","on-change"],
        attribute: {
          // 需要替换的组件属性名
          replacedNames: {
            data: "options",
            trigger: "expandTrigger",
            "change-on-select": "checkStrictly"
          },
          // 需要替换的组件属性值
          replacedValue: {
            // eg: size:large => size:medium
            size: {
              large: "medium"
            }
          },
          // 需要移除的属性
          removed: [],
          // 什么情况下 需要记录文件位置，方便后续手动修改
        },
        events: {
        }
      }
    }
  ]
};
```

## 注意
无论什么模式，都会输出`logger.txt`文件
该文件用以记录详细模式下的组件logTiming中记录的字段

## 暂未支持

- slot、组件方法替换
- jsx render 写法
## NPM

- [FREE-UI-TOOL](https://www.npmjs.com/package/free-ui-tool)

## Git

- [FREE-UI-TOOL](https://github.com/2heal1/free-ui-tool)

## [iview => element ui 组件配置](https://github.com/2heal1/component-config/blob/main/iview-element/index.js)
