export const applyCallBack = (fun: ((...args: any[]) => void | any) | undefined, ...args: any[]) => {
  if (fun && typeof fun == "function") {
    return fun(...args);
  }
}