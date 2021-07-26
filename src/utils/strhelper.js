// 去掉末尾逗号
export const RemoveTheComma = (str) => {
    // return str.substring(0, str.lastIndexOf(','))
    return (str.substring(str.length - 1) == ',') ? str.substring(0, str.length - 1) : str
}

// 数组转逗号分隔字符串
export const ArrayToCommaStr = (arr) => {
    let temp = ''
    arr.forEach((ar)=>{
        temp += ar+','
    })
    return RemoveTheComma(temp)
}