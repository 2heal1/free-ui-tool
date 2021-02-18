const fs = require('fs')
const path = require('path');
const _ = require('lodash')
const log = require('../../utils/log');
const defaultConfig = require('./default-config')
const componentConfig = require('./component')
const cascader = require('./cascader')
const generateJs = require ('./generate-js')

async function getConfig(options) {
    if(_.isEmpty(options)){
        await fs.writeFile(path.resolve('./free-ui-config.js'),generateJs(JSON.stringify(defaultConfig,null,2)),(err)=>{
            if (err) throw err;
        })
        log.success('已导出 free-ui-config.js')
    }else{
        const { component,detail } = options;
        if(component){
            await fs.writeFile(path.resolve('./free-ui-component.js'),generateJs(JSON.stringify(componentConfig,null,2)),(err)=>{
                if (err) throw err;
            })
            log.success('已导出 free-ui-component.js')
        }else{
            await fs.writeFile(path.resolve('./free-ui-cascader.js'),generateJs(JSON.stringify(cascader,null,2)),(err)=>{
                if (err) throw err;
            })
            log.success('已导出 free-ui-cascader.js')
        }
    }
}


module.exports = async (options) => {
    getConfig(options)
};