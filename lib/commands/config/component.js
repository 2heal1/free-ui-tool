module.exports = {
    // 目标tag
    tag:'target-tag',
    attribute:{
        // 需要替换的组件属性名
        replacedNames:{},
        // 需要替换的组件属性值
        replacedValue:{
            // eg: size:large => size:medium
            'size':{
                'large':'medium'
            }
        },
        // 需要移除的属性
        removed:[],
        // 什么情况下 需要记录文件位置，方便后续手动修改
        logTiming:[]
    },
    events:{
        // 需要替换的event名
        replacedNames:{},
        // 需要移除的event
        removed:[],
        // 什么情况下 需要记录文件位置，方便后续手动修改
        logTiming:[]
    }
}