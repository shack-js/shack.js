export default <T extends unknown, V extends any[]>(
  fn: (...args: [
    ...other: V,
    cb: (err: any, result: T) => any
  ]) => any
) =>
  (...args: V) =>
    new Promise((resolve, reject) =>
      fn(...args, (err: any, result: T) =>
        err ? reject(err) : resolve(result)))