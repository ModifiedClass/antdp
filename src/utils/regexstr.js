// 邮箱格式
export const regex_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// 手机号
export const regex_mobile = /^1\d{10}$/
// 身份证号
export const regex_IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
export const regex_IDre15 =  /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
// 全汉字
export const regex_all_han = /[\u4e00-\u9fa5]/
// 全字母
export const regex_all_word = /[a-zA-Z]/
// 全数字
export const regex_all_number = /[0-9]/
// 字母符号大小写数字混合
