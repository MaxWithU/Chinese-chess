export default function (mtx, item) {
  let a = new Set([
    '3_0', '5_0',
    '4_1',
    '3_2', '5_2',
    '3_7', '5_7',
    '4_8',
    '3_9', '5_9'
  ])
  let b = new Set()
  function Range (str) {
    a.has(str) && b.add(str)
  }
  Range(`${item.x + 1}_${item.y + 1}`)
  Range(`${item.x - 1}_${item.y + 1}`)
  Range(`${item.x - 1}_${item.y - 1}`)
  Range(`${item.x + 1}_${item.y - 1}`)
  return b
}
