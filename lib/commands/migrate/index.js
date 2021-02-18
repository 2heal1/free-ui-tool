const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const shell = require("shelljs");

const log = require("../../utils/log");
const CONSTANT = require("../../constant");

const packageCmd = require("./package-cmd");
const traversalFile = require("./traversal-file");
const normalReplace = require("./normal-replace");
const detailReplace = require("./detail-replace");

async function migrateUI(args) {
  try {
    const config = require(path.resolve("./free-ui-config.js"));
    if (config) {
      const options = {};
      const { mode } = await inquirer.prompt({
        type: "list",
        name: "mode",
        message: "请选择模式",
        choices: [
          {
            name: "normal（前缀替换）",
            value: CONSTANT.MODE.NORMAL,
          },
          {
            name: "detail（属性、事件替换）",
            value: CONSTANT.MODE.DETAIL,
          },
        ],
      });
      options["mode"] = mode;
      const allowedTypes = _.get(config, "script.extension", []).concat(
        _.get(config, "style.extension", [])
      );
      let configPath;
      if (_.isArray(_.get(config, "dir"))) {
        configPath = _.get(config, "dir").reduce((sum, cur) => {
          return sum.concat(path.resolve(`./${cur}`));
        }, []);
      } else {
        configPath = path.resolve(`./${_.get(config, "dir", "src")}`);
      }
      const { old, replace } = await inquirer.prompt([
        {
          type: "input",
          name: "old",
          message: "请输入当前UI前缀 eg: iview 组件，输入 ‘i’ ",
          validate: function(input) {
            if (!input) {
              return "不能为空";
            }
            return true;
          },
        },
        {
          type: "input",
          name: "replace",
          message: "请输入要替换的UI前缀 eg: qaxd组件，输入 ‘q’ ",
          validate: function(input) {
            if (!input) {
              return "不能为空";
            }
            return true;
          },
        },
      ]);
      options["old"] = old;
      options["replace"] = replace;
      if (mode === CONSTANT.MODE.NORMAL) {
        const func = (() => {
          return function(file) {
            return normalReplace(options.old, options.replace, file);
          };
        })();
        traversalFile(configPath, allowedTypes, func);
      } else {
        if (_.isEmpty(config.components)) {
          log.error("请设置components替换规则");
        } else {
          const func = (() => {
            let componentRules = new Map();
            config.components.forEach((component) => {
              componentRules.set(
                component.name.toLocaleLowerCase(),
                component.patternRule
              );
            });
            return function(file) {
              return detailReplace(
                componentRules,
                options.old,
                options.replace,
                file
              );
            };
          })();
          traversalFile(configPath, allowedTypes, func);
        }
      }
      if (_.get(config, "script.removePackage.length")) {
        const cmd = packageCmd(
          config.script.removePackage.join(" "),
          config.script,
          true
        );
        shell.exec(cmd);
      }
      if (_.get(config, "script.installPackage.length")) {
        const cmd = packageCmd(
          config.script.installPackage.join(" "),
          config.script
        );
        shell.exec(cmd);
      }
      log.success('替换成功！')
    }
  } catch (err) {
    log.error('未找到 free-ui-config.js 文件，请使用 free-ui config [option]获取相关配置！')
  }
}
module.exports = async () => {
  migrateUI();
};
