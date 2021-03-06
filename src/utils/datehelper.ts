export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export const formateDate = (time:any) => {
    if(!time) return ''
    let date=new Date(time)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() 
}

export const shortDate = (time:any) => {
    if(!time) return ''
    let date=new Date(time)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}

export const formateYear = (time:any) => {
    if(!time) return ''
    let date=new Date(time)
    return date.getFullYear()
}

//获取当月号数
export const mGetDate = () => {
     let date = new Date()
     let year = date.getFullYear()
     let month = date.getMonth()+1
     let d = new Date(year, month, 0)
     return d.getDate()
}

export const get30Days = () => {
    const addDate = (dd:any,dadd:any) => {
        let a = (new Date(dd)).toString()
        a = a.valueOf()
        a = a + dadd * 24 * 60 * 60 * 1000
        a = (new Date(a)).toString()
        return a
    }
    let now = new Date();
    let dataTitle = [];//保存获取到的日期
    for(let i=0;i<30;i++){
        let year=now.getFullYear()
        let month = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1)
        dataTitle[i]=(year+"-"+month+"-"+now.getDate())
        now = addDate(month+"/"+now.getDate()+"/"+now.getFullYear(),-1)
    }
    return dataTitle.reverse()
}

//根据某年某月计算出具体日期
export const getDaysInMonth = (year:any, month:any) => {
  const daysOfMonth = []
  month = parseInt(month, 10)
  const lastDayOfMonth = new Date(year, month, 0).getDate()
  for (let i = 1; i <= lastDayOfMonth; i++) {
    if (i < 10) {
      daysOfMonth.push("0" + i) //判断是部否小于10，如果小于加0，，例如“01”
    } else {
      daysOfMonth.push(i+"")
    }
  }
  return daysOfMonth
}

//根据某年某月计算出具体日期
export const getDateInMonth = (year:any, month:any) => {
  const daysOfMonth = []
  month = parseInt(month, 10)
  const lastDayOfMonth = new Date(year, month, 0).getDate()
  for (let i = 1; i <= lastDayOfMonth; i++) {
    if (i < 10) {
      daysOfMonth.push(year+"-"+month+"-"+"0" + i)
    } else {
      daysOfMonth.push(year+"-"+month+"-"+i)
    }
  }
  return daysOfMonth
}
