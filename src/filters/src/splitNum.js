/**
 * 作者：Hyhello
 * 时间：2019-05-24
 * 描述：splitNum
 */
export default {
  name: 'splitNum',
  handler(val, index = 3, separated = ',') {
    if (!val) return val;
    const reg = new RegExp(`\\B(?=(?:\\d{${index}})+\\b)`, 'g');
    return String(val).replace(reg, separated);
  }
};
