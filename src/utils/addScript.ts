import { applyCallBack } from "./applyCallBack";

export const addScript = (src: string, callback?: (script: HTMLScriptElement) => void) => {
  return new Promise((resolve) => {
    // 创建一个新的script元素
    const script = document.createElement('script');

    if (src) {
      // 设置script的src属性
      script.src = src;

      // 设置async属性
      script.async = true;

      // 设置回调函数
      script.onload = function () {
        applyCallBack(callback, script);
        resolve(true);
      };

      // 将script元素添加到head中
      document.head.appendChild(script);
    } else {
      // 将script元素添加到head中
      document.head.appendChild(script);
      applyCallBack(callback, script);
      resolve(true);
    }
  })
}
