const slice = [].slice;

const toString = Object.prototype.toString;

/**
 * 存储localStorage/sessionStorage
 */
export const setStore = (name, content, deep) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  if (deep) {
    window.localStorage.setItem(name, content);
  } else {
    window.sessionStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage/sessionStorage
 */
export const getStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    return window.localStorage.getItem(name);
  } else {
    return window.sessionStorage.getItem(name);
  }
};

/**
 * 删除localStorage/sessionStorage
 */
export const removeStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    window.localStorage.removeItem(name);
  } else {
    window.sessionStorage.removeItem(name);
  }
};

export const oneOf = function (target, list = []) {
  return list.some((item) => item === target);
};

// 判断类型
export const _typeof = (types) => {
  return toString.call(types).slice(8, -1).toLowerCase();
};

// Like array converToArray
export const toArray = (likeArray = []) => {
  return slice.apply(likeArray);
};

// 断定是否是一个函数
export const isFunction = (fn) => {
  return _typeof(fn) === 'function';
};

// 配置number convert to array
export const rangeArr = (n, initialValue) => {
  // eslint-disable-next-line no-unused-vars
  return Array.apply(Array, {
    length: n
  }).map(() => initialValue);
};

/**
 * 时间格式化
 * @param {*} date Date对象 或 时间戳
 * @param {*} fmt "yyyy-MM-dd hh:mm:ss"
 */
export function formatTime(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!date) return date;
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3) // 季度
  };
  // 格式化年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 格式化毫秒
  if (/(S+)/.test(fmt)) {
    const tmp = date.getMilliseconds();
    fmt = fmt.replace(RegExp.$1, ('000' + tmp).substr(('' + tmp).length));
  }
  // 格式化其它
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}
