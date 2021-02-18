module.exports ={
    // 目标tag
    tag:'q-cascader',
    attribute:{
        // 需要替换的组件属性名
        replacedNames:{
            'data':'options',
            'trigger':'expandTrigger',
            'change-on-select':'checkStrictly'
        },
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
        logTiming:['render-format']
    },
    events:{
        logTiming:['on-change']
    }
}