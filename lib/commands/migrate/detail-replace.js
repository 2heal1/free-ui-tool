const _ = require("lodash");
const addLog = require("./add-log");
const CONSTANT = require("../../constant");

function getDiffLength(old, now) {
  return now.length - old.length;
}

function replaceNames(component, replacedNames, lengthDiff) {
  Object.keys(replacedNames).forEach((replacedName) => {
    const newAttributeName = replacedNames[replacedName];
    component = component.replace(replacedName, newAttributeName);
    lengthDiff += getDiffLength(newAttributeName, replacedName);
  });
  return {
    component,
    lengthDiff,
  };
}

function replaceValues(component, replacedValues, lengthDiff) {
  Object.keys(replacedValues).forEach((replacedKey) => {
    const replacedValue = _.head(Object.keys(replacedValues[replacedKey]));
    const newValue = replacedValues[replacedKey][replacedValue];
    const reg = new RegExp(
      `(${replacedKey}[\s=]+["'\`])(${replacedValue})`,
      "i"
    );
    component = component.replace(reg, `$1${newValue}`);
    lengthDiff += getDiffLength(newValue, replacedValue);
  });
  return {
    component,
    lengthDiff,
  };
}

function remove(component, removedTargets, lengthDiff) {
  removedTargets.forEach((removedKey) => {
    const reg = new RegExp(`:?@?${removedKey}[\s=]+["'\`][a-z0-9]+["'\`]`, "i");
    const matchedContent = component.match(reg);
    if (matchedContent) {
      component = component.replace(reg, "");
      lengthDiff += getDiffLength("", _.head(matchedContent));
    }
  });
  return {
    component,
    lengthDiff,
  };
}

module.exports = (componentRules, old, replace, file) => {
  let { content, fileName } = file;
  let index = 0;
  let log = {
    success: [],
    manual: [], // 手动
    slot: [],
  };
  if (content.indexOf("<") === -1) {
    const fileType = _.last(fileName.split("."));
    const oldReg = new RegExp(
      `${CONSTANT.STYLE_TYPE.includes(fileType) ? `\\.` : "^"}${old}-`,
      "gi"
    );
    const replecStr = `${
      CONSTANT.STYLE_TYPE.includes(fileType) ? "." : ""
    }${replace}-`;
    content = content.replace(oldReg, replecStr);
  } else {
    while (index < content.length) {
      if (content[index] === "<") {
        const lastIndex = content.slice(index).indexOf(">");
        const tagReg = new RegExp(`${old}-[a-z-]+`, "i");
        let component = content.slice(index, index + lastIndex);
        const tag = _.get(component.match(tagReg), [0], "");
        const componentRule = componentRules.get(tag.toLocaleLowerCase());
        if (tag && componentRule) {
          let lengthDiff = 0;

          // 替换tag
          component = component.replace(tag, componentRule.tag);
          lengthDiff += getDiffLength(componentRule.tag, tag);

          // 属性
          if (componentRule.attribute) {
            // 替换属性名
            if (componentRule.attribute.replacedNames) {
              let data = replaceNames(
                component,
                componentRule.attribute.replacedNames,
                lengthDiff
              );
              component = data.component;
              lengthDiff = data.lengthDiff;
            }
            // 替换属性值
            if (componentRule.attribute.replacedValue) {
              let data = replaceValues(
                component,
                componentRule.attribute.replacedValue,
                lengthDiff
              );
              component = data.component;
              lengthDiff = data.lengthDiff;
            }
            //移除属性
            if (_.get(componentRule.attribute, "removed.length")) {
              let data = remove(
                component,
                componentRule.attribute.removed,
                lengthDiff
              );
              component = data.component;
              lengthDiff = data.lengthDiff;
            }
            // 日志记录-属性
            if (_.get(componentRule.attribute, "logTiming.length")) {
              addLog(
                component,
                "manual",
                componentRule.attribute.logTiming,
                log,
                file
              );
            }
          }

          //events
          if (componentRule.events) {
            // 替换事件名
            if (componentRule.events.replacedNames) {
              let data = replaceNames(
                component,
                componentRule.events.replacedNames,
                lengthDiff
              );
              component = data.component;
              lengthDiff = data.lengthDiff;
            }
            //移除事件
            if (_.get(componentRule.events, "removed.length")) {
              let data = remove(
                component,
                componentRule.events.removed,
                lengthDiff
              );
              component = data.component;
              lengthDiff = data.lengthDiff;
            }
            // 日志记录-事件
            if (_.get(componentRule.events, "logTiming.length")) {
              addLog(
                component,
                "manual",
                componentRule.events.logTiming,
                log,
                file
              );
            }
          }

          content =
            content.slice(0, index) +
            component +
            content.slice(index + lastIndex);
          index = lastIndex + lengthDiff + 1;
        } else {
          if (lastIndex !== -1) {
            index += lastIndex + 1;
          } else {
            index++;
          }
        }
      } else {
        index++;
      }
    }
    if (content.indexOf("slot") !== -1) {
      addLog(content, "manual", ["slot"], log, file);
    }
    if (content.indexOf("ref") !== -1) {
      addLog(content, "manual", ["ref"], log, file);
    }
  }

  return {
    file: content,
    log,
  };
};
