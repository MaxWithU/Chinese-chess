export default function (mtx, item) {
  let a = new Set()
  console.log(item)
  function range (x, y) {
    if (x > y) {
      !(mtx[item.y][item.x + x / 2]) && a.add(`${item.x + x}_${item.y + y}`)
    } else {
      mtx[item.y + y / 2] && !mtx[item.y + y / 2][item.x + x] && a.add(`${item.x + x}_${item.y + y}`)
    }
  }
  range(1, 2)
  range(1, -2)
  range(-1, 2)
  range(-1, -2)
  range(2, 1)
  range(2, -1)
  range(-2, 1)
  range(-2, -1)
  console.log(a)
  return a
}
