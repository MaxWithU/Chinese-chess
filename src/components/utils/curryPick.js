export default function (func) {
  let args = []
  return function result (...rest) {
    args.push(...rest)
    if (args.length === 2) {
      var a = args
      args = []
      return func(a)
    }
    return result
  }
}
