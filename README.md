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
        tag: "q-cascader",
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
          logTiming: ["render-format"]
        },
        events: {
          logTiming: ["on-change"]
        }
      }
    }
  ]
};
```

## 暂未支持

- slot、组件方法替换
- jsx render 写法
## NPM

- [FREE-UI-TOOL](https://www.npmjs.com/package/free-ui-tool)
