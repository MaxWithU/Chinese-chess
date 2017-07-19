import range from '../utils/range'
export default function (mtx, item) {
  let x = []
  mtx.forEach((it, i) => {
    it[item.x] && x.push(i)
  })
  let y = []
  mtx[item.y].forEach((it, i) => {
    it && y.push(i)
  })
  function Area (arr, num, type) {
    let max = () => arr.indexOf(item[type]) < arr.length - 1 ? arr[arr.indexOf(item[type]) + 1] - 1 : num - 1
    let min = () => arr.indexOf(item[type]) > 0 ? arr[arr.indexOf(item[type]) - 1] + 1 : 0
    let result = range(min(), max())
    arr[arr.indexOf(item[type]) + 2] && result.push(arr[arr.indexOf(item[type]) + 2])
    arr[arr.indexOf(item[type]) - 2] && result.push(arr[arr.indexOf(item[type]) - 2])
    return result
  }
  let result = new Set([
    ...Area(y, mtx[item.y].length, 'x').map((it) => `${it}_${item.y}`),
    ...Area(x, mtx.length, 'y').map((it) => `${item.x}_${it}`)
  ])
  result.delete(`${item.x}_${item.y}`)
  return result
}
