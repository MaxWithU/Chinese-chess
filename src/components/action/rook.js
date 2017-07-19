import range from '../utils/range'
export default function (mtx, item) {
  function rdx (a, b) {
    return a.reduce((x, y, i) => {
      if (i < b) {
        return y ? [i, x[1]] : x
      } else if (i > item.x) {
        if (x[1] === a.length - 1) {
          return y ? [x[0], i] : x
        } else {
          return x
        }
      } else {
        return x
      }
    }, [0, a.length - 1])
  }
  // x轴
  let x = rdx(mtx[item.y], item.x)
  // y轴
  let y = rdx(mtx.map((it, i) => it[item.x] && it[item.x]), item.y)
  let result = new Set([
    ...range(x[0], x[1]).map((it) => `${it}_${item.y}`),
    ...range(y[0], y[1]).map((it) => `${item.x}_${it}`)
  ])
  result.delete(`${item.x}_${item.y}`)
  console.log(result)
  return result
}
