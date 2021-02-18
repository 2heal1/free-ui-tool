module.exports = (log)=>{
    let result = '';
    Object.keys(log).forEach(logKey=>{
        log[logKey].forEach(item=>{
            result+=item
        })
    })
    return result ? result : '暂无数据'
}