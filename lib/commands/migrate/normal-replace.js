const _ = require("lodash");
const addLog = require('./add-log')
const CONSTANT = require("../../constant");

module.exports = (old,replace,file)=>{
    const { content,fileName } = file
    const fileType = _.last(fileName.split("."));
    let oldReg = new RegExp(`\b${old}-`,'gi')
    let replecStr = `${replace}-`;
    let log = {
        manual:[]
    };

    if(fileType===CONSTANT.VUE_TYPE){
        oldReg = new RegExp(`([</]+)${old}-`,'gi')
        replecStr = `$1${replace}-`;
    }

    if(CONSTANT.STYLE_TYPE.includes(fileType)){
        oldReg = new RegExp(`\\.${old}-`,'gi')
        replecStr = `.${replace}-`;
    }

    if(content.indexOf('slot')!==-1){
        log.manual.push('')
        addLog(
            content,
            "manual",
            ['slot'],
            log,
            file
          );
      }
      if(content.indexOf('ref')!==-1){
        addLog(
            content,
            "manual",
            ['ref'],
            log,
            file
          );
      }

    return {
        file:content.replace(oldReg,replecStr),
        log
    }
}