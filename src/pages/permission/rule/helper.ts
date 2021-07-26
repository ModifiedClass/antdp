import moment from 'moment'


export const setFieldsAdaptor = (layout:any,dataSource:RuleTypeAPI.Rule) => {
    if(layout?.tabs && dataSource){
        const result = {}
        layout.tabs.forEach((tab:any)=>{
            tab.data.forEach((field:any)=>{
                switch(field.type){
                    case 'datetime':
                        result[field.key]=moment(dataSource[field.key])
                        break
                    default:
                        result[field.key]=dataSource[field.key]
                        break
                }
            })
        })
        return result
    }
    return {}
}

export const submitFieldsAdaptor = (formValues: any) => {
    const result = formValues
    Object.keys(formValues).forEach((key)=>{
        if(moment.isMoment(formValues[key])){
            result[key] = moment(formValues[key]).format('YYYY-MM-DD HH:mm:ss')
        }
        if(Array.isArray(formValues[key])){
            result[key] = formValues[key].map((innerValue:any)=>{
                if(moment.isMoment(innerValue)){
                    return moment(innerValue).format('YYYY-MM-DD HH:mm:ss')
                }
                return innerValue
            })
        }
    })
    return result
}