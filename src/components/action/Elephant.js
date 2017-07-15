export default function (mtx, item) {
  var a = new Set([
    '0_2', '2_0', '2_4', '4_2', '6_0', '8_2', '6_4', '0_7', '2_9', '2_5', '4_7', '6_9', '8_7', '6_5'
  ])
  var b = new Set()
  function setRange (x, y) {
    if (
      a.has(`${item.x + 2 * x}_${item.y + 2 * y}`) && !mtx[item.y + y][item.x + x]
    ) {
      b.add(`${item.x + 2 * x}_${item.y + 2 * y}`)
    }
  }
  setRange(1, 1)
  setRange(1, -1)
  setRange(-1, 1)
  setRange(-1, -1)
  return b
}
